<template>
  <div class="container">
    <Nuxt v-if="isRouterAlive" />
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
