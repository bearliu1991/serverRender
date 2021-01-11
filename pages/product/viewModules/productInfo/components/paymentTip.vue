<template>
  <div>
    <cup-dialog v-bind="$attrs" v-on="$listeners" class="cs-paymentTip">
      <header>
        <i class="icon-afterPay"></i>
        <p class="bold">SHOP NOW · PAY LATER</p>
        <p class="">ALWAYS INTEREST-FREE</p>
      </header>
      <ul>
        <li>
          <div class="icon-group">
            <i class="icon iconfont icon1"></i>
          </div>
          <span>Add your favourites to cart</span>
        </li>
        <li>
          <div class="icon-group">
            <i class="icon iconfont icon2"></i>
          </div>
          <span>Select Afterpay at checkout</span>
        </li>
        <li>
          <div class="icon-group">
            <i class="icon iconfont icon3"></i>
          </div>
          <span
            >Log into or create your Afterpay account, with instant approval
            decision.</span
          >
        </li>
        <li>
          <div class="icon-group">
            <i class="icon iconfont icon4"></i>
          </div>
          <span
            >Your purchase will be split into 4 payments, payable every 2
            weeks.</span
          >
        </li>
      </ul>
      <footer>
        <p>
          <span>
            All you need to apply is to have a debit or credit card, to be over
            18 years of age, and to be a resident of Australia or New Zealand.
          </span>
          <span>
            Late fees and additional eligibillity criteria apply. The frist
            payment may be due at the time of purchase. For complete terms visit
            afterpay.com/terms
          </span>
        </p>
      </footer>
    </cup-dialog>
  </div>
</template>
<style lang="scss" scoped>
.cs-paymentTip {
  &.pc {
    /deep/.cs-dialog_body {
      padding-left: 40px;
      padding-right: 40px;
    }
  }
  header {
    text-align: center;
    .icon-afterPay {
      margin-bottom: 10px;
      @include icon-image('afterpay');
      width: 180px;
      height: 36px;
    }
    p {
      color: #333333;
      letter-spacing: 1px;
      &.bold {
        margin-bottom: 10px;
        line-height: 23px;
        font-size: 18px;
        font-family: Muli-Bold, Muli;
        font-weight: bold;
      }
    }
  }
  ul {
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 20px;
    li {
      width: 140px;
      flex-shrink: 0;
      text-align: center;
      margin: 30px auto 0 auto;
      .icon-group {
        width: 63px;
        height: 63px;
        margin: auto;
        border-radius: 50%;
        background: #f2f2f2;
        margin-bottom: 11px;
        i {
          font-size: 32px;
        }
      }
      span {
        font-size: 12px;
        font-family: Muli-Regular_Light, Muli;
        font-weight: normal;
        color: #000000;
        line-height: 18px;
      }
    }
    border-bottom: 1px solid #f2f2f2;
  }
  footer {
    padding: 20px 0 60px 0;
    color: #999999;
    line-height: 18px;
    text-align: center;
  }
}
.mobile {
  &.cs-paymentTip {
    header {
      .icon-afterPay {
        width: 130px;
        height: 26px;
        margin-bottom: 8px;
      }
      p.bold {
        margin-bottom: 8px;
        line-height: 18px;
        font-size: 14px;
      }
    }
    li {
      margin-top: 22px;
      width: 130px;
      .icon-group {
        width: 56px;
        height: 56px;
        margin-bottom: 6px;
      }
    }
    footer {
      padding: 16px 0 24px 0;
    }
  }
}
</style>
