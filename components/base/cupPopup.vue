<!-- 底部弹出框 -->
<template>
  <el-drawer
    :title="title"
    :visible.sync="drawer"
    :direction="'btt'"
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
<style lang="scss">
.cup-popup {
  height: auto !important;
  max-height: 80%;
  .el-drawer__header {
    padding: $padding-4m;
    text-align: center;
    height: 55px;
    font-size: $font-size-lg;
    font-family: $muli-bold-font-family;
    font-weight: bold;
    letter-spacing: 2px;
    color: #333;
    border-bottom: 1px solid #f7f7f7;
    margin-bottom: 0;
  }
  .el-drawer__close-btn {
    font-size: 24px;
  }
  .el-drawer__body {
    overflow-y: auto;
  }
  /deep/ :focus {
    outline: 0;
  }
}
</style>
