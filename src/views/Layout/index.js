import React, { Component } from 'react'
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss'
import { LaptopOutlined, LogoutOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { hookWrapper } from 'utils/singlehookwrapper';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;
const sideMenu = [
  {name:"数据概览",url:"/layout/home"}, 
  {name:"文章管理",url:"/layout/article"},
  {name:"内容管理",url:"/layout/article-publish"}
];

const items = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `side${key}`,
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

const defaultSelectedKeys = items[0].key



class LayoutComponent extends Component {
  state = {
    colorBgContainer : this.props.useToken.token.colorBgContainer,
    borderRadiusLG: this.props.useToken.token.borderRadiusLG
  }

  render() {
    return (
      <div className={styles.layout}>
        <Layout>
          <Header className='header'>
            <div className="logo" />
            <div className='profile'>
              <span>用户</span>
              <span><LogoutOutlined></LogoutOutlined> 退出</span>
            </div>
          </Header>
          <Layout>
            <Sider width={200} style={{ background: this.colorBgContainer }}>
              <Menu
                theme='dark'
                mode="inline"
                defaultSelectedKeys={defaultSelectedKeys}
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
}


export default hookWrapper(LayoutComponent, useNavigate, theme.useToken);