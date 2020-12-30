import path from 'path'
import env from './env'

export default {
  loading: false,
  router: {
    // middleware: 'authenticated',
    routeNameSplitter: '/',
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'scanIndex',
        path: '/scanIndex',
        component: resolve(__dirname, 'pages/index.vue'),
      })
    },
  },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-targetF
   */
  target: 'server',
  /*
   ** Nuxt Server host & port
   */
  server: {
    port: 3001,
    host: 'dev.kapeixi.cn', //localhost
  },
  env: {
    MODE: process.env.MODE,
    shopId: process.env.shopId,
    // 设置服务器url
    baseUrl: env[process.env.MODE].apiDomain,
    tempUrl: env[process.env.MODE].apiDomain,
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1 user-scalable=no',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    script: [
      {
        src: '/js/flexible.js', // 如果在client加载，会造成适配延时，影响用户体验
        type: 'text/javascript',
        charset: 'utf-8',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/style/hoverAnimation.scss',
    'swiper/css/swiper.css',
    '~/assets/style/reset.scss',
    '~/assets/style/common.scss',
  ],
  styleResources: {
    scss: [
      '~/assets/style/variable.scss', // 全局变量
      '~/assets/style/mixins.scss', // 全局混合
      '~/assets/style/function.scss', // 全局混合
    ],
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/axios.js',
    '~/plugins/http.js',
    '~/plugins/api.js',
    '~/plugins/elementUi.js',
    '~/plugins/filters.js',
    // '~/plugins/px2vw.js',
    { src: '~/plugins/mixins.js' },
    { src: '~/plugins/localStorage.js', mode: 'client', ssr: false },
    { src: '~/plugins/alert.js', mode: 'client', ssr: false },
    { src: '~/plugins/toast.js', mode: 'client', ssr: false },
    { src: '~/plugins/serverIndex.js', mode: 'server' },
    { src: '~/plugins/clientIndex.js', mode: 'client' },
    { src: '~/plugins/vueAwesomeSwiper.js', mode: 'client', ssr: false },
    { src: '~/static/font/iconfont.js', mode: 'client' },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: [
    '~/components',
    {
      path: '~/pages/common/viewModules',
      extensions: ['vue'],
    },
    {
      path: '~/pages/product/viewModules',
      extensions: ['vue'],
    },
    {
      path: '~/pages/cart/viewModules',
      extensions: ['vue'],
    },
    {
      path: '~/pages/orderConfirm/viewModules',
      extensions: ['vue'],
    },
    {
      path: '~/pages/payment/viewModules',
      extensions: ['vue'],
    },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    credentials: true, // 跨域请求时使用凭证
  },
  proxy: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    vendor: ['axios', '@adyen/adyen-web'], // 防止重复打包
    devtools: true,
    extend(config, { isClient }) {
      // 为 客户端打包 进行扩展配置
      // if (isClient) {
      //   config.devtool = 'eval-source-map'
      //   const rules = config.module.rules
      //   rules.push({
      //     test: /\.(vue|jsx)$/,
      //     loader: 'style-vw-loader',
      //     options: {}, // 默认是适应750px的设计稿的
      //   })
      // }
      config.resolve.alias['@moduleMixin'] = path.resolve(
        __dirname,
        'moduleMixin'
      )
      config.resolve.alias['@assets'] = path.resolve(__dirname, 'assets')
    },
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk',
          },
        ],
      ],
      comments: true,
    },
    postcss: {
      plugins: [require('postcss-px2rem')({ remUnit: 100 })],
      preset: {
        autoprefixer: {
          overrideBrowserslist: ['Android >= 4.0', 'iOS >= 8'],
        },
      },
    },
  },
}
