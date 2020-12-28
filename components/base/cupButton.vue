<template>
  <div
    :class="[
      'cs-button',
      `cs-button-${type}`,
      size ? `cs-button-${size}` : '',
      disabled ? `cs-button-disabled` : '',
      block ? `cs-button-block` : '',
      animated ? 'hvr-sweep-to-right' : '',
    ]"
    @click.stop="click"
  >
    <span>
      <slot>默认</slot>
    </span>
  </div>
</template>
<script>
export default {
  name: 'CupButton',
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
    animated: {
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
  height: 44px;
  line-height: 44px;
  // type
  &-default {
    background: #ffffff;
    border: 1px solid #000000;
    color: $primary;
  }
  &-plain {
    background: #ffffff;
    color: $primary;
    box-shadow: 0px -2px 20px 0px rgba(0, 0, 0, 0.05);
    border: 1px solid #d8d8d8;
  }
  &-primary {
    background: $black;
    color: $white;
    border: 1px solid $black;
  }
  // sieze
  &-big {
    height: 56px;
    line-height: 56px;
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
    border-color: #d8d8d8;
    color: $white;
  }
  span {
    font-size: $font-size-xs;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    line-height: 15px;
    letter-spacing: 1px;
  }
}
</style>
