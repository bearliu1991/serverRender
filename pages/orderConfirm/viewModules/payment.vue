<template>
  <client-only>
    <div class="cs-payment">
      <p class="header-tit">PAYMENT</p>
      <p class="header-sub">All transactions are secure and encrypted</p>
      <div
        v-if="paymentMethods.length"
        id="customCard-container"
        class="cs-payment-container"
      >
        <cup-radio-group v-model="payment.paymentType">
          <template v-for="item in paymentMethods">
            <cup-radio :key="item.id" :label="item.id">
              <span v-if="item.paymentIcon && item.id != 1"
                ><img :src="item.paymentIcon" alt="" width="40" height="10"
              /></span>
              <span v-else>{{ item.paymentName }}</span>
              <template v-if="item.id != 2">
                <i class="icon_card-visa"></i>
                <i class="icon_card-master"></i>
                <i class="icon_card-amex"></i>
              </template>
              <span v-if="item.id == 1" class="more">
                <template v-if="$store.state.terminal == 'mobile'">
                  ...
                </template>
                <template v-else> and more... </template>
              </span>
            </cup-radio>

            <div
              v-if="item.id == 1"
              v-show="payment.paymentType == 1"
              :key="`c_${item.id}`"
              class="cs-payment-form"
            >
              <el-form :model="payment" class="cup-input">
                <el-form-item
                  :class="error.encryptedCardNumber.isError ? 'is-error' : ''"
                >
                  <label>
                    <span
                      data-cse="encryptedCardNumber"
                      :class="[
                        'adyen-checkout__input',
                        error.encryptedCardNumber.isFocus
                          ? 'adyen-checkout__input--focus'
                          : '',
                      ]"
                    ></span>
                    <div
                      class="adyen-checkout__card__cvc__hint__wrapper adyen-checkout__card__cardNumber__brandIcon"
                    >
                      <i class="icon iconfont iconwap-18-suo"></i>
                    </div>
                  </label>
                  <div
                    v-if="error.encryptedCardNumber.isError"
                    class="el-form-item__error"
                  >
                    {{ error.encryptedCardNumber.errorMsg }}
                  </div>
                </el-form-item>
                <el-form-item :class="error.cardName.isError ? 'is-error' : ''">
                  <el-input
                    v-model="payment.cardName"
                    placeholder="Name on card"
                    autocomplete="off"
                  ></el-input>
                  <div
                    v-if="error.cardName.isError"
                    class="el-form-item__error"
                  >
                    {{ error.cardName.errorMsg }}
                  </div>
                </el-form-item>
                <el-form-item
                  :class="[
                    'cs-w-5',
                    error.encryptedExpiryDate.isError ? 'is-error' : '',
                  ]"
                >
                  <label>
                    <span
                      data-cse="encryptedExpiryDate"
                      :class="[
                        'adyen-checkout__input',
                        error.encryptedExpiryDate.isFocus
                          ? 'adyen-checkout__input--focus'
                          : '',
                      ]"
                    >
                    </span>
                  </label>
                  <div
                    v-if="error.encryptedExpiryDate.isError"
                    class="el-form-item__error"
                  >
                    {{ error.encryptedExpiryDate.errorMsg }}
                  </div>
                </el-form-item>
                <el-form-item
                  :class="[
                    'cs-w-5 cs-ml-8',
                    error.encryptedSecurityCode.isError ? 'is-error' : '',
                  ]"
                >
                  <label>
                    <span
                      data-cse="encryptedSecurityCode"
                      :class="[
                        'adyen-checkout__input',
                        error.encryptedSecurityCode.isFocus
                          ? 'adyen-checkout__input--focus'
                          : '',
                      ]"
                    ></span>
                    <div
                      class="adyen-checkout__card__cvc__hint__wrapper adyen-checkout__field__cvc--back-hint"
                    >
                      <i class="icon iconfont iconwap-18-yiwen"></i>
                    </div>
                  </label>
                  <div
                    v-if="error.encryptedSecurityCode.isError"
                    class="el-form-item__error"
                  >
                    {{ error.encryptedSecurityCode.errorMsg }}
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </template>
        </cup-radio-group>
      </div>
    </div>
  </client-only>
