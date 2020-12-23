export default function ({
  store,
  route,
  redirect,
  req,
  app: { $cookies, $api },
}) {
  // If the user is not authenticated
  const token = $cookies.get('token')
  if (!token) {
    store.commit('SET_USERINFO', null)
  } else {
    store.dispatch('getUserInfo')
  }
}
