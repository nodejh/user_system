const { query } = require('./../utils/db');
const { PAGE_SIZE } = require('./../utils/constants');

// 查询当前用户的咨询列表
const list = async (ctx) => {
  const result = {
    success: false,
    message: '查询咨询师表失败',
    data: {
      pageCount: 0, // 总页数
      page: 1, // 当前页数
      list: {}, // 咨询列表
    },
  };
  try {
    const userId = ctx.session.userId;
    if (!userId) {
      result.message = '用户尚未登录';
      ctx.body = result;
      return false;
    }
    // 页码
    let { page } = ctx.request.query;
    // console.log('page: ', page);
    page = parseInt(page, 10) || 1;
    // console.log('page: ', page); // PAGE_SIZE
    // 查询总页数的 sql
    const sqlCount = 'select count(id) as count from record where record.teacher_id = ?';
    const sql = 'select ' +
      'record.id as id, ' +
      'record.teacher_id as teacher_id, ' +
      'record.vip_id as vip_id, ' +
      'record.date as date, ' +
      'record.is_vip_confirm as is_vip_confirm, ' +
      'record.content as content, ' +
      'record.record_time as record_time, ' +
      'record.confirm_time as confirm_time, ' +
      'record.comment_content as comment_content, ' +
      'record.comment_level as comment_level, ' +
      'vips.realname as realname, ' +
      'vips.number as number, ' +
      'vips.gender as gender, ' +
      'vips.college as college, ' +
      'vips.major as major, ' +
      'vips.grade as grade, ' +
      'vips.category as category, ' +
      'vips.school as school, ' +
      'vips.intention as intention, ' +
      'vips.qq as qq, ' +
      'vips.phone as phone ' +
      'from record left join vips on record.vip_id = vips.id where record.teacher_id = ? ' +
      'order by record.id desc ' +
      'limit ?,?';
    const resCount = await query(sqlCount, [userId]);
    const count = resCount[0].count;
    const pageCount = Math.floor(count / PAGE_SIZE) + 1; // 总页数
    const start = PAGE_SIZE * (page - 1);
    result.data.list = await query(sql, [userId, start, PAGE_SIZE]);
    result.data.pageCount = pageCount;
    result.data.page = page;
    result.success = true;
    result.message = '查询咨询列表成功';
  } catch (e) {
    // console.log('e: ', e);
    result.message = e.message || '查询咨询列表失败';
  } finally {
    ctx.body = result;
  }
};


// 新建咨询记录
const add = async (ctx) => {
  const result = {
    success: false,
    message: '评论失败，请重试',
  };
  const { id, date, content } = ctx.request.body;
  console.log(' ctx.request.body: ', ctx.request.body);
  try {
    const userId = ctx.session.userId;
    if (!userId) {
      result.message = '用户尚未登录';
      return false;
    }
    if (!id) {
      result.message = '请先获取会员个人信息和咨询记录';
      return false;
    }
    if (!date) {
      result.message = '请输入跟进日期';
      return false;
    }
    if (!content) {
      result.message = '请输入咨询详情';
      return false;
    }
    const data = {
      teacher_id: userId,
      vip_id: id,
      date: new Date(date),
      content,
      record_time: new Date(),
    };
    // console.log('recordId: ', recordId);
    console.log('data: ', data);
    const sql = 'insert into record set ?';
    await query(sql, [data]);
    result.success = true;
    result.message = '新建咨询记录';
  } catch (e) {
    // console.log('e: ', e);
    result.message = e.message || '新建咨询记录失败';
  } finally {
    ctx.body = result;
  }
};


// getRecordAndInfoByNumber
const getRecordAndInfoByNumber = async (ctx) => {
  const result = {
    success: false,
    message: '查询咨询师表失败',
    data: {
      list: {}, // 咨询列表
      info: null, // 会员的个人信息
    },
  };
  try {
    const userId = ctx.session.userId;
    if (!userId) {
      result.message = '用户尚未登录';
      ctx.body = result;
      return false;
    }
    // 页码
    const { number } = ctx.request.query;
    const sqlVip = 'select ' +
      'id,realname,number,expires,gender,grade,intention,major,phone,qq,school ' +
      'from vips where number = ?';
    const sql = 'select ' +
      'record.id as id, ' +
      'record.teacher_id as teacher_id, ' +
      'record.vip_id as vip_id, ' +
      'record.date as date, ' +
      'record.is_vip_confirm as is_vip_confirm, ' +
      'record.content as content, ' +
      'record.record_time as record_time, ' +
      'record.confirm_time as confirm_time, ' +
      'record.comment_content as comment_content, ' +
      'record.comment_level as comment_level, ' +
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
      'from record left join vips on record.vip_id = vips.id ' +
      'where record.teacher_id = ? and record.vip_id = ? ' +
      'order by record.id desc';
    const resVip = await query(sqlVip, [number]);
    if (resVip.length === 0) {
      result.message = '会员不存在，请检查学号是否正确';
      return false;
    }
    if (resVip.length !== 1) {
      result.message = '会员账户异常，请联系系统管理员';
      return false;
    }
    const info = resVip[0];
    result.data.list = await query(sql, [userId, info.id]);
    result.data.info = info;
    result.success = true;
    result.message = '查询咨询列表成功';
  } catch (e) {
    result.message = e.message || '查询咨询列表失败';
  } finally {
    ctx.body = result;
  }
};


module.exports = {
  list,
  add,
  getRecordAndInfoByNumber,
};
