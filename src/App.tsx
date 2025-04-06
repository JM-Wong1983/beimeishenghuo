import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import Calculator from './components/Calculator';
import CertificatePreview from './components/CertificatePreview';
import './App.css';

// 定义共享状态接口
export interface CompanyInfo {
  state: string;
  companyName: string;
  ownerName: string;
  registrationNumber: string;
  registrationDate: string;
  address: string;
  phone: string;
  email: string;
  businessScope: string;
  companyType: 'CORP' | 'LLC' | 'NONPROFIT';
}

// 定义侧边栏切换事件接口
interface SidebarToggleEvent extends CustomEvent {
  detail: { collapsed: boolean };
}

const App = () => {
  // 创建共享状态
  const [companyInfo, setCompanyInfo] = useState({
    state: 'Colorado',
    companyName: '示例公司名称 LLC',
    ownerName: '张三',
    registrationNumber: 'L123456789',
    registrationDate: '2024年3月30日',
    address: '123 Main St, Denver, CO 80202',
    phone: '',
    email: '',
    businessScope: '',
    companyType: 'CORP' as 'CORP' | 'LLC' | 'NONPROFIT'
  });
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 监听侧边栏折叠状态变化
  useEffect(() => {
    const handleSidebarToggle = (event: SidebarToggleEvent) => {
      setSidebarCollapsed(event.detail.collapsed);
    };
    
    window.addEventListener('sidebarToggle', handleSidebarToggle as EventListener);
    
    return () => {
      window.removeEventListener('sidebarToggle', handleSidebarToggle as EventListener);
    };
  }, []);

  // 更新公司信息的函数
  const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
    setCompanyInfo(prevInfo => ({
      ...prevInfo,
      ...info
    }));
  };

  return (
    <Layout className="app-container">
      <Sidebar />
      <Layout className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="content-container">
          <div className={`side-section ${sidebarCollapsed ? 'expanded' : ''}`}>
            <ChatInterface />
          </div>
          <div className="chat-section">
            <Calculator companyInfo={companyInfo} updateCompanyInfo={updateCompanyInfo} />
          </div>
          <div className="form-section">
            <CertificatePreview companyInfo={companyInfo} />
          </div>
        </div>
      </Layout>
    </Layout>
  );
};

export default App; 