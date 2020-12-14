<template>
  <div class="cs-cart-container">
    <header>
      <h1>BAG</h1>
      <p v-html="freeShipTips"></p>
    </header>

    <template v-if="cartList.length">
      <div class="cs-cart-table">
        <table>
          <thead>
            <tr>
              <th>
                PRODUCT
                <em
                  >( <b>{{ cartNums }} </b>Available Items )</em
                >
              </th>
              <th>UNIT PRICE</th>
              <th>QUANTITY</th>
              <th>SUBTOTAL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in cartList">
              <tr
                v-if="index == cartList.length - outStockLength"
                :key="`c${index}`"
                class="outStock-tit"
              >
                <td>
                  <!-- 无货商品标题 -->

                  Expired product<span>
                    (Will not be brought to next step)
                  </span>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr :key="index" :class="item.skuState != 0 ? 'disabled' : ''">
                <td class="cs-cart-product">
                  <cup-product-item
                    :product="item"
                    is-soldout
                  ></cup-product-item>
                </td>
                <td class="cs-cart-price">
                  <strong>
                    {{
                      (item.discountPrice || item.retailPrice) | formatCurrency
                    }}</strong
                  >
                  <del v-if="item.discountPrice"
                    >{{ item.retailPrice | formatCurrency }}
                  </del>
                  <!-- <em>-30%</em> -->
                </td>
                <td class="cs-cart-quantity">
                  <div class="cs-quantity-box">
                    <cup-input-number
                      v-model="item.quantity"
                      is-auto="off"
                      min="1"
                      :disabled="item.skuState != 0"
                      :max="item.stock || 999"
                      @minus="updateCart(index, 0)"
                      @add="updateCart(index, 1)"
                    ></cup-input-number>
                  </div>
                  <p
                    v-if="
                      (item.skuState == 0 && item.stockStatus>=0)
                    "
                    class="stockTip"
                  >
                    <template v-if="item.stockStatus == 1">
                      Only {{ item.stock }} Instock
                    </template>
                    <template v-else>
                      underStock
                    </template>
                  </p>
                  <p v-if="item.skuState == 1" class="stockTip">Out of Stock</p>
                </td>
                <td class="cs-cart-total">
                  <strong>
                    {{
                      NumberMul(
                        item.discountPrice || item.retailPrice,
                        item.quantity
                      ) | formatCurrency
                    }}
                  </strong>
                </td>
                <td class="cs-cart-operate">
                  <a
                    href="javascript:void(0)"
                    class="cs-link"
                    @click="removeCart(item.skuId, item.skuState)"
                    >Remove</a
                  >
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <footer class="cs-cart-total">
        <p v-if="orderPrice">
          SUBTOTAL <em>{{ orderPrice.subtotal | formatCurrency }}</em>
        </p>
        <p v-if="config && config.priceIncludeGst" class="cs-order_note">
          {{ config.priceIncludeGst }}
        </p>
        <div class="cs-cart-submit">
          <cup-button
            type="primary"
            size="big"
            :disabled="isSubmit"
            @click="checkout"
            >PROCEED TO CHECKOUT</cup-button
          >
        </div>
      </footer>
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
</template>
<script>
import cartMixin from '../cartMixin'
export default {
  mixins: [cartMixin],
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.cs-cart {
  &-container {
    padding: 0 284px;
    border-bottom: 1px solid #f7f7f7;
    .cs-empty {
      margin-top: 60px;
      p.normal {
        font-size: 14px;
        color: #333333;
        line-height: 18px;
        margin-top: 10px;
        @include font($fontRegular);
      }
      .cs-button {
        margin-top: 40px;
        margin-bottom: 100px;
        width: 244px;
        font-size: 14px;
      }
    }
  }
  header {
    padding: 40px 0;
    text-align: center;
    h1 {
      font-size: 30px;
      @include font($fontMuliBold);
      color: #333333;
      line-height: 38px;
      letter-spacing: 2px;
      margin-bottom: 10px;
    }
  }
  &-table {
    padding-bottom: 10px;
    border-bottom: 1px solid #f2f2f2;
    table {
      width: 100%;

      thead {
        border-bottom: 1px solid #f2f2f2;
      }
    }
    tbody {
      tr {
        &:first-child {
          td:first-child {
            padding: 20px 0 10px 0;
          }
        }
        td:first-child {
          padding: 10px 0;
        }
      }
    }
    tr {
      width: 100%;
      // display: block;
      &.disabled {
        .cs-cart-price,
        .cs-cart-quantity,
        .cs-quantity-box,
        .cs-cart-total {
          opacity: 0.4;
        }
      }
      th {
        padding-top: 40px;
        padding-bottom: 10px;

        font-size: 12px;
        @include font($fontMuliBold);
        color: #333333;
        line-height: 15px;
        letter-spacing: 1px;
        &:first-child {
          text-align: left;
          em {
            font-family: Muli-Regular_SemiBold, Muli;
            color: #999;
          }
          b {
            color: #333;
            font-family: Muli-Regular_SemiBold, Muli;
          }
        }
      }
      &.outStock-tit {
        height: auto !important;
        border-bottom: 1px solid #f7f7f7;
        font-size: 12px;
        font-family: Muli-Bold, Muli;
        font-weight: bold;
        color: #333333;
        line-height: 15px;
        letter-spacing: 1px;
        td {
          padding: 30px 0 10px 0 !important;
        }
        span {
          color: #999;
          font-family: Muli-Regular_SemiBold, Muli;
        }
        & + tr {
          td:first-child {
            padding-top: 20px;
          }
        }
      }

      td {
        width: 16.2%;

        &:not(:first-child) {
          vertical-align: top;
          text-align: center;
          padding-top: 60px;
        }
        &.cs-cart-product {
          width: 42.5%;
          padding-right: 72px;
        }
        &.cs-cart-price,
        &.cs-cart-total {
          strong {
            font-size: 14px;
            font-family: Muli-Regular_ExtraBold, Muli;
            font-weight: normal;
            color: #333333;
            line-height: 18px;
            letter-spacing: 1px;
            display: block;
          }
          del {
            font-size: 14px;
            line-height: 18px;
          }
        }
        &.cs-cart-price {
          em {
            color: #e61717;
            display: block;
            margin-top: 6px;
          }
        }
        &.cs-cart-quantity {
          padding-top: 54px;
          /deep/.cs-add-minus {
            align-items: center;
            justify-content: center;
            display: flex;
            margin: auto;
            width: 85px;
            height: 32px;
            background: #ffffff;
            border: 1px solid #eaeaea;
            .iconjiannormal {
              margin-left: 5px;
            }
            .iconjianormal {
              margin-right: 5px;
            }
            /deep/ input {
              width: 32px;
              font-size: 12px;
              margin: 0 3px;
            }
          }
          .stockTip {
            @include font($fontMuliBold);
            color: #e61717;
            line-height: 15px;
          }
        }
        &.cs-cart-operate {
          width: 10%;
          .cs-link-text {
            @include font($fontRegular);
          }
        }
      }
    }
  }
  &-total {
    text-align: right;
    padding: 40px 0 100px 0;
    p:first-child {
      font-size: 14px;
      font-size: 14px;
      @include font($fontMuliBold);
      color: #333333;
      line-height: 18px;
      em {
        font-size: 18px;
        margin-left: 6px;
        font-family: Muli-Regular_ExtraBold, Muli;
      }
    }
    .cs-cart-submit {
      margin-top: 30px;
      /deep/ .cs-button {
        width: 244px;
        span {
          font-size: 14px;
          @include font($fontMuliBold);
          line-height: 18px;
        }
      }
    }
  }
}
.cs-order_note {
  margin-top: 10px;
  font-size: 14px;
  font-family: Muli-Regular_Light, Muli;
  font-weight: normal;
  color: #000000;
  line-height: 18px;
  margin-bottom: 40px;
}
</style>
