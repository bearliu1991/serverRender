import { emailRule } from '@assets/js/rules.js'
export default {
  data() {
    return {
      emailRule,
      formData: {
        email: '',
      },
      step: 1,
    }
  },
  //  查商品   查地址  查用户信息   折扣券  支付方式   物流   结算
  methods: {
    buildOrder() {
      this.queryProduct()
      this.queryProduct()
      this.queryContract()
      this.queryGiftCard()
    },
    queryProduct() {},
    queryAddress() {},
    queryContract() {},
    queryGiftCard() {},
    queryDelivery() {},
    queryPayment() {},
    updatePrice() {},
    createOrder() {},
    toPay() {},
    onStep(val) {
      this.step = val
    },
  },
}
