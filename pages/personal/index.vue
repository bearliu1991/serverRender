<template>
  <div class="cs-account">
    <!-- 用户信息 -->
    <div class="cs-account-card">
      <h1>ACCOUNT DETAILS</h1>
      <header>
        <p>PERSONAL INFORMATION</p>
      </header>
      <section>
        <div class="flex">
          <label>USER NAME:</label>
          <p>{{ loginInfo.customerName }}</p>
          <i class="icon iconfont icon12-bianji" @click="isModify = true"></i>
        </div>
        <div class="flex">
          <label>Email:</label>
          <p class="flex-1">{{ loginInfo.email }}</p>
        </div>
      </section>
    </div>
    <!-- myOrder -->
    <div class="cs-account-card">
      <header>
        <p>MY ORDERS</p>
      </header>
      <section>
        <div class="flex">
          <p class="flex-1">You haven't placed any order yet.</p>
        </div>
        <cup-button block>SHOP NOW</cup-button>
      </section>
    </div>
    <!-- address -->
    <div class="cs-account-card">
      <header>
        <p>ADDRESS BOOK</p>
      </header>
      <section>
        <div class="flex">
          <p class="flex-1">No addresses are currently saved.</p>
        </div>
        <cup-button block>ADD AN ADDRESS</cup-button>
      </section>
    </div>
    <cup-dialog :visible.sync="isModify">
      <el-form ref="accountForm" :model="accountForm">
        <el-form-item>
          <el-input
            v-model="accountForm.customerName"
            class="cup-input"
            type="text"
            placeholder="User name"
            :rules="[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            ]"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <cup-button block type="primary" @click="toModify('accountForm')"
            >OK</cup-button
          >
        </el-form-item>
      </el-form>
    </cup-dialog>
  </div>
</template>
<script>
import personalMixin from './personalMixin'
export default {
  name: 'Account',
  mixins: [personalMixin],
}
</script>
<style lang="scss" scoped>
$font14: 14px;
$font12: 12px;
.cs-account {
  &-card {
    background: #ffffff;
    padding: 40px 16px;
    margin-bottom: 12px;
    h1 {
      font-size: 18px;
      @include font($fontMuliBold);
      margin-bottom: 32px;
      text-align: center;
    }
    header {
      border-bottom: 1px solid #f7f7f7;
      padding-bottom: 16px;
      font-size: $font14;
      @include font($fontMuliBold);
    }
    section {
      padding-top: 16px;
      .flex {
        display: flex;
        label {
          font-size: $font12;
          margin-right: 8px;
          @include font($fontMuliBold);
        }
        .flex-1 {
          flex: 1;
        }
        i {
          font-size: 12px;
        }
      }
      .cs-button {
        margin-top: 24px;
      }
    }
  }
}
.el-form-item {
  margin-bottom: 16px;
}
</style>
