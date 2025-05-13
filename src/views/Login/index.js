import { Card, Form, Input, Button, Checkbox } from 'antd'
import React, { Component } from 'react'
import './index.scss'
// 图片必须import后才能使用，不能使用相对路径
import logo from 'assets/logo.png'


export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <Card className='login-container'>
          <img src={logo} alt='' className='login-logo'></img>
          <Form size='Large' validateTrigger={['onChange', 'onBlur']} onFinish={this.onFinish}>
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
              <Button type='primary' htmlType='submit' block>Login</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }

  onFinish = (values) => {
    console.log('Success:', values);
  };
}
