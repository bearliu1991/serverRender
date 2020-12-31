<template>
  <div v-if="orderInfo" class="cs-payment-layout">
    <div class="cs-orderSummary">
      <header @click="isShow = !isShow">
        <span>ORDER SUMMARY</span>
        <i
          :class="[
            'icon iconfont icon12-jiantou-shangla',
            !isShow ? 'is-reverse' : '',
          ]"
        ></i>
        <span class="flex-1"
          ><strong>{{ orderInfo.payment.total | formatCurrency }}</strong></span
        >
      </header>
      <div v-show="isShow" class="cs-orderSummary-container">
        <!-- 商品 -->
        <div class="product-container">
          <cup-product-item
            v-for="(product, index) in orderInfo.productList"
            :key="index"
            :product="product"
          >
            <template v-slot:other="{ item }">
              <div class="p-other">
                <p class="p-quanity">X {{ item.quantity }}</p>

                <p class="p-price">
                  <strong>{{ item.price | formatCurrency }}</strong>
                </p>
              </div>
            </template>
          </cup-product-item>
        </div>
        <!-- 价格 -->
        <div v-if="orderInfo.payment" class="cs-orderSummary-orderprice">
          <ul>
            <li>
              <label
                >Subtotal
                <em v-if="orderInfo.shipAddress.country == 'Australia'"
                  >( Including GST )</em
                >
              </label>
              <p>{{ orderInfo.payment.subtotal | formatCurrency }}</p>
            </li>
            <li v-if="orderInfo.discounts.length" class="payment-discount">
              <section>
                <label> Discount </label>
                <p class="cs-red">
                  -{{ orderInfo.payment.discount | formatCurrency }}
                </p>
              </section>
              <div class="card-selected">
                <div class="card-buttons">
                  <i :class="['icon iconfont', 'iconwap-14-lipinka']"></i>
                  <span>6666</span>
                </div>
                <div class="card-buttons">
                  <i class="icon iconfont iconwap-14-zhekou"></i>
                  <span>555</span>
                </div>
              </div>
            </li>
            <li>
              <label>
                <p>Shipping</p>
                <em v-if="orderInfo.delivery.transportName"
                  >( {{ orderInfo.delivery.transportName }} )</em
                >
              </label>
              <p v-if="orderInfo.delivery.actualFreight">
                {{ orderInfo.delivery.actualFreight | formatCurrency }}
              </p>
              <p v-else>Calculated after selection</p>
            </li>
            <li class="orderTotal">
              <label
                >TOTAL <br />
                <em
                  v-if="
                    orderInfo.payment.gstTax > 0 &&
                    orderInfo.shipAddress.country == 'Australia'
                  "
                  >( Including
                  {{ orderInfo.payment.gstTax | formatCurrency }} in taxes )</em
                >
              </label>
              <p>
                {{ orderInfo.payment.total | formatCurrency }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="cs-payment-left">
      <div class="payment-box">
        <div class="payment-orderNo">
          <i
            v-if="type == 'cancel'"
            class="icon iconfont iconweb-48-shibai cs-red"
          ></i>
          <i v-else class="icon iconfont iconweb-48-wancheng"></i>
          <div class="flex-1">
            <p>Order {{ orderInfo.orderCornet }}</p>
            <p v-if="type == 'cancel'" class="cs-upper">
              PAYMENT FAILED, {{ orderInfo.cust.customerName }}!
            </p>
            <p v-else class="cs-upper">
              THANK YOU, {{ orderInfo.cust.customerName }}!
            </p>
          </div>
        </div>
        <p class="box-title">
          <template v-if="type == 'cancel'">
            YOUR ORDER HASN'T BEEN COMPLETED
          </template>
          <template v-else> YOUR ORDER IS CONFIRMED </template>
        </p>
        <div class="box-container">
          <p>
            <template v-if="type == 'cancel'">
              Bank card information error.
            </template>
            <template v-else>
              You’ll recieve a confirmation email with your order number
              shortly.
            </template>
          </p>
        </div>
      </div>
      <div class="payment-box">
        <p class="box-title marb3">CUSTOMER INFORMATION</p>
        <div class="box-container pad-t">
          <section class="contract">
            <h1>CONTACT INFORMATION</h1>
            <p>
              {{ orderInfo.cust.email }}
            </p>
          </section>
          <section class="shipAddress">
            <h1>SHIPPING ADDRESS</h1>
            <p class="lineClamp">
              {{ orderInfo.shipAddress.firstName
              }}{{ orderInfo.shipAddress.lastName }}
            </p>
            <p class="lineClamp">
              {{ orderInfo.shipAddress.addressFirst }}
            </p>
            <p class="lineClamp">
              {{ orderInfo.shipAddress.addressSecond }}
            </p>
            <p class="lineClamp">
              {{ orderInfo.shipAddress.city }}
            </p>
            <p class="lineClamp">
              {{ orderInfo.shipAddress.stateName
              }}{{ orderInfo.shipAddress.postcode }}
            </p>
            <p class="lineClamp">
              {{ orderInfo.shipAddress.country }}
            </p>
            <p class="lineClamp">
              {{ orderInfo.shipAddress.telephone }}
            </p>
          </section>
          <section class="shipMethod">
            <h1>SHIPPING METHOD</h1>
            <p>
              {{ orderInfo.delivery.transportName }}
            </p>
          </section>
          <section v-if="orderInfo.userRemark" class="orderNote">
            <h1>ORDER NOTE</h1>
            <p>
              {{ orderInfo.userRemark }}
            </p>
          </section>
          <section class="shipAddress">
            <h1>BILLING ADDRESS</h1>
            <p class="lineClamp">
              {{ orderInfo.billAddress.firstName
              }}{{ orderInfo.billAddress.lastName }}
            </p>
            <p class="lineClamp">
              {{ orderInfo.billAddress.addressFirst }}
            </p>
            <p class="lineClamp">
              {{ orderInfo.billAddress.addressSecond }}
            </p>
            <p class="lineClamp">
              {{ orderInfo.billAddress.city }}
            </p>
            <p class="lineClamp">
              {{ orderInfo.billAddress.stateName
              }}{{ orderInfo.billAddress.postcode }}
            </p>
            <p class="lineClamp">
              {{ orderInfo.billAddress.country }}
            </p>
            <p class="lineClamp">
              {{ orderInfo.billAddress.telephone }}
            </p>
          </section>
          <section class="contract">
            <h1>PAYMENT METHOD</h1>
            <p>
              <i
                v-if="orderInfo.payment.paymentType === 3"
                class="icon_card-afterpay"
              ></i>
              <i
                v-else-if="orderInfo.payment.paymentType === 1"
                class="icon_card-amex"
              ></i>
              <i
                v-else-if="orderInfo.payment.paymentType === 2"
                class="icon_card-pay-pal"
              ></i>
              <span>
                {{ orderInfo.payment.total | formatCurrency }}
              </span>
            </p>
          </section>
        </div>
      </div>
      <div class="payment-btns">
        <cup-button
          v-if="type == 'cancel'"
          type="primary"
          block
          @click="toOrderDetail"
          >ORDER DETAILS</cup-button
        >

        <cup-button v-else type="primary" block @click="toContinue"
          >CONTINUE SHOPPING</cup-button
        >
        <p>Need help? <nuxt-link to="">Contact us</nuxt-link></p>
      </div>
      <footer>
        <ul>
          <li>Refund policy</li>
          <li>Shipping policy</li>
          <li>Privacy policy</li>
        </ul>
        <ul>
          <li>Terms of service</li>
        </ul>
      </footer>
    </div>
  </div>
</template>
<script>
import paymentMixin from '../paymentMixin'
export default {
  mixins: [paymentMixin],
  data() {
    return {
      isShow: true,
    }
  },
  methods: {
    toShow() {
      this.isShow = true
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-payment {
  &-layout {
    background: #fafafa;
    .cs-red {
      color: #e61717 !important;
    }
    .cs-upper {
      text-transform: uppercase;
    }
    .cs-orderSummary {
      width: 100%;
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
      }
      .product-container {
        padding: 8px 0;
        border-bottom: 1px solid #f2f2f2;
        .cs-product2 {
          padding: 8px 0;
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
      }
      &-orderprice {
        padding: 16px 0;
        font-size: 14px;
        color: #333333;
        line-height: 18px;

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
      .payment-discount {
        flex-direction: column;
        section {
          display: flex;
          margin-bottom: 12px;
        }
      }
      .card-selected {
        font-size: 0;
        .card-buttons {
          height: 30px;
          line-height: 30px;
          border: 1px solid #d8d8d8;
          padding: 0 10px;
          display: inline-block;
          &:not(:first-child) {
            margin-left: 10px;
          }
          i {
            font-size: 16px;
          }
          span {
            margin-left: 8px;
            font-size: 12px;
            color: #333333;
            display: inline-block;
          }
        }
      }
    }
  }
  &-left {
    .payment-orderNo {
      display: flex;
      align-items: center;
      margin-bottom: 33px;
      i {
        font-size: 40px;
        margin-right: 16px;
        height: 100%;
        color: #2a9500;
      }
      .flex-1 {
        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: left;
        flex: 1;
        p {
          font-size: 12px;
          font-family: Muli-Regular_SemiBold, Muli;
          line-height: 15px;
          width: 100%;
          &:last-child {
            margin-top: 4px;
            font-size: 18px;
            @include font($fontMuliBold);
            line-height: 23px;
            letter-spacing: 1px;
            word-break: break-all;
          }
        }
      }
    }
    .payment-box {
      margin-bottom: 16px;
      &:last-child {
        margin-bottom: 0;
      }

      background: #ffffff;
      padding: 24px 16px;
      .box-title {
        font-size: 14px;
        @include font($fontMuliBold);
        color: #333333;
        line-height: 18px;
        letter-spacing: 1px;
        &.marb3 {
          padding-bottom: 24px;
          border-bottom: 1px solid #f7f7f7;
        }
      }
      .box-container {
        &.pad-t {
          padding-top: 24px;
        }
        section {
          margin-bottom: 40px;
          &:last-child {
            margin-bottom: 0;
          }
          .lineClamp {
            @include line-clamp(1);
          }
        }
        h1 {
          font-size: 12px;
          @include font($fontMuliBold);
          color: #333;
          line-height: 15px;
          letter-spacing: 1px;
        }
        p {
          font-size: 14px;
          color: #333;
          line-height: 18px;
          margin-top: 12px;
          display: flex;
          align-items: center;
          i {
            background-size: contain;
            width: 32px;
            height: 20px;
            margin-right: 4px;
            &.icon_card-afterpay {
              width: 63px;
            }
          }
          em {
            @include font($fontMuliBold);
          }
        }
      }
    }
    .payment-btns {
      background: #ffffff;
      padding: 0 16px 40px 16px;
      .cs-button {
        margin: 16px 0;
      }
      p {
        font-size: 14px;
        line-height: 18px;

        text-align: center;
        padding-bottom: 40px;
        a {
          font-family: Muli-Regular_SemiBold, Muli;
          text-decoration: underline;
          color: #333;
        }
      }
    }
    footer {
      padding: 24px 16px;
      ul {
        display: flex;
        margin-bottom: 8px;
        justify-content: space-between;
        li {
          font-size: 12px;
          color: #333333;
          line-height: 24px;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
