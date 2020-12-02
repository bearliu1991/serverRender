<template>
  <div class="pc-login">
    <div class="pc-login-wrap">
      <div class="pc-login-sign">
        <p class="sign-title">SIGN IN</p>
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
            class="pc-login-pass"
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
            <div class="pc-login-forgetPass">
              <a class="cs-link-text" @click="toReset"> Forget password?</a>
            </div>
          </el-form-item>
          <!-- 提交 -->
          <el-form-item>
            <div v-if="msg.fail" class="cs-fail-msg">
              <p>{{ msg.fail }}</p>
            </div>
            <cup-button block type="primary" @click="submitForm('loginForm')"
              >SIGN IN</cup-button
            >
            <cup-button block @click="toSignUp">SIGN UP</cup-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="pc-login-related">
        <p>Not a member yet?</p>
        <p class="sub">
          <span class="cs-link-text">Join now</span>
          <i
            class="icon iconfont iconicon-web-14-jiantou-fenyeyoujiannormal"
          ></i>
        </p>
        <ul>
          <li v-for="(item, index) in menus" :key="index">
            <div class="icon-group">
              <i :class="['icon', 'iconfont', item.icon]"></i>
            </div>

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
  name: 'LoginPC',
  mixins: [loginMixin],
}
</script>
<style lang="scss" scoped>
.pc-login {
  @include backgroundImage('icon-login-bg');
  height: 780px;
  width: 100%;
  position: relative;
  .cs-fail-msg {
    margin-top: 40px;
    & + .cs-button {
      margin-top: 16px;
    }
  }
  &-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  &-sign {
    width: 516px;
    height: 600px;
    background: #ffffff;
    padding: 0 68px;
    .sign-title {
      font-size: 40px;
      @include font($fontMuliBold);
      color: #333333;
      line-height: 50px;
      letter-spacing: 2px;
      padding: 100px 0 40px 0;
      text-align: center;
    }
    .cs-button-primary {
      margin-bottom: 16px;
      margin-top: 60px;
    }
  }
  &-forgetPass {
    text-align: right;
    margin-top: 10px;
    line-height: normal;
    a.cs-link-text {
      @include font($fontRegular);
    }
    // margin-bottom: 60px;
  }
  &-pass {
    padding-top: 16px;
  }
  &-related {
    height: 600px;
    width: 380px;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 110px;
    p {
      font-size: 24px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 36px;
      letter-spacing: 1px;
      margin-bottom: 10px;
      .sub {
        font-size: 0;
      }
      span {
        font-size: 24px;
      }
      .icon {
        font-size: 18px;
        margin-left: 4px;
      }
    }
    ul {
      overflow: hidden;
      padding: 0 36px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: calc(50%);
        flex-shrink: 0;
        margin-top: 30px;
        // float: left;
        text-align: center;
        .icon-group {
          margin: auto;
          width: 80px;
          height: 80px;
          line-height: 80px;
          background: #ffffff;
          border-radius: 50%;
          i {
            font-size: 48px;
          }
        }
        span {
          font-size: 14px;
          color: #454545;
          line-height: 18px;
          margin-top: 16px;
          display: inline-block;
        }
      }
    }
  }
}
</style>
