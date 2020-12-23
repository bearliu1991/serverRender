<template>
  <div>
    <component :is="$store.state.terminal" v-bind="$attrs"></component>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './viewModules/pc'
import mobile from './viewModules/mobile'

export default {
  name: 'OrderList',
  components: {
    pc,
    mobile,
  },
}
</script>
