<template>
  <div class="cs-dropdown">
    <slot></slot>
  </div>
</template>
<script>
import { findComponentsDownward } from '@assets/js/utils'
export default {
  props: {
    trigger: {
      type: String,
      default: 'click',
    },
    hideOnClick: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      elm: null,
    }
  },
  provide() {
    return {
      dropdown: this,
    }
  },
  mounted() {
    // 获取按钮选择器
    this.elm = this.$slots.default[0].elm

    const { elm } = this
    // 添加监听事件
    elm.addEventListener(this.trigger, this.fn)
    // 组件销毁
    this.$once('hook:beforeDestroy', () => {
      elm.removeEventListener(this.trigger, this.fn)
    })
  },
  methods: {
    fn(event) {
      const childrens = findComponentsDownward(this, 'CupDropdownMenu')
      childrens.forEach((element) => {
        element.showDrop()
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-dropdown {
  position: relative;
  display: inline-block;
}
</style>
