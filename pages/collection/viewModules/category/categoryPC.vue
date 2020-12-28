<template>
  <div>
    <div class="sort-wrap" :style="{ top: `${contentMarginTop / 100}rem` }">
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
      <div
        v-if="!isEmpty(filterDataFiltered)"
        class="aside-wrap"
        :style="{ top: `${(contentMarginTop + 57) / 100}rem` }"
      >
        <div
          class="cs-sticy"
          :style="{ top: `${(contentMarginTop + 67) / 100}rem` }"
        >
          <CategoryFilter
            v-model="checkedFilters"
            :list="filterDataFiltered"
          ></CategoryFilter>
        </div>
      </div>
      <div class="main-wrap">
        <cup-empty v-if="isEmptyPage" class="icon-no-result">
          <p>NO PRODUCTS</p>
          <cup-button v-if="!isEmpty(filterData)" @click="clearData"
            >RESET FILTERS</cup-button
          >
        </cup-empty>
        <CategoryList
          v-else
          :name="name"
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
  padding-right: 56px;
  justify-content: flex-end;
  border-top: 1px solid #f7f7f7;
  border-bottom: 1px solid #f7f7f7;
  .cup-drop-down-button {
    border-left: 1px solid #f4f4f4;
  }
}
.content-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #f7f7f7;

  $aside-width: 308px;
  padding: 0px 56px 39px 36px;
  .aside-wrap {
    position: sticky;
    top: 57px;
    width: $aside-width;
    padding: 20px 30px 40px 20px;
    flex-shrink: 0;
    .cs-sticy {
      position: sticky;
      top: 67px;
    }
  }
  .main-wrap {
    display: block;
    flex: 1;
    overflow: hidden;
    padding-top: 40px;
    padding-bottom: 45px;
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
.cs-empty {
  padding-top: 60px;
  .cs-button {
    margin-top: 40px;
    padding: 0 67px;
  }
}
</style>
