<template>
  <div class="cs-contract">
    <div class="header">
      <p class="tit">CONTACT INFORMATION</p>
      <p v-if="!isLogin" class="noLogin-tip">
        <nuxt-link class="cs-link-text" to="customer/login"
          >Sign in / Sign up</nuxt-link
        >
      </p>
    </div>
    <div v-if="isLogin" class="cs-contract-login">
      <div class="img">
        <span>{{ loginInfo.customerName | firstChar | toUpperCase }}</span>
      </div>
      <div class="info">
        <p>
          {{ loginInfo.customerName | toUpperCase }} ( {{ loginInfo.email }})
        </p>
        <a class="cs-link-text" @click="logout">Log out</a>
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

    <div v-if="!(isLogin && loginInfo.isSubscribe == 1)" class="agreement">
      <!-- 息传递给后台，订阅邮件推送服务（EDM），法国站/德国站不默认勾选 -->
      <!-- 1、登录用户 未订阅时展示  2、登录用户，已订阅，不展示 -->
      <cup-checkbox v-model="orderParams.cust.subscribeEmail" :label="true">
        <p>Keep me up to date on news and exclusive offers</p>
      </cup-checkbox>
    </div>
  </div>
</template>
<script>
import { emailRule } from '@assets/js/rules.js'
export default {
  data() {
    return {
      emailRule,
    }
  },
  inject: ['orderParams'],
  methods: {
    async onBlur() {
      const flag = this.validForm()
      const { isLogin, orderParams } = this
      if (flag && !isLogin) {
        // 游客登录
        const result = await this.$api.customer.guestLogin(
          orderParams.cust.email
        )
        if (result) {
          const { token } = result
          this.$cookies.set('token', token)
        }
      }
    },
    // 退出登录
    async logout() {
      await this.$api.customer.logout()
      this.$store.commit('SET_USERINFO', null)
      this.$cookies.remove('token')
      this.orderParams.cust.email = ''
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
  background-color: #fff;
  margin-bottom: 40px;
  .header {
    display: flex;
    align-items: center;
    .tit {
      font-size: 18px;
      @include font($fontMuliBold);
      color: #333333;
      line-height: 23px;
      letter-spacing: 1px;
      flex: 1;
    }
  }
  /deep/.el-form-item {
    margin-bottom: 13px;
    &.is-error {
      .el-form-item__content {
        margin-bottom: 16px;
      }
    }
  }
  .agreement {
    display: flex;
    align-items: center;
    .cs-checkbox {
      margin-bottom: 0;
      /deep/ i {
        width: 14px;
        height: 14px;
      }
    }
    p {
      font-size: 12px;
      color: #333333;
    }
  }
  &-login {
    display: flex;
    align-items: center;
    padding: 16px 0;
    .img {
      width: 60px;
      height: 60px;
      line-height: 60px;
      border-radius: 30px;
      margin-right: 20px;
      text-align: center;
      background-color: #f2f2f2;

      span {
        font-size: 30px;
        color: #999;
        @include font($fontMuliBold);
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      & > * {
        font-size: 14px;
      }
    }
  }
  .cup-input {
    margin: 16px 0 13px 0;
  }
  // 兼容移动端
  &.mobile {
    padding: 0 16px;
    margin-bottom: 25px;
    .header {
      .tit {
        font-size: 14px;
        line-height: 18px;
        width: 100%;
        @include font($fontMuliBold);
      }
    }
    .cs-contract-login {
      padding: 16px 0 20px 0;
      .img {
        width: 54px;
        height: 54px;
        line-height: 54px;
        border-radius: 27px;
        margin-right: 16px;
      }
      .info {
        a {
          font-size: 12px;
          margin-top: 8px;
        }
      }
    }
    .el-form-item {
      margin-bottom: 18px;
    }
  }
}
</style>
