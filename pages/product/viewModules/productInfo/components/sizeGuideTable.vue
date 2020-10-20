<!-- 尺码表 -->
<template>
  <cup-dialog v-bind="$attrs" v-on="$listeners">
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
  },
  data() {
    return {}
  },
  beforeCreate() {},
  mounted() {},
}
</script>
<style lang="scss" scoped>
/deep/ .cs-dialog-wrapper {
  margin: 73px 0;
  width: 896px;
  height: calc(100% - 146px);
  .cs-dialog_body {
    overflow: auto;
    /deep/ table {
      width: 100%;
      border: 1px solid #d8d8d8;
      tr {
        height: 44px;
        line-height: 44px;
        &:nth-child(odd) {
          background: #f2f2f2;
        }
        font-size: 14px;
        font-family: Muli-Regular_SemiBold, Muli;
        font-weight: normal;
        color: #333333;
        td {
          text-align: center;
        }
      }
      // td {
      //   padding: 10px;
      //   text-align: center;
      //   font-family: $muli-regular-font-family;
      //   font-size: $font-size-xs;
      //   &:not(:last-child) {
      //     border-right: 1px solid #fafafa;
      //   }
      // }
    }
  }
}
</style>
