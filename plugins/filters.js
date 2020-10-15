import Vue from 'vue'
import filters from '@assets/js/filter.js'

// Vue注册全局过滤器
Object.keys(filters).forEach((key) => {
  return Vue.filter(key, filters[key])
})