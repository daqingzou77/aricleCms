/* eslint-disable no-param-reassign */
import { formatMessage as _formatMessage } from 'umi/locale';
import React from 'react';
import { Table, Row, Select } from 'antd';
import moment from 'moment';
import { getDutyParticulars, getDutyStatistics } from '../../services/scheduleService';

import styles from './index.less';

const formatMessage = id => {
  return _formatMessage({ id });
};

const columns = [
  {
    title: formatMessage('guet.schedule.serial_number'),
    render: (_, r, index) => {
      return index + 1;
    },
    key: 'userId',
  },
  {
    title: formatMessage('guet.schedule.name'),
    dataIndex: 'userName',
  },
  {
    title: formatMessage('guet.schedule.the_number_of_duty'),
    dataIndex: 'dutyNumber',
  },
  {
    title: formatMessage('guet.schedule.normal_number'),
    dataIndex: 'normalNumber',
  },
  {
    title: formatMessage('guet.schedule.late_arrivals'),
    dataIndex: 'lateNumber',
  },
  {
    title: formatMessage('guet.schedule.early_retreat'),
    dataIndex: 'leaveEarlyNumber',
  },
  {
    title: formatMessage('guet.schedule.the_number_of_absences'),
    dataIndex: 'absenceNumber',
  },
  {
    title: formatMessage('guet.schedule.total_time_length') + ' /h',
    dataIndex: 'dutyDuration',
  },
];

const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

// const columnsDetail = [
//   {
//     title: formatMessage('guet.schedule.serial_number'),
//     render: (text, row, index) => {
//       console.log(this.state.)
//       return index + 1;
//     },
//     dataIndex: 'key',
//   },
//   {
//     title: formatMessage('guet.schedule.name'),
//     dataIndex: 'userName',
//   },
//   {
//     title: formatMessage('guet.schedule.duty_date'),
//     dataIndex: 'dutyDate',
//   },
//   {
//     title: formatMessage('guet.schedule.duty_seat'),
//     dataIndex: 'dutySeat',
//   },
//   {
//     title: formatMessage('guet.schedule.duty_time'),
//     dataIndex: 'dutyTime',
//   },
//   {
//     title: formatMessage('guet.schedule.duty_status'),
//     dataIndex: 'dutySituation',
//   },
//   {
//     title: formatMessage('schedule.dutyevent'),
//     dataIndex: 'dutyIncidentNumber',
//   },
//   {
//     title: formatMessage('schedule.todolist'),
//     dataIndex: 'backlogEmphasisNumber',
//   },
//   {
//     title: formatMessage('schedule.matter'),
//     dataIndex: 'explainNumber',
//   },
//   {
//     title: formatMessage('schedule.phoneCheckin'),
//     dataIndex: 'telephoneNumber',
//   },
//   {
//     title: formatMessage('schedule.mailCheckin'),
//     dataIndex: 'messageNumber',
//   },
// ];



class Situation extends React.PureComponent {

  columnsDetail = [
    {
      title: formatMessage('guet.schedule.serial_number'),
      render: (text, row, index) => {
        const { particularsList } = this.state;
        if (index === particularsList.length-1)  {
          return {
            children: '非值班时间事项统计',
            props: {
              colSpan: 6
            }
          }
        } 
          return index + 1;
      },
      dataIndex: 'key',
    },
    {
      title: formatMessage('guet.schedule.name'),
      dataIndex: 'userName',
      render: (text, row, index) => {
        const obj = {
          children: text,
          props: {}
        }
        const { particularsList } = this.state;
        if (index === particularsList.length-1) {
          obj.props.colSpan = 0;
        }
          return obj;
      }
    },
    {
      title: formatMessage('guet.schedule.duty_date'),
      dataIndex: 'dutyDate',
      render: (text, row, index) => {
        const obj = {
          children: text,
          props: {}
        }
        const { particularsList } = this.state;
        if (index === particularsList.length-1) {
          obj.props.colSpan = 0;
        }
          return obj;
      }
    },
    {
      title: formatMessage('guet.schedule.duty_seat'),
      dataIndex: 'dutySeat',
      render: (text, row, index) => {
        const obj = {
          children: text,
          props: {}
        }
        const { particularsList } = this.state;
        if (index === particularsList.length-1) {
          obj.props.colSpan = 0;
        }
          return obj;
      }
    },
    {
      title: formatMessage('guet.schedule.duty_time'),
      dataIndex: 'dutyTime',
      render: (text, row, index) => {
        const obj = {
          children: text,
          props: {}
        };
        const { particularsList } = this.state;
        if (index === particularsList.length-1) {
          obj.props.colSpan = 0;
        }
        return obj;
      }
    },
    {
      title: formatMessage('guet.schedule.duty_status'),
      dataIndex: 'dutySituation',
      render: (text, row, index) => {
        const obj = {
          children: text,
          props: {}
        }
        const { particularsList } = this.state;
        if (index === particularsList.length-1) {
          obj.props.colSpan = 0;
        }
        return obj;
      }
    },
    {
      title: formatMessage('schedule.dutyevent'),
      dataIndex: 'dutyIncidentNumber',
    },
    {
      title: formatMessage('guet.schedule.points_solve_numbers'),
      dataIndex: 'backlogEmphasisNumber',
    },
    {
      title: formatMessage('schedule.matter'),
      dataIndex: 'explainNumber',
    },
    {
      title: formatMessage('schedule.phoneCheckin'),
      dataIndex: 'telephoneNumber',
    },
    {
      title: formatMessage('schedule.mailCheckin'),
      dataIndex: 'messageNumber',
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      statisticsList: [],
      particularsList: [],
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    };
  }

