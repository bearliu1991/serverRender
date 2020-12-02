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
        <div :key="value.category" class="card-buttons">
          <i
            :class="[
              'icon iconfont',
              value.category == 2 ? 'iconwap-14-zhekou' : 'iconwap-14-lipinka',
            ]"
          ></i>
          <span>{{ value.code }}</span>
          <i
            class="icon iconfont iconweb-10-guanbi"
            @click="remove(value.category)"
          ></i>
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
      errorMsg: 'Enter a valid gift card or discount code.',
    }
  },
  methods: {
    async apply() {
      const { couponNo } = this.formData
      const {
        delivery,
        productList,
        hasGiftProduct,
        shipAddress: { countryId },
      } = this.orderParams
      const { totalPrice, totalWeight } = this.orderSummary
      const params = {
        totalAmount: totalPrice,
        totalWeight,
        codes: [
          {
            code: couponNo,
          },
        ],
        products: productList,
        shipId: delivery.shipId,
      }
      // 含有礼品卡商品，优惠券不能使用
      if (hasGiftProduct) {
        this.isError = true
        this.errorMsg =
          'When the product and gift card are purchased together, the discount cannot be used'
        return false
      }
      const result = await this.$api.order
        .validCodeType(params)
        .catch((error) => {
          this.isError = true
          this.errorMsg = error.retInfo
        })
      if (result) {
        const { category, disCodeType } = result
        this.discounts[category] = {
          code: couponNo,
          category,
          // codeType: disCodeType,
          amount: '',
        }
        this.$forceUpdate()
        if (disCodeType === 2 && !countryId) {
          this.isError = true
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
    .card-buttons {
      height: 32px;
      line-height: 32px;
      border: 1px solid #d8d8d8;
      padding: 0 12px;
      display: inline-block;
      i {
        font-size: 10px;
        &:first-child {
          font-size: 16px;
        }
        span {
          margin-left: 8px;
          margin-left: 12px;
          display: inline-block;
        }
      }
    }
  }
  &.mobile {
    padding: 24px 0;
  }
}
</style>
