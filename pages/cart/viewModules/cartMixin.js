import { mapState } from 'vuex'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isFixed: false,
      orderPrice: null,
      direction: 'rtl',
      cartList: [],
      // 有库存的加车的商品种类
      cartNums: 0,
      outStockLength: 0,
      config: null,
      isSubmit: false,
      spuId: '',
      top: 110,
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.isFixed = false
        this.queryCart()
        this.$nextTick(() => {
          if (this.$refs.tips) {
            this.top = this.$refs.tips.clientHeight + 70
          }
        })
      }
    },
  },
  computed: {
    ...mapState([
      // 映射 this.count 为 store.state.count
      'cartData',
    ]),
    // 邮费文案提示
    freeShipTips() {
      const { config, orderPrice } = this
      let tips = ''
      if (config) {
        const { freeShipTips, freeShipTotal, freeShipPass } = config
        if (orderPrice) {
          const { subtotal } = orderPrice
          if (freeShipTotal <= subtotal) {
            tips = freeShipPass
            return tips
          }
        }
        if (freeShipTips) {
          tips = freeShipTips
          const subtotal = (orderPrice && orderPrice.subtotal) || 0
          Object.keys(config).forEach((key) => {
            tips = tips.replaceAll(
              `@{${key}}`,
              Number(parseFloat(config[key]).toFixed(2)) -
                Number(parseFloat(subtotal).toFixed(2))
            )
          })
        }

        return tips
      }
      return ''
    },
  },
  created() {
    const name = this.$route.name
    // 大购物车

    name === 'cart' && this.queryCart()

    if (name === 'product/id') {
      this.spuId = this.$route.params.id
    }

    // 查询购物车配置
    this.queryCartConfig()
  },

  methods: {
    // 移动端滚动吸底
    scroll(e) {
      if (e.target.scrollTop > 80) {
        this.isFixed = true
      } else {
        // this.isFixed = false
      }
    },
    // 关闭小购物车浮层
    close() {
      this.$emit('close-popup')
    },
    // 删除购物车
    removeCart(skuId, skuState) {
      const self = this
      // 下架或者无库存的商品删除无需提示
      if (skuState !== 0) {
        self.excuteRemove(skuId)
        return false
      }
      this.$alert({
        text: 'Are you going to delete this item(s) from your shopping bag?',
        isCancel: true,
      }).then(function () {
        self.excuteRemove(skuId)
      })
    },
    // TODO 删除购物车商品
    async excuteRemove(skuId) {
      const self = this
      const { isLogin } = this
      // 1、未登录 更新cookie信息
      // 2、已登录 调用服务器删除
      const cartIndex = self.cartList.findIndex((item) => {
        return item.skuId === skuId
      })
      if (isLogin) {
        const { spuId, skcId, skuId } = self.cartList[cartIndex]
        const result = await self.$api.cart
          .removeCart({
            spuId,
            skcId,
            skuId,
          })
          .catch((error) => {
            // 删除失败，无感刷新
            this.$alert({
              text: 'remove fail.',
              isCancel: false,
            })
            return error
          })
        if (!result) {
          self.queryCart()
        }
      } else {
        // 未登录 更新cookie信息
        self.updateCookieData(skuId)
        self.queryCart()
      }
    },
    // 更新购物车的数量
    /**
     * 1、 stock< 10     quanity >= stock  库存不足  only xx left
     * 2、 stock > 10 不加限制
     * @param {*} cartIndex
     * @param {*} type
     */
    async updateCart(cartIndex, type) {
      const {
        quantity,
        spuId,
        skcId,
        skuId,
        retailPrice,
        discountPrice,
      } = this.cartList[cartIndex]
      let num = 0
      if (type === 0) {
        num = quantity - 1
      } else {
        // 加车 优先库存校验
        const result = await this.checkInventory([
          {
            skuId,
            quantity,
          },
        ])
        if (result.length > 0) {
          // 将库存不足的数据更新到购物车中
          if (result.quantity) {
            this.updateCartData(result)
            return false
          }
        }
        num = quantity + 1
      }
      // 1、未登录时  将cartList更新到cookie中
      if (!this.isLogin) {
        this.updateCookieData(skuId, num)
      } else {
        // 2、登录时 将cartList上传到服务器上
        await this.$api.cart
          .updateCart({
            quantity: num,
            spuId,
            skcId,
            skuId,
            retailPrice,
            discountPrice,
          })
          .catch((error) => {
            // 使用接口返回的数据
            if (error.retCode === 'OS1000011') {
              this.cartList[cartIndex].quantity = error.data
            }
          })
      }
      this.queryCart()
    },
    /**
     * 1、未登录时，获取浏览器缓存中数据
     * 2、已登录时，获取服务器中的数据
     */
    async queryCart() {
      if (!this.isLogin) {
        const cookieCartGoods = this.cartData || []
        if (cookieCartGoods.length) {
          const skuIds = cookieCartGoods.reduce((skuId, value) => {
            skuId.push(value.skuId)
            return skuId
          }, [])
          this.queryProductBySkuIds(skuIds)
        } else {
          this.cartList = []
          this.cartNums = 0
          this.outStockLength = 0
        }
      } else {
        const result = await this.$api.cart.queryCart()
        if (result) {
          const { stocks = [], outStocks = [] } = result
          this.cartNums = stocks.length
          this.cartList = stocks.concat(outStocks)
          // 更新购物车数据，添加是否库存不足状态
          this.updateCartList()
          // 下架或者没有库存的商品
          this.outStockLength = outStocks.length
          this.updatePrice()
          this.$forceUpdate()
        }
      }
    },
    /**
     * 根据skuId查询对应的商品信息
     */
    async queryProductBySkuIds(skuIds) {
      const cookieCartGoods = this.cartData || []
      const stocks = []

      const outStocks = []
      const { list = [] } = await this.$api.product.queryBatchProductBySkuId(
        skuIds
      )
      if (list && list.length) {
        list.forEach((element, index) => {
          const quantity = cookieCartGoods.find((item) => {
            return item.skuId === element.skuId
          }).quantity
          element = {
            ...element,
            ...{
              quantity,
            },
          }
          // sku状态。0-在售，1-缺货，2-下架
          if (element.skuState !== 0) {
            outStocks.push(element)
          } else {
            stocks.push(element)
          }
        })
        this.cartNums = stocks.length
        this.cartList = stocks.concat(outStocks)
        // 更新购物车数据，添加是否库存不足状态
        this.updateCartList()
        // 下架或者没有库存的商品
        this.outStockLength = outStocks.length
        // 算价
        this.updatePrice()
        this.$forceUpdate()
      }
    },
    /**
     * 更新购物车cookie中的信息，删除或者更新数量
     * @param {*} index
     */
    updateCookieData(skuId, quantity) {
      const cookieCartGoods = JSON.parse(JSON.stringify(this.cartData)) || []
      const index = cookieCartGoods.findIndex((item) => {
        return item.skuId === skuId
      })
      if (quantity) {
        cookieCartGoods[index].quantity = quantity
      } else {
        cookieCartGoods.splice(index, 1)
      }
      this.$store.commit('SET_CARTDATA', cookieCartGoods)
    },
    /**
     * 算价
     */
    async updatePrice() {
      const goods = []
      const { cartList } = this
      cartList.forEach((item) => {
        goods.push({
          skuId: item.skuId,
          quantity: item.quantity,
        })
      })

      const result = await this.$api.cart.updatePrice({
        ...{
          goods,
        },
      })
      if (result) {
        this.orderPrice = result
      }
    },
    // 下单
    /**
     * 1、校验库存
     * 2、当商品中有下架商品，或添加的商品数量超出最大库存数量时，在购物车弹窗页面弹窗提示用户
     */
    async checkout() {
      const goods = []
      const cartIds = []
      const { cartList } = this
      this.isSubmit = true

      // 处理异常商品
      const index = cartList.findIndex((item) => {
        return item.skuState !== 0
      })
      if (index > -1) {
        this.handlerError()
        this.isSubmit = false
        return false
      }
      // 库存校验
      cartList.forEach((item) => {
        if (item.id) {
          cartIds.push(item.id)
        }
        goods.push({
          skuId: item.skuId,
          quantity: item.quantity,
        })
      })
      const result = await this.checkInventory(goods)

      // 库存校验不通过，提示
      if (result.length > 0) {
        // 将库存不足的数据更新到购物车中
        this.updateCartData(result)
        this.handlerError()
        this.isSubmit = false
        return false
      }
      this.isSubmit = false
      this.$router.push({
        path: '/orderConfirm',
        query: {
          products: JSON.stringify(goods),
          cartIdList: cartIds.join(','),
        },
      })
    },
    handlerError() {
      const outStockTips =
        'Unfortunately, some items in your shopping bag are understock, please remove before check out.'
      this.$alert({
        text: outStockTips,
        isConfirm: false,
        isCancel: true,
        cancel: 'OK',
      }).catch(() => {
        if (document.querySelector('#outStock')) {
          const offsetTop = document.querySelector('#outStock').offsetTop
          const selector = document.querySelector('.scrollArea')
          selector.scrollTo({
            top: offsetTop - 10,
            behavior: 'smooth',
          })
        }
        // 滚动到下架商品区域
        return false
      })
    },
    // 校验库存
    async checkInventory(checkList) {
      const { list } = await this.$api.cart.checkInventory(checkList)
      if (list && list.length > 0) {
        const result = list.filter((item) => {
          return item.passed === false
        })
        return Promise.resolve(result)
      }
    },
    /**
     * 更新购物车中的库存数
     */
    updateCartData(newStockData) {
      const { cartList, isEmpty } = this
      newStockData.forEach((stockItem) => {
        const { skuId, quantity } = stockItem
        const index = cartList.findIndex((cartItem) => {
          return cartItem.skuId === skuId
        })
        if (index > -1) {
          // 0 库存不足  underStock   1  库存不足且 stock小于阀值10  显示only xx left   2  quantity=0
          cartList[index].stockStatus = !isEmpty(quantity) ? 1 : 0
          if (quantity === 0) {
            cartList[index].stockStatus = 2
          }
          if (!isEmpty(quantity)) {
            cartList[index].stock = quantity
          }
        }
      })
      this.$forceUpdate()
    },
    /**
     * 更新购物车列表数据
     * 1、 stock存在，说明是库存数小于阀值
     */
    updateCartList() {
      const { cartList, isEmpty } = this
      cartList.forEach((item) => {
        const { quantity, stock } = item
        if (!isEmpty(stock) && quantity >= stock) {
          item.stockStatus = 1
          if (stock === 0) {
            item.stockStatus = 2
          }
        }
      })
    },
    // 查询购物车配置  空购物车文案  免邮文案
    async queryCartConfig() {
      const result = await this.$api.config.queryCartConfig()
      this.config = result
    },
    // 空购物车按钮
    toDiscovery() {
      const { config } = this
      if (config && config.buttonLink) {
        window.location.href = config.buttonLink
      }
    },
    // 购物车商品列表点击进入pdp页面
    toDetail(spuId) {
      if (+this.spuId === spuId) {
        return false
      }
      this.$router.push({
        name: 'product/id',
        params: {
          id: spuId,
        },
      })
    },
  },
}
