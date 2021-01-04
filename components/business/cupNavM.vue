<template>
  <div class="nav_m">
    <div v-if="!loginStatus" class="account_status">
      <i class="icon_24 icon_account"></i>
      <nuxt-link to="/customer/login" class="login_btn"
        ><span @click="$emit('close')">SIGN IN</span></nuxt-link
      >
      <span class="line"></span>
      <nuxt-link
        to="/customer/register"
        @click="$emit('close')"
        class="login_btn"
        ><span @click="$emit('close')">SIGN UP</span></nuxt-link
      >
    </div>
    <div v-else class="account_status login_success">
      <span class="account">Hi! {{ loginInfo.customerName }}</span>
      <span class="log_out" @click="logout">Log out</span>
    </div>
    <div class="nav_list">
      <el-collapse v-model="currentNav" accordion>
        <template v-for="(nav, index) in navList">
          <el-collapse-item
            v-if="nav.children.length > 0"
            :key="index"
            :title="nav.name"
            :name="index"
          >
            <div class="cs_sub_menu">
              <ul v-for="(subMenu, subIndex) in nav.children" :key="subIndex">
                <li>
                  <div class="cs_sub_menu_name">
                    <a :href="transferUrl(subMenu)">
                      <span @click="$emit('close')" v-html="subMenu.name"></span
                    ></a>
                  </div>
                  <ul v-if="subMenu.children.length > 0">
                    <li
                      v-for="(menu3, index3) in subMenu.children"
                      :key="index3"
                    >
                      <a :href="transferUrl(menu3)">
                        <span @click="$emit('close')" v-html="menu3.name"></span
                      ></a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </el-collapse-item>
          <div v-else :key="index" class="cs_nav_item" @click="clickNav(index)">
            {{ nav.name }}
          </div>
        </template>
        <el-collapse-item>
          <template slot="title">
            SHOP BY LOCATION
            <i
              :class="[
                'icon_18',
                'icon_language',
                'icon_language_' + $store.state.locale,
              ]"
            ></i>
          </template>
          <cup-language-select></cup-language-select>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="footer-icon-list">
      <a :href="item.url" v-for="(item, key) in socialSoftwareList" :key="key">
        <i :class="[item.icon]"></i
      ></a>
    </div>
  </div>
</template>

<script>
import mixins from '../../pages/indexMixin'
export default {
  mixins: [mixins],
  props: {
    navList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentNav: -1,
      socialSoftwareList: [
        {
          icon: 'icon_facebook',
          url: 'https://business.facebook.com/cupsheau/',
        },
        { icon: 'icon_pinterest', url: 'https://twitter.com/cupsheofficial' },
        { icon: 'icon_instagram', url: 'https://twitter.com/cupsheofficial' },
        { icon: 'icon_twitter', url: 'https://twitter.com/cupsheofficial' },
        { icon: 'icon_youtube', url: 'https://www.youtube.com/cupsheofficial' },
        // { icon: 'icon_snapchat', url: '' },
      ],
    }
  },
  created() {
    this.loginStatus = !!this.$cookies.get('token')
  },
  methods: {
    async logout() {
      await this.$api.customer.logout()
      this.$store.commit('SET_USERINFO', null)
      this.loginStatus = !!this.$cookies.get('token')
    },
    clickNav(index) {
      this.currentNav = index
    },
  },
}
</script>

<style lang="scss" scoped>
.footer-icon-list {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  line-height: 64px;
  background: #fff;
  margin-top: 16px;
  @include setStart();
  i {
    margin: 0 16px;
    width: 22px;
    height: 22px;
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
.nav_m {
  background: #f7f7f7;
  height: 100%;
}
.account_status {
  width: 100%;
  height: 71px;
  background-color: #fff;
  display: flex;
  padding: 23px 0 24px 16px;
  margin-bottom: 6px;
  font-size: 18px;
  font-family: Muli-Bold, Muli;
  font-weight: bold;
  color: #333333;
  line-height: 23px;
  letter-spacing: 1px;
  .icon_account {
    margin-right: 16px;
    margin-top: 1px;
  }
  .login_btn {
    border-bottom: 1px solid #333;
    padding-bottom: 1px;
    color: #333;
  }
  .line {
    width: 1px;
    height: 20px;
    background: #333333;
    margin: 3px 16px 0;
  }
  .log_out {
    font-size: 12px;
    color: #333333;
    line-height: 14px;
    text-decoration: underline;
    margin-right: 16px;
    margin-top: 4px;
    letter-spacing: 0;
  }
  &.login_success {
    justify-content: space-between;
  }
}
.cs_nav_item {
  height: 60px;
  background-color: #fff;
  line-height: 60px;
  border-bottom: 1px solid #f7f7f7;
  padding-left: 16px;
  font-size: 14px;
  font-family: Muli-Bold, Muli;
  font-weight: bold;
  color: #333333;
  letter-spacing: 1px;
}
.nav_list /deep/ .el-collapse {
  .el-collapse-item {
    &.is-active {
      .el-collapse-item__header {
        background-color: #f2f2f2;
      }
      .el-collapse-item__arrow {
        color: #333;
        transform: rotate(270deg) !important;
      }
    }
    &__header {
      padding-left: 16px;
      font-size: 14px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 18px;
      letter-spacing: 1px;
    }
    &__content {
      padding-bottom: 0;
    }
    &__arrow {
      transform: rotate(90deg);
      color: #999;
    }
  }
}
.cs {
  &_sub_menu {
    padding: 16px 0;
    background-color: #fafafa;
    > ul li {
      .cs_sub_menu_name,
      ul > li {
        height: 40px;
        font-size: 14px;
        color: #333333 !important;
        line-height: 40px;
        padding-left: 16px;
      }
      .cs_sub_menu_name {
        font-family: Muli-Bold, Muli;
        font-weight: bold;
      }
    }
  }
}
.icon_18 {
  width: 18px !important;
  height: 18px !important;
  margin-left: 10px;
}
</style>
