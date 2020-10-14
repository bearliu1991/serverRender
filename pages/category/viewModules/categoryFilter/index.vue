<template>
  <div>
    <component :is="$store.state.terminal" v-bind="$attrs"></component>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './categoryFilterPC.vue'
import mobile from './categoryFilterM.vue'

export default {
  name: 'CategoryFilter',
  components: {
    pc,
    mobile,
  },
  inheritAttrs: false,
}
</script>
