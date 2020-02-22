import { formatMessage as _formatMessage } from 'umi/locale';
import React from 'react';
import { Col, Form, Input, Row, Icon } from 'antd';
import moment from 'moment';
import { getLogDetail } from '../../services/scheduleService';
import style from './index.less';

const formatMessage = id => {
  return _formatMessage({ id });
};

class LogDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      log: {
        id: '',
        userId: '',
        logTitle: '',
        logDate: '',
        logWeek: '',
        weather: '',
        temp: '',
        timeQuantum: '',
        dutyOperator: '',
        logContent: '',
        logState: '',
        submitTime: '',
      },
      userName: '',
    };
  }

  componentDidMount() {
    this.getLogDetailById();
  }

  handleClose = () => {
    this.props.handleClose();
  };

  getLogDetailById = () => {
    const { id } = this.state;
    getLogDetail(
      {
        id,
      },
      ({ data }) => {
        this.setState({
          log: data.log,
          userName: data.userName,
        });
        console.log('getLogDetail--data：', data);
      },
      e => {
        console.log('getLogDetail--error：', e.toString());
      }
    );
  };

  handleSubmit = () => {};

  render() {
    const { log, userName } = this.state;
  
    let logWeek = '';
    switch (log.logWeek) {
     case '1': logWeek = formatMessage('guet.schedule.monday'); break;
     case '2': logWeek = formatMessage('guet.schedule.tuesday'); break;
     case '3': logWeek = formatMessage('guet.schedule.wednesday'); break;
     case '4': logWeek = formatMessage('guet.schedule.thursday'); break;
     case '5': logWeek = formatMessage('guet.schedule.friday'); break;
     case '6': logWeek = formatMessage('guet.schedule.saturday'); break;
     case '0': logWeek = formatMessage('guet.schedule.sunday'); break;
     default : logWeek = ''
    };
    let time = '';
    if (log.logDate !== null) {
      time = moment(new Date(log.logDate)).format('YYYY/MM/DD');
    }
    let seat = '';
    if (log.seat !== null) {
      seat = log.seat;
    }

    return (
      <>
        <h2 style={{ textAlign: 'center' }}>{log.logTitle}</h2>
        <Icon
          type="close"
          style={{ float: 'right', marginRight: '10px', marginTop: '-40px' }}
          onClick={this.handleClose}
        />
        <div style={{ textAlign: 'center' }}>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <span>{time}</span>
          </div>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <span>{logWeek}</span>
          </div>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <label>{formatMessage('guet.schedule.the_weather')}</label>
            <span>{log.weather}</span>
          </div>

          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <label>{formatMessage('guet.schedule.temperature')}</label>
            <span>{log.temp}</span>
          </div>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <label>{formatMessage('guet.schedule.duty_time_period')}</label>
            <span>{log.timeQuantum}</span>
          </div>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <label>{formatMessage('guet.schedule.planned_person')}</label>
            <span>{log.dutyOperator}</span>
          </div>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <label>{formatMessage('guet.schedule.actual_duty_person')}</label>
            <span>{userName}</span>
          </div>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <label>{formatMessage('guet.schedule.operating_seat')}</label>
            <span>{seat}</span>
          </div>
        </div>
        <Row gutter={24}>
          <Col span={24}>
            <Input.TextArea value={log.logContent} readOnly rows={35} />
          </Col>
        </Row>
      </>
    );
  }
}

export default Form.create()(LogDetail);
