<template>
  <div>
    <component :is="$store.state.terminal" v-bind="$attrs"></component>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './viewModules/mobile'
import mobile from './viewModules/mobile'

export default {
  name: 'OrderAdress',
  layout: 'personal',
  components: {
    pc,
    mobile,
  },
}
</script>
