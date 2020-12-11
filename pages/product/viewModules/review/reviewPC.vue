<template>
  <div class="cs-review">
    <!-- 标题 -->
    <h1>CUSTOMER REVIEW</h1>
    <div class="cs-review-wrapper"></div>
  </div>
</template>
<style lang="scss" scoped>
.cs-review {
  h1 {
    padding: 100px 208px 40px 208px;
    font-size: 30px;
    @include font($fontMuliBold);
    color: #333333;
    line-height: 38px;
    text-align: center;
  }
  &-wrapper {
    height: 329px;
    background: #fafafa;
  }
}
</style>
