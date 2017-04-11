import React from 'react';
import { connect } from 'dva';
import { TabBar, NavBar, Icon, Button } from 'antd-mobile';
import VipPage from './VipPage';
import RecordPage from './RecordPage';
import UserPage from './UserPage';
import styles from './IndexPage.css';


/**
 * map state to props
 * @param  {object} state state
 * @return {object}       props
 */
function mapStateToProps(state) {
  const { selectedTab, hidden } = state.index;
  return { selectedTab, hidden };
}


function IndexPage({ dispatch, selectedTab }) {
  const press = (tab) => {
    console.log('tab: ', tab);
    dispatch({ type: 'index/changeTab', payload: tab });
    switch (tab) {
      case 'record':
        dispatch({ type: 'record/getList' });
        break;
      case 'vip':
        dispatch({ type: 'vip/getList' });
        break;
      case 'user':
        dispatch({ type: 'user/getInfo' });
        break;
      default:
        dispatch({ type: 'user/getInfo' });
    }
  };

  return (
    <div className={styles.normal}>
      <NavBar iconName="false">
        炫青教育(咨询师)
      </NavBar>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        <TabBar.Item
          // eslint-disable-next-line
          icon={<Icon type={require('./../assets/svg/user_home_page/chat.svg')} color="#33A3F4" />}
          // eslint-disable-next-line
          selectedIcon={<Icon type={require('./../assets/svg/icon-core/comment.svg')} />}
          title="咨询记录"
          key="咨询记录"
          selected={selectedTab === 'record'}
          onPress={() => { press('record'); }}
        >
          <RecordPage />
        </TabBar.Item>
        <TabBar.Item
          // eslint-disable-next-line
          icon={<Icon type={require('./../assets/svg/tab_bar/朋友.svg')} />}
          // eslint-disable-next-line
          selectedIcon={<Icon type={require('./../assets/svg/tab_bar/朋友按下.svg')} />}
          title="会员"
          key="会员"
          selected={selectedTab === 'vip'}
          onPress={() => { press('vip'); }}
        >
          <VipPage />
        </TabBar.Item>
        <TabBar.Item
          // eslint-disable-next-line
          icon={<Icon type={require('./../assets/svg/tab_bar/财富.svg')} />}
          // eslint-disable-next-line
          selectedIcon={<Icon type={require('./../assets/svg/tab_bar/财富按下.svg')} />}
          title="我的"
          key="我的"
          selected={selectedTab === 'user'}
          onPress={() => { press('user'); }}
        >
          <UserPage />
        </TabBar.Item>
      </TabBar>
    </div>
  );
}


export default connect(mapStateToProps)(IndexPage);
