import request from '../request.js';

const get = (url) => {
  return request(url, {method: 'GET'});
};

export default {
  queryWeather() {
      return get('http://www.sojson.com/open/api/weather/json.shtml?city=%E5%8C%97%E4%BA%AC');
  },
};
