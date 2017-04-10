import React from 'react';
import { Card, Badge, List } from 'antd-mobile';
import { connect } from 'dva';
import moment from 'moment';
import styles from './InfoShow.css';


function mapStateToProps(state) {
  const { info } = state.user;
  console.log('info: ', info);
  return {
    loading: state.loading.models.user,
    info,
  };
}


function InfoShow({ info }) {
  let status;
  switch (info.status) {
    case 0:
      status = (
        <Badge
          text="已通过审核"
          style={{ marginLeft: 12, padding: '0 0.06rem', backgroundColor: '#21b68a', borderRadius: 2 }}
        />
      );
      break;
    case 1:
      status = (
        <Badge
          text="待审核"
          style={{ marginLeft: 12, padding: '0 0.06rem', backgroundColor: '#f19736', borderRadius: 2 }}
        />
      );
      break;
    case 2:
      status = (
        <Badge
          text="待审核"
          style={{ marginLeft: 12, padding: '0 0.06rem', backgroundColor: 'red', borderRadius: 2 }}
        />
      );
      break;
    default:
      status = (
        <Badge
          text="待审核"
          style={{ marginLeft: 12, padding: '0 0.06rem', backgroundColor: '#f19736', borderRadius: 2 }}
        />
      );
  }
  return (
    <div className={styles.normal}>
      <List renderHeader={() => '基本信息'}>
        <Card>
          <Card.Header
            title={`${info.realname} (${info.gender})`}
            extra={
              <span>
                {status}
              </span>
            }
          />
          <Card.Body>
            <p>学校: {info.school}</p>
            <p>学号: {info.number}</p>
            <p>年级: {info.grade}</p>
            <p>院系: {info.college} {info.major}</p>
          </Card.Body>
          <Card.Footer content={<div>注册时间: {moment(info.create_date).format('YYYY-MM-DD HH:mm:ss')}</div>} />
        </Card>
      </List>

      <List renderHeader={() => '咨询信息'}>
        <Card full>
          <Card.Body>
            <p>QQ: {info.qq}</p>
            <p>手机: {info.phone}</p>
            <p>类别: {info.category && info.category.split(',')}</p>
            <p>意向: {info.intention && info.intention.split(',')}</p>
          </Card.Body>
          <Card.Footer
            content={
              <div>
                会员到期时间: {info.expires && moment(info.expires).format('YYYY-MM-DD HH:mm:ss')}
              </div>
            }
          />
        </Card>
      </List>
    </div>
  );
}

export default connect(mapStateToProps)(InfoShow);
