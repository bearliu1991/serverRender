<template>
  <ul>
    <li v-for="(item, index) in list" :key="index" class="care-list">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="'#' + item.iconName"></use>
      </svg>
      {{ item.text }}
    </li>
  </ul>
</template>
<script>
export default {
  name: 'ProductCase',
  props: {},
  data() {
    return {
      list: [
        {
          iconName: 'iconicon-web-24-huyangzhinan-shuixibiao',
          text: 'Hand wash in max 30 degrees.',
        },
        {
          iconName: 'iconicon-web-24-huyangzhinan-shuixibiao2',
          text: 'Do not bleach.',
        },
        {
          iconName: 'iconicon-web-24-huyangzhinan-shuixibiao3',
          text: 'Do not iron.',
        },
        {
          iconName: 'iconicon-web-24-huyangzhinan-shuixibiao4',
          text: 'Do not dry clean.',
        },
        {
          iconName: 'iconicon-web-24-huyangzhinan-shuixibiao5',
          text: 'Do not tumble dry.',
        },
        {
          iconName: 'iconicon-web-24-huyangzhinan-shuixibiao6',
          text: 'Drip dry in shade.',
        },
      ],
    }
  },
  beforeCreate() {},
  mounted() {},
}
</script>
<style lang="scss" scoped>
.care-list {
  font-size: $font-size-sm;
  font-family: $muli-regular-font-family;
  line-height: 28px;
  &:not(:last-child) {
    margin-bottom: 14px;
  }
  .icon {
    font-size: 24px;
    margin-right: 12px;
    vertical-align: -0.3em;
  }
}
</style>
