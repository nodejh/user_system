import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import styles from './Logout.css';

function Logout({ dispatch }) {
  const handleClick = () => {
    dispatch({ type: 'login/logout' });
  };

  return (
    <div className={styles.normal}>
      <Button
        className="btn"
        size="small"
        style={{ borderRadius: 0, marginTop: 50, marginBottom: 150 }}
        onClick={handleClick}
      >
        退出我的账号
      </Button>
    </div>
  );
}


export default connect()(Logout);
