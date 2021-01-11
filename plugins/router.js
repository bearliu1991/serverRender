const needLogins = [
  '/personal',
  '/personal/orderList',
  'personal/orderDetail',
  '/personal/address',
]
export default function ({
  store,
  route,
  redirect,
  req,
  app,
  app: { $cookies, router },
}) {
  if (!process.server) {
    router.beforeEach((to, from, next) => {
      if (to.path.includes('customer/login') && from.path !== to.path) {
        // 保存上一页utl
        store.commit('SET_PAGE_URL', from.fullPath)
      }
      // store.dispatch('queryLoginStatus')

      app.$api.customer.queryLoginStatus().then((result) => {
        if (result && result.loginStatus === 1) {
          store.commit('SET_LOGIN_STATUS', true)
          store.dispatch('getUserInfo')
        } else {
          store.commit('SET_USERINFO', null)
          // 未登录
          store.commit('SET_LOGIN_STATUS', false)
        }
      })
      const token = $cookies.get('token')
      if (needLogins.includes(to.path) && !token) {
        redirect('/')
      } else {
        next()
      }
    })
  }
}
