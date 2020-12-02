<template>
  <div class="cs-share">
    <ul class="cs-share_body">
      <li
        v-for="(item, index) in shares"
        :key="index"
        class="cs-share_item"
        data-pin-do="buttonBookmark"
        data-pin-shape="round"
        data-pin-height="28"
        @click="share(item.id)"
      >
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
          id: 'facebook',
          icon: 'iconicon-web-40-fenxiang-disanfang-facebook1',
          name: 'Facebook',
        },
        {
          id: 'linkedin',
          icon: 'iconicon-web-40-fenxiang-disanfang-pinterest1',
          name: 'linkedin',
        },
        {
          id: 'twitter',
          icon: 'iconicon-web-40-fenxiang-disanfang-twitter1',
          name: 'Twitter',
        },
      ],
    }
  },
  methods: {
    share(id) {
      const shareUrl = encodeURIComponent(document.location.href)
      const title = encodeURIComponent(document.title)
      switch (id) {
        case 'facebook':
          this.openWindow(
            `http://www.facebook.com/sharer.php?u=${shareUrl}&amp;t=${title}`
          )
          break
        case 'twitter':
          this.openWindow(
            `http://twitter.com/home?status=${shareUrl}  ${title}`
          )
          break
        case 'linkedin':
          this.openWindow(
            `http://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${title}&source=${shareUrl}`
          )
          break
        case 'pineterest':
          this.openWindow('//www.pinterest.com/pin/create/button/')
          break

        default:
          break
      }
    },
    openWindow(url) {
      window.open(
        url,
        '_blank',
        'toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350'
      )
    },
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
