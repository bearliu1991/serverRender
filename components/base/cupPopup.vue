<!-- 底部弹出框 -->
<template>
  <el-drawer
    :title="title"
    :visible.sync="drawer"
    :direction="'btt'"
    :size="size"
    custom-class="cup-popup"
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
        this.drawer = value
      },
    },
  },
  beforeCreate() {},
  mounted() {},
}
</script>
<style lang="scss" scoped>
// height: auto !important;
/deep/ .el-drawer {
  max-height: 80%;
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
}
</style>
