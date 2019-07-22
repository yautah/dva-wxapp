# dva-wxapp

小程序开发中使用dva，[dva](https://github.com/dvajs/dva)

> 使用此组件需要依赖小程序基础库 2.2.1 以上版本，同时依赖开发者工具的 npm 构建。具体详情可查阅[官方 npm 文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)。

## 安装

```bash
npm install --save dva-wxapp
```


## 开始使用

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
// global.js
export default {
  namespace: 'global',

  state: {
    location: null
  },

  subscriptions: {
    init({ dispatch }) {
      dispatch({type: 'getLocation'})
    },
  },

  reducers: {},

  effects: {
    *getLocation(_, {call, put}){
      try {
        const res = yield call(wxp.getLocation)
        yield put({type: '@@locationSuccess', payload: {location: res}})
        yield put({type: 'updateState', payload: {location: res}})
      } catch (e) {
        console.error(e)
        yield put({type: '@@locationFailed'})
      }
    }
  },
}
```

#### 在合适的位置载入model

> 譬如在dva start之前
```js
import global from 'global.js'

getApp().model(global)

//启动dva
dvapp.start()
```

> 考虑到分包加载的问题，你也可以选择把model分布到各个分包, 在page初始化前载入model，例如
```js
import global from 'global.js'
getApp().model(global)
Page({
 ....
})
```

### connect model 到页面

> 熟悉的connect， 熟悉的味道
```js
//index.js
import { connect, createSelector } from 'dva-wxapp'
import wxp from '../../utils/wxp'

//使用 reselect 创建 selector
const getLocationTxt = createSelector(
  (store) => store.global.location,
  (location) => {
    return location ?  `${location.latitude} , ${location.longitude}` : ''
  }
)

const mapState = (store) => {
  return {
    location: store.global.location,
    locating: store.loading.effects['global/getLocation'],
    locationTxt : getLocationTxt(store)
  }
}

Page(
  connect(mapState)({
    data: {
    },


    onLoad: function() {
    },

    handleTap(){
      this.dispatch({type:'global/getLocation'})
    }

  }),
)
```



## 一些issule

1. 使用此组件需要依赖小程序基础库 2.2.1 以上版本，同时依赖开发者工具的 npm 构建。项目设置中请打开“增强编译”选项，redux-saga依赖regeneratorRuntime, 需要增强编译的支持。

2. dva在app中初始化后，请务必解构赋值到App中，如：
```js
App({
  ...dvapp,

  globalData: { },

  onLaunch: function() {
  },
})
```

3. 项目中同时内置了 redux-logger, dva-loading, reselect等lib， 代码不大，方便使用，具体请见example。



## 感谢以下项目

- [dva-core](https://github.com/dvajs/dva-core)
- [dva](https://github.com/dvajs/dva)



## License

MIT
