# cupshe_market

### 构建步骤

```bash
# 安装依赖包
$ npm install

# 运行项目并监听3001端口
$ npm run dev

# 服务端项目构建 -- to 开发
$ npm run build
$ npm run start

# 服务端项目构建、部署-- to 运维
在构建工具上
$ npm run install 安装依赖
$ npm run build 打包
打包结束后将所有文件进行压缩，上传至服务器

服务器上解压后执行
$ npm run start
```

### 关于部署
执行命令如下：
$ npm install
$ npm run build
$ npm run start

### 项目简介
cupsheMarket pc、m端代码，根据屏幕宽度以及终端类型自动切换。
技术栈介绍：
1、ssr：Nuxt.js
2、client: Vue全家桶
3、style： node-sass、element-ui 按需加载
4、代码规范：eslint + prettier
5、国际化：vue-i18n
5、动画插件
vue-awesome-swiper 轮播插件（根据需求可更换）

### 设计思路
css部分：
基于elementUi，封装cupsheUI
方式：
elementui 的主题修改，修改主题变量 /assets/style/element-variables.scss
全局覆盖重写样式 assets/style/element-reset.scss
组件独有样式 在各自组件内部修改

js部分：
service层 向服务器请求数据，单纯做请求，不包含业务逻辑
control层 业务逻辑、数据处理。按照业务场景调用service，进行数据交互
view层  数据显示/交互，触发数据交互

组件类型：
通用组件    不包含业务（如：按钮、弹框等）
业务组件    包含业务组件 （如：尺码弹框）
业务模块组件    由多个业务组件组成，具备完整的业务逻辑，如猜你喜欢模块，该等级组件原则上区分pc、m端，可以自动切换
页面    多个业务模块组件组成，ssr的入口

设计模式
提供了观察者模式的工具类使用，使用方法参照：assets/js/observer.js
使用场景：固定场景下的固定响应（如接口未登陆）， 很好实现进行代码解耦


### 关于自适应
根据屏幕宽度以及终端类型自动切换尺寸适应、组件
方案：rem + flexible 方式 通过 postcss-plugin-px2rem 插件将px自动转化为rem单位, 同时兼容通过js设置vw的方式
使用方法：
1、默认高保真屏幕宽度为750px，可配置；配置路径 `/assets/js/config.js`
2、设置vw： 对于style样式中的尺寸，通过 `$px2vw()` 方法进行转化（该方法已经挂载到原型上）

### 项目结构（以设计思路维度）
page 页面   页面中做ssr数据请求，业务模块组件拼装
serviceSSR  页面维度进行模块划分，用于ssr时的数据请求交互
components 安装页面维度进行一级文件夹划分
    页面名称
        业务模块名称    页面纯动画、交互逻辑，触发moduleMixin提供的方法实现数据交互
            index.vue  根据终端分配pc、m站的组件应用
            xxxPC.vue  pc端模块组件
            xxxM.vue   M端模块组件
            components  应用于模块的组件，可以是pc、M公用或者独有，独有时，组件名称后面标明应用的端，如 bannerM.vue
    common 与模块无关的公共组件，原则是无需区分终端，如果有需要，建议组件内部通过入参区分终端
moduleMixin 页面或业务模块维度划分，数据逻辑处理（control层），通过mixin方式混入到pc、m端，实现逻辑处理公用


### 文件引用别名
在nuxt.config.js 中访问绝对路径：
`～assets` -- assets
`～component` -- component
static文件夹下资源访问, 省略/static
`/font` -- /static/font

在vue文件中建议使用相对路径，如果要访问绝对路径，配置方式如下：
nuxt.config.js  build选项中
```
config.resolve.alias['@moduleMixin'] = path.resolve(
                __dirname,
                'moduleMixin'
            )
// 使用时 import '@moduleMixin/...'
```

### 关于调试
#### 接口联调
接口域名配置：/env.js
接口代理配置：nuxt.config.js  proxy配置项

#### 调试存在的问题
- 服务端调试在新版`nuxt`中可以通过`console.log()`来打印接口返回的结果，绝大部分调试适用
![](http://yun.china2018.vip/iShot2020-08-02%E4%B8%8B%E5%8D%8804.33.42.png)
![控制台调试](http://yun.china2018.vip/iShot2020-08-02%E4%B8%8B%E5%8D%8804.26.58.png)

- 图中标红的对象数组则无法知道具体的内容，对于这种情况，采用debugger调试来规避
![debugger调试](http://yun.china2018.vip/iShot2020-08-02%E4%B8%8B%E5%8D%8804.40.24.png)

- 关于`vscode`的`debugger`调试的配置
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "nuxt Dev",
            "type": "node",
            "request": "launch",
            "protocol": "inspector",
            "program": "${workspaceRoot}/node_modules/.bin/nuxt",
            "stopOnEntry": false,
            "args": [
                "dev"
            ],
            "cwd": "${workspaceRoot}",
            "sourceMaps": true,
            "env": {
                "MODE": "dev",
                "DEBUG": "nuxt:*,app"
            }
        }
    ]
}
```


### 以下暂时不需要使用
$ npm run dev:update   更新cupsheUi库并启动项目
$ npm run updateUi:dev 更新cupsheUi库 开发环境，可自行指定分支


## 需要做的事情
1、字体资源阻塞问题，首屏加载时间长
2、页面动画插件

