<template>
  <div>
    <div v-if="$store.state.terminal === 'pc'" class="pc-footer footer-content">
      <div class="footer-top">
        <div class="footer-top-left">
          <div v-for="(item, key) in footerObj.navigationMenu" :key="key">
            <p class="footer-title">{{ item.name }}</p>
            <ul class="footer-list">
              <li v-for="(n, idx) in item.children" :key="idx">
                <a :href="transferUrl(n)">{{ n.name }}</a>
              </li>
            </ul>
          </div>
          <div class="footer-top-center">
            <p class="footer-title">APPS</p>
            <ul class="footer-apps-ul">
              <li>
                <a
                  href="https://apps.apple.com/app/cupshe-shopping-online/id1177423676"
                  ><i class="icon_app_store"></i
                ></a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.cupshe.cupshe"
                  ><i class="icon_google_play"></i
                ></a>
              </li>
            </ul>
          </div>
          <div class="footer-top-right">
            <p class="footer-title">{{ footerObj.heading }}</p>
            <p class="footer-top-text">{{ footerObj.subheading }}</p>
            <div class="footer-input">
              <input type="email" :placeholder="footerObj.inputText" />
              <button>{{ footerObj.buttonText }}</button>
            </div>
            <div class="footer-icon-list">
              <a
                :href="item.url"
                v-for="(item, key) in socialSoftwareList"
                :key="key"
              >
                <i :class="[item.icon]"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-bottom-left">
          <p>Cupshe©2020</p>
          <img :src="protectedDmca" alt="" />
        </div>
        <p class="footer-bottom-center">
          See our <a href=""> terms of use</a> and <a href="">privacy policy</a>
        </p>
        <div class="footer-bottom-right">
          <a :href="item.url" v-for="(item, key) in payIconList" :key="key">
            <i :class="[item.icon]"></i>
          </a>
        </div>
      </div>
    </div>
    <div v-else class="mobile-footer footer-content">
      <div class="footer-top-right">
        <template>
          <p class="footer-title">{{ footerObj.heading }}</p>
          <p class="footer-top-text">{{ footerObj.subheading }}</p>
          <div class="footer-input">
            <input type="email" :placeholder="footerObj.inputText" />
            <button>{{ footerObj.buttonText }}</button>
          </div>
        </template>
        <!-- <template>
          <div class="footer-subscribe-success">
            <p>{{successfulText}}!</p>
            <p>Please check your email for 10% off coupon code.</p>
          </div>
        </template> -->
        <div class="footer-icon-list">
          <a
            :href="item.url"
            v-for="(item, key) in socialSoftwareList"
            :key="key"
          >
            <i :class="[item.icon]"></i
          ></a>
        </div>
      </div>
      <div class="footer-top">
        <div class="footer-top-left">
          <el-collapse v-model="currentNav" accordion>
            <el-collapse-item
              v-for="(item, index) in footerObj.navigationMenu"
              :key="index"
              :title="item.name"
              :name="index"
            >
              <div
                class="second-item"
                v-for="(n, idx) in item.children"
                :key="idx"
              >
                <a :href="transferUrl(n)">{{ n.name }}</a>
              </div>
            </el-collapse-item>
          </el-collapse>
          <div class="footer-top-center">
            <p class="footer-title">APPS</p>
            <ul class="footer-apps-ul">
              <li>
                <a
                  href="https://apps.apple.com/app/cupshe-shopping-online/id1177423676"
                  ><i class="icon_app_store"></i
                ></a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.cupshe.cupshe"
                  ><i class="icon_google_play"></i
                ></a>
              </li>
            </ul>
            <div class="footer-bottom-right">
              <a :href="item.url" v-for="(item, key) in payIconList" :key="key">
                <i :class="[item.icon]"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-bottom-left">
          <p>Cupshe©2020</p>
          <img :src="protectedDmca" alt="" />
        </div>
        <p class="footer-bottom-center">
          See our <a href=""> terms of use</a> and <a href="">privacy policy</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from '../../pages/indexMixin'

import protectedDmca from './../../assets/images/protected_dmca.png'
export default {
  mixins: [mixins],
  data() {
    return {
      protectedDmca,
      textList: [
        {
          title: 'COMPANY INFO',
          content: ['About Us', 'Affiliate', 'Wholesale'],
        },
        {
          title: 'SERVICE CENTER',
          content: [
            'Returns',
            'Contact Us',
            'Delivery',
            'Order Tracker',
            'Size Measurement',
          ],
        },
        {
          title: 'QUICK LINKS',
          content: [
            'Blog',
            'Refer a Friend',
            'Sign up for Texts',
            'Sunchasers Club',
            'Student Discount',
          ],
        },
      ],
      socialSoftwareList: [
        {
          icon: 'icon_facebook',
          url: 'https://business.facebook.com/cupsheau/',
        },
        { icon: 'icon_pinterest', url: 'https://www.pinterest.com/CUPSHE/' },
        {
          icon: 'icon_instagram',
          url: 'https://www.instagram.com/challenge/?next=/cupshe_au/',
        },
        { icon: 'icon_twitter', url: 'https://twitter.com/cupsheofficial' },
        { icon: 'icon_youtube', url: 'https://www.youtube.com/cupsheofficial' },
        // { icon: 'icon_snapchat', url: '' },
      ],
      payIconList: [
        {
          icon: 'icon_card-visa',
          url: 'javascript:void(0);',
        },
        {
          icon: 'icon_card-master',
          url: 'javascript:void(0);',
        },
        {
          icon: 'icon_card-pay-pal',
          url: 'javascript:void(0);',
        },
        {
          icon: 'icon_card-google-pay',
          url: 'javascript:void(0);',
        },
        {
          icon: 'icon_card-afterpay',
          url: 'javascript:void(0);',
        },
        {
          icon: 'icon_card-pay',
          url: 'javascript:void(0);',
        },
        {
          icon: 'icon_card-amex',
          url: 'javascript:void(0);',
        },
        {
          icon: 'icon_card-gift',
          url: 'javascript:void(0);',
        },
      ],
      currentNav: [],
    }
  },
  computed: {
    footerObj() {
      return this.$store.state.homePageInfo.footer
    },
  },
}
</script>

