<template>
  <div class="cs-rate">
    <el-rate
      v-model="value"
      class="cs-rate-box"
      disabled
      :colors="['#F8AB04', '#F8AB04', '#F8AB04']"
      disabled-void-color="#F8AB04"
      disabled-void-icon-class="el-icon-star-off"
    >
    </el-rate>
    <span v-if="score" class="cs-rate-count">({{ score }})</span>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      default: 5,
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
        $size: 14px;
        margin-right: 0;
        &.el-icon-star-on {
          &::before {
            content: '';
          }
          @include cup-icon-star-on;
          width: $size;
          height: $size;
        }
        &.el-icon-star-off {
          &::before {
            content: '';
          }
          @include cup-icon-star-off;
          width: $size;
          height: $size;
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
}
</style>
