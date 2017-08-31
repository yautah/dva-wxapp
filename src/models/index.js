import api from '../utils/api/api.js';
import wx from '../utils/wx.js';
import { isEmpty } from 'lodash';

export default {
  namespace: 'index',

  state: {
    markers: [{
      iconPath: "/resources/others.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    weather: {},
    title: 'hello world',
    carousel: {
      indicatorDots: true,  //显示面板指示点
      autoplay: true,     //自动切换
      interval: 2000,    //自动切换时间间隔
      duration: 1000,    //滑动动画时长
      height: 200,
      images: [{
        imgUrl: "http://imgcdnali.ylallinone.com/pcImg/2017-05-03/14937842648526.jpg",
      }, {
        imgUrl: "http://imgcdnali.ylallinone.com/pcImg/2017-05-03/14937842684646.jpg",
      }, {
        imgUrl: "http://imgcdnali.ylallinone.com/pcImg/2017-05-03/14937842759450.jpg",
      }],
    },
    width: 750,

  },

  reducers: {
    queryWeatherSuccess(state, action) {
      const { weather } = action.payload;
      return {
        ...state,
        weather,
      };
    },

    getLocationSuccess(state, action) {
      const { location } = action.payload;
      return {
        ...state,
        location,
      };
    },

    getUserInfoSuccess(state, action) {
      const { userInfo } = action.payload;
      return {
        ...state,
        userInfo,
      };
    }
  },

  effects: {
    *queryWeather(payload, { call, put }) {
      wx.showLoading({ title: '获取天气中' });
      try {
        const weather = yield call(api.queryWeather);
        wx.hideLoading();
        yield put({ type: 'queryWeatherSuccess', payload: { weather } });
      } catch (e) {
        /* handle error */
        wx.hideLoading();
        console.log('weather error', e);
      }
    },

    *watchLocation(payload, { put, take, select, takeEvery }) {
      let { location } = yield select(state => state.app );
      if (!location) {
        yield takeEvery('app/getLocationSuccess', function* (action) {
            location = action.payload;
            yield put({ type: 'getLocationSuccess', payload: { location } });
        });
      } else {
        yield put({ type: 'getLocationSuccess', payload: { location } });
      }
    },

    *watchLogin(payload, { call, put, take, select, takeEvery }) {
      let { userInfo } = yield select(state => state.app );
      // if (!userInfo) {
      // yield takeEvery('app/getUserInfoSuccess', function*(action) {
      // userInfo = action.payload.userInfo;
      // yield put({ type: 'getUserInfoSuccess', payload: { userInfo } });
      // });
      // } else {
      // yield put({ type: 'getUserInfoSuccess', payload: { userInfo } });
      // }

      if (isEmpty(userInfo)) {
        const action = yield take('app/getUserInfoSuccess');
        userInfo = action.payload.userInfo;
      }
      yield put({ type: 'getUserInfoSuccess', payload: { userInfo } });

    }
  },

  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'watchLogin' });
    },

    watchLocation({ dispatch }) {
      dispatch({ type: 'watchLocation' });
    }
  }
}
