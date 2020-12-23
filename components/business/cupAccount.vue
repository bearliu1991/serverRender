<template>
  <div class="language_select">
    <template v-if="isLogin">
      <p>Hi, AMY Allen</p>
      <div class="split-line"></div>
      <ul>
        <li>
          <a href="/home">Account Details</a>
        </li>
        <li>
          <a href="/home">My Orders</a>
        </li>
        <li>
          <a href="/home">Address Book</a>
        </li>
        <li>
          <a href="/home">Address Book</a>
        </li>
      </ul>
      <div class="split-line"></div>
      <ul>
        <li class="log-out"><span>Log out</span></li>
      </ul>
    </template>
    <template v-else>
      <cup-button>SIGN IN </cup-button>
      <span class="remind">Don't have an account? <a>Sign In</a></span>
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
  methods: {},
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
    margin-top: 10px;
    width: 250px;
    height: 36px;
    line-height: 36px;
    background: #000;
    color: #fff;
    margin-bottom: 10px;
  }
  .remind {
    font-size: 12px;
    color: #000;
    a {
      border-bottom: 1px solid #000;
    }
  }
}
</style>
