<template>
  <client-only>
    <div class="cs-payment_process">99999</div>
  </client-only>
</template>
<script>
import { getQueryString } from '@assets/js/utils.js'
export default {
  name: 'PaymentProcess',
  // loading: '~/components/base/cupLoading.vue',
  layout: 'order',
  data() {
    return {
      orderNo: '',
      orderToken: '',
    }
  },
  // validate({ params }) {
  //   // const { isEmpty } = this
  //   console.log(params)
  //   const orderNo = ''
  //   const orderToken = ''
  //   if (isEmpty(orderNo) || isEmpty(orderToken)) {
  //     // return false
  //   }
  // },

  mounted() {
    this.$nextTick(function () {
      // this.$nuxt.$loading.start()
      this.paymentConfirm()
    })
  },
  methods: {
    async paymentConfirm() {
      const orderNo = getQueryString('orderNo')
      const orderToken = getQueryString('orderToken')
      const result = await this.$api.payment
        .paymentConfirm(orderToken, orderNo)
        .catch(() => {
          // this.$nuxt.$loading.finish()
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
//
</script>
