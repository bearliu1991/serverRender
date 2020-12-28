<template>
  <div class="cs-adress" :class="terminal">
    <header>
      <h1 class="mb20">ADDRESS BOOK</h1>
      <List
        :terminal="terminal"
        :adressList="adressList"
        :deleteAddress="deleteAddress"
        :openUpdateDialog="openUpdateDialog"
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
          <Form
            class="form"
            :data="formData"
            :isEdit="isEdit"
            :ref="'formData'"
          />
          <div class="default-adress" @click="defaultAdressChoose">
            <div
              class="checks"
              :class="formData.isDefault ? 'el-icon-check' : ''"
            ></div>
            <span>Default adress</span>
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
import myOrderMixin from '../../myOrderMixin'
import List from '../components/mobileAdressList'
import Form from '../../../../components/business/cupAddressForm'
export default {
  mixins: [myOrderMixin],
  components: {
    List,
    Form,
  },
  async asyncData({ app: { $http, $api }, query }) {},
  mounted() {
    this.getAddressList()
  },
  data() {
    return {
      addOrEditAddress: true, // add true - edit false
      isEdit: false,
      formShow: false,
      formTopAni: false,
      defaultAdress: false,
      adressList: [],
      formData: {
        addressFirst: null,
        addressSecond: null,
        alias: null,
        city: null,
        cityId: null,
        company: null,
        country: null,
        countryId: null,
        customerId: null,
        firstName: null,
        id: null,
        isDefault: null,
        lastName: null,
        other: null,
        postcode: null,
        stateId: null,
        stateName: null,
        telephone: null,
      },
    }
  },
  methods: {
    /**
     * 地址展示与隐藏
     */

    formShowDeal(status = false, addOrEditAddress = true) {
      this.addOrEditAddress = addOrEditAddress
      this.formShow = status
      if (!status) {
        this.formTopAni = status
        this.formData = {
          addressFirst: null,
          addressSecond: null,
          alias: null,
          city: null,
          cityId: null,
          company: null,
          country: null,
          countryId: null,
          customerId: null,
          firstName: null,
          id: null,
          isDefault: null,
          lastName: null,
          other: null,
          postcode: null,
          stateId: null,
          stateName: null,
          telephone: null,
        }
      } else {
        setTimeout(() => {
          this.formTopAni = status
        }, 0)
      }
    },
    /**
     * 默认地址设置
     */

    defaultAdressChoose() {
      this.defaultAdress = !this.defaultAdress
      this.formData.isDefault = this.formData.isDefault ? 0 : 1
    },
    /**
     * 获取当前用户的所有地址
     */
    async getAddressList() {
      const { list } = await this.$api.address.getAddressList()
      this.adressList = list
    },
    /**
     * 打开更新地址窗口
     */
    openUpdateDialog(formData) {
      this.formData = { ...formData }
      this.isEdit = true
      this.formShowDeal(true, false)
    },
    /**
     * 新增地址
     * 更新地址
     */
    async newOrUpdateAddress() {
      await (this.addOrEditAddress
        ? this.$api.address.saveAddress({
            ...this.$refs.formData.formData,
            isDefault: this.formData.isDefault,
          })
        : this.$api.address.updateAddress({
            ...this.$refs.formData.formData,
            isDefault: this.formData.isDefault,
          }))
      this.getAddressList()
      this.formShowDeal()
      this.$alert({
        text: '修改成功！',
        isComfirm: true,
      })
    },
    /**
     * 删除地址
     */
    deleteAddress(id) {
      this.$alert({
        text: '是否确认删除？',
        isCancel: true,
        isComfirm: true,
      }).then(async () => {
        await this.$api.address.deleteAddress(id)
        this.getAddressList()
      })
    },
  },
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
    .form {
      overflow-y: scroll;
      height: calc(95vh - 190px);
      padding-bottom: 20px;
    }
    .container {
      width: auto;
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

  .adress_form .form {
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
