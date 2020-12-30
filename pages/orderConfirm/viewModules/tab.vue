<template>
  <div class="cs-tab">
    <ul class="tab">
      <li :class="currentStep == 1 ? 'active' : ''" @click="prev(1)">
        <i class="icon-step1 step"></i>
        <span>Delivery</span>
      </li>
      <li :class="currentStep == 2 ? 'active' : ''">
        <em class="icon iconfont icon12-jiantou-shangla"></em>
        <i class="icon-step2 step"></i>
        <span>Payment</span>
      </li>
    </ul>
    <div class="tab-wrap">
      <slot></slot>
    </div>
    <template v-if="$store.state.terminal == 'pc'">
      <div class="tab-bottom">
        <i class="icon iconfont icon12-jiantou-shangla"></i>
        <p @click="goBack">Return to bag</p>
        <cup-button type="primary" :disabled="isDisabled" @click="submit"
          >CONTINUE TO PAYMENT</cup-button
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
    </template>
    <template v-else>
      <div class="tab-bottom">
        <i class="icon iconfont icon12-jiantou-shangla"></i>
        <p @click="goBack">Return to bag</p>
      </div>
      <div class="policy">
        <ul>
          <li>Refund policy</li>
          <li>Shipping policy</li>
          <li>Privacy policy</li>
        </ul>
        <ul>
          <li>Terms of service</li>
        </ul>
      </div>
      <div class="tab-btn">
        <p>
          TOTAL
          <strong>{{ orderSummary.orderPrice.total | formatCurrency }}</strong>
        </p>
        <cup-button type="primary" :disabled="isDisabled" @click="submit"
          >CONTINUE TO PAYMENT</cup-button
        >
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    step: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      currentStep: 1,
    }
  },
  computed: {
    isDisabled() {
      const { currentStep, orderParams, payment } = this
      if (
        (currentStep === 1 && orderParams.delivery.shipId === '') ||
        orderParams.isSubmit ||
        (currentStep === 2 && !payment.paymentType)
      ) {
        return true
      }
      return false
    },
  },
  inject: ['orderParams', 'orderSummary', 'payment'],
  watch: {
    step(val) {
      this.currentStep = val
    },
  },
  created() {
    this.currentStep = this.step
  },
  methods: {
    // moduleId  1 2 3模块Id  用户  shipAddress  shipMethod
    prev(moduleId) {
      if (this.currentStep === 1) {
        return false
      }
      this.$emit('prev', this.currentStep - 1, moduleId)
    },
    submit() {
      this.$emit('onSubmit', this.currentStep)
    },
    goBack() {
      const terminal = this.$store.state.terminal
      if (terminal === 'pc') {
        this.$router.push('/cart')
      } else {
        this.$router.go('-1')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-tab {
  padding: 0 40px;
  ul.tab {
    display: flex;
    margin-bottom: 52px;
    li {
      display: flex;
      align-items: center;
    }
  }
  i {
    font-size: 20px;
    margin-right: 4px;
    height: auto;
  }
  span {
    font-size: 18px;
    color: #999999;
    line-height: 23px;
  }
  .step {
    width: 20px;
    height: 20px;
    background-size: contain;
  }
  .icon-step1 {
    @include icon-image('icon_step1');
  }
  .icon-step2 {
    @include icon-image('icon_step2');
  }
  .active {
    span {
      color: #333333;
    }
    .icon-step1 {
      @include icon-image('icon_step1_active');
    }
    .icon-step2 {
      @include icon-image('icon_step2_active');
    }
  }
  .icon12-jiantou-shangla {
    transform: rotate(90deg);
    display: inline-block;
    font-size: 14px;
    margin-left: 10px;
    margin-right: 10px;
    color: #999;
  }

  .tab-bottom {
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    i {
      font-size: 12px;
      transform: rotate(-90deg);
      color: #333;
      margin-left: 0;
    }
    p {
      flex: 1;

      font-size: 14px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 18px;
      margin-left: 3px;
    }
    .cs-button {
      min-width: 180px;
    }
  }
  footer ul {
    display: flex;
    padding: 60px 0 24px 0;
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
  // 兼容移动
  &.mobile {
    margin-top: 25px;
    padding: 0;
    ul {
      margin-bottom: 24px;
      padding: 0 16px;
    }
    .step {
      width: 14px;
      background-size: contain;
      height: 14px;
    }
    span {
      font-size: 12px;
      line-height: 15px;
    }
    .tab-bottom {
      padding: 24px 16px;
      margin-bottom: 0;
    }
    .policy {
      padding: 24px 16px;
      background: #fafafa;
      ul {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #333333;
        line-height: 24px;
        margin-bottom: 8px;
        text-decoration: underline;
      }
    }
    .tab-btn {
      padding: 0 16px;
      p {
        padding: 16px 0;
        text-align: center;
        font-size: 14px;
        font-family: Muli-Bold, Muli;
        font-weight: bold;
        color: #333333;
        line-height: 18px;
        strong {
          font-size: 18px;
          line-height: 23px;
        }
      }
      .cs-button {
        width: 100%;
        margin-bottom: 24px;
      }
    }
  }
}
</style>
