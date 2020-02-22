import { formatMessage as _formatMessage } from 'umi/locale';
import React from 'react';
import { Button, Calendar, message, Table, Input, Modal } from 'antd';
import moment from 'moment';
import styles from './index.less';
import {
  deleteArrangementList,
  getUserDutyList,
  getAllSeatData,
  exportDuty,
  querySeatDuty,
} from '../../services/scheduleService';

import SchedulEditor from './schedulEditor';

import Modals from '@/common/components/Modal';
import { ADMIN } from '@/utils/utils';

const { confirm } = Modal;

const formatMessage = id => {
  return _formatMessage({ id });
};

class Scheduling extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: moment(new Date()),
      // selectedMonth: moment(new Date()).add(1, 'd'),
      selectedMonth: moment(new Date()),
      param: '',
      userDutyList: [],
      userShowList: [],
      allSeatData: [],
      dutyTable: [],
      showModal: false,
      editSeatId: undefined,
      isAbled: false,
    };
  }

  componentDidMount() {
    const { selectedDate } = this.state;
    this.getUserDutyList(selectedDate.toDate());
    this.getAllSeatData();
    this.getSeatDutyByDate(selectedDate);
  }

  onSelectDate = value => {
    this.getSeatDutyByDate(value);
    this.setState({
      selectedDate: value,
    });
  };

  changeSeatData2DutyTable = allSeatData => {
    const dutyTable = [];
    allSeatData.forEach(item => {
      const dutyTableItem = { seatId: item.id, seatName: item.name };
      dutyTable.push(dutyTableItem);
    });
    this.setState({
      dutyTable,
    });
  };

  getSeatDutyByDate = date => {
    const nowMonment = moment(new Date());
    querySeatDuty(
      {
        dateTime: date,
        dutySeat: '',
      },
      ({ data }) => {
        if (nowMonment.isSame(date, 'd')) {
           this.setState({
             isAbled: true
           })
        } else {
          this.setState({
            isAbled: false
          })
        }
        const { dutyTable, allSeatData } = this.state;
        if (data) {
          dutyTable.forEach(dutyTableItem => {
            // eslint-disable-next-line no-param-reassign
            dutyTableItem.class0 = '';
            // eslint-disable-next-line no-param-reassign
            dutyTableItem.class1 = '';
            // eslint-disable-next-line no-param-reassign
            dutyTableItem.class2 = '';
            data.forEach(item => {
              if (dutyTableItem.seatId === item.duty.dutySeat) {
                const { dutyInfoDTOList } = item;
                dutyInfoDTOList.forEach((dutyInfoItem, index) => {
                  // eslint-disable-next-line no-param-reassign
                  dutyTableItem[`class${index}`] = `${dutyInfoItem.user.userName}(${moment(
                    dutyInfoItem.dutyInfo.dutyStartTime
                  ).format('HH:mm')}~${moment(dutyInfoItem.dutyInfo.dutyEndTime).format('HH:mm')})`;
                });
              }
            });
          });
          this.setState({
            dutyTable,
          });
          this.forceUpdate();
        } else {
          this.changeSeatData2DutyTable(allSeatData);
        }
      }
    );
  };

  onPanelChange = value => {
    this.getUserDutyList(value.toDate());
    this.setState({
      selectedMonth: value,
    });
  };

  dateCellRender = value => {
    const { userDutyList, selectedDate, userShowList } = this.state;
    const day = value.date();
    const content = [];
    let flag = false;
    let visible = false;
    const isSelectDate = selectedDate.isSame(value, 'day');
    userDutyList.forEach(item => {
      if (moment(value).isSame(moment(item.duty.dutyDate), 'day')) {
        flag = true;
        item.dutyInfoDTOList.forEach(dutyInfo => {
          const { user } = dutyInfo;
          content.push(user.userName);
        });
      }
    });
    userShowList.forEach(item => {
      if (moment(value).isSame(moment(item.duty.dutyDate), 'day')) {
        visible = true;
      }
    });
    const { selectedMonth } = this.state;
    const isSameMonth = selectedMonth.isSame(value, 'month');
    const today = moment(new Date());
    const isToday = today.isSame(value, 'd');
    return (
      <div
        className={[
          isSameMonth
            ? isToday
              ? styles.isToday
              : flag
                ? styles.yes
                : styles.no
            : styles.notSameMonth,
          isSelectDate ? (isToday ? styles.blackBorder : styles.selectedDate) : '',
          styles.base,
        ].join(' ')}
      >
        <span className={[styles.day, visible ? styles.dayShow : ''].join(' ')}>{day}</span>
        {/* <span className={styles.day}>{day}</span> */}
        <div className={styles.calendar_content}>
          {content.map((item, index) => {
            return <p key={`${index + 1}`}>{item}</p>;
          })}
        </div>
      </div>
    );
  };

  getUserDutyList = date => {
    getUserDutyList(
      {
        searchValue: '',
        date,
      },
      ({ data }) => {
        console.log('getUserDutyList--data：', data);
        this.setState({
          userDutyList: data,
        });
      },
      e => {
        console.log('getUserDutyList--error：', e.toString());
      }
    );
  };

  getAllSeatData = () => {
    getAllSeatData(
      {},
      ({ data }) => {
        console.log('getAllSeatData--data', data);
        if (data.length > 0) {
          this.setState({
            allSeatData: data,
          });
          this.changeSeatData2DutyTable(data);
        }
      },
      e => {
        console.log('getAllSeatData--error', e.toString());
      }
    );
  };

  onClickDeleteArrangement = () => {
    const { selectedDate, selectedMonth } = this.state;
    const date = moment(new Date());
    if (selectedMonth.isBefore(date, 'month') || selectedMonth.isBefore(date, 'year')) {
      message.warning(formatMessage('guet.schedule.month_shift_cannot_be_deleted'));
      return;
    }

    confirm({
      title: formatMessage('guet.schedule.operation_message'),
      content: formatMessage('guet.schedule.confirm_delete_this_month_schedule'),
      okText: formatMessage('guet.schedule.confirm'),
      cancelText: formatMessage('guet.schedule.cancel'),
      onOk: () =>{
        deleteArrangementList(
          {
            time: selectedMonth.toDate(),
          },
          data => {
            console.log('deleteArrangementList--data：', data);
            if (data.data > 0) {
              message.success(formatMessage('guet.schedule.delete_successfully'));
              this.getUserDutyList(selectedDate.toDate());
            } else {
              message.warning(formatMessage('guet.schedule.delete_failed'));
            }
          },
          e => {
            console.log('deleteArrangementList--error：', e.toString());
          }
        );
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  };

  // 导出排班
  exportDuty = () => {
    const { selectedMonth } = this.state;
    console.log(selectedMonth.toDate().toString());
    exportDuty(selectedMonth.toDate().toString());
  };

  toggleShow = seatId => {
    const { showModal } = this.state;

    this.setState({
      showModal: !showModal,
      editSeatId: seatId,
    });
  };

  sendSuccess = () => {
    const { selectedDate } = this.state;
    this.getUserDutyList(selectedDate.toDate());
    this.getSeatDutyByDate(selectedDate);
  };

  onChangeParam = e => {
    this.setState({
      param: e.target.value,
    });
  };

  onClickSearch = () => {
    const { selectedDate, param } = this.state;
    const date = selectedDate.toDate();
    // this.getUserDutyList(selectedDate.toDate());
    getUserDutyList(
      {
        searchValue: param,
        date,
      },
      ({ data }) => {
        console.log('getUserDutyList--data：', data);
        if (param !== '') {
          this.setState({
            userShowList: data,
          });
        } else {
          this.setState({
            userShowList: [],
          });
        }
      },
      e => {
        console.log('getUserDutyList--error：', e.toString());
      }
    );
  };

  render() {
    const { dutyTable, selectedDate, showModal, editSeatId, param, isAbled } = this.state;
    const permission = localStorage.getItem('permission');
    const columns = [
      {
        title: formatMessage('guet.schedule.duty_seat'),
        dataIndex: 'seatName',
        width: '20%',
        key: 'seatId',
      },
      { title: formatMessage('guet.schedule.one_arrangement'), dataIndex: 'class0', width: '20%' },
      { title: formatMessage('guet.schedule.two_arrangement'), dataIndex: 'class1', width: '20%' },
      {
        title: formatMessage('guet.schedule.three_arrangement'),
        dataIndex: 'class2',
        width: '20%',
      },
      {
        width: '10%',
        render: (_, record) => {
          if (record.class0 && permission === '1') {
            return (
              !isAbled ? (
                <a
                  onClick={() => {
                  this.toggleShow(record.seatId);
                  }}
                >
                  {formatMessage('guet.schedult.edit')}
                </a>
              ) : null
            );
          }
          return null;
        },
      },
    ];
    return (
      <>
        <div className={styles.delete}>
          <Button type="primary" onClick={this.exportDuty} disabled={permission !== '1'}>
            {formatMessage('guet.schedule.export_to_local')}
          </Button>
          <Button
            onClick={this.onClickDeleteArrangement}
            type="danger"
            disabled={permission !== '1'}
            style={{ marginLeft: '10px' }}
          >
            {formatMessage('guet.schedule.delete_shift')}
          </Button>
          <Input
            value={param}
            onChange={this.onChangeParam}
            style={{ width: '220px', marginLeft: '10px' }}
            placeholder={formatMessage('guet.schedule.name')}
          />
          <Button onClick={this.onClickSearch} style={{ marginLeft: '10px' }}>
            {formatMessage('guet.schedule.search_for')}
          </Button>
        </div>
        <div className={styles.calendar}>
          <Calendar
            onPanelChange={this.onPanelChange}
            mode="month"
            dateFullCellRender={this.dateCellRender}
            onSelect={this.onSelectDate}
          />
        </div>
        <div style={{ padding: '0 13px' }}>
          <Table
            rowKey="seatId"
            title={() => (
              <>
                <span className={styles.markBabel} />{' '}
                {`${selectedDate.format('DD/MM/YYYY')} ${formatMessage('guet.schedule.situation')}`}
                {permission === ADMIN && (
                  <Button
                    disabled={isAbled}
                    onClick={() => this.toggleShow()}
                    style={{ position: 'absolute', right: '10px' }}
                    type="primary"
                    size="small"
                  >
                    {formatMessage('schedule.scheduling')}
                  </Button>
                )}
              </>
            )}
            bordered
            pagination={false}
            columns={columns}
            dataSource={dutyTable}
          />
        </div>
        <Modals
          visible={showModal}
          title={`${selectedDate.format('DD/MM/YYYY')}`}
          onCancel={this.toggleShow}
          footer={null}
        >
          <SchedulEditor
            selectedDate={selectedDate}
            seatId={editSeatId}
            sendSuccess={this.sendSuccess}
            toggleShow={this.toggleShow}
          />
        </Modals>
      </>
    );
  }
}

export default Scheduling;
