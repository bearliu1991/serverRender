<template>
  <div :class="['cs-searchResult', $store.state.terminal]">
    <!-- 搜索结果数量展示 -->
    <header class="result">
      <p>
        <em>{{ totals }}&nbsp;</em>results for
        <em>“{{ keywords }}”</em>
      </p>
    </header>
    <!-- 搜索无结果 -->
    <div v-if="isEmpty && !sortId" class="empty-wrap">
      <cup-empty class="icon-no-search">
        <p>SORRY</p>
        <div class="desc">
          Your search <em>“{{ keywords }}”</em> did did not match any products.
          You can Check the spelling or Use more general terms.
        </div>
        <cup-button type="primary" @click="toShopping"
          >SHOP BEST SELLERS</cup-button
        >
      </cup-empty>
    </div>
    <!-- 搜索结果页 -->
    <search-result
      ref="search"
      v-else
      :datas="productList"
      :totals="totals"
      @update="updateData"
    ></search-result>
    <!-- 猜你喜欢模块  搜索没有结果时展示猜你喜欢-->
    <Recommend
      v-if="recommendData && isEmpty && !sortId"
      :kind="1"
      title="YOU MAY ALSO LIKE"
      :list="recommendData"
    />
  </div>
</template>

<script>
export default {
  name: 'Search',
  async asyncData({ app: { $http, $api }, query }) {
    const keywords = query.keyword
    const option = {
      keywords,
      pageSize: 24,
      pageNum: 1,
      sortType: '',
    }
    // 获取搜索商品
    const data = await $api.search.querySearchList(option).catch(() => {})
    if (!data) {
      // 展示空页面
      return {
        keywords,
        productList: [],
        totals: 0,
        isEmpty: true,
        sortId: '',
      }
    }
    return {
      keywords,
      productList: data && data.productVoList,
      totals: data.total,
      isEmpty: !(data.productVoList.length > 0),
      sortId: '',
    }
  },
  data() {
    return {
      recommendData: '',
      keywords: '',
    }
  },
  created() {
    this.keywords = this.$route.query.keyword
    this.isEmpty = false
  },
  mounted() {
    this.$refs.search && this.$refs.search.searchProduct()
    this.queryLikePrd()
    window.scrollTo(0, 0)
  },
  methods: {
    updateData(productList, totals) {
      this.productList = productList
      this.totals = totals
    },
    toShopping() {
      location.href = 'https://au.cupshe.com/collections/best-sellers-2'
    },
    async queryLikePrd() {
      const result = await this.$api.product.queryLikePrd('').catch(() => {})
      if (result && result.list.length) {
        this.recommendData = result.list
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.cs-searchResult {
  header {
    text-align: center;
    width: 100%;
    border-bottom: 1px solid #f7f7f7;
    em {
      @include font($fontMuliBold);
    }
    height: 118px;
    line-height: 118px;
    font-size: 18px;
    letter-spacing: 2px;
    em:first-child {
      font-size: 30px;
    }
  }

  .empty-wrap {
    padding: 100px 0;
    text-align: center;
    width: 100%;
    border-bottom: 1px solid #f7f7f7;
    /deep/.icon-no-search {
      i {
        @include icon-image('icon_no_search', 'png');
        width: 200px;
        height: 200px;
      }
      .cs-empty-content {
        font-size: 14px;
        font-family: Muli-Regular_Light, Muli;
        font-weight: normal;
        color: #333333;
        line-height: 21px;
        em {
          @include font($fontMuliBold);
        }
        p {
          margin-bottom: 12px;
          margin-top: 10px;
        }
      }
      .cs-button {
        margin-top: 40px;
      }
    }
  }
}

.mobile {
  &.cs-searchResult {
    background-color: #f7f7f7;
    header {
      border-bottom: 0;
      background-color: #fff;
      height: auto;
      font-size: 14px;
      line-height: 23px;
      letter-spacing: 1px;
      padding-top: 32px;
      em:first-child {
        font-size: 18px;
      }
    }
    .empty-wrap {
      background-color: #fff;
      padding: 24px 42px 40px 42px;
      margin-bottom: 12px;
      border-bottom: 0;
      /deep/.icon-no-search {
        i {
          width: 160px;
          height: 160px;
        }
        .cs-empty-content {
          font-size: 12px;
          line-height: 18px;
          p {
            margin-bottom: 8px;
          }
        }
        .cs-button {
          margin-top: 24px;
        }
      }
    }
  }
}
</style>
