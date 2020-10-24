export default {
  data() {
    return {}
  },
  methods: {
    removeCart(cartIndex) {
      this.list.splice(cartIndex, 1)
    },
  },
}
