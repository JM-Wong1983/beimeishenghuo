import React, { useState } from 'react';
import { Layout, Menu, Divider, Button, Dropdown, Avatar } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  SettingOutlined,
  LoginOutlined,
  LogoutOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import './Sidebar.css';

const { Sider } = Layout;

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  
  // 模拟登录功能
  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername('张三');
  };
  
  // 模拟退出登录
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };
  
  // 切换侧边栏收起/展开状态
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    // 触发自定义事件通知其他组件侧边栏状态已改变
    const event = new CustomEvent('sidebarToggle', { detail: { collapsed: !collapsed } });
    window.dispatchEvent(event);
  };
  
  // 使用 JSX 元素直接定义菜单项，而不是使用配置对象
  const renderMenu = () => (
    <Menu
      mode="vertical"
      defaultSelectedKeys={['home']}
      className="sidebar-menu"
      inlineCollapsed={collapsed}
    >
      <Menu.Item key="home" icon={<HomeOutlined />}>
        首页
      </Menu.Item>
      <Menu.Item key="services" icon={<AppstoreOutlined />}>
        业务办理
      </Menu.Item>
      <Menu.Item key="faq" icon={<QuestionCircleOutlined />}>
        百问百答
      </Menu.Item>
    </Menu>
  );
  
  // 用户菜单项
  const userMenuItems = [
    ...(isLoggedIn 
      ? [
          { key: 'account', icon: <UserOutlined />, label: '账号信息' },
          { key: 'settings', icon: <SettingOutlined />, label: '设置' },
          { type: 'divider' },
          { key: 'logout', icon: <LogoutOutlined />, label: '退出登录', onClick: handleLogout }
        ]
      : [
          { key: 'login', icon: <LoginOutlined />, label: '登录', onClick: handleLogin }
        ])
  ];

  // Logo URL
  const logoUrl = process.env.PUBLIC_URL + '/logo.png';

  return (
    <div className="sidebar-container">
      <div 
        className="collapse-button" 
        onClick={toggleCollapsed} 
        style={{ 
          left: collapsed ? '46px' : '166px',
          top: '18px'
        }}
      >
        {collapsed ? <RightOutlined style={{ fontSize: '12px' }} /> : <LeftOutlined style={{ fontSize: '12px' }} />}
      </div>
      <Sider 
        width={180} 
        collapsedWidth={60}
        collapsed={collapsed}
        className="sidebar"
      >
        <div className="logo">
          {collapsed ? (
            <Avatar 
              src="/logo.png" 
              alt="北美生活" 
              size={36} 
              style={{ margin: '12px' }}
            />
          ) : (
            <img 
              src="/logo.png" 
              alt="北美生活" 
              className="company-logo" 
            />
          )}
        </div>
        <Divider style={{ margin: '0 0 16px 0', display: collapsed ? 'none' : 'block' }} />
        {renderMenu()}
        <div className="user-menu">
          <Dropdown menu={{ items: userMenuItems }} placement="topCenter" trigger={['click']}>
            {isLoggedIn ? (
              <div className="user-info">
                <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
                {!collapsed && <span className="username">{username}</span>}
              </div>
            ) : (
              <Button type="text" icon={<LoginOutlined />} className="login-button">
                {!collapsed && '登录'}
              </Button>
            )}
          </Dropdown>
        </div>
        <div className="company-info" style={{ display: collapsed ? 'none' : 'block' }}>
          <p>© 2024 北美生活</p>
          <p>专业美国公司注册服务</p>
        </div>
      </Sider>
    </div>
  );
};

export default Sidebar; 