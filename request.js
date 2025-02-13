// filepath: /c:/code/Ybigh/src/request.js
const axios = require('axios');

module.exports = function (options, callback) {
  axios({
    method: options.method || 'get',
    url: options.url,
    headers: options.headers,
    data: options.body
  })
  .then(response => {
    callback(null, { statusCode: response.status }, response.data);
  })
  .catch(error => {
    callback(error);
  });
};