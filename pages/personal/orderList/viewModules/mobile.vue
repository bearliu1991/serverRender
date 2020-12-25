<template>
  <div class="cs-orderList">
    <header>
      <h1>MY ORDERS</h1>
    </header>
    <div class="cs-orderList_wrapper">
      <ul>
        <li
          v-for="(item, index) in orderList"
          :key="index"
          @click="toOrderDetail(item.orderNo)"
        >
          <header>
            <p class="cs-orderNo">{{ item.orderCornet }}</p>
            <p class="cs-time">
              {{ item.gmtCreate | dateFormat('dd/MM/yyyy') }}
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
                @click="handlerEvent(btn.event, item.orderNo)"
                >{{ btn.btnName }}</cup-button
              >
            </div>
            <cup-time-down
              v-if="item.state == 10"
              :times="item.orderExpireTime"
            ></cup-time-down>
          </div>
        </li>
      </ul>
      <div class="cs-pagination-content">
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
            width: 85px;
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
      }
    }
    /deep/.el-pagination--small {
      padding-top: 13px;
      padding-bottom: 40px;
      text-align: center;
      background: #fff;
      .btn-prev {
        padding: 0;
        margin-right: 20px;
        min-width: auto;
        .el-icon {
          font-size: 14px;
        }
      }
      .btn-next {
        padding: 0;
        margin: 0;
        min-width: auto;
        .el-icon {
          font-size: 14px;
        }
      }
      .number {
        padding: 0;
        min-width: auto;
        @include font($fontRegular);
        color: #999999;
        margin-right: 20px;
        &.active {
          @include font($fontMuliBold);
          color: #333333;
        }
      }
    }
    .cs-pagination-content {
      ::v-deep .number {
        font-size: 14px;
        @include font($fontRegular);
        color: #999999;
      }
      ::v-deep .active {
        color: #333;
      }
    }
  }
}
</style>
