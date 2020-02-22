import { formatMessage as _formatMessage } from 'umi/locale';
import React from 'react';
import { Button, Form, Select, TimePicker, message } from 'antd';
import moment from 'moment';
import FormItem from 'antd/lib/form/FormItem';
import styles from './index.less';
import {
  getUserList,
  setUserDuty,
  updateDuty,
  getUserBySeat,
  getAllSeatData,
  querySeatDuty,
} from '../../services/scheduleService';


import FlexFormItem from '@/common/components/flexFormLayout/FlexFormItem';
import FlexColContainer from '@/common/components/flexFormLayout/FlexColContainer';
import FlexCol from '@/common/components/flexFormLayout/FlexCol';
import PlaceHolder from '@/common/components/flexFormLayout/PlaceHolder';
import ContainerWithTitle from '@/common/components/containerWithTitle/ContainerWithTitle';

import { limtTimeHour, limtTimeMinute, limtTimeMinutes, limtTimeHours } from '@/utils/utils';

const formatMessage = id => {
  return _formatMessage({ id });
};

class SchedulEditor extends React.PureComponent {

  constructor(props) {
    super(props);
    const { selectedDate } = this.props;
    this.state = {
      selectedDate,
      modelList: [{ startTime: undefined, endTime: undefined, onDutyStaff: [] }],
      selectedDuty: {},
      userList: [],
      isEdit: false,
      errorIndex: -1,
      seatArrays: [],
    };
  }

  componentDidMount() {
    // 获取所有的席位
    this.getAllSeatData();
  }

  componentWillReceiveProps(nextProps) {
    const { selectedDate, form } = nextProps;
    const { seatArrays, selectedDate: selectedDateState } = this.state;
    if (!selectedDate.isSame(selectedDateState, 'day')) {
      this.setState({
        isEdit: false,
        selectedDate,
      });
      // 获取席位的所有用户
      this.getUserBySeat(seatArrays[0].id);
      // 获取席位选中日期的排班
      this.querySeatDuty(selectedDate.toDate(), seatArrays[0].id);
      form.resetFields();
    }
  }

  changeDutyInfoDTOList2ModelList = selectedDuty => {
    if (!selectedDuty || JSON.stringify(selectedDuty) === '{}') {
      this.setState({
        modelList: [{ startTime: null, endTime: null, onDutyStaff: [] }],
      });
      return;
    }
    const { dutyInfoDTOList } = selectedDuty;
    if (dutyInfoDTOList) {
      const modelList = [];
      dutyInfoDTOList.forEach(item => {
        const onDutyStaff = [];
        onDutyStaff.push(item.user.id);
        modelList.push({
          startTime: moment(item.dutyInfo.dutyStartTime),
          endTime: moment(item.dutyInfo.dutyEndTime),
          onDutyStaff,
        });
      });
      this.setState({
        modelList,
      });
      const { form } = this.props;
      form.setFieldsValue({ modelList });
    }
  };

  refresh = () => {
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue();
  };

  changeMode = value => {
    const { form } = this.props;
    const { modelList } = form.getFieldsValue();
    switch (value) {
      case 1:
        if (modelList.length > 1) {
          modelList.splice(1, 2);
        }
        break;
      case 2:
        if (modelList.length === 1) {
          modelList.push({ startTime: undefined, endTime: undefined, onDutyStaff: [] });
        } else if (modelList.length === 3) {
          modelList.splice(2, 1);
        }
        break;
      case 3:
        for (let i = 0; i <= 3 - modelList.length; i++) {
          modelList.push({ startTime: undefined, endTime: undefined, onDutyStaff: [] });
        }
        break;
      default:
        break;
    }
    form.setFieldsValue({ modelList });
    this.setState({
      modelList,
    });
    this.refresh();
  };

  getAllSeatData = () => {
    getAllSeatData({}, ({ data }) => {
      this.setState({
        seatArrays: data,
      });
      const { selectedDate, seatId } = this.props;
      if (seatId) {
        // 获取席位的所有用户
        this.getUserBySeat(seatId);
        // 获取席位选中日期的排班
        this.querySeatDuty(selectedDate.toDate(), seatId);
      } else {
        // 获取席位的所有用户
        this.getUserBySeat(data[0].id);
        // 获取席位选中日期的排班
        this.querySeatDuty(selectedDate.toDate(), data[0].id);
      }
    });
  };

