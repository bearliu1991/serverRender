const needLogins = ['personal', '/personal/orderList', 'personal/orderDetail']
export default function ({
  store,
  route,
  redirect,
  req,
  app: { $cookies, $api, router },
}) {
  router.afterEach((to, from, next) => {
    console.log(to, from)
    const token = $cookies.get('token')
    if (needLogins.includes[to.name] && !token) {
      redirect('/')
    } else {
      next()
    }
  })
}
