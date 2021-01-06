<template>
  <div class="cs-review">
    <!-- 标题 -->
    <h1>CUSTOMER REVIEW</h1>
    <div class="cs-review-wrapper">
      <div class="cs-review-container">
        <review-star />
        <review-swiper />
        <div class="cs-review-btn">
          <div class="btn-contonet" @click="showReview = true">
            WRITE A REVIEW
          </div>
        </div>
      </div>
      <comment-pop
        v-show="showReview"
        :show-pop="showReview"
        @closePop="closePop"
      />
      <comment-list></comment-list>
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
    padding-top: 47px;
    padding-bottom: 62px;
  }
  &-btn {
    width: 216px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    background: #000000;
    margin: 30px 0;
    color: #ffffff;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
