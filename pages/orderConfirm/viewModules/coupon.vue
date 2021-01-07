<template>
  <div class="cs-giftCard">
    <div class="card-con">
      <el-form class="cup-input" :model="formData">
        <el-form-item prop="couponNo" :class="isError ? 'is-error' : ''">
          <el-input
            v-model="formData.couponNo"
            placeholder="Gift card or discount code"
            type="text"
            autocomplete="off"
            @focus="onFocus"
          ></el-input>
          <div v-if="isError" class="el-form-item__error">
            {{ errorMsg }}
          </div>
        </el-form-item>
        <el-form-item>
          <cup-button type="primary" @click="apply">Apply</cup-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 已选中的折扣优惠券 -->
    <div v-if="!isEmpty(discounts)" class="card-selected">
      <template v-for="value in discounts">
        <div
          :key="value.category"
          :class="[
            'card-buttons',
            value.disCodeType === 2 && !orderParams.shipAddress.countryId
              ? 'error'
              : '',
          ]"
        >
          <template v-if="value.category == 1">
            <i class="icon iconfont iconwap-14-lipinka"></i>
            <span
              >....{{
                value.code.substring(value.code.length - 4, value.code.length)
              }}</span
            >
          </template>
          <template v-else>
            <i class="icon iconfont iconwap-14-zhekou"></i>
            <span>{{ value.code }}</span>
          </template>
          <i
            class="icon iconfont iconweb-10-guanbi"
            @click="remove(value.category)"
          ></i>
        </div>
        <div
          :key="value.code"
          v-if="value.disCodeType === 2 && !orderParams.shipAddress.countryId"
          class="cs-error"
        >
          Please fill in the address, before using free shipping voucher.
        </div>
      </template>
    </div>
  </div>
</template>
<script>
/**
 * 折扣码类型:0-百分比 1-固定金额 2-免费送货 3-满X减Y 4-梯度折扣
 * 折扣类型 1-礼品卡，2-折扣码
 */
export default {
  inject: ['discounts', 'updatePrice', 'orderParams', 'orderSummary'],
  data() {
    return {
      formData: {
        couponNo: '',
      },
      isError: false,
      //
      errorMsg: 'please enter a valid gift card or discount code.',
    }
  },
  methods: {
    async apply() {
      const { couponNo } = this.formData
      const {
        delivery,
        productList,
        hasGiftProduct,
        shipAddress: { countryId, stateId },
      } = this.orderParams
      // 1、code为空提示
      if (this.isEmpty(couponNo)) {
        this.isError = true
        return false
      }
      // 若地址为空，则提示
      if (this.isEmpty(countryId)) {
        this.isError = true
        this.errorMsg =
          'Please fill in the address, before using free shipping voucher.'
        return false
      }
      // 2、code输入不合法提示
      if (!/[0-9A-Z-a-z]{1,14}/.test(couponNo)) {
        this.isError = true
        return false
      }

      const { totalPrice, totalWeight, orderPrice } = this.orderSummary
      const params = {
        totalAmount: orderPrice.subtotal || totalPrice,
        totalWeight,
        codes: [
          {
            code: couponNo,
          },
        ],
        products: productList,
        shipId: delivery.shipId,
        countryId,
        stateId,
      }
      // 含有礼品卡商品，优惠券不能使用
      if (hasGiftProduct) {
        this.isError = true
        this.errorMsg =
          'When the product and gift card are purchased together, the discount cannot be used'
        return false
      }
      const result = await this.$api.order.validCodeType(params).catch(() => {
        this.couponNo = ''
        // this.isError = true
        // this.errorMsg = error.retInfo || 'system error.'
      })
      if (result) {
        const { category, disCodeType } = result
        this.discounts[category] = {
          code: couponNo,
          category,
          amount: '',
          disCodeType,
        }
        this.$forceUpdate()
        if (disCodeType === 2 && !countryId) {
          // this.isError = true
          this.errorMsg =
            'Please fill in the address, before using free shipping voucher.'
          return false
        }
        this.formData.couponNo = ''
        // 算价
        this.updatePrice()
      } else {
        this.isError = true
      }
    },
    remove(category) {
      delete this.discounts[category]
      this.$forceUpdate()
      this.isError = false
      // 算价
      this.updatePrice()
    },
    // 获取到焦点后不显示错误信息
    onFocus() {
      this.isError = false
    },
    // 校验成功后显示
    showError(error) {
      // 校验优惠折扣是否通过
      this.isError = true
      this.errorMsg = error.retInfo
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-giftCard {
  padding: 20px 0;
  // border-bottom: 1px solid #f2f2f2;
  .el-form {
    display: flex;
    &-item:first-child {
      flex: 1;
    }
  }
  .cs-success-msg {
    margin-bottom: 16px;
  }
  .card-selected {
    margin-top: 16px;
    margin-right: 16px;
    .cs-error {
      font-size: 12px;
      color: #e61717;
      line-height: 15px;
    }
    .card-buttons {
      height: 32px;
      line-height: 32px;
      border: 1px solid #d8d8d8;
      padding: 0 12px;
      display: inline-block;
      &.error {
        border: 1px solid #e61717;
      }
      span {
        margin-left: 8px;
        margin-right: 12px;
        display: inline-block;
      }
      i {
        vertical-align: middle;
        font-size: 10px;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  &.mobile {
    padding: 24px 0;
  }
}
</style>
