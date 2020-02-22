import { formatMessage as _formatMessage } from 'umi/locale';
import React from 'react';
import { Button, Calendar, Col, Form, Input, Row, Select } from 'antd';
import moment from 'moment';
import styles from './index.less';
import { getUserDutyList, getAllSeatData, querySeatDuty } from '../../services/scheduleService';

const formatMessage = id => {
  return _formatMessage({ id });
};

class Scheduling extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment(new Date()),
      selectedDay: new Date(),
      searchValue: '',
      userDutyList: [],
      seatArrays: [],
      selectedDuty: {},
    };
  }

  componentDidMount() {
    const { searchValue, selectedDate } = this.state;
    this.getUserDutyList(searchValue, selectedDate.toDate());
    this.getAllSeatData();
  }

  querySeatDuty = (selectedDate, dutySeat) => {
    querySeatDuty({ dateTime: selectedDate, dutySeat }, ({ data }) => {
      if (data !== null) {
        this.setState({
          selectedDuty: { ...data },
        });
      } else {
        this.setState({
          selectedDuty: {},
        });
      }
    });
  };

  onSelectDate = value => {
    const { form } = this.props;
    form.resetFields();
    const { selectSeat } = this.state;
    this.querySeatDuty(value.toDate(), selectSeat);
    this.setState({
      selectedDate: moment(value),
    });
  };

  selectDutySeat = value => {
    const { selectedDate } = this.state;
    this.querySeatDuty(selectedDate.toDate(), value);
  };

  dateCellRender = value => {
    const { userDutyList, selectedDate } = this.state;
    const day = value.date();
    const content = [];
    let flag = false;
    const isSelectDate = selectedDate.isSame(value, 'day');
    userDutyList.forEach(item => {
      if (value.isSame(moment(item.duty.dutyDate), 'day')) {
        flag = true;
        item.dutyInfoDTOList.forEach(dutyInfo => {
          const { userList } = dutyInfo;
          userList.forEach(user => {
            content.push(user.userName);
          });
        });
      }
    });
    return (
      <div
        className={[flag ? styles.yes : styles.no, isSelectDate ? styles.selectedDate : ''].join(
          ' '
        )}
      >
        <ul className={styles.calendar_content}>
          <li className={styles.day}>{day}</li>
          <li className={styles.content}>{content.join(',')}</li>
        </ul>
      </div>
    );
  };

  onSearchArrangement = () => {
    const { selectedDay, searchValue } = this.state;
    this.getUserDutyList(searchValue, selectedDay);
    this.setState({
      searchValue,
    });
  };

  getUserDutyList = (searchValue, date) => {
    getUserDutyList(
      {
        searchValue,
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
        this.setState({
          seatArrays: data,
        });
        if (data.length > 0) {
          this.setState({
            selectSeat: data[0].id,
          });
          const { selectedDate } = this.state;
          this.querySeatDuty(selectedDate.toDate(), data[0].id);
        }
      },
      e => {
        console.log('getAllSeatData--error', e.toString());
      }
    );
  };

  onChangeParam = e => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { selectedDate, searchValue, seatArrays, selectedDuty } = this.state;
    const seatOptions = [];
    if (seatArrays.length > 0) {
      seatArrays.forEach(item => {
        seatOptions.push(
          <Select.Option key={item.id} value={item.id}>
            {item.name}
          </Select.Option>
        );
      });
    }
    let dutySeat = '';
    const dutyShift = [];

    if (JSON.stringify(selectedDuty) !== '{}') {
      dutySeat = selectedDuty.duty.dutySeat;
      const mode = selectedDuty.duty.dutyMode;
      selectedDuty.dutyInfoDTOList.forEach((duty, ind) => {
        const shift = [];
        const {
          userList,
          dutyInfo: { classNumber, dutyStartTime, dutyEndTime },
        } = duty;
        const dutyMode = (
          <Row gutter={24}>
            <Col span={1} />
            <Col span={6}>{formatMessage('guet.schedule.duty_mode')}</Col>
            <Col span={4}>{mode}班</Col>
          </Row>
        );
        const dutyRange = (
          <Row gutter={24}>
            <Col span={1} />
            <Col span={6}>{formatMessage('guet.schedule.duty_time_period')}</Col>
            <Col span={4}>第{classNumber}班</Col>
            <Col span={8}>
              {moment(dutyStartTime).format('HH:mm')} ~ {moment(dutyEndTime).format('HH:mm')}
            </Col>
          </Row>
        );
        const userListArray = [];
        userList.forEach((user, index) => {
          const userDeail = (
            <Row gutter={24}>
              <Col span={1} />
              <Col span={6}>值班人员{index + 1}</Col>
              <Col span={4}>{user.userName}</Col>
            </Row>
          );
          userListArray.push(userDeail);
        });
        shift.push(dutyMode);
        shift.push(dutyRange);
        shift.push(userListArray);
        let num = 8;
        if (typeof mode !== 'undefined' && typeof mode === 'number') {
          if (mode === 1) {
            num = 12;
          } else if (mode === 2) {
            num = 10;
          } else if (mode === 3) {
            num = 6;
          }
        }
        const shiftRange = <Col span={num}>{shift}</Col>;
        dutyShift.push(shiftRange);
        if (mode > 1 && mode > ind + 1) {
          dutyShift.push(
            <Col span={2}>
              <div className={styles.content_division_vertical} />
            </Col>
          );
        }
      });
    }

    return (
      <>
        <div className={styles.search}>
          <Input
            style={{ width: '170px', marginLeft: '10px' }}
            placeholder={formatMessage('guet.schedule.enter_search_criteria')}
            value={searchValue}
            onChange={this.onChangeParam}
          />
          <Button style={{ marginLeft: '10px' }} onClick={this.onSearchArrangement}>
            {formatMessage('guet.schedule.search_for')}
          </Button>
        </div>
        <div className={styles.calendar}>
          <Calendar
            mode="month"
            dateFullCellRender={this.dateCellRender}
            onSelect={this.onSelectDate}
          />
        </div>
        <Form>
          <div className={styles.form}>
            <Row gutter={24}>
              <Col span={4}>
                <Form.Item label=" " colon={false} labelCol={{ span: 6 }}>
                  {selectedDate.format('DD/MM YYYY')}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  label={formatMessage('guet.schedule.duty_seat')}
                >
                  {getFieldDecorator('seat', {
                    initialValue: dutySeat,
                  })(<Select onChange={this.selectDutySeat}>{seatOptions}</Select>)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>{dutyShift}</Row>
          </div>
        </Form>
      </>
    );
  }
}

export default Form.create()(Scheduling);
