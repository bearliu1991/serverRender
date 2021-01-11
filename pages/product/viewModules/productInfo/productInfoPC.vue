<template>
  <section>
    <cup-empty v-if="!checkedSkuInfo" class="icon-no-result">
      <p>THIS ITEM IS TEMPORARILY UNAVAILABLE</p>
      <!-- <cup-button type="primary">SHOP OUR BEST SELLERS</cup-button> -->
    </cup-empty>
    <div v-else class="cs-product-base">
      <!-- 面包屑 -->
      <!-- 面包屑 -->
      <cup-breadcrumb class="cs-breadcrumb-pc" separator="/">
        <cup-breadcrumb-item :to="{ path: '/' }">Home</cup-breadcrumb-item>
        <cup-breadcrumb-item
          v-if="collectionName"
          :to="{ path: `/collection?id=${collectionId}` }"
          >{{ collectionName }}</cup-breadcrumb-item
        >
        <cup-breadcrumb-item>{{ product.productName }}</cup-breadcrumb-item>
      </cup-breadcrumb>
      <!-- 商品详情 -->
      <div class="cs-product-main">
        <section>
          <!-- 商品左 -->
          <div class="cs-product-left">
            <!-- 缩略图 -->
            <div
              v-if="checkedSkuInfo.mediaList && checkedSkuInfo.mediaList.length"
              class="cs-product-left-thumbImg"
            >
              <div
                v-for="(item, index) in checkedSkuInfo.mediaList"
                :key="index"
                :class="[
                  'cs-product-left-imgs',
                  imgIndex == index ? 'active' : '',
                ]"
                @click="imgIndex = index"
              >
                <template v-if="String(item.mediaType) === '1'">
                  <cup-video :source="item.mediaUrl"></cup-video>
                </template>
                <img :src="item.mediaUrl" v-else alt="" srcset="" />
              </div>
            </div>
            <!-- 主图 -->
            <div class="cs-product-left-mainImg">
              <template v-if="checkedSkuInfo.mediaList.length">
                <template
                  v-if="
                    String(checkedSkuInfo.mediaList[imgIndex].mediaType) === '1'
                  "
                >
                  <cup-video
                    :source="checkedSkuInfo.mediaList[imgIndex].mediaUrl"
                  ></cup-video>
                </template>

                <img
                  v-else
                  :src="checkedSkuInfo.mediaList[imgIndex].mediaUrl"
                  alt=""
                  srcset=""
                />
              </template>
            </div>
          </div>
          <!-- 关联商品 -->
          <RelatedModel v-if="relateData" :product="relateData" />
        </section>
        <!-- 商品右边部分 -->
        <div class="cs-product-right">
          <!-- 商品名称 -->
          <div class="cs-product-name">
            <p>{{ product.productName }}</p>
            <cup-dropdown>
              <div class="cs-product-share">
                <div class="circle">
                  <i class="icon iconicon-web-30-fenxiang iconfont"> </i>
                </div>
                <em>SHARE</em>
              </div>
              <cup-dropdown-menu>
                <share></share>
              </cup-dropdown-menu>
            </cup-dropdown>
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
              {{
                (checkedSkuInfo.discountPrice || checkedSkuInfo.retailPrice)
                  | formatCurrency
              }}
            </p>
            <del v-if="checkedSkuInfo.discountPrice">{{
              checkedSkuInfo.retailPrice | formatCurrency
            }}</del>
          </div>
          <!-- 支付提示 -->
          <div class="cs-product-payment">
            <span v-html="checkedSkuInfo.afterpayInfo"> </span>
            <i class="afterplay-tag"></i>
            <i
              class="icon iconfont icon18-xiangqing"
              @click="showPaymentTip = true"
            ></i>
          </div>
          <!-- skuList -->
          <div class="cs-product-sku">
            <cup-sku
              :product="product"
              @onSku="getSkuInfo"
              @onSize="doSizeGuide"
            >
            </cup-sku>
          </div>

          <!-- 库存提示 -->

          <template v-if="checkedSkuInfo.stock == 0">
            <p class="cs-product-stockTip">Out of Stock</p>
          </template>
          <!-- 加入购物车后库存不足 -->
          <template
            v-if="
              checkedSkuInfo.stock > 0 &&
              (productNum >= checkedSkuInfo.stock || checkedSkuInfo.stock <= 10)
            "
          >
            <p class="cs-product-stockTip">
              Only {{ checkedSkuInfo.stock }} left！
            </p>
          </template>

          <!-- 数量和按钮 -->
          <div class="cs-product-operate">
            <!-- 加减数量 -->
            <cup-input-number
              v-model="productNum"
              :min="min"
              :max="checkedSkuInfo.stock < 10 ? checkedSkuInfo.stock : 999"
            >
            </cup-input-number>
            <!-- 加入购物车 -->
            <cup-button
              v-if="stockStatus == 2"
              animated
              type="primary"
              size="big"
              :disabled="isSubmit"
              @click="addCart"
            >
              ADD TO BAG
            </cup-button>
            <!-- 到货通知 -->
            <cup-button
              v-else-if="stockStatus == 0"
              size="big"
              animated
              type="primary"
              @click="arrivalNotice"
              >NOTIFY ME WHEN AVAILABLE</cup-button
            >
            <cup-button v-else disabled type="primary"
              >Please check availability</cup-button
            >
          </div>

          <!-- 积分 -->
          <!-- <div class="cs-product-point">
          <p>
            Sunchaser member will earn
            <strong>{{ checkedSkuInfo.points }} points.</strong>
          </p>
        </div> -->
          <!-- 商品详细描述 -->
          <div class="cs-product-description">
            <product-service
              :service-list="serviceList"
              :sku-info="checkedSkuInfo"
              :type="product.productType"
            ></product-service>
          </div>
        </div>
      </div>
      <!-- 到货通知弹框 -->
      <arrival-notice
        :visible.sync="dialogVisible"
        :product="checkedSkuInfo"
      ></arrival-notice>
      <!-- 尺码表 -->
      <size-guide
        :visible.sync="showSizeGuide"
        :size-guide="product.sizeGuide"
      ></size-guide>
      <!-- 支付提示 -->
      <payment-tip :visible.sync="showPaymentTip"></payment-tip>
      <!-- 小购物车 -->
      <small-cart ref="smallCart"></small-cart>
    </div>
  </section>
