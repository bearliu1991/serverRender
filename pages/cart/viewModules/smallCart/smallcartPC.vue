<template>
  <!-- 小购物车 PC -->
  <div class="small-cart">
    <cup-popup
      size="100%"
      :direction="direction"
      :visible="visible"
      :with-header="false"
      @close-popup="close"
    >
      <header class="tit">
        <p>
          <strong>BAG</strong><em>{{ cartNums }} &nbsp;</em>Available Items
        </p>
        <i class="icon iconfont icon14-close-black" @click="close"></i>
      </header>
      <p ref="tips" class="tips" v-html="freeShipTips"></p>
      <template v-if="cartList.length">
        <div class="small-cart-product" :style="{ top: `${top}px` }">
          <template v-for="(product, index) in cartList">
            <!-- 无货商品标题 -->
            <header
              v-if="index == cartList.length - outStockLength"
              :key="product.skuId"
              class="outStock-tit"
            >
              EXPIRED PRODUCT<span>(Will not be brought to next step)</span>
            </header>
            <!-- 商品类目 -->
            <div
              :id="
                index == cartList.length - outStockLength || product.stockStatus
                  ? 'outStock'
                  : ''
              "
              :key="index"
              :class="['product-item']"
            >
              <cup-product-item
                :product="product"
                is-soldout
                :is-click="false"
                @click="toDetail"
              >
                <template v-slot:other="{ item }">
                  <p class="p-price">
                    <strong>
                      {{
                        (item.discountPrice || item.retailPrice)
                          | formatCurrency
                      }}</strong
                    >
                    <del v-if="item.discountPrice">
                      {{ item.retailPrice | formatCurrency }}
                    </del>
                  </p>
                  <!-- 
                  1、对于库存不足的商品，如果库存小于等于10，则提示“only ** left”；如果库存大于10，则提示“库存不足”

                -->
                  <div class="p-operate">
                    <div class="p-bottom">
                      <div class="cs-quantity-box">
                        <cup-input-number
                          v-model="item.quantity"
                          is-auto="off"
                          min="1"
                          :max="item.stock || 999"
                          @minus="updateCart(index, 0)"
                          @add="updateCart(index, 1)"
                        ></cup-input-number>
                        <p
                          v-if="
                      (item.skuState == 0 && item.stockStatus>=0)
                    "
                          class="p-stock"
                        >
                          <template v-if="item.stockStatus == 1">
                            Only {{ item.stock }} Instock
                          </template>
                          <template v-else>
                            underStock
                          </template>
                        </p>
                        <p v-if="item.skuState == 1" class="p-stock">
                          Out of Stock
                        </p>
                      </div>
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
            <label>SUBTOTAL</label>
            <p>{{ orderPrice.subtotal | formatCurrency }}</p>
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
          <div class="cs-payment-icons">
            <i class="icon_card-visa"></i>
            <i class="icon_card-master"></i>
            <i class="icon_card-pay-pal"></i>
            <i style="width: auto;">
              <em>...</em>
            </i>
          </div>
        </div>
      </template>
      <!-- 购物车为空 -->
      <template v-else>
        <cup-empty v-if="config" class="icon-no-result">
          <p>{{ config.noneCartsTitle || 'YOUR BAG IS EMPTY' }}</p>
          <p class="normal" v-html="config.noneCartsSubtitle">
            <!-- Subscribe To Get <em>10% OFF</em> On Your First Order AUD $65+ -->
          </p>
          <cup-button type="primary" @click="toDiscovery">{{
            config.buttonText || 'DISCOVER NOW'
          }}</cup-button>
        </cup-empty>
      </template>
    </cup-popup>
  </div>
