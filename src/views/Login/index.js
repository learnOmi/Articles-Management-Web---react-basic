import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import React, { Component } from 'react'
import {hookWrapper} from 'utils/singlehookwrapper'
import {useLocation, useNavigate} from 'react-router-dom';
import styles from './index.module.scss'
// 图片必须import后才能使用，不能使用相对路径
import logo from 'assets/logo.png'
import { login } from 'apis/user'
import { setToken } from 'utils/storage'


class Login extends Component {
  state = {
    loading: false,
    profile: {}
  }

  render() {
    return (
      <div className={styles['login']}>
        <Card className='login-container'>
          <img src={logo} alt='' className='login-logo'></img>
          <Form size='Large' 
            validateTrigger={['onChange', 'onBlur']} 
            onFinish={this.onConfirm}
            initialValues={{ mobile: '13811111111', code: '386454,', agree: true }}>
            <Form.Item name='mobile' rules={[
                // 单条rule的validateTrigger值必须是Form.Item或Form的validateTrigger的子集
                { required: true, message: 'Please input your mobile number!', validateTrigger: 'onBlur' }, 
                { pattern: /^1[3-9]\d{9}$/, message: 'Please input a valid mobile number!', validateTrigger: 'onBlur' }
              ]}>
              <Input placeholder='mobile number' autoComplete='off'></Input>
            </Form.Item>
            <Form.Item name="code" rules={[
                { required: true, message: "Please input your verify code!", validateTrigger:"onBlur" }, 
                { pattern: /^\d{6}$/, message: 'Please input a valid verify code!', validateTrigger: 'onBlur' }
              ]}>
              <Input placeholder='verify code' autoComplete='off'></Input>
            </Form.Item>
            <Form.Item valuePropName='checked' name='agree' rules={[
                //{required: true, message: 'Please agree to the User Privicay Agreement and Terms!' },
                // _：占位符，表示忽略第一个参数 rule（因为代码中未使用它）
                { validator: (_, value) => {
                    if (value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Please agree to the User Privicay Agreement and Terms!'));
                  }
                }
              ]}>
              <Checkbox>I agree to User Privicay Agreement and Terms</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' loading={this.state.loading} block>Login</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }


  onConfirm = async ({mobile, code}) => {
    this.setState({ loading: true });
    try {
      // 调用登录接口
      const res = await login(mobile, code);
      //localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      message.success('Login successful!',1);
      // 获取Navigate组件的state属性
      const { state } = this.props.useLocation || {};
      // 如果state存在且有from属性，则跳转到from，否则跳转到/layout
      //this.props.history.push('/home'); 在 React Router v6（与 React 18/19 兼容的最新版本）中，this.props.history 已被废弃，以下是新的解决方案：
      // 使用高阶组件注入的navigate函数进行路由跳转
      const { from } = state ? state : {};
      if(from){
        this.props.useNavigate(from, {state:{from:from}});
      }else{
        this.props.useNavigate('/layout')
      }
    } catch (error) {
      this.setState({ loading: false });
      message.warning(error?.response?.data.message,2);
    }
  };
}


export default hookWrapper(Login, useNavigate, useLocation);