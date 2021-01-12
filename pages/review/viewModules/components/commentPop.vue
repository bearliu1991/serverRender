<template>
  <div>
    <div class="re-comment" v-if="showPop">
      <div class="re-comment-card">
        <div class="re-comment-topnav">
          <h1>WRITE A REVIEW</h1>
          <span class="close" @click="closePop">
            <i class="icon iconfont icontongyong-topbar-wap-guanbi"></i>
          </span>
        </div>
        <comment-pop-item :style-obj="childStyle" @openSuccess="openSucPop" />
      </div>
    </div>
  </div>
</template>

<script>
import CommentPopItem from '../common/commentPopItem'
// import reviewsMixin from '../reviewsMixin'
import CommentSuccess from './commentSuccess'
export default {
  name: 'CommentPop',
  comments: { CommentPopItem, CommentSuccess },
  // mixins: [reviewsMixin],
  props: {
    showPop: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      childStyle: {
        radioStyle: {
          flexDirection: 'row',
        },
        submitBtnStyle: {
          width: '600px',
        },
      },
    }
  },
  methods: {
    closePop() {
      this.$emit('closePop', false)
    },
    openSucPop(isTrue) {
      this.isSuccess = isTrue
    },
    closeSuccess(isTrue) {
      this.isSuccess = isTrue
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
.close {
  &:hover {
    cursor: pointer;
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
