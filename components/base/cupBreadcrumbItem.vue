<template>
  <div class="cs-breadcrumb-item">
    <span role="link" class="cs-breadcrumb__inner" @click="link">
      <slot></slot>
    </span>
    <span role="presentation" class="cs-breadcrumb__separator">{{
      $parent.separator
    }}</span>
  </div>
</template>
<script>
export default {
  props: {
    to: {
      type: [String, Object],
      default: '',
    },
  },
  methods: {
    link() {
      const { to } = this
      if (to) {
        this.$router.push(to)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-breadcrumb-item {
  display: inline-block;
  font-size: 12px;
  font-family: Muli-Regular_Light, Muli;
  font-weight: normal;
  color: #333333;
  line-height: 15px;
  cursor: pointer;
  &:last-child {
    color: #999;
    .cs-breadcrumb__separator {
      display: none;
    }
  }
}
.cs-breadcrumb__separator {
  margin: 0 5px;
}
</style>
