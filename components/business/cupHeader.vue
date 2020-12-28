<template>
  <div>
    <cup-topbar
      :child-obj="homeData.announcementBar || {}"
      :bar-height="$store.state.terminal === 'pc' ? 40 : 30"
      :class="[topBarShow ? 'margin0' : 'margin40']"
      @hideBar="hideBar"
    ></cup-topbar>
    <!-- v-show="topBarShow" -->
    <div v-if="$store.state.terminal === 'pc'" class="header_pc">
      <div
        class="cupshe_header"
        :style="{ top: cupTopBarHeight / 100 + 'rem' }"
      >
        <div ref="nav" class="nav">
          <div class="cupshe_logo icon_cupshe_logo"></div>
          <cup-nav :nav-list="homeData.navigation.pcNavigationMenu"></cup-nav>
          <div class="operations">
            <span>
              <cup-dropdown>
                <i
                  :class="[
                    'icon_24',
                    'icon_language',
                    'icon_language_' + $store.state.locale,
                  ]"
                ></i>
                <cup-dropdown-menu>
                  <cup-language-select></cup-language-select>
                </cup-dropdown-menu>
              </cup-dropdown>
            </span>
            <span><i class="icon_24 icon_search"></i></span>
            <!-- @click="showSeach" -->
            <span>
              <cup-dropdown>
                <i class="icon_24 icon_account"></i>
                <cup-dropdown-menu>
                  <cup-account></cup-account>
                </cup-dropdown-menu>
              </cup-dropdown>
            </span>
            <!-- <span><i class="icon_24 icon_account"></i></span> -->
            <span
              class="shopping_bag"
              @click="$refs.smallCart.$children[0].show()"
            >
              <i class="icon_24 icon_shopping_bag"></i>
              <b class="shopping_count">{{ buyList.length }}</b>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="header_m">
      <div
        class="cupshe_header"
        :style="{ top: cupTopBarHeight / 100 + 'rem' }"
      >
        <div ref="nav" class="nav">
          <div>
            <i class="icon_more_nav" @click="visible = true"></i>
            <i class="icon_search"></i>
          </div>
          <div class="icon_cupshe_logo"></div>
          <div>
            <i class="icon_account"></i>
            <span class="shopping_bag">
              <i class="icon_shopping_bag"></i>
              <b class="shopping_count">{{ buyList.length }}</b>
            </span>
          </div>
        </div>
        <div class="navigation_pup">
          <i
            class="icon_close"
            :class="{ popShow: visible }"
            @click="closePopup"
          ></i>
          <cup-popup
            :direction="'ltr'"
            :visible="visible"
            :size="'100%'"
            :show-close="false"
            :modal="false"
            :with-header="false"
            @close-popup="closePopup"
          >
            <div slot="title" class="nav">
              <div>
                <i class="icon_more_close" @click="closePopup"></i>
                <i class="icon_search"></i>
              </div>
              <div class="icon_cupshe_logo"></div>
              <div>
                <i class="icon_account"></i>
                <span
                  class="shopping_bag"
                  @click="$refs.smallCart.$children[0].show()"
                >
                  <i class="icon_shopping_bag"></i>
                  <b class="shopping_count">21</b>
                </span>
              </div>
            </div>
            <cup-nav-m
              :nav-list="homeData.navigation.mobileNavigationMenu"
              @close="visible = false"
            ></cup-nav-m>
          </cup-popup>
        </div>
      </div>
    </div>
    <cup-search ref="searchCom"></cup-search>
    <small-cart ref="smallCart"></small-cart>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      cartVisible: false,
      visible: false,
      navList: [],
      topBarShow: false,
      hideNav: false,
      announcementBar: {},
      cupTopBarHeight: 0,
      hideBarFlag: false,
      homeData: {},
      buyList: [],
    }
  },
  computed: {
    homePageInfo() {
      return this.$store.state.homePageInfo
    },
    ...mapState([
      // 映射 this.count 为 store.state.count
      'cartData',
    ]),
  },
  watch: {
    homePageInfo: {
      handler(newVal) {
        this.homeData = JSON.parse(JSON.stringify(newVal))
        this.handleData()
      },
      deep: true,
    },
    cupTopBarHeight: {
      immediate: false,
      handler() {
        this.$nextTick(() => {
          const navHeight = this.$refs.nav.clientHeight
          this.$store.commit(
            'SET_CONTENT_MARGIN_TOP',
            this.$store.state.terminal === 'pc'
              ? navHeight + this.cupTopBarHeight
              : this.cupTopBarHeight
          )
        })
      },
    },
  },
  created() {
    this.homeData = JSON.parse(JSON.stringify(this.$store.state.homePageInfo))
    this.$store.dispatch('fetchHomePageInfo')
    this.queryCart()
  },
  mounted() {
    window.addEventListener('scroll', () => {
      const top = document.documentElement.scrollTop || document.body.scrollTop
      try {
        if (!this.homeData.announcementBar.fixed && !this.hideBarFlag) {
          this.topBarShow = !(top > 0)
          this.cupTopBarHeight =
            top > 0 ? 0 : this.$store.state.terminal === 'pc' ? 40 : 30
        }
      } catch (error) {}
    })
  },
  methods: {
    /**
     * 1、未登录时，获取浏览器缓存中数据
     * 2、已登录时，获取服务器中的数据
     */
    async queryCart() {
      if (!this.$cookies.get('token')) {
        this.buyList = this.cartData || []
      } else {
        const result = await this.$api.cart.queryCart()
        if (result) {
          const { stocks = [], outStocks = [] } = result
          this.buyList = stocks.concat(outStocks)
        }
      }
    },
    closePopup() {
      this.visible = false
    },
    handleData() {
      this.navList = this.homeData.navigation
      this.topBarShow =
        this.homeData.announcementBar && this.homeData.announcementBar.enable
      if (this.topBarShow) {
        this.cupTopBarHeight = this.$store.state.terminal === 'pc' ? 40 : 30
      }
    },
    showSeach() {
      this.$refs.searchCom.showSearch = true
    },
    hideBar() {
      this.topBarShow = false
      this.hideBarFlag = true
      this.cupTopBarHeight = 0
    },
  },
}
</script>

