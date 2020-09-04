<template>
  <div class="container">
    <!-- 商品卡片 -->
    <div class="product-detail">
      <van-swipe class="product-image-swipe">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" class="product-detail-image" />
        </van-swipe-item>
      </van-swipe>
      <!-- 基础信息卡片 -->
      <div class="product-detail-info">
        <h4 class="product-detail-name">{{ productName.toUpperCase() }}</h4>
        <div class="product-detail-row">
          <span class="product-price">&#36; 23.90</span
          ><span class="original-price">&#36;53.90</span>
          <div class="flex-end">
            <van-rate
              v-model="value"
              :size="$px2vw(12)"
              :gutter="$px2vw(5)"
              color="#F8AB04"
              void-icon="star-o"
              void-color="#F8AB04"
              readonly
            />
            <span class="evaluate-count">(102)</span>
          </div>
        </div>
        <div>
          <p class="product-explain">
            Make 4 interest-free payments of
            <i class="font-bold">&#36;12.49</i>
            AUD fortnightly with
          </p>
        </div>
        <div class="afterplay-tag"></div>
        <a class="link-text">More info</a>
      </div>
      <!-- 商品型号选择 -->
      <div class="model-picker-container">
        <!-- 颜色 -->
        <h5 class="picker-title">{{ $t('detail.color') }}</h5>
        <ul class="model-picker mb-24">
          <li
            v-for="(item, index) in colorList"
            :key="index"
            class="model-picker-item"
          >
            <img :src="item.image" />
          </li>
        </ul>
        <!-- 型号 -->
        <h5 class="picker-title">{{ $t('detail.size') }}</h5>
        <div class="size-guide-row display-flex">
          <p>
            <i class="size-fit-tag"></i>
            <a class="link-text">Which Size Fits Me?</a>
          </p>
          <p>
            <span class="iconfont">&#xe63d;</span>
            <a class="link-text">Size Guide</a>
          </p>
        </div>
        <ul class="model-picker">
          <li
            v-for="(item, index) in sizeList"
            :key="index"
            class="model-picker-item"
          >
            {{ item.text }}
          </li>
        </ul>
        <!-- 数量 -->
        <h5 class="picker-title">{{ $t('detail.size') }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ app: { $api, store } }) {
    const res = await $api.musicRankings()
    // eslint-disable-next-line no-console
    // console.log('测试数据', res)
    return {
      res,
      productName: 'Retro polka dot and stripe halter one piece swmin',
      images: ['/images/size1.jpg', '/images/size1.jpg', '/images/size1.jpg'],
      value: 4.5,
      colorList: [
        {
          code: 1,
          image: '/images/size2.png',
        },
        {
          code: 2,
          image: '/images/size2.png',
        },
        {
          code: 3,
          image: '/images/size2.png',
        },
      ],
      sizeList: [
        {
          code: 1,
          text: 'XS',
        },
        {
          code: 2,
          text: 'S',
        },
        {
          code: 3,
          text: 'M',
        },
        {
          code: 4,
          text: 'XL',
        },
        {
          code: 1,
          text: 'XS',
        },
      ],
    }
  },
  data() {
    return {
      name: '1',
    }
  },
  computed: {},
  beforeCreate() {},
  mounted() {},
  methods: {
    async getVideo() {
      const res = await this.$api.videoCategory()
      // eslint-disable-next-line no-console
      console.log(res)
    },
  },
}
</script>

<style lang="stylus">
.mb-24
  margin-bottom $padding-4m
// 商品详情卡片
.product-detail
  .product-image-swipe
    height 563px
  .product-detail-image
    height 100%
  .product-detail-info
    font-family $common-text-font-family
    padding $padding-4m $padding-4m $padding-6m $padding-4m
    background $gray-1
    .product-detail-name
      font-size $font-size-lg
      line-height 27px
      letter-spacing 2px
      margin-bottom $padding-4m
    .product-detail-row
      display flex
      align-items center
      margin-bottom $padding-3m
      > *
        flex-shrink 0
      .product-price
        font-size $font-size-xl
        font-weight bold
        line-height 25px
        letter-spacing 2px
        padding-right  $padding-2m
      .flex-end
        flex-grow 1
        text-align right
      .evaluate-count
        font-size $font-size-xs
        font-weight 300
        font-family 'PingFangSC-Light', 'PingFang SC'
    .product-explain
      font-size $font-size-xs
      margin-bottom $padding-2m

// 商品型号选择模块
.model-picker-container
  padding 26px $padding-4m
  .picker-title
    font-family $muil-font-family
    font-size $font-size-xs
    font-weight normal
    margin-bottom $padding-3m
  .model-picker
    display flex
    .model-picker-item
      width 36px
      height 36px
      border-radius 50%
      text-align center
      line-height 28px
      border 1px solid #d8d8d8
      padding $padding-base
      cursor pointer
      &:not(:last-child)
        margin-right $padding-4m
      &.selected
        border 1px solid $black
        color #000
      > img
        width 100%
        height 100%
        border-radius 50%

// 尺码助手
.size-guide-row
  margin-bottom $padding-6m
  > p:first-child
    margin-right 35px

.size-fit-tag
  display inline-block
  vertical-align text-bottom
  width 14px
  height 14px
  background url('~assets/images/trueFitSize@2x.png') no-repeat
  background-size cover
  margin-right $padding-base
</style>
