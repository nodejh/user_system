
export default {
  namespace: 'index',
  state: {
    selectedTab: 'record',
  },
  reducers: {
    changeTab(state, { payload }) {
      return {
        ...state,
        selectedTab: payload,
      };
    },
  },
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'login/isLogin' });
        }
      });
    },
  },
};
