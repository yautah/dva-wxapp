//index.js
import { connect, createSelector } from 'dva-wxapp'
import wxp from '../../utils/wxp'

//使用 reselect 创建 selector
const getLocationTxt = createSelector(
  (store) => store.global.location,
  (location) => {
    return location ?  `${location.latitude} , ${location.longitude}` : ''
  }
)

const mapState = (store) => {
  return {
    location: store.global.location,
    locating: store.loading.effects['global/getLocation'],
    locationTxt : getLocationTxt(store)
  }
}

Page(
  connect(mapState)({
    data: {
    },


    onLoad: function() {
    },

    handleTap(){
      this.dispatch({type:'global/getLocation'})
    }

  }),
)
