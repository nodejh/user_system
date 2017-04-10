const { query } = require('./../utils/db');


// 查询当前用户的咨询师列表
const list = async (ctx) => {
  const result = {
    success: false,
    message: '查询咨询师列表失败',
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
      'teachers.realname as realname, ' +
      'teachers.gender as gender, ' +
      'teachers.college as college, ' +
      'teachers.major as major, ' +
      'teachers.grade as grade, ' +
      'teachers.category as category, ' +
      'teachers.school as school, ' +
      'teachers.intention as intention, ' +
      'teachers.qq as qq, ' +
      'teachers.phone as phone ' +
      'from teacher_vip left join teachers on teacher_vip.teacher_id = teachers.id where teacher_vip.vip_id = ?';
    result.data.list = await query(sql, [userId]);
    result.success = true;
    result.message = '查询咨询师列表成功';
  } catch (e) {
    // console.log('e: ', e);
    result.message = e.message || '查询咨询师列表失败';
  } finally {
    ctx.body = result;
  }
};


module.exports = {
  list,
};
