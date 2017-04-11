import React from 'react';
import { connect } from 'dva';
import RecordList from './../components/Record/List';
import styles from './RecordPage.css';

function RecordPage() {
  return (
    <div className={styles.normal}>
      <RecordList />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(RecordPage);