  componentDidMount() {
    const nowDate = new Date();
    this.getDutyStatistics(nowDate);
    
  }

  handleYear = value => {
    const { month } = this.state;
    const nowDate = new Date();
    nowDate.setFullYear(value);
    nowDate.setMonth(month - 1);
    this.setState({
      year: value,
    });
    this.getDutyStatistics(nowDate);
  };

  handleMonth = value => {
    const { year } = this.state;
    const nowDate = new Date();
    this.setState({
      month: value,
    });
    nowDate.setFullYear(year);
    nowDate.setMonth(value - 1);
    this.getDutyStatistics(nowDate);
  };

  handleOnrowClick = record => {
    const { userId, seatId, userName } = record;
    const { year, month } = this.state;
    const dateTime = new Date();
    dateTime.setFullYear(year);
    dateTime.setMonth(month - 1);
    const data = {
      userId,
      dateTime,
      seatId
    };
    this.getDutyParticulars(data, userName);
  };

  /**
   *  获取值班情况
   */
  getDutyParticulars = (data, userName) => {
    getDutyParticulars(
      {
        dateTime: data.dateTime,
        userId: data.userId,
        seatId: data.seatId
      },
      ({ data: { dutyParticularsList, notDutyTimeParticulars } }) => {
        const reg = /[\u4e00-\u9fa5]/g;
        dutyParticularsList.map(item => {
          item.userName = userName;
          let latesTime = '';
          if (item.lateTime !== null) {
            latesTime += ` ${moment(item.lateTime).format('HH:mm:ss')}`;
          }
          // 0:缺勤 1:正常 2:迟到 3:早退 4:迟到+缺勤
          // eslint-disable-next-line default-case
          switch (item.dutySituation) {
            case 0: item.dutySituation = formatMessage('guet.schedule.absence'); break;
            case 1: item.dutySituation = formatMessage('guet.schedule.normal'); break;
            case 2: item.dutySituation = `${formatMessage('guet.schedule.be_late')} ${latesTime}`; break;
            case 3: item.dutySituation = formatMessage('guet.schedule.leave_early'); break;
            case 4: item.dutySituation = `${formatMessage('guet.schedule.be_late')} ${latesTime} + ${formatMessage('guet.schedule.leave_early')}`; break;
          }
          item.dutyDate = item.dutyDate.replace(reg, "");

        });
        console.log('getDutyParticulars--data：', dutyParticularsList);
        if (dutyParticularsList.length > 0) {
          dutyParticularsList.push(notDutyTimeParticulars);
        }
        this.setState({
          particularsList: dutyParticularsList,
        });
      },
      e => {
        console.log('getDutyParticulars--error：', e.toString());
      }
    );
  };

  /**
   *  获取考勤统计
   */
  getDutyStatistics = dateTime => {
    getDutyStatistics(
      {
        dateTime,
      },
      ({ data }) => {
        console.log('getDutyStatistics--data：', data);
        this.setState({
          statisticsList: data,
        });
      },
      e => {
        console.log('getDutyStatistics--error：', e.toString());
      }
    );
  };

  render() {
    const { statisticsList = [], particularsList = [], year, month } = this.state;
    const monthLayout = months.map(item => (
      <Select.Option key={item} value={item}>
        {item}
      </Select.Option>
    ));
    return (
      <>
        <Row type="flex" justify="end">
          <Select
            defaultValue="2018"
            style={{ width: '100px' }}
            onChange={this.handleYear}
            value={year}
          >
            <Select.Option value="2018">2018</Select.Option>
            <Select.Option value="2019">2019</Select.Option>
            <Select.Option value="2020">2020</Select.Option>
          </Select>
          <Select
            defaultValue="1"
            style={{ width: '100px' }}
            onChange={this.handleMonth}
            value={month}
          >
            {monthLayout}
          </Select>
        </Row>
        <Table
        
          style={{ marginTop: '15px' }}
          columns={columns}
          rowKey="userId"
          dataSource={statisticsList}
          onRow={record => {
            return { onClick: () => this.handleOnrowClick(record) };
          }}
          bordered
          title={() => (
            <>
              <span className={styles.markBabel} /> {formatMessage('schedule.AttendanceStatistics')}
            </>
          )}
          expandedRowRender={record => (
            <p style={{ margin: 0, textAlign: 'left' }}>
              <span>
                {formatMessage('schedule.dutyevent')}:{record.dutyIncidentNumber}
              </span>
              &nbsp; &nbsp;
              <span>
                {formatMessage('schedule.todolist')}:{record.backlogEmphasisNumber}
              </span>
              &nbsp; &nbsp;
              <span>
                {formatMessage('schedule.matter')}:{record.explainNumber}
              </span>
              &nbsp; &nbsp;
              <span>
                {formatMessage('schedule.phoneCheckin')}:{record.telephoneNumber}
              </span>
              &nbsp; &nbsp;
              <span>
                {formatMessage('schedule.mailCheckin')}:{record.messageNumber}
              </span>
            </p>
          )}
        />
        <Table
          rowKey={() => {
            return Math.random();
          }}
          style={{ marginTop: '15px' }}
          columns={this.columnsDetail}
          dataSource={particularsList}
          bordered
          title={() => (
            <>
              <span className={styles.markBabel} /> {formatMessage('guet.schedule.details')}
            </>
          )}
        />
      </>
    );
  }
}

export default Situation;
