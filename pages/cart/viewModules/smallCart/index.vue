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
import pc from './smallcartPC.vue'
import mobile from './smallcartM.vue'
export default {
  name: 'Cart',
  components: {
    pc,
    mobile,
  },
}
</script>
