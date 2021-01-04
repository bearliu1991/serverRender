<template>
  <client-only>
    <div class="cs-checkout-m">
      <order-summary ref="summary"></order-summary>
      <tab :step="step" class="mobile" @prev="onPrev" @onSubmit="onSubmit">
        <div v-show="step == 1" class="cs-checkout-container">
          <!-- 联系人 -->
          <contracts id="module_1" ref="contract" class="mobile" />
          <div class="line"></div>
          <!-- ship Address -->
          <ship-address id="module_2" ref="ship" class="mobile" />
          <div class="line"></div>
          <!-- shipMethod -->
          <ship-method
            id="module_3"
            class="mobile"
            ref="shipMethod"
          ></ship-method>
        </div>
        <!-- 支付  billAddress -->
        <div v-show="step == 2" class="cs-checkout-container">
          <!-- 已填写的物流信息 -->
          <delivery class="mobile" ref="delivery"></delivery>
          <div class="line"></div>
          <div class="cs-coupon-m">
            <p class="header-tit">GIFT CARD OR DISCOUNT CODE</p>
            <coupon class="mobile"></coupon>
          </div>
          <div class="line"></div>
          <!-- payment 支付 -->
          <payment ref="payment" class="mobile" />
          <div class="line"></div>
          <!-- shipMethod -->
          <bill-address ref="bill" class="mobile"></bill-address>
          <div class="line"></div>
          <section class="cs-checkout-note mobile">
            <p class="header-tit">ADD ORDER NOTE</p>
            <div
              :class="[
                'cs-note',
                {
                  'is-focus': isFocus,
                },
              ]"
            >
              <textarea
                v-model="orderParams.userRemark"
                name="orderNote"
                rows="5"
                maxlength="300"
                @focus="isFocus = true"
                @blur="isFocus = false"
                placeholder="How can we help you?"
              ></textarea>
              <p class="limitWord">{{ orderParams.userRemark.length }}/300</p>
            </div>
          </section>
        </div>
      </tab>
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
  &-note {
    position: relative;
    margin: 24px 16px 16px 16px;

    .cs-note {
      border: 1px solid #d8d8d8;
      &.is-focus {
        border: 1px solid #000;
      }
    }
    textarea {
      padding: 12px;
      width: 100%;
      border: none;
      height: 64px;
      font-size: 12px;
      border: none;
      outline: none;
      resize: none;
      &::placeholder {
        color: #999;
        font-size: 12px;
        @include font($fontRegular);
        color: #999999;
        line-height: 18px;
      }
      // &:focus {
      //   border: none;
      //   outline: none;
      //   resize: none;
      // }
    }
    .limitWord {
      text-align: right;
      margin-right: 8px;
      margin-bottom: 8px;
      font-size: 12px;
      color: #999999;
    }
  }
  .cs-tab {
    margin-top: 25px;
  }
  &-container {
    .cs-coupon-m {
      margin: 24px 16px;
      .cs-giftCard.mobile {
        padding: 0;
      }
    }
    .line {
      height: 12px;
      background: #fafafa;
    }
    /deep/ .header-tit {
      font-size: 14px;
      line-height: 18px;
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
