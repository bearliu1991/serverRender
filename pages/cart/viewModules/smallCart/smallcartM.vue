<template>
  <!-- 小购物车 PC -->
  <div class="small-cart">
    <cup-popup
      v-model="visible"
      size="90%"
      :with-header="false"
      @scroll="scroll"
    >
      <div
        :class="['small-cart-body scrollArea', isFixed ? 'fixedBottom' : '']"
        style="height: 100%; overflow-y: auto;"
      >
        <header class="small-cart_header">
          <div class="header-box">
            <span class="tips"
              ><strong>{{ cartNums }}</strong> Avalibal Items</span
            >
            <i class="icon iconfont"></i>
            <p>BAG</p>
            <i class="icon iconfont icon14-close-black" @click="close"></i>
          </div>
        </header>
        <p class="tips" v-html="freeShipTips"></p>

        <template v-if="cartList.length">
          <div class="small-cart-product">
            <template v-for="(product, index) in cartList">
              <!-- 无货商品标题 -->
              <header
                v-if="index == cartList.length - outStockLength"
                :key="index"
                class="outStock-tit"
              >
                EXPIRED PRODUCT<span>(Will not be brought to next step)</span>
              </header>
              <div
                :id="
                  index == cartList.length - outStockLength ||
                  product.stockStatus
                    ? 'outStock'
                    : ''
                "
                :key="product.skuId"
                :class="['product-item']"
              >
                <cup-product-item
                  :product="product"
                  is-soldout
                  :is-click="false"
                  @click="toDetail"
                >
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
                      v-if="item.skuState == 0 && item.stockStatus >= 0"
                      class="p-stock"
                    >
                      <template v-if="item.stockStatus == 1">
                        Only {{ item.stock }} left
                      </template>
                      <template v-else-if="item.stockStatus == 2">
                        Out of Stock
                      </template>
                      <template v-else> underStock </template>
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
                <strong>{{ orderPrice.subtotal | formatCurrency }}</strong>
              </p>
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
      </div>
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
  .el-drawer__body {
    position: relative;
  }

  .el-drawer__close-btn {
    font-size: 14px;
  }
}
.small-cart {
  &_header {
    height: 55px;
    text-align: left;
    padding: 0 16px;
    font-size: 14px;
    font-weight: normal;
    color: #999999;
    border-bottom: 1px solid #f7f7f7;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    background: #fff;
    z-index: 2003;
    .header-box {
      height: 100%;
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    p {
      flex: 1;
      font-size: 18px;
      text-align: center;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333;
    }
    i {
      font-size: 14px;
      color: #333;
    }
    strong {
      color: #333;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
    }
  }
  p.tips {
    margin-top: 55px;
    font-size: 12px;
    padding: 14px 16px;
    text-align: center;
    em {
      font-family: Muli-Regular_SemiBold, Muli;
    }
  }
  &-product {
    margin-bottom: 201px;
    // border-bottom: 1px solid #f7f7f7;
    /deep/ .product-item {
      padding: 8px 16px;
      &:first-child {
        padding-top: 16px;
      }
      &:last-child {
        padding-bottom: 16px;
      }
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
  .outStock-tit {
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
    & + .product-item {
      padding-top: 20px;
    }
  }
  /deep/.cs-add-minus {
    align-items: center;
    justify-content: center;
    display: flex;
    margin: auto;
    width: 85px;
    height: 32px;
    .icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      line-height: 18px;
    }
    /deep/ input {
      width: 39px;
      margin-left: 0;
      margin-right: 0;
      font-size: 14px;
    }
  }
  .cs-cart {
    &-checkout {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 9999;
      background: #fff;
      border-top: 1px solid #f7f7f7;
      padding: 16px;
      // position: absolute;
      // bottom: 0;
      // width: 100%;
      .cs-order_note {
        font-size: 12px;
        line-height: 15px;
        text-align: center;
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
      justify-content: center;
      p {
        text-align: center;
        strong {
          margin-left: 8px;
          font-size: 18px;
          line-height: 23px;
        }
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
    display: flex;
    align-items: center;
    justify-content: center;
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
  margin-top: 80px;
  p {
    font-size: 14px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #333333;
    line-height: 21px;
    &.normal {
      margin-top: 8px;
      font-size: 12px;
      color: #333333;
      line-height: 15px;
      em {
        font-family: Muli-Regular_SemiBold, Muli;
      }
    }
  }

  .cs-button {
    position: fixed;
    right: 16px;
    left: 16px;
    bottom: 24px;
  }
}
.fixedBottom {
  .small-cart-product {
    margin-bottom: 146px;
  }
  .cs-cart-checkout {
    // position: fixed;
    // bottom: 0;
    // right: 0;
    // left: 0;
    // z-index: 9999;
    // background: #fff;
    .cs-payment-icons {
      display: none;
    }
  }
}
</style>
<style lang="scss">
.product-item + .disabled {
  border-top: 1px solid #f7f7f7;
}
</style>
