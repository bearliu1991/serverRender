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

# 构建静态项目 -- to 开发
$ npm run generate


# 服务端项目构建、部署-- to 运维
在构建工具上
$ npm run install 安装依赖
$ npm run build 打包
打包结束后将所有文件进行压缩，上传至服务器

服务器上解压后执行
$ npm run start
```
### 文件结构
page 页面级组件
    页面中做ssr数据请求，业务模块组件拼装

components 安装页面维度进行一级文件夹划分
    页面名称
        业务模块名称
            index.vue  根据终端分配pc、m站的组件应用
            xxxPC.vue  pc端模块组件
            xxxM.vue   M端模块组件
            components  应用于模块的组件，可以是pc、M公用或者独有，独有时，组件名称后面标明应用的端，如 bannerM.vue
    common 与模块无关的公共组件，原则是无需区分终端，如果有需要，建议组件内部通过入参区分终端


### 关于移动端自适应
方案：viewport方式 通过 postcss-px-to-viewport 插件将px自动转化为vw单位
使用方法：
1、默认高保真屏幕宽度为750px，可配置；配置路径 `/assets/js/config.js`
2、对于style样式中的尺寸，通过 `$px2vw()` 方法进行转化（该方法已经挂载到原型上）

### 文件引用别名
`～assets` -- assets
`～component` -- component
static文件夹下资源访问, 省略/static
`/font` -- /static/font

### 关于调试
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
