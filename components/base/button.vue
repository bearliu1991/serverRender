<template>
  <div
    :class="[
      'cs-button',
      `cs-button-${type}`,
      size ? `cs-button-${size}` : '',
      disabled ? `cs-button-disabled` : '',
    ]"
    @click="click"
  >
    <span>
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    // primary 主要的   default默认的
    type: {
      type: String,
      default: 'default',
    },
    // medium  small
    size: {
      type: String,
      default: '',
    },
    // 按钮是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    click() {
      if (this.disabled) {
        return false
      }
      this.$emit('click')
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-button {
  display: inline-block;
  text-align: center;

  padding-left: 15px;
  padding-right: 15px;
  height: 56px;
  line-height: 56px;
  // type
  &-default {
    background: #ffffff;
    border: 1px solid #d8d8d8;
    color: $primary;
  }
  &-primary {
    background: $black;
    color: $white;
    border: 1px solid $black;
  }
  // sieze
  &-medium {
    height: 44px;
    line-height: 44px;
  }
  // 禁用
  &-disabled {
    background: #d8d8d8;
    color: $white;
  }
  span {
    font-size: $font-size-xs;
    font-family: $muli-bold-muli-font-family;
    font-weight: bold;
    line-height: 15px;
    letter-spacing: 2px;
  }
}
</style>
