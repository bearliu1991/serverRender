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
          if (element.stock > 0) {
            stocks.push(element)
          } else {
            outStocks.push(element)
          }
        })
        this.cartList = stocks.concat(outStocks)
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
  },
}
