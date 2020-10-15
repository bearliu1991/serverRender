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