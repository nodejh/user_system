import request from '../utils/request';

/**
 * 获取当前登录用户的咨询信息
 * @return {Promise} 咨询信息
 */
const getList = async () => {
  return request('/api/v0.1/record/list');
};


const comment = async (payload) => {
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
  return request('/api/v0.1/record/comment', options);
};


export default {
  getList,
  comment,
};
