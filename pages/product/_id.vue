<template>
  <div class="cs-pdp-wrap">
    <!-- 商品信息 模块-->
    <!-- 	商品spu状态。0-在售，1-缺货，2-下架，3-部分在售 -->
    <cup-empty
      v-if="!productVo || productVo.productSpuState == 2"
      class="icon-no-result"
    >
      <p>THIS ITEM IS TEMPORARILY UNAVAILABLE</p>
      <!-- <cup-button type="primary">SHOP OUR BEST SELLERS</cup-button> -->
    </cup-empty>
    <ProductInfo
      v-else
      :product="productVo"
      :relate-data="relateData"
    ></ProductInfo>

    <!-- 猜你喜欢模块 -->
    <Recommend
      v-if="recommendData"
      :kind="1"
      title="YOU MAY ALSO LIKE"
      :list="recommendData"
    />
    <!-- 评论 -->
    <template v-if="$store.state.terminal === 'pc'">
      <review-pc v-if="productVo && productVo.productSpuState != 2" />
    </template>
    <template v-else>
      <review-m v-if="productVo && productVo.productSpuState != 2" />
    </template>

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
// import Review from '../review'
export default {
  name: 'Product',
  // components: { Review },
  async asyncData({ app: { $api }, query, params }) {
    const productId = params.id || 448
    const p1 = $api.product.detailBaseInfo(productId)
    // 关联商品
    const p2 = $api.product.queryRelatedPrd(productId)
    const data = await Promise.all([p1, p2]).catch(function () {})
    // console.log(111, JSON.stringify(data))
    // data为空，异常处理
    return {
      productVo: (data && data[0]) || null,
      relateData: (data && data !== true && data[1]) || null,
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
  mounted() {
    this.queryLikePrd()
    this.queryBrowseRecord()
    window.scrollTo(0, 0)
  },
  methods: {
    async queryLikePrd() {
      const { id } = this.$route.params
      const result = await this.$api.product.queryLikePrd(id).catch(() => {})
      if (result && result.list.length) {
        this.recommendData = result.list
      }
    },
    // 查询浏览记录
    async queryBrowseRecord() {
      const result = await this.$api.product.queryBrowseRecord().catch(() => {})
      if (result && result.list && result.list.length) {
        this.historyData = result.list
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.cs-pdp-wrap {
  .cs-empty {
    padding: 80px 0;
    border-bottom: 1px solid #f7f7f7;
  }
}
</style>
