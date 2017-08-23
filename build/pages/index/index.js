require("./../../common.js");global.webpackJsonp([2],{

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends2 = __webpack_require__(15);

var _extends3 = _interopRequireDefault(_extends2);

var _connect = __webpack_require__(86);

var _connect2 = _interopRequireDefault(_connect);

var _carousel = __webpack_require__(190);

var _carousel2 = _interopRequireDefault(_carousel);

var _wx = __webpack_require__(64);

var _wx2 = _interopRequireDefault(_wx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var page = (0, _wx.mergeOptions)({
  onLoad: function onLoad(options) {}
}, _carousel2.default);

var mapState = function mapState(_ref) {
  var index = _ref.index;

  return (0, _extends3.default)({}, index);
};

var mapFunc = function mapFunc(dispatch) {
  return {
    click: function click() {}
  };
};

Page((0, _connect2.default)(mapState, mapFunc)(page));

/***/ })

},[189]);
//# sourceMappingURL=index.js.map