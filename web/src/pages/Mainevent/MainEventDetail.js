import { formatMessage as _formatMessage } from 'umi/locale';
import React from 'react';
import { Col, Form, Input, Row, Icon } from 'antd';
import moment from 'moment';
import { getDutyIncident } from '../../services/scheduleService';

const formatMessage = id => {
  return _formatMessage({ id });
};

class MainEventDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      dutyIncident: {
        id: '',
        userId: '',
        eventName: '',
        happenTime: null,
        eventType: '',
        place: '',
        lon: '',
        lat: '',
        basicSituation: '',
        disposalProcess: '',
        undertaker: '',
        dutyIncidentState: '',
      },
      userName: '',
    };
  }

  componentDidMount() {
    this.getDutyIncidentDetail();
  }

  componentWillUnmount() { }

  getDutyIncidentDetail = () => {
    const { id } = this.state;
    getDutyIncident(
      {
        id,
      },
      ({ data }) => {
        console.log('getDutyIncident--data：', data);
        this.setState({
          dutyIncident: data.dutyIncidentAddVO,
          userName: data.userName,
        });
      },
      e => {
        console.log('getDutyIncident--error：', e.toString());
      }
    );
  };

  handleClose = () => {
    this.props.handleClose()
  };

  handleSubmit = () => { };

  render() {
    const { dutyIncident, userName } = this.state;
    let level = formatMessage('guet.schedule.general');
    if (dutyIncident.eventType === 1) {
      level = formatMessage('guet.schedule.general');
    } else if (dutyIncident.eventType === 2) {
      level = formatMessage('guet.schedule.urgent');
    }
    let happenTime = '';
    let releaseTime = '';
    if (dutyIncident.happenTime !== null) {
      happenTime = moment(new Date(dutyIncident.happenTime)).format('DD/MM/YYYY HH:mm:ss');
    }
    if (dutyIncident.releaseTime !== null) {
      releaseTime = moment(new Date(dutyIncident.releaseTime)).format('DD/MM/YYYY HH:mm:ss');
    }
    let lonAndLatList = '';
    if (dutyIncident.lonAndLatList !== undefined && dutyIncident.lonAndLatList.length > 0) {
      lonAndLatList = dutyIncident.lonAndLatList.map((item, index) => {
        if (index === 0) {
          return `\n${formatMessage('guet.schedule.longitude')}：${item.lon}° ${formatMessage('guet.schedule.latitude')}：${item.lat}°`
        } 
          return `\n\n${ formatMessage('guet.schedule.longitude')}：${item.lon}° ${formatMessage('guet.schedule.latitude')}：${item.lat}°`;
      })
    } else {
      lonAndLatList = `\n${formatMessage('guet.schedule.lat_lon')}：${formatMessage('guet.schedule.none')}`;
    }

    const origin = dutyIncident.eventOrigin;
    const content = `${formatMessage('guet.schedule.location')}：${dutyIncident.place}
    \n${formatMessage('guet.schedule.event_origin')}：${origin}
    ${lonAndLatList}
    \n${formatMessage('guet.schedule.basic_situation')}：${dutyIncident.basicSituation}
    \n${formatMessage('guet.schedule.disposal_process')}：${dutyIncident.disposalProcess}`;

    return (
      <>
        <h2 style={{ textAlign: 'center' }}>{dutyIncident.eventName}</h2>
        <Icon
          type="close"
          style={{ float: 'right', marginRight: '10px', marginTop: '-50px' }}
          onClick={this.handleClose}
        />
        <div style={{ textAlign: 'center', marginBottom: 25 }}>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <label>{formatMessage('guet.schedule.time_of_occurrence')}</label>
            <span>{happenTime}</span>
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
            <label>{formatMessage('guet.schedule.event_type')}</label>
            <span>{level}</span>
          </div>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <label>{formatMessage('guet.schedule.operating_seat')}</label>
            <span>{dutyIncident.seat}</span>
          </div>
        </div>
        <Row gutter={24} style={{ marginTop: '-25px' }}>
          <Col span={24}>
            <Input.TextArea value={content} rows={35} readOnly />
          </Col>
        </Row>
      </>
    );
  }
}

export default Form.create()(MainEventDetail);
