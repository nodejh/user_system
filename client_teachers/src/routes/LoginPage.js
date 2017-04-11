import React from 'react';
import { connect } from 'dva';
import {
  Tabs,
  NavBar,
  WhiteSpace,
} from 'antd-mobile';
import styles from './LoginPage.css';
import LoginForm from './../components/Login/LoginForm';

const TabPane = Tabs.TabPane;


function LoginPage() {
  return (
    <div className={styles.normal}>
      <NavBar iconName="false">炫青教育(咨询师)</NavBar>
      <Tabs
        defaultActiveKey="1"
        pageSize={3}
        className={styles.tabs}
      >
        <TabPane tab="四川大学" key="1">
          <div className={styles.tabPanel}>
            <LoginForm school="四川大学" />
          </div>
        </TabPane>
        <TabPane tab="成都理工大学" key="2">
          <div className={styles.tabPanel}>
            <LoginForm school="成都理工大学" />
          </div>
        </TabPane>
        <TabPane tab="西南交通大学" key="3">
          <div className={styles.tabPanel}>
            <LoginForm school="西南交通大学" />
          </div>
        </TabPane>
      </Tabs>
      <WhiteSpace />
    </div>
  );
}


export default connect()(LoginPage);
