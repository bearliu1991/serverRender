<template>
  <div class="container">
    <!-- 商品信息 模块-->
    <!-- 	商品spu状态。0-在售，1-缺货，2-下架，3-部分在售 -->
    <cup-empty v-if="productVo.productSpuState == 2" class="icon-off-shelf"
      >Product has been removed</cup-empty
    >
    <ProductInfo v-else :product="productVo" />

    <!-- 关联商品 -->
    <RelatedModel
      v-if="Number(productVo.productSpuState) !== 2 && relateData"
      :buy-it-width="relateData"
    />
    <!-- 猜你喜欢模块 -->
    <Recommend v-if="recommendData" :recommend-list="recommendData" />
    <!-- 评论模块 -->
    <!-- recently viewed 浏览记录-->
    <!-- <Recently :recently-list="historyData" /> -->
  </div>
</template>

<script>
// import qs from 'qs'
// import mock from '../../mock/detail'
export default {
  async asyncData({ app: { $api }, query }) {
    const p1 = $api.product.detailBaseInfo('448')
    // 关联商品
    const p2 = $api.product.queryRelatedPrd('448')
    // 猜你喜欢
    const p3 = $api.product.queryLikePrd('448')
    const data = await Promise.all([p1, p2, p3])
    console.log(`46644`, data)
    return {
      productVo: data[0],
      relateData: data[1],
      recommendData: data[2].list,
      // historyData: mock.historyData,
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {
    // '$route.query': (to, from) => {
    //   window.location.reload()
    // },
  },
  created() {
    // if (process.browser) {
    //   this.spuId = this.$route.query.spuId
    //   const detailModule = new DetailModule(this.$http)
    //   if (!detailModule.isLogin) {
    //     // 未登陆
    //     detailModule.getHistoryOffLogin().then((data) => {
    //       this.historyData = data
    //       // 未登陆存储当前浏览的商品spuId, 用于下次未登陆时获取spuId
    //       detailModule.storeSpuIds(this.spuId)
    //     })
    //   }
    // }
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped></style>
