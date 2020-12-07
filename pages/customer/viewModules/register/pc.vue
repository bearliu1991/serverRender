<template>
  <div class="pc-register">
    <div class="pc-register-wrap">
      <div class="pc-register-sign">
        <p class="sign-title">SIGN UP</p>
        <el-form
          ref="form"
          :model="formData"
          :rules="passwordRules"
          class="cup-input"
        >
          <!-- 邮箱 -->
          <el-form-item prop="email" :rules="emailRule">
            <el-input
              v-model="formData.email"
              placeholder="Email"
              type="email"
              autocomplete="off"
              @input="changeInput"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password" class="pc-register-pass">
            <el-input
              v-model="formData.password"
              placeholder="Password"
              type="password"
              autocomplete="off"
              @input="changeInput"
            ></el-input>
          </el-form-item>
          <!-- 二次确认密码 -->
          <el-form-item prop="confirmPassword" class="pc-register-pass">
            <el-input
              v-model="formData.confirmPassword"
              placeholder="confirm password"
              type="password"
              autocomplete="off"
              @input="changeInput"
            ></el-input>
          </el-form-item>

          <!-- 隐私协议 -->
          <el-form-item class="cs-agreement">
            <cup-checkbox v-model="isCheckedAgree"></cup-checkbox>
            <p>
              I agree to Cupshe
              <a class="cs-link">Terms & Conditions</a> and
              <a class="cs-link" @click="isShowPrivacy = !isShowPrivacy"
                >Privacy policy.</a
              >
            </p>
          </el-form-item>
          <!-- 操作 -->
          <el-form-item>
            <!-- 注册信息错误 -->
            <div v-if="msg.fail" class="cs-fail-msg">
              <p>
                {{ msg.fail }}
              </p>
            </div>
            <!-- 提交注册 -->
            <cup-button
              block
              type="primary"
              :disabled="isBtnProcess"
              @click="submitForm('form')"
              >BE A MEMBER</cup-button
            >
            <cup-button block @click="toSignIn">SIGN IN</cup-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="pc-register-related">
        <p>JOIN NOW</p>
        <p>AND GET BENEFITS</p>
        <ul>
          <!-- <li class="active">
            <i class="icon-jinbi"></i>

            <span>300 Points</span>
          </li> -->
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
  name: 'RegisterPC',
  mixins: [loginMixin],
}
</script>
<style lang="scss" scoped>
.pc-register {
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
      padding: 60px 0 40px 0;
      text-align: center;
    }
    .cs-button-primary {
      margin-top: 60px;
      margin-bottom: 16px;
      a.cs-link-text {
        @include font($fontRegular);
      }
    }
  }
  .cs-agreement {
    /deep/.el-form-item__content {
      display: flex;
      line-height: normal;
      justify-content: flex-start;
      margin-top: 16px;
    }
  }
  // &-agreement {
  /deep/ .cs-checkbox {
    margin-bottom: 0;
    line-height: normal;
    display: inline-block;
    &-text {
      font-size: 12px;
    }
  }
  // }
  &-pass {
    padding-top: 16px;
  }

  &-related {
    height: 600px;
    width: 380px;
    background: rgba(255, 255, 255, 0.8);
    padding-top: 99px;
    p {
      font-size: 24px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 36px;
      letter-spacing: 1px;
      margin-bottom: 10px;
      text-align: center;
    }
    ul {
      margin-top: 40px;
      overflow: hidden;
      padding-left: 71px;

      li {
        padding-left: 14px;
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #333333;
        i {
          font-size: 30px;
          margin-right: 12px;
        }
        span {
          line-height: 20px;
        }
        &.active {
          height: 60px;
          background: #fef6e5;
          color: #ffab00;
          width: 237px;
        }
      }
      .icon-jinbi {
        @include icon-image('icon-jinbi');
      }
    }
  }
}
</style>
