<template>
  <div class="cs-login-container">
    <component :is="componentId"></component>
  </div>
</template>
<script>
import Login from './viewModules/login'
import Register from './viewModules/register'
import Reset from './viewModules/forgetPassword.vue'
// 用户登录 注册  忘记密码页面
export default {
  components: {
    Login,
    Register,
    Reset,
  },
  data() {
    return {
      componentId: 'Login',
    }
  },
  validate({ params }) {
    const { userPage } = params
    if (
      userPage === 'login' ||
      userPage === 'register' ||
      userPage === 'reset'
    ) {
      return true
    }
    return false
  },
  created() {
    const { userPage } = this.$route.params
    const [first, ...rest] = userPage.split('')
    const componentName = first.toUpperCase() + rest.join('')
    this.componentId = componentName
  },
}
</script>
