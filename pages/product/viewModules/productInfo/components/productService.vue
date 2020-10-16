<template>
  <div class="cs-product-service">
    <!-- 商品补充说明 -->
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item
        v-for="(item, index) in serviceList"
        :key="item.title"
        :title="item.title"
        :name="index"
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div>
          <p v-html="item.content"></p>
          Optez pour un style de spectacle sans sacrifier le confort dans le
          bikini jaune vif festonné. Le débardeur jaune avec bonnets rembourrés
          offre un soutien et une couverture supplémentaires. Le bas de bikini
          parfaitement assorti offre une couverture modérée. La bordure
          festonnée ajoute des détails doux. C’est l’ensemble parfait pour votre
          prochaine aventure! Code de produit: ADD2004Y
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
<style lang="scss">
.cs-product-service {
  .el-collapse-item__header {
    padding: 0 20px;
    height: 60px;
    background: #f2f2f2;
    width: 516px;
    font-size: 14px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #333333;
    line-height: 60px;
    letter-spacing: 2px;
    &.mobile {
      width: 100%;
    }
  }
}
</style>
