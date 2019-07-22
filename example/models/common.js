/**
 * 基础的 model
 */

import { extendModel } from '../utils/dva-wxapp'

const delay = milsec => {
  return new Promise(resolve => {
    setTimeout(resolve, milsec)
  })
}

const baseModel = {
  state: {
    toast: { show: false }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  },

  effects: {
    *showToast(action, { put, call }) {
      const { text, isShowForever } = action.payload
      console.log('----------', text)
      yield put({ type: 'updateState', payload: { toast: { text, show: true } } })
      if (!isShowForever) {
        yield call(delay, 1500)
        yield put({ type: 'updateState', payload: { toast: { show: false } } })
      }
    }
  }
}

const modelExtend = (config = {}) => {
  return extendModel(baseModel, config)
}

export default modelExtend
