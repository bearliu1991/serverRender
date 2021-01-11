<template>
  <div
    class="comment-success"
    :style="$store.state.terminal === 'pc' ? '' : 'border:none'"
  >
    <img src="@/assets/images/comment.png" alt="" />
    <h1>THANK YOU FOR POSTING A REVIEW</h1>
    <p>
      We love seeing reviews - thanks for posting yours! <br />
      Feel free to share so others can see it, too.
    </p>
    <div>
      <i class="icon iconfont iconweb-30-disanfang-facebook"></i>
      <i class="icon iconfont iconweb-18-twitter"></i>
      <i class="icon iconfont iconweb-18-ins"></i>
    </div>
    <span
      class="close"
      @click="closeSuccessPop"
      v-if="$store.state.terminal === 'pc'"
    >
      <i class="icon iconfont icontongyong-topbar-wap-guanbi"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'CommentSuccess',
  methods: {
    closeSuccessPop() {
      this.$emit('closeSuccess', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.comment-success {
  text-align: center;
  background: #ffffff;
  border: 1px solid #d8d8d8;
  padding: 20px;
  position: relative;
  .close {
    position: absolute;
    top: 16px;
    right: 16px;
    &:hover {
      cursor: pointer;
    }
  }
  img {
    width: 200px;
    height: 200px;
  }
  h1 {
    font-size: 18px;
    @include font($fontMuliBold);
  }
  p {
    font-size: 14px;
    @include font($fontRegular);
    margin: 16px 0;
  }
  div {
    i {
      font-size: 30px;
      margin-right: 30px;
    }
  }
}
</style>
