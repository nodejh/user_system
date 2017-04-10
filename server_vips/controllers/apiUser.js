const { query } = require('./../utils/db');


// 查看用户信息
const info = async (ctx) => {
  const result = {
    success: false,
    message: '查询用户信息失败',
    data: {
      info: {},
    },
  };
  try {
    const userId = ctx.session.userId;
    if (!userId) {
      result.message = '用户尚未登录';
      ctx.body = result;
      return false;
    }
    // console.log('session: ', ctx.session);
    // console.log('userId: ', userId);
    const sql = 'select * from vips where id = ?';
    const infos = await query(sql, [userId]);
    if (infos.length !== 1) {
      result.message = '用户账户异常';
      ctx.body = result;
      return false;
    }

    result.success = true;
    result.message = '查询用户信息成功';
    result.data.info = infos[0];
  } catch (e) {
    result.message = e.message || '查询用户信息失败';
  } finally {
    ctx.body = result;
  }
};


// 更新用户信息
const update = async (ctx) => {
  const result = {
    success: false,
    message: '更新用户信息失败',
    data: {
      info: {},
    },
  };
  try {
    const userId = ctx.session.userId;
    if (!userId) {
      result.message = '用户尚未登录';
      ctx.body = result;
      return false;
    }
    const data = ctx.request.body;
    const sql = 'update vips set ? where id = ?';
    await query(sql, [data, userId]);
    result.success = true;
    result.message = '更新用户信息成功';
  } catch (e) {
    // console.log('e: ', e);
    result.message = e.message || '更新用户信息失败';
  } finally {
    ctx.body = result;
  }
};


module.exports = {
  info,
  update,
};
