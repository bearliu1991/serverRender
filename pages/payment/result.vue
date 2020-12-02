<template>
  <div>
    <component :is="$store.state.terminal" v-bind="$attrs"></component>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './viewModules/result/pc'
import mobile from './viewModules/result/mobile'
export default {
  name: 'PaymentResult',
  layout: 'order',
  components: {
    pc,
    mobile,
  },
  inheritAttrs: false,
}
</script>
