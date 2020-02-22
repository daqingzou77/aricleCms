import { formatMessage as _formatMessage } from 'umi/locale';
import React from 'react';
import { Col, Form, Input, Row, Icon } from 'antd';
import moment from 'moment';
import { getMessageDetail } from '../../../services/scheduleService';

const formatMessage = id => {
  return _formatMessage({ id });
};

class MailDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      messageRegistration: {
        id: '',
        userId: '',
        messageTitle: '',
        receiveSendTime: null,
        messageType: '',
        oppositeUnit: '',
        contentAbstract: '',
        messageEnclosure: '',
        relationEvent: '',
        handleSituation: '',
        messageState: '',
        releaseTime: null,
      },
      userName: '',
    };
  }

  componentDidMount() {
    this.getMessageDetailById();
  }

  handelClose = () => {
    this.props.handelClose();
  };

  getMessageDetailById = () => {
    const { id } = this.state;
    getMessageDetail(
      {
        id,
      },
      ({ data }) => {
        console.log('getMessageDetail--data：', data);
        this.setState({
          messageRegistration: data.messageRegistration,
          userName: data.userName,
        });
      },
      e => {
        console.log('getMessageDetail--error：', e.toString());
      }
    );
  };

  handleSubmit = () => {};

  render() {
    const { messageRegistration, userName } = this.state;
    let receiveSendTime = '';
    if (messageRegistration.receiveSendTime !== null) {
      receiveSendTime = moment(new Date(messageRegistration.receiveSendTime)).format(
        'DD/MM/YYYY HH:mm:ss'
      );
    }
    let seat = '';
    if (messageRegistration.seat !== null) {
      seat = messageRegistration.seat;
    }
    let releaseTime = '';
    if (messageRegistration.releaseTime !== null) {
      releaseTime = moment(new Date(messageRegistration.releaseTime)).format('DD/MM/YYYY HH:mm:ss');
    }
    let type = formatMessage('guet.schedule.send');
    if (messageRegistration.messageType === 1) {
      type = formatMessage('guet.schedule.send');
    } else if (messageRegistration.messageType === 2) {
      type = formatMessage('guet.schedule.receive');
    }
    const content = `${formatMessage('guet.schedule.counterpart')}：${messageRegistration.oppositeUnit}
      \n${formatMessage('guet.schedule.abstract')}：${messageRegistration.contentAbstract}
      \n${formatMessage('guet.schedule.link_to_an_existing_event')}：${messageRegistration.relationEvent}
      \n${formatMessage('guet.schedule.processing_situation')}：${messageRegistration.handleSituation}`;

    return (
      <>
        <h2 style={{ textAlign: 'center' }}>{messageRegistration.messageTitle}</h2>
        <Icon
          type="close"
          style={{ float: 'right', marginRight: '10px', marginTop: '-50px' }}
          onClick={this.handelClose}
        />
        <div style={{ textAlign: 'center' }}>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <label>{formatMessage('guet.schedule.types')}</label>
            <span>{type}</span>
          </div>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <label>{messageRegistration.messageType === 1 ? formatMessage('guet.schedule.sendTime') : formatMessage('guet.schedule.receiveTime')}</label>
            <span>{receiveSendTime}</span>
          </div>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <label>{formatMessage('guet.schedule.release_time')}</label>
            <span>{releaseTime}</span>
          </div>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <label>{formatMessage('guet.schedule.recorder')}</label>
            <span>{userName}</span>
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
      </>
    );
  }
}

export default Form.create()(MailDetail);
