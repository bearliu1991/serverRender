<template>
  <div class="cs-shipAddress">
    <p class="header-tit">SHIPPING ADDRESS</p>

    <div class="cs-shipAddress-container">
      <address-form ref="address" type="ship" />
      <div v-if="isLogin" class="cs-shipAddress-check">
        <cup-checkbox v-model="orderParams.cust.saveAddress" :label="true" />
        <p>Save this information for next time</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  inject: ['orderParams'],
  computed: mapState([
    // 映射 this.count 为 store.state.count
    'isLogin',
    'loginInfo',
  ]),
}
</script>
<style lang="scss" scoped>
.cs-shipAddress {
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
  &-check {
    .cs-checkbox {
      margin-bottom: 0;
    }
    display: flex;
    align-items: center;

    font-size: 12px;
    font-family: Muli-Regular_Light, Muli;
    font-weight: normal;
    color: #333333;
  }
}
</style>
