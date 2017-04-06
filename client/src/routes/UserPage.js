import React from 'react';
import { connect } from 'dva';
import Logout from './../components/Login/Logout';
import styles from './UserPage.css';

function UserPage() {
  return (
    <div className={styles.normal}>
      Route Component: UserPage
      <Logout />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(UserPage);
