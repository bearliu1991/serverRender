<template>
  <div class="cs-payment-layout">
    <div v-if="orderInfo" class="cs-payment-left">
      <header class="topbar">
        <i class="icon iconfont icontongyong-topbar-web-logo-black"></i>
      </header>
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
      <div class="payment-box">
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
        <div class="box-container">
          <div class="box-1">
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
          </div>
          <div class="box-1">
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
          </div>
        </div>
      </div>
      <div class="payment-btns">
        <p>Need help? <nuxt-link to="">Contact us</nuxt-link></p>
        <cup-button
          v-if="type == 'cancel'"
          type="primary"
          block
          @click="toOrderDetail"
          >ORDER DETAILS</cup-button
        >
        <cup-button v-else type="primary" @click="toContinue"
          >CONTINUE SHOPPING</cup-button
        >
      </div>
      <footer>
        <ul>
          <li>Refund policy</li>
          <li>Shipping policy</li>
          <li>Privacy policy</li>
          <li>Terms of service</li>
        </ul>
      </footer>
    </div>
    <div v-if="orderInfo" class="cs-payment-right">
      <header>ORDER SUMMARY</header>
      <div class="payment-product">
        <cup-product-item
          v-for="(item, index) in orderInfo.productList"
          :key="index"
          :product="item"
        >
          <template v-slot:other>
            <div class="p-other">
              <p class="p-quanity">X {{ item.quantity }}</p>
              <p class="p-price">
                <strong>{{ item.price | formatCurrency }}</strong>
              </p>
            </div>
          </template>
        </cup-product-item>
      </div>
      <div class="payment-price">
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
          <li v-if="orderInfo.discounts.length">
            <label>
              Discount
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
            </label>
            <p class="cs-red">
              -{{ orderInfo.payment.discount | formatCurrency }}
            </p>
          </li>
          <li>
            <label
              >Shipping <em>（{{ orderInfo.delivery.transportName }} )</em>
            </label>
            <p v-if="orderInfo.delivery.actualFreight">
              {{ orderInfo.delivery.actualFreight | formatCurrency }}
            </p>
            <p v-else>Calculated after selection</p>
          </li>
          <li class="orderTotal">
            <label
              >TOTAL
              <em
                v-if="
                  orderInfo.payment.gstTax > 0 &&
                  orderInfo.shipAddress.country == 'Australia'
                "
                >（Including {{ orderInfo.payment.gstTax | formatCurrency }} in
                taxes )</em
              ></label
            >
            <p>
              <strong>{{ orderInfo.payment.total | formatCurrency }}</strong>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import paymentMixin from '../paymentMixin'
export default {
  mixins: [paymentMixin],
}
</script>
<style lang="scss" scoped>
.cs-payment {
  &-layout {
    display: flex;
    background: #fafafa;
    .cs-red {
      color: #e61717 !important;
    }
    .cs-upper {
      text-transform: uppercase;
    }
  }
  &-right {
    width: 46%;
    padding: 0 324px 0 60px;
    background: #fafafa;
    min-height: 100%;
    header {
      font-size: 18px;
      @include font($fontMuliBold);
      color: #333333;
      line-height: 23px;
      letter-spacing: 1px;
      padding: 172px 0 17px 0;
      border-bottom: 1px solid #f2f2f2;
    }
    .payment-product {
      border-bottom: 1px solid #f2f2f2;
      padding: 10px 0;
      /deep/.cs-product2 {
        padding: 10px 0;
        .p-img {
          width: 100px;
          height: 150px;
        }
        .p-other {
          display: flex;
          align-items: center;
          margin-top: 4px;
          .p-quanity {
            flex: 1;
            font-family: Muli-Regular_SemiBold, Muli;
          }
        }
      }
    }
    .payment-price {
      padding: 20px 0;
      font-size: 14px;

      color: #333333;
      line-height: 18px;
      li {
        display: flex;
        label {
          flex: 1;
          display: flex;
          align-items: center;
          em {
            color: #999;
          }
        }
        &:not(:last-child) {
          margin-bottom: 16px;
        }
        &.orderTotal {
          padding-top: 20px;
          border-top: 1px solid #f2f2f2;
          @include font($fontMuliBold);
          label {
            em {
              @include font($fontRegular);
            }
          }
          p {
            font-size: 18px;
            line-height: 23px;
            letter-spacing: 1px;
          }
        }
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
        margin-left: 10px;
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
  &-left {
    background: #fff;
    width: 54%;
    height: 100%;
    padding: 0 56px 0 324px;
    .topbar {
      padding: 60px 55px 50px 0;
      i {
        font-size: 52px;
      }
    }
    .payment-orderNo {
      margin-bottom: 50px;
      display: flex;
      align-items: center;
      i {
        font-size: 48px;
        margin-right: 26px;
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
          font-size: 18px;
          font-family: Muli-Regular_SemiBold, Muli;
          line-height: 23px;
          width: 100%;
          word-break: break-all;
          &:last-child {
            margin-top: 4px;
            font-size: 24px;
            @include font($fontMuliBold);
            line-height: 30px;
            letter-spacing: 1px;
          }
        }
      }
    }
    .payment-box {
      margin-bottom: 16px;
      background: #ffffff;
      border: 1px solid #d8d8d8;
      padding: 24px;
      .box-title {
        font-size: 18px;
        @include font($fontMuliBold);
        color: #333333;
        line-height: 23px;
        letter-spacing: 1px;
        &.marb3 {
          margin-bottom: 30px;
        }
      }
      .box-container {
        display: flex;
        .box-1 {
          flex: 1;
          &:last-child {
            margin-left: 66px;
          }
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
          margin-top: 10px;
          display: flex;
          align-items: center;
          word-break: break-all;
          i {
            background-size: contain;
            width: 32px;
            height: 20px;
            margin-right: 8px;
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
      display: flex;
      align-items: center;
      margin-top: 40px;
      p {
        font-size: 14px;
        line-height: 18px;
        flex: 1;
        a {
          font-family: Muli-Regular_SemiBold, Muli;
          text-decoration: underline;
          color: #333;
        }
      }
    }
    footer ul {
      display: flex;
      padding: 90px 0 24px 0;
      li {
        font-size: 12px;
        color: #999999;
        line-height: 15px;
        &:not(:last-child) {
          &::after {
            content: '|';
            display: inline-block;
            margin: 0 20px;
          }
        }
      }
    }
  }
}
</style>
