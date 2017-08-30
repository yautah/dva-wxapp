import wx from '../utils/wx.js';

export default {
  namespace: 'app',

  state: {
  },

  reducers: {
    getSysInfoSuccess(state, action) {
      const sysInfo = action.payload;
      return { ...state, sysInfo };
    },
    getLocationSuccess(state, action) {
      const location = action.payload;
      return { ...state, location };
    },
    getUserInfoSuccess(state, action) {
      const { userInfo } = action.payload;
      return { ...state, userInfo };
    }
  },

  effects: {
    *getSysInfo(action, { call, put }) {
      const sysInfo = yield call(wx.getSystemInfo);
      yield put({ type: 'getSysInfoSuccess', payload: sysInfo })
    },

    *getLocation(action, { call, put }) {
      try {
        const location = yield call(wx.getLocation);
        yield put({ type: 'getLocationSuccess', payload: location })
      } catch (e) {
        console.log(e);
      }
    },

    *getUserInfo(action, { call, put }) {
      let userInfo;

      try {
        yield call(wx.checkSession);
        const data = yield call(wx.getStorage, { key: 'userInfo' });
        userInfo = data.data;
        console.log('userInfo from local ------ ', userInfo)
      } catch (e) {
        /* handle error */
        yield call(wx.login);
        const res  = yield call(wx.getUserInfo);
        userInfo = res.userInfo;
        console.log('userInfo from weixin ----- ', userInfo)
        yield call(wx.setStorage, { key: 'userInfo', data: userInfo });
      }

      if (userInfo) {
        yield put({ type: 'getUserInfoSuccess', payload: { userInfo } });
      }
    }
 },

};
