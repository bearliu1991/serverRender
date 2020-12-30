<template>
  <client-only>
    <div
      :class="['cs-container', isBig ? 'areaBig' : '']"
      v-if="listEmp.length > 0"
    >
      <swiper
        v-if="initStatus"
        ref="mySwiper"
        class="swiper product-image-swipe"
        :options="swiperOption"
      >
        <swiper-slide v-for="(mediaItem, index) in listEmp" :key="index">
          <template v-if="mediaItem">
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
              您的浏览器不支持 video 标2签。
            </video>
          </template>
        </swiper-slide>
        <div slot="pagination" class="swiper-pagination"></div>
      </swiper>
      <i class="close" @click="close"></i>
    </div>
  </client-only>
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
      // eslint-disable-next-line vue/no-reserved-keys
      listEmp: [],
      isBig: false,
      activeIndex: 0,
      initStatus: false,
      swiperOption: {},
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    },
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.listEmp = this.list
      }, 1000)

      this.swiperOption = {
        observer: true,
        observeParents: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        on: {
          click: () => {
            const { isBig } = this
            if (isBig) {
              return false
            }
            this.showBigImg()
          },
        },
      }
      this.initStatus = true
    })
  },
  destroyed() {},
  methods: {
    // 查看大图
    showBigImg() {
      this.isBig = true
    },
    close() {
      this.isBig = false
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-container {
  &.areaBig {
    position: fixed;
    z-index: 9999;
    top: 0;
    right: 0;
    left: 0;
    background-color: #fff;
    bottom: 0;
    width: 100%;
    .product-image-swipe {
      height: 100%;
    }
    .close {
      @include icon-image('icon-close_circle');
      width: 32px;
      height: 32px;
      position: absolute;
      top: 16px;
      right: 16px;
      z-index: 99;
    }
  }
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
