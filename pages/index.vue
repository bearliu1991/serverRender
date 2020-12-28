<template>
  <div style="overflow: hidden;">
    <div v-if="$store.state.terminal === 'pc'" class="pc-index">
      <!-- <cup-header :child-obj="homeData"></cup-header> -->
      <cup-banner :child-obj="homeData.slideshow"></cup-banner>
      <div class="content-wrap">
        <cup-category :child-obj="homeData.shopByCategory"></cup-category>
        <cup-collection :child-obj="homeData.collectionList"></cup-collection>
      </div>
      <cup-rich-text :child-obj="homeData.richTextWithImage"></cup-rich-text>
      <div class="scond-part">
        <cup-shop-now></cup-shop-now>
        <cup-find-us :child-obj="homeData.ins"></cup-find-us>
      </div>

      <!-- <cup-footer :child-obj="homeData.footer"></cup-footer> -->
    </div>
    <div v-else class="mobile-index">
      <!-- <cup-header :child-obj="homeData"></cup-header> -->
      <cup-banner :child-obj="homeData.slideshow"></cup-banner>
      <!-- {{ popup }} -->
      <div class="content-wrap">
        <cup-category :child-obj="homeData.shopByCategory"></cup-category>
        <cup-collection :child-obj="homeData.collectionList"></cup-collection>
      </div>
      <cup-rich-text :child-obj="homeData.richTextWithImage"></cup-rich-text>
      <div class="scond-part">
        <cup-shop-now></cup-shop-now>
        <cup-find-us :child-obj="homeData.ins"></cup-find-us>
      </div>
      <!-- <cup-footer :child-obj="homeData.footer"></cup-footer> -->
    </div>
    <pop-wrap :visible.sync="popVisible">
      <cup-subcribe
        :child-obj="homeData.slideshow"
        @showPop="popVisible = false"
      ></cup-subcribe>
    </pop-wrap>
    <div
      class="fix-bottom fix-icon"
      :class="[!$store.state.terminal === 'pc' && 'mobile-icon']"
      :style="{ bottom: isBackTopShow ? '0.94rem' : '0.4rem' }"
    ></div>
    <el-backtop
      style="right: 0.24rem; bottom: 0.4rem;"
      :class="[!$store.state.terminal === 'pc' && 'mobile-icon']"
    >
      <div
        id="back-to-top"
        class="back-top"
        :class="[!$store.state.terminal === 'pc' && 'mobile-icon']"
      ></div>
    </el-backtop>
    <cup-siderbar @showPop="popVisible = !popVisible"></cup-siderbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popVisible: false,
      isBackTopShow: false,
    }
  },
  computed: {
    homeData() {
      return this.$store.state.homePageInfo
    },
  },
  watch: {
    homeData(newVal) {
      if (newVal.popup) {
        if (newVal.popup.showOnce) {
          if (!window.localStorage.getItem('isOnceShowed')) {
            window.localStorage.setItem('isOnceShowed', 1)
            if (newVal.popup.showVisitor) {
              !this.isLogin && (this.popVisible = true)
            } else {
              this.popVisible = true
            }
          }
        } else {
          if (newVal.popup.showVisitor) {
            !this.isLogin && (this.popVisible = true)
          } else {
            this.popVisible = true
          }
        }
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.windowScroll)
  },
  methods: {
    getCss(element, attr) {
      if (!element) return false
      if (window.getComputedStyle) {
        return attr
          ? window.getComputedStyle(element, null)[attr]
          : window.getComputedStyle(element, null)
      }
      return attr ? element.currentStyle[attr] : element.currentStyle
    },
    windowScroll() {
      this.$nextTick(() => {
        const ele = document.getElementById('back-to-top')
        this.isBackTopShow = !ele ? false : !!this.getCss(ele, 'display')
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.pc-index {
  .content-wrap {
    padding: 0 56px;
  }
  .scond-part {
    padding: 0 208px;
  }
}
.mobile-index {
  .content-wrap {
    padding: 0 16px;
  }
  .scond-part {
    padding: 0 16px;
  }
}
.fix-bottom {
  margin-top: 10px;
  @include backgroundImage('chat');
}
.back-top {
  width: 52px;
  height: 52px;
  background-size: 52px 52px;
  cursor: pointer;
  @include backgroundImage('top');
  &.mobile-icon {
    width: 40px;
    height: 40px;
    background-size: 40px 40px;
  }
}
.fix-icon {
  position: fixed;
  z-index: 100;
  bottom: 90px;
  right: 24px;
  width: 52px;
  height: 52px;
  background-size: 52px 52px;
  cursor: pointer;
  &.mobile-icon {
    width: 40px;
    height: 40px;
    background-size: 40px 40px;
  }
}
::v-deep .el-backtop {
  box-shadow: none;
  width: 52px;
  height: 52px;
  background: none;
  border-radius: 0;
  &.mobile-icon {
    width: 40px;
    height: 40px;
  }
}
</style>
