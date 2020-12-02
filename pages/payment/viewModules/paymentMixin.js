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
    async queryOrderInfo() {
      const orderNo = getQueryString('orderNo')
      const result = await this.$api.order.queryOrderDetail(orderNo)
      this.orderInfo = result
    },
  },
}
