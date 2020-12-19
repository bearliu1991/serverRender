<template>
  <div class="cs_home_findus">
    <p>SHOP BY CATEGORIES</p>
    <div class="img-wrap">
      <img :src="src" class="big-img">
      <ul class="ul-list">
      <li v-for="(item, index) in lists" :key="index">
        <img :src="item.src" />
      </li>
    </ul>
    </div>
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
      src: 'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
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
.cs_home_findus {
  padding: 40px 0;
  font-size:0
}
.img-wrap{
  display:flex
}
p {
  text-align: center;
}
.big-img{
  width:40%
}
.ul-list {
  width:60%;
  li {
    margin-left: 0.3%;
    width: 33%;
    float: left;
  }
}
</style>
