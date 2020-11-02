export default {
  // async asyncData({ app: { $api }, query }) {
  //   const p1 = $api.product.detailBaseInfo('448')

  //   const data = await Promise.all([p1])
  //   return {
  //     cartData: data[0],
  //   }
  // },
  data() {
    return {
      direction: 'rtl',
      cartList: [],
      userId: '',
      recommendData: [
        {
          discountEndTime: null,
          discountPrice: null,
          discountStartTime: null,
          imageUrl:
            'https://test-cupshe-optimus.oss-cn-hangzhou.aliyuncs.com/B0E499F26B1445FD9104A272AF5466EF.jpg',
          onSaleWatermark: 0,
          productName: 'ddddddddd',
          productSpuState: null,
          rating: 4,
          ratingNum: 666,
          retailPrice: 30.89,
          spuId: 450,
        },
      ],
    }
  },
  created() {
    this.userId = (this.$store.userInfo && this.$store.userInfo.id) || ''
    this.queryCart()
  },
  methods: {
    // 删除购物车
    async removeCart(cartIndex) {
      const { userId } = this
      this.cartList.splice(cartIndex, 1)
      // 1、未登录 更新cookie信息
      // 2、已登录 调用服务器删除
      if (userId) {
        const { spuId, skcId, skuId } = this.cartList[cartIndex]
        const { data = null } = await this.$api.cart.removeCart({
          userId,
          spuId,
          skcId,
          skuId,
        })
        console.log(`删除结果` + data)
      } else {
        this.updateCookieData(cartIndex)
      }
      this.updatePrice()
    },
    // 更新购物车的数量
    async updateCart(cartIndex) {
      const userInfo = this.$store.userInfo
      const {
        quantity,
        spuId,
        skcId,
        skuId,
        retailPrice,
        discountPrice,
      } = this.cartList[cartIndex]
      // 1、未登录时  将cartList更新到cookie中
      // 2、登录时 将cartList上传到服务器上
      if (!userInfo) {
        this.updateCookieData(cartIndex, quantity)
      } else {
        const { data = null } = await this.$api.cart.updateCart({
          userId: userInfo.userId,
          email: userInfo.email,
          spuId,
          skcId,
          skuId,
          retailPrice,
          discountPrice,
        })
        console.log(data)
      }
      this.updatePrice()
    },
    /**
     * 1、未登录时，获取浏览器缓存中数据
     * 2、已登录时，获取服务器中的数据
     */
    async queryCart() {
      const isLogin = false
      if (!isLogin) {
        const cookieCartGoods = this.$cookies.get('cookie_cart_goods') || []
        if (cookieCartGoods.length) {
          const skuIds = cookieCartGoods.reduce((skuId, value) => {
            skuId.push(value.skuId)
            return skuId
          }, [])
          this.queryProductBySkuIds(skuIds)
        }
      } else {
        const { data = null } = await this.$api.cart.queryCart()
        if (data) {
          const { stocks = [], outStocks = [] } = data
          this.cartList = stocks.concat(outStocks)
          this.updatePrice()
        }
      }
    },
    /**
     * 根据skuId查询对应的商品信息
     */
    async queryProductBySkuIds(skuIds) {
      const cookieCartGoods = this.$cookies.get('cookie_cart_goods') || []
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
        this.updatePrice()
      }
    },
    // 获取上传到服务器的参数
    handlerCartItemParams(item) {
      const { spuId, skcId, skuId, quantity, retailPrice, discountPrice } = item
      return { spuId, skcId, skuId, quantity, retailPrice, discountPrice }
    },
    /**
     * 更新购物车cookie中的信息，删除或者更新数量
     * @param {*} index
     */
    updateCookieData(index, quantity) {
      const cookieCartGoods = this.$cookies.get('cookie_cart_goods') || []
      if (quantity) {
        cookieCartGoods[index].quantity = quantity
      } else {
        cookieCartGoods.splice(index, 1)
      }
      this.$cookies.set('cookie_cart_goods', cookieCartGoods)
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

      const { list = [] } = await this.$api.cart.updatePrice({
        goods,
      })
      console.log(list)
    },
  },
}
