<template>
  <transition name="fade">
    <div v-show="isVisible" class="cs_sub_pop_wrap">
      <div class="pop-mask" @click="$emit('update:visible', false)"></div>
      <div class="pop-wrap">
        <div class="go-pre" v-if="withBtn">
          <span
            :class="[preDisabled && 'disabled']"
            class="pointer icon-svg iconicon-web-40-zuojiantou"
            @click="go('pre')"
          ></span>
        </div>
        <div class="content-wrap">
          <slot></slot>
        </div>
        <div class="go-next" v-if="withBtn">
          <span
            class="icon-svg iconicon-web-40-youjiantou pointer"
            :class="[nextDisabled && 'disabled']"
            @click="go('next')"
          ></span>
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
      default: false,
    },
    withBtn: {
      type: Boolean,
      dafault: false,
    },
    currentObj: { type: Object, default: () => {} },
    dataList: { type: Array, default: () => [] },
    linkKey: {
      type: String,
      default: 'id',
    },
  },
  data() {
    return {
      preDisabled: false,
      nextDisabled: false,
      isVisible: this.visible,
      stopBody: null,
    }
  },
  computed: {
    initIndex() {
      if (
        this.currentObj &&
        this.currentObj[this.linkKey] !== undefined &&
        this.dataList.length
      ) {
        return this.dataList.findIndex(
          (item) => item[this.linkKey] === this.currentObj[this.linkKey]
        )
      }
      return -1
    },
  },
  watch: {
    initIndex: {
      handler(newVal) {
        if (newVal > -1) {
          this.getDisabled()
        }
      },
    },
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
    getDisabled() {
      this.preDisabled = this.initIndex === 0
      this.nextDisabled = this.initIndex === this.dataList.length - 1
    },
    go(direction) {
      if (direction === 'pre') {
        if (this.preDisabled) return
        this.$emit('goPre')
      } else {
        if (this.nextDisabled) return
        this.$emit('goNext')
      }
    },
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
.pointer {
  &.disabled {
    cursor: not-allowed;
  }
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
  &.disabled {
    color: #999;
  }
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
