import React from 'react';
import { WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { connect } from 'dva';
import InfoShow from './InfoShow';
import InfoEdit from './InfoEdit';
import styles from './Info.css';

function mapStateToProps(state) {
  const { editable } = state.user;
  return {
    loading: state.loading.models.user,
    editable,
  };
}

function Info({ dispatch, editable }) {
  const onEdit = () => {
    dispatch({ type: 'user/editable' });
  };

  return (
    <div className={styles.normal}>
      <WhiteSpace size="xl" />
      <div>
        <WingBlank>
          <span style={{ fontSize: '1.1em' }}>个人信息</span>
          <Button
            type="primary"
            inline
            size="small"
            style={{ marginRight: '0.08rem', float: 'right' }}
            onClick={onEdit}
          >
            { editable ? '取消' : '编辑' }
          </Button>
        </WingBlank>
      </div>
      <WhiteSpace size="xl" />
      {
        editable ? <InfoEdit /> : <InfoShow />
      }
    </div>
  );
}


export default connect(mapStateToProps)(Info);
