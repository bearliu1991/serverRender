<template>
  <div class="cs-delivery">
    <section>
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
      <div
        v-if="cookieDeliveryed"
        :class="[
          'cs-delivery-flex',
          {
            'is-error': isChange,
          },
        ]"
      >
        <label>Method</label>
        <p>
          {{ cookieDeliveryed.transportName }}
          <span v-if="cookieDeliveryed.tips"
            >（{{ cookieDeliveryed.tips }}）</span
          >·
          {{ cookieDeliveryed.actualFreight | formatCurrency }}
        </p>
        <i class="icon iconfont icon12-bianji" @click="prev(3)"></i>
      </div>
    </section>
    <p class="cs-error" v-if="isChange">
      Your order has been modified and the shipping rate you previously selected
      no longer applies. Please select a new rate.
    </p>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isChange: false,
    }
  },
  computed: mapState(['cookieDeliveryed']),
  inject: ['orderParams'],
  watch: {
    'orderParams.deliverInfo': {
      handler(val, oldVal) {
        this.compareDelivey()
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.compareDelivey()
  },
  methods: {
    prev(moduleId) {
      this.$parent.prev(moduleId)
    },
    compareDelivey() {
      const {
        isEmpty,
        cookieDeliveryed,
        orderParams: { deliverInfo },
      } = this

      if (isEmpty(deliverInfo)) {
        this.isChange = true
      } else {
        if (
          deliverInfo.transportId !== cookieDeliveryed.transportId ||
          deliverInfo.actualFreight !== cookieDeliveryed.actualFreight
        ) {
          this.isChange = true
        } else {
          this.isChange = false
        }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-error {
  font-size: 12px;
  font-family: Muli-Regular_Light, Muli;
  font-weight: normal;
  color: #e61717;
  line-height: 15px;
}
.cs-delivery {
  margin-bottom: 40px;
  section {
    border: 1px solid #d8d8d8;
  }
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
    &.is-error {
      border: 1px solid #e61717;
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
