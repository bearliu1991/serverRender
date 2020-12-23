<template>
  <div class="cs-shipAddress">
    <p class="header-tit">SHIPPING ADDRESS</p>

    <div class="cs-shipAddress-container">
      <address-form ref="address" type="ship" class="mobile" />
      <div
        v-if="!this.$cookies.get('token') || isShow"
        class="cs-shipAddress-check"
      >
        <cup-checkbox v-model="orderParams.cust.saveAddress" :label="true">
          <p>Save this information for next time</p>
        </cup-checkbox>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ['orderParams'],
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    show(val) {
      this.isShow = val
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-shipAddress {
  margin-bottom: 40px;
  &-check {
    .cs-checkbox {
      margin-bottom: 0;
    }
    display: flex;
    align-items: center;

    font-size: 12px;
    color: #333333;
  }
}
.mobile {
  .cs-shipAddress {
    padding: 24px 16px 26px 16px;
    margin-bottom: 0;
  }
}
</style>
