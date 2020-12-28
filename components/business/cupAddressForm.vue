<template>
  <el-form
    ref="addressForm"
    :validate-on-rule-change="false"
    :class="['cup-input', terminal]"
    :model="formData"
    :rules="rules"
  >
    <!-- first name -->
    <el-form-item prop="firstName" class="cs-w-5">
      <el-input
        v-model="formData.firstName"
        :disabled="source == 'order'"
        placeholder="First name"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <!-- last name -->
    <el-form-item prop="lastName" class="cs-w-5 cs-ml-8">
      <el-input
        v-model="formData.lastName"
        :disabled="source == 'order'"
        placeholder="Last name"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <!-- company -->
    <el-form-item>
      <el-input
        v-model="formData.company"
        :disabled="source == 'order'"
        placeholder="Company ( optional )"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <!-- 地址1 -->
    <el-form-item prop="addressFirst">
      <el-input
        v-model="formData.addressFirst"
        placeholder="Address"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <!-- address2 -->
    <el-form-item prop="addressSecond">
      <el-input
        v-model="formData.addressSecond"
        placeholder="Appartment, suite, etc. ( optional )"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <!-- city -->
    <el-form-item prop="city">
      <el-input
        v-model="formData.city"
        :disabled="source == 'order'"
        placeholder="City"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <!-- country -->
    <el-form-item
      prop="country"
      :class="[areas.state.length > 0 ? 'cs-w-3' : 'cs-w-6']"
    >
      <cup-select
        v-model="formData.countryId"
        :disabled="source == 'order'"
        placeholder="Country / Region"
        @input="changeCountry"
      >
        <cup-option
          v-for="item in areas.country"
          :key="item.id"
          :label="item.region"
          :value="item.id"
        ></cup-option>
      </cup-select>
    </el-form-item>
    <!-- province -->
    <el-form-item
      v-if="areas.state.length > 0"
      prop="stateId"
      class="cs-w-3 cs-ml-8"
    >
      <cup-select
        v-model="formData.stateId"
        :disabled="source == 'order'"
        placeholder="State / Province"
        @input="changeState"
      >
        <cup-option
          v-for="item in areas.state"
          :key="item.id"
          :label="item.region"
          :value="item.id"
        ></cup-option>
      </cup-select>
    </el-form-item>
    <!-- 邮编 -->
    <el-form-item prop="postcode" class="cs-w-4 cs-ml-8">
      <el-input
        v-model="formData.postcode"
        :disabled="source == 'order'"
        placeholder="ZIP / Postal code"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <!-- 电话 -->
    <el-form-item prop="telephone">
      <el-input
        v-model="formData.telephone"
        placeholder="Phone"
        :disabled="source == 'order'"
        autocomplete="off"
      >
        <el-tooltip
          v-if="!isEdit"
          slot="suffix"
          class="item"
          effect="light"
          :content="toolTips"
          placement="top-end"
        >
          <i class="el-input__icon el-icon-tel"></i>
        </el-tooltip>
      </el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { addressRule } from '@assets/js/rules.js'
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    source: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      toolTips: 'In case we need to contact you about your order',
      addressId: -1,
      addressRule,
      rules: {},
      formData: {
        firstName: '',
        lastName: '',
        // 地址1
        addressFirst: '',
        // 地址2
        addressSecond: '',
        country: '',
        countryId: '',
        city: '',
        // province: '',
        stateId: '',
        // 邮编
        postcode: '',
        telephone: '',
        stateName: '',
      },

      areas: {
        country: [],
        state: [],
      },
      value: '',
    }
  },
  watch: {
    formData: {
      handler(val) {
        this.$refs.addressForm.clearValidate()
        this.rules = {}
      },
      deep: true,
    },
  },
  created() {
    const { isEdit, formData, data } = this
    // 编辑
    if (isEdit) {
      // 数据合并
      this.formData = {
        ...formData,
        ...data,
      }
    } else {
      this.clearData()
    }
    // 3、查询国家
    this.queryAddressArea('country')
  },
  methods: {
    // 表单校验
    async validForm() {
      let isValidPass = null
      this.rules = this.addressRule
      await this.$nextTick()
      this.$refs.addressForm.validate((valid) => {
        if (valid) {
          isValidPass = true
        } else {
          isValidPass = false
        }
      })
      return isValidPass
    },
    /**
     * 切换国家
     */
    changeCountry(value, label) {
      this.formData.country = label
      this.queryAddressArea('state', value)
      this.formData.stateName = ''
      this.formData.stateId = ''
    },
    // 更新state
    changeState(value, label) {
      this.formData.stateName = label
    },
    /**
     * 查询地址的省市州
     */
    async queryAddressArea(category, id = '') {
      const result = await this.$api.address.queryAddressArea(category, id)
      if (result) {
        const { regions } = result
        this.areas[category] = regions
      }
    },
    // 选择 use a new  address  清空地址信息
    clearData() {
      this.formData = {
        firstName: '',
        lastName: '',
        // 地址1
        addressFirst: '',
        // 地址2
        addressSecond: '',
        country: '',
        countryId: '',
        city: '',
        stateName: '',
        stateId: '',
        // 邮编
        postcode: '',
        telephone: '',
      }
      // 清空后要刷新物流
    },
  },
}
</script>
<style lang="scss" scoped>
/deep/ .el-form {
  font-size: 0;
  &-item {
    &__content {
      margin-bottom: 16px;
    }
  }
  .iconicon-wap-18-jiamoren {
    margin-right: 8px;
  }
}
/deep/ .el-icon-tel.el-input__icon {
  height: 18px;
  line-height: 18px;
  &::after {
    font-family: 'iconfont' !important;
    font-size: 18px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: inline-block;
    content: '\e6ed';
    width: 18px;
    text-align: center;
    color: #333;
  }
}
.mobile {
  &.el-form {
    /deep/.el-form-item {
      &.cs-w-5,
      &.cs-w-3,
      &.cs-w-4,
      &.cs-w-6 {
        width: 100%;
        &.cs-ml-8 {
          margin-left: 0;
        }
      }
    }
  }
}
</style>
