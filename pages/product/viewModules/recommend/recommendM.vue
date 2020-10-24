<!-- 猜你喜欢 -->
<template>
  <div v-if="list.length">
    <div class="cs-recommend">
      <h3 v-if="title" class="cs-recommend-title">{{ title }}</h3>
      <client-only>
        <cup-swiper-pc :list="list" :option="swiperOption">
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
  name: 'RecommendM',
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
        loop: true,
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
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
  .cup-product {
    text-align: center;
    width: 100%;
    /deep/ .cs-rate {
      justify-content: center;
    }
  }
  &-title {
    margin-bottom: 24px;
    margin-top: 40px;
    text-align: center;
    font-size: 18px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #000000;
    line-height: 23px;
    letter-spacing: 1px;
  }
  /deep/ .swiper-wrapper {
    align-items: center;
    .swiper-slide {
      width: 138px;
      .p-img {
        height: 207px;
      }
      img {
        opacity: 0.5;
      }
    }
    .swiper-slide-next {
      width: 200px;

      .p-img {
        height: 300px;
      }
      img {
        opacity: 1;
      }
    }
  }
}
.separate-block {
  width: 100%;
  height: 12px;
  background: $gray-1;
}
</style>
