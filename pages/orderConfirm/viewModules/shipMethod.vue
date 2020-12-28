<template>
  <div class="cs-shipMethod">
    <p class="header-tit">SHIPPING METHODS</p>
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
            <span style="float: right;">{{
              item.actualFreight | formatCurrency
            }}</span>
          </cup-radio>
        </cup-radio-group>
      </div>
      <div v-if="isChange" class="cs-fail-msg">
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
    }
  },
  computed: {
    dataRange() {
      const { totalWeight } = this.orderSummary
      const { countryId, stateId } = this.orderParams.shipAddress
      return {
        countryId,
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
      this.updatePrice()
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
        this.deliverList = []
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
          this.compareChange()
        })
      if (result) {
        const { list } = result
        this.deliverList = list || []
        this.shipId = (list[0] && list[0].transportId) || ''
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
      if (deliverList.length === 0 || historyDatas.length === 0) {
        this.isChange = false
        return false
      }
      deliverList.forEach((item) => {
        const index = historyDatas.findIndex((data) => {
          return data.transportId === item.transportId
        })
        if (index > -1) {
          if (item.actualFreight === historyDatas[index].actualFreight) {
            this.isChange = true
            self.historyDatas = deliverList
            return false
          }
        } else {
          this.isChange = true
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
  // .header-tit {
  //   font-size: 18px;
  //   font-family: Muli-Regular_Bold, Muli;
  //   font-weight: normal;
  //   color: #333333;
  //   line-height: 23px;
  //   letter-spacing: 1px;
  //   margin-bottom: 16px;
  // }
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
      display: flex;
      width: 100%;
      overflow: hidden;
      align-items: center;
    }
    .flex-1 {
      flex: 1;
      .tips {
        color: #999;
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
