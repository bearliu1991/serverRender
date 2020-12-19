<template>
  <div class="cs_home_collection">
    <ul v-for="(item, index) in lists" :key="index" class="ul-list">
      <li>
        <img :src="item.src" />
        <div class="text-wrap">
          <p>{{ item.title }}</p>
          <span>{{ item.content }}</span>
          <CupButton plain>{{ item.buttonText }}</CupButton>
        </div>
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
          title: 'Trend Forecast',
          content:
            'Stay ahead of the cu,Stay ahead of the cuStay ahead of the cuStay ahead of the cuStay ahead of the cuStay ahead of the cu',
          buttonText: 'Shop New Trends',
        },
        {
          src:
            'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
          title: 'Trend Forecast',
          content:
            'Stay ahead of the cu,Stay ahead of the cuStay ahead of the cuStay ahead of the cuStay ahead of the cuStay ahead of the cu',
          buttonText: 'Shop New Trends',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.cs_home_collection {
  padding: 40px 0;
}
.ul-list {
  li {
    display: flex;
    img {
      width: 40%;
    }
    .text-wrap {
      width: 60%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 0.5%;
      justify-content: center;
    }
  }
}
</style>