  querySeatDuty = (selectedDate, dutySeat) => {
    querySeatDuty({ dateTime: selectedDate, dutySeat }, ({ data }) => {
      if (data !== null) {
        this.setState({
          selectedDuty: { ...data[0] },
          isEdit: true,
        });
        this.changeDutyInfoDTOList2ModelList(data[0]);
      } else {
        this.setState({
          isEdit: false,
          modelList: [
            {
              startTime: undefined,
              endTime: undefined,
              onDutyStaff: [],
            },
          ],
          selectedDuty: {},
        });
      }
    });
  };

  getUserBySeat = value => {
    getUserBySeat(
      {
        seatId: value,
      },
      data => {
        this.setState({
          userList: data.data,
        });
      }
    );
  };

  handleSearch = value => {
    const { form, selectedDate } = this.props;

    // 切换值班席清空值班人员
    const v = form.getFieldsValue(['modelList']);
    v.mode = 1;
    v.modelList.forEach(item => {
      item.onDutyStaff[0] = '';
    });

    form.setFieldsValue(v);
    form.resetFields(['mode']);
    this.getUserBySeat(value);
    setTimeout(this.querySeatDuty(selectedDate.toDate(), value), 0);
  };

  // 保存排班安排
  handleSubmit = e => {
    e.preventDefault();
    const { form, selectedDate, sendSuccess, seatId } = this.props;
    const { isEdit } = this.state;
    const userId = localStorage.getItem('userId');
    if (selectedDate.isBefore(moment(new Date()), 'day')) {
      message.error(formatMessage('guet.schedule.cannot_schedule_now'));
      return;
    }
    form.validateFields((err, values) => {
      if (!err) {
        const { mode, seat, modelList } = values;
        console.log('modeList', modelList);
        if (modelList.length === 1) {
          const startTime0 = modelList[0].startTime.seconds(0);
          const endTime0 = modelList[0].endTime.seconds(0);
          if (
            moment(selectedDate).isSame(moment(new Date()), 'day') &&
            moment(startTime0).hour() < moment(new Date()).hour()
          ) {
            message.error(formatMessage('guet.schedule.schedule_cannot_be_earlier_than_now'));
            return;
          }
          if (
            moment(selectedDate).isSame(moment(new Date()), 'day') &&
            moment(startTime0).hour() === moment(new Date()).hour() &&
            moment(startTime0).minute() < moment(new Date()).minute()
          ) {
            message.error(formatMessage('guet.schedule.schedule_cannot_be_earlier_than_now'));
            return;
          }
          if (endTime0.isBefore(startTime0)) {
            message.error(formatMessage('guet.schedule.first_scheduling_time_error'));
            return;
          }
        }
        if (modelList.length > 1) {
          const startTime0 = modelList[0].startTime.seconds(0);
          if (
            moment(selectedDate).isSame(moment(new Date()), 'day') &&
            moment(startTime0).hour() < moment(new Date()).hour() &&
            moment(startTime0).minute() < moment(new Date()).minute()
          ) {
            message.error(formatMessage('guet.schedule.schedule_cannot_be_earlier_than_now'));
            return;
          }
          const endTime0 = modelList[0].endTime.seconds(0);
          const endTime1 = modelList[1].endTime.seconds(0);
          const startTime1 = modelList[1].startTime.seconds(0);
          if (endTime0 !== undefined && startTime1 !== undefined) {
            if (endTime0.isAfter(startTime1)) {
              message.error(formatMessage('guet.schedule.first_and_second_conflict'));
              return;
            }
            console.log('minutes', endTime0.minute());
            // if (
            //   endTime0.isSame(startTime1, 'hour') &&
            //   startTime1.minute() - endTime0.minute() < 5
            // ) {
            //   message.warning(formatMessage('guet.schedule.first_and_second_gap_cannot_less_five'));
            //   return;
            // }
          }
          if (endTime0.isBefore(startTime0)) {
            message.error(formatMessage('guet.schedule.first_scheduling_time_error'));
            return;
          }
          if (endTime1.isBefore(startTime1)) {
            message.error(formatMessage('guet.schedule.second_scheduling_time_error'));
            return;
          }

          if (modelList.length > 2) {
            const startTime2 = modelList[2].startTime.seconds(0);
            const endTime2 = modelList[2].endTime.seconds(0);
            if (endTime1 !== undefined && startTime2 !== undefined) {
              if (endTime1.isAfter(startTime2)) {
                message.error(formatMessage('guet.schedule.second_and_third_conflict'));
                return;
              }
              // if (
              //   endTime1.isSame(startTime2, 'hour') &&
              //   startTime2.minute() - endTime1.minute() < 5
              // ) {
              //   message.warning(
              //     formatMessage('guet.schedule.second_and_third_gap_cannot_less_five')
              //   );
              //   return;
              // }
            }
            if (endTime2.isBefore(startTime2)) {
              message.error(formatMessage('guet.schedule.third_schduling_time_error'));
              return;
            }
          }
        }
        const duty = {
          dutyDate: selectedDate.toDate(),
          dutyMode: mode,
          dutySeat: seat,
          id: 0,
          releaseTime: new Date(),
          userId, // todo 从其他地方获取
        };
        const dutyInfoList = modelList.map((item, index) => {
          return {
            classNumber: index + 1,
            dutyEndTime: item.endTime.toDate(),
            dutyStartTime: item.startTime.toDate(),
            dutyUserId: item.onDutyStaff[0],
          };
        });
        if (isEdit) {
          const {
            selectedDuty: { duty: selectduty },
          } = this.state;
          duty.id = selectduty.id;
          // 更新值班信息
          updateDuty(
            {
              duty,
              dutyInfoList,
            },
            ({ data }) => {
              message.success(formatMessage('guet.schedule.update_success'));
              console.log('updateUserDuty--data：', data);
              sendSuccess();
            },
            error => {
              message.warning(formatMessage('guet.schedule.update_fail'));
              console.log('updateUserDuty--error：', error.toString());
            }
          );
          this.props.toggleShow(seatId);
        } else {
          // 插入值班信息
          setUserDuty(
            {
              duty,
              dutyInfoList,
            },
            ({ data }) => {
              message.success(formatMessage('guet.schedule.save_success'));
              sendSuccess();
              this.setState({
                selectedDuty: { duty: { ...duty, id: data }, dutyInfoList: [...dutyInfoList] },
                isEdit: true,
              });
            },
            error => {
              message.warning(formatMessage('guet.schedule.save_fail'));
              console.log('setUserDuty--error：', error.toString());
            }
          );
          this.props.toggleShow(seatId);
        }
      }
    });
  };

