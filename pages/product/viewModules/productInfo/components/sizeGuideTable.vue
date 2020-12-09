<!-- 尺码表 -->
<template>
  <cup-popup
    v-if="terminal == 'mobile'"
    :visible.sync="visible"
    title="SIZE GUIDE"
    :size="'90%'"
  >
    <div class="cs-sizeGuide" v-html="sizeGuide"></div>
  </cup-popup>
  <cup-dialog v-else :visible.sync="visible" v-bind="$attrs" v-on="$listeners">
    <div class="cs-sizeGuide" v-html="sizeGuide"></div>
  </cup-dialog>
</template>
<script>
export default {
  name: 'SizeGuideTable',
  props: {
    sizeGuide: {
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
      // visible: true,
    }
  },
  beforeCreate() {},
  mounted() {},
}
</script>
<style lang="scss" scoped>
/deep/ .cs-dialog-wrapper {
  margin: 79px 512px 126px 512px;
  overflow-y: auto;
  .cs-dialog_body {
  }
}
/deep/ .cup-popup {
  .el-drawer__body {
    padding: 16px;
    overflow: auto;
  }
}
/deep/ table {
  width: 100%;
  border: 1px solid #d8d8d8;
  tr {
    height: 36px;
    line-height: 36px;
    &:nth-child(odd) {
      background: #f2f2f2;
    }
    font-size: 14px;
    &:first-child {
      font-family: Muli-Regular_SemiBold, Muli;
    }
    font-weight: normal;
    color: #333333;
    td {
      text-align: center;
    }
  }
}
</style>
