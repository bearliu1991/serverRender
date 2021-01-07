<template>
  <div :class="['cs-sku', $store.state.terminal]">
    <dl v-if="attributes.length" class="cs-sku-list">
      <template v-for="(item, index) in attributes">
        <dd v-if="item.attributeValue.length" :key="index" class="cs-sku-item">
          <div class="cs-sku-label">
            <p>
              {{ item.attributeName | toUpperCase }}：<em>{{
                checkedInfo[item.attributeName]
              }}</em>
            </p>
            <template v-if="item.attributeName == 'size'">
              <div class="cs-sku-guide">
                <i class="icon icon14-chima iconfont"></i>
                <a class="cs-link" @click="sizeGide">Size Guide</a>
              </div>
              <!-- <div class="cs-sku-guide">
              <i class="icon iconicon-web-14-truefitsize iconfont"></i>
              <a href="" class="cs-link-text">True Fit Size: M</a>
            </div> -->
            </template>
          </div>
          <ul v-if="item.attributeValue.length">
            <li
              v-for="(subItem, subindex) in item.attributeValue"
              :key="subindex"
              :data-status="subItem.selectStatus"
              :class="[
                theme,
                subItem.selectStatus == 0 || subItem.selectStatus == 2
                  ? selectClass[subItem.selectStatus]
                  : '',
                subItem.stock == 0 ? 'dashed' : '',
              ]"
              @click="handleClick(index, subindex, subItem.selectStatus)"
            >
              <template v-if="subItem.attributeText">
                <p
                  v-if="subItem.attributeText.indexOf('http') > -1"
                  class="img"
                >
                  <img :src="subItem.attributeText" alt="" srcset="" />
                </p>
                <span v-else> {{ subItem.attributeText }}</span>
              </template>
            </li>
          </ul>
        </dd>
      </template>
    </dl>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      skcTotal: 0,
      // 默认的skc索引 ，第一层默认第几个
      skcIndex: 0,
      // sku总层级数
      skuLevel: 0,
      attributes: [],
      // 0 禁用  1 可选  2 选中
      selectClass: {
        0: 'disabled',
        1: '',
        2: 'selected',
      },
      // 默认所有的都有货，若为true，则所有的sku都无货
      outStock: false,
      selectedSku: [],
      checkedInfo: {},
      // sku的主题风格  circle 圆  rectangle 矩形
      theme: 'circle',
    }
  },
  created() {
    this.handleSku(this.product)
  },
  methods: {
    handleSku(product) {
      const { attribute = [], productType } = product
      // 设置主题风格
      if (productType === 'GIFT CARD') {
        this.theme = 'rectangle'
      }
      this.attributes = attribute
      this.skuLevel = attribute.length
      this.checkValid()
      this.findNext(0)
    },
    // 校验是否全部sku都无货，若全部无货，则默认显示第一个

    checkValid() {
      const { skuList } = this.product
      const index = skuList.findIndex((item) => {
        return item.stock !== 0
      })
      if (index === -1) {
        this.outStock = true
      }
    },
    setDefaultSku() {},
    findNext(curLevel) {
      if (curLevel < this.skuLevel) {
        this.updateSku(curLevel)
        if (this.selectedSku.length === 0) {
          if (this.skcIndex < this.skcTotal) {
            this.skcIndex++
            this.findNext(0)
          }
        } else {
          this.findNext(curLevel + 1)
        }
      } else {
        const skuInfo = this.getSkuInfo(this.selectedSku[0])
        this.checkedInfo = skuInfo
        // 最后一个skuInfo库存为0，说明所有的sku库存都为0，
        this.$emit('onSku', skuInfo)
      }
    },
    /**
     * 根据skuId获取sku信息
     */
    getSkuInfo(skuId) {
      const { skuList } = this.product
      if (skuId) {
        return skuList.find((value) => {
          return value.skuId === skuId
        })
      } else {
        return skuList ? skuList[0] : {}
      }
    },
    /**
     * 遍历更新当前层级的每个sbom是否可选  还是禁用
     */
    updateSku(level) {
      const { outStock, skcIndex } = this
      const { attributeValue } = this.attributes[level]
      let selected = false
      // 当前属性下所有的sku是否全部没有库存，false ，说明全部没有库存
      let passed = false
      // 当前属性下某个sku是否有库存
      let stockPassed = true
      let joinResult = []
      // 计算第一层级所有的数量
      if (level === 0) {
        this.skcTotal = attributeValue.length
      }
      attributeValue.forEach((item, index) => {
        const { skuIds } = item
        let result = []
        // 第一层
        if (level === 0) {
          result = skuIds
        } else {
          // 数据的交集
          result = this.intersection(this.selectedSku, skuIds)
          stockPassed = this.findStock(result)
          passed = passed || stockPassed
        }
        if (level === 0 && this.skuLevel === 1) {
          stockPassed = this.findStock(result)
          passed = passed || stockPassed
        }

        if (result.length > 0) {
          //  默认有库存
          const stock = stockPassed
          // 如果是最后一级，添加库存

          if (level === this.skuLevel - 1) {
            this.addStock(index, result[0])
          }
          // skcIndex 设置的是默认第一层的sku索引
          if (level === 0) {
            if (skcIndex === index && !selected && stock) {
              this.setSkuStatus(level, index, 2)
              selected = true
              joinResult = result
            } else {
              this.setSkuStatus(level, index, 1)
            }
          } else {
            // 默认选中第一个有库存
            if (!selected && stock) {
              this.setSkuStatus(level, index, 2)
              selected = true
              joinResult = result
            } else {
              this.setSkuStatus(level, index, 1)
            }
          }
          // 如果是第一级全部无库存，则默认显示第一个，且选中状态
        } else {
          this.setSkuStatus(level, index, 0)
        }
      })
      //  若当前joinResult的长度为0 ，说明当前层级所有的sku都无货，就从上级开始切换查找
      // 说明全部是无库存，则默认显示第一个
      if (!passed && level === this.skuLevel - 1) {
        if (outStock) {
          this.setSkuStatus(level, 0, 2)
          joinResult = this.intersection(
            this.selectedSku,
            attributeValue[0].skuIds
          )
        } else {
          joinResult = []
        }
      }
      this.selectedSku = joinResult
    },
    // 查找当前一组sku是否都无库存
    findStock(skuIds) {
      const { skuList } = this.product
      let passed = true
      skuIds.forEach((skuId) => {
        const item = skuList.find((sku) => {
          return sku.skuId === skuId
        })
        if (item.stock === 0) {
          passed = false
        }
      })
      return passed
    },
    /**
     * 获取数组的交集
     */
    intersection(a, b) {
      return a.filter((v) => b.includes(v))
    },
    /**
     * 设置单个sku的状态
     */
    setSkuStatus(level, index, status = '') {
      this.$set(
        this.attributes[level].attributeValue[index],
        'selectStatus',
        status
      )
      this.$forceUpdate()
    },
    // 最后一级根据skuId添加库存
    addStock(index, skuId) {
      const skuInfo = this.getSkuInfo(skuId)
      if (skuInfo) {
        this.$set(
          this.attributes[this.skuLevel - 1].attributeValue[index],
          'stock',
          skuInfo.stock
        )
      }
    },
    /**
     * 处理当前下的前几级选中后的所有的交集
     */
    getPrevIntersection(level) {
      // 当前sku层级的前面sku规格交集
      const prevAttributes = this.attributes.slice(0, level)
      this.selectedSku = []
      if (prevAttributes.length === 0) {
        return false
      }
      prevAttributes.length &&
        prevAttributes.forEach((prev, index) => {
          const result = prev.attributeValue.find((value) => {
            return value.selectStatus === 2
          })
          if (index === 0) {
            this.selectedSku = result.skuIds
          }
          this.selectedSku = this.intersection(this.selectedSku, result.skuIds)
        })
    },
    /**
     * level  sbom的层级
     * index   当前层级下的第一个sku
     * status   当前sku的状态
     */
    handleClick(level, index, status) {
      // 切换时，当做全部无货处理，即默认显示当前第一个
      this.outStock = true
      const attributes = this.attributes[level]
      const curSkuIds = attributes.attributeValue[index].skuIds
      if (status === 0 || status === 2) {
        return false
      }
      // 当前层级的前选中后的交集
      this.getPrevIntersection(level)
      // 取消当前选中
      const selectedIndex = attributes.attributeValue.findIndex((item) => {
        return item.selectStatus === 2
      })
      // 当前的选中
      this.setSkuStatus(level, selectedIndex, '')
      // 当前的选中
      this.setSkuStatus(level, index, 2)

      if (level === 0) {
        this.selectedSku = curSkuIds
      } else {
        this.selectedSku = this.intersection(this.selectedSku, curSkuIds)
      }
      this.findNext(level + 1)
    },
    // 展开尺码表
    sizeGide() {
      this.$emit('onSize', true)
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-toolTip {
  position: absolute;
}
.cs-sku {
  &-label {
    display: flex;
    p {
      flex: 1;
    }
    em {
      @include font($fontMuliBold);
      text-transform: uppercase;
    }
  }
  &-guide {
    font-size: 14px;
    color: #333333;
    line-height: 18px;
    margin-left: 20px;
    i {
      margin-right: 4px;
    }
  }
  dd {
    &.cs-sku-item {
      padding-bottom: 30px;
      p {
        font-size: 14px;
        @include font($fontRegular);
        color: #333333;
        line-height: 18px;
        margin-bottom: 11px;
      }
      ul {
        display: flex;
        li {
          @include font($fontRegular);
          width: 52px;
          height: 52px;
          border-radius: 28px;
          margin-right: 12px;
          border: 1px solid #d8d8d8;
          text-align: center;
          line-height: 52px;
          color: #333333;
          font-size: 12px;
          .img {
            width: 44px;
            height: 44px;
            overflow: hidden;
            text-align: center;
            margin: 3px auto;
            img {
              border-radius: 50%;
              width: 100%;
              height: 100%;
            }
          }
          span {
            line-height: 15px;
          }
          &.selected {
            border: 1px solid #000;
            font-size: 16px;
            font-family: Muli-Bold, Muli;
            font-weight: bold;
            span {
              line-height: 20px;
            }
          }
          &.disabled {
            border: 1px dashed #d8d8d8;
          }
          &.dashed {
            border-style: dashed !important;
          }
          &.rectangle {
            line-height: 44px;
            height: 44px;
            border-radius: 0;
            min-width: 114px;
            padding: 0 9px;
            font-size: 14px;
            &.selected {
              border: 2px solid #333333;
              font-family: Muli-Regular_ExtraBold, Muli;
              font-weight: normal;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  &.mobile {
    dd.cs-sku-item {
      padding-bottom: 24px;
      li {
        width: 36px;
        height: 36px;
        line-height: 36px;
        .img {
          width: 28px;
          height: 28px;
          // margin: 4px auto;
        }
      }
    }
  }
}
</style>
