<template>
  <div class="cs-payment">
    <p class="header-tit">PAYMENT</p>
    <p class="header-sub">All transactions are secure and encrypted</p>
    <div class="cs-payment-container">
      <cup-radio-group v-model="paymentStatus">
        <cup-radio label="这是1">
          <span>Credit card</span>
          <span style="float: right">88888</span>
        </cup-radio>

        <div class="cs-payment-form">
          <el-form class="cup-input">
            <el-form-item prop="email">
              <el-input
                placeholder="Card number"
                type="email"
                suffix-icon="el-icon-date"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                placeholder="Name on card"
                type="email"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="email" class="cs-w-5">
              <el-input
                placeholder="Expiration date ( MM / YY )"
                type="email"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="email" class="cs-w-5 cs-ml-8">
              <el-input
                placeholder="Expiration date ( MM / YY )"
                type="email"
                suffix-icon="el-icon-date"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <cup-radio label="这是1">
          <span>
            <i class="icon_card-pay-pal"></i>
          </span>
          <span style="float: right">88888</span>
        </cup-radio>
        <cup-radio label="这是1">
          <span>
            <i class="icon_card-afterpay"></i>
          </span>
          <i class="icon_card-visa"></i>
          <i class="icon_card-master"></i>
          <i class="icon_card-amex"></i>
        </cup-radio>
      </cup-radio-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      paymentStatus: '',
    }
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
      }
      i {
        height: 20px;
        margin-right: 20px;
      }
    }
  }
}
</style>