  getUserList = () => {
    getUserList(
      {},
      ({ data }) => {
        console.log('getUserList--data：', data);
        this.setState({
          userList: data,
        });
      },
      e => {
        console.log('getUserList--error：', e.toString());
      }
    );
  };

  limtTimeStart = (index, selectedHour) => {
    const {
      form: { getFieldValue },
    } = this.props;
    const perEndTime = getFieldValue(`modelList[${index - 1}].endTime`);
    if (selectedHour) {
      if (perEndTime) {
        return limtTimeMinutes(perEndTime, selectedHour);
      }
      return limtTimeMinute(perEndTime, selectedHour);
    }
    return limtTimeHour(perEndTime);
  };

  limtTimeEnd = (index, selectedHour) => {
    const {
      form: { getFieldValue },
    } = this.props;
    const startTime = getFieldValue(`modelList[${index}].startTime`);

    if (selectedHour) {
      return limtTimeMinute(startTime, selectedHour);
    }
    return limtTimeHours(startTime);
  };

  // validateEndTime = (modelListIndex, val, callback) => {
  //   const {
  //     form: { getFieldValue, validateFields },
  //   } = this.props;
  //   const currentStartTime = getFieldValue(`modelList[${modelListIndex}].startTime`);
  //   const nextStartTime = getFieldValue(`modelList[${modelListIndex + 1}].startTime`);
  //   if (nextStartTime) {
  //     if (val.isAfter(nextStartTime)) {
  //       callback('error');
  //     }
  //   }
  //   if (currentStartTime) {
  //     if (val.isSame(currentStartTime) || val.isBefore(currentStartTime)) {
  //       callback('error');
  //     }
  //     if (val.isSame(currentStartTime, 'h') && currentStartTime.minutes() + 5 > val.minutes()) {
  //       callback('error');
  //     }
  //   }
  //   const list = getFieldValue('modelList');
  //   const sList = [];
  //   list.forEach(index => {
  //     sList.push(`modelList[${index + 1}].endTime`);
  //   });
  //   validateFields(sList, { force: true }, (...arg) => {
  //     console.log(arg);
  //   });
  //   callback();
  // };

  validateStartTime = (modelListIndex, val, callback) => {
    const { selectedDate } = this.state;
    console.log('selectedDate', selectedDate);
    const {
      form: { getFieldValue, validateFields },
    } = this.props;
    const lastEndTime = getFieldValue(`modelList[${modelListIndex - 1}].endTime`)
    const endTime = getFieldValue(`modelList[${modelListIndex}].endTime`);
    if (endTime) {
      validateFields([`modelList[${modelListIndex}].endTime`], { force: true });
    }
    if (lastEndTime) {
      validateFields([`modelList[${modelListIndex - 1}].endTime`], { force: true });
      if (val.isBefore(lastEndTime)) {
        callback('error')
      }
    }
    callback();
  }

