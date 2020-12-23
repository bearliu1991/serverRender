<template>
  <client-only>
    <div class="cs-checkout-pc">
      <div class="cs-checkout-left">
        <header class="topbar">
          <i class="icon iconfont icontongyong-topbar-web-logo-black"></i>
        </header>
        <tab :step="step" @prev="onPrev" @onSubmit="onSubmit">
          <div v-show="step == 1" class="cs-checkout-container">
            <!-- 联系人 -->
            <contracts id="module_1" ref="contract" />
            <!-- ship Address -->
            <ship-address id="module_2" ref="ship" />
            <!-- shipMethod -->
            <ship-method id="module_3"></ship-method>
          </div>
          <!-- 支付  billAddress -->
          <div v-show="step == 2" class="cs-checkout-container">
            <!-- 已填写的物流信息 -->
            <delivery></delivery>
            <!-- payment 支付 -->
            <payment ref="payment" />
            <!-- shipMethod -->
            <bill-address ref="bill"></bill-address>
            <section class="cs-checkout-note">
              <p class="header-tit">ADD ORDER NOTE</p>
              <div class="cs-note">
                <textarea
                  v-model="orderParams.userRemark"
                  name="orderNote"
                  rows="5"
                  maxlength="300"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
            </section>
          </div>
        </tab>
      </div>
      <div class="cs-checkout-right">
        <order-summary ref="summary"></order-summary>
      </div>
    </div>
  </client-only>
</template>
<script>
import orderMixin from '../orderMixin'
export default {
  mixins: [orderMixin],
}
</script>
<style lang="scss" scoped>
.cs-checkout {
  height: 100%;
  &-pc {
    display: flex;
    .cs-payment-process {
      /deep/.cs-dialog-wrapper {
        width: 440px;
        height: 245px;
        padding: 40px 78px;
        p {
          font-size: 14px;
          font-family: Muli-Bold, Muli;
          font-weight: bold;
          color: #333333;
          line-height: 18px;
          text-align: center;
          &.sub {
            font-size: 12px;
            font-family: Muli-Regular_Light, Muli;
            font-weight: normal;
            line-height: 15px;
            padding: 10px 0;
          }
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
      padding: 60px 40px 41px 40px;
      i {
        font-size: 52px;
      }
    }
  }

  &-right {
    width: 46%;
    padding: 0 264px 0 60px;
    background: #fafafa;
  }
  &-note {
    margin-bottom: 20px;
    textarea {
      padding: 12px;
      width: 100%;
      border: 1px solid #d8d8d8;
      &::placeholder {
        color: #999;
        font-size: 14px;
        @include font($fontRegular);
        color: #999999;
        line-height: 18px;
      }
      &:focus {
        border: 1px solid #333;
      }
    }
  }

  // 全局通用的
  /deep/ &-container {
    .header-tit {
      font-size: 18px;
      line-height: 23px;
      @include font($fontMuliBold);
      color: #333333;
      letter-spacing: 1px;
      margin-bottom: 16px;
      & + .header-sub {
        margin-top: 8px;
        margin-bottom: 16px;
        font-size: 12px;
      }
    }
  }
}
</style>
