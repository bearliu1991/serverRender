<template>
  <el-form
    ref="addressForm"
    :validate-on-rule-change="false"
    class="cup-input"
    :model="formData"
    :rules="rules"
  >
    <!-- 地址 -->
    <el-form-item v-if="$cookies.get('token') && type === 'ship'">
      <cup-select v-model="addressId" placeholder="Use a new address">
        <cup-option label="Use a new address" :value="-1" @myEvent="clearData">
          <i class="icon iconfont iconicon-wap-18-jiamoren"></i>
          Use a new address
        </cup-option>
        <template v-if="addressList.length">
          <cup-option
            v-for="item in addressList"
            :key="item.id"
            :label="`${item.addressSecond ? item.addressSecond + ',' : ''}${
              item.city ? item.city + ',' : ''
            }${item.state ? item.state + ',' : ''}${item.postcode},${
              item.country
            }（${item.firstName} ${item.lastName}）`"
            :value="item.id"
          >
          </cup-option>
        </template>
      </cup-select>
    </el-form-item>
    <!-- first name -->
    <el-form-item prop="firstName" class="cs-w-5">
      <el-input
        v-model="formData.firstName"
        placeholder="First name"
        autocomplete="off"
        @change="changeInput"
      ></el-input>
    </el-form-item>
    <!-- last name -->
    <el-form-item prop="lastName" class="cs-w-5 cs-ml-8">
      <el-input
        v-model="formData.lastName"
        placeholder="Last name"
        autocomplete="off"
        @change="changeInput"
      ></el-input>
    </el-form-item>
    <!-- company -->
    <el-form-item>
      <el-input
        v-model="formData.company"
        placeholder="Company ( optional )"
        autocomplete="off"
        @change="changeInput"
      ></el-input>
    </el-form-item>
    <!-- 地址1 -->
    <el-form-item prop="addressFirst">
      <el-input
        v-model="formData.addressFirst"
        placeholder="Address"
        autocomplete="off"
        @change="changeInput"
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
        @change="changeInput"
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
      prop="state"
      class="cs-w-3 cs-ml-8"
    >
      <cup-select
        v-model="formData.stateId"
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
        placeholder="ZIP / Postal code"
        autocomplete="off"
        @change="changeInput"
      ></el-input>
    </el-form-item>
    <!-- 电话 -->
    <el-form-item prop="telephone">
      <el-input
        v-model="formData.telephone"
        placeholder="Phone"
        autocomplete="off"
        @change="changeInput"
      >
        <el-tooltip
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
import { mapState } from 'vuex'
import { addressRule } from '@assets/js/rules.js'
export default {
  props: {
    type: {
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
      addressList: [],
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
  computed: {
    ...mapState([
      // 映射 this.count 为 store.state.count
      'checkoutData',
    ]),
    area() {
      const { countryId, stateId } = this.formData
      return {
        countryId,
        stateId,
      }
    },
  },
  inject: ['orderParams', 'updatePrice'],
  watch: {
    formData: {
      handler(val) {
        this.$refs.addressForm.clearValidate()
        this.rules = {}
        this.orderParams[`${this.type}Address`] = val
      },
      deep: true,
    },
    area: {
      handler(val) {
        const { type } = this
        if (type === 'ship') {
          this.updatePrice()
        }
      },
      deep: true,
    },
    addressId: {
      handler(val) {
        const { type } = this
        if (type !== 'ship') {
          return false
        }
        if (val === -1) {
          //  清空formData
          // 选择 Use a shipping address”时，底部展示“Save this information for next time”
          if (type === 'ship') {
            this.$parent.show(true)
          }
        } else {
          const { addressList } = this
          const result = addressList.find((item) => {
            return item.id === val
          })
          this.formData = JSON.parse(JSON.stringify(result))
          this.$parent.show(false)
        }
        this.$forceUpdate()
      },
      immediate: true,
    },
  },
  created() {
    const { type, $cookies } = this

    // 1、优先设置获取本地数据
    if (type === 'ship') {
      this.getLocalAddress()
    }
    // 2、查询是否有用户地址
    if ($cookies.get('token')) {
      this.queryAddressList()
    }
    // 3、查询国家
    this.queryAddressArea('country')
  },
  methods: {
    /**
     * 初始页显示本地数据
     */
    getLocalAddress() {
      const address = this.$store.state.cookieShipAddress
      // 1、未登录时  若cookie中有填写的地址，则默认显示
      // 2、已登录时，若用户没有地址信息，则默认显示cookie中的数据
      if (!this.isEmpty(address)) {
        Object.assign(this.formData, address)
      }
      // this.$nextTick(function () {
      //   this.validForm()
      // })
    },
    /**
     * 1、已登录用户  查询用户地址
     * 2、当有用户地址信息时，展示用户地址
     * 3、默认的规则：
     *     若有默认地址展示默认地址
     *     若无默认地址展示最近使用一次的地址
     * 4、当用户无地址时，展示cookie中的地址，此时选择器选中 use a new address
     *
     */
    async queryAddressList() {
      const result = await this.$api.address.getAddressList()
      if (result && result.list.length) {
        const { list } = result
        this.addressList = list
        // 设置默认Id
        const defaultAddress = list.find((item) => {
          return item.isDefault === 1
        })
        if (defaultAddress) {
          this.addressId = defaultAddress.id
        } else {
          this.addressId = list[0].id
        }
      }
    },
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
      this.queryAddressArea('country', value)
    },
    // 更新state
    changeState(value, label) {
      this.formData.stateName = label
    },
    changeInput() {
      this.addressId = -1
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
</style>
