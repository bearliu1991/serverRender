import { mapState, mapGetters } from 'vuex'
import Vue from 'vue'
const mixin = {
  data() {
    return {
      shop: '',
      configInfo: {},
    }
  },
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
  created() {
    this.shop = process.env.shopId
  },
}
Vue.mixin(mixin)
