import { Toast } from 'antd-mobile';
import * as recordService from '../services/record';

export default {
  namespace: 'record',
  state: {
    list: [],
  },
  reducers: {
    // 获取咨询激励失败
    getListFail(state, { payload: message }) {
      Toast.fail(message, 2);
      return {
        ...state,
      };
    },
    // 获取咨询记录成功
    getListSuccess(state, { payload: list }) {
      return {
        ...state,
        list,
      };
    },
    // 评论（更新record）失败
    commentFail(state, { payload: message }) {
      Toast.fail(message, 2);
      return {
        ...state,
      };
    },
    // 评论（更新record）成功
    commentSuccess(state) {
      Toast.success('评论成功', 2);
      return {
        ...state,
      };
    },
  },
  effects: {
    *getList({ payload }, { call, put }) {
      const { res } = yield call(recordService.getList);
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
    // 评论
    *comment({ payload }, { call, put }) {
      const { res } = yield call(recordService.comment, payload);
      // console.log('res: ', res);
      if (!res.success) {
        return yield put({
          type: 'commentFail',
          payload: res.message,
        });
      }
      yield put({
        type: 'commentSuccess',
        payload: res.data.list,
      });
      // 获取咨询信息
      yield put({ type: 'getList' });
    },
  },
  subscriptions: {},
};
