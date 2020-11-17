<template>
  <div
    class="cs_top_bar"
    :style="{
      height: barHeight + 'px',
      'line-height': barHeight + 'px',
      'background-color': announcementBar.bgColor,
      position: announcementBar.fixed ? 'fixed' : 'static',
    }"
  >
    <div
      class="cs_top_bar_text"
      :style="{
        color: announcementBar.textColor,
        'font-size': barHeight === 40 ? '14px' : '12px',
      }"
    >
      {{ announcementBar.text }}
    </div>
    <i
      v-if="announcementBar.closeButtonShow"
      class="cs_top_bar_close icon_close"
      @click="hideTopbar"
    ></i>
  </div>
</template>

<script>
export default {
  props: {
    announcementBar: {
      type: Object,
      default: () => {},
    },
    barHeight: {
      type: Number,
      default: 40,
    },
  },
  data() {
    return {}
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
  &_text {
    color: #fff !important;
    font-family: $fontSemiBold;
    font-weight: normal;
  }
  &_close {
    position: absolute;
    right: 0;
    top: 0;
    width: 18px;
    height: 18px;
  }
}
</style>
