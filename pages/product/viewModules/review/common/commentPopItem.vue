<template>
  <div class="re-comment">
    <div class="re-comment-form">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        label-position="top"
        :rules="rules"
      >
        <el-form-item prop="Score" class="inline-score" label="Score" required>
          <el-rate
            v-model="form.Score"
            class="cs-rate-box"
            :colors="['#F8AB04', '#F8AB04', '#F8AB04']"
            disabled-void-color="#F8AB04"
            disabled-void-icon-class="el-icon-star-off"
          />
        </el-form-item>
        <el-form-item label="Title" prop="Title" required>
          <el-col :span="5">
            <el-input v-model="form.Title"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="Review" prop="Review" required>
          <el-col :span="11">
            <el-input type="textarea" v-model="form.Review"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="Name" prop="Name" required>
          <el-input v-model="form.Name"></el-input>
        </el-form-item>
        <el-form-item label="Email address" prop="Email" required>
          <el-input v-model="form.Email"></el-input>
        </el-form-item>
        <el-form-item label="Media">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i
              v-else
              class="icon iconfont avatar-uploader-icon iconweb-40-danchuangshangchuanzhaopian"
            ></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="How do you find the size of items you received?">
          <cup-radio-group
            v-model="form.size"
            class="comment-radio"
            :style="styleObj.radioStyle"
          >
            <template v-for="item in received">
              <cup-radio :label="item.value" :key="item.value">
                <span> {{ item.label }} </span>
              </cup-radio>
            </template>
          </cup-radio-group>
        </el-form-item>
        <el-form-item label="How tall are you? ( i.e 5’4 )">
          <el-input
            :rows="4"
            :col="5"
            type="textarea"
            maxlength="30"
            show-word-limit
            v-model="form.tall"
          ></el-input>
        </el-form-item>
        <el-form-item label="What size Cupshe did you purchase?">
          <el-input
            :rows="4"
            :col="5"
            type="textarea"
            maxlength="30"
            show-word-limit
            v-model="form.purchase"
          ></el-input>
        </el-form-item>
        <el-form-item label="What size do you typically wear?">
          <el-input
            :rows="4"
            :col="5"
            value=""
            type="textarea"
            maxlength="30"
            show-word-limit
            v-model="form.wear"
          ></el-input>
        </el-form-item>
        <el-form-item label="My body is best described as?">
          <cup-checkbox-group
            class="comment-radio"
            :style="styleObj.radioStyle"
            v-model="form.desc"
          >
            <template v-for="item in describedAs">
              <cup-checkbox :label="item.value" :key="item.value">
                <span> {{ item.label }} </span>
              </cup-checkbox>
            </template>
          </cup-checkbox-group>
        </el-form-item>
        <el-form-item label="What is your age group?">
          <cup-radio-group
            class="comment-radio"
            :style="styleObj.radioStyle"
            v-model="form.group"
          >
            <template v-for="item in ageGroup">
              <cup-radio :label="item.value" :key="item.value">
                <span> {{ item.label }} </span>
              </cup-radio>
            </template>
          </cup-radio-group>
        </el-form-item>
        <el-form-item>
          <div
            class="onsubmit"
            :style="styleObj.submitBtnStyle"
            @click="onSubmit('form')"
          >
            SUBMIT
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { emailRule } from '@assets/js/rules.js'
import { addressRule } from '../components/fromRules'
export default {
  name: 'CommentPopItem',
  props: {
    styleObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formData: {
        title: '',
      },
      imageUrl: false,
      emailRule,
      rules: addressRule,
      received: [
        {
          label: 'Runs Small',
          value: 1,
        },
        {
          label: 'Just Right',
          value: 2,
        },
        {
          label: 'Runs Big',
          value: 3,
        },
      ],
      ageGroup: [
        {
          label: '18-24',
          value: 1,
        },
        {
          label: '25-24',
          value: 2,
        },
        {
          label: '35-24',
          value: 3,
        },
        {
          label: '45+',
          value: 4,
        },
      ],
      describedAs: [
        {
          label: 'Curvy',
          value: 1,
        },
        {
          label: 'Athletic',
          value: 2,
        },
        {
          label: 'Athletic',
          value: 3,
        },
        {
          label: 'Petite',
          value: 4,
        },
        {
          label: 'Hourglass',
          value: 5,
        },
        {
          label: 'Long and Lean',
          value: 6,
        },
      ],
      form: {
        Score: '',
        Title: '',
        Review: '',
        Name: '',
        Email: '',
        size: '1',
        desc: [],
        group: '',
        purchase: '',
        wear: '',
        tall: '',
      },
    }
  },
  mounted() {
    console.log(this.props)
  },
  methods: {
    onSubmit(formName) {
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
.re-comment {
  &-card {
    background: #ffffff;
    border: 1px solid #d8d8d8;
    padding: 20px;
    .re-comment-topnav {
      position: relative;
      padding-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      h1 {
        font-size: 18px;
        @include font($fontMuliBold);
      }
      &:after {
        content: '.';
        position: absolute;
        bottom: 0;
        left: 0;
        background: #f7f7f7;
        height: 1px;
        width: 100%;
      }
    }
  }
}
.avatar-uploader {
  border: 1px solid #d8d8d8;
  height: 136px;
  width: 136px;
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    font-size: 48px;
  }
}
.comment-radio {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  label {
    margin-right: 10px;
  }
  /deep/ span {
    display: flex;
    align-items: center;
  }
}
.onsubmit {
  width: 600px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #000000;
  border-color: #000000;
  color: #ffffff;
}
.cs-rate-box {
  /deep/ .el-rate__icon {
    margin-right: 0;
  }
}
.inline-score {
  display: flex;
}
.re-comment-form {
  /deep/ .el-rate {
    line-height: 40px;
    height: 40px;
    line-height: 2;
    margin-left: 4px;
  }
}
</style>
<style lang="scss" scoped>
.cs-rate {
  display: flex;
  align-items: center;
  &-box {
    display: inline-block;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    font-size: 0;

    /deep/ .el-rate__item {
      &:not(:last-child) {
        margin-right: 3px;
      }
      .el-rate__icon {
        width: 14px;
        height: 14px;
        margin-right: 0;
        &.el-icon-star-on {
          &::before {
            content: '';
          }
          @include icon-image('icon_start_on');
        }
        &.el-icon-star-off {
          &::before {
            content: '';
          }
          @include cup-icon-star-off;
        }
      }
    }
  }
  &-count {
    margin-left: 4px;
    font-size: 12px;
    @include font($fontRegular);
    color: #333333;
    line-height: 15px;
  }
  // 兼容移动端
  &.mobile {
    .cs-rate-box {
      /deep/ .el-rate__item {
        .el-rate__icon {
          width: 10px;
          height: 10px;
        }
      }
    }
  }
}
</style>