<style lang="scss" scoped>
.icon_more_close {
  margin-right: 15px;
}
@keyframes move {
  from {
    margin-top: 0;
  }
  to {
    margin-top: -40px;
  }
}
@keyframes moveback {
  from {
    margin-top: -40px;
  }
  to {
    margin-top: 0;
  }
}
.margin0 {
  animation: moveback 0.4s;
}
.margin40 {
  animation: move 1s;
}
.cupshe_header {
  position: fixed;
  // top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  transition: top 0.2s linear;
  background-color: #fff;
}
.header_pc {
  .nav {
    height: 109px;
    text-align: center;
    position: relative;
    border-bottom: 1px solid #f7f7f7;
    background-color: #fff;
    .icon_cupshe_logo {
      width: 180px;
      height: 49px;
      position: absolute;
      top: 31px;
      left: 56px;
      cursor: pointer;
    }
    .operations {
      position: absolute;
      top: 40px;
      right: 56px;
      > span {
        margin-left: 30px;
        cursor: pointer;
        display: inline-block;
      }
    }
  }
}

.shopping_bag {
  position: relative;
  .shopping_count {
    position: absolute;
    top: -10%;
    left: 75%;
    font-size: 14px;
    font-family: $fontRegular;
    font-weight: 400;
    color: #fff;
    line-height: 18px;
    background-color: #ffa129;
    padding: 1px 7px;
    border-radius: 9px;
  }
}
.header_m {
  .nav {
    height: 50px;
    padding: 12px 16px;
    padding-right: 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f7f7f7;
    i {
      width: 20px !important;
      height: 20px !important;
      margin-top: 3px;
    }
    .icon_more_nav {
      margin-right: 15px;
    }
    .icon_cupshe_logo {
      width: 99px;
      height: 29px;
      background-size: 100% 100%;
    }
    .icon_account {
      margin-right: 15px;
    }
    .shopping_count {
      position: relative;
      left: -10px;
      top: -10px;
      font-size: 12px;
      padding: 0 5px;
      border-radius: 7px;
    }
  }
}
.navigation_pup {
  .icon_close {
    position: absolute;
    top: 20px;
    right: 80px;
    width: 14px !important;
    height: 14px !important;
    z-index: 99999999;
    opacity: 0;
    transition: all 0.2s linear;
    &.popShow {
      right: 20px;
      opacity: 1;
    }
  }
}
</style>
