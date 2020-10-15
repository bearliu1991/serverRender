<template>
  <div>
    <component :is="$store.state.terminal" v-bind="$attrs"></component>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './categoryListPC.vue'
import mobile from './categoryListM.vue'
export default {
  name: 'CategoryList',
  components: {
    pc,
    mobile,
  },
  inheritAttrs: false,
}
</script>
