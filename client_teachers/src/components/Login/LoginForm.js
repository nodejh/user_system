import React from 'react';
import { connect } from 'dva';
import {
  WhiteSpace,
  List,
  InputItem,
  Button,
  WingBlank,
  Toast,
} from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './LoginForm.css';


function mapStateToProps(state) {
  return {
    loading: state.loading.models.login,
  };
}


function LoginForm({ dispatch, loading, school, form }) {
  const { getFieldProps } = form;
  const submit = (e) => {
    e.preventDefault();
    form.validateFields((error, values) => {
      if (!values.number) {
        return Toast.fail('学号不能为空', 1);
      }
      if (!values.password) {
        return Toast.fail('密码不能为空', 1, null, false);
      }
      dispatch({ type: 'login/submit', payload: { school, ...values } });
    });
  };
  return (
    <div className={styles.normal}>
      <List>
        <WhiteSpace size="lg" />
        <InputItem
          {...getFieldProps('number', {
            rules: [{
              required: true, message: '学号不能为空',
            }],
          })}
          clear
          type="number"
          placeholder="请输入您的学号"
        >
          学号
        </InputItem>
        <InputItem
          {...getFieldProps('password', {
            rules: [{
              required: true, message: '密码不能为空',
            }],
          })}
          clear
          type="password"
          placeholder="请输入您的教务系统密码"
        >
          密码
        </InputItem>
      </List>
      <WhiteSpace size="xl" />
      <WingBlank>
        <Button
          className="btn"
          type="primary"
          loading={loading}
          onClick={submit}
        >
          登录
        </Button>
      </WingBlank>
    </div>
  );
}

export default connect(mapStateToProps)(createForm()(LoginForm));
