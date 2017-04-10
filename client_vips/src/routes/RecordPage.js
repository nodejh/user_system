import React from 'react';
import { connect } from 'dva';
import styles from './RecordPage.css';

function RecordPage() {
  return (
    <div className={styles.normal}>
      暂无咨询记录
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(RecordPage);
