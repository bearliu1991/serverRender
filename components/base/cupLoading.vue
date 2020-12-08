<template>
  <div v-if="loading" class="loading-page">
    <div class="loading-con">
      <i class="icon iconfont icontongyong-topbar-web-logo-black"></i>
      <p>Processing...</p>
      <p>It may take a few minutes to confirm your payment.</p>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      alert(2)
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>
<style lang="scss" scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999999;
  background: rgba(0, 0, 0, 0.7);
  text-align: center;
  .loading-con {
    position: relative;
    width: 440px !important;
    margin: 15% auto;
    background: #fff;
    padding: 40px;
    width: auto;
    .icon {
      margin-bottom: 20px;
      font-size: 90px;
    }
    p {
      margin-top: 10px;
      color: #333333;
      font-size: 14px;
      @include font($fontMuliBold);

      &:last-child {
        @include font($fontRegular);
        font-size: 12px;
      }
    }
  }
}
</style>
