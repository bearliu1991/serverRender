<template>
  <div>
    <component :is="$store.state.terminal" v-bind="$attrs"></component>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './orderSummaryPC'
import mobile from './orderSummaryM'
export default {
  name: 'OrderSummay',
  components: {
    pc,
    mobile,
  },
  inheritAttrs: false,
}
</script>
