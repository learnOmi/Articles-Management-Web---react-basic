import React, { Component } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import styles from './index.module.scss'
import { LaptopOutlined, LogoutOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, message, Popconfirm, theme } from 'antd';
import { hookWrapper } from 'utils/singlehookwrapper';
import { useNavigate } from 'react-router-dom';
import { removeToken } from 'utils/storage';
import { getUserInfo } from 'apis/user';
import { sideMenu } from 'apis/constants';

const { Header, Content, Sider } = Layout;

const items = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: sideMenu[index].url,
      icon: React.createElement(icon),
      label: sideMenu[index].name,
      url: sideMenu[index].url,
      // children: Array.from({ length: 4 }).map((_, j) => {
      //   const subKey = index * 4 + j + 1;
      //   return {
      //     key: subKey,
      //     label: `option${subKey}`,
      //   };
      // }),
    };
  },
);

const title = 'Are you sure to logout?'


class LayoutComponent extends Component {
  state = {
    colorBgContainer : this.props.useToken.token.colorBgContainer,
    borderRadiusLG : this.props.useToken.token.borderRadiusLG,
    profile : {},
    defaultSelectedKeys : this.props.useLocation.pathname
  }

  render() {
    return (
      <div className={styles.layout}>
        <Layout>
          <Header className='header'>
            <div className="logo" />
            <div className='profile'>
              <span>{this.state.profile?.name}</span>
              <span>
                <Popconfirm title={title} okText='Yes' cancelText='No' onConfirm={this.logOut} onCancel={()=>{}}>
                  <LogoutOutlined /> 退出
                </Popconfirm>
              </span>
            </div>
          </Header>
          <Layout>
            <Sider width={200} style={{ background: this.colorBgContainer }}>
              <Menu
                theme='dark'
                mode="inline"
                defaultSelectedKeys={this.state.defaultSelectedKeys}
                className='sider-menu'
                items={items}
                onClick={(e) => {
                  this.props.useNavigate(items.find(item => item.key === e.key).url);
                }}
              />
            </Sider>
            <Layout style={{padding:'24px'}}>
              <Content className='layout-content'>
                <Outlet />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }


  
  // componentDidMount() 是 React 组件生命周期中的一个方法
  // 在组件被挂载到 DOM 上后立即调用
  // 这个方法通常用于执行一些副作用操作，比如数据获取、订阅事件等
  // 在这个方法中，我们调用了 getUserInfo 函数来获取用户信息
  async componentDidMount() {
    const res = await getUserInfo();
    this.setState({profile: res?.data});
  }

  logOut = ()=>{
    //localStorage.removeItem('token');
    removeToken();
    this.props.useNavigate('/login');
    message.success('Logout successful!',1);
  };
}




export default hookWrapper(LayoutComponent, useNavigate, useLocation, theme.useToken);