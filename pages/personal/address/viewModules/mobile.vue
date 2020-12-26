<template>
  <div class="cs-adress">
    <header>
      <h1 class="mb20">ADDRESS BOOK</h1>

      <div class="cs-adress_wrapper">
        <div class="adress_empty">
          <i class="el-icon-circle-plus"></i>
          <span class="text">ADD A NEW ADDRESS</span>
        </div>
      </div>

      <List/>

    </header>
  </div>
</template>
<script>
import myOrderMixin from '../../myOrderMixin'
import List from '../components/mobileAdressList'
export default {
  mixins: [myOrderMixin],
  components: {
    List,
  }
}
</script>
<style lang="scss" scoped>
.mb20{
  margin-bottom: 20px;
}
.cs-adress {
  header {
    background: #fff;
    padding-bottom: 16px;
    padding-top: 40px;
    h1 {
      font-size: 18px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 23px;
      letter-spacing: 1px;
      text-align: center;
    }
  }
  &_wrapper {
    .adress_empty{
      width: auto;
      height: auto;
      margin: 0 20px;
      background: #FAFAFA;
      padding: 120px 20px;
      text-align: center;
      cursor: pointer;
    }
    i{
      font-size: 24px;
      display: block;
      margin-bottom: 20px;
    }
    .text{
      font-size: 14px;
      font-weight: bolder;
    }
  }
}
</style>
