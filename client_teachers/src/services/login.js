import request from '../utils/request';

/**
 * 判断用户是否登录
 * @return {Promise} 是否登录
 */
const isLogin = async () => {
  return request('/api/v0.1/isLogin');
};


/**
 * 退出登录
 * @return {Promise} 退出登录
 */
const logout = async () => {
  return request('/api/v0.1/logout');
};

/**
 * 登录操作
 * @param  {object}  payload 用户名密码学校
 *                           { number: "201314", password: "1314", school: "四川大学"}
 * @return {Promise}         是否登录成功
 */
const login = async (payload) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  };
  return request('/api/v0.1/login', options);
};


export default {
  isLogin,
  login,
  logout,
};
