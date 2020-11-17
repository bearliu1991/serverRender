<template>
  <client-only>
    <div class="cs-checkout-pc">
      <div class="cs-checkout-left">
        <tab :step="step" @prev="onPrev" @onSubmit="onSubmit">
          <div v-show="step == 1" class="cs-checkout-container">
            <!-- 联系人 -->
            <contracts ref="contract" />
            <!-- ship Address -->
            <ship-address ref="ship" />
            <!-- shipMethod -->
            <ship-method></ship-method>
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
                  placeholder="How can we help you?"
                ></textarea>
              </div>
            </section>
          </div>
        </tab>
      </div>
      <div class="cs-checkout-right">
        <order-summary></order-summary>
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
  }
  &-left {
    background: #fff;
    width: 54%;
    height: 100%;
    padding: 0 56px 0 324px;
  }

  &-right {
    width: 46%;
    padding: 0 264px 0 60px;
    background: #fafafa;
  }
  &-note {
    margin-bottom: 20px;
    .header-tit {
      font-size: 18px;
      font-family: Muli-Regular_Bold, Muli;
      font-weight: normal;
      color: #333333;
      line-height: 23px;
      letter-spacing: 1px;
      margin-bottom: 17px;
    }
    textarea {
      padding: 12px;
      width: 100%;
      border: 1px solid #d8d8d8;
      &::placeholder {
        color: #999;
        font-size: 14px;
        font-family: Muli-Regular_Light, Muli;
        font-weight: normal;
        color: #999999;
        line-height: 18px;
      }
      &:focus {
        border: 1px solid #333;
      }
    }
  }
}
</style>
