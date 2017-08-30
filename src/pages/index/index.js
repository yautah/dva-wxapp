import connect from '../../utils/connect.js';
import carousel from '../../components/carousel/carousel.js';
import wx, { mergeOptions } from '../../utils/wx.js';

const page = mergeOptions({
  onRouteEnd(e) {
    console.log('route end', e);
  },
  onShow(options) {
    console.log('onshow ', options);
  }
},carousel);

const mapState = ({index}) => {
  return {
    ...index,
  };
};

const mapFunc = (dispatch) => {
  return {


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
