<template>
  <aside>
          <el-collapse class="cup-collapse-pc" v-model="activeNames" @change="handleChange">
            <el-collapse-item
              :name="key"
              v-for="(filter, key) in list"
              :key="key"
            >
              <template slot="title">
                <b class="cup-collapse-title">{{ filter.filterName }}</b>
              </template>
              <div>
                <ul class="filter-list">
                  <li v-for="(item, index) in filter.filterList" :key="index">
                    <el-radio class="cup-radio" :label="item.key"
                      ><span class="radio-label">{{
                        item.show
                      }}</span></el-radio
                    >
                  </li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
          <div style="margin-top: 34px;">
            <CupButton type="primary" size="medium" style="display: block;"
              >{{$t('category.reset')}}</CupButton
            >
          </div>
        </aside>
</template>

<script>
export default {
  name: 'CategoryFilter',
  props: {
    list: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      activeNames: ['1', '2'],
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
  },
}
</script>