<template>
  <CupDropDownButton :options="filterOptions" v-model="filterOption">
        <span slot="title">{{$t('category.sort')}}</span>
      </CupDropDownButton>
</template>

<script>
export default {
  name: 'CategorySortPC',
  props: {
    options: {
      type: Array,
      default: () => {}
    }
  },
}
</script>

<style lang="scss" scoped>

</style>