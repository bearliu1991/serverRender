<template>
  <div class="cs-shipAddress">
    <p class="header-tit">SHIPPING ADDRESS</p>

    <div class="cs-shipAddress-container">
      <address-form />
      <div class="cs-shipAddress-check">
        <cup-checkbox />
        <p>Save this information for next time</p>
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
<style lang="scss" scoped>
.cs-shipAddress {
  margin-bottom: 40px;
  .header-tit {
    font-size: 18px;
    font-family: Muli-Regular_Bold, Muli;
    font-weight: normal;
    color: #333333;
    line-height: 23px;
    letter-spacing: 1px;
    margin-bottom: 16px;
  }
  &-check {
    .cs-checkbox {
      margin-bottom: 0;
    }
    display: flex;
    align-items: center;

    font-size: 12px;
    font-family: Muli-Regular_Light, Muli;
    font-weight: normal;
    color: #333333;
  }
}
</style>
