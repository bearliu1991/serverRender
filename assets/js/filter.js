const toUpperCase = (value) => {
  if (!value) return ''
  value = value.toString()
  return value.toUpperCase()
}
// 获取第一个字符
const firstChar = (value) => {
  if (!value) return ''
  value = value.toString().substring(0, 1)
  return value.toUpperCase()
}
// 格式化币种 flag true 去除币种
const formatCurrency = (value, flag) => {
  const obj = {
    AU: {
      currencyCode: 'AUD',
      currency: '$',
    },
  }
  const shopId = process.env.shopId
  const price = (+value).toFixed(2)
  return ` ${
    flag
      ? ''
      : obj[shopId] && obj[shopId].currencyCode
      ? obj[shopId].currencyCode
      : ''
  } ${obj[shopId] && obj[shopId].currency ? obj[shopId].currency : ''}${price}`
}
const dateFormat = (time, fmt) => {
  const newTime = time.replaceAll('-', '/')
  const date = new Date(newTime)
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
export default {
  toUpperCase,
  firstChar,
  formatCurrency,
  dateFormat,
}
