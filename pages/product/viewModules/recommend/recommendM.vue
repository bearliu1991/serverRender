<!-- 猜你喜欢 -->
<template>
  <div>
    <div class="recomand-container">
      <h3 class="model-title">{{ $t('detail.recommand') }}</h3>
      <client-only>
        <RecommendList :recommend-list="recommendList" />
      </client-only>
    </div>
    <div class="separate-block"></div>
  </div>
</template>
<script>
export default {
  name: 'Mobile',
  props: {
    recommendList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      activeIndex: 0,
      swiperOption: {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: '.swiper-pagination',
        },
        on: {
          slideChangeTransitionEnd: ({ activeIndex }) => {
            this.activeIndex = activeIndex // 切换结束时，告诉我现在是第几个slide
          },
        },
      },
    }
  },
  beforeCreate() {},
  mounted() {},
}
</script>
<style lang="scss" scoped>
.recomand-container {
  padding: 40px 0 33px 0;
  .model-title {
    margin-bottom: 24px;
    text-align: center;
  }
}
.separate-block {
  width: 100%;
  height: 12px;
  background: $gray-1;
}
</style>
