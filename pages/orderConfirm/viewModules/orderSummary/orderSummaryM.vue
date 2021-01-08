<template>
  <div class="cs-orderSummary mobile">
    <header @click="isShow = !isShow">
      <span>ORDER SUMMARY</span>
      <i
        :class="[
          'icon iconfont icon12-jiantou-shangla',
          !isShow ? 'is-reverse' : '',
        ]"
      ></i>
      <span class="flex-1"
        ><strong>{{
          orderSummary.orderPrice.total | formatCurrency
        }}</strong></span
      >
    </header>
    <div v-show="isShow" class="cs-orderSummary-container">
      <!-- 商品 -->
      <div class="product-container">
        <template v-for="(product, index) in orderSummary.cartList">
          <div :key="index" :class="['cs-orderSummary-products']">
            <cup-product-item
              :id="index == 0 && product.skuState != 0 ? 'outStockArea' : ''"
              is-soldout
              :product="product"
            >
              <template v-slot:other="{ item }">
                <div class="p-other">
                  <p class="p-quanity">
                    X {{ item.quantity }}
                    <span
                      v-if="
                        0 < item.stock < 10 &&
                        item.quantity >= item.stock &&
                        item.skuState == 0
                      "
                      class="stock"
                      >Only {{ item.stock }} left</span
                    >
                  </p>
                  <p
                    v-if="product.skuState != 0"
                    class="cs-link"
                    @click="removeProduct(item.skuId)"
                  >
                    Remove
                  </p>

                  <p v-else class="p-price">
                    <strong>{{
                      (item.discountPrice || item.retailPrice) | formatCurrency
                    }}</strong>
                  </p>
                </div>
              </template>
            </cup-product-item>
          </div>
          <div
            v-if="orderParams.outStockNum == index + 1"
            :key="`fail_${index}`"
            class="product-fail"
          >
            <p class="cs-fail-msg">
              Unfortunately, some items in your shopping bag are sold out. You
              can continute to pay for the remaining goods.
            </p>
          </div>
        </template>
      </div>
      <!-- 优惠券 -->
      <!-- <coupon ref="coupon" class="mobile"></coupon> -->
      <!-- 价格 -->
      <div v-if="orderSummary.orderPrice" class="cs-orderSummary-orderprice">
        <ul>
          <li>
            <label
              >Subtotal
              <em v-if="orderParams.shipAddress.country == 'Australia'"
                >( Including GST )</em
              >
            </label>
            <p v-if="orderSummary.orderPrice.subtotal">
              {{ orderSummary.orderPrice.subtotal | formatCurrency }}
            </p>
            <p v-else>pending</p>
          </li>
          <li
            v-if="
              orderSummary.orderPrice.couponTotalAmount > 0 ||
              orderSummary.orderPrice.giftCardAmount > 0
            "
          >
            <label>Discount</label>
            <p class="cs-red">
              -{{
                (orderSummary.orderPrice.couponTotalAmount +
                  orderSummary.orderPrice.giftCardAmount)
                  | formatCurrency
              }}
            </p>
          </li>
          <li v-if="shipAmount">
            <label
              >Shipping
              <el-tooltip
                v-if="isTips"
                slot="suffix"
                class="item"
                effect="light"
                :content="toolTips"
                placement="top-end"
              >
                <i class="icon iconfont iconwap-18-yiwen"></i>
              </el-tooltip>
            </label>
            <p>{{ shipAmount }}</p>
          </li>
          <li class="orderTotal">
            <label
              >TOTAL <br />
              <em
                v-if="
                  orderParams.shipAddress.country == 'Australia' &&
                  orderSummary.orderPrice.gstTax > 0
                "
                >(Including
                {{ orderSummary.orderPrice.gstTax | formatCurrency }} in
                taxes)</em
              >
            </label>
            <p v-if="orderSummary.orderPrice.total">
              {{ orderSummary.orderPrice.total | formatCurrency }}
            </p>
            <p v-else>pending</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ['orderSummary', 'orderParams', 'buildOrder'],
  data() {
    return {
      isShow: true,
      isTips: false,
      toolTips: '9999',
    }
  },
  computed: {
    shipAmount() {
      const { orderParams, orderSummary, isEmpty } = this
      if (
        isEmpty(orderParams.shipAddress) ||
        !orderParams.shipAddress.countryId ||
        isEmpty(orderParams.delivery) ||
        !orderParams.delivery.shipId
      ) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isTips = true
        return 'Calculated after selection'
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isTips = false
        return this._f('formatCurrency')(
          orderSummary.orderPrice.shipAmount || 0
        )
      }
    },
  },
  methods: {
    toShow() {
      this.isShow = true
    },
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

      if (productList.length === 0) {
        this.$alert({
          text: 'Your bag is empty.',
          isCancel: true,
          isConfirm: false,
          cancel: 'GO SHOPPING',
        }).then(
          () => {},
          () => {
            this.$router.push('/')
          }
        )
      } else {
        this.buildOrder()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-orderSummary {
  header {
    padding: 0 16px;
    height: 54px;
    background: #f2f2f2;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    .icon {
      font-size: 12px;
      margin-left: 8px;
    }
    .flex-1 {
      flex: 1;
      text-align: right;
    }
    .is-reverse {
      transform: rotate(-180deg);
    }
  }
  &-container {
    padding: 0 16px;
    background: #fafafa;
    .product-fail {
      margin-top: 4px;
      padding-bottom: 24px;
      border-bottom: 1px solid #f2f2f2;
      & + .cs-orderSummary-products {
        padding-top: 24px;
      }
    }
  }
  &-products {
    padding: 12px 0;
    &:first-child {
      padding-top: 24px;
    }
    &:last-child {
      border-bottom: 1px solid #f2f2f2;
      padding-bottom: 24px;
    }
    // border-bottom: 1px solid #f2f2f2;
    .cs-product2 {
      &.mobile {
        /deep/.p-img {
          width: 80px;
          height: 120px;
        }
        /deep/.p-info {
          padding-top: 8px;
        }
      }
      .p-other {
        margin-top: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        font-family: Muli-Regular_SemiBold, Muli;
        font-weight: normal;
        color: #333333;
        line-height: 15px;
        .p-quanity {
          font-size: 14px;
        }
      }
    }
    .stock {
      font-size: 12px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #e61717;
      line-height: 15px;
      margin-bottom: 8px;
      margin-left: 8px;
    }
  }
  &-orderprice {
    padding: 24px 0;
    font-size: 14px;
    color: #333333;
    line-height: 18px;
    border-top: 1px solid #f2f2f2;
    li {
      display: flex;
      label {
        flex: 1;
        em {
          color: #999;
        }
      }
      &:not(:last-child) {
        margin-bottom: 16px;
      }
      &.orderTotal {
        padding-top: 17px;
        border-top: 1px solid #f2f2f2;
        @include font($fontMuliBold);
        label {
          em {
            @include font($fontRegular);
          }
        }
        p {
          font-size: 18px;
          font-family: Muli-Regular_ExtraBold, Muli;
          font-weight: normal;
          color: #333333;
          line-height: 23px;
          letter-spacing: 1px;
          b {
            font-size: 14px;
          }
        }
      }
    }
    .cs-red {
      color: #e61717;
    }
  }
}
</style>
