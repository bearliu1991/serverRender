<template>
  <div class="cs-review">
    <!-- 标题 -->
    <h1>CUSTOMER REVIEW</h1>
    <div class="cs-review-wrapper">
      <div class="cs-review-container">
        <review-star :score-and-count="scoreAndCount" />
        <review-swiper :list="[]" />
        <div class="cs-review-btn">
          <cup-button
            size="big"
            animated
            type="primary"
            @click="showReview = true"
            :disabled="showReview === true"
            >WRITE A REVIEW</cup-button
          >
        </div>
      </div>
      <!-- 评论form表单 -->
      <comment-pop
        v-if="showReview"
        :show-pop="showReview"
        @closePop="closePop"
        @openSuccess="openSuccess"
      />
      <!-- 提交成功 -->
      <comment-success v-if="isSuccess" @closeSuccess="closeSuccess" />

      <!-- 评论列表 -->
      <comment-list ref="commentlist" />
    </div>
  </div>
</template>
<script>
import ReviewStar from './components/starts'
import ReviewSwiper from './components/reviewSwiper'
import reviewsMixin from './reviewsMixin'
import CommentSuccess from './components/commentSuccess'
export default {
  components: { ReviewStar, ReviewSwiper, CommentSuccess },
  mixins: [reviewsMixin],
  data() {
    return {
      recommendData: [],
      showReview: false,
    }
  },
  methods: {
    closePop(isShow) {
      this.showReview = isShow
    },
    closeSuccess(isTrue) {
      this.isSuccess = isTrue
    },
    openSuccess() {
      this.isSuccess = true
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-review {
  h1 {
    padding: 100px 208px 40px 208px;
    font-size: 30px;
    @include font($fontMuliBold);
    color: #333333;
    line-height: 38px;
    text-align: center;
  }
  &-wrapper {
    height: auto;
    padding: 0 285px;
    background: #fafafa;
    padding-bottom: 30px;
  }
  &-container {
    display: flex;
    justify-content: space-between;
    padding-top: 46px;
    align-items: center;
  }
  &-btn {
    .cs-button {
      width: 216px;
      span {
        font-size: 14px;
      }
    }
    &:hover {
      cursor: pointer;
    }
  }
  .cs-review-container {
    margin-bottom: 60px;
  }
  .cup-tabs {
    display: flex;
    justify-content: flex-start;
    margin-top: 30px;
    .cup-content {
      padding: 16px;
      font-size: 18px;

      position: relative;
    }
    .active {
      border-bottom: 3px solid #333;
      font-weight: bold;
      @include font($fontMuliBold);
    }
  }
  .list {
    margin-top: 50px;
  }
}
</style>
