<template>
  <div class="m-serach">
    <div class="sort-wrap">
      <div class="condition" @click="isShowSort = true">
        <i class="icon iconfont icon24-fenlei-fenlei"></i>
        <span>SORT</span>
      </div>
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
    <!-- sort筛选条件 -->
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
import searchMixin from '../searchMixin.js'

export default {
  mixins: [searchMixin],
  data() {
    return {
      isShowSort: false,
    }
  },
  methods: {
    close() {
      this.isShowSort = false
    },
  },
}
</script>
<style lang="scss" scoped>
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
// 空页面
.empty-wrap {
  padding: 100px 0;
  text-align: center;
  width: 100%;
  /deep/.icon-no-searchProduct {
    i {
      @include icon-image('icon_no_searchProduct', 'png');
      width: 108px;
      height: 108px;
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
