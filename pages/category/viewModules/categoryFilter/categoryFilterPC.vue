<template>
  <aside>
    <el-collapse
      v-model="activeNames"
      class="cup-collapse-pc"
      @change="handleChange"
    >
      <el-collapse-item v-for="(filter, key) in list" :key="key" :name="key">
        <template slot="title">
          <p class="cup-collapse-title">{{ filter.filterName }}</p>
        </template>
        <div>
          <cup-radio-group v-model="anotherValue01" @change="change">
            <cup-radio
              v-for="(item, index) in filter.filterList"
              :key="index"
              :label="item.key"
              >{{ item.show }}</cup-radio
            >
          </cup-radio-group>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div style="margin-top: 34px;">
      <CupButton type="primary" size="medium" style="display: block;">{{
        $t('category.reset')
      }}</CupButton>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'CategoryFilter',
  props: {
    list: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      activeNames: ['1', '2'],
      anotherValue: ['这是1'],
      anotherValue01: '这是2',
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    change(value) {
      console.log(value)
    },
  },
}
</script>
<style lang="scss">
.el-collapse .el-collapse-item__header.is-active {
  background: none;
}
.el-collapse {
  .el-collapse-item__header {
    padding-left: 0;
  }
}
.el-collapse {
  .el-collapse-item__header {
    height: 18px;
    line-height: 18px;
    .el-collapse-item__arrow {
      margin-right: 0;
    }
  }
  .el-collapse-item__content {
    padding-left: 0;
  }
}
.cup-collapse-title {
  font-size: 14px;
  font-family: Muli-Bold, Muli;
  font-weight: bold;
  color: #333333;
  line-height: 18px;
  letter-spacing: 2px;
}
</style>
