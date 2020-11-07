<template>
  <div class="cs-forget">
    <!-- pc端忘记密码 -->
    <div :class="['pc-forget', $store.state.terminal]">
      <div class="pc-forget-wrap">
        <p class="tit">RESET PASSWORD</p>
        <el-form
          ref="form"
          :model="formData"
          :rules="passwordRules"
          class="cup-input"
        >
          <!-- 从邮箱进入后展示 -->
          <template v-if="source == 'email'">
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                v-model="formData.password"
                placeholder="Please enter a new password"
                type="password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <!-- 二次确认密码 -->
            <el-form-item prop="confirmPassword" class="pass-confirm">
              <el-input
                v-model="formData.confirmPassword"
                placeholder="Confirm password"
                type="password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </template>
          <!-- 忘记密码发送邮件 -->
          <template v-else>
            <!-- 邮箱 -->
            <el-form-item prop="email" :rules="emailRule">
              <el-input
                v-model="formData.email"
                placeholder="Please enter your email"
                type="email"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </template>
          <!-- 操作 -->
          <el-form-item>
            <!-- 发送邮件成功提示 -->
            <div v-if="msg.success" class="success-msg">
              {{ msg.success }}
            </div>
            <div v-if="msg.fail" class="cs-fail-msg">
              <p>{{ msg.fail }}</p>
            </div>
            <cup-button block type="primary" @click="submitForm('form')"
              >REST</cup-button
            >
            <div v-if="source != 'email'" class="tips">
              Remember your password?
              <a class="cs-link-text" @click="toSignIn">Back to sign in</a>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import loginMixin from './loginMixin'
export default {
  name: 'Reset',
  mixins: [loginMixin],
  data() {
    return {
      source: '',
    }
  },
  created() {
    // 页面来源
    this.source = this.$route.query.source
  },
}
</script>
<style lang="scss" scoped>
.pc-forget {
  &-wrap {
    padding: 0 16px;
    p.tit {
      font-size: 18px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 23px;
      letter-spacing: 1px;
      padding: 40px 0;
      text-align: center;
    }
    .cs-fail-msg {
      margin-top: 40px;
      & + .cs-button {
        margin-top: 16px;
      }
    }
  }
  &.pc {
    @include backgroundImage('icon-login-bg');
    height: 780px;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .pc-forget-wrap {
      width: 516px;
      height: 600px;
      background: #ffffff;
      padding: 0 68px;
      p.tit {
        font-size: 30px;
        @include font($fontMuliBold);
        color: #333333;
        line-height: 38px;
        letter-spacing: 2px;
        padding-top: 128px;
        padding-bottom: 80px;
        text-align: center;
      }
    }
  }
  .tips {
    font-size: 12px;
    font-family: Muli-Regular_Light, Muli;
    font-weight: normal;
    color: #999999;
    line-height: 15px;
    margin-top: 16px;
    text-align: center;
    a {
      font-family: Muli-Regular_Light, Muli;
    }
  }
  .success-msg {
    margin-top: 40px;
    height: 30px;
    background: rgba(13, 153, 0, 0.15);
    color: #0d9900;
    padding: 0 12px;
    line-height: 30px;
    & + .cs-button {
      margin-top: 16px;
    }
  }
}
.pass-confirm {
  padding-top: 16px;
}
.cs-button {
  margin-top: 60px;
}
.mobile {
  .cs-button {
    margin-top: 40px;
  }
  .success-msg {
    margin-top: 24px;
  }
  .cs-fail-msg {
    margin-top: 24px;
    & + .cs-button {
      margin-top: 16px;
    }
  }
}
</style>
