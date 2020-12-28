<template>
  <div class="cs-order_list">
    <header>
      <p>My Orders</p>
    </header>
    <div class="cs-table_contaienr">
      <table>
        <thead>
          <tr>
            <th>ORDER</th>
            <th>DATE</th>
            <th>ORDER STATUS</th>
            <th>ORDER TOTAL</th>
            <th>OPERATION</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in orderList"
            :key="index"
            @click="toOrderDetail(item.orderNo)"
          >
            <td class="orderno">
              <em>{{ item.orderCornet }}</em>
            </td>
            <td class="time">
              <p>{{ item.gmtCreate | dateFormat('dd/MM/yyyy') }}</p>
            </td>
            <td class="status">
              <p>{{ item.stateDesp }}</p>
            </td>
            <td class="price">
              {{ item.total | formatCurrency }}
            </td>
            <td class="operate">
              <cup-button
                v-for="(btn, subIndex) in getButtons(item.state)"
                :key="subIndex"
                :type="btn.type || 'plain'"
                @click="handlerEvent(btn.event, item.orderNo)"
                >{{ btn.btnName }}</cup-button
              >
              <cup-time-down
                v-if="item.state == 10"
                class="left"
                :times="item.orderExpireTime"
              ></cup-time-down>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="cs-pagination">
        <el-pagination
          small
          layout="prev, pager, next"
          :total="totals"
          :current-page.sync="pageNum"
          :page-size="15"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 取消原因 -->
    <cup-dialog
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
      <cup-button slot="button" type="primary" block @click="toPay"
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
    this.queryOrderList()
  },
}
</script>
<style lang="scss" scoped>
.cs-order {
  &_list {
    header {
      margin-top: 60px;
      font-size: 30px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 38px;
      letter-spacing: 1px;
      margin-bottom: 40px;
    }
    table {
      font-size: 12px;
      color: #333333;
      line-height: 15px;
      letter-spacing: 1px;

      thead {
        background: #fafafa;
        font-family: Muli-Bold, Muli;
        font-weight: bold;
      }
      tbody {
        overflow-y: auto;
      }
      tr {
        height: 56px;
        line-height: 56px;
        border-bottom: 1px solid #f7f7f7;
        th,
        td {
          text-align: center;
          width: 15%;
          font-size: 14px;
          em {
            font-family: Muli-Bold, Muli;
            font-weight: bold;
          }
          &:last-child {
            width: 40%;
            text-align: right;
            padding-right: 30px;
          }
          &.operate {
            position: relative;

            /deep/.cs-button {
              height: 28px;
              line-height: 28px;
              padding: 0 10px;
              margin-left: 10px;
              &-primary {
                min-width: 126px;
              }
              span {
                font-weight: normal;
                font-family: Muli-Regular_Light, Muli;
              }
            }
            /deep/.cs-cutTimeDown {
              margin-top: 7px;
              position: absolute;
              top: 0;
              right: -109px;
            }
          }
        }
      }
    }
    .cs-pagination {
      padding: 45px 0 105px 0;
    }
  }
}
.cs-reasons {
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
</style>
