<template>
  <!-- buy it with 模块 -->
  <div class="cs-buywith">
    <h1>BUY IT WITH</h1>
    <div class="cs-buywith-product">
      <div class="p-img" @click="toDetail(product.spuId)">
        <img :src="product.imageUrl" alt="" srcset="" />
      </div>
      <div class="p-info">
        <p class="p-name" @click="toDetail(product.spuId)">
          {{ product.productName }}
        </p>
        <p class="p-price">
          <strong>
            {{
              (product.discountPrice || product.retailPrice) | formatCurrency
            }}
          </strong>
          <del v-if="product.discountPrice">{{
            product.discountPrice | formatCurrency
          }}</del>
        </p>
        <!-- 自定义 -->

        <p class="p-btns">
          <cup-button>View product</cup-button>
        </p>
      </div>
    </div>
  </div>
  <!-- <div
    class="buy-with-container"
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
      </div>
    </div>
  </div> -->
</template>
<script>
export default {
  name: 'Mobile',
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
.cs-buywith {
  padding: 16px;
  h1 {
    margin-top: 8px;
    font-size: 18px;
    @include font($fontMuliBold);
    color: #333333;
    line-height: 23px;
    letter-spacing: 1px;
    padding: 16px 0;
  }
  &-product {
    display: flex;
    .p-img {
      width: 110px;
      height: 165px;
      margin-right: 16px;
      img {
        height: 100%;
      }
    }
    .p-info {
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;

      .p-name {
        @include line-clamp(2);
        font-size: 14px;
        font-family: Muli-Regular_SemiBold, Muli;
        font-weight: normal;
        color: #333333;
        margin-bottom: 12px;
      }
      .p-price {
        font-size: 12px;
        font-family: Muli-Regular_ExtraBold, Muli;
        font-weight: normal;
        margin-bottom: 24px;
      }
      .cs-button {
        padding: 0 19px;
        height: 36px;
        line-height: 36px;
      }
    }
  }
}
// buy it with
// .buy-with-container {
//   width: 100%;
//   height: 185px;
//   background-size: cover;
//   position: relative;
//   .container-mask {
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     top: 0;
//     left: 0;
//     background: #fff;
//     opacity: 0.8;
//   }
//   .container-content {
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     top: 0;
//     left: 0;
//     z-index: 1;
//     padding: $padding-6m $padding-4m $padding-4m $padding-8m;
//     .model-title {
//       margin-bottom: $padding-4m;
//     }
//   }
//   .product-card-horizon {
//     cursor: pointer;
//   }
// }
// // 商品横向模块
// .product-card-horizon {
//   display: flex;
//   background: rgba(255, 255, 255, 0.7);
//   .left-side {
//     width: 90px;
//     height: 90px;
//     flex-shrink: 0;
//   }
//   .right-side {
//     flex-grow: 1;
//     padding: 14px $padding-4m $padding-2m $padding-5m;
//     .product-title {
//       line-height: 18px;
//       margin-bottom: $padding-2m;
//       font-size: 12px;
//     }
//     .product-price {
//       line-height: 15px;
//     }
//   }
// }
</style>
