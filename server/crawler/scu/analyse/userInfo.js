// 解析个人信息页面
const cheerio = require('cheerio');
const zhjwSpecialText = require('./zhjwSpecialText');


const analyseUserInfo = (html) => {
  // console.log('html: ', html);
  const errSpecialText = zhjwSpecialText(html);
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
  const userInfoTable = $('body').find('#tblView').eq(0);
  const userInfo = {
    name: $(userInfoTable).find('tr').eq(0).find('td')
      .eq(3)
      .text()
      .replace(/\s+/g, ''),
    gender: $(userInfoTable).find('tr').eq(3).find('td')
      .eq(1)
      .text()
      .replace(/\s+/g, ''),
    type: $(userInfoTable).find('tr').eq(3).find('td')
      .eq(3)
      .text()
      .replace(/\s+/g, ''), // 学生类别: 本科
    state: $(userInfoTable).find('tr').eq(4).find('td')
      .eq(3)
      .text()
      .replace(/\s+/g, ''), // 学籍状态: 在校
    college: $(userInfoTable).find('tr').eq(12).find('td')
      .eq(3)
      .text()
      .replace(/\s+/g, ''), // 学院
    major: $(userInfoTable).find('tr').eq(13).find('td')
      .eq(1)
      .text()
      .replace(/\s+/g, ''), // 专业
    grade: $(userInfoTable).find('tr').eq(14).find('td')
      .eq(1)
      .text()
      .replace(/\s+/g, ''), // 年级
  };
  console.log('fetch: ', userInfo);
  return {
    error: null,
    userInfo,
  };
};


module.exports = analyseUserInfo;
