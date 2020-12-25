<template>
  <div v-if="orderInfo" class="cs-orderDetail">
    <div class="cs-back">
      <i
        class="icon iconfont iconicon-web-14-jiantou-fenyezuojiannormal"
        @click="$router.go(-1)"
      ></i>
      <p>Back to my orders</p>
    </div>
    <section class="cs-detailWrapper">
      <div v-if="!orderInfo.needSplitPackage" class="cs-orderStatus">
        <p class="tit">Order Status: {{ orderInfo.stateDesp }}</p>
        <!-- 支付处理中 -->
        <p v-if="orderInfo.state == 20" class="tips">
          It may take a few minutes to confirm your payment.
        </p>
        <!-- 已发货 -->
        <p v-else-if="orderInfo.state == 40" class="tips">
          Tracking Number:<em class="cs-link">61290985291223661</em
          ><i class="icon iconfont iconwap-14-copy"></i>
        </p>
      </div>
      <!-- 显示订单编号 -->
      <div class="cs-orderNo">
        <p>
          <label>ORDER</label>
          <span class="semiBold">{{ orderInfo.orderCornet }}</span>
          <i class="icon iconfont iconwap-14-copy"></i>
        </p>
        <p class="time">
          {{ orderInfo.gmtCreate | dateFormat('dd/MM/yyyy hh:mm') }}
        </p>
      </div>
      <div class="cs-payment-layout">
        <div class="cs-orderSummary">
          <!-- 分包 -->

          <ul v-if="orderInfo.needSplitPackage" class="cs-packages">
            <li
              v-for="(packageItem, index) in orderInfo.packageList"
              :key="index"
              class="cs-orderSummary-container"
            >
              <header>
                <i class="icon iconfont iconwap-14-baoguo"></i>
                <p>
                  {{ packageItem.packageName }}:
                  {{ packageItem.stateDesp }}
                </p>
              </header>
              <div class="cs-orderStatus">
                <p v-if="packageItem.state == 40" class="tips">
                  Tracking Number:<em class="cs-link">61290985291223661</em
                  ><i class="icon iconfont iconwap-14-copy"></i>
                </p>
              </div>
              <div class="product-container">
                <cup-product-item
                  v-for="product in packageItem.productList"
                  :key="product.skuId"
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
              <div
                v-if="getButtons(packageItem.state).length"
                class="cs-packageBtn"
              >
                <cup-button
                  v-for="(btn, subIndex) in getButtons(packageItem.state)"
                  :key="subIndex"
                  class="cs-upper"
                  :type="btn.type || 'plain'"
                  @click="handlerEvent(btn.event)"
                  >{{ btn.btnName }}</cup-button
                >
              </div>
            </li>
          </ul>

          <!-- 非拆包商品 -->
          <div v-else class="product-container cs-orderSummary-container">
            <cup-product-item
              v-for="(product, index) in orderInfo.packageList[0].productList"
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
                <label>Subtotal <em>( Including GST )</em> </label>
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
                  <p>shipping</p>
                  <em v-if="orderInfo.delivery.transportName"
                    >( {{ orderInfo.delivery.transportName }} )</em
                  >
                </label>
                <p v-if="orderInfo.delivery.actualFreight">
                  {{ orderInfo.delivery.actualFreight | formatCurrency }}
                </p>
                <p v-else>Calculated at next step</p>
              </li>
              <li class="orderTotal">
                <label
                  >TOTAL <br />
                  <em v-if="orderInfo.payment.gstTax"
                    >( Including
                    {{ orderInfo.payment.gstTax | formatCurrency }} in taxes
                    )</em
                  >
                </label>
                <p>
                  {{ orderInfo.payment.total | formatCurrency }}
                </p>
              </li>
              <!-- 部分退款 -->
              <li v-if="orderInfo.state == 40">
                <label>Refunded Amount</label>
                <p class="cs-orange">AUD $14.99</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="cs-payment-left">
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
                <h1>
                  SHIPPING ADDRESS
                  <!-- 未付款可展示编辑按钮 -->
                  <i
                    v-if="orderInfo.state == 10"
                    class="icon iconfont icon12-bianji"
                    @click="showAddress"
                  ></i>
                </h1>
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
                    class="icon_card-master"
                  ></i>
                  <span>
                    {{ orderInfo.payment.total | formatCurrency }}
                  </span>
                </p>
              </section>
              <section v-if="orderInfo.userRemark" class="orderNote">
                <h1>ORDER NOTE</h1>
                <p>
                  {{ orderInfo.userRemark }}
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
    <cup-time-down
      v-if="orderInfo.state == 10"
      :times="orderInfo.orderExpireTime"
      >Remaining payment time</cup-time-down
    >
    <div
      v-if="buttons.length && !orderInfo.needSplitPackage"
      class="cs-orderBtns"
    >
      <cup-button
        v-for="(btn, subIndex) in buttons"
        :key="subIndex"
        class="cs-upper"
        :type="btn.type || 'plain'"
        :block="buttons.length == 1"
        @click="handlerEvent(btn.event, orderInfo.orderNo)"
        >{{ btn.btnName }}</cup-button
      >
    </div>
    <!-- 编辑地址 -->
    <cup-popup
      :visible="isEditAddress"
      :size="'85%'"
      title="edit shipping ADDRESS"
    >
      <cup-address-form is-edit></cup-address-form>
    </cup-popup>
    <!-- 取消原因 -->
    <cup-popup
      v-if="orderInfo.state == 10"
      :visible="isCancel"
      :size="'85%'"
      title="CANCEL REASON"
    >
      <cup-radioGroup>
        <cup-radio> 222222 </cup-radio>
      </cup-radioGroup>
    </cup-popup>
    <!-- 已取消的订单加入购物车 -->
    <small-cart
      v-if="orderInfo.state == 60"
      :visible.sync="isCartVisible"
    ></small-cart>
  </div>
