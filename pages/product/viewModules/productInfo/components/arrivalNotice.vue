<template>
  <div class="cs-arrival">
    <cup-dialog class="cs-arrival-product" v-bind="$attrs" v-on="$listeners">
      <h1>
        Register to Receive A Notification When This Item Comes Back in Stock.
      </h1>
      <p class="cs-arrival-name">Aqua Cutout Knotted One-Piece Swimsuit</p>
      <ul class="cs-arrival-info">
        <li>
          <label>Size</label>
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
          <div class="cs-arrival-tips">
            <p class="cs-icon-box">
              <i class="icon-complete"></i>
            </p>
            <p class="cs-tips-box complete">
              <span>
                You're in! We'll let you know when it's
                <a class="cs-link-text">close</a>
              </span>
            </p>
          </div>
          <cup-button block type="primary" @click="notify('ruleForm')"
            >Notify Me</cup-button
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
      subscribeMsg: {
        '0': 'Oops...Subscription failed, please try again.',
        '1': `You're in! We'll let you know when it's back.`,
      },
      rules: {
        email: [
          { required: true, message: 'Please enter email', trigger: 'blur' },

          {
            type: 'email',
            message: 'Incorrect email format.',
            trigger: ['blur', 'change'],
          },
        ],
      },
    }
  },
  methods: {
    notify(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-arrival {
  h1 {
    font-size: 18px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #333333;
    line-height: 27px;
    margin: 8px 0 20px 0;
  }
  .mar-b10 {
    margin-bottom: 10px;
  }
  &-name {
    font-size: 12px;
    font-family: Muli-Regular_Light, Muli;
    font-weight: normal;
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
      font-family: Muli-Regular_Light, Muli;
      font-weight: normal;
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
      &:last-child {
        margin-top: 30px;
      }
    }
  }
  .cs-button {
    margin-top: 10px;
  }
  &-tips {
    text-align: center;
    .cs-icon-box {
      i {
        width: 52px !important;
        height: 52px !important;
      }
      .icon-complete {
        @include icon-image('icon_complete');
      }
      .icon-fail {
        @include icon-image('icon_fail');
      }
      margin-top: 28px;
    }

    .cs-tips-box {
      margin-top: 10px;
      height: 28px;

      line-height: 28px;
      span {
        font-size: 12px;
        font-family: Muli-Regular_Light, Muli;
        font-weight: normal;
        line-height: 16px;
      }
      &.complete {
        background: rgba(13, 153, 0, 0.15);
        color: #0d9900;
        a {
          color: #0d9900;
        }
      }
      &.fail {
        background: rgba(230, 23, 23, 0.15);
        color: #e61717;
        a {
          color: #e61717;
        }
      }
    }
  }
}
</style>
