<template>
  <div>
    <component :is="$store.state.terminal" v-bind="$attrs"></component>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './categorySortPC.vue'
import mobile from './categorySortM.vue'
export default {
  name: 'CategorySort',
  components: {
    pc,
    mobile,
  },
  inheritAttrs: false,
}
</script>
