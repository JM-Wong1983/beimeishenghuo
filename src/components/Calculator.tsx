import React, { useState, useEffect } from 'react';
import { Card, Form, Select, Radio, Space, Input, Typography, Button, Dropdown, Menu, DatePicker, message, Divider } from 'antd';
import { DownOutlined, UserOutlined, MailOutlined, PhoneOutlined, BankOutlined, CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { CompanyInfo } from '../App';
import './Calculator.css';

const { Option } = Select;
const { Title, Text } = Typography;
const { TextArea } = Input;

interface PriceData {
  basePrice: number;
  addressPrices: {
    public: number;
    unique: number;
    custom: number;
  };
  boiPrice: number;
  sealPrice: number;
  einPrice: number;
  anonymousPrice: number;
  stateTaxes: Record<string, number>;
}

interface CalculatorProps {
  companyInfo: CompanyInfo;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
}

const Calculator = ({ companyInfo, updateCompanyInfo }: CalculatorProps) => {
  const [form] = Form.useForm();
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedState, setSelectedState] = useState(companyInfo.state || 'Colorado');
  const [selectedAddressType, setSelectedAddressType] = useState('public');
  const [needBoi, setNeedBoi] = useState(false);
  const [needSeal, setNeedSeal] = useState(false);
  const [needEin, setNeedEin] = useState(false);
  const [needAnonymous, setNeedAnonymous] = useState(false);
  const [companyType, setCompanyType] = useState(companyInfo.companyType || 'CORP');
  const [customAddress, setCustomAddress] = useState('');
  const [isCheckingName, setIsCheckingName] = useState(false);
  const [nameAvailable, setNameAvailable] = useState(null as boolean | null);
  const [businessService, setBusinessService] = useState('registration');

  // 模拟价格数据
  const priceData: PriceData = {
    basePrice: 299,
    addressPrices: {
      public: 99,
      unique: 199,
      custom: 0,
    },
    boiPrice: 99,
    sealPrice: 49,
    einPrice: 199,
    anonymousPrice: 299,
    stateTaxes: {
      'Delaware': 90,
      'Wyoming': 50,
      'Nevada': 75,
      'Florida': 125,
      'California': 800,
      'New York': 200,
      'Colorado': 150,
    }
  };

  const calculatePrice = () => {
    let price = priceData.basePrice;
    price += priceData.stateTaxes[selectedState] || 0;
    price += priceData.addressPrices[selectedAddressType as 'public' | 'unique' | 'custom'];
    
    if (needBoi) {
      price += priceData.boiPrice;
    }
    
    if (needSeal) {
      price += priceData.sealPrice;
    }
    
    if (needEin) {
      price += priceData.einPrice;
    }
    
    if (selectedState === 'Wyoming' && needAnonymous) {
      price += priceData.anonymousPrice;
    }
    
    setTotalPrice(price);
  };

  useEffect(() => {
    calculatePrice();
    // 更新App组件中的状态
    updateCompanyInfo({ 
      state: selectedState,
      companyType: companyType
    });
  }, [selectedState, selectedAddressType, needBoi, needSeal, needEin, needAnonymous, companyType, updateCompanyInfo]);

  // 状态选择下拉菜单
  const stateMenu = (
    <Menu 
      onClick={(e) => {
        setSelectedState(e.key);
      }}
      selectedKeys={[selectedState]}
    >
      <Menu.Item key="Delaware">特拉华州 (Delaware)</Menu.Item>
      <Menu.Item key="Wyoming">怀俄明州 (Wyoming)</Menu.Item>
      <Menu.Item key="Nevada">内华达州 (Nevada)</Menu.Item>
      <Menu.Item key="Florida">佛罗里达州 (Florida)</Menu.Item>
      <Menu.Item key="California">加利福尼亚州 (California)</Menu.Item>
      <Menu.Item key="New York">纽约州 (New York)</Menu.Item>
      <Menu.Item key="Colorado">科罗拉多州 (Colorado)</Menu.Item>
    </Menu>
  );

  // 地址类型下拉菜单
  const addressTypeMenu = (
    <Menu 
      onClick={(e) => {
        setSelectedAddressType(e.key);
      }}
      selectedKeys={[selectedAddressType]}
    >
      <Menu.Item key="public">公共收信地址</Menu.Item>
      <Menu.Item key="unique">唯一编号收信地址</Menu.Item>
      <Menu.Item key="custom">自行提供地址</Menu.Item>
    </Menu>
  );

  // 根据公司类型获取公司名称示例
  const getCompanyNamePlaceholder = (type) => {
    switch(type) {
      case 'LLC':
        return "示例名称：Apple LLC";
      case 'CORP':
        return "示例名称：Apple Inc";
      case 'NONPROFIT':
        return "示例名称：Apple Foundation";
      default:
        return "示例名称：Apple LLC";
    }
  };

  // 公司类型下拉菜单
  const companyTypeMenu = (
    <Menu 
      onClick={(e) => {
        setCompanyType(e.key as 'CORP' | 'LLC' | 'NONPROFIT');
      }}
      selectedKeys={[companyType]}
    >
      <Menu.Item key="CORP">股份有限公司 (CORP)</Menu.Item>
      <Menu.Item key="LLC">有限责任公司 (LLC)</Menu.Item>
      <Menu.Item key="NONPROFIT">非营利公司 (Non-Profit)</Menu.Item>
    </Menu>
  );

  // 获取状态显示名称
  const getStateDisplayName = (key) => {
    const stateMap = {
      'Delaware': '特拉华州 (Delaware)',
      'Wyoming': '怀俄明州 (Wyoming)',
      'Nevada': '内华达州 (Nevada)',
      'Florida': '佛罗里达州 (Florida)',
      'California': '加利福尼亚州 (California)',
      'New York': '纽约州 (New York)',
      'Colorado': '科罗拉多州 (Colorado)'
    };
    return stateMap[key] || key;
  };

  // 获取地址类型显示名称
  const getAddressTypeDisplayName = (key) => {
    const addressTypesMap = {
      'public': '公共收信地址',
      'unique': '唯一编号收信地址',
      'custom': '自行提供地址'
    };
    return addressTypesMap[key] || key;
  };

  // 获取公司类型显示名称
  const getCompanyTypeDisplayName = (key) => {
    const companyTypeMap = {
      'CORP': '股份有限公司 (CORP)',
      'LLC': '有限责任公司 (LLC)',
      'NONPROFIT': '非营利公司 (Non-Profit)'
    };
    return companyTypeMap[key] || key;
  };

  // 业务事项下拉菜单
  const businessServiceMenu = (
    <Menu 
      onClick={(e) => {
        setBusinessService(e.key);
      }}
      selectedKeys={[businessService]}
    >
      <Menu.Item key="registration">公司注册</Menu.Item>
      <Menu.Item key="annual">公司年审</Menu.Item>
      <Menu.Item key="taxation">税务申报</Menu.Item>
    </Menu>
  );

  // 获取业务事项显示名称
  const getBusinessServiceDisplayName = (key) => {
    const serviceMap = {
      'registration': '公司注册',
      'annual': '公司年审',
      'taxation': '税务申报'
    };
    return serviceMap[key] || key;
  };

  // 处理客户信息表单变化
  const handleFormValuesChange = (changedValues, allValues) => {
    updateCompanyInfo({
      companyName: allValues.companyName,
      ownerName: allValues.customerName,
      phone: allValues.phone,
      email: allValues.email,
      address: allValues.customAddress || '',
      businessScope: allValues.businessScope
    });
  };

  // 处理自定义地址变化
  const handleCustomAddressChange = (e) => {
    setCustomAddress(e.target.value);
    updateCompanyInfo({
      address: e.target.value
    });
  };

  // 验证公司名称
  const checkCompanyName = (name: string) => {
    if (!name.trim()) {
      message.error('请输入公司名称');
      return;
    }
    
    setIsCheckingName(true);
    setNameAvailable(null);
    
    // 模拟API请求验证公司名称
    setTimeout(() => {
      // 模拟70%的概率名称可用
      const isAvailable = Math.random() > 0.3;
      setNameAvailable(isAvailable);
      
      if (isAvailable) {
        message.success('恭喜！该公司名称可用');
      } else {
        message.error('该公司名称已被注册，请尝试其他名称');
      }
      
      setIsCheckingName(false);
    }, 1500);
  };

  return (
    <div className="calculator-container">
      <Card className="calculator-card">
        <div className="business-customer-container">
          <div className="card-header">
            <Title level={4}>业务办理</Title>
          </div>
          
          <div className="business-section">
            <div className="state-selection">
              <div className="dropdown-wrapper">
                <span className="selection-label">注册州:</span>
                <Dropdown overlay={stateMenu} placement="bottomLeft" trigger={['click']}>
                  <Button className="dropdown-button">
                    {getStateDisplayName(selectedState)} <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
              
              <div className="company-type-selection">
                <span className="selection-label">公司类型:</span>
                <Dropdown overlay={companyTypeMenu} placement="bottomLeft" trigger={['click']}>
                  <Button className="dropdown-button">
                    {getCompanyTypeDisplayName(companyType)} <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
              
              <div className="business-type-selection">
                <span className="selection-label">业务类型:</span>
                <Dropdown overlay={businessServiceMenu} placement="bottomLeft" trigger={['click']}>
                  <Button className="dropdown-button">
                    {getBusinessServiceDisplayName(businessService)} <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
            </div>
            
            <div className="options-section">
              <div className="option-item">
                <span className="option-label">地址类型:</span>
                <Dropdown overlay={addressTypeMenu} placement="bottomLeft" trigger={['click']}>
                  <Button className="dropdown-button">
                    {getAddressTypeDisplayName(selectedAddressType)} <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
              
              {selectedAddressType === 'custom' && (
                <div className="option-item">
                  <span className="option-label">自定义地址:</span>
                  <Input 
                    placeholder="请输入您在美国的实际地址" 
                    value={customAddress}
                    onChange={handleCustomAddressChange}
                  />
                </div>
              )}
              
              {selectedState === 'Wyoming' && (
                <div className="option-item">
                  <span className="option-label">匿名注册：</span>
                  <Radio.Group 
                    options={[
                      { label: '需要', value: true },
                      { label: '不需要', value: false }
                    ]}
                    onChange={(e) => setNeedAnonymous(e.target.value)}
                    value={needAnonymous}
                    optionType="button"
                    buttonStyle="solid"
                    size="small"
                  />
                </div>
              )}
              
              <div className="option-item">
                <span className="option-label">公司税号EIN：</span>
                <Radio.Group 
                  options={[
                    { label: '需要', value: true },
                    { label: '不需要', value: false }
                  ]}
                  onChange={(e) => setNeedEin(e.target.value)}
                  value={needEin}
                  optionType="button"
                  buttonStyle="solid"
                  size="small"
                />
              </div>
              
              <div className="option-item">
                <span className="option-label">BOI申报：</span>
                <Radio.Group 
                  options={[
                    { label: '需要', value: true },
                    { label: '不需要', value: false }
                  ]}
                  onChange={(e) => setNeedBoi(e.target.value)}
                  value={needBoi}
                  optionType="button"
                  buttonStyle="solid"
                  size="small"
                />
              </div>
              
              <div className="option-item">
                <span className="option-label">纸质印章：</span>
                <Radio.Group
                  options={[
                    { label: '需要', value: true },
                    { label: '不需要', value: false }
                  ]}
                  onChange={(e) => setNeedSeal(e.target.value)}
                  value={needSeal}
                  optionType="button"
                  buttonStyle="solid"
                  size="small"
                />
              </div>
              
              <div className="option-item" style={{ marginTop: 10 }}>
                <span className="option-label">拟注册公司名称:</span>
                <div style={{ flex: 1 }}>
                  <Input 
                    prefix={<BankOutlined />} 
                    placeholder={getCompanyNamePlaceholder(companyType)} 
                    value={form.getFieldValue('companyName')}
                    onChange={(e) => form.setFieldsValue({ companyName: e.target.value })}
                    suffix={
                      <Button 
                        type="primary" 
                        size="small" 
                        onClick={() => checkCompanyName(form.getFieldValue('companyName'))}
                        loading={isCheckingName}
                        style={{ marginRight: -12 }}
                      >
                        {nameAvailable === true ? <CheckCircleOutlined /> : '验证'}
                      </Button>
                    }
                    style={{ paddingRight: 70 }}
                  />
                  {nameAvailable === true && (
                    <div style={{ color: '#52c41a', fontSize: '12px', marginTop: '4px' }}>
                      此名称可用
                    </div>
                  )}
                  {nameAvailable === false && (
                    <div style={{ color: '#f5222d', fontSize: '12px', marginTop: '4px' }}>
                      此名称已被使用，请修改
                    </div>
                  )}
                </div>
              </div>
              
              <div className="option-item" style={{ marginTop: 5 }}>
                <span className="option-label">业务范围:</span>
                <div style={{ flex: 1 }}>
                  <TextArea 
                    placeholder="美国通常默认为一切合法生意（选填）"
                    autoSize={{ minRows: 2, maxRows: 4 }}
                    value={form.getFieldValue('businessScope')}
                    onChange={(e) => form.setFieldsValue({ businessScope: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <Divider style={{ margin: '16px 0' }} />
          
          <div className="customer-section">
            <div className="card-header">
              <Title level={4}>公司法人信息</Title>
            </div>
            <Form
              form={form}
              layout="vertical"
              onValuesChange={handleFormValuesChange}
              initialValues={{
                companyName: companyInfo.companyName,
                customerName: companyInfo.ownerName,
                phone: companyInfo.phone,
                email: companyInfo.email,
                address: companyInfo.address,
                businessScope: companyInfo.businessScope
              }}
            >
              <div className="form-row">
                <Form.Item
                  name="customerName"
                  label="法人姓名"
                  className="form-item-half"
                  required
                >
                  <Input prefix={<UserOutlined />} placeholder="San Zhang(张三)" />
                </Form.Item>
                
                <Form.Item
                  name="phone"
                  label="联系电话"
                  className="form-item-half"
                  required
                >
                  <Input prefix={<PhoneOutlined />} placeholder="请输入您的联系电话" />
                </Form.Item>
              </div>
              
              <div className="form-row">
                <Form.Item
                  name="email"
                  label="电子邮箱"
                  className="form-item-half"
                  required
                >
                  <Input prefix={<MailOutlined />} placeholder="请输入您的电子邮箱" />
                </Form.Item>
                
                <Form.Item
                  name="wechat"
                  label="微信号"
                  className="form-item-half"
                >
                  <Input placeholder="请输入您的微信号（选填）" />
                </Form.Item>
              </div>
              
              <Form.Item
                name="companyName"
                style={{ display: 'none' }}
              >
                <Input />
              </Form.Item>
              
              <Form.Item
                name="businessScope"
                style={{ display: 'none' }}
              >
                <TextArea />
              </Form.Item>
            </Form>
          </div>
        </div>
      </Card>

      <div className="price-summary-footer">
        <div className="price-summary">
          <div className="price-inline-card">
            <span className="price-label">费用总计：</span>
            <span className="price-value">${totalPrice}</span>
            <div className="price-note">（默认电子版PDF交付，纸质文件需另行选购）</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator; 