<template>
  <div>
    <div v-if="$store.state.terminal" class="pc-footer-content">
      <div class="pc-footer-top">
        2222
      </div>
      <div class="pc-footer-bottom">3333</div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.pc-footer-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 425px;
  background: #fafafa;
  margin-top: 100px;
  padding: 72px 132px 34px;
}
</style>
