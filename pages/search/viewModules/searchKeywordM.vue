<template>
  <div class="cs-search">
    <header>
      <i
        class="nav-left icontongyong-topbar-wap-guanbi icon iconfont"
        @click="close"
      ></i>
      <p class="nav-con">
        <i class="icon iconfont icontongyong-topbar-web-logo-black"></i>
      </p>
      <i class="nav-right"></i>
    </header>
    <div class="cs-search_container">
      <keyword></keyword>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    close() {
      this.$emit('input', false)
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-search {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
  background: #ffffff;
  header {
    height: 50px;
    padding: 0 16px;
    line-height: 50px;
    display: flex;
    align-items: center;
    i {
      font-size: 20px;
    }
    .nav-con {
      flex: 1;
      text-align: center;
      i {
        font-size: 27px;
      }
    }
  }
}
</style>
