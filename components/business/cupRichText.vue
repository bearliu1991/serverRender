<template>
  <div class="cs_home_rich_text">
    <img :src="src" class="main-img" />
    <div class="container-wrapper">
      <div class="text-wrap">
        <p>{{ obj.title }}</p>
        <span>{{ obj.content }}</span>
        <button>{{ obj.buttonText }}</button>
        <div></div>
      </div>
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
      src:
        'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
      obj: {
        src:
          'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
        title: 'Trend Forecast',
        content:
          'Stay ahead of the cu,Stay ahead of the cuStay ahead of the cuStay ahead of the cuStay ahead of the cuStay ahead of the cu',
        buttonText: 'Shop New Trends',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.cs_home_rich_text {
  margin: 40px 0;
  position: relative;
  .main-img {
    width: 100%;
  }
}
.container-wrapper {
  position: absolute;
  width: 60%;
  top: 0;
  right: 100px;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .text-wrap {
    display: flex;
    color: #000;
    background: rgba(255, 255, 255, 0.6);
    flex-direction: column;
    align-items: center;
    margin: 0 0.5%;
    justify-content: center;
  }
}
</style>
