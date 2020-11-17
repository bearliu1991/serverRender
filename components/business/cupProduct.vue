<template>
  <div class="cup-product">
    <div class="p-img">
      <a :title="product.productName" href="#">
        <img :src="product.imageUrl" />
      </a>
      <i v-if="product.discountPrice" class="icon-sale"></i>
    </div>

    <div class="p-name">
      <a target="_blank" :title="product.productName" href="#">
        <em>{{ product.productName }}</em>
        <i class="promo-words"></i>
      </a>
    </div>

    <div
      :class="['p-attrs', $store.state.terminal == 'mobile' ? 'termial-m' : '']"
    >
      <div class="p-price">
        <strong>
          {{ (product.discountPrice || product.retailPrice) | formatCurrency }}
        </strong>
        <del v-if="product.discountPrice">{{
          product.discountPrice | formatCurrency
        }}</del>
      </div>

      <div v-if="isRate" class="p-commit" data-done="1">
        <cup-rate
          v-model="product.rating"
          :score="product.ratingNum"
        ></cup-rate>
      </div>
    </div>

    <slot name="p-other">
      <div class="p-other"></div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'CupProduct',
  props: {
    product: {
      type: Object,
      required: true,
    },
    isRate: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.cup-product {
  // overflow: hidden;
  max-width: 364px;
  //图片
  .p-img {
    padding-bottom: 546/346 * 100%;
    position: relative;
    // overflow: hidden;
    a,
    img {
      border: 0;
      vertical-align: middle;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .icon-sale {
      width: 88px;
      height: 49px;
      position: absolute;
      top: -4px;
      left: -12px;
    }
  }

  //名称
  .p-name {
    font-size: 14px;
    font-family: Muli-Regular_SemiBold, Muli;
    font-weight: normal;
    color: #333333;
    line-height: 21px;
    text-align: left;

    margin-top: 14px;
    margin-bottom: 9px;

    a {
      color: inherit;
    }
    em {
      @include line-clamp(2);
    }
  }

  //布局容器
  .p-attrs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &.termial-m {
      display: block;
      .p-price {
        margin-bottom: 9px;
      }
    }
  }

  //价格
  .p-price {
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 1px;
    strong {
      font-family: Muli-Regular_ExtraBold, Muli;
      font-weight: normal;
      color: #333333;
    }
    del {
      font-family: Muli-Regular_Light, Muli;
      font-weight: normal;
      color: #999999;
    }
  }
  // .p-other {
  //   font-size: 12px;
  //   font-family: Muli-Italic_Light-Italic, Muli-Italic_Light;
  //   font-weight: normal;
  //   color: #333333;
  //   line-height: 15px;
  //   margin-top: 6px;
  // }
}
</style>
