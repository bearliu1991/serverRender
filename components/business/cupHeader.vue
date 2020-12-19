<template>
  <div>
    <cup-topbar
      v-if="topBarShow"
      :announcement-bar="announcementBar"
      :bar-height="$store.state.terminal === 'pc' ? 40 : 30"
      @hideBar="hideBar"
    ></cup-topbar>
    <div v-if="$store.state.terminal === 'pc'" class="header_pc">
      <div class="cupshe_header" :style="{ top: cupTopBarHeight + 'px' }">
        <div ref="nav" class="nav">
          <div class="cupshe_logo icon_cupshe_logo"></div>
          <cup-nav
            v-if="navList"
            :nav-list="navList.pcNavigationMenu"
          ></cup-nav>
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
            <span @click="showSeach"><i class="icon_24 icon_search"></i></span>
            <span><i class="icon_24 icon_account"></i></span>
            <span class="shopping_bag">
              <i class="icon_24 icon_shopping_bag"></i>
              <b class="shopping_count">21</b>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="header_m">
      <div class="cupshe_header" :style="{ top: cupTopBarHeight + 'px' }">
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
              <b class="shopping_count">21</b>
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
            :size="'85%'"
            :show-close="false"
            :with-header="false"
            @close-popup="closePopup"
          >
            <cup-nav-m :nav-list="navList.mobileNavigationMenu"></cup-nav-m>
          </cup-popup>
        </div>
      </div>
    </div>
    <cup-search ref="searchCom"></cup-search>
  </div>
</template>

<script>
// import mock from '../../mock/ navigation'
export default {
  data() {
    return {
      visible: false,
      navList: [],
      hideNav: false,
      announcementBar: {},
      cupTopBarHeight: 0,
      topBarShow: false,
      hideBarFlag: false,
    }
  },
  watch: {
    cupTopBarHeight: {
      immediate: false,
      handler() {
        this.$nextTick(() => {
          const navHeight = this.$refs.nav.clientHeight
          this.$store.commit(
            'SET_CONTENT_MARGIN_TOP',
            navHeight + this.cupTopBarHeight
          )
        })
      },
    },
  },
  created() {
    this.queryNavData()
  },
  mounted() {
    window.addEventListener('scroll', () => {
      const top = document.documentElement.scrollTop || document.body.scrollTop
      try {
        if (!this.announcementBar.fixed && !this.hideBarFlag) {
          this.topBarShow = !(top > 0)
          this.cupTopBarHeight =
            top > 0 ? 0 : this.$store.state.terminal === 'pc' ? 40 : 30
        }
      } catch (error) {}
    })
  },
  methods: {
    closePopup() {
      this.visible = false
    },
    async queryNavData() {
      const res = await this.$api.homePage.homePageData()
      this.navList = res.navigation
      this.announcementBar = res.announcementBar
      this.topBarShow = this.announcementBar && this.announcementBar.enable
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
