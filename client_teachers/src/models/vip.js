import { Toast } from 'antd-mobile';
import * as vipService from '../services/vip';

export default {
  namespace: 'vip',
  state: {
    list: [],
  },
  reducers: {
    getListFail(state, { payload: message }) {
      Toast.fail(message, 2);
      return {
        ...state,
      };
    },
    getListSuccess(state, { payload: list }) {
      return {
        ...state,
        list,
      };
    },
  },
  effects: {
    * getList({ payload }, { call, put }) {
      const { res } = yield call(vipService.getList);
      // console.log('res: ', res);
      if (!res.success) {
        return yield put({
          type: 'getListFail',
          payload: res.message,
        });
      }
      yield put({
        type: 'getListSuccess',
        payload: res.data.list,
      });
    },
  },
  subscriptions: {},
};
