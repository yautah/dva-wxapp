import api from '../utils/api/api.js';
import wx from '../utils/wx.js';
import { isEmpty } from 'lodash';

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
    *queryWeather(action, { call, put }) {
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

    *onTapCarousel(action, { select }) {
      console.log(action);
      const { pic } = action.payload;
      const { carousel } = yield select(state => state.index);
      const pics = carousel.images.map(img => img.imgUrl);
      wx.previewImage({
        current: pic.imgUrl, // 当前显示图片的http链接
        urls: pics,// 需要预览的图片http链接列表
      });
    },

    *watchLocation(action, { put, take, select, takeEvery }) {
      let { location } = yield select(state => state.app );
      if (!location) {
        yield takeEvery('app/getLocationSuccess', function* (action1) {
            location = action1.payload;
            yield put({ type: 'getLocationSuccess', payload: { location } });
        });
      } else {
        yield put({ type: 'getLocationSuccess', payload: { location } });
      }
    },

    *watchLogin(action, { call, put, take, select, takeEvery }) {
      let { userInfo } = yield select(state => state.app );

      if (isEmpty(userInfo)) {
        const action1 = yield take('app/getUserInfoSuccess');
        userInfo = action1.payload.userInfo;
      }
      yield put({ type: 'getUserInfoSuccess', payload: { userInfo } });

    }
  },

  subscriptions: {
    //监控获取用户信息
    setup({ dispatch }) {
      dispatch({ type: 'watchLogin' });
    },

    //监控位置变化
    watchLocation({ dispatch }) {
      dispatch({ type: 'watchLocation' });
    }
  }
}
