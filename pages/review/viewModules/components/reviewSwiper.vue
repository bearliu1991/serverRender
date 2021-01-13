<template>
  <div
    class="cs-swiper-container"
    v-if="list.length > 0"
    :class="mobile ? 'm-container' : ''"
  >
    <swiper ref="mySwiper" class="swiper" :options="swiperOption">
      <swiper-slide v-for="(item, index) in list" :key="index">
        <el-image :src="item" fit="cover"></el-image>
        <template v-if="item === 'video'"><video :src="item"></video></template>
      </swiper-slide>
    </swiper>
    <template v-if="$store.state.terminal === 'pc'">
      <div class="swiper-button-prev1 left-span" slot="button-prev1">
        <i
          class="icon iconfont iconicon-web-40-zuojiantou"
          style="font-size: 24px;"
        />
      </div>
      <div class="swiper-button-next1 right-span" slot="button-next1">
        <i
          class="icon iconfont iconicon-web-40-youjiantou"
          style="font-size: 24px;"
        />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    const _this = this
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      visible: false,
      mobile: '',
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 8,
        // slidesPerGroup: '2',
        // loop: true,
        autoplay: true,
        loopAdditionalSlides: 1,
        on: {
          click(e) {
            const url = e.target.currentSrc // jumpurl是在swiper-slide中动态绑定的data-jumpUrl属性，值是从后台获取的跳转链接
            _this.bannerJump(url)
          },
        },
        loopFillGroupWithBlank: true,
        navigation: {
          nextEl: '.swiper-button-next1',
          prevEl: '.swiper-button-prev1',
        },
      },
    }
  },
  computed: {
    mySwiper() {
      return this.$refs.mySwiper.$swiper
    },
  },
  mounted() {
    this.mobile = this.$store.state.terminal === 'mobile'
  },
  methods: {
    bannerJump(url) {
      console.log(url)
      // this.visible = true'
      this.$emit('show')
    },
  },
}
</script>

<style lang="scss" scoped>
.m-container {
  width: 100%;
  padding: 1 16px;
}
.cs-swiper-container {
  width: 764px;
  position: relative;
  height: 100px;
  padding: 0 80px;
  margin-right: 30px;
  /deep/ .swiper-slide {
    width: 100px !important;
    height: 100px;
    background: #ffffff;
    line-height: 1;
    text-align: center;
    .el-image {
      height: 100%;
    }
    span {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      z-index: 11;
      width: 100%;
      height: 100%;
      line-height: 100px;
      &:hover {
        background: rgba($color: #000000, $alpha: 0.3);
        i {
          color: #ffffff;
          display: block;
        }
      }
      i {
        display: none;
        font-size: 24px;
      }
    }
    img {
      height: 100%;
      object-fit: cover;
      &:hover {
        background: rgba($color: #000000, $alpha: 0.5);
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }

  .left-span,
  .right-span {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    margin-top: -12px;
    outline: none;

    &:hover {
      cursor: pointer;
    }
    i {
      color: #999;
    }
  }
  .left-span {
    left: 15px;
  }
  .right-span {
    right: 15px;
  }
}
</style>
