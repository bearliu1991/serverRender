<template>
  <article>
    <cup-empty v-if="!checkedSkuInfo" class="icon-no-result">
      <p>THIS ITEM IS TEMPORARILY UNAVAILABLE</p>
      <!-- <cup-button type="primary">SHOP OUR BEST SELLERS</cup-button> -->
    </cup-empty>
    <section v-else>
      <div class="cs-product">
        <div class="cs-product-main">
          <!-- 轮播图 -->
          <section class="cs-product-swiper">
            <BannerM
              v-if="checkedSkuInfo.mediaList && checkedSkuInfo.mediaList.length"
              :list="checkedSkuInfo.mediaList"
              :product-type="product.productType"
            />
          </section>
          <section class="cs-product-layout grey">
            <!-- 商品名称 -->

            <p class="cs-product-name">
              {{ product.productName }}
            </p>

            <!-- 商品信息 -->
            <div class="cs-product-box">
              <!-- 商品价格 -->
              <div class="cs-product-price">
                <p v-if="checkedSkuInfo.retailPrice">
                  {{
                    (checkedSkuInfo.discountPrice ||
                      checkedSkuInfo.retailPrice) | formatCurrency
                  }}
                </p>
                <del v-if="checkedSkuInfo.discountPrice">{{
                  checkedSkuInfo.retailPrice | formatCurrency
                }}</del>
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
              <i class="icon iconfont icon18-xiangqing"></i>
            </div>
          </section>
          <!-- skuList -->
          <div class="cs-product-sku cs-product-layout">
            <cup-sku
              :product="product"
              @onSku="getSkuInfo"
              @onSize="doSizeGuide"
            >
            </cup-sku>
          </div>
          <div class="cs-product-number cs-product-layout">
            <p>QUANTITY</p>
            <cup-input-number
              v-model="productNum"
              :min="min"
              :max="checkedSkuInfo.stock < 10 ? checkedSkuInfo.stock : 999"
            >
              <em v-if="checkedSkuInfo.stock == 0" class="desc">
                Out of stock
              </em>
              <em
                v-else-if="
                  productNum >= checkedSkuInfo.stock ||
                  checkedSkuInfo.stock <= 10
                "
                class="desc"
              >
                only {{ checkedSkuInfo.stock }} left
              </em>
            </cup-input-number>
          </div>
          <!-- 积分 -->
          <!-- 加入购物车 -->
          <div class="cs-product-operate cs-product-layout fixedBottom">
            <i class="icon-share" @click="visibleShare = true"></i>
            <cup-button
              v-if="stockStatus == 2"
              class="hvr-sweep-to-right"
              type="primary"
              block
              :disabled="isSubmit"
              @click="addCart"
            >
              ADD TO BAG
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
          <!-- 积分 -->
          <!-- <div class="cs-product-point cs-product-layout">
        <p>
          Sunchaser member will earn
          <strong>{{ checkedSkuInfo.points }} points.</strong>
        </p>
      </div> -->
        </div>
        <!-- 商品详细描述 -->
        <div class="cs-product-description">
          <product-service
            :service-list="serviceList"
            :sku-info="checkedSkuInfo"
            :type="product.productType"
          ></product-service>
        </div>

        <!-- 到货通知弹框 -->
        <arrival-notice
          v-if="dialogVisible"
          :visible.sync="dialogVisible"
          :product="checkedSkuInfo"
        ></arrival-notice>
        <!-- 尺码表 -->
        <size-guide
          :visible.sync="showSizeGuide"
          :size-guide="product.sizeGuide"
        ></size-guide>
        <small-cart ref="smallCart"></small-cart>
        <cup-popup
          :visible.sync="visibleShare"
          :size="'175px'"
          title="share"
          @close-popup="visibleShare = false"
        >
          <share></share>
        </cup-popup>
      </div>
      <!-- 关联商品 -->
      <RelatedModel v-if="relateData" :product="relateData" />
    </section>
  </article>
</template>
<script>
import detailModel from '../productMixin'
import productService from './components/productService'
// // 到货通知
import arrivalNotice from './components/arrivalNotice'
import sizeGuide from './components/sizeGuideTable'
import share from './components/share'
export default {
  name: 'ProductInfoM',
  components: {
    productService,
    arrivalNotice,
    sizeGuide,
    share,
  },
  mixins: [detailModel],
  data() {
    return {
      visibleShare: false,
    }
  }, // 接口数据交互逻辑
  methods: {},
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
    // text-transform: capitalize;
    margin-bottom: 12px;
    padding-top: 12px;
    @include line-clamp(2);
  }
  &-rate {
    /deep/.el-rate__icon {
      width: 14px !important;
      height: 14px !important;
    }
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
      @include font($fontRegular);
      color: #999999;
      line-height: 18px;
    }
  }
  &-payment {
    color: #333333;
    font-size: 0;
    display: flex;
    align-items: center;
    padding-bottom: 16px;
    .afterplay-tag {
      @include icon-image('afterpay');
      width: 90px;
      height: 18px;
    }
    p {
      margin-bottom: 8px;
      font-size: 12px;
      flex: 1;
    }
    strong {
      font-family: Muli-Bold, Muli;
    }
    i {
      margin-left: 4px;
    }
    .icon {
      font-size: 18px;

      color: #d8d8d8;
    }
  }
  &-sku {
    padding-top: 16px;
  }
  &-number {
    padding-bottom: 26px;
    p {
      font-size: 12px;
      color: #333333;
      line-height: 15px;
      margin-bottom: 16px;
    }
    .desc {
      font-size: 12px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #e61717;
      line-height: 20px;
      margin-left: 24px;
    }
    /deep/ input {
      margin: 0 16px;
    }
  }
  &-point {
    margin-top: 8px;
    margin-bottom: 32px;
  }
  &-operate {
    margin-bottom: 24px;
    &.fixedBottom {
      height: 64px;
      position: fixed;
      bottom: 0;
      padding: 0 16px;
      right: 0;
      left: 0;
      background-color: #fff;
      margin-bottom: 0;
      z-index: 999;
      display: flex;
      align-items: center;
      .icon-share {
        margin-right: 16px;
        width: 30px;
        height: 30px;
      }
      .cs-button {
        flex: 1;
      }
    }
  }
}
</style>
