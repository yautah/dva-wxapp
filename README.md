# dva-wxapp

小程序开发中使用dva，[dva](https://github.com/dvajs/dva)

> 使用此组件需要依赖小程序基础库 2.2.1 以上版本，同时依赖开发者工具的 npm 构建。具体详情可查阅[官方 npm 文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)。

## 安装

```bash
npm install --save dva-wxapp
```


## 使用

### 在app.js中初始化 DVA

```js
import dva, { createLoading, createLogger } from 'dva-wxapp'


//创建app
const dvapp = dva.create({ initialReducer: {} })

//开启 dva-loading
dvapp.use(createLoading({ effects: true }))

//启动dva
dvapp.start()

App({
  ...dvapp,

  globalData: { },

  onLaunch: function() {
  },
})

```

### 编写并加载 model

```js
// user.js
export default {
  namespace: 'user',
  state: {},
  reducers: {},
  effects: {},
}
```

#### 在合适的位置载入model

> 譬如在dva start之前
```js
import user from 'user.js'

getApp().model(user)

//启动dva
dvapp.start()
```

> 考虑到分包加载的问题，你也可以选择把model分布到各个分包, 在page初始化前载入model，例如
```js
import user from 'user.js'
getApp().model(user)
Page({
 ....
})
```





## 开始使用

确保安装了 [Node.js](https://nodejs.org/) (>= `v4.2`) 

1. `git clone` 此项目
2. 通过命令行工具 `cd` 到这个目录，执行 `npm install` 安装依赖模块
3. 执行 `npm start` 开始开发(webpack会自动监控src内代码变化并实时编译至build目录)。
4. 通过微信开发者工具，添加 `build` 目录到项目上进行预览。
5. 开发完成后，执行 `npm run build`进行编译，打开微信开发者工具，添加`dist`目录到项目上进行上传。


## 一些issule

1. loader 无法支持`app.json` 上的 `tabBar.list.iconPath` 和 `tabBar.list.selectedIconPath` 文件，因此索性使用webpack-copy-plugin直接拷贝整个images目录到输出目录，图片请全部存放至/src/images目录。
2. 不要使用全局的getApp(),wx等方法及变量。微信的全局方法和变量已经封装至/src/utils/wx.js。
```js
 import wx from 'utils/wx.js';
 ...
 //替代getApp();
 const app = wx.app; 
  ...
 //微信的所有异步api已经封装成promise返回，请不要再使用微信api中的同步阻塞方法
 wx.request({}).then(res => {}).catch(err => {});
 
```
3. app.js中已经初始化了dva app，所有的model请存放至src/models目录中。
```js
 // src/models/models.js
import app from './app.js';
import index from './index.js';

export default [
  app,
  index
];
 ...

```

```js
//src/app.js

import models from './models/models.js';

//创建app
const dvapp = core.create({
  initialReducer: {}
},{
  setupMiddlewares(middlewares) {
    return [
      ...middlewares,
      createLogger({
        timestamp: true,
      }),
    ];
  }
});

//加载model
models.forEach(model => {
  dvapp.model(model);
});

//启动app
dvapp.start();
console.log('dva init success');

//初始化App()
const config = {
  ...dvapp,

  onLaunch() {
    dvapp._store.dispatch({ type: 'app/getSysInfo' });
  },
};

App(config);
```

## 感谢以下项目

- [wxml-loader](https://github.com/Cap32/wxml-loader)
- [wxapp-webpack-plugin](https://github.com/Cap32/wxapp-webpack-plugin)
- [wxapp-boilerplate](https://github.com/cantonjs/wxapp-boilerplate)
- [dva-core](https://github.com/dvajs/dva-core)
- [dva](https://github.com/dvajs/dva)



## License

MIT
