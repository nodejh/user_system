import React from 'react';
import { connect } from 'dva';
import { Flex, Button, WingBlank, Badge } from 'antd-mobile';
import { isToday } from './../../utils/datetime';
import styles from './ListHeader.css';

function ListHeader({ dispatch, list, test }) {
  let count = 0;
  list.forEach((item) => {
    if (isToday(new Date(item.record_time))) {
      count++;
    }
  });
  const onClick = () => {
    dispatch({ type: 'record/showAddRecord' });
  };
  return (
    <div className={styles.normal}>
      <WingBlank>
        <Flex>
          <Flex.Item>
            今日已咨询会员 <Badge text={`${count.toString()} 人`} />
          </Flex.Item>
          <Flex.Item>
            <Button
              type="primary"
              inline
              size="small"
              style={{ float: 'right', cursor: 'pointer' }}
              onClick={() => onClick()}
            >
              添加咨询记录
            </Button>
          </Flex.Item>
        </Flex>
      </WingBlank>
    </div>
  );
}


/**
 * [mapStateToProps description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function mapStateToProps(state) {
  const { list, page, pageCount } = state.record;
  return {
    list,
    page,
    pageCount,
  };
}


export default connect(mapStateToProps)(ListHeader);
