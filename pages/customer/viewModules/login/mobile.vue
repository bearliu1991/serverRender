<template>
  <div class="m-login">
    <div class="m-login-wrap">
      <ul class="m-login-tab">
        <li class="active">
          <p>SIGN IN</p>
        </li>
        <li @click="toSignUp">
          <p>SIGN UP</p>
        </li>
      </ul>
      <div class="m-login-sign">
        <el-form ref="loginForm" :model="formData" class="cup-input">
          <!-- 邮箱 -->
          <el-form-item prop="email" :rules="emailRule">
            <el-input
              v-model="formData.email"
              placeholder="Email"
              type="email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item
            prop="password"
            :rules="passRequired"
            class="m-login-pass"
          >
            <el-input
              v-model="formData.password"
              placeholder="Password"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 忘记密码连接 -->
          <el-form-item>
            <div class="m-login-forgetPass">
              <a class="cs-link-text" @click="toReset"> Forget password?</a>
            </div>
          </el-form-item>
          <!-- 提交 -->
          <el-form-item>
            <div v-if="msg.fail" class="cs-fail-msg">
              <p>{{ msg.fail }}</p>
            </div>
            <cup-button
              size="medium"
              block
              type="primary"
              @click="submitForm('loginForm')"
              >SIGN IN</cup-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="m-login-related">
        <p>Not a member yet?</p>
        <p class="sub">
          <span class="cs-link-text">Join now</span>
          <i
            class="icon iconfont iconicon-web-14-jiantou-fenyeyoujiannormal"
          ></i>
        </p>
        <ul>
          <li v-for="(item, index) in menus" :key="index">
            <i :class="['icon', 'iconfont', item.icon]"></i>
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import loginMixin from '../loginMixin'
export default {
  name: 'LoginM',
  mixins: [loginMixin],
}
</script>
<style lang="scss" scoped>
.m-login {
  width: 100%;
  position: relative;
  padding: 0 16px;
  .cs-fail-msg {
    margin-top: 24px;
    & + .cs-button {
      margin-top: 16px;
    }
  }
  &-tab {
    display: flex;
    padding: 40px 0;
    li {
      flex: 1;
      font-size: 18px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #999999;
      line-height: 23px;
      letter-spacing: 1px;
      margin: auto;
      text-align: center;
      p {
        padding-bottom: 8px;
        display: inline-block;
      }
      &.active {
        color: #333333;
        p {
          border-bottom: 2px solid #333;
        }
      }
    }
  }
  &-sign {
    .cs-button-primary {
      margin-bottom: 24px;
      margin-top: 40px;
    }
  }
  &-forgetPass {
    text-align: right;
    margin-top: 16px;
    line-height: normal;
    a.cs-link-text {
      font-family: Muli-Regular_Light, Muli;
    }
  }
  &-pass {
    padding-top: 16px;
  }
  &-related {
    background: #fafafa;
    text-align: center;
    padding-top: 24px;
    padding-bottom: 6px;
    p {
      font-size: 18px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 23px;
      letter-spacing: 1px;
      margin-bottom: 10px;
      .sub {
        font-size: 0;
      }
      span {
        font-size: 18px;
      }
      .icon {
        font-size: 14px;
        margin-left: 4px;
      }
    }
    ul {
      overflow: hidden;
      padding-left: 78px;
      li {
        display: flex;
        align-items: center;
        margin-bottom: 18px;
        i {
          font-size: 24px;
          margin-right: 12px;
        }
        span {
          font-size: 14px;
          font-family: Muli-Regular_Light, Muli;
          font-weight: normal;
          color: #333333;
          line-height: 18px;
        }
      }
    }
  }
}
</style>
