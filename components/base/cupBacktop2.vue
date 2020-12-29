<template>
  <div
    class="back-to-top"
    :style="{ right: right / 100 + 'rem', bottom: bottom / 100 + 'rem' }"
    v-show="btnFlag"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'BackTop',
  props: {
    right: {
      type: [Number, String],
      default: 20,
    },
    bottom: {
      type: [Number, String],
      default: 20,
    },
  },
  data() {
    return {
      btnFlag: false,
      clientHeight: 0,
    }
  }, // window对象，所有浏览器都支持window对象。它表示浏览器窗口，监听滚动事件
  mounted() {
    this.clientHeight = document.body.clientHeight
    try {
      window.onscroll = this.scrollToTop
      // window.addEventListener('scroll', this.scrollToTop)
    } catch (error) {}
  },
  destroyed() {
    // window.removeEventListener('scroll', this.scrollToTop)
  },
  methods: {
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop() {
      const timer = setInterval(() => {
        const ispeed = Math.floor(-this.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop =
          this.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },
    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      try {
        const scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
        this.scrollTop = scrollTop
        if (this.scrollTop > this.clientHeight) {
          this.btnFlag = true
          this.$emit('show', true)
        } else {
          this.btnFlag = false
          this.$emit('show', false)
        }
      } catch (error) {}
    },
  },
}
</script>
<style lang="scss" scoped>
.back-to-top {
  position: fixed;
}
</style>
