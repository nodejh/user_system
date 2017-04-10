// 解析个人信息页面
const cheerio = require('cheerio');
const specialText = require('./specialText');


const analyseUserInfo = (html) => {
  console.log('html: ', html);
  const errSpecialText = specialText(html);
  // console.log('errSpecialText: ', errSpecialText);
  if (errSpecialText) {
    return {
      error: errSpecialText,
    };
  }
  const $ = cheerio.load(html, {
    ignoreWhitespace: true,
    xmlMode: false,
    lowerCaseTags: false,
  });
  const userInfoTable = $('body').find('.student_infor');
  const userInfo = {
    name: $(userInfoTable).find('li').eq(0)
      .text()
      .split('：')[1]
      .replace(/\s+/g, ''),
    college: $(userInfoTable).find('li').eq(1)
      .text()
      .split('：')[1]
      .replace(/\s+/g, ''), // 学院
    major: $(userInfoTable).find('li').eq(2)
      .text()
      .split('：')[1]
      .replace(/\s+/g, ''), // 专业
  };
  console.log('fetch: ', userInfo);
  return {
    error: null,
    userInfo,
  };
};


module.exports = analyseUserInfo;
