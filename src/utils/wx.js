import connect from './connect.js';

// 特别指定的wx对象中不进行Promise封装的方法
const noPromiseMethods = {
  clearStorage: 1,
  hideToast: 1,
  showNavigationBarLoading: 1,
  hideNavigationBarLoading: 1,
  drawCanvas: 1,
  canvasToTempFilePath: 1,
  hideKeyboard: 1
};

/* globals wx, getApp, getCurrentPages */
const weex = {
  // 原始wx对象
  wx,
  // getApp() 优雅的封装
  get app() {
    return getApp();
  },

  // getCurrentPages() 优雅的封装
  get currentPages() {
    return getCurrentPages();
  }
};

Object.keys(wx).forEach((key) => {
  if (
    noPromiseMethods[key]                        // 特别指定的方法
    || /^(on|create|stop|pause|close)/.test(key) // 以on* create* stop* pause* close* 开头的方法
    || /\w+Sync$/.test(key)                      // 以Sync结尾的方法
  ) {
    // 不进行Promise封装
    weex[key] = (...args) => wx[key](...args);
    return;
  }

  // 其余方法自动Promise化
  weex[key] = (options = {}) => {
    return new Promise((resolve, reject) => {
      Object.assign(options, {
        success(...args) {
          resolve(...args);
        },
        fail(err) {
          if (err && err.errMsg) {
            reject(err.errMsg);
          } else {
            reject(err);
          }
        }
      });
      wx[key](options);
    });
  };
});

const strats = {};
/**
 * Data
 */

strats.data = function data(target, source) {
  return Object.assign(target, source);
};

function mergeHook(target, source) {
  if (typeof source === 'function') {
    if (typeof target === 'function') {
      return function mergedFuncion() {
        source.call(this);
        target.call(this);
      };
    }
    return source;
  }
  return target;
}

['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload']
.forEach((hook) => {
  strats[hook] = mergeHook;
});

/**
 * Default strategy.
 */
function defaultStrat(target, source) {
  return source === undefined
    ? target
    : source;
}

function mergeOptions(target, ...args) {
  const hasOwn = Object.prototype.hasOwnProperty;
  if (target) {
    args.forEach((source) => {
      if (source) {
        for (const key in source) {
          if (hasOwn.call(source, key)) {
            const strat = strats[key] || defaultStrat;
            if (key==='data' && target[key]==undefined) {
              target[key] = {};
            }
            target[key] = strat(target[key], source[key], key);
          }
        }
      }
    });
  }
  return target;
}

export {
  mergeOptions,
  connect,
};

export default weex;
