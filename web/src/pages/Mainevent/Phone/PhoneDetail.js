import { formatMessage as _formatMessage } from 'umi/locale';
import React from 'react';
import { Col, Form, Input, Row, Icon } from 'antd';
import moment from 'moment';
import { getPhoneDetail } from '../../../services/scheduleService';

const formatMessage = (id) => { return _formatMessage({ id }) }


class PhoneDetail extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      telephone: {
        id: '',
        userId: '',
        title: '',
        callTime: null,
        telephoneType: '',
        telephoneNumber: '',
        oppositeUnit: '',
        contact: '',
        contentAbstract: '',
        handleSituation: '',
        telephontState: '',
        releaseTime: null,
        relationEvent: ''
      },
      userName: ''
    };
  }

  componentDidMount() {
    this.getPhoneDetailById()
  }

  handleClose = () => {
    this.props.handleClose();
  };

  getPhoneDetailById = () => {
    const { id } = this.state
    getPhoneDetail({
      id
    }, ({ data }) => {
      console.log('getPhoneDetail--data：', data);
      this.setState({
        telephone: data.telephone,
        userName: data.userName,
      })
    }, (e) => {
      console.log('getPhoneDetail--error：', e.toString());
    })
  }

  handleSubmit = () => {
  };

  render() {
    const {
      telephone,
      userName,
    } = this.state
    let callTime = ''
    let seat = '';
    if (telephone.seat !== null) {
      seat = telephone.seat;
    }
    if (telephone.callTime !== null) {
      callTime = moment(new Date(telephone.callTime)).format('DD/MM/YYYY HH:mm:ss');
    }
    let releaseTime = ''
    if (telephone.releaseTime !== null) {
      releaseTime = moment(new Date(telephone.releaseTime)).format('DD/MM/YYYY HH:mm:ss');
    }

    const content = `${formatMessage('guet.schedule.counterpart')}：${telephone.oppositeUnit}
    \n${formatMessage('guet.schedule.contact')}：${telephone.contact}
    \n${formatMessage('guet.schedule.telephone_number')}: ${telephone.telephoneNumber}
    \n${formatMessage('guet.schedule.abstract')}：${telephone.contentAbstract}
    \n${formatMessage('guet.schedule.link_to_an_existing_event')}：${telephone.relationEvent}
    \n${formatMessage('guet.schedule.processing_situation')}：${telephone.handleSituation}`
    
    return (
      <>
        <h2 style={{ textAlign: 'center' }}>{telephone.title}</h2>
        <Icon
          type="close"
          style={{ float: 'right', marginRight: '10px', marginTop: '-50px' }}
          onClick={this.handleClose}
        />
        <div style={{ textAlign: 'center', marginBottom: 25 }}>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <label>{telephone.telephoneType === 1 ? formatMessage('guet.schedule.call_time') : formatMessage('guet.schedule.outgoing_time')}</label>
            <span>{callTime}</span>
          </div>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <label>{formatMessage('guet.schedule.release_time')}</label>
            <span>{releaseTime}</span>
          </div>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <label>{formatMessage('guet.schedule.operating_seat')}</label>
            <span>{seat}</span>
          </div>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
             <label>{formatMessage('guet.schedule.register_person')}</label>
             <span>{userName}</span>
          </div>
        </div>
        <Row gutter={24} style={{ marginTop: '-25px'}}>
          <Col span={24}>
            <Input.TextArea value={content} rows={35} readOnly />
          </Col>
        </Row>
      </>
    );
  }
}

export default Form.create()(PhoneDetail);
