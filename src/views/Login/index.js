import { Card } from 'antd'
import React, { Component } from 'react'
import './index.css'
// 图片必须import后才能使用，不能使用相对路径
import logo from '../../assets/logo.png'

export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <Card className='login-container'>
          <img src={logo} alt='' className='login-logo'></img>
          <p>Username</p>
          <input type="text" />
          <p>Password</p>
          <input type="password" />
          <br />
          <button style={{ marginTop: 20 }}>Login</button>
        </Card>
      </div>
    )
  }
}
