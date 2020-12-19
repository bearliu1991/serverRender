import Vue from 'vue'
import { upperFirst } from '../assets/js/utils'
const requireComponent = require.context(
  // 其组件目录的相对路径(组件目录相对于当前js文件的路径)
  '../components/',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式(因此要注册为全局组件的组件名称约定很重要)
  /\.(vue)$/
)
requireComponent.keys().forEach((fileName) => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName) // 这里的componentConfig包含当前fileName对应组件的所有该组件信息,等于拿到了当前组件实例
  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    // 获取和目录深度无关的文件名
    fileName
      .split('/')
      .pop()
      .replace(/\.\w+$/, '') // 将.(包括.)字符以后的字符用''代替
  )
  // 全局注册组件
  Vue.component(
    `cs${componentName}`,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
