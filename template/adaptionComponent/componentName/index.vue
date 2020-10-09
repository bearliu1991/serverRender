<template>
  <div>
    <component :is="$store.state.terminal" v-bind="$attrs"></component>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './namePC.vue'
import mobile from './nameM.vue'
export default {
  name: 'Name',
  components: {
    pc,
    mobile,
  },
  inheritAttrs: false,
}
</script>
