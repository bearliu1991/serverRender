import { mapState, mapGetters } from 'vuex'
import Vue from 'vue'
const mixin = {
  computed: {
    isLogin() {
      const { get } = this.$cookies
      if (get('token')) {
        return true
      }
      return false
    },
    ...mapGetters({
      currencyType: 'getCurrencyCode',
    }),
    ...mapState([
      // 映射 this.count 为 store.state.count
      'loginInfo',
      'configData',
      'terminal',
      'contentMarginTop',
    ]),
  },
}
Vue.mixin(mixin)
