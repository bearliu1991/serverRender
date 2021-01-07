<template>
  <div class="cs-swiper-container" v-if="list.length > 0">
    <swiper ref="mySwiper" class="swiper" :options="swiperOption">
      <swiper-slide v-for="item in [0, 1, 2, 3, 4, 5, 6, 7, 9]" :key="item">
        <el-image :src="url[item]" fit="cover"></el-image>
        <span
          ><i class="icon iconfont icon40-danchuangshangchuanzhaopian"></i
        ></span>
      </swiper-slide>
    </swiper>
    <div class="swiper-button-prev1 left-span" slot="button-prev1">
      <i class="icon iconfont iconweb-24-zuojiantou" style="font-size: 24px;" />
    </div>
    <div class="swiper-button-next1 right-span" slot="button-next1">
      <i class="icon iconfont iconweb-24-youjiantou" style="font-size: 24px;" />
    </div>
  </div>
</template>

<script>
// import Site from './item'

export default {
  // components: { Site },
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
      url: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      ],
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 8,
        // slidesPerGroup: 'auto',
        loop: false,
        // loopAdditionalSlides: 1,
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
    console.log(this.$refs.mySwiper.$swiper)
  },
  methods: {
    onClikc(v) {
      alert('v')
    },
    bannerJump(url) {
      console.log(url)
    },
  },
}
</script>

<style lang="scss" scoped>
.cs-swiper-container {
  width: 764px;
  position: relative;
  height: 100px;

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
  }
  .left-span {
    left: -32px;
  }
  .right-span {
    right: -32px;
  }
}
</style>
