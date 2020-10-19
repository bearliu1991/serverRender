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
          <span>XS</span>
        </li>
        <li>
          <p class="img">
            <img src="" alt="" srcset="" />
          </p>
          <span>XS</span>
        </li>
        <li></li>
      </ul>
      <cup-input v-model="email" type="email" valid-event :rules="rules">
      </cup-input>
      <!-- <el-input v-model="input1" placeholder="请输入内容">
        <template slot="prepend">Http://</template>
      </el-input> -->
    </cup-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: true,
      email: '',
      rules: [
        { required: true, message: 'Please enter email', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
      ],
    }
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
      }
      &:last-child {
        margin-top: 30px;
      }
    }
  }
}
</style>
