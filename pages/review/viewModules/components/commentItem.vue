<template>
  <div class="c-comment-card">
    <div class="c-comment-avatar">
      <div class="avatar-img">
        <span class="nameInitial">A</span>
        <span class="mark">
          <i class="icon iconfont iconweb-24-renzheng"></i>
        </span>
      </div>
      <div class="avatar-name">
        <span class="name">Amy</span>
        <span class="descrption">Amy</span>
        <cup-rate class="" :value="proData.rating" :score="-1"></cup-rate>
      </div>
    </div>
    <div class="c-comment-content">
      <div class="top-name">
        <h1>{{ proData.account }}</h1>
        <span class="time">18 / 04 / 2020</span>
      </div>
      <p>{{ proData.content }}</p>
      <div class="purchase">
        <div class="purchase-content">
          <template v-for="i in proData.qas">
            <div class="purchase-tag" :key="i.id">
              <span class="purchase-tag-blod">{{ i.title }}:</span>
              <span>{{ i.answer }}</span>
            </div>
          </template>
        </div>
      </div>
      <div class="buyerShow">
        <template v-for="i in proData.medias">
          <img
            v-if="i.type === 0"
            :key="i.sortNum"
            :src="i.link"
            style="width: 134px; height: 134px; object-fit: cover;"
            alt=""
          />
          <video v-else :key="i.sortNum" :src="i.link" />
        </template>
      </div>
      <div class="share">
        <div class="share-wrap">
          <i class="icon iconfont iconweb-18-facebook"><span>Facebook</span></i>
          <i class="icon iconfont icontwitter1"><span>Twitter</span></i>
          <i class="icon iconfont iconins"><span>LinkedIn</span></i>
        </div>
        <div class="liked" @click="onLiked(proData.id, proData.spuId, 1)">
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
  </div>
</template>

<script>
import reviewsMixin from '../reviewsMixin'
export default {
  name: 'CommentItem',
  mixins: [reviewsMixin],
  props: {
    proData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  mounted() {
    // this.init()
  },
  methods: {
     onLiked(id, spuId, pageNum) {
      this.$api.comment.goProLiked({ id, spuId, pageNum }).then(res=>{
        this.getReviews()
        this.$forceUpdate()
        // console.log(this.proData);
      })
      
    },
  },
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
      position: relative;
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
      .mark {
        position: absolute;
        bottom: -2px;
        right: -2px;
        i {
          font-size: 24px;
        }
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
        font-weight: bold;
        @include font($fontMuliBold);
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
            @include font($fontMuliBold);
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
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .share-wrap {
      i {
        margin-right: 26px;
      }
      span {
        padding-left: 6px;
        font-size: 14px;
        @include font($fontMuliBold);
      }
    }
    .liked {
      &:hover{
        cursor: pointer;
      }
      span {
        font-size: 12px;
        padding-left: 4px;
      }
    }
  }
}
</style>
