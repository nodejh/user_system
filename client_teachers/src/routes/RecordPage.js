import React from 'react';
import { connect } from 'dva';
import RecordList from './../components/Record/List';
import RecordAdd from './../components/Record/Add';
import styles from './RecordPage.css';

function RecordPage({ isShowAddRecord }) {
  return (
    <div className={styles.normal}>
      {
        isShowAddRecord ? <RecordAdd /> : <RecordList />
      }
    </div>
  );
}


/**
 * [mapStateToProps description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function mapStateToProps(state) {
  const { isShowAddRecord } = state.record;
  return {
    isShowAddRecord,
  };
}

export default connect(mapStateToProps)(RecordPage);
