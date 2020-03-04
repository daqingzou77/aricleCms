import React from 'react';
import { ConfigProvider } from 'antd';
import { MehOutlined } from '@ant-design/icons';

const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <MehOutlined style={{ fontSize: 20 }} />
    <p>暂无数据</p>
  </div>
);

class CustomizeEmpty extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        {children}
      </ConfigProvider>
    )    
  }
}

export default CustomizeEmpty;