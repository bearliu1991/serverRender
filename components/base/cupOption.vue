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
        this.parent.change(this.label, this.value)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
li {
  height: 44px;
  padding: 0 12px;
  font-size: 14px;
  font-family: Muli-Regular_Light, Muli;
  font-weight: normal;
  color: #999999;
  line-height: 44px;
  border-bottom: 1px solid #d8d8d8;
  &.active {
    color: #333;
  }
  &:hover {
    background: rgba(255, 171, 0, 0.1);
    color: #333;
  }
}
</style>
