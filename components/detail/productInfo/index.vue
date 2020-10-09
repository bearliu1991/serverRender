<template>
  <div>
    <component :is="$store.state.terminal" v-bind="$attrs"></component>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './productInfoPC.vue'
import mobile from './productInfoM.vue'
export default {
  name: 'ProductInfo',
  components: {
    pc,
    mobile,
  },
  inheritAttrs: false,
}
</script>
