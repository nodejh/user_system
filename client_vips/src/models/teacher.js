import { Toast } from 'antd-mobile';
import * as teacherService from '../services/teacher';

export default {
  namespace: 'teacher',
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
    *getList({ payload }, { call, put }) {
      const { res } = yield call(teacherService.getList);
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
