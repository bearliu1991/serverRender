<template>
  <div class="cs-share">
    <ul class="cs-share_body">
      <li v-for="(item, index) in shares" :key="index" class="cs-share_item">
        <i :class="['icon', 'iconfont', item.icon]"></i>

        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shares: [
        {
          icon: 'iconicon-web-40-fenxiang-disanfang-facebook1',
          name: 'Facebook',
        },
        {
          icon: 'iconicon-web-40-fenxiang-disanfang-pinterest1',
          name: 'Pinterest',
        },
        {
          icon: 'iconicon-web-40-fenxiang-disanfang-twitter1',
          name: 'Twitter',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.cs-share {
  position: relative;
  &_body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 118px;
    padding: 0 17px;
  }
  &_item {
    font-size: 12px;
    font-family: Muli-Regular_Light, Muli;
    font-weight: normal;
    color: #333333;
    line-height: 15px;
    text-align: center;

    .icon {
      margin-bottom: 8px;
      display: block;
      font-size: 32px;
      width: 32px;
      height: 32px;
      line-height: 32px;
      margin: 0 auto 8px;
    }
  }
}
</style>
