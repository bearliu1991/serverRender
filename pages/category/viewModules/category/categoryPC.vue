<template>
  <div>
    <div class="sort-wrap">
      <CupDropDownButton
        v-model="sortId"
        :options="filterOptions"
        @input="changeSort"
      >
        <span slot="title">SORT</span>
      </CupDropDownButton>
    </div>

    <!-- 列表内容 -->
    <div class="content-wrap">
      <div class="aside-wrap">
        <div class="cs-sticy">
          <CategoryFilter
            v-model="checkedFilters"
            :list="filterDataFiltered"
          ></CategoryFilter>
        </div>
      </div>
      <div class="main-wrap">
        <cup-empty v-if="isEmpty" class="icon-no-result">
          <p>NO PRODUCTS</p>
          <cup-button>reset FILTERS</cup-button>
        </cup-empty>
        <CategoryList
          v-else
          :list="datas"
          :totals="totalNum"
          :current-pages="pageNo"
        ></CategoryList>
      </div>
    </div>
    <!-- /列表内容 -->
  </div>
</template>
<script>
import categoryMixin from '../categoryMixin'

export default {
  mixins: [categoryMixin],
}
</script>
<style lang="scss" scoped>
.sort-wrap {
  position: sticky;
  top: 0;
  background: #ffffff;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #f7f7f7;
}
.content-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  $aside-width: 258px;
  padding: 40px 56px;
  .aside-wrap {
    position: sticky;
    top: 57px;
    width: $aside-width;
    // margin-right: -1 * $aside-width;
    flex-shrink: 0;
    margin-right: 46px;
    .cs-sticy {
      position: sticky;
      top: 67px;
    }
  }
  .main-wrap {
    display: block;
    flex: 1;
  }
}

.cup-collapse-title {
  font-size: 14px;
  font-family: Muli-Bold, Muli, sans-serif;
  font-weight: bold;
  color: #333333;
  line-height: 18px;
  letter-spacing: 2px;
}
.radio-label {
  font-size: 14px;
  font-family: Muli-Regular_Light, Muli, sans-serif;
  font-weight: normal;
  color: #333333;
  line-height: 18px;
  letter-spacing: 2px;
}
.filter-list {
  li {
    padding: 6px 0;
  }
}
</style>