</template>
<script>
import cartMixin from '../cartMixin'
export default {
  mixins: [cartMixin],
}
</script>
<style lang="scss" scoped>
/deep/ .cup-popup {
  width: 420px !important;
  overflow: hidden;
  .el-drawer__body {
    overflow: hidden;
  }
  .el-drawer__close-btn {
    font-size: 18px;
  }
  p.tips {
    padding: 13px 20px;
    border-bottom: 1px solid #f7f7f7;
    color: #333;
    strong {
      font-weight: normal;
      font-family: $fontSemiBold;
    }
  }
}
.small-cart {
  position: relative;
  header.tit {
    height: 70px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #999;
    padding: 0 26px 0 20px;
    border-bottom: 1px solid #f7f7f7;
    background: #fff;
    p {
      flex: 1;
    }
    i {
      font-size: 14px;
      color: #333;
    }
    strong {
      font-size: 24px;
      @include font($fontMuliBold);
      color: #333333;
      line-height: 30px;
      letter-spacing: 1px;
      margin-right: 10px;
      text-shadow: -5px 0px 20px rgba(0, 0, 0, 0.1);
    }
    em {
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 18px;
      text-shadow: -5px 0px 20px rgba(0, 0, 0, 0.1);
    }
  }
  &-product {
    overflow-y: auto;
    border-bottom: 1px solid #f7f7f7;
    position: absolute;
    top: 110px;
    bottom: 206px;
    width: 100%;
    .outStock-tit {
      border-bottom: 1px solid #f7f7f7;
      font-size: 12px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 15px;
      letter-spacing: 1px;
      padding: 20px 0 10px 0;
      margin: 0 20px;
      text-shadow: -5px 0px 20px rgba(0, 0, 0, 0.1);
      span {
        color: #999;
        font-family: Muli-Regular_SemiBold, Muli;
      }
      & + .product-item {
        padding-top: 20px;
      }
    }
    /deep/ .product-item {
      padding: 10px 20px;
      &:first-child {
        padding-top: 20px;
      }
      &:last-child {
        padding-bottom: 20px;
      }
      &.disabled {
        .p-img,
        .p-name,
        .p-sku,
        .p-price,
        .cs-add-minus {
          opacity: 0.4;
        }
      }
      .cs-product2 {
        .p-img {
          width: 120px;
          height: 180px;
        }
      }

      .p-info {
        position: relative;
        .p-name {
          margin-bottom: 10px !important;
        }
      }
      .p-price {
        margin-top: 10px;
        strong {
          margin-right: 8px;
        }
      }
      .p-operate {
        position: absolute;
        bottom: 0;
        width: 100%;
        .p-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .p-stock {
          font-size: 12px;
          font-family: Muli-Bold, Muli;
          font-weight: bold;
          color: #e61717;
          line-height: 15px;
        }
        em {
          color: #666;
          cursor: pointer;
          text-decoration: underline;
        }
        /deep/.cs-add-minus {
          align-items: center;
          justify-content: center;
          display: flex;
          margin: auto;
          width: 85px;
          height: 32px;
          background: #ffffff;
          border: 1px solid #eaeaea;
          /deep/ input {
            width: 32px;
            margin-left: 0;
            margin-right: 0;
            font-size: 12px;
          }
        }
      }
    }
  }
  .cs-cart {
    &-checkout {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
    }
    &-orderPrice {
      font-size: 14px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 18px;
      letter-spacing: 1px;
      padding-bottom: 10px;
      padding-top: 20px;
      display: flex;
      p {
        flex: 1;
        font-family: Muli-Regular_ExtraBold, Muli;
        text-align: right;
        font-size: 18px;
      }
    }
  }
  .cs-payment-icons {
    padding: 20px 0 30px 0;
    display: flex;
    align-items: center;
    i {
      width: 42px;
      height: 24px;
      margin-right: 12px;
      background-size: contain;
      &.icon_card-afterpay {
        width: 63px;
      }
    }
    em {
      font-size: 18px;
      line-height: 1;
    }
  }
}
.cs-empty {
  p.normal {
    font-size: 14px;
    @include font($fontRegular);
    color: #333333;
    line-height: 18px;
    margin-top: 10px;
  }
  .cs-button {
    margin-top: 40px;
    width: 244px;
    font-size: 14px;
  }
}
.cs-order_note {
  font-size: 12px;
  line-height: 15px;
  text-align: left;
  margin-bottom: 20px;
}
</style>
<style lang="scss">
.product-item + .disabled {
  border-top: 1px solid #f7f7f7;
}
</style>
