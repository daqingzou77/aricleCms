
## 获取通用模块
```
$ git clone git@gitlab.com:fkj-project/fkj-front-common.git src/common
```

## 环境变量
dev为开发环境，prod为生产环境
```js
process.env.ENV:'dev'
process.env.ENV:'prod'
```
## 打包配置
```js
yarn build
```


>修改生产环境地图服务 host 只需修改 config.prod.js 中 process.env.MAP_HOST 的值即可，端口也一样。<br/>原 systemKey 已经配置进 config/config.j s里面，build 的时候 config/config.prod.js 会覆盖 config/config.js 文件<br>
>**注意**是覆盖而不是替换，config.prod.js 中没有的配置则会使用 config.js 中的配置。<br>
>具体请[点击此处环境变量](https://umijs.org/zh/guide/env-variables.html#%E5%A6%82%E4%BD%95%E9%85%8D%E7%BD%AE)查阅<br>
>[点击此处config配置](https://umijs.org/zh/config/#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE)查阅 config 相关配置
- 新增打包配置：
>在 config 文件夹下添加 config.xxx.js，模仿 config.prod 配置，在 package.js 里面加入与 build 相同的命令。<br>
```js
"build:xxx": "cross-env UMI_ENV=xxx umi build"
```
>执行 yarn build:xxx 即可 config.xxx.js 会覆盖 config.js<br/>
>打包完成之后 historicVersion 目录即可生成最新压缩包 LK-0200024@0.2.0.190629.zip


## 修改dev环境网络请求baseUrl
config/config.js  process.env.apiBaseUrl的值
