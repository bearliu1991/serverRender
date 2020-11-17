<template>
  <!-- 小购物车 PC -->
  <div class="small-cart">
    <cup-popup
      title="BAG"
      size="100%"
      :direction="direction"
      :visible="visible"
      @close-popup="close"
    >
      <p class="tips">
        Only $15.1 more to get them<strong> FASTER</strong> &
        <strong> FREE</strong> in US!
      </p>
      <template v-if="cartList.length">
        <div class="small-cart-product">
          <div
            v-for="(product, index) in cartList"
            :id="index == cartList.length - outStockLength ? 'outStock' : ''"
            :key="index"
            :class="['product-item', product.skuState != 0 ? 'disabled' : '']"
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
                  <p
                    v-if="
                      (item.stock < item.quantity && item.skuState == 0) ||
                      (item.stock && item.stock < 10)
                    "
                    class="stock"
                  >
                    Only {{ item.stock }} Instock
                  </p>
                  <p v-if="item.skuState == 1" class="stock">Out of Stock</p>
                  <div class="p-bottom">
                    <div class="cs-quantity-box">
                      <cup-input-number
                        v-model="item.quantity"
                        type="disabled"
                        min="1"
                        :max="item.stock || 999"
                        @minus="updateCart(index, 0)"
                        @add="updateCart(index, 1)"
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
          <div v-if="orderPrice" class="cs-cart-orderPrice">
            <label>TOTAL</label>
            <p>AUD ${{ orderPrice.subtotal }}</p>
          </div>
          <p class="cs-cart-subscribe">
            Subscribe to Get <em>10% OFF</em> Your First AUD $75+ Order!
          </p>
          <cup-button block type="primary" @click="checkout"
            >CHECKOUT</cup-button
          >
          <div class="cs-payment-icons">
            <i class="icon_card-visa"></i>
            <i class="icon_card-master"></i>
            <i class="icon_card-pay-pal"></i>
            <i class="icon_card-afterpay"></i>
          </div>
        </div>
      </template>
      <!-- 购物车为空 -->
      <template v-else>
        <cup-empty class="icon-no-result">
          <p>Your bag is empty</p>
          <p class="normal">Sign Up and Get 10% OFF</p>
          <p class="normal">Your First Order Over AUD $75!</p>
          <cup-button type="primary" block>continue shopping</cup-button>
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
    overflow-y: auto;
    border-bottom: 1px solid #f7f7f7;
    /deep/ .product-item {
      padding: 15px 30px;
      &.disabled {
        .p-img,
        .p-name,
        .p-sku,
        .p-price,
        .cs-quantity-box {
          opacity: 0.4;
        }
      }
      .cs-product2 {
        .p-img {
          width: 100px;
          height: 150px;
        }
      }

      .p-info {
        position: relative;
        .p-name {
          margin-bottom: 10px !important;
          @include line-clamp(1);
        }
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
.cs-empty {
  p.normal {
    font-size: 14px;
    font-family: Muli-Regular_Light, Muli;
    font-weight: normal;
    color: #333333;
    line-height: 21px;
  }
  .cs-button {
    margin-top: 40px;
  }
}
</style>
<style lang="scss">
.product-item + .disabled {
  border-top: 1px solid #f7f7f7;
}
</style>
