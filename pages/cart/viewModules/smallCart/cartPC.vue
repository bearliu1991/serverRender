<template>
  <!-- 小购物车 PC -->
  <div class="small-cart">
    <cup-popup title="BAG" size="100%" :direction="direction" visible>
      <p class="tips">
        Only $15.1 more to get them<strong> FASTER</strong> &
        <strong> FREE</strong> in US!
      </p>
      <div v-if="cartList.length" class="small-cart-product">
        <div
          v-for="(product, index) in cartList"
          :key="index"
          class="product-item"
        >
          <cup-product-item :product="product">
            <template v-slot:other="{ item }">
              <p class="p-price">
                <strong
                  >AUD {{ item.currencySign
                  }}{{ item.discountPrice || item.retailPrice }}</strong
                >
                <del v-if="item.discountPrice"
                  >AUD {{ item.currencySign }}{{ item.retailPrice }}
                </del>
              </p>
              <div class="p-operate">
                <p class="stock">Only 1 Instock</p>
                <div class="p-bottom">
                  <div class="cs-quantity-box">
                    <cup-input-number
                      v-model="item.quantity"
                      min="1"
                      :max="item.stock"
                      @input="updateCart(index)"
                    ></cup-input-number>
                  </div>
                  <em @click="removeCart(index)">Remove</em>
                </div>
              </div>
            </template>
          </cup-product-item>
        </div>
      </div>
      <div class="cs-cart-checkout">
        <div class="cs-cart-orderPrice">
          <label>TOTAL</label>
          <p>AUD $68.97</p>
        </div>
        <p class="cs-cart-subscribe">
          Subscribe to Get <em>10% OFF</em> Your First AUD $75+ Order!
        </p>
        <cup-button size="medium" block type="primary">CHECKOUT</cup-button>
        <div class="cs-payment-icons">
          <i class="icon_card-visa"></i>
          <i class="icon_card-master"></i>
          <i class="icon_card-pay-pal"></i>
          <i class="icon_card-afterpay"></i>
        </div>
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
  width: 420px !important;
  .el-drawer__header {
    height: 70px;
    text-align: left;
    line-height: 70px;
    padding: 0 26px 0 30px;
    font-size: 24px;
    font-family: Muli-Regular_Bold, Muli;
    font-weight: normal;
    color: #333333;
    line-height: 30px;
  }
  .el-drawer__close-btn {
    font-size: 18px;
  }
  p.tips {
    height: 40px;
    line-height: 40px;
    padding: 0 30px;
    border-bottom: 1px solid #f7f7f7;
    color: #000;
    strong {
      font-weight: normal;
      font-family: $fontSemiBold;
    }
  }
}
.small-cart {
  &-product {
    border-bottom: 1px solid #f7f7f7;
    /deep/ .product-item {
      padding: 15px 30px;
      .cs-product2 {
        .p-img {
          width: 100px;
          height: 150px;
        }
      }
      .p-name {
        margin-bottom: 10px !important;
      }
      .p-info {
        position: relative;
      }
      .p-price {
        margin-top: 10px;
        strong {
          font-family: Muli-Regular_ExtraBold, Muli;
          font-weight: normal;
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
        .stock {
          font-size: 12px;
          font-family: Muli-Bold, Muli;
          font-weight: bold;
          color: #e61717;
          line-height: 15px;
          margin-bottom: 8px;
        }
        em {
          color: #666;
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
      }
    }
  }
  .cs-cart {
    &-checkout {
      padding: 0 30px;
    }
    &-orderPrice {
      font-size: 14px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 18px;
      letter-spacing: 1px;
      padding: 20px 0;
      display: flex;
      p {
        flex: 1;
        text-align: right;
      }
    }
    &-subscribe {
      font-size: 12px;
      font-family: Muli-Regular_Light, Muli;
      font-weight: normal;
      color: #333333;
      line-height: 20px;
      margin-bottom: 20px;
      em {
        font-family: $fontSemiBold;
      }
    }
  }
  .cs-payment-icons {
    padding: 20px 0;
    i {
      width: 42px;
      height: 24px;
      margin-right: 12px;
    }
  }
}
</style>
