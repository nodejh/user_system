import React from 'react';
import { connect } from 'dva';
import { TabBar, NavBar } from 'antd-mobile';
import TeacherPage from './TeacherPage';
import RecordPage from './RecordPage';
import UserPage from './UserPage';
import styles from './IndexPage.css';


function mapStateToProps(state) {
  const { selectedTab, hidden } = state.index;
  return { selectedTab, hidden };
}


function IndexPage({ dispatch, selectedTab }) {
  return (
    <div className={styles.normal}>
      <NavBar>炫青教育</NavBar>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        <TabBar.Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
          title="咨询记录"
          key="咨询记录"
          selected={selectedTab === 'record'}
          onPress={() => { dispatch({ type: 'index/changeTab', payload: 'record' }); }}
        >
          <TeacherPage />
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
          title="咨询师"
          key="咨询师"
          selected={selectedTab === 'teacher'}
          onPress={() => { dispatch({ type: 'index/changeTab', payload: 'teacher' }); }}
        >
          <RecordPage />
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
          title="我的"
          key="我的"
          selected={selectedTab === 'user'}
          onPress={() => { dispatch({ type: 'index/changeTab', payload: 'user' }); }}
        >
          <UserPage />
        </TabBar.Item>
      </TabBar>
    </div>
  );
}

IndexPage.propTypes = {
};


export default connect(mapStateToProps)(IndexPage);
