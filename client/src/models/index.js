
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
  subscriptions: {},
};
