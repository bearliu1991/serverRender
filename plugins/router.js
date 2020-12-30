const needLogins = [
  '/personal',
  '/personal/orderList',
  'personal/orderDetail',
  '/personal/address',
  '/payment/result',
]
export default function ({
  store,
  route,
  redirect,
  req,
  app: { $cookies, $api, router },
}) {
  if (!process.server) {
    router.beforeEach((to, from, next) => {
      if (to.path.includes('customer/login') && from.path !== to.path) {
        // 保存上一页utl
        store.commit('SET_PAGE_URL', from.fullPath)
      }
      const token = $cookies.get('token')
      if (needLogins.includes(to.path) && !token) {
        redirect('/')
      } else {
        next()
      }
    })
  }
}
