<template>
  <div v-show="isVisible" :class="['cs-dialog', $store.state.terminal]">
    <div class="cs-dialog-wrapper" role="dialog">
      <div class="cs-dialog_header">
        <span class="cs-dialog_title">{{ title }}</span>
        <span class="cs-dialog_icon" @click="close">
          <i class="icon iconfont icontopbar-wap-guanbi"></i>
        </span>
      </div>
      <div class="cs-dialog_body">
        <slot></slot>
      </div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
import { stopBodyScroll } from '../../assets/js/utils'
export default {
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    beforeClose: {
      type: Function,
      default: () => {
        return () => {}
      },
    },
  },
  data() {
    return {
      isVisible: this.visible,
      stopBody: null,
    }
  },
  watch: {
    visible: {
      handler(value) {
        this.isVisible = value
        this.stopBody && this.stopBody(value)
      },
      immediate: true,
    },
  },
  mounted() {
    const fn = () => {
      if (this.isVisible) {
        this.isVisible = false
      }
    }
    this.stopBody = stopBodyScroll()
    // stopBodyScroll()(this.isVisible)
    this.$on('hook:beforeDestroy', fn)
  },
  methods: {
    close() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose()
      }
      this.isVisible = false
      this.stopBody(this.isVisible)
      this.$emit('update:visible', this.isVisible)
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  margin: 0;
  z-index: 2003;

  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;

  &-wrapper {
    z-index: 2004;
    position: relative;
    background: #ffffff;
    width: 100%;
    margin: 0 32px;
  }
  &_header {
    position: relative;
    height: 45px;
    display: flex;
    line-height: 45px;
    .icon {
      font-size: 24px;
      &.mobile {
        font-size: 14px;
      }
    }
    padding: 0 15px;
  }
  &_title {
    flex: 1;
    font-size: 18px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #333333;
    line-height: 27px;
  }
  &_body {
    padding: 0 24px 16px 24px;
    word-break: break-all;
    font-size: 12px;
    @include font($fontRegular);
    color: #666666;
    line-height: 15px;
  }
}
.mobile {
  &.cs-dialog {
    .cs-dialog_header {
      height: 45px;
      line-height: 45px;
      .icon {
        font-size: 14px;
      }
      padding: 0 15px;
    }
  }
}
</style>
