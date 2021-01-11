<template>
  <div class="data-content">
    <img src="@/assets/images/comment.png" alt="" />
    <h1>SORRY, NO REVIEWS MATCH THAT.</h1>
    <p>Try again by clearing or changing the filters</p>
  </div>
</template>

<script>
export default {
  name: 'NoData',
}
</script>

<style lang="scss" scoped>
.data-content {
  text-align: center;
  img {
    width: 200px;
    height: 200px;
  }
  h1 {
    font-size: 18px;
    @include font($fontMuliBold);
  }
  p {
    font-size: 14px;
    @include font($fontRegular);
    color: #333333;
    margin-top: 8px;
  }
}
</style>
