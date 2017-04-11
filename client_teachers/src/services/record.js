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


const insert = async (payload) => {
  // console.log('payload: ', payload);
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  };
  return request('/api/v0.1/record/insert', options);
};


export default {
  getList,
  insert,
};
