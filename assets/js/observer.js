// 观察者模式 工具类 单例模式
class Observer {
  constructor() {
    if (Observer.instance) {
      return this
    } else {
      this.subs = {} // 订阅的事件列表
    }
  }

  subscribeEvent(name = '', callback) {
    if (!name) {
      throw new Error('请传入事件名称')
    }
    if (this.subs[name]) {
      throw new Error(`${name}事件已被订阅，请确认事件名称`)
    }

    this.subs[name] = callback
  }

  emitEvent(name = '', params = {}) {
    if (!name) {
      throw new Error('请传入事件名称')
    }
    if (!this.subs[name]) {
      throw new Error('当前事件未订阅，请先进行事件订阅')
    }
    this.subs[name](params)
  }
}

export default Observer
