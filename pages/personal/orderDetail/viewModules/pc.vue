<template>
  <div v-if="orderInfo" class="cs-detail">
    <div class="cs-back" @click="$router.go(-1)">
      <i class="icon iconfont iconicon-web-14-jiantou-fenyezuojiannormal"></i>
      <p>Back to My orders</p>
    </div>
    <section class="cs-detailWrapper">
      <div class="cs-detail-layout">
        <div class="cs-detail-left">
          <!-- 非拆单 -->
          <div v-if="!orderInfo.needSplitPackage" class="cs-orderStatus">
            <div
              class="box-vc"
              style="flex-direction: column; align-items: start"
            >
              <p class="tit">ORDER STATUS: {{ orderInfo.stateDesp }}</p>
              <!-- 支付处理中 -->
              <p
                v-if="orderInfo.state == 20"
                class="tips"
                style="margin-top: 0"
              >
                It may take a few minutes to confirm your payment.
              </p>
              <!-- 已发货 -->
              <p
                v-else-if="
                  (orderInfo.state == 40 || orderInfo.state == 50) &&
                  orderInfo.packageList[0].shippingNo
                "
                class="semiBold"
              >
                TRACKING NUMBER:<em class="cs-link">{{
                  orderInfo.packageList[0].shippingNo
                }}</em
                ><i class="icon iconfont iconwap-14-copy"></i>
              </p>
            </div>
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
                @click="
                  handlerEvent(
                    btn.event,
                    orderInfo.orderNo,
                    orderInfo.payment.paymentType
                  )
                "
                >{{ btn.btnName }}</cup-button
              >
            </div>
            <div class="cs-timeDown">
              <cup-time-down
                v-if="orderInfo.state == 10"
                class="bottom"
                :times="orderInfo.orderExpireTime"
                @clear="refresh()"
                >Remaining Payment Time</cup-time-down
              >
            </div>
          </div>
          <div v-else class="cs-orderStatus mart50">
            <p class="tit">ORDER STATUS</p>
          </div>
          <!-- 显示订单编号 -->
          <div class="cs-orderNo">
            <p>
              <label>ORDER:</label>
              <span class="semiBold">{{ orderInfo.orderCornet }}</span>
              <i
                class="icon iconfont iconwap-14-copy"
                @click="executeClipboard"
              ></i>
            </p>
            <p class="time">
              {{
                orderInfo.gmtCreate | dateFormat('dd / MM / yyyy hh:mm', true)
              }}
            </p>
          </div>
          <!-- 展示商品区 -->
          <table v-if="!orderInfo.needSplitPackage">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(product, index) in orderInfo.packageList[0].productList"
                :key="index"
              >
                <td>
                  <cup-product-item :product="product"> </cup-product-item>
                </td>
                <td>
                  <p class="p-price">
                    <strong>{{ product.price | formatCurrency }}</strong>
                  </p>
                </td>
                <td>
                  <p class="p-quanity">X {{ product.quantity }}</p>
                </td>
                <td>
                  <p>
                    <strong>{{
                      (product.price * product.quantity) | formatCurrency
                    }}</strong>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- 拆包商品区 -->
          <div v-else class="cs-package">
            <div
              v-for="(packageItem, index) in orderInfo.packageList"
              :key="index"
              class="cs-packageItem"
            >
              <!-- 拆包展示商品 -->
              <table>
                <thead>
                  <tr>
                    <th>
                      <!-- 拆包状态 -->
                      <div class="cs-orderStatus">
                        <p>
                          <i class="icon iconfont iconwap-14-baoguo"></i>
                          <span class="cs-upper">
                            {{ packageItem.packageName }}:
                            {{ packageItem.stateDesp }}
                          </span>
                        </p>
                        <p
                          v-if="
                            (packageItem.state == 40 ||
                              packageItem.state == 50) &&
                            packageItem.shippingNo
                          "
                          class="tips"
                        >
                          Tracking Number:<em class="cs-link">{{
                            packageItem.shippingNo
                          }}</em
                          ><i class="icon iconfont iconwap-14-copy"></i>
                        </p>
                      </div>
                    </th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="product in packageItem.productList"
                    :key="product.skuId"
                    :product="product"
                  >
                    <td>
                      <cup-product-item :product="product"> </cup-product-item>
                    </td>
                    <td>
                      <p class="p-price">
                        <strong>{{ product.price | formatCurrency }}</strong>
                      </p>
                    </td>
                    <td>
                      <p class="p-quanity">X {{ product.quantity }}</p>
                    </td>
                    <td>
                      <p>
                        <strong>{{
                          (product.price * product.quantity) | formatCurrency
                        }}</strong>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- 每个包裹的订单按钮 -->
              <div
                v-if="getButtons(packageItem.state).length"
                class="cs-packageBtn"
              >
                <cup-button
                  v-for="(btn, subIndex) in getButtons(packageItem.state)"
                  :key="subIndex"
                  class="cs-upper"
                  :type="btn.type || 'plain'"
                  @click="
                    handlerEvent(
                      btn.event,
                      orderInfo.orderNo,
                      orderInfo.payment.paymentType
                    )
                  "
                  >{{ btn.btnName }}</cup-button
                >
              </div>
            </div>
          </div>

          <!-- 价格 -->

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
              <label> Discount </label>
              <div class="card-selected">
                <div
                  class="card-buttons"
                  v-for="(dis, disIndex) in orderInfo.discounts"
                  :key="disIndex"
                >
                  <template v-if="dis.category == 1">
                    <i :class="['icon iconfont', 'iconwap-14-lipinka']"></i>

                    <span
                      >....{{
                        dis.code.substring(dis.code.length - 4, dis.code.length)
                      }}</span
                    >
                  </template>
                  <template v-else>
                    <i class="icon iconfont iconwap-14-zhekou"></i>
                    <span>{{ dis.code }}</span>
                  </template>
                </div>
                <!-- <div class="card-buttons">
                  <i class="icon iconfont iconwap-14-zhekou"></i>
                  <span>555</span>
                </div> -->
              </div>
              <p class="cs-red">
                -{{ orderInfo.payment.discount | formatCurrency }}
              </p>
            </li>
            <li>
              <label
                >Shipping
                <em v-if="orderInfo.delivery.transportName"
                  >( {{ orderInfo.delivery.transportName }} )</em
                >
              </label>
              <p v-if="orderInfo.delivery.actualFreight">
                {{ orderInfo.delivery.actualFreight | formatCurrency }}
              </p>
              <p v-else>Calculated after selection</p>
            </li>
          </ul>
          <ul>
            <li>
              <label class="bold"
                >TOTAL
                <em
                  v-if="
                    orderInfo.payment.gstTax > 0 &&
                    orderInfo.shipAddress.country == 'Australia'
                  "
                  >( Including
                  {{ orderInfo.payment.gstTax | formatCurrency }} in taxes )</em
                >
              </label>
              <p class="font18">
                <strong>{{ orderInfo.payment.total | formatCurrency }}</strong>
              </p>
            </li>
            <li v-if="orderInfo.state == 40">
              <label>Refunded Amount </label>
              <p class="cs-orange">
                {{ orderInfo.refundAmount | formatCurrency }}
              </p>
            </li>
          </ul>
        </div>
        <div class="cs-detail-right">
          <div class="detail-box">
            <p class="box-title">CUSTOMER INFORMATION</p>
            <div class="box-container">
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
    <!-- 编辑地址 -->
    <cup-dialog
      v-if="isEditAddress"
      :visible.sync="isEditAddress"
      class="cs-editAddress"
      title="EDIT SHIP ADDRESS"
    >
      <cup-address-form
        ref="address"
        class="mobile"
        is-edit
        source="order"
        :data="addressForm"
      ></cup-address-form>
      <cup-button slot="footer" type="primary" block @click="updateAddress"
        >SAVE</cup-button
      >
    </cup-dialog>
    <!-- 取消原因 -->
    <cup-dialog
      v-if="isCancel"
      :visible.sync="isCancel"
      class="cs-reasons"
      :size="'85%'"
      title="CANCEL REASON"
    >
      <cup-radio-group v-model="reasonId">
        <cup-radio
          v-for="(item, key, index) in reasonList"
          :key="index"
          :label="key"
        >
          {{ item }}
          <br />
          <textarea
            v-if="key == 6 && reasonId == key"
            v-model="reason"
            placeholder="Please enter the reason for canceling the order."
          ></textarea>
        </cup-radio>
      </cup-radio-group>
      <cup-button slot="footer" type="primary" block @click="toCancelOrder"
        >SUBMIT</cup-button
      >
    </cup-dialog>
    <!-- 支付弹框 -->
    <cup-dialog
      :visible.sync="isCreditCard"
      title="PAYMENT"
      class="cs-payment_wrapper"
    >
      <header>
        <label>Credit card</label>
        <p>
          <i class="icon_card-visa"></i>
          <i class="icon_card-master"></i>
          <i class="icon_card-amex"></i>
        </p>
      </header>
      <cup-credit-card ref="payment"></cup-credit-card>
      <cup-button slot="footer" type="primary" block @click="creditPayment"
        >COMPLETE PAYMENT</cup-button
      >
    </cup-dialog>

    <!-- 已取消的订单加入购物车 -->
    <small-cart ref="smallCart"></small-cart>
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
.cs-detail {
  padding: 0 284px;
  .font18 {
    font-size: 18px;
  }
  .cs-back {
    display: flex;
    padding: 40px 0;
    font-size: 14px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    i {
      margin-right: 3px;
    }
  }
  .cs-orderStatus {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 43px;
    position: relative;
    .tit {
      font-size: 24px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 30px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .tips {
      margin-top: 20px;
    }
    .cs-orderBtns {
      .cs-button {
        padding: 0 24px;
        &:not(:first-child) {
          margin-left: 8px;
        }
      }
    }
  }
  &-layout {
    display: flex;
    margin-bottom: 40px;
    .cs-red {
      color: #e61717 !important;
    }
  }
  &-left {
    flex: 1;
    .mart50 {
      margin-bottom: 50px;
    }
    // 拆包商品table
    .cs-package {
      .cs-packageItem {
        position: relative;
        padding-bottom: 30px;
        padding-top: 40px;
        border-bottom: 1px solid #f7f7f7;
        &:first-child {
          padding-top: 0;
        }
      }
      .cs-orderStatus {
        display: initial;
        margin-bottom: 0;
        p {
          display: flex;
          align-items: center;
          i {
            font-size: 16px;
            margin-right: 6px;
          }
          &.tips {
            margin-top: 7px;
            margin-bottom: 7px;
            i {
              margin-left: 2px;
            }
          }
        }
      }
      table {
        thead {
          th {
            padding-bottom: 0;
            border-bottom: 0;
          }
        }
        td {
          .cs-product2 {
            padding: 10px 0;
          }
        }
      }
      .cs-packageBtn {
        position: absolute;
        right: 0;
        bottom: 40px;
        .cs-button {
          height: 28px;
          line-height: 28px;
          min-width: 126px;
          padding: 0 9px;
          /deep/span {
            font-family: Muli-Regular_Light, Muli;
            font-weight: normal;
          }
        }
      }
    }
    table {
      max-height: 995px;
      overflow-y: auto;
      thead {
        font-size: 12px;
        font-family: Muli-Bold, Muli;
        font-weight: bold;
        letter-spacing: 1px;
        th {
          padding-bottom: 11px;
          border-bottom: 1px solid #f7f7f7;
        }
      }
      th,
      td {
        width: 20%;
        text-align: center;
        &:first-child {
          width: 40%;
          text-align: left;
        }
      }
      td {
        .cs-product2 {
          padding: 20px 0;
          margin-right: 68px;
        }
      }
    }
    ul {
      border-top: 1px solid #f7f7f7;
      padding: 20px 0;
      li {
        display: flex;
        font-size: 14px;
        align-items: center;
        label {
          em {
            color: #999;
            font-family: Muli-Regular_Light, Muli;
            font-weight: normal;
          }
        }
        p {
          flex: 1;
          text-align: right;
        }
        &:not(:last-child) {
          margin-bottom: 16px;
        }
        .bold {
          @include font($fontMuliBold);
        }
        .cs-orange {
          color: #ffab00;
          font-family: Muli-Bold, Muli;
          font-weight: bold;
        }
        // &.payment-discount {
        //   flex-direction: column;
        //   section {
        //     display: flex;
        //   }
        // }
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
    }
    .box-vc {
      display: flex;
      align-items: center;
    }
  }
  &-right {
    margin-top: 110px;
    width: 338px;
    margin-left: 80px;
    .detail-box {
      .box-title {
        font-size: 12px;
        font-family: Muli-Bold, Muli;
        font-weight: bold;
        color: #333333;
        line-height: 15px;
        letter-spacing: 1px;
        margin-bottom: 10px;
      }
      .box-container {
        padding: 30px;
        background: #fafafa;
        h1 {
          font-size: 12px;
          font-family: Muli-Bold, Muli;
          font-weight: bold;
          line-height: 15px;
          letter-spacing: 1px;
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
        p {
          margin-top: 10px;
          display: flex;
          align-items: center;
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
  }
  .cs-orderNo {
    height: 30px;
    line-height: 30px;
    background: #fafafa;
    font-size: 14px;
    font-family: Muli-Regular_SemiBold, Muli;
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    padding: 0 12px;
    i {
      margin-left: 6px;
    }
  }
}
.cs-timeDown {
  position: absolute;
  right: 0;
  top: -56px;
  .cs-cutTimeDown {
    margin-top: 0;
    &.bottom {
      position: relative;
      &::before {
        top: 44px;
      }
      &::after {
        top: 37px;
      }
    }
  }
}
.cs-reasons {
  .cs-radio {
    align-items: flex-start;
    padding: 10px 16px;
    border: 1px solid #f7f7f7;
    margin-bottom: 0;
    &:not(:last-child) {
      border-bottom: 0;
    }
    textarea {
      padding: 12px;
      margin-top: 15px;
      width: 312px;
      height: 88px;
      background: #ffffff;
      border: 1px solid #d8d8d8;
      &:focus {
        border: 1px solid #d8d8d8;
        outline: none;
      }
    }
  }
  .cs-button {
    margin: 15px 24px 0 24px;
  }
}
.cs-upper {
  text-transform: uppercase;
}
.cs-reasons,
.cs-payment_wrapper,
.cs-editAddress {
  /deep/.cs-dialog {
    &_title {
      text-align: center;
      font-size: 24px;
      line-height: normal;
      letter-spacing: 1px;
    }
    &_icon {
      position: absolute;
      top: 20px;
      right: 20px;
      line-height: normal;
      font-size: 14px;
    }
    &_body {
      margin-top: 30px;
    }
    &-wrapper {
      position: relative;
      width: 440px;
      padding: 40px 0;
    }
  }
}
.cs-editAddress {
  /deep/.cs-dialog {
    &-wrapper {
      position: relative;
      width: 744px;
      padding: 40px 0;
    }
  }
  .el-form {
    padding: 16px;
    margin-bottom: 64px;
  }
  .cs-button {
    margin: 0 24px 0 24px;
  }
}
.cs-payment {
  &-form {
    border: 1px solid #d8d8d8;
  }
  &_wrapper {
    header {
      height: 44px;
      background: #ffffff;
      border: 1px solid #d8d8d8;
      padding: 0 16px;
      display: flex;
      align-items: center;
      label {
        font-size: 14px;
        line-height: 18px;
        flex: 1;
      }
      i {
        width: 38px;
        height: 24px;
        margin-left: 8px;
      }
    }
    .cs-button {
      margin: 8px 24px 0 24px;
    }
  }
}
</style>
