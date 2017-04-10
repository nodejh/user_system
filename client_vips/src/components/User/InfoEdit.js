import React from 'react';
import { createForm } from 'rc-form';
import { Picker, List, InputItem, WhiteSpace, Button, Checkbox } from 'antd-mobile';
import { connect } from 'dva';
import {
  schoolList,
  genderList,
  intentionList,
  categoryList,
} from './../../utils/constants';
import styles from './InfoEdit.css';


function mapStateToProps(state) {
  const { info } = state.user;
  return {
    loading: state.loading.models.user,
    info,
  };
}


function InfoEdit({ dispatch, info, form }) {
  const { getFieldProps } = form;
  const onSubmit = (e) => {
    e.preventDefault();
    form.validateFields((error, values) => {
      const gender = values.gender && values.gender.join(',');
      const intention = values.intention && values.intention.join(',');
      const category = values.category && values.category.join(',');
      const school = values.school && values.school.join(',');
      dispatch({ type: 'user/update', payload: { ...values, gender, intention, category, school } });
    });
  };
  return (
    <div className={styles.normal}>
      <List renderHeader={() => '基本信息'}>
        <InputItem
          {...getFieldProps('realname', {
            initialValue: info.realname,
          })}
          placeholder="请输入您的真实姓名"
        >
          姓名
        </InputItem>
        <Picker
          data={genderList}
          cols={1}
          {...getFieldProps('gender', {
            initialValue: [info.gender],
          })}
          className="forss"
        >
          <List.Item arrow="horizontal">性别</List.Item>
        </Picker>
        <Picker
          data={schoolList}
          cols={1}
          {...getFieldProps('school', {
            initialValue: [info.school],
          })}
          className="forss"
        >
          <List.Item arrow="horizontal">学校</List.Item>
        </Picker>
        <InputItem
          {...getFieldProps('grade', {
            initialValue: info.grade,
          })}
          placeholder="请输入您的年级"
        >
          年级
        </InputItem>
        <InputItem
          {...getFieldProps('college', {
            initialValue: info.college,
          })}
          clear
          placeholder="请输入您的学院"
        >
          学院
        </InputItem>
        <InputItem
          {...getFieldProps('major', {
            initialValue: info.major,
          })}
          placeholder="请输入您的专业"
        >
          专业
        </InputItem>
      </List>

      <List renderHeader={() => '咨询信息'}>
        <InputItem
          {...getFieldProps('qq', {
            initialValue: info.qq,
          })}
          placeholder="请输入您的QQ号码"
        >
          QQ
        </InputItem>
        <InputItem
          {...getFieldProps('phone', {
            initialValue: info.phone,
          })}
          placeholder="请输入您的手机号码"
        >
          手机
        </InputItem>
        <Picker
          data={categoryList}
          cols={1}
          {...getFieldProps('category', {
            initialValue: [info.category],
          })}
          className="forss"
        >
          <List.Item arrow="horizontal">类别</List.Item>
        </Picker>
        <Picker
          data={intentionList}
          cols={1}
          {...getFieldProps('intention', {
            initialValue: [info.intention],
          })}
          className="forss"
        >
          <List.Item arrow="horizontal">意向</List.Item>
        </Picker>
        {/* <List.Item>
          {categoryList.map(i => (
            <CheckboxItem
              key={i.value}
              checked={i.value.indexOf(info.category)}
            >
              {i.label}
            </CheckboxItem>
          ))}
          </List.Item>
          <List.Item>
          意向
          {intentionList.map(i => (
            <CheckboxItem
              key={i.value}
              checked={i.value.indexOf(info.intention)}
            >
              {i.label}
            </CheckboxItem>
          ))}
        </List.Item> */}
      </List>
      <WhiteSpace size="xl" />
      <Button
        className="btn"
        type="primary"
        onClick={onSubmit}
      >
        保存
      </Button>
      <WhiteSpace size="xl" />
    </div>
  );
}


export default connect(mapStateToProps)(createForm()(InfoEdit));
