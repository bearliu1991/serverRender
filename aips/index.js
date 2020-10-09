// 用于集合管理各个页面的api
import home from './home'
import detail from './detail'
import common from './common'

export default {
  ...home,
  ...detail,
  ...common,
}
