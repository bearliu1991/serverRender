<template>
  <div>
    <div>
      <cup-header></cup-header>
    </div>
    <div
      class="container"
      :style="{ 'margin-top': $store.state.contentMarginTop / 100 + 'rem' }"
    >
      <Nuxt v-if="isRouterAlive" :key="$route.fullPath" />
    </div>
    <cup-footer v-if="$store.state.terminal == 'pc'"></cup-footer>
  </div>
</template>
<script>
export default {
  provide() {
    return {
      reload: this.reload,
    }
  },
  data() {
    return {
      isRouterAlive: true,
    }
  },
  mounted() {},
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  margin-top: 109px;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
