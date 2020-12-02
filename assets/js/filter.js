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
    AU: '$',
  }
  const shopId = process.env.shopId
  return ` ${flag ? '' : 'AUD'} ${obj[shopId]}${value}`
}
export default {
  toUpperCase,
  firstChar,
  formatCurrency,
}
