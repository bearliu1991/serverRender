<template>
  <div>
    <component :is="$store.state.terminal" v-bind="$attrs"></component>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './viewModules/checkout/pc'
import mobile from './viewModules/checkout/mobile'
export default {
  name: 'OrderConfirm',
  layout: 'order',
  components: {
    pc,
    mobile,
  },
  inheritAttrs: false,
  validate({ query }) {
    const products = query.products
    if (!products || (products && JSON.parse(products).length === 0)) {
      return false
    }
    return true
  },
}
</script>
