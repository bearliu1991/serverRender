<template>
  <div>
    <div v-if="$store.state.terminal === 'pc'" class="pc-footer-content">
      <div class="pc-footer-top">
        <div class="pc-footer-top-left">
          <div>
            <p class="pc-footer-title">COMPANY INFO</p>
            <ul class="pc-footer-list">
              <li>About Us</li>
              <li>Affiliate</li>
              <li>Wholesale</li>
            </ul>
          </div>
          <div>
            <p class="pc-footer-title">SERVICE CENTER</p>
            <ul class="pc-footer-list">
              <li>Returns</li>
              <li>Contact Us</li>
              <li>Delivery</li>
              <li>Order Tracker</li>
              <li>Size Measurement</li>
            </ul>
          </div>
          <div>
            <p class="pc-footer-title">QUICK LINKS</p>
            <ul class="pc-footer-list">
              <li>Blog</li>
              <li>Refer a Friend</li>
              <li>Sign up for Texts</li>
              <li>Sunchasers Club</li>
              <li>Student Discount</li>
            </ul>
          </div>
        </div>
        <div class="pc-footer-top-center">
          <p class="pc-footer-title">APPS</p>
          <ul>
            <li>
              <i class="icon_app_store"></i>
            </li>
            <li>
              <i class="icon_google_play"></i>
            </li>
          </ul>
        </div>
        <div class="pc-footer-top-right">
          <p class="pc-footer-title">SUBSCRIBE & GET 10% OFF</p>
          <p class="pc-footer-top-text">On your first order over $75</p>
          <div class="pc-footer-input">
            <input type="email" placeholder="Enter your email address" />
            <button>SUBSCRIBE</button>
          </div>
          <div class="pc-footer-icon-list">
            <i class="icon_facebook"></i>
            <i class="icon_pinterest"></i>
            <i class="icon_instagram"></i>
            <i class="icon_twitter"></i>
            <i class="icon_youtube"></i>
            <i class="icon_snapchat"></i>
          </div>
        </div>
      </div>
      <div class="pc-footer-bottom">
        <div class="pc-footer-bottom-left">
          <p>Cupshe©2020</p>
          <img :src="protectedDmca" alt="" />
        </div>
        <p class="pc-footer-bottom-center">
          See our <a href=""> terms of use</a> and <a href="">privacy policy</a>
        </p>
        <div class="pc-footer-bottom-right">
          <i class="icon_card-visa"></i>
          <i class="icon_card-master"></i>
          <i class="icon_card-pay-pal"></i>
          <i class="icon_card-google-pay"></i>
          <i class="icon_card-afterpay"></i>
          <i class="icon_card-pay"></i>
          <i class="icon_card-amex"></i>
          <i class="icon_card-gift"></i>
        </div>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import protectedDmca from './../../assets/images/protected_dmca.png'
export default {
  data() {
    return {
      protectedDmca,
    }
  },
}
</script>

<style lang="scss">
.pc-footer-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 425px;
  background: #fafafa;
  padding: 72px 132px 34px;
}
.pc-footer-top {
  display: flex;
  justify-content: space-between;
  .pc-footer-top-left {
    display: flex;
    width: 680px;
    justify-content: space-between;
  }
  .pc-footer-top-center {
    width: 200px;
    ul {
      li {
        font-size: 0;
      }
    }
    .icon_app_store {
      @include icon-image('icon_app_store');
      width: 114px;
      height: 34px;
      background-size: contain;
      margin-bottom: 20px;
    }
    .icon_google_play {
      @include icon-image('icon_google_play');
      width: 114px;
      height: 34px;
      background-size: contain;
    }
  }
  .pc-footer-top-right {
    width: 420px;
    .pc-footer-top-text {
      font-size: 16px;
      font-family: Muli-Regular_Light, Muli;
      font-weight: normal;
      color: #666666;
      line-height: 20px;
      margin-bottom: 20px;
    }
    .pc-footer-input {
      display: flex;
      input {
        outline-style: none;
        width: 310px;
        height: 54px;
        background: #ffffff;
        border: 1px solid #999999;
        border-right: none;
        padding: 12px 14px;
        font-size: 18px;
      }
      button {
        height: 54px;
        width: 128px;
        border: 1px solid #999999;
        color: #ffffff;
        background: #000000;
        cursor: pointer;
        font-size: 14px;
        font-family: Muli-Bold, Muli;
        font-weight: bold;
        color: #ffffff;
        line-height: 18px;
        letter-spacing: 1px;
        &:focus {
          outline: 0;
        }
      }
    }
    .pc-footer-icon-list {
      margin-top: 16px;
      i {
        margin-right: 30px;
      }
      .icon_facebook {
        @include icon-image('icon_facebook');
      }
      .icon_pinterest {
        @include icon-image('icon_pinterest');
      }
      .icon_instagram {
        @include icon-image('icon_instagram');
      }
      .icon_twitter {
        @include icon-image('icon_twitter');
      }
      .icon_youtube {
        @include icon-image('icon_youtube');
      }
      .icon_snapchat {
        @include icon-image('icon_snapchat');
      }
    }
  }
}
.pc-footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .pc-footer-bottom-left {
    display: flex;
    align-items: center;
    p {
      font-size: 14px;
      font-family: Muli-Regular_Light, Muli;
      font-weight: normal;
      color: #333333;
      line-height: 18px;
      margin-right: 12px;
    }
    img {
      width: auto;
      height: 22px;
    }
  }
  .pc-footer-bottom-center {
    font-size: 14px;
    font-family: Muli-Regular_Light, Muli;
    font-weight: normal;
    color: #333333;
    line-height: 18px;
    a {
      text-decoration: underline;
      color: #333333;
    }
  }
  .pc-footer-bottom-right {
    font-size: 0;
    i {
      margin-left: 20px;
    }
    .icon_card-visa {
      width: 38px;
      height: 24px;
      background-size: contain;
    }
    .icon_card-master {
      width: 38px;
      height: 24px;
      background-size: contain;
    }
    .icon_card-pay-pal {
      width: 38px;
      height: 24px;
      background-size: contain;
    }
    .icon_card-google-pay {
      width: 38px;
      height: 24px;
      background-size: contain;
    }
    .icon_card-afterpay {
      width: 63px;
      height: 24px;
      background-size: contain;
    }
    .icon_card-pay {
      width: 38px;
      height: 24px;
      background-size: contain;
    }
    .icon_card-amex {
      width: 38px;
      height: 24px;
      background-size: contain;
    }
    .icon_card-gift {
      @include icon-image('icon_card-gift');
      width: 38px;
      height: 24px;
      background-size: contain;
    }
  }
}
.pc-footer-title {
  font-size: 16px;
  font-family: Muli-Bold, Muli;
  font-weight: bold;
  color: #333333;
  line-height: 20px;
  letter-spacing: 1px;
  margin-bottom: 20px;
}
.pc-footer-list {
  li {
    font-size: 14px;
    font-family: Muli-Regular_Light, Muli;
    font-weight: normal;
    color: #666;
    line-height: 18px;
    margin-bottom: 10px;
  }
}
</style>
