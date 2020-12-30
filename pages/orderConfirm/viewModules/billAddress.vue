<template>
  <div class="cs-billAddress">
    <p class="header-tit">BILLING ADDRESS</p>
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
  inject: ['orderParams'],
}
</script>
<style lang="scss" scoped>
.cs-billAddress {
  margin-bottom: 40px;
  &-form {
    padding: 16px;
    font-size: 0;
    background: #fafafa;
    /deep/.cs-select {
      background: #fff;
    }
  }
  &.mobile {
    margin-bottom: 0;
    padding: 24px 16px;
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
