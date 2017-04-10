import request from '../utils/request';

/**
 * 获取当前登录用户信息
 * @return {Promise} 用户信息
 */
const getInfo = async () => {
  return request('/api/v0.1/user/info');
};


const update = async ({ payload }) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  };
  return request('/api/v0.1/user/update', options);
};


export default {
  getInfo,
  update,
};
