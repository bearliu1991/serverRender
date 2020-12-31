<template>
  <div class="cs-shipMethod">
    <p class="header-tit">SHIPPING METHOD</p>
    <!-- 没有地址 -->
    <div v-if="deliverList.length == 0" class="cs-shipMethod-empty">
      <p v-if="!orderParams.shipAddress || !orderParams.shipAddress.countryId">
        Please enter the address before selecting the shipping method
      </p>
      <p v-else>
        Sorry, we currently don’t ship to
        {{ orderParams.shipAddress.country }}.
      </p>
    </div>
    <template v-else>
      <div class="cs-shipMethod-container">
        <cup-radio-group v-model="shipId">
          <cup-radio
            v-for="item in deliverList"
            :key="item.transportId"
            :label="item.transportId"
          >
            <div class="flex-1">
              <p>
                {{ item.transportName }}
              </p>
              <p v-if="item.tips" class="tips">({{ item.tips }})</p>
            </div>
            <span style="float: right">{{
              item.actualFreight | formatCurrency
            }}</span>
          </cup-radio>
        </cup-radio-group>
      </div>
      <div v-if="orderParams.isChange" class="cs-fail-msg">
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
  inject: ['orderParams', 'orderSummary', 'updatePrice'],
  data() {
    return {
      deliverList: [],
      historyDatas: [],
      shipId: '',
      isChange: false,
      changeShip: false,
    }
  },
  computed: {
    dataRange() {
      const { totalWeight } = this.orderSummary
      const { stateId } = this.orderParams.shipAddress
      return {
        stateId,
        totalWeight,
        // total: orderPrice.total,
      }
    },
  },
  watch: {
    dataRange: {
      handler(val, oldVal) {
        this.queryDelivery()
      },
      immediate: true,
      deep: true,
    },
    'orderSummary.orderPrice.total'(val, oldVal) {
      // 若是切换物流算价，则不会重新查询算价
      if (this.changeShip) {
        this.changeShip = false
        return false
      }
      if (val !== oldVal) {
        this.queryDelivery()
      }
    },
    shipId(val) {
      if (this.deliverList.length) {
        this.orderParams.delivery.shipId = val
        this.orderParams.deliverInfo = this.deliverList.find((item) => {
          return item.transportId === val
        })
      } else {
        this.orderParams.delivery = {
          shipId: '',
        }
      }
      this.changeShip = true
      this.updatePrice()
    },
  },
  methods: {
    async queryDelivery() {
      const { orderParams, orderSummary } = this
      const { countryId, stateId } = orderParams.shipAddress
      const { totalPrice, orderPrice } = orderSummary
      const { subtotal } = orderPrice
      // 没有价格时不查询
      if (
        this.isEmpty(totalPrice) ||
        !countryId ||
        subtotal === 0 ||
        totalPrice === 0
      ) {
        this.deliverList = []
        this.orderParams.delivery.shipId = ''
        this.orderParams.deliverInfo = {}
        return false
      }

      const result = await this.$api.order
        .queryTradeDelivery({
          weight: orderSummary.totalWeight,
          countryId,
          stateId,
          amount: subtotal >= 0 ? subtotal : totalPrice,
        })
        .catch(() => {
          this.orderParams.deliverInfo = {}
          this.orderParams.delivery.shipId = ''
          this.deliverList = []
          this.compareChange()
        })
      if (result) {
        const { list } = result
        this.deliverList = list || []
        this.shipId = (list[0] && list[0].transportId) || ''
        if (this.historyDatas.length === 0) {
          this.historyDatas = list
        }
        this.compareChange()
        this.$forceUpdate()
      }
    },
    /**
     * 价格，地址改变导致物流有变化，或者物流的价格有变化时，显示提示
     */
    compareChange() {
      const self = this
      const { deliverList, historyDatas } = self
      if (deliverList.length !== historyDatas.length) {
        this.historyDatas = deliverList
        this.orderParams.isChange = true
        return false
      }
      deliverList.forEach((item) => {
        const index = historyDatas.findIndex((data) => {
          return data.transportId === item.transportId
        })
        if (index > -1) {
          if (item.actualFreight !== historyDatas[index].actualFreight) {
            this.orderParams.isChange = true
            self.historyDatas = deliverList
            return false
          }
        } else {
          this.orderParams.isChange = true
          self.historyDatas = deliverList
          return false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-shipMethod {
  margin-bottom: 40px;
  &-container {
    border: 1px solid #d8d8d8;
  }
  /deep/ .cs-radio {
    padding: 10px 12px 10px 8px;
    border-bottom: 1px solid #d8d8d8;
    margin-bottom: 0;
    align-items: flex-start;
    &:last-child {
      border-bottom: 0;
    }
    &-text {
      display: flex;
      width: 100%;
      overflow: hidden;
      margin-top: 4px;
    }
    .flex-1 {
      flex: 1;
      p {
        margin-right: 16px;
      }
      .tips {
        margin-top: 2px;
        color: #999;
        word-break: break-all;
      }
    }
  }
  .cs-fail-msg {
    margin-top: 16px;
  }
  &.mobile {
    padding: 24px 16px;
    margin-bottom: 0;
  }
}
</style>
