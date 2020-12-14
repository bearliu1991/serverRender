<template>
  <div class="m-category">
    <div class="sort-wrap">
      <div v-if="!isEmpty(filterData)" class="condition" @click="showFilter">
        <i class="icon iconfont icon24-fenlei-shaixuan"></i>
        <span
          >FILTER
          <template v-if="filterNum > 0"> ({{ filterNum }}) </template></span
        >
      </div>
      <div class="condition" @click="isShowSort = true">
        <i class="icon iconfont icon24-fenlei-fenlei"></i>
        <span>SORT</span>
      </div>
    </div>
    <div v-if="isEmptyPage" class="empty-wrap">
      <cup-empty class="icon-no-result">
        <p>NO PRODUCTS</p>
        <cup-button v-if="!isEmpty(filterData)">RESET FILTERS</cup-button>
      </cup-empty>
    </div>
    <div v-else class="content-wrap">
      <CategoryList
        :list="datas"
        :name="name"
        :totals="totalNum"
        :current-pages="pageNo"
      ></CategoryList>
    </div>

    <div class="line"></div>
    <!-- 过滤条件 -->
    <CategoryFilter
      ref="filters"
      v-model="checkedFilters"
      :list="filterDataFiltered"
      @change="getCondition"
    ></CategoryFilter>
    <!-- sort -->
    <cup-popup
      title="SORT"
      :visible="isShowSort"
      size="auto"
      @close-popup="close"
    >
      <ul class="m-sort">
        <li
          v-for="(item, index) in filterOptions"
          :key="index"
          :class="['m-sort-item', sortId == item.key ? 'active' : '']"
          @click="
            changeSort(item.key)
            close()
          "
        >
          <span>{{ item.show }}</span>
        </li>
      </ul>
    </cup-popup>
  </div>
</template>
<script>
import categoryMixin from '../categoryMixin.js'

export default {
  mixins: [categoryMixin],
  data() {
    return {
      isShowSort: false,
      filterNum: 0,
    }
  },
  methods: {
    close() {
      this.isShowSort = false
    },
    showFilter() {
      this.$refs.filters.$children[0].show()
    },
    // filter选中筛选条件获取筛选条件个数
    getCondition(checkedItems) {
      this.filterNum = checkedItems.length
    },
  },
}
</script>
<style lang="scss" scoped>
.m-category {
  // margin-top: 24px;
  .sort-wrap {
    display: flex;
    height: 44px;
    border-top: 1px solid #f7f7f7;
    border-bottom: 1px solid #f7f7f7;
    .condition {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: 100%;
      text-align: center;
      font-size: 14px;
      @include font($fontMuliBold);
      color: #333333;
      line-height: 18px;
      i {
        font-size: 16px;
        margin-right: 8px;
      }
      &:first-child {
        border-right: 1px solid #f7f7f7;
      }
    }
  }
  .content-wrap {
    padding: 16px 16px 0 16px;
  }
  .line {
    height: 12px;
    background: #fafafa;
    margin-top: 1px;
  }
  .m-sort {
    padding: 24px 16px 8px 16px;
    &-item {
      margin-bottom: 24px;
      font-size: 14px;
      color: #333333;
      line-height: 18px;
      text-align: center;
      &.active {
        @include font($fontMuliBold);
      }
    }
  }
  // 空页面
  .empty-wrap {
    min-height: 354px;
    display: flex;
    align-items: center;
    justify-content: center;
    .cs-button {
      margin-top: 24px;
    }
  }
}
</style>
