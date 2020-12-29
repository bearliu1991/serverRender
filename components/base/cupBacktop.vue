<template>
  <transition name="fade">
    <div
      v-if="visible"
      @click.stop="handleClick"
      :style="{
        right: styleRight,
        bottom: styleBottom,
      }"
      class="cup-backtop"
    >
      <slot>
        <el-icon name="caret-top"></el-icon>
      </slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ElBacktop',
  props: {
    visibilityHeight: {
      type: Number,
      default: 200,
    },
    target: { type: String, default: '' },
    right: {
      type: Number,
      default: 40,
    },
    bottom: {
      type: Number,
      default: 40,
    },
    unit: {
      type: String,
      default: 'rem',
    },
  },
  data() {
    return {
      el: null,
      container: null,
      visible: false,
    }
  },
  computed: {
    styleBottom() {
      if (this.unit === 'px') return `${this.bottom}px`
      return `${this.bottom / 100}rem`
    },
    styleRight() {
      if (this.unit === 'px') return `${this.right}px`
      return `${this.right / 100}rem`
    },
  },

  mounted() {
    this.init()
    this.isDestroy = false
    this.throttledScrollHandler = this.onScroll
    this.container.addEventListener('scroll', this.throttledScrollHandler)
  },
  beforeDestroy() {
    this.container.removeEventListener('scroll', this.throttledScrollHandler)
  },
  methods: {
    init() {
      this.container = document
      this.el = document.documentElement
      if (this.target) {
        this.el = document.querySelector(this.target)
        if (!this.el) {
          throw new Error(`target is not existed: ${this.target}`)
        }
        this.container = this.el
      }
    },
    onScroll() {
      const scrollTop = this.el.scrollTop
      this.visible = scrollTop >= this.visibilityHeight
      this.$emit('showIcon', this.visible)
    },
    handleClick(e) {
      this.scrollToTop()
      this.$emit('click', e)
    },
    scrollToTop() {
      const el = this.el
      let step = 0
      const interval = setInterval(() => {
        if (el.scrollTop <= 0) {
          clearInterval(interval)
          return
        }
        step += 10
        el.scrollTop -= step
      }, 20)
    },
  },
}
</script>
<style lang="scss" scoped>
.cup-backtop {
  position: fixed;
}
</style>
