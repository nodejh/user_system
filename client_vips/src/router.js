import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import UserPage from './routes/UserPage';
import RecordPage from './routes/RecordPage';
import TeacherPage from './routes/TeacherPage';
import LoginPage from './routes/LoginPage';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/UserPage" component={UserPage} />
      <Route path="/RecordPage" component={RecordPage} />
      <Route path="/TeacherPage" component={TeacherPage} />
      <Route path="/login" component={LoginPage} />
    </Router>
  );
}

export default RouterConfig;
