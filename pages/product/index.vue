<template>
  <div class="container">
    <!-- <button @click="$store.commit('SET_TERMINAL')">切换终端</button> -->
    <!-- 商品信息 模块-->
    <ProductInfo :product="productVo" />
    <!-- 关联商品 -->
    <RelatedModel
      v-if="Number(productVo.productSpuState) !== 2"
      :buy-it-width="relateData"
    />
    <!-- 猜你喜欢模块 -->
    <Recommend :recommend-list="recommendData" />
    <!-- 评论模块 -->
    <!-- recently viewed -->
    <!-- <Recently :recently-list="historyData" /> -->
  </div>
</template>

<script>
// import qs from 'qs'
import mock from '../../mock/detail'
import DetailModule from '../../serviceSSR/product/detailService'
export default {
  async asyncData({ app: { $http }, query }) {
    const params = {
      spuId: query.spuId,
      fromId: 123,
      userId: 123,
      collectionId: 84,
    }
    const detailModule = new DetailModule($http, params)
    const responseData = await detailModule.init()
    return {
      responseData,
      productVo: mock.productData[0],
      relateData: mock.relateData,
      recommendData: mock.recommendData,
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

<style lang="scss" scoped>
.container-fixed {
  padding-bottom: 25px;
}
</style>
