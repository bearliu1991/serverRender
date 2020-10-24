<!-- 猜你喜欢 -->
<template>
  <div v-if="list.length">
    <div class="cs-recommend">
      <h3 v-if="title" class="cs-recommend-title">{{ title }}</h3>
      <client-only>
        <cup-swiper-pc :list="list" type="fraction">
          <template v-slot:swiper-item="{ item }">
            <cup-product :product="item"></cup-product>
          </template>
        </cup-swiper-pc>
      </client-only>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RecommendPC',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
    title: {
      type: String,
      default: '',
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
.cs-recommend {
  padding: 100px 138px;
  &-title {
    margin-bottom: 40px;
    text-align: center;
    font-size: 30px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #000000;
    line-height: 38px;
    letter-spacing: 2px;
  }
}
.separate-block {
  width: 100%;
  height: 12px;
  background: $gray-1;
}
</style>
