<template>
  <label class="cs-radio">
    <span :class="[{ ['disabled']: parenDisabled }]">
      <i
        :class="[currentValue ? 'icon_radio_selected' : 'icon_radio_border']"
      ></i>
    </span>
    <input
      v-if="parent"
      v-model="model"
      type="radio"
      :value="label"
      class="cs-radio-input"
      :disabled="parenDisabled"
      hidden
      @change="change"
    />
    <input
      v-else
      type="radio"
      class="cs-radio-input"
      :checked="currentValue"
      :disabled="parenDisabled"
      hidden
      @change="change"
    />
    <span
      :class="['cs-radio-text', { ['disabled']: parenDisabled }]"
      onselectstart="return false;"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
<script>
import { findComponentUpward } from './../../assets/js/utils'
export default {
  name: 'CupRadio',
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
  },
  data() {
    return {
      parent: '',
      currentValue: this.value,
      model: '',
    }
  },
  computed: {
    parenDisabled() {
      if (this.parent) {
        const { parentFnc } = this
        return parentFnc('disabled')
      }
      return this.disabled
    },
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    model(val) {
      if (!this.label) {
        return
      }
      if (val === this.label) {
        this.currentValue = true
        return
      }
      this.currentValue = false
    },
  },
  mounted() {
    const parent = findComponentUpward(this, 'CupRadioGroup')
    if (parent) {
      this.parent = parent
      parent.updateModel()
    }
  },
  methods: {
    /**
     * 根据入参判断CheckboxGroup组件是否有指定的的值
     */
    parentFnc(options, value) {
      if (value) {
        return this.parent[options] === value
          ? this[options]
          : this.parent[options]
      }
      return this.parent[options] ? this.parent[options] : this[options]
    },
    change(e) {
      if (this.parenDisabled) {
        return
      }
      // 如果存在父组件的实例，则触发父组件对应的方法
      if (this.parent) {
        this.parent.change(this.model)
        return
      }
      this.currentValue = e.target.checked
      this.$emit('input', this.currentValue)
      this.$emit('on-change', this.currentValue)
    },
  },
}
</script>
<style lang="scss">
.cs-radio {
  font-size: 0;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.cs-radio-text {
  font-size: 14px;
  color: #333333;
  margin-left: 8px;
}
.icon_radio_selected {
  @include icon-image('icon_radio_selected');
  width: 24px;
  height: 24px;
}
.icon_radio_border {
  @include icon-image('icon_radio_border');
  width: 24px;
  height: 24px;
}
</style>
