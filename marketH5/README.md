# cupshe_market

### 构建步骤

```bash
# 安装依赖包
$ npm install

# 运行项目并监听3001端口
$ npm run dev

# 服务端项目构建
$ npm run build
$ npm run start

# 构建静态项目
$ npm run generate
```
### 文件结构

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
