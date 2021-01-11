<template>
  <div class="m-comment-card">
    <div class="card-top-avatar">
      <div class="left-wrap">
        <div class="avatar-wrap">
          <span class="avatar">A</span>
          <span class="mark"
            ><i class="icon iconfont iconweb-24-renzheng"></i
          ></span>
        </div>
        <div class="user-info">
          <h1>Amiliy</h1>
          <p>Verifued Buyer</p>
        </div>
      </div>
      <div class="stars">
        <cup-rate :value="3"></cup-rate>
      </div>
    </div>
    <div class="card-middle-wrap">
      <div class="purchase-tag">
        <span class="purchase-tag-blod">Body Type:</span>
        <span>Curvy,Athletic</span>
      </div>
      <div class="purchase-tag">
        <span class="purchase-tag-blod">Age:</span>
        <span>25-34</span>
      </div>
      <div class="exactly">
        <h1>Love! Exactly what I wanted</h1>
        <p>Love! Exactly what I wanted and the fit was perfect!</p>
      </div>
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
    <div class="buyerShow">
      <img
        src="https://cdn.shopifycdn.net/s/files/1/1135/4928/products/cyy1143_fe957aa1-17c8-4c02-a1dd-d3bf96f96d33.jpg?v=1583221522"
        style="width: 100px; height: 100px;Object-fit:cover"
        alt=""
      />
      <img
        src="https://cdn.shopifycdn.net/s/files/1/1135/4928/products/cyy1143_fe957aa1-17c8-4c02-a1dd-d3bf96f96d33.jpg?v=1583221522"
        style="width: 100px; height: 100px;"
        alt=""
      />
    </div>
    <div class="share-wrap">
      <i class="icon iconfont iconweb-18-facebook"><span>Facebook</span></i>
      <i class="icon iconfont icontwitter1"><span>Twitter</span></i>
      <i class="icon iconfont iconins"><span>LinkedIn</span></i>
    </div>
    <div class="card-bottom">
      <div class="time">18 / 04 / 2020</div>
      <div class="liked">
        <i class="iconfont icon iconweb-18-zanmoren"
          ><span class="linked-num">100</span></i
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
}
</script>
<style lang="scss">
.m-comment-card {
  background: #ffffff;
  padding: 16px 16px 24px 16px;
  .card-top-avatar,
  .left-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1 1 1;
  }
  .avatar-wrap {
    position: relative;
    margin-right: 6px;
    .avatar {
      width: 40px;
      height: 40px;
      line-height: 40px;
      border-radius: 50%;
      background: #f2f2f2;
      color: #999999;
      display: inline-block;
      font-size: 18px;
      text-align: center;
    }
    .mark {
      position: absolute;
      bottom: -4px;
      right: -4px;
      i {
        font-size: 20px;
      }
    }
  }
  .user-info {
    h1 {
      font-size: 18px;
      @include font($fontMuliBold);
    }
    p {
      font-size: 12px;
      @include font($fontRegular);
      margin-top: 2px;
    }
  }
  .card-middle-wrap {
    margin-top: 18px;
    .purchase-tag {
      margin-bottom: 10px;
      font-size: 12px;
    }
    .purchase-tag-blod {
      @include font($fontMuliBold);
      margin-right: 12px;
    }
  }
  .exactly {
    margin: 24px 0 28px 0;
    font-size: 14px;
    h1 {
      @include font($fontMuliBold);
      margin-bottom: 8px;
    }
    p {
      line-height: 1.5;
    }
  }
  .buyerShow {
    margin: 17px 6px 24px 0;
    img {
      width: 100px;
      height: 100px;
    }
  }
  .share-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      padding-left: 4px;
    }
  }
  .card-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 26px;
    .time {
      color: #999999;
      font-size: 12px;
    }
    .liked {
      color: #333333;
    }
  }
}
</style>
