<template>
  <client-only>
    <div id="payment" class="cs-payment-form">
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
          <div v-if="error.cardName.isError" class="el-form-item__error">
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
      payment: {},
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
  mounted() {
    this.$nextTick(() => {
      this.adyenCard()
    })
  },
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
              // lineHeight: '44px',
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
        .mount('#payment')
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
.cs-payment-form {
  padding: 16px;
  font-size: 0;
  background: #fafafa;

  /deep/.el-form {
    width: 100%;
    &-item {
      margin-bottom: 16px;
      label {
        font-size: 0;
      }
      /deep/ .el-form-item__content {
        height: 44px;
        line-height: normal;
        .adyen-checkout__input {
          @include font($fontRegular);
          font-size: 14px;
          height: 44px;
          color: #999;
          border-radius: 0;
          padding: 13px 12px;
          outline: none;
          resize: none;
          border-color: #d8d8d8;
          &--focus {
            outline: none;
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
            border: 1px solid #e61717 !important;
          }
        }
      }
      .icon {
        font-size: 18px;
        height: 100%;
        line-height: 44px;
      }
    }
  }

  &.mobile {
    margin: 24px 16px;
  }
}
</style>
<style lang="scss">
.input-field:focus {
  outline: none;
  resize: none;
  border-color: #000;
}
</style>
