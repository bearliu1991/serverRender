<template>
  <div>
    <div v-if="$store.state.terminal === 'pc'">
      这是PC的顶部
    </div>
    <div v-else></div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
