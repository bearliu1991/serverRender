<template>
  <div>
    <component
      :is="$store.state.terminal"
      v-bind="$attrs"
      v-on="$listeners"
    ></component>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './searchResultPC.vue'
import mobile from './searchResultM.vue'
export default {
  name: 'SearchResult',
  components: {
    pc,
    mobile,
  },
  inheritAttrs: false,
}
</script>
