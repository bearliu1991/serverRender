import Vue from 'vue'
import toast from '../components/base/cupToast.vue'

const Toast = Vue.extend(toast) // 创建alert组件的构造类

const toastFun = function (text, durations) {
  const Instance = new Toast({
    // 实例化组件
    data: {
      text,
      durations,
    },
  })
  const vm = Instance.$mount() // 挂载
  document.body.appendChild(vm.$el) // 插入body
}

Vue.prototype.$toast = toastFun
