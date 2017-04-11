import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { TextareaItem, WhiteSpace, Picker, List, Button, Toast } from 'antd-mobile';
import { commentLevelList } from './../../utils/constants';
import styles from './Comment.css';


function mapStateToProps(state) {
  const { info } = state.record;
  return {
    loading: state.loading.models.record,
    info,
  };
}


function Comment({ dispatch, comment, form }) {
  const { getFieldProps } = form;
  const { commentContent, commentLevel, recordId } = comment;
  const onSubmit = (e) => {
    e.preventDefault();
    form.validateFields((error, values) => {
      const level = values.comment_level && values.comment_level.join(',');
      if (!level) {
        Toast.fail('请选择满意程度', 1);
        return false;
      }
      // console.log('values: ', values);
      dispatch({ type: 'record/comment', payload: { commentInfo: { ...values, comment_level: level }, recordId } });
    });
  };

  return (
    <div className={styles.normal}>
      <WhiteSpace />
      <h3 style={{ paddingLeft: '0.3rem' }}>我的评价</h3>
      <Picker
        data={commentLevelList}
        cols={1}
        {...getFieldProps('comment_level', {
          initialValue: [commentLevel],
        })}
        className="forss"
      >
        <List.Item arrow="horizontal">满意程度</List.Item>
      </Picker>
      <TextareaItem
        style={{ border: '1px solid #ddd' }}
        {...getFieldProps('comment_content', {
          initialValue: commentContent || '',
        })}
        rows={5}
        count={1000}
        placeholder="请输入您的评价"
      />
      <WhiteSpace size="xl" />
      <Button
        className="btn"
        type="primary"
        onClick={onSubmit}
      >
        确认并评价
      </Button>
      <WhiteSpace size="xl" />
    </div>
  );
}

export default connect(mapStateToProps)(createForm()(Comment));
