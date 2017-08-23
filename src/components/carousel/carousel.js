
export default {
  data: {
    carousel: {
      indicatorDots: true,  //显示面板指示点
      autoplay: true,     //自动切换
      interval: 3000,    //自动切换时间间隔
      duration: 1000,    //滑动动画时长
      height: 150,
      images: [],
    },
  },

  onTapCarouselItem() {
    throw new Error('should override this function');
  }

};

