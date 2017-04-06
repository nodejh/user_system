// ============================
// 模拟登录教务系统
// ============================
const request = require('request');
const iconv = require('iconv-lite');
// const hexMd5 = require('./../helper/cipher').hex_md5;
const config = require('./../../../config/config');
const website = require('./../../../config/website').swjtu;


/**
 * 模拟登陆教务系统
 * @param  {string} number      学号
 * @param  {string} password    密码
 * @param  {string} ranstring   验证码
 * @param  {string} loginCookie 登录页面cookie
 * @return {promise}             错误信息或cookie
 */
function login(number, password, ranstring, loginCookie) {
  console.log('number && password\n', number, password);
  console.log('ranstring, loginCookie: ', ranstring, loginCookie);
  // const sign = new Date().getTime();
  // const pwd = hexMd5(`${number}${sign}${hexMd5(password.trim())}`);
  return new Promise((resolve, reject) => {
    // 模拟登陆教务系统
    const options = {
      url: website.url.login,
      encoding: null,
      form: {
        user_id: number,
        password,
        ranstring,
        user_type: 'student',
        url: '../servlet/UserLoginCheckInfoAction',
      },
      headers: {
        Cookie: loginCookie,
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
        console.log('error response: ', response);
        reject({
          code: 1043,
          error: '模拟登陆教务系统失败，响应头状态码不是200',
          detail: response,
        });
      }
      const content = iconv.decode(body, 'GBK');
      console.log('body: ', body);
      console.log('content: ', content);
      if (content.indexOf(website.errorText.unknownError) !== -1) {
        reject({ code: 1006, error: '未知错误' });
      }
      // if (content.indexOf(website.errorText.locked) !== -1) {
      //   reject({ code: 1006, error: '账户被锁定，请联系管理员' });
      // }
      console.log('response.headers: ', response.headers);
      const cookie = response.headers['set-cookie'].join(';');
      resolve(cookie);
    });
  });
}

module.exports = login;
