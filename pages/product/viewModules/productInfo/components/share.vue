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
          icon: 'iconweb-18-facebook',
          name: 'Facebook',
        },
        {
          id: 'linkedin',
          icon: 'icon26-footer-pinterest',
          name: 'linkedin',
        },
        {
          id: 'twitter',
          icon: 'iconweb-18-twitter',
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
    height: 79px;
    // padding: 0 17px;
  }
  &_item {
    font-size: 12px;
    color: #333333;
    line-height: 15px;
    text-align: center;
    flex: 1;

    .icon {
      margin-bottom: 8px;
      display: block;
      font-size: 30px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      margin: 0 auto 4px;
    }
  }
}
</style>
