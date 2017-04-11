import { Toast } from 'antd-mobile';
import * as recordService from '../services/record';

export default {
  namespace: 'record',
  state: {
    list: [],
    page: 1,
    pageCount: 1,
  },
  reducers: {
    // 获取咨询记录失败
    getListFail(state, { payload: message }) {
      Toast.fail(message, 2);
      return {
        ...state,
      };
    },
    // 获取咨询记录成功
    getListSuccess(state, { payload: { list, page, pageCount } }) {
      return {
        ...state,
        list,
        page,
        pageCount,
      };
    },
    // 添加咨询记录失败
    insertFail(state, { payload: message }) {
      Toast.fail(message, 2);
      return {
        ...state,
      };
    },
    // 添加咨询记录成功
    insertSuccess(state) {
      Toast.success('评论成功', 2);
      return {
        ...state,
      };
    },
  },
  effects: {
    * getList({ payload }, { call, put }) {
      console.log('payload:', payload);
      const { res } = yield call(recordService.getList, payload);
      console.log('res: ', res);
      if (!res.success) {
        return yield put({
          type: 'getListFail',
          payload: res.message,
        });
      }
      yield put({
        type: 'getListSuccess',
        payload: res.data,
      });
    },
    // 新建咨询记录
    * insert({ payload }, { call, put }) {
      const { res } = yield call(recordService.insert, payload);
      // console.log('res: ', res);
      if (!res.success) {
        return yield put({
          type: 'insertFail',
          payload: res.message,
        });
      }
      yield put({
        type: 'insertSuccess',
        payload: res.data.list,
      });
      // 获取咨询信息
      yield put({ type: 'getList' });
    },
  },
  subscriptions: {},
};
