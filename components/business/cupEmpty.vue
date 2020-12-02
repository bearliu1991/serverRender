<template>
  <div class="cs-empty">
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
  padding: 0 30px;
  section {
    text-align: center;
    width: 100%;
  }
  i {
    width: 120px !important;
    height: 120px !important;
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
  // 下架
  &.icon-off-shelf {
    i {
      @include icon-image('icon_off_shelf');
    }
  }
  &.icon-no-result {
    i {
      @include icon-image('icon_no_result');
    }
  }
}
</style>
