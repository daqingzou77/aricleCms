import { formatMessage as _formatMessage } from 'umi/locale';
import React from 'react';
import { Col, Form, Input, Row, Icon } from 'antd';
import moment from 'moment';
import { getExplainDetail } from '../../../services/scheduleService';

const formatMessage = id => {
  return _formatMessage({ id });
};

class MatterDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      explain: {
        id: '',
        userId: '',
        matterName: '',
        createReason: '',
        matterRange: '',
        importantLevel: '',
        detail: '',
        explainState: '',
        explainTime: null,
      },
      userName: '',
    };
  }

  componentDidMount() {
    this.getExplainDetailById();
  }

  getExplainDetailById = () => {
    const { id } = this.state;
    getExplainDetail(
      {
        id,
      },
      ({ data }) => {
        this.setState({
          explain: data.explain,
          userName: data.userName,
        });
        console.log('getExplainDetail--data：', data);
      },
      e => {
        console.log('getExplainDetail--error：', e.toString());
      }
    );
  };

  handleSubmit = () => {};

  handleClose = () => {
    this.props.handleClose();
  };

  render() {
    const { explain, userName } = this.state;
    let level = formatMessage('guet.schedule.normal');
    if (explain.importantLevel === 1) {
      level = formatMessage('guet.schedule.normal');
    } else if (explain.importantLevel === 2) {
      level = formatMessage('guet.schedule.important');
    } else if (explain.importantLevel === 3) {
      level = formatMessage('guet.schedule.very_important');
    }
    let seat = '';
    let time = '';
    if (explain.seat !== null) {
      seat = explain.seat;
    }
    if (explain.explainTime !== null) {
      time = moment(new Date(explain.explainTime)).format('DD/MM/YYYY HH:mm:ss');
    }
    const content = `${formatMessage('guet.schedule.explain_the_cause_of_the_matter')}：${explain.createReason}
    \n${formatMessage('guet.schedule.explaining_details')}：${explain.detail}`;
    return (
      <>
        <h2 style={{ textAlign: 'center' }}>{explain.matterName}</h2>
        <Icon
          type="close"
          style={{ float: 'right', marginRight: '10px', marginTop: '-50px' }}
          onClick={this.handleClose}
        />

        <div style={{ textAlign: 'center' }}>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <label>{formatMessage('guet.schedule.release_time')}</label>
            <span>{time}</span>
          </div>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <label>{formatMessage('guet.schedule.publisher')}</label>
            <span>{userName}</span>
          </div>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <label>{formatMessage('guet.schedule.importance')}</label>
            <span>{level}</span>
          </div>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <label>{formatMessage('guet.schedule.operating_seat')}</label>
            <span>{seat}</span>
          </div>
        </div>

        <Row gutter={24}>
          <Col span={24}>
            <Input.TextArea value={content} rows={35} readOnly />
          </Col>
        </Row>
        {/* </Form> */}
      </>
    );
  }
}

export default Form.create()(MatterDetail);
