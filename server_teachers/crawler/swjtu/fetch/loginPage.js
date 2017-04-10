// 用户个人信息
const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const config = require('./../../../config/config');
const website = require('./../../../config/website').swjtu;


/**
 * 获取登录页面信息
 * @return {promise}        登录页面 { cookie, imageUrl }
 */
const fetchLoginPage = () => {
  return new Promise((resolve, reject) => {
    const options = {
      url: website.url.loginPage,
      encoding: null,
      headers: {
        'User-Agent': config.crawler['User-Agent'],
      },
    };
    console.log('options: ', options);
    request(options, (error, response, body) => {
      // console.log('response: ', response);
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
      const content = iconv.decode(body, 'UTF-8');
      const cookie = response.headers['set-cookie'].join(';');
      // console.log('content: ', content);
      console.log('cookie: ', cookie);
      const $ = cheerio.load(content, {
        ignoreWhitespace: true,
        xmlMode: false,
        lowerCaseTags: false,
      });
      const imageUrl = $('body').find('#imgRandom').attr('src');
      const result = {
        cookie,
        imageUrl,
      };
      console.log('result: ', result);
      resolve(result);
    });
  });
};


module.exports = fetchLoginPage;
