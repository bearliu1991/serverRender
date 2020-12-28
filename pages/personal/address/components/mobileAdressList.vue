<template>
  <div class="list" :class="terminal">
      <slot></slot>
      <address v-for="(item, key) in adressList" :key="key">
        <span class="name"><b>{{item.firstName + ' ' + item.lastName}}</b></span><br/>
        <span>{{item.company}}</span><br/>      
        <span>{{item.addressFirst}}</span><br/>
        <span>{{item.addressSecond}}</span><br/>
        <span>{{item.postcode}}</span><br/>
        <span>{{item.city}}</span><br/>
        <span>{{item.country}}</span><br/>
        <span>{{item.telephone}}</span><br/>
        <div class="deal-tools">
          <div class="default-adress" v-if="item.isDefault - 0 !== 0 ">
            <div class="checks el-icon-check"></div>
            <span>Default adress</span>
          </div>
          <div class="editAndDelete">
            <span @click="() => openUpdateDialog(item)">Edit</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span @click="() => deleteAddress(item.id)">Delete</span>
          </div>
        </div>
      </address>
  </div>
</template>
<script>
export default {
  props: {
    terminal: String,
    adressList: Array,
    deleteAddress: {
      type: Function,
      default: () => () => {}
    },
    openUpdateDialog: {
      type: Function,
      default: () =>() => {}
    }
  },
  mounted(){
    console.log('this.adressList', this.adressList)
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
    margin-bottom: 20px;
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
div.list.pc{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  address{
    width: 360px;
    margin-right: 20px;
    flex-grow: 0;
  }
} 
</style>