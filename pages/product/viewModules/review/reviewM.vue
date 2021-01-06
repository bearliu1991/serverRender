<template>
  <div class="cs-review">
    <!-- 标题 -->
    <h1>CUSTOMER REVIEW</h1>
    <div class="cs-review-wrapper">
      4.9
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cs-review {
  h1 {
    padding: 0 16px 24px 16px;
    font-size: 18px;
    @include font($fontMuliBold);
    color: #333333;
    line-height: 23px;
    text-align: left;
  }
  &-wrapper {
    height: 100px;
    background: #fafafa;
  }
}
</style>
