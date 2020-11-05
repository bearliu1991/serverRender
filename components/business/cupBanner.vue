<template>
  <div class="cs_home_banner">
    <client-only>
      <cup-swiper-pc
        :list="bannerList.slideshowContentList"
        :option="swiperOption"
      >
        <template v-slot:swiper-item="{ item }">
          <div class="cup_home_banner_item">
            <img :src="item.pcImage" alt="" />
          </div>
        </template>
      </cup-swiper-pc>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    bannerList: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        slidesPerView: 'auto',
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
        },
      },
    }
  },
}
</script>

<style lang="scss">
.cup_home_banner_item {
  width: 100%;
  // height: 430px;
}
</style>
