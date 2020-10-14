import path from 'path'
import env from './assets/env'
import { px2remConfig } from './assets/js/config'

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Nuxt Server host & port
   */
  server: {
    port: 3001,
    host: '127.0.0.1',
  },
  env: {
    baseUrl: env[process.env.MODE].API_URL,
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
        content: 'width=device-width, initial-scale=1',
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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//at.alicdn.com/t/font_1979118_k0zkj19914.css'}
    ],
  },
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/style/hoverAnimation.scss',
    'swiper/swiper-bundle.css',
    '~/assets/style/reset.scss',
    '~/assets/style/common.scss',
  ],
  styleResources: {
    scss: [
      '~/assets/style/variable.scss', // 全局变量
      '~/assets/style/mixins.scss', // 全局混合
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
    '~/plugins/elementUi.js',
    '~/plugins/filters.js',
    '~/plugins/px2vw.js',
    { src: '~/plugins/serverIndex.js', mode: 'server' },
    { src: '~/plugins/clientIndex.js', mode: 'client' },
    { src: '~/plugins/vueAwesomeSwiper.js', mode: 'client' },
    { src: '~/static/font/iconfont.js', mode: 'client' },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: [
    '~/components',
    {
      path: '~/pages/product/viewModules',
      extensions: ['vue'],
    },
    // {
    //   path: '~/components/index/productInfo',
    //   prefix: 'IndexProductInfo',
    //   // extensions: [''],
    // },
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
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
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
  proxy: {
    '/proxy': {
      target: env[process.env.MODE].API_URL, // 目标接口域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/proxy': '/', // 把 /api 替换成 /
      },
    },
    '/test': {
      target: env[process.env.MODE].API_URL, // 目标接口域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/test': '/', // 把 /test 替换成 /
      },
    },
    '/api': {
      // 测试用，联调实际接口时请删除
      target: env[process.env.MODE].API_URL, // 目标接口域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/api': '/', // 把 /api 替换成 /
      },
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    vendor: ['axios'], // 防止重复打包
    devtools: true,
    extend(config, { isClient }) {
      // 为 客户端打包 进行扩展配置
      if (isClient) {
        config.devtool = 'eval-source-map'
        const rules = config.module.rules
        rules.push({
          test: /\.(vue|jsx)$/,
          loader: 'style-vw-loader',
          options: {}, // 默认是适应750px的设计稿的
        })
      }
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
      autoprefixer: {
        browsers: ['Android >= 4.0', 'iOS >= 8'],
      },
      plugins: [
        // require('postcss-plugin-px2rem')(px2remConfig),
        // require('postcss-px-to-viewport')(px2vwConfig),
      ],
    },
  },
}
