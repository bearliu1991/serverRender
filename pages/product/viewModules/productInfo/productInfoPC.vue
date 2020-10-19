<template>
  <div class="cs-product-base">
    <!-- 面包屑 -->
    <!-- 面包屑 -->
    <cup-breadcrumb class="cs-breadcrumb-pc" separator="/">
      <cup-breadcrumb-item :to="{ path: '/' }">Home</cup-breadcrumb-item>
      <cup-breadcrumb-item>New In</cup-breadcrumb-item>
      <cup-breadcrumb-item>Rose Print Ruffls Bikini</cup-breadcrumb-item>
    </cup-breadcrumb>
    <!-- 商品详情 -->
    <!-- 商品左 -->
    <div class="cs-product-left">
      <div class="cs-product-left-mainImg">
        <img :src="checkedSkuInfo.colorImageUrl" alt="" srcset="" />
      </div>
      <div class="cs-product-left-thumbImg">
        <div
          v-for="(item, index) in checkedSkuInfo.mediaList"
          :key="index"
          class="cs-product-left-imgs"
        >
          <img :src="item.mediaUrl" alt="" srcset="" />
        </div>
      </div>
    </div>
    <!-- 商品右边部分 -->
    <div class="cs-product-right">
      <!-- 商品名称 -->
      <div class="cs-product-name">
        <p>{{ product.productName.toUpperCase() }}</p>
        <div class="cs-product-share">
          <div class="circle">
            <i class="icon iconicon-web-30-fenxiang iconfont"> </i>
          </div>
          <em>SHARE</em>
        </div>
      </div>
      <!-- 评分 -->
      <div class="cs-product-rate">
        <cup-rate
          v-model="product.rating"
          :score="product.ratingNum"
        ></cup-rate>
      </div>
      <!-- 价格区域 -->
      <div class="cs-product-price">
        <p>
          {{ checkedSkuInfo.currencySign
          }}{{ checkedSkuInfo.discountPrice || checkedSkuInfo.retailPrice }}
        </p>
        <del v-if="checkedSkuInfo.discountPrice"
          >{{ checkedSkuInfo.currencySign
          }}{{ checkedSkuInfo.retailPrice }}</del
        >
      </div>
      <!-- 支付提示 -->
      <div class="cs-product-payment">
        <span v-html="checkedSkuInfo.afterpayInfo"> </span>
        <i class="afterplay-tag"></i>
        <a href="" class="cs-link-text">More info</a>
      </div>
      <!-- skuList -->
      <div class="cs-product-sku">
        <cup-sku :product="product" @onSku="getSkuInfo"></cup-sku>
      </div>
      <!-- 数量和按钮 -->
      <div class="cs-product-operate">
        <!-- 加减数量 -->
        <cup-input-number
          v-model="productNum"
          :min="min"
          :max="checkedSkuInfo.stock"
        ></cup-input-number>
        <!-- 加入购物车 -->
        <cup-button v-if="stockStatus == 2" type="primary">
          add to bag · {{ checkedSkuInfo.currencySign
          }}{{ checkedSkuInfo.discountPrice || checkedSkuInfo.retailPrice }}
        </cup-button>
        <!-- 到货通知 -->
        <cup-button
          v-else-if="stockStatus == 0"
          type="primary"
          @click="arrivalNotice"
          >NOTIFY ME WHEN AVAILABLE</cup-button
        >
        <cup-button v-else disabled type="primary"
          >Please check availability</cup-button
        >
      </div>
      <!-- 库存提示 -->
      <p class="cs-product-stockTip">
        <template v-if="checkedSkuInfo.stock == 0">
          None left in stock
        </template>
        <!-- 加入购物车后库存不足 -->
        <template
          v-if="checkedSkuInfo.stock > 0 && productNum > checkedSkuInfo.stock"
        >
          Only {{ checkedSkuInfo.stock }} left！
        </template>
      </p>
      <!-- 积分 -->
      <div class="cs-product-point">
        <p>
          Sunchaser member will earn
          <strong>{{ checkedSkuInfo.points }} points.</strong>
        </p>
      </div>
      <!-- 商品详细描述 -->
      <div class="cs-product-description">
        <product-service :service-list="serviceList"></product-service>
      </div>
    </div>
    <!-- 到货通知弹框 -->
    <arrival-notice :visible.sync="dialogVisible"></arrival-notice>
  </div>
