<template>
  <div class="cs-product2">
    <div class="p-img">
      <img :src="product.colorImageUrl" alt="" srcset="" />
    </div>
    <div class="p-info">
      <p class="p-name">{{ product.productName }}</p>
      <div class="p-sku">
        <p class="p-size">
          <i>
            <img :src="product.colorImageUrl" alt="" srcset="" />
          </i>
          <span>/&nbsp;{{ product.size }}</span>
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
      align-items: flex-end;
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
          font-family: Muli-Regular_Light, Muli;
          font-weight: normal;
          color: #333333;
          line-height: 18px;
        }
      }
    }
  }
}
</style>
