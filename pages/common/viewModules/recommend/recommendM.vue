<!-- 猜你喜欢 -->
<template>
  <div v-if="list.length">
    <div :class="['cs-recommend', type]">
      <h3 v-if="title" class="cs-recommend-title">{{ title }}</h3>
      <client-only>
        <cup-swiper-pc :list="list" :option="swiperOption">
          <template v-slot:swiper-item="{ item }">
            <template v-if="type == 'history'">
              <cup-product
                :product="item"
                :is-rate="false"
                is-type
              ></cup-product>
            </template>
            <template v-else>
              <cup-product :product="item" :is-rate="false"></cup-product>
            </template>
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
    // 区分浏览记录还是猜你喜欢
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      activeIndex: 0,
      swiperOption: {
        loop: false,
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
        },
      },
    }
  },
  beforeCreate() {},
  mounted() {
    console.log(3)
  },
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
      margin: 6px 0;
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
    // align-items: center;
    .swiper-slide {
      width: 138px;
      .p-img {
        height: 207px;
        padding-bottom: 0;
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
