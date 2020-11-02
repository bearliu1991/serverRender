<template>
  <div>
    <component :is="$store.state.terminal" v-bind="$attrs"></component>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './cartPC.vue'
import mobile from './cartM.vue'
export default {
  name: 'Cart',
  components: {
    pc,
    mobile,
  },
}
</script>
