import React from 'react';
import { connect } from 'dva';
import TeacherList from './../components/Teacher/List.js';
import styles from './TeacherPage.css';

function TeacherPage() {
  return (
    <div className={styles.normal}>
      <TeacherList />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(TeacherPage);
