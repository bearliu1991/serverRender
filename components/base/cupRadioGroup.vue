/CheckboxGroup/index.vue

<template>
  <div :class="['cs-checkboxgroup', { ['checkbox-inline']: inline }]">
    <slot></slot>
  </div>
</template>

<script>
import { findComponentsDownward } from '../../assets/js/utils'
export default {
  name: 'CupRadioGroup',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    inline: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
    },
  },
  data() {
    return {
      childrens: [],
      currentValue: this.value,
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
      this.updateModel()
    },
  },
  mounted() {
    this.updateModel()
  },
  methods: {
    updateModel() {
      this.childrens = findComponentsDownward(this, 'CupRadio')
      if (this.childrens) {
        this.childrens.forEach((element) => {
          element.model = this.currentValue
          try {
            element.currentValue = this.currentValue.includes(element.label)
          } catch (error) {}
        })
      }
    },
    change(value) {
      this.currentValue = value
      this.$emit('input', value)
      this.$emit('change', value)
      this.updateModel()
    },
  },
}
</script>
<style lang="scss">
.checkbox-inline {
  display: flex;
  flex-direction: column;
}
</style>
