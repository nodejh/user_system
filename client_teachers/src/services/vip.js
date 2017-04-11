import request from '../utils/request';

/**
 * 获取当前登录咨询师的会员信息
 * @return {Promise} 用户信息
 */
const getList = async () => {
  return request('/api/v0.1/vip/list');
};


export default {
  getList,
};