</template>
<script>
import detailModel from '@moduleMixin/product/detailModule'
import productService from './components/productService'
// 到货通知
import arrivalNotice from './components/arrivalNotice'
export default {
  name: 'Pc',
  components: {
    productService,
    arrivalNotice,
  },
  mixins: [detailModel],
  data() {
    return {
      // num: 1,
    }
  },
  beforeCreate() {},
  mounted() {},
}
</script>
<style lang="scss" scoped>
.cs-product {
  &-base {
    padding: 0 284px;
    overflow: hidden;
  }
  &-left {
    width: 744px;
    margin-right: 92px;
    img {
      height: 100%;
    }
    &-mainImg {
      height: 1116px;
      margin-bottom: 16px;
    }
    &-thumbImg {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    &-imgs {
      height: 546px;
      margin-bottom: 16px;
      flex-basis: calc((100% - 16px) / 2);
      flex-shrink: 0;
      position: relative;
      &::after {
        font-family: 'iconfont' !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        content: '\e69b';
        display: inline-block;
        font-size: 16px;
        position: absolute;
        right: 28px;
        bottom: 28px;
      }
    }
  }
  &-right {
    overflow: hidden;
  }
  &-name {
    display: flex;
    margin-bottom: 12px;
    p {
      font-size: 24px;
      font-family: $muliBoldMuli;
      font-weight: bold;
      color: $primary;
      line-height: 36px;
      letter-spacing: 2px;
      margin-right: 28px;
      flex: 1;
    }
  }
  &-share {
    i {
      font-size: 30px;
      display: block;
      margin: auto;
    }
    .circle {
      width: 40px;
      height: 40px;
      line-height: 40px;
      margin-bottom: 4px;
      display: block;
      font-size: 40px;
      border-radius: 20px;
      background-color: #d8d8d8;
    }
    em {
      font-size: 12px;
      font-family: Muli-Regular_Light, Muli;
      font-weight: normal;
      color: #0d0d0d;
      line-height: 15px;
      letter-spacing: 1px;
    }
  }
  &-price {
    margin-bottom: 13px;
    vertical-align: baseline;
    p {
      margin-right: 8px;
      font-size: 30px;
      font-family: $muliBoldMuli;
      font-weight: bold;
      color: #333333;
      line-height: 38px;
      letter-spacing: 2px;
      display: inline-block;
    }
    del {
      font-size: 14px;
      font-family: Muli-Regular_Light, Muli;
      font-weight: normal;
      color: #999999;
      line-height: 18px;
      vertical-align: text-bottom;
    }
  }
  &-payment {
    font-size: 12px;
    margin-bottom: 40px;
    font-family: Muli-Regular_Light, Muli;
    color: #333333;
    line-height: 15px;
    font-weight: normal;
    .afterplay-tag {
      @include icon-image('afterpay');
      width: 100px;
      height: 21px;
      vertical-align: text-bottom;
    }
    strong {
      font-family: Muli-Bold, Muli;
    }
    a {
      text-decoration: underline;
      color: #333;
    }
  }
  &-operate {
    display: flex;
    margin-bottom: 10px;
    .cs-add-minus {
      height: 56px;
      background: #ffffff;
      border: 1px solid #d8d8d8;
      padding: 19px 18px;
    }
    .cs-button {
      width: 370px;
      margin-left: 10px;
    }
  }
  &-stockTip {
    font-size: 14px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #ff3040;
    line-height: 20px;
    margin-bottom: 10px;
  }
  &-point {
    margin-bottom: 40px;
    p {
      height: 15px;
      font-size: 12px;
      font-family: $muliRegularLightMuli;
      font-weight: normal;
      color: #999999;
      line-height: 15px;
    }
  }
}
.cs-breadcrumb-pc {
  padding: 37px 0 20px 0;
}
</style>
