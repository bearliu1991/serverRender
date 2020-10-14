<template>
  <div
    :class="[
      'cs-button',
      `cs-button-${type}`,
      size ? `cs-button-${size}` : '',
      disabled ? `cs-button-disabled` : '',
      block ? `cs-button-block` : '',
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
    block: {
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
    border: 1px solid #000000;
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
  &-large {
    width: 100%;
  }
  &-block {
    display: block;
  }
  // 禁用
  &-disabled {
    background: #d8d8d8;
    color: $white;
  }
  span {
    font-size: $font-size-xs;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    line-height: 15px;
    letter-spacing: 2px;
  }
}
</style>
