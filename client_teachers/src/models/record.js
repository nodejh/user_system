import { Toast } from 'antd-mobile';
import * as recordService from '../services/record';

export default {
  namespace: 'record',
  state: {
    list: [],
    page: 1,
    pageCount: 1,
    isShowAddRecord: false, // 是否显示添加咨询记录的页面
    recordAndInfoByNumber: { // 某个学号的咨询激励
      info: null,
      number: null,
      list: [],
    },
  },
  reducers: {
    // 是否显示添加咨询记录的页面
    showAddRecord(state) {
      console.log('showAddRecord: ', state);
      return {
        ...state,
        isShowAddRecord: !state.isShowAddRecord,
      };
    },
    // 获取咨询记录失败
    getListFail(state, { payload: message }) {
      Toast.fail(message, 1);
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
    // 根据学号获取咨询记录失败
    getRecordAndInfoByNumberFail(state, { payload: message }) {
      Toast.fail(message, 1);
      return {
        ...state,
      };
    },
    // 根据学号获取咨询记录成功
    getRecordAndInfoByNumberSuccess(state, { payload: { list, number, info } }) {
      return {
        ...state,
        recordAndInfoByNumber: {
          info,
          number,
          list,
        },
      };
    },
    // 添加咨询记录失败
    addFail(state, { payload: message }) {
      Toast.fail(message, 1);
      return {
        ...state,
      };
    },
    // 添加咨询记录成功
    addSuccess(state) {
      Toast.success('添加咨询记录成功', 2);
      return {
        ...state,
      };
    },
  },
  effects: {
    * getList({ payload }, { call, put }) {
      // console.log('payload:', payload);
      const { res } = yield call(recordService.getList, payload);
      // console.log('res: ', res);
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
    // 根据学号获取咨询记录
    * getRecordAndInfoByNumber({ payload }, { call, put }) {
      const { res } = yield call(recordService.getRecordAndInfoByNumber, payload);
      console.log('res: ', res);
      if (!res.success) {
        return yield put({
          type: 'getRecordAndInfoByNumberFail',
          payload: res.message,
        });
      }
      yield put({
        type: 'getRecordAndInfoByNumberSuccess',
        payload: {
          list: res.data.list,
          info: res.data.info,
          number: payload.number,
        },
      });
    },
    // 新建咨询记录
    * add({ payload }, { call, put }) {
      // console.log('add: ', payload);
      const { res } = yield call(recordService.add, payload);
      // console.log('res: ', res);
      if (!res.success) {
        return yield put({
          type: 'addFail',
          payload: res.message,
        });
      }
      yield put({
        type: 'addSuccess',
        payload: res.message,
      });
      // 获取该用户的最新咨询信息
      yield put({
        type: 'getRecordAndInfoByNumber',
        payload: { number: payload.number },
      });
    },
  },
  subscriptions: {},
};
