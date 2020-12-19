<template>
  <div :class="['cs-arrival', $store.state.terminal]">
    <cup-dialog class="cs-arrival-product" v-bind="$attrs" v-on="$listeners">
      <h1>
        Be the first to know when this is back in stock!
      </h1>
      <p class="cs-arrival-name">Aqua Cutout Knotted One-Piece Swimsuit</p>
      <ul class="cs-arrival-info">
        <li>
          <label>Size：</label>
          <span>{{ product.size }}</span>
        </li>
        <li>
          <p class="img">
            <img :src="product.colorImageUrl" alt="" srcset="" />
          </p>
          <span>{{ product.color }}</span>
        </li>
      </ul>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <el-form-item prop="email">
          <el-input
            v-model="ruleForm.email"
            class="cup-input"
            type="email"
            placeholder="Please enter email"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <!-- 订阅成功，有货时我们通知你。  订阅失败，请重试。 -->
          <div v-if="status > 0" class="cs-arrival-tips">
            <!-- <p v-if="status == 2" class="cs-icon-box">
              <i class="icon-complete"></i>
            </p> -->
            <p v-if="status > 1" class="cs-tips-box complete">
              <span>
                {{ msg[status] }}
                <!-- <a class="cs-link-text">close</a> -->
              </span>
            </p>
            <p v-else class="cs-fail-msg">
              {{ msg[status] }}
            </p>
          </div>
          <cup-button
            v-show="status != 2 && status != 3"
            block
            type="primary"
            @click="notify('ruleForm')"
            >NOTIFY ME</cup-button
          >
        </el-form-item>
      </el-form>
    </cup-dialog>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      ruleForm: {
        email: '',
      },
      status: 0,
      msg: {
        1: 'Oops...Subscription failed, please try again.',
        2: `You're in! We'll let you know when it's back.`,
        3: 'You’ve already registered.',
      },
      rules: {
        email: [
          { required: true, message: 'Please enter email', trigger: 'blur' },

          {
            type: 'email',
            message: 'Incorrect email format.',
            trigger: ['blur'],
          },
        ],
      },
    }
  },
  mounted() {
    this.ruleForm.email = this.loginInfo.email
  },
  methods: {
    notify(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.queryArrivalNotice()
        } else {
          return false
        }
      })
    },
    async queryArrivalNotice() {
      const {
        product: { skuId },
        ruleForm: { email },
      } = this
      const result = await this.$api.product
        .queryArrivalNotice({
          email,
          source: 0,
          skuId,
        })
        .catch((error) => {
          if (error.retCode === 'PS4100004') {
            this.status = 3
          } else {
            this.status = 1
          }
          return error
        })
      if (!result) {
        this.status = 2
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-arrival {
  /deep/ .cs-dialog_header {
    height: 40px;
    line-height: 40px;
  }
  h1 {
    font-size: 18px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #333333;
    line-height: 27px;
    margin-bottom: 24px;
  }
  .mar-b10 {
    margin-bottom: 12px;
  }
  &-name {
    font-size: 12px;
    color: #666666;
    line-height: 15px;
    @extend .mar-b10;
  }
  &-info {
    li {
      @extend .mar-b10;

      height: 44px;
      background: #ffffff;
      border: 1px solid #f2f2f2;
      line-height: 44px;

      font-size: 14px;
      color: #999999;
      line-height: 18px;
      display: flex;
      align-items: center;
      padding: 0 12px;
      label,
      .img {
        margin-right: 12px;
      }
      .img {
        width: 32px;
        height: 32px;
        img {
          height: 100%;
        }
      }
    }
  }
  .el-form-item {
    margin-bottom: 0;
    &:first-child {
      margin-top: 24px;
      margin-bottom: 12px;
    }
    &.is-error + .el-form-item {
      margin-top: 31px;
    }
  }
  .cs-button {
    margin-bottom: 16px;
  }
  &-tips {
    text-align: left;
    .cs-tips-box {
      padding: 6px 12px;
      line-height: normal;
      span {
        font-size: 12px;
        line-height: 16px;
      }
      &.complete {
        margin-bottom: 30px;
        background: rgba(13, 153, 0, 0.15);
        color: #0d9900;
      }
      &.cs-fail-msg {
        margin-top: 12px;
      }
    }
  }
  &.pc {
    h1 {
      margin-bottom: 20px;
    }
    .cs-arrival {
      &-name {
        margin-bottom: 10px;
      }
      &-info {
        li {
          margin-bottom: 10px;
        }
      }
      &-tips {
        .cs-tips-box {
          &.complete {
            margin-bottom: 16px;
          }
        }
      }
    }
    .el-form-item {
      &:first-child {
        margin-top: 30px;
        margin-bottom: 10px;
      }
      &.is-error + .el-form-item {
        margin-top: 27px;
      }
    }
    /deep/.cs-dialog {
      &-wrapper {
        width: 440px;
      }
      &_body {
        padding: 0 40px 24px 40px;
      }
      &_header {
        .icon {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
