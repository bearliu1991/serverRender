<template>
  <client-only>
    <div class="cs-payment_process"></div>
  </client-only>
</template>
<script>
import { getQueryString } from '@assets/js/utils.js'
export default {
  loading: true,
  layout: 'order',
  validate({ params }) {
    const { isEmpty } = this
    const orderNo = getQueryString('orderNo')
    const orderToken = getQueryString('orderToken')
    if (isEmpty(orderNo) || isEmpty(orderToken)) {
      return false
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.$nuxt.$loading.start()
      this.paymentConfirm()
    })
  },
  methods: {
    async paymentConfirm() {
      const result = await this.$api.payment
        .paymentConfirm(orderToken, orderNo)
        .catch(() => {
          this.$nuxt.$loading.finish()
          this.$router // TODO adyen支付 自动跳转到成功或者失败
            .push({
              path: '/payment/result',
              query: {
                orderNo,
                type: 'cancel',
              },
            })
        })
      if (result) {
        this.$nuxt.$loading.finish()
        this.$router // TODO adyen支付 自动跳转到成功或者失败
          .push({
            path: 'payment/result',
            query: {
              orderNo,
              type: 'scuucess',
            },
          })
      }
    },
  },
}
</script>
