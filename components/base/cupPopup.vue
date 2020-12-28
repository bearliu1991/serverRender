<!-- 底部弹出框 -->
<template>
  <el-drawer
    ref="drawer"
    :title="title"
    :visible.sync="drawer"
    :direction="direction"
    :size="size"
    :show-close="showClose"
    :modal="modal"
    :with-header="withHeader"
    :custom-class="`cup-popup ${terminal}`"
    :before-close="beforeClose"
    @close="close"
  >
    <slot name="title"></slot>
    <slot></slot>
    <!-- 底部按钮 -->
    <div class="cs-submit">
      <slot name="button"></slot>
    </div>
  </el-drawer>
</template>
<script>
export default {
  name: 'CupPopup',
  model: {
    prop: 'visible',
    event: 'close-popup',
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '70%',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    modal: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: 'btt',
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    withHeader: {
      type: Boolean,
      default: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    beforeClose: {
      type: Function,
    },
  },
  data() {
    return {
      drawer: false,
    }
  },
  watch: {
    drawer(value) {
      const self = this
      if (value) {
        this.$nextTick(function () {
          try {
            this.$slots.default[0].elm.addEventListener('scroll', function (
              event
            ) {
              self.$emit('scroll', event)
            })
          } catch (error) {}
        })
      } else {
        this.$emit('close-popup', value)
      }
    },
    visible: {
      immediate: true,
      handler(value) {
        this.drawer = value
      },
    },
  },
  beforeCreate() {},
  methods: {
    close() {
      this.$emit('close-popup', this.drawer)
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-submit {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 10px 16px;
  background-color: #fff;
}
// height: auto !important;
/deep/ .el-drawer {
  &__header {
    padding: $padding-4m;
    text-align: center;
    height: 55px;
    font-size: $font-size-lg;
    @include font($fontMuliBold);
    letter-spacing: 2px;
    color: #333;
    border-bottom: 1px solid #f7f7f7;
    margin-bottom: 0;
  }
  &__close-btn {
    font-size: 24px;
  }
  &__body {
    overflow-y: auto;
  }
  &.mobile {
    .el-drawer__close-btn {
      font-size: 14px;
    }
  }
}
/deep/ :focus {
  outline: none;
  outline: 0;
}
</style>
