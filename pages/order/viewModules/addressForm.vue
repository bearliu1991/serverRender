<template>
  <el-form ref="addressForm" class="cup-input">
    <!-- 地址 -->
    <el-form-item prop="email">
      <cup-select v-model="ts" placeholder="Use a new address">
        <cup-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></cup-option>
      </cup-select>
    </el-form-item>
    <!--  -->
    <el-form-item prop="email" class="cs-w-5">
      <el-input
        v-model="formData.email"
        placeholder="First name"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item prop="email" class="cs-w-5 cs-ml-8">
      <el-input
        v-model="formData.email"
        placeholder="Last name"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input
        v-model="formData.email"
        placeholder="Address"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input
        v-model="formData.email"
        placeholder="Appartment, suite, etc. ( optional )"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input
        v-model="formData.email"
        placeholder="City"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item prop="email" class="cs-w-3">
      <cup-select v-model="ts" placeholder="Country / Region">
        <cup-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></cup-option>
      </cup-select>
    </el-form-item>
    <el-form-item prop="email" class="cs-w-3 cs-ml-8">
      <cup-select v-model="ts" placeholder="State / Province">
        <cup-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></cup-option>
      </cup-select>
    </el-form-item>
    <el-form-item prop="email" class="cs-w-4 cs-ml-8">
      <el-input
        v-model="formData.email"
        placeholder="ZIP / Postal code"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input
        v-model="formData.email"
        placeholder="Phone"
        autocomplete="off"
      ></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        email: '',
      },
      ts: '选项1',
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      value: '',
    }
  },
}
</script>
<style lang="scss" scoped>
/deep/ .el-form {
  font-size: 0;
  &-item {
    &__content {
      margin-bottom: 16px;
    }
  }
}
</style>
