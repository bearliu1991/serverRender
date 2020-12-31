<template>
  <client-only>
    <div class="cs-video">
      <video :src="source" class="product-detail-image">
        您的浏览器不支持 video 标2签。
      </video>
      <div class="cs-player_btns" @click="player($event)">
        <template v-if="!isPlayer">
          <i class="icon-player icon"></i>
        </template>
        <template v-if="isPlayer">
          <i class="icon-player_paused icon"></i>
        </template>
      </div>
    </div>
  </client-only>
</template>
<script>
export default {
  props: {
    source: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isPlayer: false,
      isHover: false,
    }
  },
  methods: {
    player(event) {
      const vdo = event.target.parentElement.firstChild
      if (vdo.paused) {
        this.isPlayer = true
        vdo.play()
      } else {
        this.isPlayer = false
        vdo.pause()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-video {
  height: 100%;
  width: 100%;
  position: relative;
  video {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
.icon {
  width: 34px;
  height: 34px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
}
.icon-player {
  @include icon-image('icon_player');
}
.cs-player_btns {
  @include icon-image('icon_player_paused');
}
</style>
