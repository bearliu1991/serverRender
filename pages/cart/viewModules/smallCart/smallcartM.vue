<template>
  <!-- 小购物车 PC -->
  <div class="small-cart">
    <cup-popup
      size="90%"
      :with-header="false"
      :visible="visible"
      @scroll="scroll"
    >
      <div
        :class="['small-cart-body', isFixed ? 'fixedBottom' : '']"
        style="height: 100%; overflow-y: auto"
      >
        <header class="small-cart_header">
          <span class="tips"
            ><strong>{{ cartNums }}</strong> Avalibal Items</span
          >
          <p>BAG</p>
          <i
            class="icon iconfont iconicon-web-24-close-black"
            @click="close"
          ></i>
        </header>

        <p class="tips">
          Only $15.1 more to get them<strong> FASTER</strong> &
          <strong> FREE</strong> in US!
        </p>
        <template v-if="cartList.length">
          <div class="small-cart-product">
            <div
              v-for="(product, index) in cartList"
              :key="index"
              :class="['product-item', product.skuState != 0 ? 'disabled' : '']"
            >
              <cup-product-item :product="product">
                <template v-slot:sku="{ item }">
                  <div class="cs-quantity-box">
                    <cup-input-number
                      v-model="item.quantity"
                      min="1"
                      :max="item.stock || 999"
                      @minus="updateCart(index, 0)"
                      @add="updateCart(index, 1)"
                    ></cup-input-number>
                  </div>
                </template>
                <template v-slot:other="{ item }">
                  <p
                    v-if="
                      (item.stock == item.quantity && item.skuState == 0) ||
                      (item.stock && item.stock < 10)
                    "
                    class="stock"
                  >
                    Only {{ item.stock }} Instock
                  </p>
                  <p v-if="item.skuState == 1" class="stock">Out of Stock</p>
                  <div class="p-operate">
                    <!-- <p class="stock">Only 1 Instock</p>  -->
                    <div class="p-bottom">
                      <p class="p-price">
                        <strong
                          >AUD {{ item.currencySign
                          }}{{ item.discountPrice || item.retailPrice }}</strong
                        >
                        <del v-if="item.discountPrice"
                          >AUD {{ item.currencySign }}{{ item.retailPrice }}
                        </del>
                      </p>
                      <em @click="removeCart(index)">Remove</em>
                    </div>
                  </div>
                </template>
              </cup-product-item>
            </div>
          </div>
          <div class="cs-cart-checkout">
            <div v-if="orderPrice" class="cs-cart-orderPrice">
              <p>TOTAL AUD ${{ orderPrice.subtotal }}</p>
            </div>
            <p class="cs-cart-subscribe">
              Subscribe to Get <em>10% OFF</em> Your First AUD $75+ Order!
            </p>
            <cup-button block type="primary">CHECKOUT</cup-button>
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
      </div>
    </cup-popup>
  </div>
</template>
<script>
import cartMixin from '../cartMixin'
export default {
  mixins: [cartMixin],
  mounted() {
    console.log(this.$slots)
    // selector.addEventListener('scroll', function (e) {
    //   console.log(e)
    // })
  },
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
    display: flex;
    align-items: center;
    background: #fff;
    z-index: 2003;
    p {
      flex: 1;
      font-size: 18px;
      text-align: center;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333;
    }
    strong {
      color: #333;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
    }
  }
  p.tips {
    margin-top: 50px;
    padding: 12px 30px;
    border-bottom: 1px solid #f7f7f7;
    color: #000;
    strong {
      font-weight: normal;
      font-family: $fontSemiBold;
    }
  }
  &-product {
    border-bottom: 1px solid #f7f7f7;
    /deep/ .product-item {
      padding: 12px 16px;
      &.disabled {
        opacity: 0.4;
      }
      .cs-product2 {
        .p-img {
          width: 100px;
          height: 150px;
        }
      }
      .p-name {
        margin-bottom: 18px !important;
      }
      .p-info {
        position: relative;
        // .p-name {
        //   @include line-clamp(1);
        // }
      }
      .p-price {
        flex: 1;
        strong {
          font-family: Muli-Regular_ExtraBold, Muli;
          font-weight: normal;
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
      }
    }
  }
  /deep/.cs-add-minus {
    align-items: center;
    justify-content: center;
    display: flex;
    margin: auto;
    width: 85px;
    height: 32px;
    // background: #ffffff;
    // border: 1px solid #eaeaea;
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
      padding: 16px;
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
        // flex: 1;
        text-align: center;
      }
    }
    &-subscribe {
      font-size: 12px;
      font-family: Muli-Regular_Light, Muli;
      font-weight: normal;
      color: #333333;
      line-height: 15px;
      margin-bottom: 16px;
      em {
        font-family: $fontSemiBold;
      }
    }
  }
  .cs-payment-icons {
    padding: 16px 32px 0 32px;
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
.fixedBottom {
  .small-cart-product {
    margin-bottom: 133px;
  }
  .cs-cart-checkout {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 9999;
    background: #fff;
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
