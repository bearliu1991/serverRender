<template>
  <div class="cs-cart-container">
    <header>
      <h1>BAG</h1>
      <p>Only $15.1 more to get them FASTER & FREE in US</p>
    </header>
    <div class="cs-cart-table">
      <table>
        <tr>
          <th>PRODUCT</th>
          <th>UNIT PRICE</th>
          <th>QUANTITY</th>
          <th>TOTAL</th>
          <th>OPERATE</th>
        </tr>
        <tr
          v-for="(item, index) in list"
          :key="index"
          :class="item.stock == 0 ? 'disabled' : ''"
        >
          <td class="cs-cart-product">
            <cup-product-item :product="item"></cup-product-item>
          </td>
          <td class="cs-cart-price">
            <strong
              >AUD {{ item.currencySign
              }}{{ item.discountPrice || item.retailPrice }}</strong
            >
            <del v-if="item.discountPrice"
              >AUD {{ item.currencySign }}{{ item.retailPrice }}
            </del>
            <em>30%</em>
          </td>
          <td class="cs-cart-quantity">
            <div class="cs-quantity-box">
              <cup-input-number
                v-model="item.quantity"
                min="0"
                max="999"
              ></cup-input-number>
            </div>
            <p v-if="item.stock == 0" class="stockTip">Out of Stock</p>
          </td>
          <td class="cs-cart-total">AUD $24.99</td>
          <td class="cs-cart-operate">
            <a
              href="javascript:void(0)"
              class="cs-link-text"
              @click="removeCart(index)"
              >Remove</a
            >
          </td>
        </tr>
      </table>
    </div>
    <footer class="cs-cart-total">
      <p>TOTAL AUD $74.97</p>
      <p>Subscribe to Get 10% OFF Your First AUD $75+ Order!</p>
      <div class="cs-cart-submit">
        <cup-button type="primary">checkout</cup-button>
      </div>
    </footer>
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
  }
  header {
    padding: 40px 0;
    text-align: center;
    h1 {
      font-size: 30px;
      @include font($fontMuliBold);
      color: #333333;
      line-height: 24px;
      letter-spacing: 2px;
      margin-bottom: 10px;
    }
    p {
      font-size: 14px;
      color: #000000;
      line-height: 18px;
    }
  }
  &-table {
    table {
      width: 100%;
    }
    tr {
      width: 100%;
      border-bottom: 1px solid #f2f2f2;
      &.disabled {
        opacity: 0.4;
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
        }
      }
      &:not(:first-child) {
        height: 220px;
        padding: 20px 0;
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
            font-family: $fontExtraBold;
            color: #333333;
            line-height: 18px;
            letter-spacing: 1px;
            display: block;
          }
        }
        &.cs-cart-price {
          em {
            color: #e61717;
            display: block;
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
            .icon {
              font-size: 18px;
            }
            /deep/ input {
              width: 32px;
              margin-left: 0;
              margin-right: 0;
              font-size: 12px;
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
        }
      }
    }
  }
  &-total {
    text-align: right;
    padding: 40px 0 100px 0;
    p:first-child {
      font-size: 14px;
      font-family: $fontMuliBold;
      color: #333333;
      line-height: 18px;
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
</style>
