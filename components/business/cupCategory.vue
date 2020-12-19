<template>
  <div class="cs_home_category">
    <p>SHOP BY CATEGORIES</p>
    <ul class="ul-list">
      <li v-for="(item, index) in lists" :key="index">
        <img :src="item.src" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      lists: [
        {
          src:
            'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
        },
        {
          src:
            'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
        },
        {
          src:
            'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
        },
        {
          src:
            'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
        },
        {
          src:
            'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.cs_home_category {
  padding: 40px 0;
}
p {
  text-align: center;
}
.ul-list {
  display: flex;
  li {
    flex: 1;
    margin: 0 0.5%;
  }
}
</style>
