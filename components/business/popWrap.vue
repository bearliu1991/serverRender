<template>
  <transition name="fade">
    <div v-show="isVisible" class="cs_sub_pop_wrap">
      <div class="pop-mask" @click="$emit('update:visible', false)"></div>
      <div class="pop-wrap">
        <div class="go-pre pointer" v-if="withBtn">
          <span class="icon-svg iconicon-web-40-zuojiantou"></span>
        </div>
        <div class="content-wrap">
          <slot></slot>
        </div>
        <div class="go-next pointer" v-if="withBtn">
          <span class="icon-svg iconicon-web-40-youjiantou"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import mixins from '../../pages/indexMixin'
import { stopBodyScroll } from '../../assets/js/utils'
export default {
  mixins: [mixins],
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    withBtn: {
      type: Boolean,
      dafault: false,
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
.cs_sub_pop_wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10000;
  @include setMiddle();
}
.pop-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10001;
}
.go-next {
  margin-left: 40px;
}
.go-pre {
  margin-right: 40px;
}
.icon-svg {
  font-size: 40px;
  color: #fff;
}
.pop-wrap {
  display: flex;
  z-index: 10002;
  @include setMiddle();
}
.content-wrap {
  background-color: #fff;
}
</style>
