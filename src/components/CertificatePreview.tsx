import React from 'react';
import { CompanyInfo } from '../App';
import './CertificatePreview.css';

interface CertificatePreviewProps {
  companyInfo: CompanyInfo;
}

const CertificatePreview = ({ companyInfo }: CertificatePreviewProps) => {
  // 生成ID号码
  const generateIdNumber = () => {
    const randomNum = Math.floor(10000000 + Math.random() * 90000000);
    return `2025${randomNum}`;
  };

  // 生成文档编号
  const generateDocumentNumber = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `2025${randomNum}`;
  };

  // 获取格式化日期时间
  const getFormattedDateTime = () => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = date.getHours();
    const formattedHours = String(hours > 12 ? hours - 12 : hours).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    return `${month}/${day}/2025 ${formattedHours}:${minutes}:${seconds} ${ampm}`;
  };

  // 处理地址格式
  const formatAddress = (address: string) => {
    if (!address || address.trim() === '') {
      return ['418 Broadway # 6438', 'Albany NY 12207', 'US'];
    }
    
    const parts = address.split(',').map(part => part.trim());
    if (parts.length === 1) {
      return [parts[0], 'Albany NY 12207', 'US'];
    } else if (parts.length === 2) {
      return [parts[0], parts[1], 'US'];
    } else {
      return [parts[0], parts.slice(1, -1).join(', '), parts[parts.length - 1]];
    }
  };

  // 获取地址的一行显示版本
  const getAddressLine = (address: string) => {
    const parts = formatAddress(address);
    return parts.join(', ');
  };

  // 格式化公司名称
  const getCompanyName = () => {
    return companyInfo.companyName || 'Fineparts trading INC';
  };

  // 获取所有者名称
  const getOwnerName = () => {
    return companyInfo.ownerName || 'Yifan Pei';
  };

  // 渲染公司类型证书
  const renderCorpCertificate = () => {
    return (
      <div className="certificate-page page-one">
        <div className="certificate-top">
          <div className="logo-title-section">
            <div className="colorado-logo"></div>
            <div className="title-section">
              <span className="colorado-text">Colorado</span>
              <span className="secretary-text">Secretary of State</span>
            </div>
          </div>
          <div className="id-section">
            <div className="id-line id-header">
              <span className="id-value">Colorado Secretary of State</span>
            </div>
            <div className="id-line">
              <span className="id-label">ID#</span>
              <span className="id-value">{generateIdNumber()}</span>
            </div>
            <div className="id-line">
              <span className="id-label">Document#</span>
              <span className="id-value">{generateDocumentNumber()}</span>
            </div>
            <div className="id-line">
              <span className="id-label">Filed on:</span>
              <span className="id-value">{getFormattedDateTime()}</span>
            </div>
            <div className="id-line">
              <span className="id-label">Paid:</span>
              <span className="id-value">$XX.XX</span>
            </div>
          </div>
        </div>
        
        <div className="document-title-section">
          <h1>Articles of Incorporation for a Profit Corporation</h1>
          <p>filed pursuant to § 7-102-101 and § 7-102-102 of the Colorado Revised Statutes (C.R.S.)</p>
        </div>
        
        <div className="document-content">
          <div className="content-row">
            <span className="row-label">The domestic entity name of the corporation is</span> <span className="entity-name">{getCompanyName()}</span>
          </div>
          
          <div className="content-row">
            <div className="row-label">The principal office street address is</div>
            <div className="row-value address-value">
              {formatAddress(companyInfo.address)[0]}<br/>
              {formatAddress(companyInfo.address)[1]}<br/>
              {formatAddress(companyInfo.address)[2]}
            </div>
          </div>
          
          <div className="content-row">
            <div className="row-label">The principal office mailing address is</div>
            <div className="row-value address-value">
              {formatAddress(companyInfo.address)[0]}<br/>
              {formatAddress(companyInfo.address)[1]}<br/>
              {formatAddress(companyInfo.address)[2]}
            </div>
          </div>
          
          <div className="content-row">
            <span className="row-label">The name of the registered agent is</span> <span className="entity-name">Rocky Mountain RA LLC</span>
          </div>
          
          <div className="content-row">
            <div className="row-label">The registered agent's street address is</div>
            <div className="row-value address-value">
              110 16th Street, Suite 1460<br/>
              Denver CO 80202<br/>
              US
            </div>
          </div>
          
          <div className="content-row">
            <div className="row-label">The registered agent's mailing address is</div>
            <div className="row-value address-value">
              110 16th Street, Suite 1460<br/>
              Denver CO 80202<br/>
              US
            </div>
          </div>
          
          <div className="content-row">
            <div className="row-value full-width">The person above has agreed to be appointed as the registered agent for this entity.</div>
          </div>
          
          <div className="content-row">
            <div className="row-label">The name(s) and address(es) of the incorporator(s)</div>
            <div className="row-value address-value">
              {getOwnerName()}<br/>
              {formatAddress(companyInfo.address)[0]}<br/>
              {formatAddress(companyInfo.address)[1]}<br/>
              {formatAddress(companyInfo.address)[2]}
            </div>
          </div>
          
          <div className="content-row">
            <div className="row-label">The classes of shares and number of shares of each class that the corporation is authorized to issue are</div>
            <div className="row-value">
              The corporation is authorized to issue:<br/>
              Common shares - 1000
            </div>
          </div>
          
          <div className="disclaimer-section">
            <p>Causing this document to be delivered to the Secretary of State for filing shall constitute the affirmation or acknowledgment of each individual causing such delivery, under penalties of perjury, that the document is the individual's act and deed, or that the individual in good faith believes the document is the act and deed of the person on whose behalf the individual is causing the document to be delivered for filing, taken in conformity with the requirements of part 3 of article 90 of title 7, C.R.S., and, if applicable, the constituent documents, and the organic statutes, and that the individual in good faith believes the facts stated in the document are true and the document complies with the requirements of that Part, the constituent documents, and the organic statutes.</p>
          </div>
        </div>
      </div>
    );
  };

  // 渲染LLC证书页面一
  const renderLLCCertificatePage1 = () => {
    return (
      <div className="certificate-page page-one">
        <div className="certificate-top">
          <div className="logo-title-section">
            <div className="colorado-logo"></div>
            <div className="title-section">
              <span className="colorado-text">Colorado</span>
              <span className="secretary-text">Secretary of State</span>
            </div>
          </div>
          <div className="id-section">
            <div className="id-line id-header">
              <span className="id-value">Colorado Secretary of State</span>
            </div>
            <div className="id-line">
              <span className="id-label">ID#</span>
              <span className="id-value">{generateIdNumber()}</span>
            </div>
            <div className="id-line">
              <span className="id-label">Document#</span>
              <span className="id-value">{generateDocumentNumber()}</span>
            </div>
            <div className="id-line">
              <span className="id-label">Filed on:</span>
              <span className="id-value">{getFormattedDateTime()}</span>
            </div>
            <div className="id-line">
              <span className="id-label">Paid:</span>
              <span className="id-value">$XX.XX</span>
            </div>
          </div>
        </div>
        
        <div className="document-title-section">
          <h1>Articles of Organization for a Limited Liability Company</h1>
          <p>filed pursuant to § 7-90-301 and § 7-80-204 of the Colorado Revised Statutes (C.R.S.)</p>
        </div>
        
        <div className="document-content">
          <div className="content-row">
            <span className="row-label">The domestic entity name of the limited liability company is</span> <span className="entity-name">{getCompanyName()}</span>
          </div>
          
          <div className="content-row">
            <div className="row-label">The principal office street address is</div>
            <div className="row-value address-value">
              {formatAddress(companyInfo.address)[0]}<br/>
              {formatAddress(companyInfo.address)[1]}<br/>
              {formatAddress(companyInfo.address)[2]}
            </div>
          </div>
          
          <div className="content-row">
            <div className="row-label">The principal office mailing address is</div>
            <div className="row-value address-value">
              {formatAddress(companyInfo.address)[0]}<br/>
              {formatAddress(companyInfo.address)[1]}<br/>
              {formatAddress(companyInfo.address)[2]}
            </div>
          </div>
          
          <div className="content-row">
            <span className="row-label">The name of the registered agent is</span> <span className="entity-name">Rocky Mountain RA LLC</span>
          </div>
          
          <div className="content-row">
            <div className="row-label">The registered agent's street address is</div>
            <div className="row-value address-value">
              110 16th Street, Suite 1460<br/>
              Denver CO 80202<br/>
              US
            </div>
          </div>
          
          <div className="content-row">
            <div className="row-label">The registered agent's mailing address is</div>
            <div className="row-value address-value">
              110 16th Street, Suite 1460<br/>
              Denver CO 80202<br/>
              US
            </div>
          </div>
          
          <div className="content-row">
            <div className="row-value full-width">The person above has agreed to be appointed as the registered agent for this entity.</div>
          </div>
          
          <div className="content-row">
            <div className="row-label">The management of the limited liability company is vested in</div>
            <div className="row-value">
              <span className="checkbox checked">☑</span> Managers
              <span className="checkbox">☐</span> Members
            </div>
          </div>
          
          <div className="content-row">
            <div className="row-label">The name(s) and address(es) of the person(s) forming the limited liability company</div>
            <div className="row-value address-value">
              {getOwnerName()}<br/>
              {formatAddress(companyInfo.address)[0]}<br/>
              {formatAddress(companyInfo.address)[1]}<br/>
              {formatAddress(companyInfo.address)[2]}
            </div>
          </div>
          
          <div className="disclaimer-section">
            <p>Causing this document to be delivered to the Secretary of State for filing shall constitute the affirmation or acknowledgment of each individual causing such delivery, under penalties of perjury, that the document is the individual's act and deed, or that the individual in good faith believes the document is the act and deed of the person on whose behalf the individual is causing the document to be delivered for filing, taken in conformity with the requirements of part 3 of article 90 of title 7, C.R.S., and, if applicable, the constituent documents, and the organic statutes, and that the individual in good faith believes the facts stated in the document are true and the document complies with the requirements of that Part, the constituent documents, and the organic statutes.</p>
          </div>
        </div>
      </div>
    );
  };

  // 渲染第二页（两种公司类型共用）
  const renderSecondPage = () => {
    return (
      <div className="certificate-page page-two">
        <div className="document-content">
          <div className="content-row">
            <div className="row-value full-width">This perjury notice applies to each individual who causes this document to be delivered to the Secretary of State, whether or not such individual is named in the document as one who has caused it to be delivered.</div>
          </div>
          
          <div className="content-row">
            <div className="row-label">Name(s) and address(es) of the individual(s) causing the document to be delivered for filing</div>
            <div className="row-value address-value">
              {getOwnerName()}<br/>
              {formatAddress(companyInfo.address)[0]}<br/>
              {formatAddress(companyInfo.address)[1]}<br/>
              {formatAddress(companyInfo.address)[2]}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="certificate-container">
      <div className="certificate-preview-section">
        <div className="colorado-certificate continuous-pages">
          {companyInfo.companyType === 'CORP' ? renderCorpCertificate() : renderLLCCertificatePage1()}
          {renderSecondPage()}
        </div>
      </div>
    </div>
  );
};

export default CertificatePreview; 