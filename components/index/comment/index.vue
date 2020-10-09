<template>
  <div>
    <component :is="$store.state.terminal"></component>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './pc.vue'
import mobile from './mobile.vue'
export default {
  name: 'ProductInfo',
  components: {
    pc,
    mobile,
  },
}
</script>
