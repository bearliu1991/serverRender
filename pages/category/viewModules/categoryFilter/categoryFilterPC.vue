<template>
  <aside>
    <el-collapse v-model="activeNames" class="cup-collapse-pc">
      <el-collapse-item v-for="(filter, key) in list" :key="key" :name="key">
        <template slot="title">
          <p class="cup-collapse-title">{{ filter.filterName }}</p>
        </template>
        <div>
          <cup-checkbox-group v-model="value[key]" @change="change">
            <cup-checkbox
              v-for="(item, index) in filter.filterList"
              :key="index"
              :label="item.key"
              >{{ item.show }}
            </cup-checkbox>
          </cup-checkbox-group>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div>
      <CupButton
        type="primary"
        size="medium"
        style="display: block"
        @click="clearAll"
      >
        RESET
      </CupButton>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'CategoryFilterPC',
  props: {
    list: {
      type: Object,
      default: () => {},
    },
    value: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  inject: ['searchProduct', 'resetData'],
  data() {
    return {
      activeNames: [],
    }
  },
  methods: {
    change() {
      this.$emit('input', this.value)
      this.updateProduct()
    },
    clearAll() {
      this.$emit('input', {})
      this.updateProduct()
    },
    updateProduct() {
      this.resetData()
      this.searchProduct()
    },
  },
}
</script>
<style lang="scss" scoped>
/deep/.el-collapse {
  &-item {
    margin-bottom: 30px !important;
  }
  .el-collapse-item__header {
    height: 24px;
    line-height: 24px;
    margin-bottom: 20px;
    padding-left: 0;
    &.is-active {
      background: none;
    }
    .el-collapse-item__arrow {
      margin-right: 0;
      color: #333;
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
.cs-button {
  margin-top: 40px;
}
</style>
