import Vue from 'vue'
import alert from '../components/base/cupMessageBox.vue'

const Alert = Vue.extend(alert) // 创建alert组件的构造类

const alertFun = function (options) {
  // 接收配置
  const str_num = typeof options === 'string' || typeof options === 'number'
  const Instance = new Alert({
    // 实例化组件
    data: {
      // 给data的变量赋值
      title: (options && options.title) || '提示',
      text: str_num ? options : (options && options.text) || '',
      isConfirm: options.isConfirm !== false,
      isCancel: options.isCancel === true,
      cancelText: (options && options.cancel) || 'NO',
      confirmText: (options && options.confirm) || 'YES',
    },
  })
  const vm = Instance.$mount() // 挂载
  document.body.appendChild(vm.$el) // 插入body
  return vm.init() // 执行初始化方法, 返回的是一个promise
}

Vue.prototype.$alert = alertFun
