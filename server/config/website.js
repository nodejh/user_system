// 和爬取网站相关的配置，不需要修改
const config = {
  // 教务系统相关配置
  zhjw: {
    url: {
      // 教务系统登陆 URL
      login: 'http://202.115.47.141/loginAction.do',
      // 课表页面
      curriculums: 'http://202.115.47.141/xkAction.do?actionType=6',
      // 本学期成绩。pageSize=100 参数主要是为了将所有成绩都显示在一页
      currentTerm: 'http://202.115.47.141/bxqcjcxAction.do?pageSize=100',
      // 所有及格成绩
      allPass: 'http://202.115.47.141/gradeLnAllAction.do?type=ln&oper=qbinfo',
      // 全部不及格成绩
      allFail: 'http://202.115.47.141/gradeLnAllAction.do?type=ln&oper=bjg',
      // 学籍信息
      userInfo: 'http://202.115.47.141/xjInfoAction.do?oper=xjxx',
      // 考表
      examination: 'http://202.115.47.141/ksApCxAction.do?oper=getKsapXx',
    },
    errorText: {
      // 只要模拟登陆后返回的页面中有 ‘帐号’ 两个字，说明登陆失败
      account: '帐号',
      number: '你输入的证件号不存在，请您重新输入！',
      password: '您的密码不正确，请您重新输入！',
      database: '数据库忙请稍候再试',
      notLogin: '请您登录后再使用',
      noPermission: '您无权限进行相应操作,请联系管理员',
    },
  },
  // 移动图书馆系统相关配置
  lib: {
    schoolid: 395,
    url: {
      // 图书馆手机首页
      home: 'http://m.5read.com/395',
      // 登陆 URL
      login: 'http://mc.m.5read.com/irdUser/login/opac/opacLogin.jspx',
      // 借阅列表
      books: 'http://mc.m.5read.com/cmpt/opac/opacLink.jspx?stype=1',
      // 续借链接前缀  barcode=xxxxx&bor_id=xxxxx
      renewLinkPrefix: 'http://202.115.54.52:90/sms/opac/user/renew.action?xc=5',
    },
    errorText: {
      account: '用户名或密码错误',
      emptyPassword: '借阅证密码不能为空',
      emptyNumber: '借阅证号不能为空',
      cookieTips: '请确认您的浏览器Cookie开启和正常访问移动图书馆首页',
      // 续借操作不成功,原因是：...
      renewError: '续借操作不成功',
    },
  },
  // 校园信息服务门户网站
  my: {
    url: {
      // 校园信息服务门户网站登陆 URL
      login: 'http://my.scu.edu.cn/userPasswordValidate.portal',
      // 个人信息
      userInfo: 'http://my.scu.edu.cn/index.portal?.pn=p1400_p2004',
    },
    successText: {
      account: 'handleLoginSuccessed',
    },
    errorText: {
      account: '用户不存在或密码错误',
    },
  },
  // 成都理工大学
  cdut: {
    url: {
      login: 'http://202.115.133.173:805/Common/Handler/UserLogin.ashx',
      userInfo: 'http://202.115.133.173:805/Default.aspx',
    },
    errorText: {
      account: '4', // 学号或密码错误
      locked: '2', // 账户被锁定，请联系管理员
    },
  },
  // 西南交大
  swjtu: {
    url: {
      loginPage: 'http://jiaowu.swjtu.edu.cn/service/login.jsp',
      getRandomNumberToJPEG: 'http://jiaowu.swjtu.edu.cn/servlet/GetRandomNumberToJPEG',
      login: 'http://jiaowu.swjtu.edu.cn/servlet/UserLoginSQLAction',
      userInfo: 'http://jiaowu.swjtu.edu.cn/servlet/StudentInfoMapAction?MapID=101&PageUrl=../student/student/student.jsp',
    },
    errorText: {
      unknownError: '未知错误', // 未知错误
      account: '您的密码不正确', // 用户名或密码错误
      ranstring: '验证码', // 验证码错误
    },
    // 账号 2016114709
    // 密码 986688
  },
};


module.exports = config;
