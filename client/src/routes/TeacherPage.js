import React from 'react';
import { connect } from 'dva';
import styles from './TeacherPage.css';

function TeacherPage() {
  return (
    <div className={styles.normal}>
      暂无咨询师
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(TeacherPage);
