import React from 'react';

import { Col, Row } from 'antd';


class Help extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
    };
  };

  render() {
    return (
      <>
        <Row gutter={24}>
          <Col span={24}>
            {/* <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              文章信息管理系统
            </span> */}
          </Col>
        </Row>
      </>
    );
  }
}

export default Help;
