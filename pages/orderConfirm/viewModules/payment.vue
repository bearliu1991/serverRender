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
              <span v-if="item.paymentIcon"
                ><img :src="item.paymentIcon" alt=""
              /></span>
              <span v-else>{{ item.paymentName }}</span>
              <template v-if="item.id != 2">
                <i class="icon_card-visa"></i>
                <i class="icon_card-master"></i>
                <i class="icon_card-amex"></i>
              </template>
            </cup-radio>

            <div
              v-if="item.id == 1"
              v-show="payment.paymentType == 1"
              :key="`c_${item.id}`"
              class="cs-payment-form"
            >
              <el-form class="cup-input" :model="payment">
                <el-form-item>
                  <label>
                    <span
                      data-cse="encryptedCardNumber"
                      class="el-input__inner"
                    ></span>
                  </label>
                  <!-- <el-input
                    v-model="payment.cardNo"
                    placeholder="Card number"
                    suffix-icon="el-icon-date"
                    autocomplete="off"
                  ></el-input> -->
                </el-form-item>
                <el-form-item>
                  <el-input
                    v-model="payment.cardName"
                    placeholder="Name on card"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item class="cs-w-5">
                  <label>
                    <span
                      data-cse="encryptedExpiryDate"
                      class="el-input__inner"
                    ></span>
                  </label>
                  <!-- <el-input
                    v-model="date"
                    data-cse="encryptedExpiryDate"
                    placeholder="Expiration date ( MM / YY )"
                    type="text"
                    autocomplete="off"
                    maxlength="7"
                    :autofocus="autofocus"
                    @input="formatInput($event)"
                  ></el-input> -->
                </el-form-item>
                <el-form-item class="cs-w-5 cs-ml-8">
                  <label>
                    <span
                      data-cse="encryptedSecurityCode"
                      class="el-input__inner"
                    ></span>
                  </label>
                  <!-- <el-input
                    v-model="payment.securityCode"
                    data-cse="encryptedSecurityCode"
                    placeholder="Security code"
                    type="number"
                    suffix-icon="el-icon-date"
                    autocomplete="off"
                  ></el-input> -->
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
    }
  },
  watch: {
    'payment.paymentType'(id) {
      const result = this.paymentMethods.find((item) => {
        return item.id === id
      })
      this.payment.paymentName = result.paymentName
    },
  },
  inject: ['orderParams', 'payment'],
  created() {
    this.queryPayment()
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
    adyenCard() {
      const configuration = {
        locale: 'en_US',
        environment: 'test',
        clientKey: 'test_KUFDCNJKAFG4RKTM2BVZKHMLC4G4ABR4',
        onChange: this.handleOnChange,
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
              color: '#333',
              fontSize: '16px',
              lineHeight: '40px',
              fontSmoothing: 'antialiased',
              fontFamily: 'Muli-Regular_Light, Muli',
            },
            error: {
              color: 'red',
            },
            validated: {
              color: '#999',
            },
            placeholder: {
              color: '#999',
            },
          },
          ariaLabels: {
            lang: 'en-GB',
            encryptedCardNumber: {
              label: 'Credit or debit card number field',
            },
            encryptedExpiryDate: {
              label: 'Credit or debit card expiration date',
              iframeTitle: 'Iframe for card data input field',
            },
            encryptedSecurityCode: {
              label: 'Iframe for card data input field',
            },
          },
        })
        .mount('#customCard-container')
    },
    /**
     * 查询支付方式
     */
    async queryPayment() {
      const { countryId = 11, stateId } = this.orderParams.shipAddress
      if (!countryId) {
        return false
      }
      const result = await this.$api.order.queryPaymentMethods({
        countryId,
        stateId,
      })
      if (result) {
        const { list } = result
        this.paymentMethods = list
        this.$nextTick(function () {
          // 信用卡
          this.adyenCard()
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-payment {
  margin-bottom: 40px;
  .header-tit {
    font-size: 18px;
    font-family: Muli-Regular_Bold, Muli;
    font-weight: normal;
    color: #333333;
    line-height: 23px;
    letter-spacing: 1px;
    margin-bottom: 9px;
  }
  .header-sub {
    font-size: 14px;
    font-family: Muli-Regular_Light, Muli;
    font-weight: normal;
    color: #333333;
    line-height: 18px;
    margin-bottom: 16px;
  }
  &-form {
    padding: 16px;
    font-size: 0;
    background: #fafafa;
    border-bottom: 1px solid #d8d8d8;
  }
  .el-form-item {
    margin-bottom: 16px;
  }
}
.cs-checkboxgroup {
  border: 1px solid #d8d8d8;
  .cs-radio {
    padding: 12px;
    border-bottom: 1px solid #d8d8d8;
    height: 44px;
    margin-bottom: 0;
    &:last-child {
      border-bottom: 0;
    }
    /deep/ &-text {
      width: 100%;
      display: flex;
      align-items: center;
      :first-child {
        flex: 1;
        img {
          width: 40px;
          height: 10px;
        }
      }
      i {
        height: 20px;
        margin-right: 20px;
      }
    }
  }
}
</style>
