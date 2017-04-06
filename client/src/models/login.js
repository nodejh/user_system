import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import * as loginService from '../services/login';

export default {
  namespace: 'login',
  state: {},
  reducers: {},
  effects: {
    // 判断用户是否登录
    *isLogin({ payload }, { call, put }) {
      const { res } = yield call(loginService.isLogin);
      if (!res.success || !res.data.isLogin) {
        yield put(routerRedux.push('/login'));
      }
    },

    // 登录操作
    *submit({ payload }, { call, put }) {
      const { res } = yield call(loginService.login, payload);
      if (res.success) {
        // 登录成功
        Toast.success('登录成功', 1);
        yield put(routerRedux.push('/'));
        return true;
      }
      Toast.fail(res.message, 1);
    },

    // 退出登录
    *logout({ payload }, { call, put }) {
      const { res } = yield call(loginService.logout);
      if (res.success) {
        return yield put(routerRedux.push('/login'));
      }
      Toast.fail('退出登录失败', 1);
    },
  },
  subscriptions: {},
};
