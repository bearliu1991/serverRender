<template>
  <div class="cm-filters">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="RATING" name="1">
        <cup-radio-group v-model="formFilters.rating">
          <template v-for="(item, index) in [5, 4, 3, 2, 1]">
            <cup-radio :label="item" :key="index">
              <cup-rate :value="item" :score="-1"></cup-rate>
            </cup-radio>
          </template>
        </cup-radio-group>
      </el-collapse-item>
      <el-collapse-item title="Images & Videos" name="2">
        <cup-radio-group v-model="formFilters.withMedias">
          <template v-for="(item, index) in reviews">
            <cup-radio :label="item.value" :key="index">
              {{ item.label }}
            </cup-radio>
          </template>
        </cup-radio-group>
      </el-collapse-item>
      <template v-for="(v, index) in filtersList">
        <el-collapse-item :name="3 + index" :title="v.title" :key="index">
          <cup-radio-group v-model="formFilters.qas[index].answer">
            <cup-radio
              v-for="i in v.options"
              :label="i.sortNum"
              :key="i.sortNum"
            >
              {{ i.option }}
            </cup-radio>
          </cup-radio-group>
        </el-collapse-item>
      </template>
    </el-collapse>
    <div class="bottom-btn-group">
      <div class="btn" @click="reset">RESET</div>
      <div class="btn btn-active" @click="apply">APPLY</div>
    </div>
  </div>
</template>
<script>
import SelectMixin from '../common/selectMixin'
import reviewsMixin from '../reviewsMixin'
export default {
  mixins: [SelectMixin, reviewsMixin],
  data() {
    return {
      activeNames: ['1'],
    }
  },
  methods: {
    reset() {
      const qas = []
      for (let i = 0; i < this.formFilters.qas.length; i++) {
        qas.push({
          answer: '',
          title: this.formFilters.qas[i].title,
        })
      }
      this.formFilters = Object.assign(this.formFilters, {
        qas,
        rating: '',
        withMedias: '',
      })
    },
    // 筛选
    apply() {
      // this.getReviews()
      this.$parent.close()
      console.log(this)
    },
  },
}
</script>

<style lang="scss" scope>
.cm-filters {
  position: relative;
  height: 100%;
  .bottom-btn-group {
    padding: 10px 16px;
    display: flex;
    // position: absolute;
    left: 0;
    bottom: 0;
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
