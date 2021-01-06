<template>
  <div class="cs-swiper-container" v-if="list.length > 0">
    <cup-swiper-pc :list="list" type="fraction" :option="option">
      <template v-slot:swiper-item="{ item }">
        <template>
          <img :src="item.mobileImage" />
        </template>
      </template>
    </cup-swiper-pc>
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
    return {
      list1: [
        {
          mobileImage:
            'https://cs-oss-release.oss-cn-hangzhou.aliyuncs.com/product/20201231/f98d27cf49a34000aea74288ada61909.gif',
        },
      ],
      option: {
        loop: true,
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.cs-swiper-container {
  width: 764px;
}
</style>
