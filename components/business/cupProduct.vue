<template>
  <div class="cup-product">
    <div class="p-img">
      <a :title="product.productName" href="#">
        <img :src="product.imageUrl" />
      </a>
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
          <em>{{ product.currencySign }}</em
          ><i>{{ product.discountPrice || product.retailPrice }}</i>
        </strong>
      </div>

      <div class="p-commit" data-done="1">
        <cup-rate
          v-model="product.rating"
          :score="product.ratingNum"
        ></cup-rate>
      </div>
    </div>
    <div class="p-other">
      <slot name="p-other">
        <p></p>
      </slot>
    </div>
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
  },
}
</script>

<style lang="scss" scoped>
.cup-product {
  overflow: hidden;
  max-width: 364px;
  //图片
  .p-img {
    padding-bottom: 546/346 * 100%;
    position: relative;
    overflow: hidden;
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
  }

  //名称
  .p-name {
    font-size: 14px;
    font-family: Muli-Regular_Light, Muli, sans-serif;
    font-weight: normal;
    color: #333333;
    line-height: 18px;
    letter-spacing: 2px;

    @include ellipsis;
    margin-top: 16px;
    margin-bottom: 10px;

    a {
      color: inherit;
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
  .p-price * {
    font-style: normal;
    font-size: 12px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #333333;
    line-height: 15px;
    letter-spacing: 2px;
  }
  .p-other {
    font-size: 12px;
    font-family: Muli-Italic_Light-Italic, Muli-Italic_Light;
    font-weight: normal;
    color: #333333;
    line-height: 15px;
    margin-top: 6px;
  }
}
</style>
