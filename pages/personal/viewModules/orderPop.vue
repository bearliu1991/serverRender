<template>
  <div></div>
</template>
<style lang="scss" scoped>
// 取消原因
.cs-reasons {
  .el-drawer__body {
    margin-bottom: 70px;
  }
  .cs-radio {
    height: 60px;
    border-bottom: 1px solid #f7f7f7;
    padding: 0 16px;
    margin-bottom: 0;
  }
  .cs-submit {
    position: absolute;
    bottom: 0;
    right: 16px;
    left: 16px;
    padding: 10px 0;
  }
}
// 支付方式
.cs-payment {
  &_wrapper {
    /deep/.el-drawer__body {
      background: #fafafa;
    }
    header {
      background: #fff;
      height: 60px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      label {
        font-size: 14px;
        line-height: 18px;
        flex: 1;
      }
      i {
        width: 38px;
        height: 24px;
        margin-left: 8px;
      }
    }
  }
}
</style>
