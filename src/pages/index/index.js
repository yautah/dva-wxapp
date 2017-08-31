import connect from '../../utils/connect.js';
import carousel from '../../components/carousel/carousel.js';
import wx, { mergeOptions } from '../../utils/wx.js';

const page = mergeOptions({
  onLoad(options) {
     this.queryWeather();
  },

  onShow(options) {
    console.log('onshow ', options);
  },

},carousel);

const mapState = ({index}) => {
  return {
    ...index,
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
