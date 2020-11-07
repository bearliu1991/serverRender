import Vue from 'vue'
import filters from '@assets/js/filter.js'

// Vue注册全局过滤器
Object.keys(filters).forEach((key) => {
  return Vue.filter(key, filters[key])
})
// 注册全局函数
Vue.prototype.NumberMul = function (arg1, arg2) {
  let m = 0
  const s1 = arg1.toString()
  const s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}

  return (
    (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
    Math.pow(10, m)
  )
}
