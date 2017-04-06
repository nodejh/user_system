import React from 'react';
import { connect } from 'dva';
import styles from './TeacherPage.css';

function TeacherPage() {
  return (
    <div className={styles.normal}>
      Route Component: TeacherPage
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(TeacherPage);
