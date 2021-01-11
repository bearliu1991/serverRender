<template>
  <div>
    <component :is="$store.state.terminal" v-bind="$attrs"></component>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './reviewPC.vue'
import mobile from './reviewM.vue'
export default {
  relatedModel: 'Review',
  components: {
    pc,
    mobile,
  },
  inheritAttrs: false,
  mounted() {},
  methods: {},
}
</script>
