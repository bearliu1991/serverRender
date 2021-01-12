<template>
  <div class="m-comment-card">
    <div class="card-top-avatar">
      <div class="left-wrap">
        <div class="avatar-wrap">
          <span class="avatar">{{
            proData.account.slice(0, 1).toUpperCase()
          }}</span>
          <span class="mark"
            ><i class="icon iconfont iconweb-24-renzheng"></i
          ></span>
        </div>
        <div class="user-info">
          <h1>{{ proData.account }}</h1>
          <p>Verifued Buyer</p>
        </div>
      </div>
      <div class="stars">
        <cup-rate :value="3" :score="-1"></cup-rate>
      </div>
    </div>
    <slot :item="proData">
      <div class="card-middle-wrap">
        <template v-for="(i, index) in proData.qas.slice(0, 2)">
          <div class="purchase-tag" :key="index">
            <span class="purchase-tag-blod">{{ i.question }}:</span>
            <span>{{ i.answer }}</span>
          </div>
        </template>
        <div class="exactly">
          <h1>{{ proData.title }}</h1>
          <p>{{ proData.content }}</p>
        </div>
        <template
          v-for="(i, index) in proData.qas.slice(2, proData.qas.length)"
        >
          <div class="purchase-tag" :key="2 + index">
            <span class="purchase-tag-blod">{{ i.question }}:</span>
            <span>{{ i.answer }}</span>
          </div>
        </template>
      </div>
      <div class="buyerShow">
        <template v-for="i in proData.medias">
          <div class="media-wrap" @click="$emit('bShow')" :key="i.sortNum">
            <img
              v-if="i.type === 0"
              :src="i.link"
              style="width: 134px; height: 134px; object-fit: cover;"
              alt=""
            />
            <video v-else :key="i.sortNum" :src="i.link" />
          </div>
        </template>
      </div>
    </slot>
    <div class="share-wrap">
      <i class="icon iconfont iconweb-18-facebook"><span>Facebook</span></i>
      <i class="icon iconfont icontwitter1"><span>Twitter</span></i>
      <i class="icon iconfont iconins"><span>LinkedIn</span></i>
    </div>
    <div class="card-bottom">
      <div class="time">{{ proData.gmtCreate }}</div>
      <div class="liked" @click="onLiked(proData, pageNum)">
        <i
          class="iconfont icon"
          :class="
            proData.likeStatus === 0
              ? 'iconweb-18-zanmoren'
              : 'iconweb-18-zanyidian'
          "
        /><span class="linked-num">{{ proData.likeNum }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import reviewsMixin from '../reviewsMixin'
export default {
  mixins: [reviewsMixin],
  props: {
    proData: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
<style lang="scss">
.m-comment-card {
  background: #ffffff;
  padding: 16px 16px 24px 16px;
  margin-bottom: 8px;
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
    display: flex;
    flex-wrap: wrap;
    img {
      width: 100px;
      height: 100px;
      margin-right: 8px;
      margin-bottom: 8px;
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
