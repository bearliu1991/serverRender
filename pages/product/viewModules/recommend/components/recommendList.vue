<template>
  <div class="example-3d">
    <swiper class="recommend-swipe" :options="swiperOption">
      <swiperSlide
        v-for="(item, index) in recommendList"
        :key="index"
        class="swiper-slide"
      >
        <div class="product-card-vertical">
          <img :src="item.imageUrl" class="image-box" />
          <h6 class="product-name">{{ item.productName }}</h6>
          <p class="product-price">
            {{ $t('unit') }}
            {{ item.currencySign }}
            <span class="letter-bold">{{
              item.discountPrice || item.retailPrice
            }}</span>
            <span v-if="item.discountPrice" class="original-price"
              >{{ $t('unit') }} {{ item.retailPrice }}</span
            >
          </p>
          <div class="rate-modal">
            <el-rate
              v-model="item.rating"
              class="rate-box"
              disabled
              :colors="['#F8AB04', '#F8AB04', '#F8AB04']"
              disabled-void-color="#F8AB04"
              disabled-void-icon-class="el-icon-star-off"
            ></el-rate>
            <span class="evaluate-count">({{ item.ratingNum }})</span>
          </div>
        </div>
      </swiperSlide>
      <swiperSlide class="swiper-slide"> slider 2 </swiperSlide>
      <div slot="button-prev" class="swiper-button-prev"></div>
      <div slot="button-next" class="swiper-button-next"></div>
      <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
      <!-- <div slot="pagination" class="swiper-pagination"></div> -->
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'RecommendList',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    recommendList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      activeIndex: 0,
      swiperOption: {
        // effect: 'coverflow',
        // grabCursor: true,
        // centeredSlides: true,
        // slidesPerView: 'auto',
        // coverflowEffect: {
        //   rotate: 50,
        //   stretch: 0,
        //   depth: 100,
        //   modifier: 1,
        //   slideShadows: true,
        // },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        // pagination: {
        //   el: '.swiper-pagination',
        // },
        on: {
          slideChangeTransitionEnd: ({ activeIndex }) => {
            this.activeIndex = activeIndex // 切换结束时，告诉我现在是第几个slide
          },
        },
      },
    }
  },
  beforeCreate() {},
  mounted() {},
}
</script>
<style lang="scss" scoped>
// you may also like
.recommend-swipe {
  height: 400px;
  .swiper-wrapper {
    height: 100%;
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .product-card-vertical {
    width: 200px;
  }
}

// 商品卡片
.product-card-vertical {
  width: 200px;
  .image-box {
    width: 100%;
    height: 300px;
    margin-bottom: $padding-2m;
  }
  .product-name {
    color: $primary;
    font-size: $font-size-xs;
    font-family: $muli-regular-font-family;
    line-height: 15px;
    letter-spacing: 1px;
    width: 100%;
    margin-bottom: 6px;
    text-align: center;
    font-weight: normal;
    @include ellipsis;
  }
  .product-price {
    font-size: $font-size-xs;
    text-align: center;
    width: 100%;
    margin-bottom: 6px;
  }
  .rate-modal {
    text-align: center;
  }
}
</style>
