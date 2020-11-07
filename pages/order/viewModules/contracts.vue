<template>
  <div class="cs-contract">
    <div class="header">
      <p class="tit">Contact Information</p>
      <p class="noLogin-tip">
        Get rewarded every time you shop <a class="cs-link-text">Sign in</a>
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
      <el-form class="cup-input">
        <el-form-item prop="email">
          <el-input
            v-model="formData.email"
            placeholder="Email"
            type="email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="agreement">
      <cup-checkbox />
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
      formData: {
        email: '',
      },
    }
  },
  computed: mapState([
    // 映射 this.count 为 store.state.count
    'isLogin',
    'loginInfo',
  ]),
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
