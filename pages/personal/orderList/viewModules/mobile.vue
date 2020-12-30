<template>
  <div class="cs-orderList">
    <header>
      <h1>MY ORDERS</h1>
    </header>
    <div v-if="orderList.length > 0" class="cs-orderList_wrapper">
      <ul>
        <li
          v-for="(item, index) in orderList"
          :key="index"
          @click="toOrderDetail(item.orderNo)"
        >
          <header>
            <p class="cs-orderNo">{{ item.orderCornet }}</p>
            <p class="cs-time">
              <span
                >{{ item.gmtCreate | dateFormat('dd/MM/yyyy') }}
                {{ getHoursTip(item.gmtCreate) }}</span
              >
            </p>
          </header>
          <div class="cs-info">
            <!-- 拆包 -->
            <template v-if="item.packageList">
              <p class="cs-orderStatus">
                <label>Order status</label>
              </p>
              <p
                v-for="subItem in item.packageList"
                :key="subItem.packageNo"
                class="cs-orderStatus cs-package"
              >
                <label>
                  <i class="icon iconfont iconwap-14-baoguo"></i>
                  <span class="semiBold">{{ subItem.packageName }}</span>
                </label>
                <span class="semiBold">{{ subItem.stateDesp }}</span>
              </p>
            </template>
            <!-- 订单状态 -->
            <template v-else>
              <p class="cs-orderStatus">
                <label>Order status</label>
                <span class="semiBold">{{ item.stateDesp }}</span>
              </p>
            </template>

            <p class="cs-orderTotal">
              <label>Order total</label>
              <span class="muliBold">{{ item.total | formatCurrency }}</span>
            </p>
            <div class="cs-btns">
              <label></label>
              <cup-button
                v-for="(btn, subIndex) in getButtons(item.state)"
                :key="subIndex"
                :type="btn.type"
                @click="handlerEvent(btn.event, item.orderNo, item.paymentType)"
                >{{ btn.btnName }}</cup-button
              >
            </div>
            <div class="cs-timeDown">
              <cup-time-down
                v-if="item.state == 10"
                :times="item.orderExpireTime"
              ></cup-time-down>
            </div>
          </div>
        </li>
      </ul>
      <div class="cs-pagination">
        <el-pagination
          small
          layout="prev, pager, next"
          :total="totals"
          :current-page.sync="pageNum"
          :page-size="10"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <cup-empty v-else class="icon-empty">
      <p>YOU HAVEN'T PLACED ANY ORDERS YET</p>
    </cup-empty>
    <!-- 取消原因 -->
    <cup-popup
      v-model="isCancel"
      class="cs-reasons"
      :size="'85%'"
      title="CANCEL REASON"
    >
      <cup-radio-group v-model="reasonId">
        <cup-radio
          v-for="(item, index) in reasonList"
          :key="index"
          :label="item"
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
      <cup-button slot="button" type="primary" block @click="toCancelOrder"
        >SUBMIT</cup-button
      >
    </cup-popup>
    <cup-popup
      v-model="isCreditCard"
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
      <cup-button slot="button" type="primary" block @click="toPay"
        >COMPLETE PAYMENT</cup-button
      >
    </cup-popup>

    <!-- 已取消的订单加入购物车 -->
    <small-cart ref="smallCart"></small-cart>
  </div>
</template>
<script>
import myOrderMixin from '../../myOrderMixin'
export default {
  mixins: [myOrderMixin],
  mounted() {
    this.queryOrderList()
  },
  methods: {
    getHoursTip(date) {
      let hoursTip = ''
      const hoursTipDate = new Date(date)
      console.log('hoursTipDate.getHours() ', hoursTipDate.getHours())
      if (hoursTipDate.getHours() >= 0 && hoursTipDate.getHours() < 12) {
        hoursTip = 'AM'
      } else if (
        hoursTipDate.getHours() >= 12 &&
        hoursTipDate.getHours() <= 24
      ) {
        hoursTip = 'PM'
      }
      return hoursTip
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-orderList {
  header {
    background: #fff;
    padding-bottom: 16px;
    padding-top: 40px;
    h1 {
      font-size: 18px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 23px;
      letter-spacing: 1px;
      text-align: center;
    }
  }
  &_wrapper {
    background: #fafafa;
    ul {
      li {
        background-color: #fff;
        margin-bottom: 8px;
        padding: 0 16px;
        &:last-child {
          margin-bottom: 0;
        }
        header {
          padding-top: 16px;
          padding-bottom: 8px;
          display: flex;
          .cs-orderNo {
            flex: 1;
            font-size: 14px;
            font-family: Muli-Bold, Muli;
            font-weight: bold;
            color: #333333;
            line-height: 18px;
          }
          .cs-time {
            width: 120px;
            height: 25px;
            background: #fafafa;
            line-height: 25px;
            color: #666666;
            text-align: center;
          }
        }
        .cs-info {
          padding-top: 12px;
          p {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;

            .muliBold {
              @include font($fontMuliBold);
            }
            &:not(:last-child) {
              padding-bottom: 12px;
            }
            &.cs-package {
              i {
                font-size: 14px;
                margin-right: 8px;
              }
              &:last-child {
                margin-bottom: 16px;
              }
            }
          }
          .cs-btns {
            font-size: 14px;
            text-align: right;
            padding: 16px 0;
            .cs-button {
              height: 32px;
              min-width: 100px;
              padding: 8px 16px;
              margin-left: 8px;
              font-size: 12px;
              line-height: 15px;
              border-color: #d8d8d8;
              /deep/span {
                font-family: Muli-Regular_Light, Muli;
                font-weight: normal;
              }
            }
          }
        }
        .cs-timeDown {
          text-align: right;
          margin-top: -16px;
        }
      }
    }
  }
}
// 取消原因
.cs-reasons {
  .el-drawer__body {
    margin-bottom: 70px;
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
  .cs-radio {
    height: 60px;
    border-bottom: 1px solid #f7f7f7;
    padding: 0 16px;
    margin-bottom: 0;
  }
  .cs-submit {
    position: absolute;
    bottom: 0;
    right: 16px;
    left: 16px;
    padding: 10px 0;
  }
}
/deep/.cs-empty {
  margin-top: 60px;
  i {
    margin-bottom: 20px;
  }
}
// 支付方式
.cs-payment {
  &_wrapper {
    /deep/.el-drawer__body {
      background: #fafafa;
    }
    header {
      background: #fff;
      height: 60px;
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
  }
}
</style>
