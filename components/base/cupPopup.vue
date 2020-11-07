<!-- 底部弹出框 -->
<template>
  <el-drawer
    ref="drawer"
    :title="title"
    :visible.sync="drawer"
    :direction="direction"
    :size="size"
    custom-class="cup-popup"
    :with-header="withHeader"
    @close="$emit('close-popup', drawer)"
  >
    <slot></slot>
  </el-drawer>
</template>
<script>
export default {
  name: 'CupPopup',
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
    direction: {
      type: String,
      default: 'btt',
    },
    withHeader: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      drawer: false,
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(value) {
        const self = this
        this.drawer = value
        if (value) {
          this.$nextTick(function () {
            this.$slots.default[0].elm.addEventListener('scroll', function (
              event
            ) {
              self.$emit('scroll', event)
            })
          })
        }
      },
    },
  },
  beforeCreate() {},
}
</script>
<style lang="scss" scoped>
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
}
/deep/ :focus {
  outline: none;
  outline: 0;
}
</style>
