<template>
  <div class="cs-contract">
    <div class="header">
      <p class="tit">Contact Information</p>
      <p class="noLogin-tip">
        Get rewarded every time you shop
        <nuxt-link class="cs-link-text" to="customer/login">Sign in</nuxt-link>
      </p>
    </div>
    <div v-if="isLogin" class="cs-contract-login">
      <div class="img"></div>
      <div class="info">
        <p>Amy ( {{ loginInfo.email }})</p>
        <a class="cs-link-text">Log out</a>
      </div>
    </div>
    <!-- 未登录 -->

    <div v-else class="cs-contract-noLogin">
      <el-form ref="contractForm" class="cup-input" :model="orderParams.cust">
        <el-form-item prop="email" :rules="emailRule">
          <el-input
            v-model="orderParams.cust.email"
            placeholder="Email"
            type="email"
            autocomplete="off"
            @blur="onBlur"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="agreement">
      <!-- 息传递给后台，订阅邮件推送服务（EDM），法国站/德国站不默认勾选 -->
      <cup-checkbox v-model="orderParams.cust.subscribeEmail" :label="true" />
      <p>Keep me up to date on news and exclusive offers</p>
    </div>
  </div>
</template>
<script>
import { emailRule } from '@assets/js/rules.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      emailRule,
    }
  },
  inject: ['orderParams'],
  computed: mapState([
    // 映射 this.count 为 store.state.count
    'isLogin',
    'loginInfo',
  ]),
  methods: {
    async onBlur() {
      const flag = this.validForm()
      const { isLogin, orderParams } = this
      if (flag && !isLogin) {
        // 游客登录
        const result = await this.$api.customer.guestLogin(
          orderParams.cust.email
        )
        console.log(result)
      }
    },
    validForm() {
      let isValidPass = true
      if (!this.isLogin) {
        this.$refs.contractForm.validate((valid) => {
          if (valid) {
            isValidPass = true
          } else {
            isValidPass = false
          }
        })
      }
      return isValidPass
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-contract {
  margin-bottom: 40px;
  .header {
    display: flex;
    align-items: center;
    .tit {
      font-size: 18px;
      font-family: Muli-Regular_Bold, Muli;
      font-weight: normal;
      color: #333333;
      line-height: 23px;
      letter-spacing: 1px;
      flex: 1;
    }
  }
  .agreement {
    display: flex;
    align-items: center;
    .cs-checkbox {
      margin-bottom: 0;
    }
    p {
      font-size: 12px;
      font-family: Muli-Regular_Light, Muli;
      font-weight: normal;
      color: #333333;
      margin-left: 2px;
    }
  }
  &-login {
    display: flex;
    align-items: center;
    padding: 10px 0;
    .img {
      width: 60px;
      height: 60px;
      background: #dddddd;
      border-radius: 30px;
      margin-right: 20px;
    }
    .info {
      display: flex;
      flex-direction: column;
    }
  }
  .cup-input {
    margin: 16px 0 13px 0;
  }
}
</style>
