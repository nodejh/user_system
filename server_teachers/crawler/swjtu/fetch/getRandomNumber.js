// 图片验证码 -- false
const request = require('request');
const iconv = require('iconv-lite');
const config = require('./../../../config/config');
const website = require('./../../../config/website').swjtu;


/**
 * 获取图片验证码
 * @return {promise}        验证码 { ranstring }
 */
const fetchRandomNumber = () => {
  return new Promise((resolve, reject) => {
    const options = {
      url: website.url.getRandomNumberToJPEG,
      encoding: null,
      headers: {
        'User-Agent': config.crawler['User-Agent'],
      },
    };
    console.log('options: ', options);
    request(options, (error, response, body) => {
      // console.log('response: ', response);
      if (error) {
        console.log('获取图片验证码失败: ', error);
        reject({
          code: 1047,
          error: '获取图片验证码失败',
          detail: error,
        });
      }
      console.log('response.statusCode: ', response.statusCode);
      if (response.statusCode !== 200) {
        reject({
          code: 1048,
          error: '获取图片验证码失败',
          detail: response,
        });
      }
      const content = iconv.decode(body, 'UTF-8');
      const cookie = response.headers['set-cookie'].join(';');
      console.log('content: ', content);
      console.log('cookie: ', cookie);
      const ranstring = '';
      console.log('ranstring: ', ranstring);
      resolve(ranstring);
    });
  });
};


module.exports = fetchRandomNumber;
