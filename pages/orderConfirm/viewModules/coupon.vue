<template>
  <div class="cs-giftCard">
    <div class="cs-success-msg">You discount has been applied</div>
    <div class="card-con">
      <el-form class="cup-input" :model="formData">
        <el-form-item prop="couponNo">
          <el-input
            v-model="formData.couponNo"
            placeholder="Gift card or discount code"
            type="text"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <cup-button type="primary" @click="apply">Apply</cup-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 已选中的折扣优惠券 -->
    <div class="card-selected">
      <div class="card-buttons">
        <i class="icon iconfont iconicon-wap-14-zhekou"></i>
        <span>STB20JULY-5ty5qb</span>
        <i class="icon iconfont iconicon-web-14-sousuoguanbi"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ['activity', 'updatePrice'],
  data() {
    return {
      formData: {
        couponNo: '',
      },
    }
  },
  methods: {
    async apply() {
      const { couponNo } = this.formData
      const result = await this.$api.order.validCodeType(couponNo)
      if (result) {
        const { category, code } = result
        if (category === 2) {
          this.activity.coupon.couponNo = code
        } else if (category === 1) {
          this.activity.giftCard.giftCardNo = code
        }
      }
      // 算价
      this.updatePrice()
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-giftCard {
  padding: 20px 0;
  border-bottom: 1px solid #f2f2f2;
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
}
</style>
