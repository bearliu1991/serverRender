export default {
  data() {
    return {
      searchContent: '',
      isFirstSet: false,
    }
  },
  props: {
    childObj: {
      type: Object | Array,
    },
  },
  computed: {
    isPc() {
      return this.$store.state.terminal === 'pc'
    },
  },
  methods: {
    transferUrl(linkObj) {
      switch (linkObj.linkItemId) {
        case 1: // 'Home page'
          return ''
        case 2: // 'Collections'
          return ''
        case 3: // 'Products'
          return ''
        case 4: // 'pages'
          return ''
        case 5: // 'blogs'
          return ''
        case 6: // 'policies'
          return ''
        default:
          return 'javascript:void(0);'
      }
    },
    timeGet(time) {
      const myDate = new Date(time)
      if (time) {
        return {
          year: myDate.getFullYear(),
          month: myDate.getMonth(),
          date: myDate.getDate(),
          hour: myDate.getHours(),
          minute: myDate.getMinutes(),
          second: myDate.getSeconds(),
        }
      }
      return { year: '', month: '', date: '', hour: '', minute: '', second: '' }
    },
  },
}
