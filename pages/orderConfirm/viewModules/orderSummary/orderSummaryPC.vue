<template>
  <div class="cs-orderSummary">
    <p class="header-tit">
      <span>ORDER SUMMARY</span>
      <a class="cs-link-text">Back to my bag</a>
    </p>
    <div class="cs-orderSummary-container">
      <!-- 商品 -->
      <div class="product-container">
        <div
          v-for="(product, index) in orderSummary.cartList"
          :key="index"
          :class="['cs-orderSummary-products']"
        >
          <cup-product-item
            :product="product"
            :class="product.skuState != 0 ? 'disabled' : ''"
          >
            <template v-slot:other="{ item }">
              <div class="p-other">
                <p class="p-quanity">X {{ item.quantity }}</p>
                <p
                  v-if="product.skuState != 0"
                  class="cs-link-text"
                  @click="removeProduct(item.skuId)"
                >
                  Remove
                </p>

                <p v-else class="p-price">
                  {{
                    (item.discountPrice || item.retailPrice) | formatCurrency
                  }}
                </p>
              </div>
            </template>
          </cup-product-item>
          <p v-if="product.skuState != 0" class="cs-fail-msg">
            Unfortunately, some items in your shopping bag are sold out. You can
            continute to pay for the remaining goods.
          </p>
        </div>
      </div>
      <!-- 优惠券 -->
      <coupon></coupon>
      <!-- 价格 -->
      <div
        v-if="orderSummary.orderPrice && orderSummary.orderPrice.subtotal"
        class="cs-orderSummary-orderprice"
      >
        <ul>
          <li v-if="orderSummary.orderPrice.subtotal">
            <label>Subtotal</label>
            <p>{{ orderSummary.orderPrice.subtotal | formatCurrency }}</p>
          </li>
          <li
            v-if="
              orderSummary.orderPrice.disCouponAmount ||
              orderSummary.orderPrice.disGiftCardAmount
            "
          >
            <label>Discount</label>
            <p>
              -{{
                (orderSummary.orderPrice.disCouponAmount ||
                  orderSummary.orderPrice.disGiftCardAmount) | formatCurrency
              }}
            </p>
          </li>
          <li v-if="shipAmount">
            <label
              >shipping <i class="icon iconfont iconicon-wap-18-yiwen"></i>
            </label>
            <p>{{ shipAmount }}</p>
          </li>
          <li v-if="orderSummary.orderPrice.total" class="orderTotal">
            <label>Total</label>
            <p>{{ orderSummary.orderPrice.total | formatCurrency }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { isEmpty } from '@assets/js/utils.js'
export default {
  inject: ['orderSummary', 'orderParams', 'buildOrder'],
  computed: {
    shipAmount() {
      const { orderParams, orderSummary } = this
      if (isEmpty(orderParams.shipAddress) || isEmpty(orderParams.delivery)) {
        return 'Calculated at next step'
      } else {
        return this._f('formatCurrency')(orderSummary.orderPrice.shipAmount)
      }
    },
  },
  methods: {
    // 删除无效的商品
    removeProduct(skuId) {
      const { productList, cartIdList } = this.orderParams
      const findIndex = productList.findIndex((item) => {
        return item.skuId === skuId
      })
      productList.splice(findIndex, 1)
      this.$router.replace({
        name: 'orderConfirm',
        query: {
          products: JSON.stringify(productList),
          cartIdList,
        },
      })
      this.buildOrder()
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-orderSummary {
  .header-tit {
    margin-top: 47px;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-family: Muli-Regular_Bold, Muli;
    font-weight: normal;
    color: #333333;
    letter-spacing: 1px;
    padding-bottom: 17px;
    a {
      flex: 1;
      font-size: 12px;
      text-align: right;
      font-family: Muli-Regular_Light, Muli;
    }
  }
  .product-container {
    max-height: 480px;
    overflow-y: auto;
  }
  &-products {
    margin-right: 32px;
    padding-top: 20px;

    border-bottom: 1px solid #f2f2f2;
    border-top: 1px solid #f2f2f2;
    // .product-item {
    //   &.disabled {
    //     border-bottom: 1px solid #f2f2f2;
    //     padding-bottom: 20px;
    //     .cs-product2 {
    //       opacity: 0.5;
    //     }
    //   }
    // }
    .cs-product2 {
      margin-bottom: 20px;
      .p-img {
        width: 100px;
        height: 150px;
        margin-right: 16px;
      }
      .p-other {
        margin-top: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        font-size: 12px;
        font-family: Muli-Regular_SemiBold, Muli;
        font-weight: normal;
        color: #333333;
        line-height: 15px;
      }
    }
  }
  // &-giftCard {
  //   padding: 20px 0;
  //   border-bottom: 1px solid #f2f2f2;
  //   .el-form {
  //     display: flex;
  //     &-item:first-child {
  //       flex: 1;
  //     }
  //   }
  //   .cs-success-msg {
  //     margin-bottom: 16px;
  //   }
  //   .card-selected {
  //     margin-top: 16px;
  //     margin-right: 16px;
  //     .card-buttons {
  //       height: 32px;
  //       line-height: 32px;
  //       border: 1px solid #d8d8d8;
  //       padding: 0 12px;
  //       display: inline-block;
  //       i {
  //         font-size: 10px;
  //         &:first-child {
  //           font-size: 16px;
  //         }
  //         span {
  //           margin-left: 8px;
  //           margin-left: 12px;
  //           display: inline-block;
  //         }
  //       }
  //     }
  //   }
  // }
  &-orderprice {
    padding: 20px 0;
    font-size: 14px;
    font-family: Muli-Regular_Light, Muli;
    font-weight: normal;
    color: #333333;
    line-height: 18px;
    li {
      display: flex;
      label {
        flex: 1;
      }
      &:not(:last-child) {
        margin-bottom: 16px;
      }
      &.orderTotal {
        padding-top: 20px;
        border-top: 1px solid #f2f2f2;
        font-family: Muli-Regular_Bold, Muli;
      }
    }
  }
}
</style>