</template>
<script>
let AdyenCheckout = null
if (process.browser) {
  // eslint-disable-next-line no-unused-vars
  AdyenCheckout = require('@adyen/adyen-web')
  require('@adyen/adyen-web/dist/adyen.css')
}
export default {
  data() {
    return {
      paymentMethods: [],
      isError: false,
      error: {
        encryptedCardNumber: {
          isError: false,
          isFocus: false,
          errorMsg: 'Enter a valid card number.',
        },
        cardName: {
          isError: false,
          errorMsg: 'Enter your name exactly as it’s written on your card.',
        },
        encryptedExpiryDate: {
          isError: false,
          isFocus: false,
          errorMsg: 'Enter a valid card expiry date.',
        },
        encryptedSecurityCode: {
          isError: false,
          isFocus: false,
          errorMsg: 'Enter the CVV or security code on your card.',
        },
      },
    }
  },
  computed: {
    dataRange() {
      const { countryId, stateId } = this.orderParams.shipAddress
      return {
        countryId,
        stateId,
      }
    },
  },
  watch: {
    dataRange: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.queryPayment()
        }
      },
      immediate: true,
      deep: true,
    },
    'payment.paymentType': {
      handler(id) {
        const result = this.paymentMethods.find((item) => {
          return item.id === id
        })
        if (result) {
          this.payment.paymentName = result.paymentName
        }
      },
      immediate: true,
    },
  },
  inject: ['orderParams', 'payment'],
  methods: {
    handleOnChange(state, component) {
      if (state.isValid) {
        const {
          encryptedCardNumber,
          encryptedExpiryMonth,
          encryptedExpiryYear,
          encryptedSecurityCode,
        } = state.data.paymentMethod
        this.payment = Object.assign(this.payment, {
          cardNo: encryptedCardNumber,
          expiryMonth: encryptedExpiryMonth,
          expiryYear: encryptedExpiryYear,
          securityCode: encryptedSecurityCode,
        })
      }
    },
    handlerError(val) {
      this.error[val.fieldType].isError = true
      this.error[val.fieldType].isFocus = false
    },
    handlerFocus(val) {
      this.error[val.fieldType].isFocus = true
      this.error[val.fieldType].isError = false
    },
    adyenCard() {
      const configuration = {
        locale: 'en_US',
        environment: 'test',
        clientKey: 'test_KUFDCNJKAFG4RKTM2BVZKHMLC4G4ABR4',
        onChange: this.handleOnChange,
        onError: this.handlerError,
        onFocus: this.handlerFocus,
      }
      // eslint-disable-next-line no-new
      const checkout = new AdyenCheckout(configuration)
      // eslint-disable-next-line no-unused-vars
      const customCard = checkout
        .create('securedfields', {
          // Optional configuration
          type: 'card',
          brands: ['mc', 'visa', 'amex', 'bcmc', 'maestro'],
          styles: {
            base: {
              color: '#999',
              fontSize:
                this.$store.state.terminal === 'mobile' ? '12px' : '14px',
              lineHeight: '44px',
              fontSmoothing: 'antialiased',
              fontFamily: 'Muli-Regular_Light, Muli',
            },
            error: {
              color: '#e61717',
            },
            validated: {
              color: '#999',
            },
            placeholder: {
              color: '#999',
            },
          },
        })
        .mount('#customCard-container')
    },
    /**
     * 查询支付方式
     */
    async queryPayment() {
      const { countryId = '', stateId } = this.orderParams.shipAddress
      if (!countryId) {
        return false
      }
      const result = await this.$api.order.queryPaymentMethods({
        countryId,
        stateId,
      })
      if (result && result.list.length) {
        const { list } = result
        this.paymentMethods = list
        this.payment.paymentType = list[0].id
        this.$nextTick(function () {
          // 信用卡
          this.adyenCard()
        })
      }
    },
    validPayment() {
      let flag = true
      const { cardNo, cardName, expiryMonth, securityCode } = this.payment
      if (cardNo === '') {
        flag = false
        this.handlerError({
          fieldType: 'encryptedCardNumber',
        })
      }
      if (cardName === '') {
        flag = false
        this.error.cardName.isError = true
        this.error.cardName.isFocus = false
      }
      if (expiryMonth === '') {
        flag = false
        this.handlerError({
          fieldType: 'encryptedExpiryDate',
        })
      }
      if (securityCode === '') {
        flag = false
        this.handlerError({
          fieldType: 'encryptedSecurityCode',
        })
      }
      return flag
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-payment {
  margin-bottom: 40px;
  &-form {
    padding: 16px;
    font-size: 0;
    background: #fafafa;
    border-bottom: 1px solid #d8d8d8;
  }
  .el-form {
    width: 100%;
    &-item {
      margin-bottom: 16px;
      label {
        font-size: 0;
      }
      /deep/ .el-form-item__content {
        height: 44px;
        .adyen-checkout__input {
          @include font($fontRegular);
          font-size: 14px;
          height: 44px;
          color: #999;
          border-radius: 0;
          padding: 0 12px;
          border-color: #d8d8d8;
          &--focus,
          &--focus:hover {
            border: 1px solid #d8d8d8;
            box-shadow: none;
          }
        }
        .adyen-checkout__card__cvc__hint__wrapper {
          width: auto;
        }
      }
      &.is-error {
        /deep/ .el-form-item__content {
          margin-bottom: 16px;
          .adyen-checkout__input {
            border: 1px solid #e61717;
          }
        }
      }
      .icon {
        font-size: 18px;
        height: 100%;
      }
    }
  }

  &.mobile {
    margin: 24px 16px;
  }
}
.cs-checkboxgroup {
  border-width: 1px;
  border-style: solid;
  border-color: #d8d8d8;
  /deep/ .cs-radio {
    padding: 12px;
    border-bottom: 1px solid #d8d8d8;
    height: 44px;
    margin-bottom: 0;
    &.mobile {
      padding: 0 10px;
    }
    &:last-child {
      border-bottom: 0;
    }
    &-text {
      width: 100%;
      display: flex;
      align-items: center;
      :first-child {
        flex: 1;
        display: inline-block;
        img {
          width: 40px;
          height: 10px;
          vertical-align: middle;
        }
      }
      i {
        height: 24px;
        width: 38px;
        margin-right: 10px;
        background-size: contain;
      }
      .more {
        font-size: 14px;
      }
    }
  }
}
</style>
<style lang="scss">
.input-field:focus {
  outline: none;
  border-color: #000;
}
</style>
