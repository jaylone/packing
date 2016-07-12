'use strict';

import ajax from 'ajax';

let api = (url, params) => {
  return new Promise((resolve, reject) => {
    ajax({
      url: url,
      data: params,
      dataType: 'json',
      success: (response) => {
        if (response.status !== 0) {
          reject(response);
          return;
        }
        resolve(response);
      },
      error: (err) => {
        reject(err);
      }
    });
  });
};

let getUrlRelativePath = () => {

  let url = document.location.toString(),
    arrUrl = url.split('//'),
    start = arrUrl[1].indexOf('/'),
    relUrl = arrUrl[1].substring(start);

  if ( relUrl.indexOf('?') != -1 ) {
    relUrl = relUrl.split('?')[0];
  }

  return relUrl;
};

export {
  api,
  getUrlRelativePath
}
