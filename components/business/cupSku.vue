<template>
  <div class="cs-sku">
    <dl class="cs-sku-list">
      <dd v-for="(item, index) in attributes" :key="index" class="cs-sku-item">
        <div class="cs-sku-label">
          <p>{{ item.attributeName | toUpperCase }}</p>
          <template v-if="item.attributeName == 'size'">
            <div class="cs-sku-guide">
              <i class="icon iconicon-web-14-chima iconfont"></i>
              <a class="cs-link-text" @click="sizeGide">Size Guide</a>
            </div>
            <div class="cs-sku-guide">
              <i class="icon iconicon-web-14-truefitsize iconfont"></i>
              <a href="" class="cs-link-text">True Fit Size: M</a>
            </div>
          </template>
        </div>
        <ul>
          <li
            v-for="(subItem, subindex) in item.attributeValue"
            :key="subindex"
            :data-status="subItem.selectStatus"
            :class="
              subItem.selectStatus == 0 || subItem.selectStatus == 2
                ? selectClass[subItem.selectStatus]
                : ''
            "
            @click="handleClick(index, subindex, subItem.selectStatus)"
          >
            <el-tooltip
              :disabled="!subItem.stock || subItem.stock > 20"
              :content="`only left ${subItem['stock']}!`"
              placement="top"
              effect="light"
              popper-class="cupshe-tooltip"
            >
              <p v-if="subItem.attributeText.indexOf('http') > -1" class="img">
                <img :src="subItem.attributeText" alt="" srcset="" />
              </p>
              <span v-else> {{ subItem.attributeText }}</span>
            </el-tooltip>
          </li>
        </ul>
      </dd>
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
      // sku总层级数
      skuLevel: 0,
      attributes: [],
      defaultSkuId: '',
      // 0 禁用  1 可选  2 选中
      selectClass: {
        0: 'disabled',
        1: '',
        2: 'selected',
      },
      selectedSku: [],
    }
  },
  // watch: {
  //   product: {
  //     handler(value) {
  //       this.handleSku(value)
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
  created() {
    this.handleSku(this.product)
  },
  methods: {
    handleSku(product) {
      const { attribute = [] } = product
      this.attributes = attribute
      this.skuLevel = attribute.length
      this.findNext(0)
    },
    findNext(curLevel) {
      if (curLevel < this.skuLevel) {
        this.updateSku(curLevel)
        this.findNext(curLevel + 1)
      } else {
        const skuInfo = this.getSkuInfo(this.selectedSku[0])
        this.$emit('onSku', skuInfo)
      }
    },
    /**
     * 根据skuId获取sku信息
     */
    getSkuInfo(skuId) {
      const { skuList } = this.product
      return skuList.find((value) => {
        return value.skuId === skuId
      })
    },
    /**
     * 遍历更新当前层级的每个sbom是否可选  还是禁用
     */
    updateSku(level) {
      const { attributeValue } = this.attributes[level]
      let selected = false
      let joinResult = []
      attributeValue.forEach((item, index) => {
        const { skuIds } = item
        let result = []
        // 第一层
        if (level === 0) {
          result = skuIds
        } else {
          // 数据的交集
          result = this.intersection(this.selectedSku, skuIds)
        }

        if (result.length > 0) {
          //  默认有库存
          let stock = true
          // 如果是最后一级，添加库存

          if (level === this.skuLevel - 1) {
            this.addStock(index, result[0])
            const skuInfo = this.getSkuInfo(result[0])
            // 无库存 可选
            if (skuInfo.stock === 0) {
              stock = false
            }
          }
          // 默认选中第一个有库存
          if (!selected && stock) {
            this.setSkuStatus(level, index, 2)
            selected = true
            joinResult = result
          } else {
            this.setSkuStatus(level, index, 1)
          }
        } else {
          this.setSkuStatus(level, index, 0)
        }
      })
      this.selectedSku = joinResult
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
    handleClick(level, index, status) {
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
  }
  &-guide {
    font-size: 14px;
    font-family: Muli-Regular_Light, Muli;
    font-weight: normal;
    color: #333333;
    line-height: 18px;
    margin-left: 20px;
    i {
      margin-right: 4px;
    }
  }
  dd {
    &.cs-sku-item {
      margin-bottom: 30px;
      p {
        font-size: 14px;
        font-family: $muliRegularLightMuli;
        font-weight: normal;
        color: #333333;
        line-height: 18px;
        margin-bottom: 12px;
      }
      ul {
        display: flex;
        li {
          font-family: Muli-Regular_Light, Muli;
          width: 52px;
          height: 52px;
          border-radius: 28px;
          margin-right: 10px;
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
            border: 1px solid #333333;
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
        }
      }
    }
  }
}
</style>
