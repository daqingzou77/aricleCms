import React, { Component } from 'react';
import { Card } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import img from '@/assets/tool.png';

class Analysis extends Component {
  render() {
    return (
      <GridContent>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <img src={img} alt="" />
          </div>
        </Card>
      </GridContent>
    );
  }
}

export default Analysis;