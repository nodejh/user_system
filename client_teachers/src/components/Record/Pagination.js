import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import styles from './Pagination.css';

function Pagination({ dispatch, page, pageCount }) {
  console.log('page, pageCount: ', page, pageCount);
  const onPress = (newPage) => {
    dispatch({ type: 'record/getList', payload: { page: newPage } })
  };
  return (
    <div className={styles.normal}>
      {
        page > 1 &&
        <Button
          type="ghost"
          inline size="small"
          style={{ marginRight: '0.08rem' }}
          onClick={() => onPress(page - 1)}
        >
          上一页
        </Button>
      }
      {
        page < pageCount && pageCount > 1 &&
        <Button
          type="ghost"
          inline size="small"
          style={{ marginRight: '0.08rem' }}
          onClick={() => onPress(page + 1)}
        >
          下一页
        </Button>
      }
    </div>
  );
}

export default connect()(Pagination);
