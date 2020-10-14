<template>
  <div class="cup-swiper-pc">
    <client-only>
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="(item, i) of list" :key="i">
          <slot name="swiper-item" v-bind:item="item"></slot>
        </swiper-slide>
      </swiper>
    </client-only>
    <a class="btn-prev" role="button" @click="mySwiper.slidePrev()"></a>
    <a class="btn-next" role="button" @click="mySwiper.slideNext()"></a>
  </div>
</template>

<script>
export default {
  name: 'CupSwiperPC',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    slidesPerView: {
      type: Number,
      default: 4,
    },
    spaceBetween: {
      type: Number,
      default: 16,
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: this.slidesPerView,
        spaceBetween: this.spaceBetween,
        on: {
          init: (swiper) => {
            this.mySwiper = swiper
          },
        },
      },
      mySwiper: null,
    }
  },
}
</script>

<style lang="scss" scoped>
.cup-swiper-pc {
  position: relative;
  
    $margin-x: 208 / 1920 * 100%;
    margin: 0 $margin-x;
}

@mixin btn-ctrl() {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  z-index: 1;
  cursor: pointer;
}
.btn-prev {
  @include icon-image('icon_swiper_ctrl_left');
  @include btn-ctrl;
  left: 0;
  transform: translateX(-70px);
}
.btn-next {
  @include icon-image('icon_swiper_ctrl_right');
  @include btn-ctrl;
  right: 0;
  transform: translateX(70px);
}
</style>