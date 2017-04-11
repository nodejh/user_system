import request from '../utils/request';

/**
 * 获取当前登录用户的咨询信息
 * @param  {object} payload payload
 * @return {Promise} 咨询信息
 */
const getList = async (payload = {}) => {
  // console.log('payload: ', payload);
  const { page = 1 } = payload;
  // console.log('page: ', page);
  return request(`/api/v0.1/record/list?page=${page}`);
};

/**
 * 添加咨询记录
 * @param  {object}  payload 咨询记录
 * @return {Promise}         promise
 */
const add = async (payload) => {
  console.log('payload: ', payload);
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  };
  return request('/api/v0.1/record/add', options);
};


/**
 * 根据学号获取咨询记录
 * @param  {object}  payload { number }
 * @return {Promise}         [description]
 */
const getRecordAndInfoByNumber = async (payload) => {
  const { number } = payload;
  if (!number) {
    return request('/api/v0.1/record/getRecordAndInfoByNumber');
  }
  return request(`/api/v0.1/record/getRecordAndInfoByNumber?number=${number}`);
};


export default {
  getList,
  add,
  getRecordAndInfoByNumber,
};
