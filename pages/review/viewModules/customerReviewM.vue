<template>
  <div class="cs-review">
    <!-- 标题 -->
    <h1>CUSTOMER REVIEW</h1>
    <review-swiper :list="proAllMedia" />
    <div class="cs-review-wrapper">
      <div class="cs-review-score">
        <starts
          :size="{ fontSize: '36px' }"
          :score-and-count="scoreAndCount"
          :mtop="{ marginTop: '0' }"
        />
        <div
          class="cs-review-btn"
          v-if="tabIndex == 0"
          @click="isCommonentPop = true"
        >
          WRITE A REVIEW
        </div>
      </div>
      <!-- tab切换 -->
      <div class="cup-tabs">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="cup-content"
          @click="changeTabs(index)"
          :class="index === tabIndex ? 'active' : ''"
        >
          {{ tab }}
        </div>
      </div>
      <!-- 列表 -->
      <!-- 无评论 -->
      <no-data v-if="proList.length == 0" />
      <div class="list" v-else>
        <comment-item-m :key="item.id" :pro-data="item" v-for="item in proList">
          <template v-slot="{ item }">
            <div class="exactly">
              <h1>{{ item.title }}</h1>
              <p>{{ item.content }}</p>
              <div class="review-customer">
                <p>
                  On:
                  <a class="cs-link" v-if="tabIndex == 0"
                    >https://au.cupshe.com</a
                  >
                  <a class="cs-link" v-else>{{ item.productName }}</a>
                </p>
              </div>
            </div>
          </template>
        </comment-item-m>
        <!-- 分页 -->
        <div class="cs-pagination">
          <el-pagination
            layout="prev, pager, next"
            :total="totals"
            :current-page.sync="pageNum"
            :page-size="pageSize"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>

      <!-- 评论提交弹窗 -->
      <cup-popup
        title="WRITE A REVIEW"
        direction="btt"
        size="80%"
        v-model="isCommonentPop"
      >
        <div class="pop-wrap">
          <comment-pop-item :style-obj="childStyle" />
        </div>
      </cup-popup>
    </div>
  </div>
</template>
<script>
import CommentPopItem from './common/commentPopItem'
import reviewsMixin from './reviewsMixin'
export default {
  components: { CommentPopItem },
  mixins: [reviewsMixin],
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
    padding: 40px 16px 24px 16px;
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
  .pop-wrap {
    padding: 0 16px;
  }
  .cup-tabs {
    margin-bottom: 16px;
    display: flex;
    justify-content: flex-start;
    margin-top: 31px;
    .cup-content {
      padding-bottom: 4px;
      font-size: 14px;
      position: relative;
      margin-right: 16px;
    }
    .active {
      border-bottom: 3px solid #333;
      font-weight: bold;
      @include font($fontMuliBold);
    }
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
.m-comment-card {
  .exactly {
    h1 {
      margin-top: 0;
      margin-bottom: 7px;
      padding: 0;
      font-size: 14px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 18px;
    }
    p {
      font-size: 14px;
    }
    .review-customer {
      margin-top: 24px;
      a {
        word-break: break-all;
      }
    }
  }
}
.cs-pagination {
  text-align: center;
  background-color: #fafafa !important;
  /deep/.el-pagination button:disabled {
    background-color: #fafafa;
  }
  /deep/.el-pager li {
    background-color: #fafafa;
  }
}
</style>
