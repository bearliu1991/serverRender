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
      const token = $cookies.get('token')
      if (needLogins.includes(to.path) && !token) {
        // redirect('/')
        next()
      } else {
        next()
      }
    })
  }
}
