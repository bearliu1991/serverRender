<template>
  <div class="cs-empty">
    <section>
      <i></i>
      <p>
        <slot></slot>
      </p>
      <p name="other"></p>
    </section>
  </div>
</template>
<style lang="scss" scoped>
.cs-empty {
  display: flex;
  justify-content: center;
  section {
    text-align: center;
  }
  i {
    width: 120px !important;
    height: 120px !important;
    margin-bottom: 10px;
  }
  p {
    font-size: 18px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #333333;
    line-height: 23px;
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
