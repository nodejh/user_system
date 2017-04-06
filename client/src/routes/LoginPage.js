import React from 'react';
import { connect } from 'dva';
import styles from './LoginPage.css';

function LoginPage() {
  return (
    <div className={styles.normal}>
      Route Component: LoginPage
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(LoginPage);
