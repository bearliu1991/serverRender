import createPersistedState from 'vuex-persistedstate'

export default ({ store, req, res, app: { $cookies } }) => {
  createPersistedState({
    storage: window.localStorage,
  })(store)
}
