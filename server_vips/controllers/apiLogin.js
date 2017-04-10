const { query } = require('./../utils/db');
const loginZhjwSCU = require('./../crawler/scu/fetch/loginZhjw');
const getUserInfoSCU = require('./../crawler/scu/fetch/userInfo');
const loginCDUT = require('./../crawler/cdut/fetch/login');
const getUserInfoCDUT = require('./../crawler/cdut/fetch/userInfo');


// 查看用户登录状态
const isLogin = async (ctx) => {
  const result = {
    success: false,
    message: '查看用户登录状态失败',
    data: {
      isLogin: false,
    },
  };
  // console.log('session: ', ctx.session);
  if (ctx.session && ctx.session.userId) {
    result.success = true;
    result.message = '用户已登录';
    result.data.isLogin = true;
  }
  result.message = '用户未登录';
  ctx.body = result;
};


// 退出登录
const logout = async (ctx) => {
  const result = {
    success: false,
    message: '退出登录失败',
  };
  ctx.session = null;
  result.success = true;
  result.message = '退出登录成功';
  ctx.body = result;
};


// 登陆操作
const login = async (ctx) => {
  const result = {
    success: false,
    message: '登录失败',
  };
  if (ctx.session && ctx.session.userId) {
    result.success = true;
    result.message = '用户已经登录';
    ctx.body = result;
    return false;
  }
  const { number, password, school } = ctx.request.body;
  if (!(number && password && school)) {
    result.success = false;
    result.message = '用户名、密码或学校错误';
    ctx.body = result;
    return false;
  }
  // 判断数据库是否有该用户
  const selectUser = 'select id,password from vips where number = ? and school = ?';
  try {
    const user = await query(selectUser, [number, school]);
    // 用户存在
    if (user.length > 0) {
      // 密码正确
      if (user[0].password === password) {
        ctx.session = {
          userId: user[0].id,
          role: 'vip',
          number: user[0].number,
        };
        ctx.session = {
          userId: user[0].id,
          number,
          role: 'vip',
        };
        result.success = true;
        result.message = '登录成功';
        ctx.body = result;
        return true;
      }
      // 密码错误
      result.success = false;
      result.message = '学号或密码错误';
      ctx.body = result;
      return false;
    }

    // 用户不存在
    const insertData = {
      number,
      password,
      school,
      create_date: new Date(),
    };
    const sqlInsert = 'insert into vips set ?';
    if (school === '四川大学') {
      // 数据库中没有该用户，判断学校 -->四川大学 ，并进行模拟登录
      const cookie = await loginZhjwSCU(number, password);
      const userInfo = await getUserInfoSCU(cookie);
      insertData.realname = userInfo.name;
      insertData.college = userInfo.college;
      insertData.major = userInfo.major;
      insertData.type = userInfo.type;
      insertData.gender = userInfo.gender;
      insertData.state = userInfo.state;
      insertData.grade = userInfo.grade;
    } else if (school === '成都理工大学') {
      // 数据库中没有该用户，判断学校 -->成都理工大学 ，并进行模拟登录
      const cookie = await loginCDUT(number, password);
      const userInfo = await getUserInfoCDUT(cookie);
      insertData.realname = userInfo.name;
      insertData.college = userInfo.college;
      insertData.major = userInfo.major;
    } else if (school === '西南交通大学') {
      const { grade, major, college, realname } = ctx.request.body;
      insertData.realname = realname;
      insertData.grade = grade;
      insertData.major = major;
      insertData.college = college;
    }
    const insertResult = await query(sqlInsert, [insertData]);
    ctx.session = {
      userId: insertResult.insertId,
      number,
      role: 'vip',
    };
    result.success = true;
    result.message = '登录成功';
  } catch (e) {
    // eslint-disable-next-line
    console.log('e: ', e);
    if (e.message || e.error) {
      result.message = e.message || e.error;
    }
  } finally {
    ctx.body = result;
  }
};

module.exports = {
  isLogin,
  login,
  logout,
};
