const { query: queryStart } = require('./db/dbStart');
const { query: queryEnd } = require('./db/dbEnd');


const transferUsersToVips = async () => {
  try {
    const sqlStart = 'select * from users where role = 1';
    const users = await queryStart(sqlStart);
    const vips = users.filter((item) => {
      if (item.role !== 1) {
        return false;
      }
      return true;
    });
    const data = vips.map((item) => {
      return [
        item.id,
        item.realname,
        item.username,
        item.password,
        item.gender,
        item.type,
        item.state,
        item.college,
        item.major,
        item.grade,
        item.create_date,
        item.category,
        item.school,
        item.status,
        item.expires,
        item.intention,
        item.qq,
        item.phone,
      ];
    });
    const sqlEnd = 'insert into vips ' +
    '(id, realname, number, password, gender, type, state, college, major, ' +
    'grade, create_date, category, school, status, expires, intention, qq, phone) ' +
    'values ?';
    console.log('data: ', data);
    console.log('sqlEnd: ', sqlEnd);
    const resEnd = await queryEnd(sqlEnd, [data]);
    console.log('resEnd: ', resEnd);
  } catch (e) {
    console.log('e: ', e);
  } finally {
    console.log('finish');
  }
};


const transferUsersToTeachers = async () => {
  try {
    const sqlStart = 'select * from users where role = 2';
    const users = await queryStart(sqlStart);
    const teachers = users.filter((item) => {
      if (item.role === 2) {
        return true;
      }
      return false;
    });
    const data = teachers.map((item) => {
      return [
        item.id,
        item.realname,
        item.username,
        item.password,
        item.gender,
        item.type,
        item.state,
        item.college,
        item.major,
        item.grade,
        item.create_date,
        item.category,
        item.school,
        item.status,
        item.expires,
        item.intention,
        item.qq,
        item.phone,
      ];
    });
    const sqlEnd = 'insert into teachers ' +
    '(id, realname, number, password, gender, type, state, college, major, ' +
    'grade, create_date, category, school, status, expires, intention, qq, phone) ' +
    'values ?';
    console.log('data: ', data);
    console.log('sqlEnd: ', sqlEnd);
    const resEnd = await queryEnd(sqlEnd, [data]);
    console.log('resEnd: ', resEnd);
  } catch (e) {
    console.log('e: ', e);
  } finally {
    console.log('finish');
  }
};


const transferRecords = async () => {
  try {
    const sqlStart = 'select * from record';
    const records = await queryStart(sqlStart);
    const data = records.map((item) => {
      return [
        item.id,
        item.counselor_id,
        item.consultant_id,
        item.content,
        item.date,
        item.is_consulant_confirm,
        item.record_time,
        item.confirm_time,
        item.comment_content,
        item.comment_level,
      ];
    });
    const sqlEnd = 'insert into records ' +
    '(id, teacher_id, vip_id, content, date, is_vip_confirm, record_time, confirm_time, comment_content, comment_level) ' +
    'values ?';
    console.log('data: ', data);
    console.log('sqlEnd: ', sqlEnd);
    const resEnd = await queryEnd(sqlEnd, [data]);
    console.log('resEnd: ', resEnd);
  } catch (e) {
    console.log('e: ', e);
  } finally {
    console.log('finish');
  }
};

transferRecords();
