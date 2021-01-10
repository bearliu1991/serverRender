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
    <div
      class="fix-bottom fix-icon cup-fix-move"
      :class="[!isPc && 'mobile-icon']"
      :style="isPc ? bottomPc : bottomM"
    ></div>
    <cup-backtop
      :bottom="isPc ? 40 : 16"
      :right="isPc ? 24 : 16"
      @showIcon="showIcon"
    >
      <div class="back-top" :class="[!isPc && 'mobile-icon']"></div>
    </cup-backtop>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isBackShow: false,
      bottomPc: {},
      bottomM: {},
    }
  },
  computed: {
    homeData() {
      return this.$store.state.homePageInfo
    },
    isPc() {
      return this.$store.state.terminal === 'pc'
    },
  },
  watch: {
    isBackShow(newVal) {
      this.bottomPc = {
        bottom: newVal ? '0.94rem' : '0.4rem',
        right: '0.24rem',
      }
      this.bottomM = {
        bottom: newVal ? '0.68rem' : '0.16rem',
        right: '0.16rem',
      }
    },
  },
  mounted() {
    // window.addEventListener('scroll', this.windowScroll)
  },
  methods: {
    showIcon(isShow) {
      this.isBackShow = isShow
    },
    getCss(element, attr) {
      if (!element) return false
      if (window.getComputedStyle) {
        return attr
          ? window.getComputedStyle(element, null)[attr]
          : window.getComputedStyle(element, null)
      }
      return attr ? element.currentStyle[attr] : element.currentStyle
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
    padding: 0 10.8%;
  }
}
.mobile-index {
  .content-wrap {
    padding: 0 4.3%;
  }
  .scond-part {
    padding: 0 4.3%;
  }
}
.fix-bottom {
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
