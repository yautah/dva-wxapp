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
 },

};
