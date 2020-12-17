<template>
  <client-only>
    <!-- 小购物车 PC -->
    <div class="small-cart">
      <header class="small-cart_header">
        <h1>BAG</h1>
        <p class="tips" v-html="freeShipTips"></p>
      </header>

      <template v-if="cartList.length">
        <div class="small-cart-product">
          <template v-for="(product, index) in cartList">
            <!-- 有货商品标题 -->
            <header
              v-if="index == 0 && cartList.length != outStockLength"
              :key="index"
              class="item-tit"
            >
              PRODUCT<span
                >(
                <strong>{{ cartList.length - outStockLength }}</strong>
                Available Items)</span
              >
            </header>
            <!-- 无货商品标题 -->
            <header
              v-if="index == cartList.length - outStockLength"
              :key="index"
              class="item-tit"
            >
              EXPIRED PRODUCT<span>(Will not be brought to next step)</span>
            </header>
            <div
              :id="
                index == cartList.length - outStockLength || product.stockStatus
                  ? 'outStock'
                  : ''
              "
              :key="product.skuId"
              :class="['product-item']"
            >
              <cup-product-item :product="product" is-soldout>
                <template v-slot:sku="{ item }">
                  <div class="cs-quantity-box">
                    <cup-input-number
                      v-model="item.quantity"
                      is-auto="off"
                      min="1"
                      :max="item.stock || 999"
                      @minus="updateCart(index, 0)"
                      @add="updateCart(index, 1)"
                    ></cup-input-number>
                  </div>
                </template>
                <template v-slot:other="{ item }">
                  <!-- 库存状态 -->
                  <p
                    v-if="
                      (item.skuState == 0 && item.stockStatus>=0)
                    "
                    class="p-stock"
                  >
                    <template v-if="item.stockStatus == 1">
                      Only {{ item.stock }} left
                    </template>
                    <template v-else-if="item.stockStatus == 2">
                      Out of Stock
                    </template>
                    <template v-else>
                      understock
                    </template>
                  </p>
                  <p v-if="item.skuState == 1" class="p-stock">
                    Out of Stock
                  </p>
                  <!-- 价格 -->
                  <div class="p-operate">
                    <div class="p-bottom">
                      <p class="p-price">
                        <strong>{{
                          (item.discountPrice || item.retailPrice)
                            | formatCurrency
                        }}</strong>
                        <del v-if="item.discountPrice"
                          >{{ item.retailPrice | formatCurrency }}
                        </del>
                      </p>
                      <em @click="removeCart(item.skuId, item.skuState)"
                        >Remove</em
                      >
                    </div>
                  </div>
                </template>
              </cup-product-item>
            </div>
          </template>
        </div>
        <div class="cs-cart-checkout">
          <div v-if="orderPrice" class="cs-cart-orderPrice">
            <p>
              SUBTOTAL
            </p>
            <strong>{{ orderPrice.subtotal | formatCurrency }}</strong>
          </div>
          <p v-if="config && config.priceIncludeGst" class="cs-order_note">
            {{ config.priceIncludeGst }}
          </p>
          <cup-button
            block
            type="primary"
            :disabled="isSubmit"
            @click="checkout"
            >PROCEED TO CHECKOUT</cup-button
          >
        </div>
      </template>
      <!-- 购物车为空 -->
      <template v-else>
        <cup-empty v-if="config" class="icon-no-result">
          <p class="upper">
            {{ config.noneCartsTitle || 'YOUR BAG IS EMPTY' }}
          </p>
          <p class="normal" v-html="config.noneCartsSubtitle">
            <!-- Subscribe To Get <em>10% OFF</em> On Your First Order AUD $65+ -->
          </p>
          <cup-button type="primary" @click="toDiscovery">{{
            config.buttonText || 'DISCOVER NOW'
          }}</cup-button>
        </cup-empty>
      </template>
      <!-- </div> -->
    </div>
  </client-only>
