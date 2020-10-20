<template>
  <!-- buy it with 模块 -->
  <div
    class="buy-with-container pc"
    :style="{ 'background-image': `url(${buyItWidth.imageUrl})` }"
  >
    <div class="container-mask"></div>
    <div class="container-content">
      <h3 class="model-title">{{ $t('detail.match') }}</h3>
      <div class="product-card-horizon" @click="handleClick(buyItWidth)">
        <img :src="buyItWidth.imageUrl" class="left-side" />
        <div class="right-side">
          <p class="product-title">{{ buyItWidth.productName }}</p>
          <p class="product-price">
            {{ buyItWidth.currencySign }}
            <span class="letter-bold">{{
              buyItWidth.discountPrice || buyItWidth.retailPrice
            }}</span>
          </p>
        </div>
        <cup-button size="medium" class="cs-buywith-button"
          >VIEW PRODUCT</cup-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Pc',
  props: {
    buyItWidth: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  beforeCreate() {},
  mounted() {},
  methods: {
    handleClick({ spuId = '' }) {
      if (!spuId) return false
      this.$router.push({
        path: 'detail',
        query: {
          spuId,
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.model-title {
  font-size: 30px;
  font-family: Muli-Bold, Muli;
  font-weight: bold;
  color: #333333;
  line-height: 38px;
  letter-spacing: 2px;
}
// buy it with
.buy-with-container {
  width: 744px;
  margin-left: 284px;
  height: 278px;
  background-size: cover;
  position: relative;
  .container-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    opacity: 0.8;
  }
  .container-content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    padding: 0 30px;
    .model-title {
      margin: 24px 0;
    }
  }
  .product-card-horizon {
    cursor: pointer;
  }
}
// 商品横向模块
.product-card-horizon {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  .left-side {
    width: 160px;
    height: 160px;
    flex-shrink: 0;
  }
  .right-side {
    flex: 1;
    padding: 28px 20px;

    font-size: 18px;
    color: #333333;
    letter-spacing: 2px;
    .product-title {
      font-family: Muli-Regular_Light, Muli;
      font-weight: normal;
      line-height: 27px;
      margin-bottom: 18px;
    }
    .product-price {
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      line-height: 23px;
    }
  }
  .cs-buywith-button {
    margin-right: 20px;
    font-size: 14px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
  }
}
</style>
