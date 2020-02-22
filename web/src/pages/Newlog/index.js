import { formatMessage as _formatMessage } from 'umi/locale';
import React from 'react';
import { Button, Form, Input, Row, message } from 'antd';
import { Prompt } from 'react-router-dom';
import moment from 'moment';
import {
  getNoSaveLog,
  setLog,
  setSubmitLog,
  queryDutyUser,
  deleteLogList,
  isClockIn
} from '../../services/scheduleService';

import style from './index.less';

const formatMessage = id => {
  return _formatMessage({ id });
};

class Newlog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      log: {
        dutyOperator: '',
        id: 0,
        logContent: '',
        logDate: new Date(),
        logState: false,
        logTitle: '',
        logWeek: '',
        submitTime: new Date(),
        temp: 0,
        timeQuantum: '',
        userId: localStorage.getItem('userId'),
        weather: '',
      },
      date: moment(new Date()).format('YYYY-MM-DD'),
      week: moment.weekdays(moment().day()),
      isUpdate: false,
      unSaved: true,
      curDuty: {},
    };
  }

  componentDidMount() {
    this.getNoSaveLog();
    this.queryCurrentUser();
  }

  componentWillReceiveProps() {
    const { unSaved } = this.state;
    if (!unSaved) {
      this.setState({
        unSaved: true,
      });
    }
    this.setState({
      isUpdate: true,
    });
  }

  queryCurrentUser = () => {
    queryDutyUser({}, ({ data }) => {
      if (data !== null) {
        this.setState({
          curDuty: data
        })
      }
    })
  };

  queryDutyUser = key => {
    queryDutyUser({}, ({ data }) => {
      if (data !== null) {
        const curDuty = data;
        console.log('curDuty', curDuty);
        if (curDuty.dutyInfo.id !== undefined) {
          if (key === 0) {
            this.handleSave(curDuty);
          } else {
            this.handleOnSubmit(curDuty);
          }
        }
      }
      else {
        // eslint-disable-next-line no-lonely-if
        if (key === 0) {
          message.warning(formatMessage('guet.schedule.no_scheduling_now_not_save_log'));
        } else {
          message.warning(formatMessage('guet.schedule.no_scheduling_now_not_submit_log'));
        }
      }
    });
  };

  handleOnSubmit = duty => {
    const { form } = this.props;
    const {
      log,
      date,
    } = this.state;
    const week = moment().day();
    const { user, dutyInfo } = duty;
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    console.log('dutyInfo', dutyInfo.id);
    form.validateFields((err, values) => {
      console.log('handleSubmit Received values of form: ', values);
      if (!err) {
        const { weather, temperature, content } = values;
        isClockIn({},
        res => {
          if(res.data) {
            setSubmitLog(
              {
                dutyInfoId: dutyInfo.id,
                id: log.id,
                logContent: content,
                logState: false,
                logDate: new Date(),
                submitTime: new Date(),
                userId,
                temp: temperature,
                weather,
                dutyOperator: user.userName,
                timeQuantum: `${moment(dutyInfo.dutyStartTime).format('HH:mm')}~${moment(
                  dutyInfo.dutyEndTime
                ).format('HH:mm')}`,
                logTitle: `${date}${userName} ${formatMessage('guet.schedule.duty_log')}`,
                logWeek: week,
              },
              ({ data }) => {
                if (data === -4) {
                  message.error(formatMessage('guet.schedule.attendant_has_submitted_log_and_cannot_submit_again'));
                }
                if (data === -2) {
                  message.error(formatMessage('guet.schedule.current_time_is_not checked_log_submission_failed'))
                  return;
                }
                if (data === -3) {
                  message.error(formatMessage('guet.schedule.completed_shift_log_submission_failed'))
                }
                if (data > 0) {
                  message.success(formatMessage('guet.schedule.submit_success'));
                }
                form.resetFields();
                this.setState({
                  unSaved: false,
                  log: {
                    dutyOperator: '',
                    id: 0,
                    logContent: '',
                    logDate: new Date(),
                    logState: false,
                    logTitle: '',
                    logWeek: '',
                    submitTime: new Date(),
                    temp: 0,
                    timeQuantum: '',
                    userId: localStorage.getItem('userId'),
                    weather: '',
                  },
                });
              },
              error => {
                console.log('setSubmitExplain--error：', error.toString());
              }
            );
          } else {
            message.warning(formatMessage('guet.schedule.current_user_not_checking_cannot_submit_logs'));
          }
        },
        e => console.log('isClockIn-error', e.toString())
        )
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.queryDutyUser(1);
  };

  handleSave = duty => {
    const { form } = this.props;
    const {
      log,
      date,
    } = this.state;
    const { user, dutyInfo } = duty;
    const week = moment().day();
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    form.validateFields((err, values) => {
      console.log('handleSave Received values of form: ', values);
      if (!err) {
        const { weather, temperature, content } = values;
        isClockIn({
        }, res1 => {
           if(res1.data) {
            setLog(
              {
                id: log.id,
                dutyInfoId: dutyInfo.id,
                logContent: content,
                logState: false,
                logDate: new Date(),
                submitTime: new Date(),
                userId, // todo 从其他地方获取
                temp: temperature,
                weather,
                dutyOperator: user.userName,
                timeQuantum: `${moment(dutyInfo.dutyStartTime).format('HH:mm')}~${moment(
                  dutyInfo.dutyEndTime
                ).format('HH:mm')}`,
                logTitle: `${date}${userName} ${formatMessage('guet.schedule.duty_log')}`, // todo 从其他地方获取
                logWeek: week,
              },
              ({ data }) => {
                if (data === -4) {
                  message.error(formatMessage('guet.schedule.duty_been_submitted_cannot_be_saved_again'));
                }
                if (data === -2) {
                  message.error(formatMessage('guet.schedule.current_time_not_checked_the_log_save_fails'))
                }
                if (data === -3) {
                  message.error(formatMessage('guet.schedule.completed_shift_log_save_failed'))
                }
                if (data > 0) {
                  message.success(formatMessage('guet.schedule.save_success'));
                }
                this.setState({
                  log: { ...log, id: data },
                  unSaved: false,
                });
              },
              e => {
                console.log('setLog--error：', e.toString());
              }
            );
           } else {
             message.warning(formatMessage('guet.schedule.current_user_not_checking_cannot_save_logs'));
           }
        },
        e => console.log('isClockIn-error', e.toString()),
        )
        
      }
    });
  };

  // 保存日志
  onClickSaveLog = () => {
    this.queryDutyUser(0);
  };

  getNoSaveLog = () => {
    const userId = localStorage.getItem('userId');
    getNoSaveLog(
      {
        userId, // todo 从其他地方获取
      },
      ({ data }) => {
        console.log('getNoSaveLog--data：', data);
        if (data !== null) {
          this.setState({
            log: data,
            unSaved: false,
          });
        }
      },
      e => {
        console.log('getUserNotSaveExplain--error：', e.toString());
      }
    );
  };

  resetForm = () => {
    const { form } = this.props;
    const { log } = this.state;
    form.resetFields();
    this.setState({
      unSaved: false,
      log: {
        dutyOperator: '',
        id: 0,
        logContent: '',
        logDate: new Date(),
        logState: false,
        logTitle: '',
        logWeek: '',
        submitTime: new Date(),
        temp: 0,
        timeQuantum: '',
        userId: localStorage.getItem('userId'),
        weather: '',
      },
    });
    if (log.id === 0) {
      deleteLogList([0])
      return;
    }
    deleteLogList([log.id]);
  };

  noSpace = (rule, value, callback) => {
    const reg = /\s*\S+\s*/
    if (!reg.test(value) && value !== '') {
      callback(formatMessage('guet.schedule.input_space_invalid'));
    } else {
      callback();
    }
  };
  
 noSpaceAndtempra = (rule, value, callback) => {
   const reg = /\s*\S+\s*/;
   const reg1 = /^[0-9]*$/;
   if (!reg.test(value) && value !== '') {
     callback(formatMessage('guet.schedule.input_space_invalid'));
  } else if (!reg1.test(value) && value !== '') {
     callback(formatMessage('guet.schedule.please_enter_number'));
   } else {
     callback();
   }
 };

  render() {
    const {
      log,
      date,
      week,
      unSaved,
      isUpdate,
      curDuty: { user = {}, dutyInfo = {} },
    } = this.state;
    const dutyOperator = user.userName || '';
    const {
      form: { getFieldDecorator },
    } = this.props;
    const trueUser = localStorage.getItem('userName') || formatMessage('guet.schedule.actual_duty_person');
    console.log('week', week);
    return (
      <>
        {/* 日记标题： 日期+实际值班人姓名+值班日志 */}
        <Prompt
          message={location => {
            const isLocation = location.pathname.indexOf('/newlog');
            return isLocation === -1 ? formatMessage('guet.schedule.log_no_save_confirmed_leave') : true;
          }}
          when={unSaved && isUpdate}
        />
        <h2 style={{ textAlign: 'center' }}>
          {date}
          {trueUser} {formatMessage('guet.schedule.duty_log')}
        </h2>
        <Form
          autoComplete="off"
          labelCol={{ span: 3 }}
          layout="inline"
          wrapperCol={{ span: 21 }}
          onSubmit={this.handleSubmit}
        >
          {/* className={style.topContainer} */}
          <div style={{ textAlign: 'center' }}>
            <Form.Item wrapperCol={{ span: 24 }}>
              <span>{date}</span>
            </Form.Item>
            <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
              <span>{week}</span>
            </Form.Item>
            <Form.Item
              label={formatMessage('guet.schedule.the_weather')}
              style={{ marginBottom: 0 }}
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('weather', {
                rules: [
                  {
                    required: true,
                    message: formatMessage('guet.schedule.please_enter_the_weather')
                  },
                  {
                    validator: this.noSpace,
                  }
                ],
                initialValue: log.weather,
              })(<Input style={{ width: '100px' }} />)}
            </Form.Item>
            <Form.Item
              label={formatMessage('guet.schedule.temperature')}
              style={{ marginBottom: 0 }}
              labelCol={{ span: 13 }}
              wrapperCol={{ span: 11 }}
            >
              {getFieldDecorator('temperature', {
                rules: [
                  {
                    required: true, message: formatMessage('guet.schedule.please_enter_temperature')
                  },
                  {
                    validator: this.noSpaceAndtempra,
                  }
                ],
                initialValue: log.temp || '',
              })(<Input style={{ width: '100px' }} addonAfter="℃" />)}
            </Form.Item>
          </div>

          <div style={{ textAlign: 'center', marginTop: '-25px' }}>
            <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
              <label>{formatMessage('guet.schedule.duty_time_period')}</label>
              <span>
                {dutyInfo.dutyStartTime ? `${moment(dutyInfo.dutyStartTime).format('HH:mm')}~${moment(
                  dutyInfo.dutyEndTime
                ).format('HH:mm')}` : '- -'}
              </span>
            </div>
            <div className="ant-form-item-label" style={{ marginLeft: '10px' }}>
              <label>{formatMessage('guet.schedule.duty_staff')}</label>
              <span>{dutyOperator}</span>
            </div>
          </div>
          <Form.Item
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            style={{ display: 'block', marginBottom: 0 }}
          >
            {getFieldDecorator('content', {
              rules: [
                {
                  required: true,
                  message: formatMessage('guet.schedule.please_input_text')
                },
                {
                  validator: this.noSpace,
                }
              ],
              initialValue: log.logContent,
            })(<Input.TextArea rows={26} />)}
          </Form.Item>
          <Row type="flex" justify="end" style={{ marginBottom: '10px', marginTop: '24px' }}>
            <Button onClick={this.resetForm} type="dashed">
              {formatMessage('guet.schedule.cancel')}
            </Button>
            <Button type="primary" onClick={this.onClickSaveLog} style={{ margin: '0px 10px' }}>
              {formatMessage('guet.schedule.save')}
            </Button>
            <Button type="primary" htmlType="submit">
              {formatMessage('guet.schedule.submit')}
            </Button>
          </Row>
        </Form>
      </>
    );
  }
}

export default Form.create()(Newlog);
