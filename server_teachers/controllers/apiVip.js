const { query } = require('./../utils/db');


// 查询当前咨询师用户的会员列表
const list = async (ctx) => {
  const result = {
    success: false,
    message: '查询会员列表失败',
    data: {
      list: {},
    },
  };
  try {
    const userId = ctx.session.userId;
    if (!userId) {
      result.message = '用户尚未登录';
      ctx.body = result;
      return false;
    }
    const sql = 'select ' +
      'teacher_vip.teacher_id as teacher_id, ' +
      'teacher_vip.vip_id as vip_id, ' +
      'teacher_vip.id as id, ' +
      'vips.realname as realname, ' +
      'vips.gender as gender, ' +
      'vips.college as college, ' +
      'vips.major as major, ' +
      'vips.grade as grade, ' +
      'vips.category as category, ' +
      'vips.school as school, ' +
      'vips.intention as intention, ' +
      'vips.qq as qq, ' +
      'vips.phone as phone ' +
      'from teacher_vip left join vips on teacher_vip.vip_id = vips.id where teacher_vip.teacher_id = ?';
    result.data.list = await query(sql, [userId]);
    result.success = true;
    result.message = '查询会员列表成功';
  } catch (e) {
    // console.log('e: ', e);
    result.message = e.message || '查询会员列表失败';
  } finally {
    ctx.body = result;
  }
};


module.exports = {
  list,
};
