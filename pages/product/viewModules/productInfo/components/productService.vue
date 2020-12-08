<template>
  <div :class="['cs-service', $store.state.terminal]">
    <!-- 商品补充说明 -->
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item
        v-for="(item, index) in serviceList"
        :key="item.title"
        :title="item.title"
        :name="index"
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="cs-service-body">
          <template v-if="index == 0">
            <section class="cs-service-descripe">
              <p>
                Optez pour un style de spectacle sans sacrifier le confort dans
                le bikini jaune vif festonné. Le débardeur jaune avec bonnets
                rembourrés offre un soutien et une couverture supplémentaires.
                Le bas de bikini parfaitement assorti offre une couverture
                modérée. La bordure festonnée ajoute des détails doux. C’est
                l’ensemble parfait pour votre prochaine aventure! Code de
                produit: ADD2004Y
              </p>
              <ul>
                <li>Larges bretelles</li>
                <li>Festonné</li>
                <li>Bonnets amovibles</li>
                <li>Lavage régulier</li>
                <li>Tissu: 80% Chinlon 20% Spandex</li>
                <li>Motif: couleur unie</li>
              </ul>
            </section>
          </template>
          <!-- 运费 -->
          <template v-if="index == 1">
            <section class="cs-service-shipping">
              <p>
                Delivery Time = Warehouse Processing Time (1 Business Day) +
                Shipping Time
              </p>
              <br /><br />
              <p>-To Australia and New Zealand</p>
              <p>Expedited Shipping: 7-9 business Days</p>
              <p class="highlight">
                FREE Expedited Shipping for orders over AUD$25, otherwise $5.
              </p>
              <br />
              <br />
              <p>Express Shipping: 4-6 business Days</p>
              <p class="highlight">
                FREE for orders over AUD$150, otherwise $8-$11 depending on
                order values.
              </p>
              <br />
              <p>
                Please allow an extra 1-2 business days due to current shipping
                delays. Learn more about<a>Shipping Info.</a>
              </p>
            </section>
          </template>
          <template v-if="index == 2">
            <section class="cs-service-return">
              <p>
                Don't worried if you changed your mind, here are some tips for
                Return & Exchange:
              </p>
              <ul>
                <li>
                  Items can be returned or exchanged (excluding beach towels,
                  accessories, and gift cards) within 30 days of receiving your
                  package.
                </li>
                <li>
                  Please contact our customer service team if you need to
                  process a return for any reason,<a> service@cupshe.com.</a>
                </li>
                <li>Learn more about our <a>Return Policy.</a></li>
              </ul>
            </section>
          </template>
          <template v-if="index == 3">
            <section class="cs-service-care">
              <ul>
                <li>
                  <i
                    class="icon iconfont iconicon-web-24-huyangzhinan-shuixibiao"
                  ></i>
                  <span>Hand wash in max 30 degrees.</span>
                </li>
                <li>
                  <i
                    class="icon iconfont iconicon-web-24-huyangzhinan-shuixibiao2"
                  ></i>
                  <span>Do not bleach.</span>
                </li>
                <li>
                  <i
                    class="icon iconfont iconicon-web-24-huyangzhinan-shuixibiao3"
                  ></i>
                  <span>Do not iron. </span>
                </li>
                <li>
                  <i
                    class="icon iconfont iconicon-web-24-huyangzhinan-shuixibiao4"
                  ></i>
                  <span> Do not dry clean. Do not tumble dry. </span>
                </li>
                <li>
                  <i
                    class="icon iconfont iconicon-web-24-huyangzhinan-shuixibiao5"
                  ></i>
                  <span> Drip dry in shade.</span>
                </li>
              </ul>
            </section>
          </template>
          <!-- <p v-html="item.content"></p> -->
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  props: {
    serviceList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      activeNames: [0],
    }
  },
}
</script>
<style lang="scss" scoped>
.cs-service {
  /deep/ .el-collapse-item__header {
    padding: 0 16px;
    height: 60px;
    background: #fff;
    width: 100%;
    font-size: 14px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #333333;
    line-height: 60px;
    letter-spacing: 2px;
    &.is-active {
      background: #f2f2f2;
    }
    .el-icon-arrow-right {
      font-family: 'iconfont' !important;
      font-size: 12px;
      font-style: normal;
      margin-right: 0;
      color: #999;
      -webkit-font-smoothing: antialiased;
      transform: rotate(0deg);
      &:before {
        content: '\e6cc';
      }
      &.is-active {
        color: #333;
        transform: rotate(-180deg);
      }
    }
  }
  &-body {
    padding: 20px 48px 40px 24px;
    font-size: 14px;
    color: #333333;
    line-height: 21px;
  }
  &-return,
  &-descripe {
    ul {
      padding-left: 7px;
      margin-top: 26px;
      list-style: inherit;
      margin-left: 10px;
      li {
        margin-bottom: 20px;
      }
    }
  }
  &-care {
    li {
      margin-bottom: 16px;
      display: flex;
      align-items: center;

      font-size: 14px;
      color: #333333;
      line-height: 40px;
      .icon {
        font-size: 24px;
        width: 24px;
        height: 100%;
        margin-right: 12px;
      }
    }
  }
  .highlight {
    color: #ffab00;
  }
  a {
    font-family: Muli-Regular_SemiBold, Muli;
  }
  &.pc {
    /deep/ .el-collapse-item__header {
      width: 516px;
      background: #f2f2f2;
      &.is-active {
        background: #f2f2f2;
      }
    }
  }
}
</style>
