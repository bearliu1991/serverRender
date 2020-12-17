<template>
  <div class="cs-toast">
    <p>{{ text }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: '',
      durations: '3000',
    }
  },
  mounted() {
    setTimeout(() => {
      // 动画完成后执行
      this.$destroy(true) // 完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器
      this.$el && this.$el.parentNode.removeChild(this.$el) // 从dom节点删除
    }, this.durations)
  },
}
</script>
<style lang="scss" scoped>
.cs-toast {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  min-height: 47px;
  background: #000000;
  opacity: 0.7;
  padding: 14px 16px;
  word-break: break-all;
  p {
    font-size: 14px;
    color: #ffffff;
    line-height: 18px;
  }
}
</style>
