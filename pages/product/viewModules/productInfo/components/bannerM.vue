<template>
  <div class="container">
    <swiper class="swiper product-image-swipe" :options="swiperOption">
      <swiper-slide v-for="(mediaItem, index) in list" :key="index">
        <img
          v-if="String(mediaItem.mediaType) === '0'"
          :src="mediaItem.mediaUrl"
          class="product-detail-image"
        />
        <video
          v-else-if="String(mediaItem.mediaType) === '1'"
          :src="mediaItem.mediaUrl"
          controls="controls"
          class="product-detail-image"
        >
          您的浏览器不支持 video 标签。
        </video>
      </swiper-slide>
      <div
        slot="pagination"
        class="swiper-pagination swiper-pagination-bullets"
      >
        <div
          v-for="i in list.length"
          :key="i"
          class="swiper-pagination-bullet"
          :class="{
            'swiper-pagination-bullet-active': i - 1 === activeIndex,
          }"
        ></div>
      </div>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'Mobile',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
    productType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      activeIndex: 0,
      swiperOption: {
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
.container {
  position: relative;
}
.breadcrumb-box {
  position: absolute;
  top: 0;
  left: 0;
  height: 36px;
  line-height: 18px;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  z-index: 11;
}
/deep/
  .swiper-container-horizontal
  > .swiper-pagination-bullets
  .swiper-pagination-bullet {
  margin: 0 5px;
}
.swiper {
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    background-color: #fff;
    align-items: center;
  }
  .swiper-pagination-bullets {
    bottom: 33px;
  }
  /deep/ .swiper-pagination-bullet {
    $size: 5px;
    width: $size !important;
    height: $size !important;
    line-height: $size !important;
    text-align: center;
    background: #fff;
    opacity: 1;
    vertical-align: middle;
    border-radius: 50%;

    &.swiper-pagination-bullet-active {
      $size: 8px;
      width: $size !important;
      height: $size !important;
      background: #ffab00;
    }
  }
}
.product-image-swipe {
  height: 563px;
  .product-detail-image {
    height: 100%;
  }
}
</style>
