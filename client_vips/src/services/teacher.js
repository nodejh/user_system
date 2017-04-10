import request from '../utils/request';

/**
 * 获取当前登录用户的咨询师信息
 * @return {Promise} 用户信息
 */
const getList = async () => {
  return request('/api/v0.1/teacher/list');
};


export default {
  getList,
};
