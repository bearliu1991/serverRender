<template>
  <div class="cs-input">
    <div :class="['cs-input-info', isValid ? '' : 'error']">
      <label v-if="label">{{ label }}</label>
      <input
        v-model="value"
        class="cs-input-inner"
        :type="type"
        value="3333"
        :placeholder="placeholder"
        @input="inputEvent($event)"
        @blur="blur"
      />
    </div>
    <p class="msg-error">
      <slot name="error"
        ><span v-if="!isValid">{{ message }}</span></slot
      >
    </p>
  </div>
</template>
<script>
export default {
  name: 'CupInput',
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '请输入内容',
    },
    type: {
      type: String,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    minlength: {
      type: [Number, String],
      default: '',
    },
    maxlength: {
      type: [Number, String],
      default: '',
    },
    // 校验规则 { message: '请输入活动名称',regex: '' }
    rules: {
      type: Array,
      default: () => {
        return []
      },
    },
    // 是否开启校验
    validEvent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isValid: true,
      message: '',
      emailRegex: {
        message: 'Incorrect email format.',
        regex: /^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,3}$/,
      },
    }
  },
  methods: {
    // valid() {
    //   const { type, rules } = this
    //   const { regex, message } = rules
    //   // if (type === 'email') {
    //   //   regex = this.emailRegex
    //   //   message = 'Please enter email'
    //   // }
    //   // return regex.test(this.value)
    // },
    handlerRule(trigger) {
      const { rules } = this
      let validFlag = true
      try {
        rules
          .filter((rule) => {
            return rule.trigger === trigger
          })
          .forEach((item) => {
            validFlag = this.valid(item)
            if (!validFlag) {
              throw new Error('抛出异常跳出')
            }
          })
      } catch (error) {}
      this.isValid = validFlag

      return validFlag
    },
    valid(item) {
      // 校验结果
      let validFlag = true
      // 校验错误文案
      let errorMsg = ''

      const {
        value: { length },
        minlength = '',
        maxlength = '',
        value,
      } = this
      // 对象合并
      const {
        min = minlength,
        max = maxlength,
        regex = '',
        message = '',
      } = this.concatBase(item)
      if (item.required) {
        if (!value) {
          errorMsg = '必填项'
          validFlag = false
        }
      } else if (min || max) {
        if (length < min) {
          validFlag = false
          errorMsg = `最小长度为${min}`
        }
        if (length > max) {
          errorMsg = `最大长度为${max}`
          validFlag = false
        }
      } else if (!regex.test(value)) {
        validFlag = false
      }
      if (!validFlag) {
        this.message = message || errorMsg
      }
      return validFlag
    },
    /**
     * 合并自定义正则和初始正则
     */
    concatBase(item) {
      const { type } = this
      let obj = ''
      switch (type) {
        case 'email':
          obj = emailRegex
          break

        default:
          obj = item
          break
      }
      return Object.assign(obj, item)
    },
    blur() {
      const { validEvent } = this
      if (validEvent) {
        this.isValid = this.handlerRule('blur')
      }
      if (!this.isValid) {
        return false
      }
    },
    inputEvent(event) {
      this.$emit('input', event.currentTarget.value)
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-input {
  width: 100%;
  &-inner {
    -webkit-appearance: none;
    background-image: none;
    border-radius: 0;

    border: 1px solid #d8d8d8;
    height: 44px;
    line-height: 44px;
    outline: none;
    padding: 0 12px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    color: #999;
    &:focus {
      outline: none;
      border-color: #000;
    }
    &::-webkit-input-placeholder {
      color: #999999;
    }
  }
  &-info {
    color: #999999;
    background: #ffffff;
    font-size: 14px;
    @include font($fontRegular);
    &.error {
      input {
        border: 1px solid #e61717;
      }
      & + .msg-error {
        font-size: 12px;
        @include font($fontRegular);
        color: #e61717;
        line-height: 15px;
        margin-top: 2px;
      }
    }
  }
}
</style>
