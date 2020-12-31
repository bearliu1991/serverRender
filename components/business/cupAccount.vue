<template>
  <div class="language_select">
    <template v-if="isLogin">
      <p>Hi, {{ loginInfo.customerName }}</p>
      <div class="split-line"></div>
      <ul>
        <li>
          <a href="/personal">Account Details</a>
        </li>
        <li>
          <a href="/personal/orderList">My Orders</a>
        </li>
        <li>
          <a href="/personal/address">Address Book</a>
        </li>
      </ul>
      <div class="split-line"></div>
      <ul>
        <li class="log-out" @click="logout"><span>Log out</span></li>
      </ul>
    </template>
    <template v-else>
      <nuxt-link to="/customer/login">
        <cup-button>SIGN IN </cup-button></nuxt-link
      >

      <span class="remind"
        >Don't have an account?
        <span @click="$emit('closePop')"
          ><nuxt-link to="/customer/register">Sign Up</nuxt-link></span
        ></span
      >
    </template>
  </div>
</template>

<script>
import mixins from '../../pages/indexMixin'
export default {
  mixins: [mixins],
  data() {
    return {}
  },
  methods: {
    signInClick() {
      this.$emit('closePop')
      this.$router.push('/customer/login')
    },
    async logout() {
      await this.$api.customer.logout()
      this.$store.commit('SET_USERINFO', null)
      window.location.reload()
    },
  },
}
</script>

<style lang="scss" scoped>
.language_select {
  padding: 16px 10px;
  p {
    line-height: 40px;
    font-family: Muli Bold;
    font-weight: bold;
    font-size: 14px;
    text-align: left;
  }
  .split-line {
    border-bottom: 1px solid #f7f7f7;
    margin: 10px 0;
  }
  ul {
    &.second-child {
      padding: 10px 0;
    }
    li {
      margin-top: 0;
      text-align: left;
      font-family: $fontRegular;
      font-weight: lighter;
      font-size: 14px;
      line-height: 40px;
      display: flex;
      color: #333;
      &:hover {
        font-weight: bold;
      }
      &.log-out {
        line-height: 18px;
        span {
          border-bottom: 1px solid #333;
        }
      }
    }
    a {
      color: #333;
    }
  }
  .cs-button {
    display: block;
    margin: 10px auto;
    width: 250px;
    height: 36px;
    line-height: 36px;
    background: #000;
    color: #fff;
  }
  .remind {
    font-size: 12px;
    color: #000;
    white-space: nowrap;
    word-break: keep-all;
    a {
      border-bottom: 1px solid #000;
    }
  }
}
</style>
