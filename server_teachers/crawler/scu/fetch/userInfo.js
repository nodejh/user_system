// 用户个人信息
const request = require('request');
const iconv = require('iconv-lite');
const config = require('./../../../config/config');
const website = require('./../../../config/website').zhjw;
const analyseUserInfo = require('./../analyse/userInfo');


/**
 * 获取用户个人信息
 * @param  {string} cookie  登录后的 cookie 信息
 * @return {promise}        课表页面html
 */
const fetchUserInfo = (cookie) => {
  console.log('cookie: ', cookie);
  return new Promise((resolve, reject) => {
    const options = {
      url: website.url.userInfo,
      encoding: null,
      headers: {
        Cookie: cookie,
        'User-Agent': config.crawler['User-Agent'],
      },
    };
    request(options, (error, response, body) => {
      if (error) {
        console.log('获取用户个人信息失败: ', error);
        reject({
          code: 1047,
          error: '获取用户个人信息失败',
          detail: error,
        });
      }
      console.log('response.statusCode: ', response.statusCode);
      if (response.statusCode !== 200) {
        reject({
          code: 1048,
          error: '获取用户个人信息失败',
          detail: response,
        });
      }
      const content = iconv.decode(body, 'GBK');
      // console.log('content: ', content);
      const result = analyseUserInfo(content);
      if (result.error) {
        reject(result.error);
      }
      resolve(result.userInfo);
    });
  });
};


module.exports = fetchUserInfo;
