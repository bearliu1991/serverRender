<template>
  <div class="cs_sub_pop" v-if="showFixPop">
    <div v-if="isPc" class="pc-sidebar sub-pop">
      <div class="pop-wrap">
        <span
          @click="showFixPop = false"
          class="pointer icon-svg iconicon-web-24-close-black"
        ></span>
        <div class="content">Get 15% off</div>
        <span
          class="pointer icon-svg spread-icon iconicon-web-24-zhankai"
          @click="$emit('showPop')"
        ></span>
      </div>
    </div>
    <div v-else class="mobile-sidebar sub-pop">
      <div class="pop-wrap">
        <span
          @click="showFixPop = false"
          class="pointer icon-svg iconicon-web-24-close-black"
        ></span>
        <div class="content">Get 15% off</div>
        <span
          class="pointer icon-svg spread-icon iconicon-web-24-zhankai"
          @click="$emit('showPop')"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from '../../pages/indexMixin'
export default {
  mixins: [mixins],
  props: {
    homeData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      visible: false,
      showFixPop: true,
    }
  },
  methods: {
    showPop() {
      this.visible = true
    },
  },
}
</script>

<style lang="scss" scoped>
.sub-pop {
  position: fixed;
  top: 50%;
  z-index: 100;
  right: 0;
  height: 72px;
  background: #fff;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
  transform: translate(50%, 50%) rotate(-90deg);
  padding: 0 12px;
}

.pop-wrap {
  @include setMiddle();
  height: 36px;
  line-height: 36px;
  span {
    height: 32px;
    font-size: 16px;
    color: #000;
  }
  .spread-icon {
    height: 28px;
    width: 22px;
    transform: rotate(90deg);
  }
}
.content {
  font-weight: bold;
  color: 333;
  padding: 0 12px;
}
.mobile-sidebar {
  height: 60px;
  .pop-wrap {
    height: 30px;
    line-height: 30px;
    span {
      height: 28px;
      font-size: 16px;
    }
    .spread-icon {
      height: 26px;
      width: 20px;
    }
  }
}
</style>
