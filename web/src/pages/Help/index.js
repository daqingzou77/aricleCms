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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;防空电子战系统是地面防空装备系统的重要组成部分，
              由防空电子战团指挥所、多功能机载雷达干扰群组、指挥和导航系统干扰群组、
              电子侦察探测群组、光电防护群组以及技术保障群组构成，具备电子情报侦察、
              电子支援、电子对抗功能，实现对敌空中远、中、
              近距离目标和太空目标的综合体系对抗，可与现有的防空作战指挥、
              情报、武器控制等作战管理系统实现有机融合，
              提高防空系统在未来战场的生存能力和综合作战效能。<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              作战值班软件作为防空电子战系统项目中指挥控制的重要服务软件，
              为系统提供作战值班管理功能，软件的作战值班管理功能包括：
              排班管理、查看值班安排、交班、重要事件管理、考勤管理、态势地图。
              为管理员和值班人员提供完善的值班管理系统。
            </span> */}
          </Col>
        </Row>
      </>
    );
  }
}

export default Help;
