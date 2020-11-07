<template>
  <div class="m-filters">
    <cup-popup title="Filters" :visible="showFilters" @close-popup="close">
      <div v-if="checkedItems.length" class="m-filters-checked">
        <div
          v-for="(item, index) in checkedItems"
          :key="index"
          class="m-filters-checked_item"
        >
          <i
            class="icon iconfont iconicon-web-14-sousuoguanbi"
            @click="deleteRecord(item)"
          ></i>
          <span>{{ item.show }}</span>
        </div>
      </div>
      <el-collapse class="cup-collapse-pc">
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
      <footer>
        <div class="m-buttons-group">
          <cup-button type="plain" @click="clearAll">Clear All</cup-button>
          <cup-button primary @click="apply">APPLY</cup-button>
        </div>
      </footer>
    </cup-popup>
  </div>
</template>
<script>
export default {
  name: 'CategoryFilterM',
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
      showFilters: false,
      checkedItems: [],
      checkedItemArr: [],
    }
  },
  methods: {
    // 更新筛选条件
    change(value) {
      this.$emit('input', this.value)
      // 选中后显示更新的条件
      this.updateCheckedItems()
    },
    // 清空筛选条件
    clearAll() {
      this.$emit('input', {})
      this.apply()
    },
    apply() {
      this.resetData()
      this.searchProduct()
      this.showFilters = false
    },
    close() {
      this.showFilters = false
    },
    show() {
      this.showFilters = true
    },
    // 筛选出选中的条件
    updateCheckedItems() {
      const { value: conditions } = this
      this.checkedItems = []
      for (const key in conditions) {
        this.findCheckedItem(key, conditions[key])
      }
    },
    findCheckedItem(key, checkedValues) {
      const filterList = this.list[key].filterList
      filterList.map((item) => {
        if (checkedValues.includes(item.key)) {
          this.checkedItems.push({
            type: key,
            ...item,
          })
        }
      })
    },
    deleteRecord(item) {
      const delIndex = this.value[item.type].indexOf(item.key)
      this.value[item.type].splice(delIndex, 1)
      this.change()
    },
  },
}
</script>
<style lang="scss" scoped>
.m-filters {
  &-checked {
    padding: 16px;
    display: flex;
    &_item {
      height: 30px;
      background: #f2f2f2;
      font-size: 14px;
      font-family: Muli-Regular_Light, Muli;
      font-weight: normal;
      color: #333333;
      line-height: 18px;
      line-height: 30px;
      padding: 0 8px;
      margin-right: 8px;
      i {
        margin-right: 2px;
      }
    }
  }
  /deep/ .el-drawer {
    .el-drawer__body {
      padding-bottom: 65px;
    }
  }
  /deep/ .el-collapse-item {
    margin-bottom: 0 !important;
    border-bottom: 1px solid #f7f7f7;
    &.is-active {
      .el-collapse-item__header {
        background: #f2f2f2;
      }
    }
    &__header {
      padding: 0 16px;
      height: 44px;
      background: #ffffff;
    }
    &__wrap {
      padding: 16px 16px 12px 16px;
      background: #fafafa;
    }
    &__arrow {
      color: #333;
      font-size: 14px;
    }
  }
  footer {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    height: 64px;
  }
  .m-buttons-group {
    height: 64px;
    background: #ffffff;
    box-shadow: 0px -2px 20px 0px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    padding: 0 16px;
    .cs-button {
      flex: 1;
    }
  }
  .cs-button-plain {
    margin-right: 9px;
    text-shadow: 0px -2px 20px rgba(0, 0, 0, 0.05);
  }
}
</style>
