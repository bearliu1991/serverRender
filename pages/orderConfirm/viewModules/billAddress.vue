<template>
  <div class="cs-billAddress">
    <p class="header-tit">Billing ADDRESS</p>
    <p class="header-sub">
      Select the address that matches your card or payment method
    </p>
    <div class="cs-billAddress-container">
      <cup-radio-group v-model="orderParams.sameShip">
        <cup-radio :label="1">
          <span>Same as shipping address</span>
        </cup-radio>

        <cup-radio :label="2">
          <span> Use a different billing address </span>
        </cup-radio>
        <div v-if="orderParams.sameShip == 2" class="cs-billAddress-form">
          <address-form ref="address" type="bill" />
        </div>
      </cup-radio-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // sameShip: 1,
    }
  },
  inject: ['orderParams'],
}
</script>
<style lang="scss" scoped>
.cs-billAddress {
  margin-bottom: 40px;
  .header-tit {
    font-size: 18px;
    font-family: Muli-Regular_Bold, Muli;
    font-weight: normal;
    color: #333333;
    line-height: 23px;
    letter-spacing: 1px;
    margin-bottom: 9px;
  }
  .header-sub {
    font-size: 14px;
    font-family: Muli-Regular_Light, Muli;
    font-weight: normal;
    color: #333333;
    line-height: 18px;
    margin-bottom: 16px;
  }
  &-form {
    padding: 16px;
    font-size: 0;
    background: #fafafa;
  }
}
.cs-checkboxgroup {
  border: 1px solid #d8d8d8;
  .cs-radio {
    padding: 12px;
    border-bottom: 1px solid #d8d8d8;
    height: 44px;
    margin-bottom: 0;
    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>
