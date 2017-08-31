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

  onReady() {
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

    click() {
      console.log('i am click func');
    },

    onTapCarouselItem(e) {
      console.log('override in page index');
      dispatch({ type: 'app/getUserInfoSuccess', payload: { userInfo: { nickName: 'haha' }} });
    },

  };
};

Page(connect(mapState, mapFunc)(page));
