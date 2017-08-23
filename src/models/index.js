

export default {
  namespace: 'index',

  state: {
    title: 'hello world',
    carousel: {
      indicatorDots: true,  //显示面板指示点
      autoplay: true,     //自动切换
      interval: 2000,    //自动切换时间间隔
      duration: 1000,    //滑动动画时长
      height: 200,
      images: [{
        imgUrl: "http://imgcdnali.ylallinone.com/pcImg/2017-05-03/14937842648526.jpg",
      }, {
        imgUrl: "http://imgcdnali.ylallinone.com/pcImg/2017-05-03/14937842684646.jpg",
      }, {
        imgUrl: "http://imgcdnali.ylallinone.com/pcImg/2017-05-03/14937842759450.jpg",
      }],
    },
    width: 750,

  },

  reducers: {
  },

  effects: {
  },

  subscriptions: {
  }
}
