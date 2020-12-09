<template>
  <div :class="['cs-empty', terminal]">
    <section>
      <i></i>
      <div class="cs-empty-content">
        <slot> </slot>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
.cs-empty {
  display: flex;
  justify-content: center;
  section {
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  i {
    width: 120px;
    height: 120px;
  }
  &-content {
    p {
      font-size: 18px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 23px;
    }
  }
  &.mobile {
    &.icon-no-result {
      i {
        width: 108px;
        height: 108px;
      }
    }
    .cs-empty-content {
      p {
        font-size: 14px;
        line-height: 18px;
      }
    }
  }
  // 下架
  &.icon-off-shelf {
    i {
      @include icon-image('icon_off_shelf');
    }
  }
  &.icon-no-result {
    i {
      @include icon-image('icon_no_result');
      width: 120px;
      height: 120px;
    }
  }
}
</style>
