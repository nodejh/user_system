import { Toast } from 'antd-mobile';
import * as userService from '../services/user';


export default {
  namespace: 'user',
  state: {
    editable: false,
    info: {},
  },
  reducers: {
    getInfoFail(state, { payload: message }) {
      Toast.fail(message, 2);
      return {
        ...state,
      };
    },
    getInfoSuccess(state, { payload: info }) {
      return {
        ...state,
        info,
      };
    },
    updateFail(state, { payload: message }) {
      Toast.fail(message, 2);
      return {
        ...state,
      };
    },
    updateSuccess(state, { payload: info }) {
      return {
        ...state,
        editable: !state.editable,
        info: {
          ...state.info,
          ...info,
        },
      };
    },
    editable(state) {
      return {
        ...state,
        editable: !state.editable,
      };
    },
  },

  effects: {
    // 获取用户信息
    *getInfo({ payload }, { call, put }) {
      const { res } = yield call(userService.getInfo);
      if (!res.success) {
        return yield put({
          type: 'getInfoFail',
          payload: res.message,
        });
      }
      yield put({
        type: 'getInfoSuccess',
        payload: res.data.info,
      });
    },

    // 更新用户信息
    *update({ payload }, { call, put }) {
      const { res } = yield call(userService.update, { payload });
      if (!res.success) {
        return yield put({
          type: 'updateFail',
          payload: res.message,
        });
      }
      yield put({
        type: 'updateSuccess',
        payload,
      });
    },
  },
  subscriptions: {},
};
