<template>
  <div :class="['cup-swiper-pc', type]">
    <client-only>
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="(item, i) of list" :key="i">
          <slot name="swiper-item" :item="item"></slot>
        </swiper-slide>
        <template v-if="type != 'fraction'">
          <div slot="pagination" class="swiper-pagination"></div>
        </template>
      </swiper>
    </client-only>

    <template v-if="type == 'fraction'">
      <template v-if="swiperOption.loop">
        <a class="btn-prev" role="button" @click="mySwiper.slidePrev()"></a>
        <a class="btn-next" role="button" @click="mySwiper.slideNext()"></a>
      </template>
      <template v-else>
        <a
          v-show="snapIndex != 0"
          class="btn-prev"
          role="button"
          @click="mySwiper.slidePrev()"
        ></a>
        <a
          v-show="snapIndex < snapGrid - 1"
          class="btn-next"
          role="button"
          @click="mySwiper.slideNext()"
        ></a>
      </template>
    </template>
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
    option: {
      type: Object,
      default: () => {
        return {}
      },
    },
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      snapGrid: 1,
      snapIndex: 0,
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 16,
        on: {
          init: (swiper) => {
            this.mySwiper = swiper
            this.snapGrid = swiper.snapGrid.length
            this.snapIndex = swiper.snapIndex
          },
          slideChangeTransitionStart: (swiper) => {
            this.snapGrid = swiper.snapGrid.length
            this.snapIndex = swiper.snapIndex
          },
        },
      },
      mySwiper: null,
    }
  },
  mounted() {
    this.swiperOption = Object.assign(this.swiperOption, this.option)
  },
}
</script>

<style lang="scss" scoped>
.cup-swiper-pc {
  position: relative;
  &.fraction {
    margin: 0 70px;
  }
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
