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
      :product="relateData"
    />
    <!-- 猜你喜欢模块 -->
    <Recommend
      v-if="recommendData"
      title="YOU MAY ALSO LIKE"
      :list="recommendData"
    />
    <!-- recently viewed 浏览记录-->
    <Recommend
      v-if="historyData"
      :list="historyData"
      title="RECENTLY VIEWED"
      type="history"
    />
  </div>
</template>

<script>
export default {
  name: 'Product',
  async asyncData({ app: { $api }, query, params }) {
    const productId = params.id || 448
    const p1 = $api.product.detailBaseInfo(productId)
    // 关联商品
    const p2 = $api.product.queryRelatedPrd(productId)
    // // 猜你喜欢
    // const p3 = $api.product.queryLikePrd(productId)
    // // // 浏览记录
    // const p4 = $api.product.queryBrowseRecord()
    const data = await Promise.all([p1, p2]).catch(function () {})
    console.log(111, data)
    // data为空，异常处理
    return {
      productVo: (data && data[0]) || null,
      relateData: (data && data[1]) || null,
      // recommendData: (data[2] && data[2].list) || [],
      // historyData: (data[3] && data[3].list) || [],
    }
  },
  data() {
    return {
      recommendData: [],
      historyData: [],
    }
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  mounted() {},
  methods: {
    async queryLikePrd() {
      const { id } = this.$router.params
      const result = await this.$api.product.queryLikePrd(id).catch(() => {})
      if (result && result.list.length) {
        this.recommendData = result.list
      }
    },
    // 查询浏览记录
    async queryBrowseRecord() {
      const result = await this.$api.product.queryBrowseRecord().catch(() => {})
      if (result && result.list.length) {
        this.historyData = result.list
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
