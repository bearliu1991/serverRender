<template>
  <div class="cs-product">
    <div class="cs-product-main">
      <!-- 轮播图 -->
      <section class="cs-product-swiper">
        <BannerM
          :list="checkedSkuInfo.mediaList"
          :product-type="product.productType"
        />
      </section>
      <section class="cs-product-layout grey">
        <!-- 商品名称 -->

        <p class="cs-product-name">{{ product.productName.toUpperCase() }}</p>

        <!-- 商品信息 -->
        <div class="cs-product-box">
          <!-- 商品价格 -->
          <div class="cs-product-price">
            <p>
              AUD {{ checkedSkuInfo.currencySign
              }}{{ checkedSkuInfo.discountPrice || checkedSkuInfo.retailPrice }}
            </p>
            <del v-if="checkedSkuInfo.discountPrice"
              >AUD {{ checkedSkuInfo.currencySign
              }}{{ checkedSkuInfo.retailPrice }}</del
            >
          </div>
          <!-- 商品评价 -->
          <div class="cs-product-rate">
            <cup-rate
              v-model="product.rating"
              :score="product.ratingNum"
            ></cup-rate>
          </div>
        </div>
        <!-- 支付提示 -->
        <div class="cs-product-payment">
          <p v-html="checkedSkuInfo.afterpayInfo"></p>

          <i class="afterplay-tag"></i>
          <a href="" class="cs-link-text">More info</a>
        </div>
      </section>
      <!-- skuList -->
      <div class="cs-product-sku cs-product-layout">
        <cup-sku :product="product" @onSku="getSkuInfo" @onSize="doSizeGuide">
        </cup-sku>
      </div>
      <div class="cs-product-number cs-product-layout">
        <p>QUANTITY</p>
        <cup-input-number
          v-model="productNum"
          :min="min"
          :max="checkedSkuInfo.stock"
        ></cup-input-number>
      </div>
      <!-- 积分 -->
      <!-- 加入购物车 -->
      <div class="cs-product-operate cs-product-layout">
        <cup-button
          v-if="stockStatus == 2"
          class="hvr-sweep-to-right"
          type="primary"
          block
          size="big"
          @click="addCart"
        >
          add to bag · {{ checkedSkuInfo.currencySign
          }}{{ checkedSkuInfo.discountPrice || checkedSkuInfo.retailPrice }}
        </cup-button>
        <!-- 到货通知 -->
        <cup-button
          v-else-if="stockStatus == 0"
          type="primary"
          block
          @click="arrivalNotice"
          >NOTIFY ME WHEN AVAILABLE</cup-button
        >
        <cup-button v-else disabled block type="primary"
          >Please check availability</cup-button
        >
      </div>
      <div class="cs-product-point cs-product-layout">
        <p>
          Sunchaser member will earn
          <strong>{{ checkedSkuInfo.points }} points.</strong>
        </p>
      </div>
    </div>
    <!-- 商品详细描述 -->
    <div class="cs-product-description">
      <product-service :service-list="serviceList"></product-service>
    </div>

    <!-- 购物车吸底样式 -->
    <!-- <div v-show="visibleFixBottom" class="fix-bottom-box"> -->
    <!-- <i class="icon-share" @click="visibleShare = true"></i> -->
    <!-- 加入购物车按钮 -->
    <!-- <el-button class="cupshe-button hvr-sweep-to-right">{{
          `${$t('detail.addTobag')} · ${selectedSku.currencySign} ${
            selectedSku.discountPrice || selectedSku.retailPrice
          }`
        }}</el-button> -->
    <small-cart :visible.sync="isCartVisible" @close-popup="close"></small-cart>
  </div>
</template>
<script>
import detailModel from '../productMixin'
import productService from './components/productService'
// // 到货通知
// import arrivalNotice from './components/arrivalNotice'
// import sizeGuide from './components/sizeGuideTable'
// import share from './components/share'
export default {
  name: 'ProductInfoM',
  components: {
    productService,
    // arrivalNotice,
    // sizeGuide,
    // share,
  },
  mixins: [detailModel], // 接口数据交互逻辑
}
</script>
<style lang="scss" scoped>
.cs-product {
  &-swiper {
    height: 563px;
  }
  &-layout {
    padding: 0 16px;
  }
  .grey {
    background-color: #fafafa;
  }
  &-box {
    display: flex;
  }
  &-name {
    font-size: 18px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #333333;
    line-height: 27px;
    padding: 16px 0;
    @include line-clamp(2);
  }
  &-price {
    flex: 1;
    margin-bottom: 12px;
    p {
      font-size: 20px;
      font-family: Muli-Regular_ExtraBold, Muli;
      font-weight: normal;
      color: #333333;
      line-height: 25px;
      letter-spacing: 1px;
      display: inline-block;
    }
    del {
      margin-left: 4px;
      font-size: 14px;
      font-family: Muli-Regular_Light, Muli;
      font-weight: normal;
      color: #999999;
      line-height: 18px;
    }
  }
  &-payment {
    font-size: 12px;
    font-family: Muli-Regular_Light, Muli;
    font-weight: normal;
    color: #333333;
    line-height: 15px;
    padding-bottom: 24px;
    .afterplay-tag {
      @include icon-image('afterpay');
      width: 100px;
      height: 21px;
      vertical-align: text-bottom;
    }
    p {
      margin-bottom: 8px;
    }
    strong {
      font-family: Muli-Bold, Muli;
    }
    a {
      text-decoration: underline;
      color: #333;
    }
  }
  &-sku {
    padding-top: 26px;
  }
  &-number {
    padding-bottom: 24px;
    p {
      font-size: 12px;
      font-family: Muli-Regular_Light, Muli;
      font-weight: normal;
      color: #333333;
      line-height: 15px;
      margin-bottom: 14px;
    }
  }
  &-point {
    margin-top: 8px;
    margin-bottom: 32px;
  }
}
</style>
