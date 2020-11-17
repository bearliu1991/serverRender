<!-- 猜你喜欢 -->
<template>
  <div v-if="list.length">
    <div :class="['cs-recommend', type]">
      <h3 v-if="title" class="cs-recommend-title">{{ title }}</h3>
      <client-only>
        <cup-swiper-pc :list="list" :option="swiperOption">
          <template v-slot:swiper-item="{ item }">
            <cup-product :product="item" :is-rate="false"></cup-product>
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
    //  normal primary
    type: {
      type: String,
      default: 'normal',
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
  padding-left: 16px;
  padding-bottom: 40px;
  /deep/.cup-product {
    text-align: center;
    width: 100%;
    /deep/ .cs-rate {
      justify-content: center;
    }
    .p-name {
      font-size: 12px;
      font-family: Muli-Regular_SemiBold, Muli;
      font-weight: normal;
      color: #333333;
      line-height: 18px;
    }
    .p-price {
      text-align: left;
      strong {
        margin-bottom: 4px;
        display: block;
      }
    }
  }
  &-title {
    margin-bottom: 24px;
    margin-top: 40px;
    text-align: left;
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
    }
    .primary {
      .swiper-slide {
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
}
.separate-block {
  width: 100%;
  height: 12px;
  background: $gray-1;
}
</style>
