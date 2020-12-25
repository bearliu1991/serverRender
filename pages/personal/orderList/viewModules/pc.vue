<template>
  <div class="cs-order_list"></div>
</template>
<script>
import myOrderMixin from '../../myOrderMixin'
export default {
  mixins: [myOrderMixin],
  mounted() {
    this.queryOrderList()
  },
}
</script>
