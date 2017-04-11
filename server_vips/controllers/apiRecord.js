const { query } = require('./../utils/db');


// 查询当前用户的咨询列表
const list = async (ctx) => {
  const result = {
    success: false,
    message: '查询咨询师表失败',
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
      'records.id as id, ' +
      'records.teacher_id as teacher_id, ' +
      'records.vip_id as vip_id, ' +
      'records.date as date, ' +
      'records.is_vip_confirm as is_vip_confirm, ' +
      'records.content as content, ' +
      'records.record_time as record_time, ' +
      'records.confirm_time as confirm_time, ' +
      'records.comment_content as comment_content, ' +
      'records.comment_level as comment_level, ' +
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
      'from records left join teachers on records.teacher_id = teachers.id where records.vip_id = ? ' +
      'order by records.id desc';
    result.data.list = await query(sql, [userId]);
    result.success = true;
    result.message = '查询咨询列表成功';
  } catch (e) {
    // console.log('e: ', e);
    result.message = e.message || '查询咨询列表失败';
  } finally {
    ctx.body = result;
  }
};


// 更新咨询记录（评论）
const comment = async (ctx) => {
  const result = {
    success: false,
    message: '评论失败，请重试',
    data: {
      list: {},
    },
  };
  const { recordId, commentInfo } = ctx.request.body;
  // console.log('commentInfo: ', commentInfo);
  const data = {
    is_vip_confirm: 1,
    comment_level: commentInfo.comment_level,
    comment_content: commentInfo.comment_content,
    confirm_time: new Date(),
  };
  // console.log('recordId: ', recordId);
  // console.log('data: ', data);
  try {
    const sql = 'update records set ? where id = ?';
    await query(sql, [data, recordId]);
    result.success = true;
    result.message = '评论成功';
  } catch (e) {
    // console.log('e: ', e);
    result.message = e.message || '查询咨询列表失败';
  } finally {
    ctx.body = result;
  }
};


module.exports = {
  list,
  comment,
};
