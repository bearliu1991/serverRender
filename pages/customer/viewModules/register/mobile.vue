<template>
  <div class="m-register">
    <div class="m-register-wrap">
      <ul class="m-register-tab">
        <li @click="toSignIn">
          <p>SIGN IN</p>
        </li>
        <li class="active">
          <p>SIGN UP</p>
        </li>
      </ul>
      <section>
        <i class="icon-jinbi"></i>
        <span>Earn <em>300 points </em> just for signing up</span>
      </section>
      <div class="m-register-sign">
        <el-form ref="form" :model="formData" class="cup-input">
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
            class="m-register-pass"
          >
            <el-input
              v-model="formData.password"
              placeholder="Password"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 二次确认密码 -->
          <el-form-item prop="confirmPassword" class="m-register-pass">
            <el-input
              v-model="formData.confirmPassword"
              placeholder="confirm password"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 隐私协议 -->
          <el-form-item>
            <cup-checkbox v-model="isCheckedAgree">
              I agree to Cupshe
              <a class="cs-link-text">Terms & Conditions</a> and
              <a class="cs-link-text">Privacy policy</a>
            </cup-checkbox>
          </el-form-item>
          <!-- 提交 -->
          <el-form-item>
            <!-- 注册信息错误 -->
            <div v-if="msg.fail" class="cs-fail-msg">
              <p>
                {{ msg.fail }}
              </p>
            </div>
            <!-- 提交注册 -->
            <cup-button
              size="medium"
              block
              type="primary"
              @click="submitForm('form')"
              >BE A SUNCHASER</cup-button
            >
          </el-form-item>
        </el-form>
      </div>
      <!-- <div class="m-register-related">
        <p>SIGN UP AND GET REWARDS</p>
        <ul>
          <li v-for="(item, index) in menus" :key="index">
            <i :class="['icon', 'iconfont', item.icon]"></i>
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </div> -->
    </div>
  </div>
</template>
<script>
import loginMixin from '../loginMixin'
export default {
  name: 'RegisterM',
  mixins: [loginMixin],
}
</script>
<style lang="scss" scoped>
.m-register {
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
    padding: 40px 0 16px 0;
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
      margin: 40px 0;
    }
  }
  &-pass {
    padding-top: 16px;
  }
  // &-agreement {
  /deep/ .cs-checkbox {
    margin-top: 16px;
    margin-bottom: 0;
    line-height: normal;
    align-items: flex-start;
    &-text {
      font-size: 12px;
    }
    .icon_checkbox_selected,
    .icon_checkbox_border {
      width: 14px;
      height: 14px;
    }
  }
  section {
    height: 30px;
    background: #fef6e5;
    margin: 16px 8px;
    font-size: 14px;
    color: #f5a503;
    line-height: 30px;
    padding-left: 41px;
    .icon-jinbi {
      @include icon-image('icon-jinbi');
      width: 16px;
      height: 16px;
      vertical-align: middle;
    }
    em {
      @include font($fontMuliBold);
    }
  }
}
</style>
