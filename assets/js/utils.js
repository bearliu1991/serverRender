import { viewFitConfig } from './config'

// 获得当前终端类型
export const getTerminal = () => {
  const u = navigator.userAgent
  return {
    trident: u.includes('Trident'), // IE内核
    presto: u.includes('Presto'), // opera内核
    webKit: u.includes('AppleWebKit'), // 苹果、谷歌内核
    gecko: u.includes('Gecko') && !u.includes('KHTML'), // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.includes('Android') || u.includes('Adr'), // android终端
    iPhone: u.includes('iPhone'), // 是否为iPhone或者QQHD浏览器
    iPad: u.includes('iPad'), // 是否iPad
    webApp: !u.includes('Safari'), // 是否web应该程序，没有头部与底部
    weixin: u.includes('MicroMessenger'), // 是否微信
    qq: u.match(/\sQQ/i) === ' qq', // 是否QQ
  }
}

/**
 * 判断用户代理是否为 Mobile
 * @param {String} ua
 * @returns {Boolean}
 */
export const isMobile = (ua) => {
  return !!ua.match(/AppleWebKit.*Mobile.*/) // 是否为移动终端
}

// 获得当前页面类型
export const getTerminalPage = () => {
  const width = document.body.clientWidth
  const terminal = getTerminal()
  return width < viewFitConfig.viewThreshold || terminal.mobile
    ? 'mobile'
    : 'pc'
}

export const jsonStringify = (obj = {}) => {
  try {
    return JSON.stringify(obj)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`${obj} 使用jsonStringify 转化出错，请检查输入类型`)
  }
}

export const jsonParse = (string = '') => {
  try {
    return JSON.parse(string)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`${string} 使用jsonParse 转化出错，请检查输入类型`)
  }
}
/**
 * 将字符串首字母大写
 * @param { } str
 */
export const upperFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 查找上级是否有存在对应组件
 * @param {*} context
 * @param {*} componentName
 * @param {*} componentNames
 */
export const findComponentUpward = (context, componentName, componentNames) => {
  if (typeof componentName === 'string') {
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }
  let parent = context.$parent
  let name = parent.$options.name
  while (parent && (!name || !componentNames.includes(name))) {
    parent = parent.$parent
    if (parent) {
      name = parent.$options.name
    }
  }
  return parent
}

/**
 * 根据组件名称查找所有下级对应的组件(特定的层级关系，没法跨级查询)
 * @param {*} context
 * @param {*} componentName
 */
export const findComponentsDownward = (context, componentName) => {
  const array = []
  for (let i = 0; i < context.$children.length; i += 1) {
    if (context.$children[i].$options.name === componentName) {
      array.push(context.$children[i])
    }
  }
  return array
}
/**
 *  阻止页面滚动
 * @param {*} isFixed
 */
export const stopBodyScroll = () => {
  const bodyEl = document.body
  let top = 0
  return (isFixed) => {
    if (isFixed) {
      top = window.scrollY

      bodyEl.style.position = 'fixed'
      bodyEl.style.top = -top + 'px'
    } else {
      bodyEl.style.position = ''
      bodyEl.style.top = ''

      window.scrollTo(0, top) // 回到原先的top
    }
  }
}
/**
 * 判断是否为空
 * @param {*} value
 */
export const isEmpty = (value) => {
  const str = Object.prototype.toString.call(value)
  if (!value && str !== '[object Number]') {
    return false
  }
  if (
    value.toString() === '' ||
    value.toString() === '{}' ||
    value.toString() === 'null' ||
    value.toString() === 'undefined'
  ) {
    return true
  } else if (str === '[object Null]' || str === '[object Undefined]') {
    return true
  } else if (str === '[object Object]' && Object.keys(value).length === 0) {
    return true
  }
  return false
}
/**
 *  获取url链接上的参数
 * @param {*} name
 */
export const getQueryString = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  try {
    const r = location && location.search.substr(1).match(reg)
    if (r != null) {
      return unescape(r[2])
    }
    return null
  } catch (error) {
    return null
  }
}
/**
 * 设置锚点定位，滚动到目标元素上
 * @param {*} targetEle 目标位置
 * @param {*} scrollEle 滚动区域
 */
export const setAnchorPoint = (targetEle, scrollEle) => {
  let selector = null
  if (scrollEle) {
    selector = document.querySelector(scrollEle)
  } else {
    selector = window
  }
  if (document.querySelector(targetEle)) {
    const offsetTop = document.querySelector(targetEle).offsetTop
    selector.scrollTo({
      top: offsetTop - 10,
      behavior: 'smooth',
    })
  }
}
/**
 * 格式化时间
 * @param {*} date  时间
 * @param {*} fmt   时间格式
 */
export const dateFormat = (date, fmt) => {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (const k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}
/**
 * 复制内容到剪切板
 * @param {*} value
 */
export const clipBorad = (value) => {
  const input = document.createElement('input')
  // 防止手机上弹出软键盘
  input.setAttribute('readonly', 'readonly')
  input.setAttribute('value', value)
  document.body.appendChild(input)
  input.select()
  const res = document.execCommand('copy')
  document.body.removeChild(input)
  return res
}
