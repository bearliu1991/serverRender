import { mapState, mapGetters } from 'vuex'
import Vue from 'vue'
const mixin = {
  computed: {
    ...mapGetters({
      currencyType: 'getCurrencyCode',
    }),
    ...mapState([
      // 映射 this.count 为 store.state.count
      'isLogin',
      'loginInfo',
      'configData',
      'terminal',
      'contentMarginTop',
    ]),
  },
}
Vue.mixin(mixin)
