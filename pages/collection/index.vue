<template>
  <div>
    <div
      v-if="bannerData"
      :class="['category', imgUrl ? '' : 'noImg', $store.state.terminal]"
    >
      <div v-if="imgUrl" class="mask">
        <img :src="imgUrl" alt="" srcset="" />
      </div>
      <div class="cs-banner">
        <h1>{{ bannerData.collectionName }}</h1>
        <div class="cs-explanation" v-html="bannerData.explanation"></div>
      </div>
    </div>
    <!-- sort 模块 -->
    <CategoryInfo
      :filter-data="filterData"
      :datas="categoryData"
      :total-num="totals"
      :name="bannerData.collectionName"
      @update="updateData"
    ></CategoryInfo>

    <!-- recently viewed 浏览记录-->
    <Recommend
      v-if="historyData"
      :list="historyData"
      type="history"
      title="RECENTLY VIEWED"
    />
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
    const collectionId = query.id
    const option = {
      collectionId,
      colors: [],
      pageSize: 24,
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
    // 获取分类下商品
    const p3 = $api.collection.productSkusByCollection(option)
    // 查询浏览记录
    // const p4 = $api.product.queryBrowseRecord()
    const data = await Promise.all([p1, p2, p3]).catch(() => {})
    if (!data) {
      // 展示空页面
      return {
        bannerData: null,
        filterData: {},
        categoryData: [],
        totals: 0,
        // historyData: (data[3] && data[3].list) || [],
      }
    }
    return {
      bannerData: data[0] || null,
      filterData: data[1] || {},
      categoryData: data[2] && data[2].list,
      totals: data[2].total,
      // historyData: (data[3] && data[3].list) || [],
    }
  },
  data() {
    return {
      historyData: [],
      isEmpty: false,
    }
  },
  computed: {
    imgUrl() {
      const { terminal, bannerData } = this
      if (terminal === 'pc') {
        return bannerData.bannerPcUrl
      } else {
        return bannerData.bannerMUrl
      }
    },
  },
  // 参数校验
  validate({ query }) {
    const collectionId = query.id

    return /^\d+$/.test(collectionId)
  },
  mounted() {
    this.queryBrowseRecord()
  },
  methods: {
    // 查询浏览记录
    async queryBrowseRecord() {
      const result = await this.$api.product.queryBrowseRecord().catch(() => {
        this.historyData = []
      })
      if (result && result.list && result.list.length) {
        this.historyData = result.list
      }
    },
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
    height: auto;
    min-height: 118px !important;
    margin-bottom: 0;
    .cs-banner {
      color: #333333;
    }
    h1 {
      font-size: 30px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;

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
  .cs-banner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    word-break: break-all;
    color: #ffffff;
    h1 {
      font-size: 48px;
      @include font($fontMuliBold);

      line-height: 60px;
      letter-spacing: 2px;
    }
    .cs-explanation {
      text-align: center;
      margin-top: 8px;
      font-size: 30px;
    }
  }
  &.mobile {
    height: 210px;
    margin-bottom: 24px;
    color: #ffffff;
    h1 {
      font-size: 24px;
      line-height: 27px;
      letter-spacing: 1px;
    }
    .cs-banner {
      .cs-explanation {
        font-size: 14px;
      }
    }
    &.noImg {
      min-height: 87px !important;
      margin-bottom: 0;
      .cs-banner {
        color: #333333;
      }
      h1 {
        font-size: 18px;
        line-height: 23px;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
