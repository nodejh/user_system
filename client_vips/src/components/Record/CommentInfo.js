import React from 'react';
import { WhiteSpace } from 'antd-mobile';
import styles from './CommentInfo.css';

function CommentInfo({ comment }) {
  const { commentContent, commentLevel } = comment;
  return (
    <div className={styles.normal}>
      <WhiteSpace />
      <h3 style={{ paddingLeft: '0.3rem' }}>我的评价</h3>
      <p>满意程度: {commentLevel}</p>
      <p>评价内容: {commentContent || '暂无'}</p>
    </div>
  );
}

export default CommentInfo;
