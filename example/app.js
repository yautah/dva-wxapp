import dva, { createLoading, createLogger } from 'dva-wxapp'
import extendModel from './models/common.js'
import globalModel from './models/global.js'
import wxp from './utils/wxp'


//初始化redux logger
//dva-loading的log太多了，忽略掉
//直接从logger的state中查看loading状态即可
//logger也可以考虑根据不用
const reduxLogger = createLogger({
  predicate: (getState, action) => action.type !== '@@DVA_LOADING/HIDE' && action.type !== '@@DVA_LOADING/SHOW',
  duration: true,
  collapsed: true,
  timestamp: true,
})

//创建app
const dvapp = dva.create(
  { initialReducer: {}, },
  {
    setupMiddlewares(middlewares) {
      return [ ...middlewares,reduxLogger ]
    },
  },
)

//开启 dva-loading
dvapp.use(createLoading({ effects: true }))

//注入common extend model
const _model = dvapp.model
dvapp.model = model => {
  const m = extendModel(model)
  return _model(m)
}

//加载global model，其他的model也可以从这里加载
//考虑到分包问题，也可以把model声明在不同的分包下，在合理的时候按需载入model
dvapp.model(globalModel)

//启动dva
dvapp.start()


App({
  ...dvapp,

  globalData: { },

  onLaunch: function() {
  },

})
