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
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.queryCart()
      }
    },
  },
  computed: mapState([
    // 映射 this.count 为 store.state.count
    'isLogin',
    'loginInfo',
    'cartData',
  ]),
  created() {
    const name = this.$route.name
    // 大购物车
    if (name === 'cart') {
      this.queryCart()
    }
  },
  methods: {
    // 移动端滚动吸底
    scroll(e) {
      if (e.target.scrollTop > 70) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    // 关闭小购物车浮层
    close() {
      this.$emit('close-popup')
    },
    // 删除购物车
    removeCart(cartIndex) {
      const self = this
      const { isLogin, loginInfo } = this
      this.$alert(
        'Are you going to delete this item(s) from your shopping bag?'
      ).then(async function () {
        // 1、未登录 更新cookie信息
        // 2、已登录 调用服务器删除
        if (isLogin) {
          const { spuId, skcId, skuId } = self.cartList[cartIndex]
          const result = await self.$api.cart
            .removeCart({
              userId: loginInfo.userId,
              spuId,
              skcId,
              skuId,
            })
            .catch((err) => {
              alert('删除失败' + err)
            })
          if (result) {
            self.cartList.splice(cartIndex, 1)
          }
        } else {
          self.cartList.splice(cartIndex, 1)
          self.updateCookieData(cartIndex)
        }
        self.updatePrice()
      })
    },
    // 更新购物车的数量
    async updateCart(cartIndex, type) {
      const { userId, email } = this.loginInfo
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
        num = quantity + 1
      }
      // 1、未登录时  将cartList更新到cookie中
      // 2、登录时 将cartList上传到服务器上
      if (!this.isLogin) {
        this.updateCookieData(cartIndex, num)
      } else {
        await this.$api.cart.updateCart({
          quantity: num,
          spuId,
          skcId,
          skuId,
          retailPrice,
          discountPrice,
          userId,
          email,
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
        }
      } else {
        const result = await this.$api.cart.queryCart()
        if (result) {
          const { stocks = [], outStocks = [] } = result
          this.cartNums = stocks.length
          this.cartList = stocks.concat(outStocks)
          // 下架或者没有库存的商品
          this.outStockLength = outStocks.length
          this.updatePrice()
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
          element = { ...element, ...cookieCartGoods[index] }
          // sku状态。0-在售，1-缺货，2-下架
          if (element.skuState !== 0 || element.quantity > element.stock) {
            outStocks.push(element)
          } else {
            stocks.push(element)
          }
        })
        this.cartList = stocks.concat(outStocks)
        // 下架或者没有库存的商品
        this.outStockLength = outStocks.length
        // 算价
        this.updatePrice()
      }
    },
    /**
     * 更新购物车cookie中的信息，删除或者更新数量
     * @param {*} index
     */
    updateCookieData(index, quantity) {
      const cookieCartGoods = JSON.parse(JSON.stringify(this.cartData)) || []
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
      const { cartList, loginInfo } = this
      cartList.forEach((item) => {
        goods.push({
          skuId: item.skuId,
          quantity: item.quantity,
        })
      })

      const result = await this.$api.cart.updatePrice({
        ...loginInfo,
        ...{
          goods,
        },
      })
      if (result) {
        this.orderPrice = result
      }
      console.log(result)
    },
    // 下单
    /**
     * 1、校验库存
     * 2、当商品中有下架商品，或添加的商品数量超出最大库存数量时，在购物车弹窗页面弹窗提示用户
     */
    async checkout() {
      const goods = []
      const { cartList } = this
      const index = cartList.findIndex((item) => {
        return item.skuState !== 0
      })
      if (index > -1) {
        this.handlerError()
        return false
      }
      // 库存校验
      cartList.forEach((item) => {
        goods.push({
          skuId: item.skuId,
          quantity: item.quantity,
        })
      })
      const { list } = await this.$api.cart.checkInventory(goods)
      const result = list.find((item) => {
        return item.passed === false
      })
      // 库存校验不通过，提示
      if (result) {
        this.handlerError()
        return false
      }
      this.$router.push({
        name: 'orderConfirm',
        query: {
          products: JSON.stringify(goods),
          cartIdList: '',
        },
      })
    },
    handlerError() {
      const outStockTips =
        'Unfortunately, some items in your shopping bag are sold out. Please remove before checkout.'
      this.$alert({
        text: outStockTips,
        isConfirm: false,
        cancel: 'OK',
      }).catch(() => {
        const offsetTop = document.querySelector('#outStock').offsetTop
        const selector = document.querySelector('.el-drawer__body')
        selector.scrollTo({
          top: offsetTop - 10,
          behavior: 'smooth',
        })
        // 滚动到下架商品区域
        return false
      })
    },
    // 校验库存
    async checkInventory(checkList) {
      let passed = true
      let result = null

      const { list } = await this.$api.cart.checkInventory(checkList)
      if (list && list.length > 0) {
        result = list.find((item) => {
          return item.passed === false
        })
        if (result) {
          passed = result.passed
        }
        return passed
      }
    },
  },
}
