import React from 'react';
import { WhiteSpace } from 'antd-mobile';
import styles from './CommentInfo.css';

function CommentInfo({ comment }) {
  const { commentContent, commentLevel } = comment;
  return (
    <div className={styles.normal}>
      <WhiteSpace />
      <h3 style={{ paddingLeft: '0.3rem', fontWeight: 400 }}>我的评价</h3>
      <p>满意程度: {commentLevel}</p>
      <pre
        style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
      >
        评价内容: {commentContent || '暂无'}
      </pre>
    </div>
  );
}

export default CommentInfo;
