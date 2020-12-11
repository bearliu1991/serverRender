<template>
  <div class="buy-with-container pc">
    <div class="container-mask"></div>
    <div class="container-content">
      <h3 class="model-title">BUY IT WITH</h3>
      <div class="product-card-horizon" @click="handleClick(product)">
        <img :src="product.imageUrl" class="left-side" />
        <div class="right-side">
          <p class="product-title">{{ product.productName }}</p>
          <p class="product-price">
            <strong>{{
              (product.discountPrice || product.retailPrice) | formatCurrency
            }}</strong>
          </p>
        </div>
        <cup-button class="cs-buywith-button">VIEW PRODUCT</cup-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Pc',
  props: {
    product: {
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
        name: 'product/id',
        params: {
          id: spuId,
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
}
// buy it with
.buy-with-container {
  width: 744px;
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
      margin: 40px 0;
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
    width: 132px;
    height: 197px;
    flex-shrink: 0;
  }
  .right-side {
    flex: 1;
    margin-left: 20px;

    font-size: 18px;
    color: #333333;
    .product-title {
      font-family: Muli-Regular_SemiBold, Muli;
      line-height: 27px;
      margin-bottom: 20px;
      @include line-clamp(2);
    }
  }
  .cs-buywith-button {
    width: 160px;
    font-size: 14px;
    margin-left: 92px;
    @include font($fontMuliBold);
  }
}
</style>
