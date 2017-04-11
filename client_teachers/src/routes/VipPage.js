import React from 'react';
import { connect } from 'dva';
import VipList from './../components/Vip/List';
import styles from './VipPage.css';

function VipPage() {
  return (
    <div className={styles.normal}>
      <VipList />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(VipPage);
