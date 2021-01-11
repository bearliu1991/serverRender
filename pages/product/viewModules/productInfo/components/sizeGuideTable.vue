<!-- 尺码表 -->
<template>
  <cup-popup
    v-if="terminal == 'mobile'"
    :visible.sync="visible"
    title="SIZE GUIDE"
    :size="'90%'"
  >
    <div class="cs-sizeGuide" v-html="sizeGuide"></div>
    <div class="sizeHow">
      <i class="icon-sizeGuide"></i>
      <div class="sizeMeasure">
        <p class="tit">How to measure</p>
        <ul>
          <li>
            <p>BUST</p>
            <p>Measure around the fullest part of your bust.</p>
          </li>
          <li>
            <p>WAIST</p>
            <p>
              Find your natural waistline. Generally, it’s just below your last
              rib and a couple of inches above your navel.
            </p>
          </li>
          <li>
            <p>HIP</p>
            <p>
              Find the widest part of your hips. Generally, it’s 8 inches below
              your waist. For more details please click
              <a href="" class="cs-link semiBold">Size measurement.</a>
            </p>
            <p>
              Refer to the table on the suits size to confirm your correct size.
            </p>
          </li>
        </ul>
      </div>
    </div>
  </cup-popup>
  <cup-dialog v-else :visible.sync="visible" v-bind="$attrs" v-on="$listeners">
    <div class="cs-sizeGuide" v-html="sizeGuide"></div>
    <div class="sizeHow">
      <i class="icon-sizeGuide"></i>
      <div class="sizeMeasure">
        <p class="tit">How to measure</p>
        <ul>
          <li>
            <p>BUST</p>
            <p>Measure around the fullest part of your bust.</p>
          </li>
          <li>
            <p>WAIST</p>
            <p>
              Find your natural waistline. Generally, it’s just below your last
              rib and a couple of inches above your navel.
            </p>
          </li>
          <li>
            <p>HIP</p>
            <p>
              Find the widest part of your hips. Generally, it’s 8 inches below
              your waist. For more details please click
              <a href="" class="cs-link semiBold">Size measurement.</a>
            </p>
            <p>
              Refer to the table on the suits size to confirm your correct size.
            </p>
          </li>
        </ul>
      </div>
    </div>
  </cup-dialog>
</template>
<script>
export default {
  name: 'SizeGuideTable',
  props: {
    sizeGuide: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // visible: true,
    }
  },
  beforeCreate() {},
  mounted() {},
}
</script>
<style lang="scss" scoped>
/deep/ .cs-dialog-wrapper {
  margin: 79px 512px 126px 512px;
  overflow-y: auto;
}
/deep/ .cup-popup {
  .el-drawer__body {
    padding: 16px;
    overflow: auto;
  }
}
/deep/ table {
  width: 100%;
  border: 1px solid #d8d8d8;
  tr {
    height: 36px;
    line-height: 36px;
    &:nth-child(odd) {
      background: #f2f2f2;
    }
    font-size: 14px;
    &:first-child {
      font-family: Muli-Regular_SemiBold, Muli;
    }
    font-weight: normal;
    color: #333333;
    td {
      text-align: center;
    }
  }
}
.sizeHow {
  margin-top: 24px;
  display: flex;
  flex-shrink: 0;
  .icon-sizeGuide {
    margin-top: 16px;
    width: 153px;
    height: 219px;
    @include icon-image('icon_sizeGuide');
  }
  .sizeMeasure {
    flex: 1;
    word-break: break-all;
    margin-left: 28px;
    .tit {
      font-size: 14px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 18px;
      letter-spacing: 1px;
      margin-bottom: 16px;
    }
    ul {
      li {
        list-style-type: disc;
        margin-bottom: 12px;
        p {
          margin-bottom: 4px;
          &:first-child {
            font-size: 12px;
            font-family: Muli-Regular_SemiBold, Muli;
            font-weight: normal;
            color: #333333;
            line-height: 15px;
            text-transform: uppercase;
          }
        }
      }
    }
  }
}
.pc {
  .sizeHow {
    margin-top: 20px;
  }
}
</style>
