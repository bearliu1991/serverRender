const toUpperCase = (value) => {
  if (!value) return ''
  value = value.toString()
  return value.toUpperCase()
}
// 格式化币种
const formatCurrency = (value) => {
  const obj = {
    AU: '$',
  }
  const shopId = process.env.shopId
  return `AUD ${obj[shopId]}${value}`
}
export default {
  toUpperCase,
  formatCurrency,
}
