<template>
  <li
    :class="['cs-select-item', model == value ? 'active' : '']"
    @mousedown.stop="handlerClick"
  >
    <slot>
      <span>
        {{ label || value }}
      </span>
    </slot>
  </li>
</template>
<script>
import { findComponentUpward } from './../../assets/js/utils'
export default {
  name: 'CupOption',
  props: {
    label: {
      type: [String, Number],
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      model: '',
    }
  },
  watch: {
    model(val) {
      if (val === this.value) {
        this.parent.change(this.label, this.value)
      }
    },
  },
  mounted() {
    const parent = findComponentUpward(this, 'CupSelect')
    if (parent) {
      this.parent = parent
      parent.updateModel()
    }
  },
  methods: {
    handlerClick() {
      if (this.parent) {
        this.model = this.value
      }
      this.$emit('change', this.value)
    },
  },
}
</script>
<style lang="scss" scoped>
li {
  height: 44px;
  padding: 0 12px;
  font-size: 14px;
  color: #999999;
  line-height: 44px;
  border-bottom: 1px solid #d8d8d8;
  @include line-clamp(1);
  span {
    overflow: hidden;
  }
  &.active {
    color: #333;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #333333;
  }
  &:hover {
    background: #f2f2f2;
  }
}
</style>
