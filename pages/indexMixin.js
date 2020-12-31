export default {
  data() {
    return {}
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
          return `/collection?id=${linkObj.linkValueId}`
        case 3: // 'Products'
          return `/product/${linkObj.linkValueId}`
        case 4: // 'pages'
          return ''
        case 5: // 'blogs'
          return ''
        case 6: // 'policies'
          return ''
        default:
          if (linkObj.linkUrl) return linkObj.linkUrl
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
