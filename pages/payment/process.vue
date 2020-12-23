<template>
  <client-only>
    <div class="cs-payment_process">
      <<<<<<< HEAD
      <!-- <cup-loading ref="loading"></cup-loading> -->
      =======
      <cup-loading ref="loading"></cup-loading>
      >>>>>>> 2c52d1b48af5edcfb58ab63a96309a9cd85b410c
    </div>
  </client-only>
</template>
<script>
import { getQueryString } from '@assets/js/utils.js'
export default {
  name: 'PaymentProcess',
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
      this.paymentConfirm()
    })
  },
  methods: {
    async paymentConfirm() {
      // eslint-disable-next-line no-unreachable
      const orderNo = getQueryString('orderNo')

      const result = await this.$api.payment
        .paymentConfirm(orderNo)
        .catch((error) => {
          // 超时，进入订单详情页
          if (error.code === 'ECONNABORTED') {
          } else {
            this.$router // TODO adyen支付 自动跳转到成功或者失败
              .push({
                path: '/payment/result',
                query: {
                  orderNo,
                  type: 'cancel',
                },
              })
          }
        })
      // eslint-disable-next-line no-unreachable
      this.$refs.loading.finish()
      if (!result) {
        this.$router // TODO adyen支付 自动跳转到成功或者失败
          .push({
            path: '/payment/result',
            query: {
              orderNo,
              type: 'success',
            },
          })
      }
    },
  },
}
//
</script>
