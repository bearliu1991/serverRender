// 全局事件订阅
import Observer from './observer'
const observer = new Observer()

/**
 * 接口未登陆
 * 使用方法： observer.emitEvent('NOTLOGIN')
 */
observer.subscribeEvent('NOTLOGIN', () => {
  // eslint-disable-next-line no-console
  console.log('跳转登陆页面')
})
