import wx from './wx.js';

const makeOptions = (url, options) => {
  const defaultoptions = {
    url: undefined,
    method: 'GET',
    qs: undefined,
    body: undefined,
    headers: undefined,
    type: 'json',
    contentType: 'application/json',
    crossOrigin: true,
    credentials: undefined
  };

  let thisoptions = {};
  if (!options) {
    thisoptions = url;
  } else {
    thisoptions = options;
    if (url) {
      thisoptions.url = url;
    }
  }
  thisoptions = Object.assign({}, defaultoptions, thisoptions);

  return thisoptions;
};

const addQs = (url, qs) => {
  let queryString = '';
  let newUrl = url;
  if (qs && typeof qs === 'object') {
    /* eslint no-restricted-syntax: 0 */
    for (const k of Object.keys(qs)) {
      queryString += `&${k}=${qs[k]}`;
    }
    if (queryString.length > 0) {
      if (url.split('?').length < 2) {
        queryString = queryString.substring(1);
      } else if (url.split('?')[1].length === 0) {
        queryString = queryString.substring(1);
      }
    }

    if (url.indexOf('?') === -1) {
      newUrl = `${url}?${queryString}`;
    } else {
      newUrl = `${url}${queryString}`;
    }
  }

  return newUrl;
};

const request = (url, options) => {
  const opts = makeOptions(url, options);
  const { method, body, headers, qs, type, contentType } = opts;

  let requestUrl = opts.url;
  if (qs) requestUrl = addQs(requestUrl, qs);

  let header = headers;
  if ((!headers || !headers['content-type']) && contentType) {
    header = Object.assign({}, headers, { 'content-type': contentType });
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: requestUrl,
      method,
      data: body,
      header,
      dataType: type}).then(response => {
        // getApp().log(JSON.stringify(response));
        //业务数据异常
        if (response.statusCode < 200 || response.statusCode >= 300) {
          let errors = {
            error: -1,
            request: url,
            errorMessage: '系统异常，请查看response',
            response,
          };
          if (response.data && typeof response.data === 'object') {
            errors = Object.assign({}, errors, response.data);
          }
          reject(errors);
        }
        //正确返回
        resolve(response.data);
      }).catch(err => {
        // getApp().log(JSON.stringify(err));
        reject({ error: -1, message: '系统异常，请查看response', err, request: url });
      });
  });
};

export default request;