</template>
<script>
import myOrderMixin from '../../myOrderMixin'
export default {
  mixins: [myOrderMixin],
  mounted() {
    this.queryOrderInfo()
  },
}
</script>
<style lang="scss" scoped>
.cs-orderDetail {
  .cs-back {
    background-color: #fff;
    font-size: 12px;
    padding: 24px 16px;
    display: flex;
    i {
      margin-right: 8px;
    }
    p {
      font-family: Muli-Regular_SemiBold, Muli;
      font-weight: normal;
      color: #333333;
      line-height: 18px;
    }
  }
  .cs-detailWrapper {
    margin-bottom: 64px;
  }
  .cs-orderStatus {
    padding: 0 16px;
    background-color: #fff;
    .tit {
      font-size: 14px;
      @include font($fontMuliBold);
      line-height: 18px;
    }
    .tips {
      margin-top: 8px;
      display: flex;
      line-height: 15px;
      align-items: center;
    }
    i {
      margin-left: 4px;
      font-size: 12px;
    }
    padding-bottom: 16px;
  }
  .cs-orderNo {
    align-items: center;
    padding: 0 16px;
    height: 30px;
    background: #fafafa;
    font-size: 12px;
    line-height: 15px;
    display: flex;
    justify-content: space-between;
    i {
      margin-left: 4px;
    }
  }
}
.cs-upper {
  text-transform: uppercase;
}
.cs-orange {
  color: #ffab00;
  font-family: Muli-Bold, Muli;
  font-weight: bold;
}
.cs-payment {
  &-layout {
    background: #fafafa;
    .cs-red {
      color: #e61717 !important;
    }

    .cs-orderSummary {
      width: 100%;
      margin-bottom: 12px;
      &-container {
        padding: 0 16px;
        background-color: #fff;
      }
      .product-container {
        padding: 8px 16px;
        border-bottom: 1px solid #f2f2f2;
        .cs-product2 {
          padding: 8px 0;
          /deep/.p-img {
            width: 80px;
            height: 120px;
          }
          /deep/.p-name {
            margin-top: 8px;
            margin-bottom: 12px;
          }
          .p-other {
            margin-top: 16px;
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
        padding: 16px;
        font-size: 14px;
        color: #333333;
        line-height: 18px;
        background-color: #fff;
        margin-bottom: 8px;

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
    .shipAddress {
      i {
        font-size: 12px;
        margin-left: 11px;
      }
    }
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
.cs-packages {
  li {
    padding: 16px 0;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
    .product-container {
      border-bottom: 0 !important;
    }
    &:last-child {
      border-bottom: 1px solid #f7f7f7;
    }
    .cs-orderStatus {
      padding: 0;
    }

    header {
      display: flex;
      align-items: center;
      padding: 9px 0;
      font-size: 14px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 18px;
      i {
        font-size: 16px;
        margin-right: 4px;
      }
    }
  }
  .cs-packageBtn {
    text-align: right;
    padding-top: 4px;
    padding-bottom: 16px;
    .cs-button {
      border-color: #d8d8d8;
      height: 32px;
      line-height: 32px;
      padding: 0 9px;
      /deep/span {
        font-family: Muli-Regular_Light, Muli;
        font-weight: normal;
      }
    }
  }
}
.cs-cutTimeDown {
  position: fixed;
  right: 16px;
  bottom: 63px;
}
.cs-orderBtns {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  background: #ffffff;
  padding: 9px 16px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px -2px 20px 0px rgba(0, 0, 0, 0.05);
  .cs-button {
    padding: 0 24px;
    &:not(:first-child) {
      margin-left: 8px;
    }
  }
}
</style>
