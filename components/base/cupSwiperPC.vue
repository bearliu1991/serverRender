<template>
  <div :class="['cup-swiper-pc', type]">
    <client-only>
      <swiper
        ref="mySwiper"
        class="swiper"
        :options="swiperOption"
        @slideChangeTransitionStart="changeStart"
      >
        <swiper-slide v-for="(item, i) of list" :key="i">
          <slot name="swiper-item" :item="item"></slot>
        </swiper-slide>
        <!-- <template v-if="type != 'fraction'">
          <div slot="pagination" class="swiper-pagination"></div>
        </template> -->
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
      },
    }
  },
  computed: {
    mySwiper() {
      return this.$refs.mySwiper.$swiper
    },
  },
  mounted() {
    this.swiperOption = Object.assign(this.swiperOption, this.option)
    this.$nextTick(() => {
      const { mySwiper } = this
      this.snapGrid = mySwiper.snapGrid.length
      this.snapIndex = mySwiper.snapIndex
    })
  },
  methods: {
    changeStart(swiper) {
      const { mySwiper } = this
      this.snapGrid = mySwiper.snapGrid.length
      this.snapIndex = mySwiper.snapIndex
    },
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
