<template>
  <div>
    <component :is="$store.state.terminal" v-bind="$attrs"></component>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './viewModules/layout/pc'
import mobile from './viewModules/layout/mobile'
export default {
  name: 'Personal',
  components: {
    pc,
    mobile,
  },
  inheritAttrs: false,
}
</script>
