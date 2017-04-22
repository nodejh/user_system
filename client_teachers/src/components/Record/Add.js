import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import {
  WhiteSpace,
  WingBlank,
  List,
  InputItem,
  Button,
  Toast,
  Accordion,
  Result,
  Icon,
  Badge,
  TextareaItem,
  DatePicker,
} from 'antd-mobile';
import moment from 'moment';
import 'moment/locale/zh-cn';
import ListHeader from './ListHeader';
import CommnetInfo from './CommentInfo';
import { datetimeToString } from './../../utils/datetime';
import styles from './Add.css';


const maxDate = moment('2020-12-31 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment().utcOffset(8);

/**
 * [getConfirmStateBadge description]
 * @param  {[type]} status [description]
 * @return {[type]}        [description]
 */
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


/**
 * 添加咨询记录
 * @param {Function} dispatch dispatch
 * @param {array} recordAndInfoByNumber  某会员的咨询记录列表
 * @param {object} form    form
 * @return {object} object
 */
function Add({ dispatch, list, recordAndInfoByNumber, form }) {
  // console.log('recordAndInfoByNumber: ', recordAndInfoByNumber);
  const { getFieldProps } = form;
  const getRecordAndInfo = (e) => {
    e.preventDefault();
    form.validateFields((error, values) => {
      const { number } = values;
      if (!number) {
        return Toast.fail('请先输入会员的学号', 1, null, false);
      }
      dispatch({ type: 'record/getRecordAndInfoByNumber', payload: { number } });
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    form.validateFields((error, values) => {
      console.log('values: ', values);
      console.log('recordAndInfoByNumber: ', recordAndInfoByNumber);
      const { info } = recordAndInfoByNumber;
      if (!info) {
        return Toast.fail('请先获取会员个人信息和咨询记录', 1, null, false);
      }
      const { id } = info;
      if (!id) {
        return Toast.fail('请先获取会员个人信息和咨询记录', 1, null, false);
      }
      const { date, content, number } = values;
      if (!number) {
        return Toast.fail('请输入会员学号', 1, null, false);
      }
      if (!date) {
        return Toast.fail('请输入跟进日期', 1, null, false);
      }
      if (!content) {
        return Toast.fail('请输入咨询详情', 1, null, false);
      }
      const payload = { id, date, number, content };
      dispatch({ type: 'record/add', payload });
    });
  };
  return (
    <div className={styles.normal}>
      <WhiteSpace size="xl" />
      <ListHeader test={111} list={list} />
      <WhiteSpace />
      <List renderHeader={() => ''}>
        <InputItem
          {...getFieldProps('number')}
          type="number"
          placeholder="请输入会员的学号"
        >
          学号
        </InputItem>
        <DatePicker
          mode="date"
          title="跟进日期"
          extra="请选择跟进日期"
          {...getFieldProps('date', {

          })}
          minDate={minDate}
          maxDate={maxDate}
        >
          <List.Item arrow="horizontal">跟进日期</List.Item>
        </DatePicker>
        <List.Item>
          <div style={{ textAlign: 'center' }}>
            <Button
              type="ghost"
              inline
              size="small"
              onClick={e => getRecordAndInfo(e)}
            >
              点击获取会员信息及咨询记录
            </Button>
          </div>
        </List.Item>
      </List>
      <WhiteSpace />
      {
        recordAndInfoByNumber.info && recordAndInfoByNumber.list &&
        (
          <Accordion accordion>
            <Accordion.Panel
              header={
                <span>
                  {`${recordAndInfoByNumber.info.realname} ${recordAndInfoByNumber.info.number}`}
                </span>
              }
              key={recordAndInfoByNumber.info.number}
            >
              <WingBlank>
                <p>学校: {recordAndInfoByNumber.info.school}</p>
                <p>性别: {recordAndInfoByNumber.info.gender}</p>
                <p>年级: {recordAndInfoByNumber.info.grade}</p>
                <p>院系: {recordAndInfoByNumber.info.college} {recordAndInfoByNumber.info.major}</p>
                <p>QQ: {recordAndInfoByNumber.info.qq}</p>
                <p>手机: {recordAndInfoByNumber.info.phone}</p>
                <WhiteSpace />
              </WingBlank>
              <WhiteSpace />
            </Accordion.Panel>
            {
              recordAndInfoByNumber.list.map((item, index) => {
                const comment = {
                  recordId: item.id,
                  commentContent: item.comment_content,
                  commentLevel: item.comment_level,
                };
                return (
                  <Accordion.Panel
                    header={
                      <span>
                        {datetimeToString(new Date(item.record_time))}
                        <span>{getConfirmStateBadge(item.is_vip_confirm)}</span>
                      </span>
                    }
                    key={index}
                  >
                    <WingBlank>
                      <p>跟进日期 {new Date(item.date).toLocaleDateString()}</p>
                      <pre
                        style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                      >
                        {item.content}
                      </pre>
                      <WhiteSpace />
                      {
                        item.is_vip_confirm === 1 && <CommnetInfo comment={comment} />
                      }
                    </WingBlank>
                    <WhiteSpace />
                  </Accordion.Panel>
                );
              })
            }
          </Accordion>
        )
      }
      {
        recordAndInfoByNumber.info && recordAndInfoByNumber.list.length === 0 &&
        (
          <div>
            <WhiteSpace size="lg" />
            <Result
              img={<Icon
                // eslint-disable-next-line
                type={require('./../../assets/svg/结果页icon/等待处理.svg')}
                style={{ width: '1.2rem', height: '1.2rem' }}
              />}
              title="暂无咨询记录"
              message=""
            />
          </div>
        )
      }
      {
        recordAndInfoByNumber.info &&
        (
          <div>
            <List renderHeader={() => '详细内容'}>
              <TextareaItem
                {...getFieldProps('content')}
                rows={10}
                count={3000}
                placeholder="请输入咨询的详细内容"
              />
            </List>
            <WhiteSpace size="lg" />
            <WingBlank>
              <Button
                className="btn"
                type="primary"
                onClick={e => onSubmit(e)}
              >
                保存
              </Button>
            </WingBlank>
          </div>
        )
      }
      <WhiteSpace size="xl" />
    </div>
  );
}


/**
 * [mapStateToProps description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function mapStateToProps(state) {
  const { list, recordAndInfoByNumber } = state.record;
  return {
    list,
    recordAndInfoByNumber,
  };
}

export default connect(mapStateToProps)(createForm()(Add));
