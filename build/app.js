require("./common.js");global.webpackJsonp([1],{

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends2 = __webpack_require__(15);

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = __webpack_require__(39);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _dvaCore = __webpack_require__(137);

var core = _interopRequireWildcard(_dvaCore);

var _reduxLogger = __webpack_require__(180);

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _models = __webpack_require__(185);

var _models2 = _interopRequireDefault(_models);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//创建app
var dvapp = core.create({
  initialReducer: {}
}, {
  setupMiddlewares: function setupMiddlewares(middlewares) {
    return [].concat((0, _toConsumableArray3.default)(middlewares), [(0, _reduxLogger2.default)({
      timestamp: true
    })]);
  }
});

//加载model
_models2.default.forEach(function (model) {
  dvapp.model(model);
});

//启动app
dvapp.start();
console.log('dva init success');

//初始化App()
var config = (0, _extends3.default)({}, dvapp, {
  onLaunch: function onLaunch() {
    dvapp._store.dispatch({ type: 'app/getSysInfo' });
  }
});
App(config);

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(88);
__webpack_require__(91);
module.exports = __webpack_require__(130);


/***/ }),

/***/ 90:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[87]);
//# sourceMappingURL=app.js.map