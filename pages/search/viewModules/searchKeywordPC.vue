<template>
  <cup-popup
    v-model="visible"
    size="66%"
    :with-header="false"
    :modal="true"
    :direction="direction"
  >
    <div class="cs-search">
      <div class="cs-search_logo">
        <i class="icon iconfont icontongyong-topbar-web-logo-black"></i>
      </div>
      <div class="cs-search_container">
        <keyword></keyword>
      </div>
      <div class="cs-search_close">
        <i
          class="nav-left icontongyong-topbar-wap-guanbi icon iconfont"
          @click="close"
        ></i>
      </div>
    </div>
  </cup-popup>
</template>
<script>
export default {
  data() {
    return {
      visible: true,
      direction: 'ttb',
    }
  },
  methods: {
    close() {
      this.visible = false
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-search {
  padding: 0 56px;
  display: flex;
  &_logo {
    margin-top: 31px;
    margin-right: 334px;
    i {
      font-size: 49px;
    }
  }
  &_container {
    flex: 1;
    overflow-y: auto;
  }
  &_close {
    margin-top: 56px;
    text-align: right;
    margin-left: 490px;
    i {
      font-size: 24px;
    }
  }
}
</style>
