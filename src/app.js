import * as core from 'dva-core';
import createLogger from 'redux-logger';

import models from './models/models.js';

//创建app
const dvapp = core.create({
  initialReducer: {}
},{
  setupMiddlewares(middlewares) {
    return [
      ...middlewares,
      createLogger({
        duration: true,
        collapsed: true,
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

//初始化App()
const config = {
  ...dvapp,

  onLaunch() {
    dvapp._store.dispatch({ type: 'app/init' });
  },
};

App(config);


