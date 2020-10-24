<template>
  <div class="cs-cart">
    <cart-item :list="cartList"></cart-item>

    <Recommend
      v-if="recommendData"
      title="YOU MAY ALSO LIKE"
      :list="recommendData"
    />
  </div>
</template>
<script>
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
      cartList: [],
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
    this.queryCart()
  },
  methods: {
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
      }
    },
  },
}
</script>
