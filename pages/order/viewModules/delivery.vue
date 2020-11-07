<template>
  <div class="cs-delivery">
    <div class="cs-delivery-flex">
      <label>Contact</label>
      <p>amy@gmail.com</p>
      <i class="icon iconfont iconicon-web-14-wangyelianjie"></i>
    </div>
    <div class="cs-delivery-flex">
      <label>Ship to</label>
      <p>Times Square, Broadway and Seventh Ave, New York, NY 10036</p>
      <i class="icon iconfont iconicon-web-14-wangyelianjie"></i>
    </div>
    <div class="cs-delivery-flex">
      <label>Method</label>
      <p>
        Standard Shipping 6-9 Business Days ( Please allow 1-2 business days for
        shipping delay ) · AUD $3.00
      </p>
      <i class="icon iconfont iconicon-web-14-wangyelianjie"></i>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cs-delivery {
  margin-bottom: 40px;
  border: 1px solid #d8d8d8;
  &-flex {
    display: flex;
    padding: 12px;
    border-bottom: 1px solid #d8d8d8;
    font-size: 14px;
    color: #999999;
    p {
      flex: 1;
      margin-left: 16px;
      color: #333333;
      margin-right: 58px;
    }
    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>
