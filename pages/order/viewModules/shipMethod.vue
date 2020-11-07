<template>
  <div class="cs-shipMethod">
    <p class="header-tit">SHIPPING METHODS</p>
    <div class="cs-shipMethod-empty">
      <p>Please enter the address before selecting the shipping method</p>
    </div>
    <div class="cs-shipMethod-container">
      <cup-radio-group v-model="method">
        <cup-radio label="这是1">
          <span>888</span>
          <span style="float: right">88888</span>
        </cup-radio>
        <cup-radio label="这是2">这是2的值</cup-radio>
      </cup-radio-group>
    </div>
    <div class="cs-fail-msg">
      <p>
        Your bag has been modified and the shipping rate you previously selected
        no longer applies. Please select a new rate.
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      method: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.cs-shipMethod {
  margin-bottom: 40px;
  .header-tit {
    font-size: 18px;
    font-family: Muli-Regular_Bold, Muli;
    font-weight: normal;
    color: #333333;
    line-height: 23px;
    letter-spacing: 1px;
    margin-bottom: 16px;
  }
  &-container {
    border: 1px solid #d8d8d8;
  }
  .cs-radio {
    height: 44px;
    padding: 0 12px 0 8px;
    border-bottom: 1px solid #d8d8d8;
    margin-bottom: 0;
    &:last-child {
      border-bottom: 0;
    }
    &-text {
      width: 100%;
      overflow: hidden;
    }
  }
  .cs-fail-msg {
    margin-top: 16px;
  }
}
</style>
