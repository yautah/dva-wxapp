import api from '../utils/api/api.js';
import wx from '../utils/wx.js';

export default {
  namespace: 'index',

  state: {
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

    *watchLocation(payload, { put, take, select }) {
      let location;
      location = yield select(state => state.app.location );
      if (!location) {
        yield take('app/getLocationSuccess');
        location = yield select(state => state.app.location );
      }
      yield put({ type: 'getLocationSuccess', payload: { location } });
    }
  },

  subscriptions: {
    watchLocation({ dispatch }) {
      dispatch({ type: 'watchLocation' });
    }
  }
}
