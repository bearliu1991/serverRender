<template>
  <div class="cs-delivery">
    <div class="cs-delivery-flex">
      <label>Contact</label>
      <p>{{ orderParams.cust.email }}</p>
      <i class="icon iconfont icon12-bianji" @click="prev(1)"></i>
    </div>
    <div v-if="orderParams.shipAddress" class="cs-delivery-flex">
      <label>Ship to</label>
      <p>
        {{ orderParams.shipAddress.addressFirst }},

        <template v-if="orderParams.shipAddress.addressSecond">
          {{ orderParams.shipAddress.addressSecond }},
        </template>
        {{ orderParams.shipAddress.city }},
        <template v-if="orderParams.shipAddress.stateName">
          {{ orderParams.shipAddress.stateName }},
        </template>
        {{ orderParams.shipAddress.postcode }},
        {{ orderParams.shipAddress.country }}
      </p>
      <i class="icon iconfont icon12-bianji" @click="prev(2)"></i>
    </div>
    <div v-if="orderParams.delivery" class="cs-delivery-flex">
      <label>Method</label>
      <p>
        {{ orderParams.deliverInfo.transportName }}
        <span v-if="orderParams.deliverInfo.tips"
          >（{{ orderParams.deliverInfo.tips }}）</span
        >·
        {{ orderParams.deliverInfo.actualFreight | formatCurrency }}
      </p>
      <i class="icon iconfont icon12-bianji" @click="prev(3)"></i>
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
    prev(moduleId) {
      this.$parent.prev(moduleId)
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
      word-break: break-all;
      // span {
      //   color: #999999;
      // }
    }
    i {
      color: #333;
      font-size: 13px;
    }
    &:last-child {
      border-bottom: 0;
    }
  }
  // 兼容移动
  &.mobile {
    margin: 0 16px 40px 16px;
    .cs-delivery-flex {
      flex-direction: column;
      position: relative;
      font-size: 12px;
      p {
        margin-left: 0;
        margin-top: 4px;
      }
      i {
        position: absolute;
        top: 18px;
        right: 18px;
      }
    }
  }
}
</style>
