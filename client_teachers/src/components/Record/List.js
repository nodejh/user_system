import React from 'react';
import { connect } from 'dva';
import {
  Card,
  WhiteSpace,
  WingBlank,
  Result,
  Icon,
  Badge,
  Accordion,
} from 'antd-mobile';
import { datetimeToString } from './../../utils/timeFormat';
import CommnetInfo from './CommentInfo';
import Pagination from './Pagination'
import styles from './List.css';


function getConfirmStateBadge(status) {
  let badge;
  switch (status) {
    case 1:
      badge = (
        <Badge
          text="已确认"
          style={{ marginLeft: 12, padding: '0 0.06rem', backgroundColor: '#21b68a', borderRadius: 2 }}
        />
      );
      break;
    case 0:
      badge = (
        <Badge
          text="待确认"
          style={{ marginLeft: 12, padding: '0 0.06rem', backgroundColor: '#f19736', borderRadius: 2 }}
        />
      );
      break;
    default:
      badge = (
        <Badge
          text="待确认"
          style={{ marginLeft: 12, padding: '0 0.06rem', backgroundColor: '#f19736', borderRadius: 2 }}
        />
      );
  }
  return badge;
}

function List({ list, page, pageCount }) {
  console.log('list: ', list);
  console.log('page: ', page);
  console.log('pageCount: ', pageCount);
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
                title="暂无咨询记录"
                message=""
              />
            </WingBlank>
          </div>
        ) :
        list.map((item, index) => {
          const comment = {
            recordId: item.id,
            commentContent: item.comment_content,
            commentLevel: item.comment_level,
          };
          console.log('item: ', item);
          return (
            <div key={index}>
              <WingBlank>
                <WhiteSpace size="lg" />
                <Card>
                  <Card.Header
                    title={datetimeToString(new Date(item.record_time))}
                    extra={<span>{getConfirmStateBadge(item.is_vip_confirm)}</span>}
                  />
                  <Card.Body>
                    <p>{item.content}</p>
                    <WhiteSpace size="lg" />
                    <Accordion
                      accordion
                      style={{
                        marginTop: 10,
                        border: 0,
                      }}
                    >
                      <Accordion.Panel
                        header={`会员 ${item.realname}`}
                        style={{ border: 0 }}
                      >
                        <p>性别: {item.gender}</p>
                        <p>年级: {item.grade}</p>
                        <p>院系: {item.college} {item.major}</p>
                        <p>QQ: {item.qq}</p>
                        <p>手机: {item.phone}</p>
                        <p>学校: {item.school}</p>
                        <WhiteSpace />
                      </Accordion.Panel>
                    </Accordion>
                    {
                      item.is_vip_confirm === 1 && <CommnetInfo comment={comment} />
                    }
                  </Card.Body>
                </Card>
              </WingBlank>
            </div>
          );
        })
      }
      <WingBlank>
        <WhiteSpace size="xl" />
        <Pagination page={page} pageCount={pageCount} />
      </WingBlank>
      <WhiteSpace size="xl" />
    </div>
  );
}


function mapStateToProps(state) {
  const { list, page, pageCount } = state.record;
  return {
    list,
    page,
    pageCount,
  };
}


export default connect(mapStateToProps)(List);
