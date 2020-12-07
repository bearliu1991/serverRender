import { getQueryString } from '@assets/js/utils.js'
export default {
  data() {
    return {
      orderInfo: null,
      type: 'success',
    }
  },
  mounted() {
    this.type = getQueryString('type') || 'success'
    this.queryOrderInfo()
  },
  methods: {
    // 查询支付结果
    async queryOrderInfo() {
      const orderNo = getQueryString('orderNo')
      const result = await this.$api.payment.queryPaymentResult(orderNo)
      this.orderInfo = result
    },
  },
}
