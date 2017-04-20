import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Icon } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import App from './components/App';
import Teacher from './components/Teacher';
import Vip from './components/Vip';
import Record from './components/Record';


const { Header, Content, Footer, Sider } = Layout;


ReactDOM.render(
  <Router>
    <Layout style={{ height: '100vh' }}>
      <Sider style={{ overflow: 'auto' }}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/" style={{ color: '#fff' }}>
              <Icon type="home" />
              <span className="nav-text">首页</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/teacher" style={{ color: '#fff' }}>
              <Icon type="contacts" />
              <span className="nav-text">咨询师列表</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/vip" style={{ color: '#fff' }}>
              <Icon type="user" />
              <span className="nav-text">会员列表</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/record" style={{ color: '#fff' }}>
              <Icon type="edit" />
              <span className="nav-text">咨询记录</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, textAlign: 'center' }}>炫青教育</Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', textAlign: 'center', minHeight: 500 }}>
            {/* 路由 */}
            <Route path="/" exact component={App} />
            <Route path="/teacher" component={Teacher} />
            <Route path="/vip" component={Vip} />
            <Route path="/record" component={Record} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©2017 Created by <a href="#">炫青教育</a>
        </Footer>
      </Layout>
    </Layout>
  </Router>,
  document.getElementById('root')
);
