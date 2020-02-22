import { formatMessage as _formatMessage } from 'umi/locale';
import React from 'react';
import { Col, Row, Table } from 'antd';
import styles from './index.less';

const formatMessage = id => {
  return _formatMessage({ id });
};
{/* 交班提示(0：没有提交事件 1：有保存状态的事件 2：已提交事件) */ }

const dataColumns = [{
  title: formatMessage('schedule.dutyevent'),
  key: 'dutyIncident',
  dataIndex: 'dutyIncident',
  render: (text, record) => (
    // eslint-disable-next-line no-nested-ternary
    <div className={[styles.circle, record.dutyIncident === 1 ? styles.yellow : record.dutyIncident === 2 ? styles.green : styles.red].join(' ')} />
  )
}, {
  title: formatMessage('schedule.todolist'),
  key: 'backlog',
  dataIndex: 'backlog',
  render: (text, record) => (
    // eslint-disable-next-line no-nested-ternary
    <div className={[styles.circle, record.backlog === 1 ? styles.yellow : record.backlog === 2 ? styles.green : styles.red].join(' ')} />
  )
}, {
  title: formatMessage('schedule.matter'),
  key: 'explain',
  dataIndex: 'explain',
  align: 'center',
  render: (text, record) => (
    // eslint-disable-next-line no-nested-ternary
    <div className={[styles.circle, record.explain === 1 ? styles.yellow : record.explain === 2 ? styles.green : styles.red].join(' ')} />
  )
}, {
  title: formatMessage('schedule.phoneCheckin'),
  key: 'telephone',
  dataIndex: 'telephone',
  align: 'center',
  render: (text, record) => (
    // eslint-disable-next-line no-nested-ternary
    <div className={[styles.circle, record.telephone === 1 ? styles.yellow : record.telephone === 2 ? styles.green : styles.red].join(' ')} />
  )
}, {
  title: formatMessage('schedule.mailCheckin'),
  key: 'message',
  dataIndex: 'message',
  align: 'center',
  render: (text, record) => (
    // eslint-disable-next-line no-nested-ternary
    <div className={[styles.circle, record.message === 1 ? styles.yellow : record.message === 2 ? styles.green : styles.red].join(' ')} />
  )
}];

class ChangeShift extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [{
        dutyIncident: 0,
        backlog: 0,
        explain: 0,
        telephone: 0,
        message: 0,
      }]
    };
  }

  render() {
    const { handoverEvent } = this.props;
    let { dataSource } = this.state;
    if (handoverEvent !== null) {
      dataSource = [handoverEvent];
    }

    return (
      <>
        <Row gutter={24}>
          <Col span={24}>
            <span>
              {formatMessage('guet.schedule.handover_reminder')}：<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{formatMessage('guet.schedule.handover_reminder_event')}<br />
            </span>
          </Col>
        </Row>
        <Table
          style={{ marginTop: 10 }}
          dataSource={dataSource}
          // eslint-disable-next-line react/jsx-boolean-value
          bordered={true}
          columns={dataColumns}
          pagination={false}
        />
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <div className={styles.unSubmit} style={{ float: 'left' }} />
            <div className={styles.font}>
              {formatMessage('guet.schedule.not_submit')}
            </div>
          </div>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <div className={styles.onSave} style={{ float: 'left' }} />
            <div className={styles.font}>
              {formatMessage('guet.schedule.aready_save')}
            </div>
          </div>
          <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
            <div className={styles.submited} style={{ float: 'left' }} />
            <div className={styles.font}>
              {formatMessage('guet.schedule.aready_submit')}
            </div>
          </div>
        </div>
      </>
      // <>
      //   <Row gutter={24}>
      //     <Col span={24}>
      //       <span>
      //         {formatMessage('guet.schedule.handover_reminder')}：<br />
      //         {formatMessage('guet.schedule.handover_reminder_event')}
      //       </span>
      //     </Col>
      //     {/* 交班提示(0：没有提交事件 1：有保存状态的事件 2：已提交事件) */}
      //     <Col span={24}>
      //       <br />
      //       <span>{formatMessage('guet.schedule.save_on_event')}：</span>
      //     </Col>
      //     <Col span={24}>
      //       <span>{handoverEvent.dutyIncident === 1 ? formatMessage('schedule.dutyevent') + ' ' : ''}</span>
      //       <span>{handoverEvent.backlog === 1 ? formatMessage('schedule.todolist') + ' ' : ''}</span>
      //       <span>{handoverEvent.explain === 1 ? formatMessage('schedule.matter') + ' ' : ''}</span>
      //       <span>{handoverEvent.telephone === 1 ? formatMessage('schedule.phoneCheckin') + ' ' : ''}</span>
      //       <span>{handoverEvent.message === 1 ? formatMessage('schedule.mailCheckin') : ''}</span>
      //     </Col>
      //   </Row>
      // </>
    );
  }
}

export default ChangeShift;
