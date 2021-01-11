<template>
  <div>
    <component :is="$store.state.terminal" v-bind="$attrs"></component>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './viewModules/customerReviewPC'
import mobile from './viewModules/customerReviewM'
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
