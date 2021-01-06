<template>
  <div class="pc-serach">
    <div class="sort-wrap" :style="{ top: `${contentMarginTop / 100}rem` }">
      <CupDropDownButton
        v-model="sortId"
        :options="filterOptions"
        @input="changeSort"
      >
        <span slot="title">SORT</span>
      </CupDropDownButton>
    </div>

    <!-- 空页面 -->
    <div v-if="isEmpty && sortId" class="empty-wrap">
      <cup-empty class="icon-no-searchProduct">
        <p>NO PRODUCTS</p>
      </cup-empty>
    </div>
    <div v-else class="content-wrap">
      <!-- 商品列表 -->
      <div class="list-wrap">
        <ul>
          <li v-for="(item, i) of datas" :key="i" class="cs-list-item">
            <cup-product :product="item" is-type is-href @click="toDetail">
            </cup-product>
          </li>
        </ul>
      </div>
      <!-- 分页 -->
      <div class="cs-pagination">
        <el-pagination
          small
          layout="prev, pager, next"
          :total="totals"
          :current-page.sync="pageNo"
          :page-size="pageSize"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import searchMixin from '../searchMixin'

export default {
  mixins: [searchMixin],
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
}

.cup-collapse-title {
  font-size: 14px;
  font-family: Muli-Bold, Muli, sans-serif;
  font-weight: bold;
  color: #333333;
  line-height: 18px;
  letter-spacing: 2px;
}
// 空页面
.empty-wrap {
  padding: 100px 0;
  text-align: center;
  width: 100%;
  /deep/.icon-no-searchProduct {
    i {
      @include icon-image('icon_no_searchProduct', 'png');
      width: 200px;
      height: 200px;
    }
    .cs-empty-content {
      p {
        margin-top: 10px;
      }
    }
    .cs-button {
      margin-top: 40px;
    }
  }
}
</style>
