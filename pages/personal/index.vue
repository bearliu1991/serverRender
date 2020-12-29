<template>
  <div :class="['cs-account', terminal]">
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
        <div class="flex mart">
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
          <p v-if="orderNum == 0" class="flex-1">
            You haven't placed any order yet.
          </p>
          <p v-else>
            You placed <em>{{ orderNum }}} orders</em> here.
          </p>
        </div>
        <nuxt-link to="/personal/orderList"
          ><cup-button :block="terminal == 'mobile'">
            SHOP NOW
          </cup-button></nuxt-link
        >
      </section>
    </div>
    <!-- address -->
    <div class="cs-account-card">
      <header>
        <p>ADDRESS BOOK</p>
      </header>
      <section>
        <div class="flex">
          <p v-if="addressList.length == 0" class="flex-1">
            No addresses are currently saved.
          </p>
          <address v-else>
            <p class="name">
              <b>{{
                addressList[0].firstName + ' ' + addressList[0].lastName
              }}</b>
            </p>
            <p>{{ addressList[0].company }}</p>
            <p>{{ addressList[0].addressFirst }}</p>

            <p>{{ addressList[0].addressSecond }}</p>

            <p>{{ addressList[0].postcode }}</p>

            <p>{{ addressList[0].city }}</p>

            <p>{{ addressList[0].country }}</p>

            <p>{{ addressList[0].telephone }}</p>
          </address>
        </div>
        <nuxt-link to="/personal/address"
          ><cup-button :block="terminal == 'mobile'"
            >ADD AN ADDRESS</cup-button
          ></nuxt-link
        >
      </section>
    </div>
    <cup-dialog v-if="isModify" :visible.sync="isModify">
      <el-form ref="accountForm" :model="accountForm">
        <el-form-item :rules="userRule" prop="customerName">
          <el-input
            v-model="accountForm.customerName"
            class="cup-input"
            type="text"
            max-length="32"
            placeholder="User name"
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
  layout: 'personal',
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
        align-items: center;
        label {
          font-size: $font12;
          margin-right: 8px;
          @include font($fontMuliBold);
        }
        p {
          font-size: 14px;
          line-height: 18px;
          &.flex-1 {
            flex: 1;
          }
        }

        i {
          font-size: 13px;
          margin-left: 8px;
        }
        &.mart {
          margin-top: 18px;
        }
      }

      .cs-button {
        margin-top: 24px;
      }
    }
  }
  address {
    p {
      font-size: 14px;
      line-height: 18px;
      margin-bottom: 12px;
      &:first-child {
        @include font($fontMuliBold);
      }
    }
  }
}

.el-form-item {
  margin-bottom: 16px;
  .cs-button {
    margin-top: 10px;
  }
}
.pc {
  &.cs-account {
    h1 {
      text-align: left;
      font-size: 30px;
      line-height: 38px;
      letter-spacing: 1px;
    }
    .cs-account {
      &-card {
        header {
          font-size: 18px;
          line-height: 23px;
          letter-spacing: 1px;
        }
        .flex {
          p {
            font-size: 14px;
            em {
              @include font($fontMuliBold);
            }
          }
        }
        /deep/.cs-button {
          min-width: 216px;
          span {
            font-size: 14px;
          }
        }
      }
    }
    address {
      p {
        font-size: 14px;
        line-height: 18px;
        margin-bottom: 10px;
        &:first-child {
          @include font($fontMuliBold);
        }
        &:last-child {
          margin-bottom: 16px;
        }
      }
    }
  }
  /deep/.cs-dialog {
    &_header {
      height: 50px;
      line-height: 50px;
      align-items: center;
    }
    &_icon {
      line-height: normal;
      font-size: 14px;
    }
    &-wrapper {
      position: relative;
      width: 440px;
    }
  }
  .el-form-item {
    margin-bottom: 24px;
    .cs-button {
      margin-top: 16px;
    }
  }
}
</style>
