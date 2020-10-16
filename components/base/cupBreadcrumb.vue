<template>
  <div class="cs-breadcrumb">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    separator: {
      type: String,
      default: '/',
    },
  },
}
</script>
