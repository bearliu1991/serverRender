<template>
  <div class="cs-adress" :class="terminal">
    <header>
      <h1 class="mb20">ADDRESS BOOK</h1>
      <List
        :terminal="terminal"
        :adress-list="adressList"
        :delete-address="deleteAddress"
        :open-update-dialog="openUpdateDialog"
      >
        <div class="cs-adress_wrapper">
          <div class="adress_empty" @click="() => formShowDeal(true, true)">
            <i class="el-icon-circle-plus"></i>
            <span class="text">ADD A NEW ADDRESS</span>
          </div>
        </div>
      </List>

      <div class="adress_form" v-if="formShow">
        <div class="container" :class="formTopAni ? 'container_transform' : ''">
          <div class="adress_form_header">
            <h2 v-if="addOrEditAddress">ADD A NEW ADDRESS</h2>
            <h2 v-if="!addOrEditAddress">UPDATE ADDRESS</h2>
            <span>Please fill in the information below</span>
            <i class="el-icon-close" @click="() => formShowDeal(false)"></i>
          </div>
          <div class="address-wrapper">
            <cup-address-form
              class="form"
              :data="formData"
              :is-edit="isEdit"
              ref="formData"
            ></cup-address-form>
            <cup-checkbox v-model="defaultAdress">
              <span>Set as default address</span>
            </cup-checkbox>
          </div>
          <div
            class="submit_btn_container"
            @click="newOrUpdateAddress"
            :class="formTopAni ? 'transform' : ''"
          >
            <div class="submit_btn">SAVE</div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
import addressMixin from '../addressMixin'
export default {
  mixins: [addressMixin],
}
</script>
<style lang="scss" scoped>
.mb20 {
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
    .adress_empty {
      width: auto;
      height: auto;
      background: #fafafa;
      padding: 120px 20px;
      text-align: center;
      cursor: pointer;
      margin-bottom: 20px;
    }
    i {
      font-size: 24px;
      display: block;
      margin-bottom: 20px;
    }
    .text {
      font-size: 14px;
      font-weight: bolder;
    }
  }
  .adress_form.show {
    display: block;
  }
  .adress_form.hide {
    display: none;
  }
  .adress_form {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    .adress_form_header {
      height: 74px;
      text-align: center;
      position: relative;
      h2 {
        font-size: 18px;
        font-weight: bold;
        line-height: 30px;
        margin-bottom: 10px;
      }
      span {
        font-size: 14px;
        line-height: 24px;
        font-weight: 500;
        color: #333;
      }
      .el-icon-close {
        position: absolute;
        right: 0px;
        top: 5px;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .address-wrapper {
      overflow-y: scroll;
      height: calc(95vh - 160px);
      padding-bottom: 20px;
    }
    .container {
      width: 100%;
      height: 95vh;
      padding: 20px;
      background: #fff;
      position: absolute;
      top: 100vh;
      left: 0;
      transition: top 1s;
      // overflow-y: scroll;

      .default-adress {
        overflow: hidden;
        height: 30px;
        padding-top: 10px;
        .checks {
          width: 16px;
          height: 16px;
          background: #000;
          margin-right: 4px;
          float: left;
          color: #fff;
          font-size: 11px;
          text-align: center;
          line-height: 16px;
          cursor: pointer;
        }
        span {
          float: left;
          font-size: 12px;
          line-height: 16px;
        }
      }
    }
    .container_transform {
      top: 5vh;
    }
    .submit_btn_container {
      width: 100%;
      height: 60px;
      padding: 10px 20px;
      background: #fff;
      position: fixed;
      left: 0;
      bottom: -60px;
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.12);
      transition: bottom 1s 0.8s;
      .submit_btn {
        cursor: pointer;
        width: 100%;
        height: 40px;
        background: #000;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.12);
        color: #fff;
        font-size: 14px;
        text-align: center;
        line-height: 40px;
      }
    }

    .submit_btn_container.transform {
      bottom: 0px;
    }
  }
}

.cs-adress.pc {
  h1 {
    text-align: left;
    text-indent: 20px;
  }

  .adress_empty {
    width: 360px;
    margin-right: 20px;
    flex-grow: 0;
  }

  .adress_form .address-wrapper {
    height: auto;
    padding-bottom: 0;
  }
  .adress_form {
    .container {
      width: 700px;
      height: 620px;
      position: fixed;
      left: 50%;
      top: 50%;
      margin-left: -350px;
      margin-top: -310px;
      .submit_btn_container {
        position: static;
        box-shadow: none;
        transition: none;
        bottom: unset;
        padding: 15px 0;
      }
    }
  }
}
</style>
