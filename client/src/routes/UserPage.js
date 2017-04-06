import React from 'react';
import { connect } from 'dva';
import styles from './UserPage.css';

function UserPage() {
  return (
    <div className={styles.normal}>
      Route Component: UserPage
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(UserPage);
