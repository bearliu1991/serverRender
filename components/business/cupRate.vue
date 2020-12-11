<template>
  <div :class="['cs-rate', $store.state.terminal]">
    <el-rate
      v-model="value"
      class="cs-rate-box"
      disabled
      :colors="['#F8AB04', '#F8AB04', '#F8AB04']"
      disabled-void-color="#F8AB04"
      disabled-void-icon-class="el-icon-star-off"
    >
    </el-rate>
    <span v-if="score >= 0" class="cs-rate-count">({{ score }})</span>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
}
</script>
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
