<template>
  <div v-if="loading" :class="['loading-page', $store.state.terminal]">
    <div class="loading-con">
      <img src="../../assets/images/icon_loading.gif" alt="" srcset="" />
      <p>Processing...</p>
      <p>It may take a few minutes to confirm your payment.</p>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    loading: true,
  }),
  methods: {
    start() {
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
  text-align: center;
  .loading-con {
    position: relative;
    width: 440px;
    margin-top: 50%;
    background: #fff;
    padding: 40px;
    img {
      text-align: center;
      width: 50%;
    }
    p {
      margin-bottom: 10px;
      color: #333333;
      font-size: 14px;
      @include font($fontMuliBold);

      &:last-child {
        @include font($fontRegular);
        font-size: 12px;
      }
    }
  }
  &.pc {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999999;
    background: rgba(0, 0, 0, 0.7);
    .loading-con {
      margin: 0 auto;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.mobile {
  &.loading-page {
    .loading-con {
      width: auto;
    }
  }
}
</style>