</template>
<script>
import cartMixin from '../cartMixin'
export default {
  mixins: [cartMixin],
}
</script>
<style lang="scss" scoped>
.small-cart {
  &_header {
    padding: 32px 24px 16px 32px;
    text-align: center;
    h1 {
      font-size: 18px;
      @include font($fontMuliBold);
      line-height: 23px;
      margin-bottom: 8px;
    }
    p.tips {
      text-align: center;
      /deep/ strong {
        font-family: Muli-Regular_SemiBold, Muli;
      }
    }
  }
  &-product {
    min-height: 260px;
    border-bottom: 1px solid #f7f7f7;
    /deep/ .product-item {
      padding: 8px 16px;
      &:first-child {
        padding-top: 16px;
      }
      &:last-child {
        padding-bottom: 16px;
      }
      // &.disabled {
      //   .p-img,
      //   .p-name,
      //   .p-sku,
      //   .p-price,
      //   .stock,
      //   .cs-add-minus {
      //     opacity: 0.4;
      //   }
      // }
      // .cs-product2 {
      //   .p-img {
      //     width: 90px;
      //     height: 135px;
      //     margin-right: 16px;
      //   }
      // }
      // .p-name {
      //   margin-bottom: 16px !important;
      // }
      // .p-info {
      //   position: relative;
      // }
      .p-price {
        flex: 1;
        strong {
          margin-right: 8px;
        }
      }
      .p-operate {
        position: absolute;
        bottom: 8px;
        width: 100%;
        .p-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        em {
          color: #666;
          text-decoration: underline;
        }
      }
      .p-stock {
        font-size: 12px;
        font-family: Muli-Bold, Muli;
        font-weight: bold;
        color: #e61717;
        line-height: 15px;
        margin-bottom: 8px;
        text-align: right;
      }
    }
  }
  .item-tit {
    border-bottom: 1px solid #f7f7f7;
    font-size: 12px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #333333;
    line-height: 15px;
    letter-spacing: 1px;
    padding: 16px 0 8px 0;
    margin: 0 16px;
    span {
      color: #999;
      font-family: Muli-Regular_SemiBold, Muli;
    }
    // & + .product-item {
    //   padding-top: 20px;
    // }
  }
  // /deep/.cs-add-minus {
  //   align-items: center;
  //   justify-content: center;
  //   display: flex;
  //   margin: auto;
  //   width: 85px;
  //   height: 32px;
  // }
  .cs-cart {
    &-checkout {
      padding: 16px;
      // position: absolute;
      // bottom: 0;
      // width: 100%;
      .cs-order_note {
        font-size: 12px;
        line-height: 15px;
        text-align: left;
        margin-bottom: 16px;
      }
    }
    &-orderPrice {
      font-size: 14px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 18px;
      letter-spacing: 1px;
      padding-bottom: 8px;
      display: flex;
      justify-content: space-between;
      strong {
        margin-left: 8px;
        font-size: 18px;
        line-height: 23px;
      }
      & + .cs-button {
        margin-top: 8px;
        margin-bottom: 8px;
      }
    }
  }
  .cs-button + .cs-payment-icons {
    padding: 8px 16px 0 16px;
    text-align: center;
    i {
      width: 42px;
      height: 24px;
      margin-right: 12px;
      background-size: contain;
      &.icon_card-afterpay {
        width: 63px;
      }
    }
  }
}
.cs-empty {
  margin-top: 40px;
  p {
    font-size: 14px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #333333;
    line-height: 21px;
    &.upper {
      text-transform: uppercase;
    }
    &.normal {
      margin-top: 8px;
      font-size: 12px !important;
      color: #333333;
      line-height: 15px;
      font-weight: normal;
      font-family: Muli-Regular_Light, Muli;
      em {
        font-family: Muli-Regular_SemiBold, Muli;
      }
    }
  }
  .cs-button {
    text-transform: uppercase;
    margin-top: 24px;
    margin-bottom: 40px;
  }
}
// .fixedBottom {
//   .small-cart-product {
//     margin-bottom: 146px;
//   }
//   .cs-cart-checkout {
//     position: fixed;
//     bottom: 0;
//     right: 0;
//     left: 0;
//     z-index: 9999;
//     background: #fff;
//     .cs-payment-icons {
//       display: none;
//     }
//   }
// }
</style>
<style lang="scss">
.product-item + .disabled {
  border-top: 1px solid #f7f7f7;
}
</style>
