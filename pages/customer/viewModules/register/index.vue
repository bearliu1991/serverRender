<template>
  <div>
    <component :is="$store.state.terminal" v-bind="$attrs"></component>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './pc.vue'
import mobile from './mobile.vue'
export default {
  name: 'Register',
  components: {
    pc,
    mobile,
  },
  inheritAttrs: false,
}
</script>