  validateEndTime = (modelListIndex, val, callback) => {
    const { selectedDate } = this.state;
    this.setState({
      errorIndex: -1,
    })
    const {
      form: { getFieldValue },
    } = this.props;
    const valHour = val.hour();
    const valMimutes = val.minutes();
    const valSeconds = val.seconds();
    const valMoment = moment(selectedDate).hour(valHour).minutes(valMimutes).seconds(valSeconds);
    const currentStartTime = getFieldValue(`modelList[${modelListIndex}].startTime`);
    const nextStartTime = getFieldValue(`modelList[${modelListIndex + 1}].startTime`);
    if (nextStartTime) {
    const nextHour = nextStartTime.hour();
    const nextMinutes = nextStartTime.minutes()
    const nextSeconds = nextStartTime.seconds();
    const nextMoment = moment(selectedDate).hour(nextHour).minutes(nextMinutes).seconds(nextSeconds);
      if (valMoment.isAfter(nextMoment)) {
        this.setState({
          errorIndex: modelListIndex
        })
        callback('error');
      }
    }
    if (currentStartTime) {
      const currentHour = currentStartTime.hour();
      const currentMinutes = currentStartTime.minutes();
      const currentSeconds = currentStartTime.seconds();
      const currentMoment =  moment(selectedDate).hour(currentHour).minutes(currentMinutes).seconds(currentSeconds);
      if (valMoment.isSame(currentMoment) || valMoment.isBefore(currentMoment)) {
        callback('error');
      }
      if (valMoment.isSame(currentMoment, 'h') && currentMoment.minutes() + 5 > val.minutes()) {
        callback('error');
      }
    }
    callback();
  }

  // validateStartTime = (modelListIndex, val, callback) => {
  //   const {
  //     form: { getFieldValue, validateFields },
  //   } = this.props;
  //   const lastEndTime = getFieldValue(`modelList[${modelListIndex -1}].endTime`)
  //   const endTime = getFieldValue(`modelList[${modelListIndex}].endTime`);
  //   if (endTime) {
  //     if (val.isAfter(endTime) ||  val.isSame(endTime)) {
  //       callback('error');
  //     }
  //     if (val.isSame(endTime, 'h') && val.minutes() +5 > endTime.minutes()) {
  //       callback('error')
  //     }
  //   }
  //   if (lastEndTime) {
  //     if (val.isBefore(lastEndTime)) {
  //       callback('error');
  //     }
  //   }
  //   const list = getFieldValue('modelList');
  //   const sList = [];
  //   list.forEach(index => {
  //     sList.push(`modelList[${index + 1}].endTime`);
  //   });
  //   validateFields(sList, { force: true }, (...arg) => {
  //     console.log(arg);
  //   });
  //   callback();
  // };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const { modelList, userList, isEdit, seatArrays, selectedDuty, errorIndex } = this.state;
    const { duty = {} } = selectedDuty;
    let { dutyMode = 1, dutySeat = undefined } = duty;

    if (JSON.stringify(duty) === '{}') {
      if (seatArrays.length > 0) {
        dutySeat = seatArrays[0].id;
      }
    }
    const seatOptions = [];
    const inputWidth = 150;

    if (seatArrays.length > 0) {
      seatArrays.forEach(item => {
        seatOptions.push(
          <Select.Option title={item.name} key={item.id} value={item.id}>
            {item.name}
          </Select.Option>
        );
      });
    }

