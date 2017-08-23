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


