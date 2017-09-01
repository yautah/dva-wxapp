import connect from '../../utils/connect.js';
import carousel from '../../components/carousel/carousel.js';
import wx, { mergeOptions } from '../../utils/wx.js';

const page = mergeOptions({
  onLoad(options) {
     this.queryWeather();
  },
},carousel);

const mapState = ({index, loading}) => {
  return {
    ...index,
    loading,
  };
};

const mapFunc = (dispatch) => {
  return {
    queryWeather(){
      dispatch({ type: 'index/queryWeather' })   ;
    },

    queryLocation() {
      dispatch({ type: 'app/getLocation' });
    },

    onTapCarouselItem(e) {
      dispatch({
        type: 'index/onTapCarousel',
        payload: { pic: e.currentTarget.dataset.pic }
      });
    },

  };
};

Page(connect(mapState, mapFunc)(page));
