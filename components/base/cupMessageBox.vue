<template>
  <div :class="['cs-messageBox', platForm]">
    <div class="cs-messageBox_wrap">
      <header>
        <p></p>
      </header>
      <div class="cs-messageBox_container">
        <p>{{ text }}</p>
      </div>
      <footer>
        <cup-button v-if="isConfirm" @click="handelConfirm">{{
          confirmText
        }}</cup-button>
        <cup-button v-if="isCancel" type="primary" @click="handelCancel">{{
          cancelText
        }}</cup-button>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      text: '',
      promise: null,
      show: false,
      cancelText: '',
      confirmText: '',
      isConfirm: null,
      isCancel: null,
      platForm: '',
    }
  },
  methods: {
    init() {
      // 初始化, 返回一个promise
      this.show = true
      return new Promise((resolve, reject) => {
        this.promise = { resolve, reject } // 将resolve 、reject暂存起来,方便调用
      })
    },
    handelCancel() {
      // 取消
      this.destroyVm()
      this.promise.reject()
    },
    handelConfirm() {
      // 确定
      this.destroyVm()
      this.promise.resolve()
    },
    destroyVm() {
      // 销毁
      this.show = false
      setTimeout(() => {
        // 动画完成后执行
        this.$destroy(true) // 完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器
        this.$el && this.$el.parentNode.removeChild(this.$el) // 从dom节点删除
      }, 500)
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-messageBox {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 99999;
  background-color: rgba($color: #000000, $alpha: 0.7);
  justify-content: center;
  display: flex;
  align-items: center;
  &.mobile {
    .cs-messageBox {
      &_wrap {
        width: calc(100% - 64px);
        padding: 24px;
        margin: 0 32px;
      }
    }
  }
  &_wrap {
    width: 440px;
    background: #fff;
    padding: 40px;
  }
  &_container > * {
    font-size: 14px;
    font-family: Muli-Regular_SemiBold, Muli;
    font-weight: normal;
    color: #333333;
    line-height: 21px;
  }
  footer {
    margin-top: 40px;
    display: flex;
    .cs-button {
      flex: 1;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
