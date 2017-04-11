import React from 'react';
import { connect } from 'dva';
import { Card, WhiteSpace, WingBlank, Result, Icon } from 'antd-mobile';
import styles from './List.css';


function List({ list }) {
  return (
    <div className={styles.normal}>
      {
        list.length === 0 ?
        (
          <div className={styles.noTeacherTips}>
            <WingBlank>
              <Result
                img={<Icon
                  // eslint-disable-next-line
                  type={require('./../../assets/svg/结果页icon/等待处理.svg')}
                  style={{ width: '1.2rem', height: '1.2rem' }}
                />}
                title="暂无会员"
                message=""
              />
            </WingBlank>
          </div>
        ) :
        list.map((item, index) => {
          return (
            <div key={index}>
              <WingBlank>
                <WhiteSpace size="lg" />
                <Card>
                  <Card.Header
                    title={item.realname}
                    extra={<span>{item.school}</span>}
                  />
                  <Card.Body>
                    <p>学校: {item.school}</p>
                    <p>学号: {item.number}</p>
                    <p>年级: {item.grade}</p>
                    <p>院系: {item.college} {item.major}</p>
                    <p>QQ: {item.qq}</p>
                    <p>手机: {item.phone}</p>
                  </Card.Body>
                </Card>
              </WingBlank>
            </div>
          );
        })
      }
    </div>
  );
}


function mapStateToProps(state) {
  const { list } = state.vip;
  return {
    list,
  };
}


export default connect(mapStateToProps)(List);
