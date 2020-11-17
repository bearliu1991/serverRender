<template>
  <el-form
    ref="addressForm"
    class="cup-input"
    :model="formData"
    :rules="addressRule"
  >
    <!-- 地址 -->
    <!-- <el-form-item v-if="isLogin" prop="email">
      <cup-select v-model="ts" placeholder="Use a new address">
        <cup-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></cup-option>
      </cup-select>
    </el-form-item> -->
    <!-- first name -->
    <el-form-item prop="firstName" class="cs-w-5">
      <el-input
        v-model="formData.firstName"
        placeholder="First name"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <!-- last name -->
    <el-form-item prop="lastName" class="cs-w-5 cs-ml-8">
      <el-input
        v-model="formData.lastName"
        placeholder="Last name"
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
        placeholder="City"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <!-- country -->
    <el-form-item
      prop="country"
      :class="areas.state.length > 0 ? 'cs-w-3' : 'cs-w-6'"
    >
      <cup-select
        v-model="formData.countryId"
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
      prop="province"
      class="cs-w-3 cs-ml-8"
    >
      <cup-select v-model="formData.stateId" placeholder="State / Province">
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
        placeholder="ZIP / Postal code"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <!-- 电话 -->
    <el-form-item prop="telephone">
      <el-input
        v-model="formData.telephone"
        placeholder="Phone"
        autocomplete="off"
        suffix-icon="el-icon-tel"
      ></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapState } from 'vuex'
import { addressRule } from '@assets/js/rules.js'
import { isEmpty } from '@assets/js/utils.js'
export default {
  props: {
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      addressRule,
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
        province: '',
        stateId: '',
        // 邮编
        postcode: '',
        telephone: '',
      },
      areas: {
        country: [],
        state: [],
      },
      value: '',
    }
  },
  computed: mapState([
    // 映射 this.count 为 store.state.count
    'isLogin',
    'loginInfo',
    'checkoutData',
  ]),
  inject: ['updateAddress'],
  watch: {
    formData: {
      handler(val) {
        const { type } = this
        if (type === 'ship') {
          this.updateAddress(type, val)
        }
      },
      deep: true,
    },
  },
  created() {
    // 1、未登录时  若cookie中有填写的地址，则默认显示
    const { type, checkoutData } = this
    const address = this.$store.state[`${type}Address`]
    // 用户cookie中有地址
    if (!isEmpty(address)) {
      Object.assign(this.formData, address)
    }
    // 当前页面有操作记录，刷新后保留历史记录，页面销毁时删除
    if (
      type === 'ship' &&
      !isEmpty(checkoutData) &&
      !isEmpty(checkoutData.shipAddress)
    ) {
      Object.assign(this.formData, checkoutData[`${type}Address`])
    }
    this.queryAddressArea('country')
  },
  methods: {
    validForm() {
      let isValidPass = true
      this.$refs.addressForm.validate((valid) => {
        if (valid) {
          isValidPass = true
        } else {
          isValidPass = false
        }
      })
      return isValidPass
    },
    changeCountry(value, label) {
      this.formData.country = label
      this.queryAddressArea('country', value)
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
}
/deep/ .el-icon-tel.el-input__icon {
  &::after {
    font-family: 'iconfont' !important;
    font-size: 30px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: inline-block;
    content: '\e65b';
    width: 25px;
    text-align: center;
  }
}
</style>
