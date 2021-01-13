<template>
  <div class="re-comment">
    <div class="re-comment-form" v-if="defaultShow">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        label-position="top"
        :rules="rules"
      >
        <el-form-item prop="rating" class="inline-score" label="Score" required>
          <el-rate
            v-model="form.rating"
            class="cs-rate-box"
            :colors="['#F8AB04', '#F8AB04', '#F8AB04']"
            disabled-void-color="#F8AB04"
            disabled-void-icon-class="el-icon-star-off"
          />
        </el-form-item>
        <el-form-item label="Title" prop="title" required>
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="Review" prop="content" required>
          <el-input
            type="textarea"
            :rows="4"
            :col="5"
            show-word-limit
            v-model="form.content"
          ></el-input>
        </el-form-item>
        <el-form-item label="Name" prop="account" required>
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="Email address" prop="email" required>
          <el-input type="email" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Media">
          <div class="">
            <el-upload
              ref="upload"
              accept="image/jpeg,image/gif,image/png,video"
              :auto-upload="false"
              :action="''"
              :multiple="true"
              :limit="6"
              list-type="picture-card"
              :on-change="onUploadChange"
              :on-preview="handlePreview"
              :on-remove="handleOutlineRemove"
              :file-list="upload.outlineFileList"
            >
              <i class="icon iconfont iconweb-40-danchuangshangchuanzhaopian" />
            </el-upload>
          </div>
        </el-form-item>
        <template v-if="$route.params.id">
          <template v-for="(item, index) in qaList">
            <el-form-item :label="item.question" :key="index">
              <!-- :required="item.required === 1 ? true : false"
            :prop="form.qas[index].answer" -->
              <cup-radio-group
                v-if="item.type === 1"
                class="comment-radio"
                :style="styleObj.radioStyle"
                v-model="form.qas[index].answer"
              >
                <template v-for="i in item.options">
                  <cup-radio :label="i.sortNum" :key="i.sortNum">
                    <span> {{ i.option }} </span>
                  </cup-radio>
                </template>
              </cup-radio-group>

              <cup-checkbox-group
                v-else-if="item === 2"
                class="comment-radio"
                :style="styleObj.radioStyle"
                v-model="form.qas[index].answer"
              >
                <template v-for="i in describedAs">
                  <cup-checkbox :label="i.value" :key="i.value">
                    <span> {{ i.label }} </span>
                  </cup-checkbox>
                </template>
              </cup-checkbox-group>

              <el-input
                v-else
                type="textarea"
                :rows="4"
                :col="5"
                maxlength="20"
                show-word-limit
                v-model="form.qas[index].answer"
              ></el-input>
            </el-form-item>
          </template>
        </template>
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
    <!-- 提交成功 -->
    <template v-else>
      <comment-success />
    </template>
    <!-- 图片预览对话框 -->
    <el-dialog title="Images Preview" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import upload from '../components/upload'
// import reviewsMixin from '../reviewsMixin'
export default {
  name: 'CommentPopItem',
  mixins: [upload],
  props: {
    styleObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      type: '',
      defaultShow: true,
      dialogImageUrl: '',
      qaList: [],
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.getQaList()
    }
  },
  methods: {
    async getQaList() {
      const questionList = await this.$api.comment.queryQAList()
      // console.log(questionList)
      this.qaList = questionList.list
      const qas = []
      questionList.list.map((re) => {
        qas.push({
          answer: '',
          privacy: re.privacy,
          question: re.question,
          sortNum: re.sortNum,
        })
      })
      // console.log(this.form)
      this.$set(this.form, 'qas', qas)
    },
    onSubmit(formName) {
      this.type = ''
      // console.log(this.$route.params.id)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const request = new FormData()
          request.append('rating', this.form.rating)
          request.append('account', this.form.account)
          request.append('content', this.form.content)
          request.append('email', this.form.email)
          for (let i = 0; i < this.form.files.length; i++) {
            request.append(`files`, this.form.files[i].raw)
          }
          if (this.form.qas) {
            for (let i = 0; i < this.form.qas.length; i++) {
              request.append(`qas[${i}].answer`, this.form.qas[i].answer)
              request.append(`qas[${i}].privacy`, this.form.qas[i].privacy)
              request.append(`qas[${i}].question`, this.form.qas[i].question)
            }
          }
          if (this.$route.params.id) {
            this.type = 'pdp'
            request.append('skuCode', this.form.sku)
            request.append('spuId', this.form.spuId)
          }
          request.append('title', this.form.title)
          // console.log(this)
          this.$api.comment.submitComment(request, this.type).then((res) => {
            if (this.$store.state.terminal === 'pc') {
              this.$parent.$emit('openSuccess', true)

              console.log(this)
              // 查询列表
              this.$parent.$parent.handleCurrentChange(1)
              this.$parent.$parent.$forceUpdate()
              // this.$nextTick(() => this.$parent.closePop())
            } else {
              this.defaultShow = false
            }
          })
        } else {
          // console.log('error submit!!')
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
  /deep/ .el-upload--picture-card {
    background: #ffffff;
    border: 1px solid #f2f2f2;
  }
  /deep/ .el-upload-list--picture-card {
    .el-upload-list__item {
      div {
        height: 100%;
        img {
          object-fit: cover;
        }
      }
    }
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