    const map = [
      formatMessage('guet.schedule.one_arrangement'),
      formatMessage('guet.schedule.two_arrangement'),
      formatMessage('guet.schedule.three_arrangement'),
    ];
    const modelListLayout = modelList.map((item, modelListIndex) => {
      return (
        <ContainerWithTitle key={`${modelListIndex + 1}`} title={map[modelListIndex]}>
          <FlexColContainer>
            <FlexCol>
              <FlexFormItem labelText={formatMessage('guet.schedule.start_time')}>
                <FormItem>
                  {getFieldDecorator(`modelList[${modelListIndex}].startTime`, {
                    rules: [
                      { required: true, message: '请输入开始时间!' },
                      {
                        message: 'error',
                        validator: (_, val, callback) =>
                          this.validateStartTime(modelListIndex, val, callback),
                      },
                    ],
                    initialValue: item.startTime,
                  })(
                    <TimePicker
                      defaultOpenValue={moment(getFieldValue(`modelList[${modelListIndex-1}].endTime`))}
                      style={{ width: inputWidth }}
                      disabledHours={() => this.limtTimeStart(modelListIndex)}
                      disabledMinutes={selectedHour =>
                        this.limtTimeStart(modelListIndex, selectedHour)
                      }
                      format="HH:mm"
                      inputReadOnly
                      allowClear={false}
                    />
                  )}
                </FormItem>
              </FlexFormItem>
              <FlexFormItem labelText={formatMessage('guet.schedule.duty_staff')}>
                <FormItem>
                  {getFieldDecorator(`modelList[${modelListIndex}].onDutyStaff[0]`, {
                    rules: [
                      {
                        required: true,
                        message: '',
                      },
                    ],
                    initialValue: item.onDutyStaff[0],
                  })(
                    <Select allowClear style={{ width: inputWidth }} onChange={this.handleOnchange}>
                      {userList ?
                        userList.map(item => {
                          // const last = getFieldValue(`modelList[${modelListIndex - 1}].onDutyStaff[0]`);
                          return (
                            <Select.Option title={item.userName} key={item.id} value={item.id}>
                              {item.userName}
                            </Select.Option>
                          )
                        }
                        ) : null}
                    </Select>
                  )}
                </FormItem>
              </FlexFormItem>
            </FlexCol>
            <FlexCol style={{ marginLeft: '5px' }}>
              <FlexFormItem labelText={formatMessage('guet.schedule.end_time')}>
                <FormItem>
                  {getFieldDecorator(`modelList[${modelListIndex}].endTime`, {
                    rules: [
                      { required: true, message: '请输入结束时间!' },
                      {
                        // message: 'error',
                        validator: (_, val, callback) =>
                          this.validateEndTime(modelListIndex, val, callback),
                      },
                    ],
                    // validateTrigger: 'onSubmit',
                    initialValue: item.endTime,
                  })(
                    <TimePicker
                      defaultOpenValue={moment(getFieldValue(`modelList[${modelListIndex}].startTime`)).add(5, 'm')}
                      style={{ width: inputWidth }}
                      disabledHours={() => this.limtTimeEnd(modelListIndex)}
                      disabledMinutes={selectedHour =>
                        this.limtTimeEnd(modelListIndex, selectedHour)
                      }
                      format="HH:mm"
                      inputReadOnly
                      allowClear={false}
                    />
                  )}
                </FormItem>
              </FlexFormItem>
              {
                modelListIndex === errorIndex ?
                  <span style={{ color: 'red', marginLeft: 5 }}>
                    {errorIndex === 0 ? formatMessage('guet.schedule.class_1_and_class2_conflict') : formatMessage('guet.schedule.class_2_and_class3_conflict')}
                  </span> : null
              }
              <PlaceHolder />
            </FlexCol>
          </FlexColContainer>
        </ContainerWithTitle>
      );
    });

    return (
      <>
        <Form onSubmit={this.handleSubmit} className={styles.dialogForm}>
          <FlexColContainer>
            <FlexCol span={12}>
              <FlexFormItem labelText={formatMessage('guet.schedule.duty_seat')}>
                {getFieldDecorator('seat', {
                  initialValue: dutySeat,
                })(
                  <Select style={{ width: '150px' }} onChange={this.handleSearch}>
                    {seatOptions}
                  </Select>
                )}
              </FlexFormItem>
            </FlexCol>
            <FlexCol style={{ marginLeft: '5px' }} span={12}>
              <FlexFormItem labelText={formatMessage('guet.schedule.duty_mode')}>
                {getFieldDecorator('mode', {
                  initialValue: dutyMode,
                })(
                  <Select style={{ width: '150px' }} onChange={this.changeMode}>
                    <Select.Option value={1}>
                      {formatMessage('guet.schedule.one_arrangement')}
                    </Select.Option>
                    <Select.Option value={2}>
                      {formatMessage('guet.schedule.two_arrangement')}
                    </Select.Option>
                    <Select.Option value={3}>
                      {formatMessage('guet.schedule.three_arrangement')}
                    </Select.Option>
                  </Select>
                )}
              </FlexFormItem>
            </FlexCol>
          </FlexColContainer>

          {modelListLayout}

          <div style={{ textAlign: 'center' }}>
            <Button style={{ marginTop: '10px' }} type="primary" htmlType="submit">
              {isEdit ? formatMessage('guet.schedule.update') : formatMessage('guet.schedule.save')}
            </Button>
          </div>
        </Form>
      </>
    );
  }
}

export default Form.create()(SchedulEditor);
