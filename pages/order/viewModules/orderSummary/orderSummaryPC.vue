<template>
  <div class="cs-orderSummary">
    <p class="header-tit">
      <span>ORDER SUMMARY</span>
      <a class="cs-link-text">Back to my bag</a>
    </p>
    <div class="cs-orderSummary-container">
      <!-- 商品 -->
      <div class="product-container">
        <div class="cs-orderSummary-products">
          <cup-product-item :product="product">
            <template v-slot:other="{ item }">
              <div class="p-other">
                <p class="quanity">X {{ item.quantity }}</p>
                <p class="price">
                  {{
                    (item.discountPrice || item.retailPrice) | formatCurrency
                  }}
                </p>
              </div>
            </template>
          </cup-product-item>
          <div class="product-item disabled">
            <cup-product-item :product="product">
              <template v-slot:other="{ item }">
                <div class="p-other">
                  <p class="quanity">X {{ item.quantity }}</p>
                  <p class="price">
                    {{
                      (item.discountPrice || item.retailPrice) | formatCurrency
                    }}
                  </p>
                </div>
              </template>
            </cup-product-item>
            <div class="cs-fail-msg">
              <p>
                Unfortunately, some items in your shopping bag are sold out. You
                can continute to pay for the remaining goods.
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 优惠券 -->
      <div class="cs-orderSummary-giftCard">
        <div class="cs-success-msg">You discount has been applied</div>
        <div class="card-con">
          <el-form class="cup-input">
            <el-form-item prop="email">
              <el-input
                v-model="email"
                placeholder="Gift card or discount code"
                type="email"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <cup-button type="primary">Apply</cup-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 已选中的折扣优惠券 -->
        <div class="card-selected">
          <div class="card-buttons">
            <i class="icon iconfont iconicon-wap-14-zhekou"></i>
            <span>STB20JULY-5ty5qb</span>
            <i class="icon iconfont iconicon-web-14-sousuoguanbi"></i>
          </div>
        </div>
      </div>
      <!-- 价格 -->
      <div class="cs-orderSummary-orderprice">
        <ul>
          <li>
            <label>Subtotal</label>
            <p>AUD $24.99</p>
          </li>
          <li>
            <label>Discount</label>
            <p>-AUD $24.99</p>
          </li>
          <li>
            <label
              >shipping <i class="icon iconfont iconicon-wap-18-yiwen"></i>
            </label>
            <p>AUD $24.99</p>
          </li>
          <li class="orderTotal">
            <label>Total</label>
            <p>AUD $24.99</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      product: {
        afterpayInfo: 'or 4 interest-free payments of $25.00 by',
        color: 'Neon Pink',
        colorEn: 'Neon Pink',
        colorImageUrl:
          'https://test-cupshe-optimus.oss-cn-hangzhou.aliyuncs.com/342A24F8245F452BA78AF37C35CBADEF.jpg',
        currencySign: '$',
        discountPrice: '100.00',
        id: 34,
        isChecked: true,
        isoCode: 'USD',
        points: 500,
        productName: 'lianyiqunA',
        productNameEn: 'lianyiqunA',
        productType: 'Dress',
        quantity: 999,
        retailPrice: '9999.00',
        roughWeight: 0.15,
        size: 'XXS',
        skcId: 533,
        skuId: 1138,
        skuState: 0,
        spuId: 448,
        stock: null,
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.cs-orderSummary {
  .header-tit {
    margin-top: 47px;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-family: Muli-Regular_Bold, Muli;
    font-weight: normal;
    color: #333333;
    letter-spacing: 1px;
    padding-bottom: 17px;
    a {
      flex: 1;
      font-size: 12px;
      text-align: right;
      font-family: Muli-Regular_Light, Muli;
    }
  }
  .product-container {
    max-height: 480px;
    overflow-y: auto;
  }
  &-products {
    margin-right: 32px;
    padding-top: 20px;

    border-bottom: 1px solid #f2f2f2;
    border-top: 1px solid #f2f2f2;
    .product-item {
      &.disabled {
        border-bottom: 1px solid #f2f2f2;
        padding-bottom: 20px;
        .cs-product2 {
          opacity: 0.5;
        }
      }
    }
    .cs-product2 {
      margin-bottom: 20px;
      .p-img {
        width: 100px;
        height: 150px;
        margin-right: 16px;
      }
      .p-other {
        margin-top: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        font-size: 12px;
        font-family: Muli-Regular_SemiBold, Muli;
        font-weight: normal;
        color: #333333;
        line-height: 15px;
      }
    }
  }
  &-giftCard {
    padding: 20px 0;
    border-bottom: 1px solid #f2f2f2;
    .el-form {
      display: flex;
      &-item:first-child {
        flex: 1;
      }
    }
    .cs-success-msg {
      margin-bottom: 16px;
    }
    .card-selected {
      margin-top: 16px;
      margin-right: 16px;
      .card-buttons {
        height: 32px;
        line-height: 32px;
        border: 1px solid #d8d8d8;
        padding: 0 12px;
        display: inline-block;
        i {
          font-size: 10px;
          &:first-child {
            font-size: 16px;
          }
          span {
            margin-left: 8px;
            margin-left: 12px;
            display: inline-block;
          }
        }
      }
    }
  }
  &-orderprice {
    padding: 20px 0;
    font-size: 14px;
    font-family: Muli-Regular_Light, Muli;
    font-weight: normal;
    color: #333333;
    line-height: 18px;
    li {
      display: flex;
      label {
        flex: 1;
      }
      &:not(:last-child) {
        margin-bottom: 16px;
      }
      &.orderTotal {
        padding-top: 20px;
        border-top: 1px solid #f2f2f2;
        font-family: Muli-Regular_Bold, Muli;
      }
    }
  }
}
</style>
