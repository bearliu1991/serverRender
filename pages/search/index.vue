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
          Your search <em>“Aa”</em> did did not match any products. You can
          Check the spelling or Use more general terms.
        </div>
        <cup-button type="primary">SHOP BEST SELLERS</cup-button>
      </cup-empty>
    </div>
    <!-- 搜索结果页 -->
    <search-result
      v-else
      :datas="productList"
      :totals="totals"
      @update="updateData"
    ></search-result>
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
      productList: data && data.productList,
      totals: data.total,
      isEmpty: false,
      sortId: '',
    }
  },
  methods: {
    updateData(productList, totals) {
      this.productList = productList
      this.totals = totals
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
    header {
      height: 87px;
      line-height: 87px;
      font-size: 14px;
      letter-spacing: 1px;
      em:first-child {
        font-size: 18px;
      }
    }
    .empty-wrap {
      padding: 40px 42px;
      /deep/.icon-no-search {
        i {
          width: 108px;
          height: 108px;
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
