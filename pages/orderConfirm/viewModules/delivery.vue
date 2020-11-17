<template>
  <div class="cs-delivery">
    <div class="cs-delivery-flex">
      <label>Contact</label>
      <p>{{ orderParams.cust.email }}</p>
      <i class="icon iconfont iconicon-web-14-wangyelianjie" @click="prev"></i>
    </div>
    <div v-if="orderParams.shipAddress" class="cs-delivery-flex">
      <label>Ship to</label>
      <p>
        {{ orderParams.shipAddress.addressFirst }},
        {{ orderParams.shipAddress.addressSecond }},
        {{ orderParams.shipAddress.city }},
        {{ orderParams.shipAddress.province }},
        {{ orderParams.shipAddress.postcode }},
        {{ orderParams.shipAddress.country }},
      </p>
      <i class="icon iconfont iconicon-web-14-wangyelianjie"></i>
    </div>
    <div v-if="orderParams.delivery" class="cs-delivery-flex">
      <label>Method</label>
      <p>
        {{ orderParams.delivery.transportName }} ·
        {{ orderParams.delivery.actualFreight | formatCurrency }}
      </p>
      <i class="icon iconfont iconicon-web-14-wangyelianjie"></i>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  inject: ['orderParams'],
  methods: {
    prev() {
      this.$parent.prev()
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-delivery {
  margin-bottom: 40px;
  border: 1px solid #d8d8d8;
  &-flex {
    display: flex;
    padding: 12px;
    border-bottom: 1px solid #d8d8d8;
    font-size: 14px;
    color: #999999;
    p {
      flex: 1;
      margin-left: 16px;
      color: #333333;
      margin-right: 58px;
    }
    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>
