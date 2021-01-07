<template>
  <div class="cs-review">
    <!-- 标题 -->
    <h1>CUSTOMER REVIEW</h1>
    <div class="cs-review-wrapper">
      <div class="cs-review-score">
        <starts :size="{ fontSize: '36px' }" :mtop="{ marginTop: '0' }" />
        <div class="cs-review-btn" @click="isCommonentPop = true">
          WRITE A REVIEW
        </div>
      </div>
      <div class="filters" @click="isFiltersPop = true">
        <i class="icon iconfont icon14-shaixuan"></i>
        <span>More Filters</span>
      </div>
      <tag-list></tag-list>
      <comment-item-m></comment-item-m>
      <el-drawer
        title="FILTERS"
        direction="btt"
        size="80%"
        :visible.sync="isFiltersPop"
      >
        <comment-filters-m></comment-filters-m>
      </el-drawer>
      <el-drawer
        title="FILTERS"
        direction="btt"
        size="90%"
        :visible.sync="isFiltersPop"
      >
        <comment-filters-m></comment-filters-m>
      </el-drawer>
      <el-drawer
        title="WRITE A REVIEW"
        direction="btt"
        size="80%"
        :visible.sync="isCommonentPop"
      >
        <div class="pop-wrap">
          <comment-pop-item :style-obj="childStyle" />
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import TagList from './common/taglist'
import CommentPopItem from './common/commentPopItem'
export default {
  components: { TagList, CommentPopItem },
  data() {
    return {
      isFiltersPop: false,
      isCommonentPop: false,
      childStyle: {
        radioStyle: {
          flexDirection: 'column',
        },
        submitBtnStyle: {
          width: '100%',
        },
      },
    }
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.cs-review {
  h1 {
    padding: 0 16px 24px 16px;
    font-size: 18px;
    @include font($fontMuliBold);
    color: #333333;
    line-height: 23px;
    text-align: left;
  }
  &-wrapper {
    height: auto;
    background: #fafafa;
    padding: 0 16px;
  }
  .filters {
    width: 120px;
    background: #ffffff;
    border: 1px solid #d8d8d8;
    padding: 10px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    i {
      font-size: 16px;
    }
    span {
      font-size: 14px;
      color: #333333;
    }
  }
  .pop-wrap {
    padding: 0 16px;
  }
  /deep/ .el-drawer__body {
    overflow: scroll;
  }
  /deep/ .el-drawer__header > :first-child {
    font-size: 18px;
    @include font($fontMuliBold);
    text-align: center;
  }
  .cs-review-score {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 0;
    .cs-review-btn {
      font-size: 14px;
      @include font($fontMuliBold);
      text-align: center;
      height: 44px;
      line-height: 1.5;
      background: #333333;
      color: #ffffff;
      padding: 13px;
    }
  }
}
</style>
