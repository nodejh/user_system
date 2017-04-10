import React from 'react';
import { connect } from 'dva';
import UserInfo from './../components/User/Info';
import Logout from './../components/Login/Logout';
import styles from './UserPage.css';

function UserPage() {
  return (
    <div className={styles.normal}>
      <UserInfo />
      <Logout />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(UserPage);
