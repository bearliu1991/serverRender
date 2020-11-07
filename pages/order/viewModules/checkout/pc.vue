<template>
  <div class="cs-checkout-pc">
    <div class="cs-checkout-left">
      <tab :step="step" @onStep="onStep">
        <div v-if="step == 1" class="cs-checkout-container">
          <!-- 联系人 -->
          <contracts />
          <!-- ship Address -->
          <ship-address />
          <!-- shipMethod -->
          <ship-method></ship-method>
        </div>
        <!-- 支付  billAddress -->
        <div v-else class="cs-checkout-container">
          <!-- 已填写的物流信息 -->
          <delivery></delivery>
          <!-- payment 支付 -->
          <payment />
          <!-- shipMethod -->
          <bill-address></bill-address>
        </div>
      </tab>
    </div>
    <div class="cs-checkout-right">
      <order-summary></order-summary>
    </div>
  </div>
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
}
</style>