</template>
<script>
import detailModel from '../productMixin'
import productService from './components/productService'
// 到货通知
import arrivalNotice from './components/arrivalNotice'
import sizeGuide from './components/sizeGuideTable'
import share from './components/share'
export default {
  name: 'Pc',
  components: {
    productService,
    arrivalNotice,
    sizeGuide,
    share,
  },
  mixins: [detailModel],
  data() {
    return {
      collectionName: '',
      collectionId: '',
    }
  },
  created() {
    const { collectionName, collectionId } = this.$route.query
    this.collectionName = collectionName
    this.collectionId = collectionId
  },
}
</script>
<style lang="scss" scoped>
.cs-product {
  &-main {
    display: flex;
  }
  &-base {
    padding: 0 284px;
    overflow: hidden;
  }
  &-left {
    // width: 744px;
    display: flex;
    margin-right: 92px;
    flex-shrink: 0;
    height: 980px;
    padding-bottom: 80px;
    border-bottom: 1px solid #d8d8d8;
    img {
      height: 100%;
    }
    &-mainImg {
      width: 600px;
      height: 100%;
      position: relative;
      margin-left: 13px;
      video {
        width: 100%;
        height: 100%;
        vertical-align: middle;
      }
    }
    &-thumbImg {
      overflow-y: auto;
      width: 132px;
    }
    &-imgs {
      width: 132px;
      height: 199px;
      margin-bottom: 11px;
      position: relative;

      &.active {
        border: 1px solid #000000;
        padding: 4px;
      }
    }
  }
  &-right {
    flex: 1;
  }
  &-name {
    display: flex;
    margin-bottom: 21px;
    p {
      font-size: 24px;
      @include font($fontMuliBold);
      color: $primary;
      margin-right: 35px;
      line-height: 36px;
      flex: 1;
      // text-transform: capitalize;
      @include line-clamp(2);
    }
  }
  &-share {
    i {
      font-size: 30px;
    }
    .circle {
      width: 40px;
      height: 40px;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      font-size: 40px;
      border-radius: 20px;
      justify-content: center;
      background-color: #f7f7f7;
    }
    em {
      font-size: 12px;
      color: #0d0d0d;
    }
  }
  &-rate {
    margin-bottom: 12px;
  }
  &-price {
    margin-bottom: 13px;
    vertical-align: baseline;
    p {
      margin-right: 8px;
      font-size: 30px;
      @include font($fontMuliBold);
      color: #333333;
      line-height: 38px;
      letter-spacing: 1px;
      display: inline-block;
    }
    del {
      font-size: 14px;
      @include font($fontRegular);
      color: #999999;
      line-height: 18px;
      vertical-align: text-bottom;
    }
  }
  &-payment {
    margin-bottom: 42px;
    color: #333333;
    font-size: 0;
    display: flex;
    align-items: center;
    span {
      font-size: 12px;
    }
    .afterplay-tag {
      @include icon-image('afterpay');
      width: 90px;
      height: 18px;
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
  &-operate {
    display: flex;
    margin-bottom: 40px;
    margin-top: 10px;
    .cs-add-minus {
      height: 56px;
      background: #ffffff;
      border: 1px solid #d8d8d8;
      padding: 19px 22px;
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
    display: flex;
    align-items: center;
    &::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #e61717;
      margin-right: 7px;
    }
  }
  &-point {
    margin-bottom: 40px;
    p {
      height: 15px;
      font-size: 12px;
      font-family: $fontRegular;
      font-weight: normal;
      color: #999999;
      line-height: 15px;
    }
  }
}
.cs-breadcrumb-pc {
  padding: 40px 0;
}
</style>
