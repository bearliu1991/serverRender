<template>
  <div class="container">
    <!-- 商品信息 模块-->
    <!-- 	商品spu状态。0-在售，1-缺货，2-下架，3-部分在售 -->
    <cup-empty
      v-if="!productVo || productVo.productSpuState == 2"
      class="icon-off-shelf"
      >Product has been removed</cup-empty
    >
    <ProductInfo v-else :product="productVo" />

    <!-- 关联商品 -->
    <RelatedModel
      v-if="productVo && Number(productVo.productSpuState) !== 2 && relateData"
      :buy-it-width="relateData"
    />
    <!-- 猜你喜欢模块 -->
    <Recommend
      v-if="recommendData"
      title="YOU MAY ALSO LIKE"
      :list="recommendData"
    />
    <!-- recently viewed 浏览记录-->
    <Recommend v-if="historyData" :list="historyData" title="RECENTLY VIEWED" />
  </div>
</template>

<script>
export default {
  async asyncData({ app: { $api }, query, params }) {
    const productId = params.id || 448
    const p1 = $api.product.detailBaseInfo(productId)
    // 关联商品
    const p2 = $api.product.queryRelatedPrd(productId)
    // 猜你喜欢
    const p3 = $api.product.queryLikePrd(productId)
    // 浏览记录
    const p4 = $api.product.queryBrowseRecord(false)
    const data = await Promise.all([p1, p2, p3, p4])
    return {
      productVo: data[0],
      relateData: data[1],
      recommendData: (data[2] && data[2].list) || [],
      historyData: (data[3] && data[3].list) || [],
    }
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  data() {
    return {}
  },
  created() {
    console.log(this.$route.params.id)
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped></style>
