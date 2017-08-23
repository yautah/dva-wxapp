import connect from '../../utils/connect.js';
import carousel from '../../components/carousel/carousel.js';
import { mergeOptions } from '../../utils/wx.js';

const page = mergeOptions({
  onLoad(options) {
    console.log(this);
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
      console.log('i am click func');
    },

    onTapCarouselItem(e) {
      console.log('overrid in page index');
    },

  };
};

Page(connect(mapState, mapFunc)(page));
