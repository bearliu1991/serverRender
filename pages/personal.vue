<template>
  <div>
    <component :is="$store.state.terminal" v-bind="$attrs"></component>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './personal/viewModules/layout/pc'
import mobile from './personal/viewModules/layout/mobile'

export default {
  name: 'Personal',
  components: {
    pc,
    mobile,
  },
}
</script>
