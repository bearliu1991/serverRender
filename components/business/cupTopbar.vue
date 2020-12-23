<template>
  <div
    class="cs_top_bar"
    :style="{
      height: barHeight + 'px',
      'line-height': barHeight + 'px',
      'background-color': childObj.bgColor,
      position: childObj.fixed ? 'fixed' : 'static',
    }"
  >
    <div v-for="(item, index) in childObj.homepageAnnouncementBarContents">
      <div
        class="cs_top_bar_text"
        :style="{
          color: childObj.textColor,
          'font-size': barHeight === 40 ? '14px' : '12px',
        }"
      >
        {{ item.text }}
        <div class="time-wrap">
          <span class="time-red">2020</span>H <span class="time-red">12</span>M
          <span class="time-red">2020</span>S
        </div>
      </div>
    </div>
    <i
      v-if="childObj.closeButtonShow"
      class="cs_top_bar_close icon_close"
      :style="closeStyle"
      @click="hideTopbar"
    ></i>
    <!-- v-if="childObj.closeButtonShow" -->
  </div>
</template>

<script>
import mixins from '../../pages/indexMixin'
export default {
  mixins: [mixins],
  props: {
    childObj: {
      type: Object,
      default: () => {},
    },
    barHeight: {
      type: Number,
      default: 40,
    },
  },
  data() {
    return {
      closeStyle: {},
    }
  },
  created() {
    this.closeStyle = { color: this.childObj.closeButtonColor }
  },
  methods: {
    hideTopbar() {
      this.$emit('hideBar')
    },
  },
}
</script>

<style lang="scss">
.cs_top_bar {
  text-align: center;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  font-weight: bold;
  &:hover &_close {
    display: block;
  }
  &_text {
    color: #fff !important;
    font-family: $fontSemiBold;
    font-weight: normal;
    @include setMiddle();
    .time-wrap {
      margin-left: 6px;
    }
    .time-red {
      color: #e61717;
    }
  }
  &_close {
    position: absolute;
    right: 100px;
    top: 20px;
    width: 18px;
    height: 18px;
    display: none;
  }
}
</style>
