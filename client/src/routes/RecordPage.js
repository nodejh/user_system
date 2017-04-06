import React from 'react';
import { connect } from 'dva';
import styles from './RecordPage.css';

function RecordPage() {
  return (
    <div className={styles.normal}>
      Route Component: RecordPage
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(RecordPage);
