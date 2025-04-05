import React, { useState, useContext, useEffect } from 'react';
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
import { AuthContext } from '../contexts/AuthContext';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [collapsed, setCollapsed] = useState(true);
  const { isLoggedIn: authContextLoggedIn } = useContext(AuthContext);
  
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
  
  // 添加鼠标悬停处理函数
  const handleMouseEnter = () => {
    setCollapsed(false);
  };
  
  const handleMouseLeave = () => {
    setCollapsed(true);
  };

  useEffect(() => {
    // 侧边栏状态改变时更新body类
    if (collapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
    
    // 添加类以标识侧边栏展开状态
    const sidebarElement = document.querySelector('.sidebar');
    if (sidebarElement) {
      if (collapsed) {
        sidebarElement.classList.remove('ant-layout-sider-expanded');
      } else {
        sidebarElement.classList.add('ant-layout-sider-expanded');
      }
    }
  }, [collapsed]);
  
  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: 'services',
      icon: <AppstoreOutlined />,
      label: '业务办理',
    },
    {
      key: 'faq',
      icon: <QuestionCircleOutlined />,
      label: '百问百答',
    },
  ];
  
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

  return (
    <div className="sidebar-container">
      <Sider
        className="sidebar"
        collapsible
        collapsed={collapsed}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        trigger={null} // 移除触发器，使用鼠标悬停代替
        collapsedWidth={60}
        width={180}
      >
        <div className="logo">
          <img 
            src="/logo.png" 
            alt="北美生活" 
            className="company-logo" 
          />
        </div>
        {!collapsed && <Divider style={{ margin: '0 0 16px 0' }} />}
        <Menu
          mode="inline"
          items={menuItems}
          defaultSelectedKeys={['home']}
          className="sidebar-menu"
          inlineCollapsed={collapsed}
        />
        <div className="user-menu">
          <Dropdown menu={{ items: userMenuItems }} placement="topCenter" trigger={['click']}>
            {isLoggedIn ? (
              <div className="user-info">
                <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
                <span className="username">{username}</span>
              </div>
            ) : (
              <Button type="text" icon={<LoginOutlined />} className="login-button">
                {!collapsed && '登录'}
              </Button>
            )}
          </Dropdown>
        </div>
        {!collapsed && (
          <div className="company-info">
            <p>© 2024 北美生活</p>
            <p>专业美国公司注册服务</p>
          </div>
        )}
      </Sider>
      <div 
        className="collapse-button" 
        style={{ 
          left: collapsed ? '50px' : '170px' 
        }}
      >
        {collapsed ? <RightOutlined style={{ fontSize: '12px' }} /> : <LeftOutlined style={{ fontSize: '12px' }} />}
      </div>
    </div>
  );
};

export default Sidebar; 