<style lang="scss" scoped>
.footer-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 425px;
  background: #fafafa;
  padding: 72px 132px 32px;
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

.footer-top-center {
  width: 200px;

  ul {
    li {
      font-size: 0;
    }
  }
}

.footer-top-text {
  font-size: 16px;
  color: #666666;
  line-height: 20px;
  margin-bottom: 20px;
}

.footer-icon-list {
  margin-top: 16px;

  i {
    margin-right: 30px;
    width: 26px;
    height: 26px;
  }

  .icon_facebook {
    @include icon-image('icon_facebook', 'svg');
  }

  .icon_pinterest {
    @include icon-image('icon_pinterest', 'svg');
  }

  .icon_instagram {
    @include icon-image('icon_instagram', 'svg');
  }

  .icon_twitter {
    @include icon-image('icon_twitter', 'svg');
  }

  .icon_youtube {
    @include icon-image('icon_youtube', 'svg');
  }

  .icon_snapchat {
    @include icon-image('icon_snapchat', 'svg');
  }
}

.footer-top {
  display: flex;
  justify-content: space-between;

  .footer-top-left {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
}

.footer-bottom-left {
  display: flex;
  align-items: center;

  p {
    font-size: 14px;
    color: #333333;
    line-height: 18px;
    margin-right: 12px;
  }

  img {
    width: auto;
    height: 22px;
  }
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.footer-bottom-center {
  font-size: 14px;
  color: #333333;
  line-height: 18px;

  a {
    text-decoration: underline;
    color: #333333;
  }
}

.footer-bottom-right {
  font-size: 0;

  i {
    margin-right: 20px;
  }

  .icon_card-visa {
    width: 38px !important;
    height: 24px !important;
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

.footer-title {
  font-size: 16px;
  font-family: Muli-Bold, Muli;
  font-weight: bold;
  color: #333333;
  line-height: 20px;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.footer-list {
  li {
    font-size: 14px;
    color: #333;
    line-height: 18px;
    margin-bottom: 16px;
  }
}

.mobile-footer {
  flex-direction: column;
  padding: 40px 16px;
  height: auto;

  > div {
    flex: 1;
  }

  .footer-icon-list {
    margin-top: 16px;

    i {
      margin-right: 24px;
    }
  }

  .footer-top-center {
    width: 100%;
  }
  .second-item {
    a {
      font-size: 14px;
      color: #333;
      margin-top: 12px;
      font-weight: lighter;
    }
  }

  .footer-title {
    font-size: 18px;
    margin-bottom: 12px;
    font-weight: bold;
  }

  .footer-top-right {
    .footer-top-text {
      margin-bottom: 20px;
      font-size: 14px;
    }
  }
  .icon_facebook {
    @include icon-image('icon_facebook', 'svg');
  }

  .icon_pinterest {
    @include icon-image('icon_pinterest', 'svg');
  }

  .icon_instagram {
    @include icon-image('icon_instagram', 'svg');
  }

  .icon_twitter {
    @include icon-image('icon_twitter', 'svg');
  }

  .icon_youtube {
    @include icon-image('icon_youtube', 'svg');
  }

  .icon_snapchat {
    @include icon-image('icon_snapchat', 'svg');
  }

  ::v-deep .el-collapse-item__header {
    height: 48px;
    line-height: 48px;
    background-color: transparent;
    border-top: 1px solid #f2f2f2;
    font-size: 18px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #333333;
    letter-spacing: 1px;
  }

  ::v-deep .el-collapse-item__content {
    padding-bottom: 10px;
    div {
      margin: 5px 0;
    }
  }

  .footer-top-left {
    flex-direction: column;
    margin-top: 40px;
    ::v-deep {
      .el-collapse-item__header {
        background-color: transparent;
        border-color: #f2f2f2;
        &:first-child {
          border-top: 1px solid #f2f2f2;
        }
      }
    }
  }

  .footer-title {
    font-size: 14px;
    margin-top: 20px;
  }

  .footer-bottom {
    flex-direction: column;
    border-top: 1px solid #f2f2f2;
    padding-top: 20px;
    padding-bottom: 24px;
    align-items: flex-start;
  }
  .footer-bottom-left {
    margin-bottom: 10px;
  }
  .footer-apps-ul {
    display: flex;
    justify-content: flex-start;

    li {
      margin-right: 16px;
      width: 114px;
      height: 34px;
    }
  }
  .footer-subscribe-success {
    color: #00bf06;
    line-height: 18px;
    padding-top: 16px;
    padding-bottom: 12px;
  }
  .footer-bottom-right {
    margin-top: 20px;
    padding-top: 24px;
    padding-bottom: 24px;
    border-top: 1px solid #f2f2f2;

    i {
      margin-right: 12px;
      margin-left: 0;
      margin-bottom: 12px;
      i {
        width: 38px;
        height: 24px;
      }
    }
  }
}

.footer-input {
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

.pc-footer {
}

.mobile-footer {
  input {
    width: 223px;
    height: 44px;
  }

  button {
    width: 120px;
    height: 44px;
  }
}
</style>
