<template>
  <div>
    <div
      :class="[
        'category',
        bannerData.bannerUrl ? '' : 'noImg',
        $store.state.terminal,
      ]"
    >
      <template v-if="bannerData.bannerUrl">
        <div class="mask">
          <img :src="bannerData.bannerUrl" alt="" srcset="" />
        </div>
        <h1>{{ bannerData.collectionName }}</h1>
      </template>
      <template v-else>
        <h1>NEW IN</h1>
      </template>
    </div>
    <!-- sort 模块 -->
    <CategoryInfo
      :filter-data="filterData"
      :datas="categoryData"
      :total-num="totals"
      @update="updateData"
    ></CategoryInfo>

    <!-- recently viewed 浏览记录-->
    <Recommend v-if="historyData" :list="historyData" title="RECENTLY VIEWED" />
  </div>
</template>

<script>
import CategoryInfo from './viewModules/category'

export default {
  name: 'Category',
  components: {
    CategoryInfo,
  },
  async asyncData({ app: { $http, $api }, query }) {
    const collectionId = query.collectionId
    const option = {
      collectionId,
      colors: [],
      pageSize: 10,
      pageNum: 1,
      sortId: 0,
      prices: [],
      productTypes: [],
      sizes: [],
      styleTagIds: [],
      trendTagIds: [],
    }
    // 获取搜索Banner图
    const p1 = $api.collection.getBannerByCollection(collectionId)
    // 获取搜索条件
    const p2 = $api.collection.searchCondition(collectionId)
    const p3 = $api.collection.productSkusByCollection(option)
    const p4 = $api.product.queryBrowseRecord()
    const data = await Promise.all([p1, p2, p3, p4])
    return {
      bannerData: data[0],
      filterData: data[1],
      categoryData: data[2].list,
      totals: data[2].total,
      historyData: (data[3] && data[3].list) || [],
    }
  },
  methods: {
    updateData(categoryData, totals) {
      this.categoryData = categoryData
      this.totals = totals
    },
  },
}
</script>

<style lang="scss" scoped>
.category {
  height: 400px;
  position: relative;
  overflow: hidden;
  &.noImg {
    height: 118px !important;
    line-height: 118px;
    margin-bottom: 0;
    h1 {
      font-size: 30px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 38px;
      letter-spacing: 2px;
    }
  }

  .mask {
    position: absolute;
    z-index: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url(https://cdn.shopifycdn.net/s/files/1/1135/4928/products/cyy21384.jpg?v=1583221490)
      no-repeat center;
    background-size: cover;
    img {
      height: 100%;
    }
  }
  h1 {
    font-size: 48px;
    @include font($fontMuliBold);
    color: #ffffff;
    line-height: 60px;
    letter-spacing: 2px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    word-break: break-all;
  }
  &.mobile {
    height: 210px;
    margin-bottom: 24px;
    h1 {
      font-size: 24px;
      color: #ffffff;
      line-height: 27px;
      letter-spacing: 1px;
    }
    &.noImg {
      height: 87 !important;
      line-height: 87px;
      margin-bottom: 0;
      h1 {
        font-size: 18px;
        color: #333333;
        line-height: 23px;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
