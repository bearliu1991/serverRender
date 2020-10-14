<template>
  <CupDropDownButton v-model="filterOption" :options="filterOptions">
    <span slot="title">{{ $t('category.sort') }}</span>
  </CupDropDownButton>
</template>

<script>
export default {
  name: 'CategorySortPC',
  props: {
    options: {
      type: Array,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped></style>
