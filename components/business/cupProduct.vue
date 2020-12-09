<template>
  <div
    :class="[
      'cup-product',
      $store.state.terminal,
      isSoldout && product.productSpuState == 2 ? 'disabled' : '',
    ]"
  >
    <div class="p-img">
      <nuxt-link :title="product.productName" :to="`/product/${product.spuId}`">
        <template v-if="isMouse">
          <img
            :src="
              isMouseover && product.hoverImageUrl
                ? product.hoverImageUrl
                : product.imageUrl
            "
            @mouseover="isMouseover = true"
            @mouseout="isMouseover = false"
          />
        </template>
        <template v-else>
          <img :src="product.imageUrl" />
        </template>
      </nuxt-link>
      <i v-if="product.discountPrice" class="icon-sale"></i>
      <template v-if="isType && (product.isTop || product.isBottom)">
        <i
          v-if="product.isBottom && !product.isTop"
          class="p-type is-bottom"
        ></i>
        <i
          v-else-if="product.isTop && !product.isBottom"
          class="p-type is-top"
        ></i>
      </template>
      <template v-if="isSoldout && product.productSpuState == 2">
        <div class="cs-soldout">
          <i class="img"></i>
        </div>
      </template>
    </div>

    <div class="p-name">
      <nuxt-link :title="product.productName" :to="`/product/${product.spuId}`">
        <em>{{ product.productName }}</em>
        <i class="promo-words"></i>
      </nuxt-link>
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
    // 支持鼠标移入移除换图
    isMouse: {
      type: Boolean,
      default: false,
    },
    // 是否展示商品的上下装类型
    isType: {
      type: Boolean,
      default: false,
    },
    // 是否展示售罄
    isSoldout: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isMouseover: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.cup-product {
  &.disabled {
    & > * {
      &:not(.p-img) {
        opacity: 0.4;
      }
    }
    .p-img {
      a {
        opacity: 0.4;
      }
    }
  }
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
    .p-type {
      width: 52px;
      height: 52px;
      right: 4px;
      bottom: 4px;
      position: absolute;
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
      @include font($fontRegular);
      color: #999999;
    }
  }
  .is-bottom {
    @include icon-image('icon_pdp-bottom', 'png');
  }
  .is-top {
    @include icon-image('icon_pdp-top', 'png');
  }
  .cs-soldout {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    .img {
      @include icon-image('icon-sold_out');
      width: 164px;
      height: 164px;
    }
  }
  &.mobile {
    .p-img {
      .p-type {
        width: 30px;
        height: 30px;
        right: 0px;
        bottom: 0px;
      }
    }
    .cs-soldout {
      .img {
        width: 80px;
        height: 80px;
      }
    }
  }
}
</style>
