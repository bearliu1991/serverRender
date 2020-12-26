<template>
  <div class="list">
      <address>
        <span class="name"><b>Amy Allen</b></span><br/>
        <span>kapeixi</span><br/>      
        <span>Broadway and Seventh Ave1</span><br/>
        <span>Broadway and Seventh Ave2</span><br/>
        <span>New York NY 10036</span><br/>
        <span>New York</span><br/>
        <span>United States</span><br/>
        <span>13476580023</span><br/>
        <div class="deal-tools">
          <div class="default-adress">
            <div class="checks el-icon-check"></div>
            <span>Default adress</span>
          </div>
          <div class="editAndDelete">
            <span>Edit</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>Delete</span>
          </div>
        </div>
      </address>
  </div>
</template>
<script>
export default {
  props: {
    data: Object
  },
  data(){
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
div.list{
  width: auto;
  height: auto;
  margin: 20px;
  address{
    padding: 20px;
    width: auto;
    height: auto;
    background:#FAFAFA;
    display: block;
    font-size: 14px;
    line-height: 28px;
    b{
      font-weight: bold;
      margin-bottom: 20px;
    }
    .deal-tools{
      width: auto;
      position: relative;
      height: 40px;
      font-size: 12px;
      .default-adress{
        overflow: hidden;
        .checks{
          width: 16px;
          height: 16px;
          background: #000;
          margin-top: 11px;
          margin-right: 4px;
          float: left;
          color: #FFF;
          font-size: 11px;
          text-align: center;
          line-height: 16px;
          cursor: pointer;
        }
        span{
          float: left;
        }
        position: absolute;
        left: 0;
        top: 0;
      }
      .editAndDelete{
        position: absolute;
        right: 0;
        top: 0;
        span{
          text-decoration: underline;
        }
      }
      span{
        line-height: 40px;
      }
    }
  }

}  
</style>