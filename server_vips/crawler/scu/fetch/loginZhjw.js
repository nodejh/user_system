// ============================
// 模拟登录教务系统
// ============================
const request = require('request');
const iconv = require('iconv-lite');
const config = require('./../../../config/config');
const website = require('./../../../config/website').zhjw;


/**
 * 模拟登陆教务系统
 * @method login
 * @param  {string}   number   学号
 * @param  {string}   password 密码
 * @param  {Function} callback 登录成功后的回调函数
 * @return {promise}           错误信息或cookie
 */
function login(number, password) {
  console.log('number && password\n', number, password);
  return new Promise((resolve, reject) => {
    // 模拟登陆教务系统
    const options = {
      url: website.url.login,
      encoding: null,
      form: {
        zjh: number,
        mm: password,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': config.crawler['User-Agent'],
      },
      method: 'POST',
    };
    console.log('url: ', options.url);
    request(options, (error, response, body) => {
      if (error) {
        console.log('error ', error);
        reject({
          code: 1003,
          error: '模拟登陆教务系统失败',
          detail: error,
        });
      }
      if (response && response.statusCode !== 200) {
        // console.log('error response: ', response);
        reject({
          code: 1043,
          error: '模拟登陆教务系统失败，响应头状态码不是200',
          detail: response,
        });
      }
      const content = iconv.decode(body, 'GBK');
      // console.log('body: ', body);
      // console.log('content: ', content);
      if (content.indexOf(website.errorText.account) !== -1) {
        if (content.indexOf(website.errorText.number) !== -1) {
          reject({ code: 1004, error: '学号错误' });
        }
        if (content.indexOf(website.errorText.password) !== -1) {
          reject({ code: 1005, error: '密码错误' });
        }
        if (content.indexOf(website.errorText.noPermission) !== -1) {
          reject({ code: 1005, error: '密码错误' });
        }
        reject({ code: 1006, error: '学号或密码错误' });
      }
      const cookie = response.headers['set-cookie'].join();
      resolve(cookie);
    });
  });
}

module.exports = login;
