import { formatMessage as _formatMessage } from 'umi/locale';
import React from 'react';
import { Col, Row } from 'antd';
import moment from 'moment';

class Card extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const { dutyTodayList } = this.props;
    const dutyDetail = dutyTodayList.map(item => {
      const { dutyInfo, user } = item;
      return (
        <p>{user.userName}: {moment(dutyInfo.dutyStartTime).format('HH:mm:ss') + '~' +moment(dutyInfo.dutyEndTime).format('HH:mm:ss')}</p>
      )
    })
    return (
      <>
        <Row gutter={24}>
          <Col span={24}>
            {dutyDetail}
          </Col>
        </Row>
      </>
    );
  }
}

export default Card;
