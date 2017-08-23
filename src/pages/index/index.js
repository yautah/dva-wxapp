import connect from '../../utils/connect.js';
import carousel from '../../components/carousel/carousel.js';
import wx, { mergeOptions } from '../../utils/wx.js';

const page = mergeOptions({
  onLoad(options) {
  },
},carousel);

const mapState = ({index}) => {
  return {
    ...index,
  };
};

const mapFunc = (dispatch) => {
  return {
    click() {
    },
  };
};

Page(connect(mapState, mapFunc)(page));
