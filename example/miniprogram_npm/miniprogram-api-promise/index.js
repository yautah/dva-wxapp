module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1563773671212, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./promise');Object.defineProperty(exports, 'promisify', { enumerable: true, configurable: true, get: function() { return __TEMP__.promisify; } });Object.defineProperty(exports, 'promisifyAll', { enumerable: true, configurable: true, get: function() { return __TEMP__.promisifyAll; } });

}, function(modId) {var map = {"./promise":1563773671213}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1563773671213, function(require, module, exports) {
var __TEMP__ = require('./method');var asyncMethods = __TEMP__['asyncMethods'];

function hasCallback(args) {
  if (!args || typeof args !== 'object') return false

  const callback = ['success', 'fail', 'complete']
  for (const m of callback) {
    if (typeof args[m] === 'function') return true
  }
  return false
}

function _promisify(func) {
  if (typeof func !== 'function') return fn
  return (args = {}) =>
    new Promise((resolve, reject) => {
      func(
        Object.assign(args, {
          success: resolve,
          fail: reject
        })
      )
    })
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.promisifyAll = function promisifyAll(wx = {}, wxp = {}) {
  Object.keys(wx).forEach(key => {
    const fn = wx[key]
    if (typeof fn === 'function' && asyncMethods.indexOf(key) >= 0) {
      wxp[key] = args => {
        if (hasCallback(args)) {
          fn(args)
        } else {
          return _promisify(fn)(args)
        }
      }
    } else {
      wxp[key] = fn
    }
  })
};

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var promisify = exports.promisify = _promisify;
}, function(modId) { var map = {"./method":1563773671214}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1563773671214, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var asyncMethods = exports.asyncMethods = [
  'canvasGetImageData',
  'canvasPutImageData',
  'canvasToTempFilePath',
  'setEnableDebug',
  'startAccelerometer',
  'stopAccelerometer',
  'getBatteryInfo',
  'getClipboardData',
  'setClipboardData',
  'startCompass',
  'stopCompass',
  'addPhoneContact',
  'startGyroscope',
  'stopGyroscope',
  'startBeaconDiscovery',
  'stopBeaconDiscovery',
  'getBeacons',
  'startLocalServiceDiscovery',
  'stopLocalServiceDiscovery',
  'startDeviceMotionListening',
  'stopDeviceMotionListening',
  'getNetworkType',
  'makePhoneCall',
  'scanCode',
  'getSystemInfo',
  'vibrateShort',
  'vibrateLong',
  'getExtConfig',
  'chooseLocation',
  'getLocation',
  'openLocation',
  'chooseMessageFile',
  'loadFontFace',
  'chooseImage',
  'previewImage',
  'getImageInfo',
  'saveImageToPhotosAlbum',
  'compressImage',
  'chooseVideo',
  'saveVideoToPhotosAlbum',
  'downloadFile',
  'request',
  'connectSocket',
  'closeSocket',
  'sendSocketMessage',
  'uploadFile',
  'login',
  'checkSession',
  'chooseAddress',
  'authorize',
  'addCard',
  'openCard',
  'chooseInvoice',
  'chooseInvoiceTitle',
  'getUserInfo',
  'requestPayment',
  'getWeRunData',
  'showModal',
  'showToast',
  'hideToast',
  'showLoading',
  'hideLoading',
  'showActionSheet',
  'pageScrollTo',
  'startPullDownRefresh',
  'stopPullDownRefresh',
  'setBackgroundColor',
  'setBackgroundTextStyle',
  'setTabBarBadge',
  'removeTabBarBadge',
  'showTabBarRedDot',
  'hideTabBarRedDot',
  'showTabBar',
  'hideTabBar',
  'setTabBarStyle',
  'setTabBarItem',
  'setTopBarText',
  'saveFile',
  'openDocument',
  'getSavedFileList',
  'getSavedFileInfo',
  'removeSavedFile',
  'getFileInfo',
  'getStorage',
  'setStorage',
  'removeStorage',
  'clearStorage',
  'getStorageInfo',
  'closeBLEConnection',
  'closeBluetoothAdapter',
  'createBLEConnection',
  'getBLEDeviceCharacteristics',
  'getBLEDeviceServices',
  'getBluetoothAdapterState',
  'getBluetoothDevices',
  'getConnectedBluetoothDevices',
  'notifyBLECharacteristicValueChange',
  'openBluetoothAdapter',
  'readBLECharacteristicValue',
  'startBluetoothDevicesDiscovery',
  'stopBluetoothDevicesDiscovery',
  'writeBLECharacteristicValue',
  'getHCEState',
  'sendHCEMessage',
  'startHCE',
  'stopHCE',
  'getScreenBrightness',
  'setKeepScreenOn',
  'setScreenBrightness',
  'connectWifi',
  'getConnectedWifi',
  'getWifiList',
  'setWifiList',
  'startWifi',
  'stopWifi',
  'getBackgroundAudioPlayerState',
  'playBackgroundAudio',
  'pauseBackgroundAudio',
  'seekBackgroundAudio',
  'stopBackgroundAudio',
  'getAvailableAudioSources',
  'startRecord',
  'stopRecord',
  'setInnerAudioOption',
  'playVoice',
  'pauseVoice',
  'stopVoice',
  'getSetting',
  'openSetting',
  'getShareInfo',
  'hideShareMenu',
  'showShareMenu',
  'updateShareMenu',
  'checkIsSoterEnrolledInDevice',
  'checkIsSupportSoterAuthentication',
  'startSoterAuthentication',
  'navigateBackMiniProgram',
  'navigateToMiniProgram',
  'setNavigationBarTitle',
  'showNavigationBarLoading',
  'hideNavigationBarLoading',
  'setNavigationBarColor',
  'redirectTo',
  'reLaunch',
  'navigateTo',
  'switchTab',
  'navigateBack'
];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1563773671212);
})()
//# sourceMappingURL=index.js.map