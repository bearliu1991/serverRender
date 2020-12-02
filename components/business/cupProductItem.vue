<template>
  <div class="cs-product2">
    <div class="p-img" @click="toDetail(product.spuId)">
      <img :src="product.colorImageUrl" alt="" srcset="" />
    </div>
    <div class="p-info">
      <p class="p-name" @click="toDetail(product.spuId)">
        {{ product.productName }}
      </p>
      <div class="p-sku">
        <p class="p-size">
          <i>
            <img :src="product.colorImageUrl" alt="" srcset="" />
          </i>
          <span v-if="product.size">/&nbsp;{{ product.size }}</span>
        </p>
        <!-- 自定义 -->
        <slot name="sku" :item="product"> </slot>
      </div>
      <!-- 自定义 -->

      <slot name="other" :item="product"> </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CupProduct2',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toDetail(spuId) {
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
.cs-product2 {
  display: flex;
  &.disabled {
    .p-img,
    .p-name,
    .p-sku,
    .p-price,
    .p-quanity,
    .cs-quantity-box {
      opacity: 0.4;
    }
  }
  .p-img {
    width: 120px;
    height: 180px;
    margin-right: 20px;
    img {
      height: 100%;
    }
  }
  .p-info {
    flex: 1;
    .p-name {
      margin-top: 10px;
      font-size: 14px;
      font-family: Muli-Regular_SemiBold, Muli;
      font-weight: normal;
      color: #333333;
      line-height: 21px;
      @include line-clamp(2);
      margin-bottom: 20px;
    }
    .p-sku {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .p-size {
        display: flex;
        align-items: center;
        i {
          width: 22px;
          height: 22px;
          margin-right: 8px;
          border-radius: 50%;
          display: inline-block;
          overflow: hidden;
          img {
            height: 100%;
          }
        }
        span {
          font-size: 14px;
          @include font($fontRegular);
          color: #333333;
          line-height: 18px;
        }
      }
    }
  }
  &.mobile {
    .p-img {
      width: 90px;
      height: 135px;
      margin-right: 16px;
    }
    .p-name {
      margin-top: 8px;
      font-size: 12px;
      line-height: 18px;
      margin-bottom: 16px;
    }
    .p-info .p-sku .p-size {
      span {
        font-size: 12px;
        line-height: 15px;
      }
    }
  }
}
</style>
