<template>
  <div class="cm-filters">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="RATING" name="1">
        <cup-radio-group v-model="group.rating" @change="onChange">
          <template v-for="(item, index) in [5, 4, 3, 2, 1]">
            <cup-radio :label="item" :key="index">
              <cup-rate :value="item" :score="-1"></cup-rate>
            </cup-radio>
          </template>
        </cup-radio-group>
      </el-collapse-item>
      <el-collapse-item title="Images & Videos" name="2">
        <cup-radio-group v-model="group.reviews" @change="onChange">
          <template v-for="(item, index) in reviews">
            <cup-radio :label="item.value" :key="index">
              {{ item.label }}
            </cup-radio>
          </template>
        </cup-radio-group>
      </el-collapse-item>
      <el-collapse-item title="AGE" name="3">
        <cup-radio-group v-model="group.age" @change="onChange">
          <template v-for="(item, index) in Age">
            <cup-radio :label="item.value" :key="index">
              {{ item.label }}
            </cup-radio>
          </template>
        </cup-radio-group>
      </el-collapse-item>
      <el-collapse-item title="BODY TYPE" name="4">
        <cup-radio-group v-model="group.bodyType" @change="onChange">
          <template v-for="(item, index) in bodyType">
            <cup-radio :label="item.value" :key="index">
              {{ item.label }}
            </cup-radio>
          </template>
        </cup-radio-group>
      </el-collapse-item>
      <el-collapse-item title="SIZE FIT" name="5">
        <cup-radio-group v-model="group.sizeFit" @change="onChange">
          <template v-for="(item, index) in sizeFit">
            <cup-radio :label="item.value" :key="index">
              {{ item.label }}
            </cup-radio>
          </template>
        </cup-radio-group>
      </el-collapse-item>
    </el-collapse>
    <div class="bottom-btn-group">
      <div class="btn">RESET</div>
      <div class="btn btn-active">APPLY</div>
    </div>
  </div>
</template>
<script>
import SelectMixin from '../common/selectMixin'
export default {
  mixins: [SelectMixin],
  data() {
    return {
      activeNames: ['1'],
      group: {
        rating: '',
        bodyType: '',
        age: '',
        sizefit: '',
        reviews: '',
      },
    }
  },
  methods: {
    closeFilters(val) {
      console.log(val)
    },
    handleChange(val) {
      console.log(val)
    },
    onChange(val) {
      console.log(val)
    },
  },
}
</script>

<style lang="scss" scope>
.cm-filters {
  .bottom-btn-group {
    padding: 10px 16px;
    display: flex;
    .btn {
      width: 167px;
      height: 44px;
      background: #ffffff;
      border: 1px solid #d8d8d8;
      text-align: center;
      line-height: 44px;
      display: inline-block;
      font-size: 14px;
      @include font($fontMuliBold);
    }
    .btn-active {
      background: #000000;
      margin-left: 9px;
      color: #ffffff;
    }
  }
  /deep/ .el-drawer__body {
    overflow: scroll;
  }
  /deep/ .el-collapse-item__header {
    background: #f2f2f2;
    padding: 0 16px;
  }
  /deep/ .el-collapse-item__wrap {
    .el-collapse-item__content {
      padding: 16px;
    }
  }
}
</style>
