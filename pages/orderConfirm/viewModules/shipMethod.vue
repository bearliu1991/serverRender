<template>
  <div class="cs-shipMethod">
    <p class="header-tit">SHIPPING METHODS</p>
    <!-- 没有地址 -->
    <div
      v-if="
        !orderParams.shipAddress ||
        !orderParams.shipAddress.countryId ||
        deliverList.length == 0
      "
      class="cs-shipMethod-empty"
    >
      <p>Please enter the address before selecting the shipping method</p>
    </div>
    <template v-else>
      <div class="cs-shipMethod-container">
        <cup-radio-group v-model="shipId">
          <cup-radio
            v-for="item in deliverList"
            :key="item.transportId"
            :label="item.transportId"
          >
            <span>{{ item.transportName }}</span>
            <span style="float: right">{{
              item.actualFreight | formatCurrency
            }}</span>
          </cup-radio>
        </cup-radio-group>
      </div>
      <div class="cs-fail-msg">
        <p>
          Your bag has been modified and the shipping rate you previously
          selected no longer applies. Please select a new rate.
        </p>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  inject: ['orderParams', 'orderSummary'],
  data() {
    return {
      deliverList: [],
      shipId: '',
    }
  },
  computed: {
    dataRange() {
      const { totalWeight, orderPrice } = this.orderSummary
      const { countryId, stateId } = this.orderParams.shipAddress
      return {
        countryId,
        stateId,
        totalWeight,
        total: orderPrice.total,
      }
    },
  },
  watch: {
    // 'orderParams.shipAddress.countryId': {
    //   handler(val) {
    //     this.queryDelivery()
    //   },
    //   immediate: true,
    // },
    // 'orderParams.shipAddress.stateId': {
    //   handler(val) {
    //     this.queryDelivery()
    //   },
    //   immediate: true,
    // },
    // 'orderSummary.totalWeight': {
    //   handler(val) {
    //     this.queryDelivery()
    //   },
    //   immediate: true,
    // },
    // 'orderSummary.orderPrice.total': {
    //   handler(val) {
    //     this.queryDelivery()
    //   },
    // },
    dataRange: {
      handler(val) {
        this.queryDelivery()
      },
      immediate: true,
    },
    shipId(val) {
      this.orderParams.delivery = this.deliverList.find((item) => {
        return item.transportId === val
      })
    },
  },
  methods: {
    async queryDelivery() {
      const { orderParams, orderSummary } = this
      const { countryId, stateId } = orderParams.shipAddress
      const {
        totalPrice,
        // orderPrice: { total },
      } = orderSummary
      // 没有价格时不查询
      if (!totalPrice || !countryId) {
        return false
      }

      const result = await this.$api.order
        .queryTradeDelivery({
          weight: orderSummary.totalWeight,
          countryId,
          stateId,
          amount: orderSummary.orderPrice.total || totalPrice,
        })
        .catch(() => {
          this.deliverList = []
        })
      if (result && result.list.length) {
        const { list } = result
        this.deliverList = list || []
        this.shipId = list[0].transportId
      }
    },
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
  /deep/ .cs-radio {
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
