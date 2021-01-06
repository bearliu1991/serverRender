<template>
  <div class="c-comment-card">
    <div class="c-comment-avatar">
      <div class="avatar-img">
        <span class="nameInitial">A</span>
        <span class="mark">
          <i class="icon iconfont"></i>
        </span>
      </div>
      <div class="avatar-name">
        <span class="name">Amy</span>
        <span class="descrption">Amy</span>
        <cup-rate class="" :value="5" :score="-1"></cup-rate>
      </div>
    </div>
    <div class="c-comment-content">
      <div class="top-name">
        <h1>Love! Exactly what I wanted</h1>
        <span class="time">18 / 04 / 2020</span>
      </div>
      <p>Love! Exactly what I wanted and the fit was perfect!</p>
      <div class="purchase">
        <div class="purchase-content">
          <div class="purchase-tag">
            <span class="purchase-tag-blod">Body Type:</span>
            <span>Curvy,Athletic</span>
          </div>
          <div class="purchase-tag">
            <span class="purchase-tag-blod">Age:</span>
            <span>25-34</span>
          </div>
        </div>
        <div class="purchase-content">
          <div class="purchase-tag">
            <span class="purchase-tag-blod">Height:</span>
            <span>5’4</span>
          </div>
          <div class="purchase-tag">
            <span class="purchase-tag-blod">Size Purchased:</span>
            <span>M</span>
          </div>
          <div class="purchase-tag">
            <span class="purchase-tag-blod">Size Typically Wear:</span>
            <span>M</span>
          </div>
        </div>
      </div>
      <div class="buyerShow">
        <img
          src="https://cdn.shopifycdn.net/s/files/1/1135/4928/products/cyy1143_fe957aa1-17c8-4c02-a1dd-d3bf96f96d33.jpg?v=1583221522"
          style="width: 134px; height: 134px;"
          alt=""
        />
      </div>
      <div class="share">
        <i class="icon iconfont iconweb-18-share"><span>Share</span></i>
        <i class="icon iconfont iconweb-18-facebook"><span>Facebook</span></i>
        <i class="icon iconfont icontwitter1"><span>Twitter</span></i>
        <i class="icon iconfont iconins"><span>LinkedIn</span></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
}
</script>

<style lang="scss" scoped>
.c-comment-card {
  background: #ffffff;
  padding: 30px 20px 30px 30px;
  display: flex;
  margin-bottom: 12px;
  .c-comment-avatar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-right: 60px;
    .avatar-img {
      margin-right: 10px;
      .nameInitial {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        line-height: 60px;
        text-align: center;
        background: #f2f2f2;
        color: #999999;
        display: inline-block;
        font-size: 36px;
      }
    }
    .avatar-name {
      display: flex;
      flex-direction: column;
      .name {
        font-size: 18px;
        @include font($fontMuliBold);
      }
    }
  }
  .c-comment-content {
    flex: 2;
    .top-name {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      h1 {
        font-size: 18px;
      }
      span {
        color: #999999;
        font-size: 12px;
      }
    }
    .purchase {
      margin-top: 20px;
      .purchase-content {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 15px;
        .purchase-tag {
          margin-right: 60px;
          .purchase-tag-blod {
            font-weight: bold;
            margin-right: 12px;
          }
          span {
            font-size: 12px;
            &:nth-last-child() {
              color: #333333;
            }
          }
        }
      }
    }
    .buyerShow {
      margin-bottom: 20px;
      img {
        width: 134px;
        height: 134px;
        margin-right: 16px;
      }
    }
    .share {
      i {
        margin-right: 26px;
      }
      span {
        padding-left: 6px;
        font-size: 14px;
        @include font($fontMuliBold);
      }
    }
  }
}
</style>
