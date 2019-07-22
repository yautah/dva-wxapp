import wxp from '../utils/wxp'
export default {
  namespace: 'global',

  state: {
    location: null
  },

  subscriptions: {
    init({ dispatch }) {
      dispatch({type: 'getLocation'})
    },
  },

  reducers: {},

  effects: {
    *getLocation(_, {call, put}){
      try {
        const res = yield call(wxp.getLocation)
        yield put({type: '@@locationSuccess', payload: {location: res}})
        yield put({type: 'updateState', payload: {location: res}})
      } catch (e) {
        console.error(e)
        yield put({type: '@@locationFailed'})
      }
    }
  },
}
