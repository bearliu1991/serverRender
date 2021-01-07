<template>
  <div class="cs-review">
    <!-- 标题 -->
    <h1>CUSTOMER REVIEW</h1>
    <div class="cs-review-wrapper">
      <div class="cs-review-container">
        <review-star />
        <review-swiper :list="list1" />
        <div class="cs-review-btn">
          <cup-button
            size="big"
            animated
            type="primary"
            @click="showReview = true"
            >WRITE A REVIEW</cup-button
          >
        </div>
      </div>
      <!-- 评论form表单 -->
      <comment-pop
        v-show="showReview"
        :show-pop="showReview"
        @closePop="closePop"
      />
      <!-- 评论列表 -->
      <comment-list />
    </div>
  </div>
</template>
<script>
import ReviewStar from './components/starts'
import ReviewSwiper from './components/reviewSwiper'
export default {
  components: { ReviewStar, ReviewSwiper },
  data() {
    return {
      recommendData: [],
      showReview: false,
      list1: [
        {
          mobileImage:
            'https://cs-oss-release.oss-cn-hangzhou.aliyuncs.com/product/20201231/f98d27cf49a34000aea74288ada61909.gif',
        },
      ],
    }
  },
  created() {},
  methods: {
    closePop(isShow) {
      this.showReview = isShow
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
}
</style>
