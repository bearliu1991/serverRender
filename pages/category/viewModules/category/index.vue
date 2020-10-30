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
import pc from './categoryPC.vue'
import mobile from './categoryM.vue'
export default {
  name: 'Category',
  components: {
    pc,
    mobile,
  },
  inheritAttrs: false,
}
</script>
