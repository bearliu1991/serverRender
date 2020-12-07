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
        style="display: block;"
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
  padding-right: 4px;
  .el-collapse-item {
    &.is-active {
      margin-bottom: 8px;
    }
  }
  .el-collapse-item__header {
    height: 60px;
    line-height: 60px;
    padding-left: 0;
    &.is-active {
      background: none;
    }
  }
  .el-icon-arrow-right {
    font-family: 'iconfont' !important;
    font-size: 12px;
    font-style: normal;
    margin-right: 0;
    color: #999;
    -webkit-font-smoothing: antialiased;
    transform: rotate(0deg);
    &:before {
      content: '\e6cc';
    }
    &.is-active {
      color: #333;
      transform: rotate(-180deg);
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
  margin-top: 20px;
}
</style>
