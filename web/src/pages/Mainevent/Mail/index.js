import { formatMessage as _formatMessage, getLocale } from 'umi/locale';
import React from 'react';

import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Table,
  Tabs,
  message,
  Pagination,
  Modal,
} from 'antd';
import moment from 'moment';
import { Prompt } from 'react-router-dom';
import MailDetail from './MailDetail';
import {
  deleteMessageList,
  getMessageList,
  getNoSaveMessage,
  setMessage,
  setSubmitMessageRegistration,
  exportMessage,
  queryDutyUser,
  queryDutyIncidentByTitle,
} from '../../../services/scheduleService';
import FormItem from '@/components/FormItem';
import { debounce } from '@/utils/utils'

const formatMessage = id => {
  return _formatMessage({ id });
};

const { confirm } = Modal;
const columnsDetail = [
  {
    title: formatMessage('guet.schedule.title'),
    dataIndex: 'title',
    width: '50%',
  },
  {
    title: formatMessage('guet.schedule.recorder'),
    dataIndex: 'user',
  },
  {
    title: formatMessage('guet.schedule.release_time'),
    dataIndex: 'time',
  },
];

class Mail extends React.PureComponent {
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      this.setState({
        idList: selectedRowKeys
      })
      const permission = localStorage.getItem('permission');
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      if (selectedRows.length > 0) {
        this.setState({
          isDisabled: false
        });
        if (permission === '1') {
          this.setState({
            isDelDisabled: false,
          })
        }
      } else {
        this.setState({
          isDisabled: true,
          isDelDisabled: true,
        })
      }
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      mailMessage: {
        contentAbstract: '',
        handleSituation: '',
        id: 0,
        messageState: false,
        messageTitle: '',
        messageType: 1,
        operationSeat: '',
        oppositeUnit: '',
        receiveSendTime: new Date(),
        releaseTime: new Date(),
        registrant: '',
        relationEvent: '',
        userId: 0,
      },
      optionsData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      visible: false,
      messageList: [],
      idList: [],
      sort: 2,
      param: '',
      id: 0,
      isUpdate: false,
      unSaved: true,
      isDisabled: true,
      isDelDisabled: true,
      queryDutyIncident: {
        "pageNum": 1,
        "pageSize": 10,
        "searchValue": "",
        "sort": 0
      }
    };
    this.queryDutyIncidentList = debounce(this.queryDutyIncidentList, 800)
  }

  componentDidMount() {
    this.getNoSaveMessage();
    this.queryDutyIncidentList()
  }

  componentWillReceiveProps() {
    const { unSaved } = this.state;
    if (!unSaved) {
      this.setState({
        unSaved: true
      })
    }
    this.setState({
      isUpdate: true,
    });
  };

  componentWillUnmount() {
    this.setState({
      idList: [],
    });
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  getContainer = () => {
    return this.container;
  };

  saveContainer = container => {
    this.container = container;
  };

  queryDutyIncidentList = () => {
    const { queryDutyIncident } = this.state;
    queryDutyIncidentByTitle(queryDutyIncident, ({ data }) => {
      if (queryDutyIncident.pageNum === 1) {
        this.setState({
          optionsData: data.list
        })
      } else {
        const { optionsData } = this.state;
        this.setState({
          optionsData: optionsData.concat(data.list)
        })
      }
    })
  };

  handleOnSubmit = datas => {
    const { form } = this.props;
    const { mailMessage } = this.state;
    let dutyInfoId = '';
    if (datas) {
      dutyInfoId = datas.dutyInfo.id;
    }
    const userId = localStorage.getItem('userId');
    form.validateFields((err, values) => {
      console.log('handleSubmit Received values of form: ', values);
      if (!err) {
        const { title, date, type, unit, content, event, handler } = values;
        setSubmitMessageRegistration(
          {
            id: mailMessage.id,
            userId, // todo 从其他地方获取
            messageTitle: title,
            dutyInfoId: dutyInfoId === '' ? 0 : dutyInfoId,
            receiveSendTime: date.toDate(),
            releaseTime: new Date(),
            messageType: type,
            oppositeUnit: unit,
            contentAbstract: content,
            relationEvent: event,
            handleSituation: handler,
            // operationSeat: '', todo 操作席位从其他地方获取
            messageState: true,
          },
          ({ data }) => {
            console.log('setSubmitMessageRegistration--data：', data);
            if (data > 0) {
              message.success(formatMessage('guet.schedule.submit_success'));
              form.resetFields();
              this.setState({
                mailMessage: {
                  contentAbstract: '',
                  handleSituation: '',
                  id: 0,
                  messageState: false,
                  messageTitle: '',
                  messageType: 1,
                  operationSeat: '',
                  oppositeUnit: '',
                  receiveSendTime: new Date(),
                  releaseTime: new Date(),
                  registrant: '',
                  relationEvent: '',
                  userId: 0,
                }
              })
            } else {
              message.error(formatMessage('guet.schedule.submit_fail'));
            };
            this.setState({
              unSaved: false
            });
          },
          error => {
            console.log('setSubmitMessageRegistration--error：', error.toString());
          }
        );
      }
    });
  };

  // 提交文电登记记录
  handleSubmit = e => {
    e.preventDefault();
    this.queryDutyUser(2);
  };

  handleSave = datas => {
    const { form } = this.props;
    const { mailMessage } = this.state;
    const userId = localStorage.getItem('userId');
    let dutyInfoId = ''
    if (datas) {
      dutyInfoId = datas.dutyInfo.id;
    }
    form.validateFields((err, values) => {
      if (!err) {
        console.log('handleSave Received values of form: ', values);
        const { title, date, type, unit, content, event, handler } = values;
        setMessage(
          {
            id: mailMessage.id,
            userId, // todo 从其他地方获取
            messageTitle: title,
            dutyInfoId: dutyInfoId === '' ? 0 : dutyInfoId,
            receiveSendTime: date.toDate(),
            releaseTime: new Date(),
            messageType: type,
            oppositeUnit: unit,
            contentAbstract: content,
            relationEvent: event,
            handleSituation: handler,
            // operationSeat: '', todo 操作席位从其他地方获取
            messageState: false,
          },
          ({ data }) => {
            console.log('setMessage--data：', data);
            if (data > 0) {
              message.success(formatMessage('guet.schedule.save_success'));
              this.setState({
                mailMessage: { ...mailMessage, id: data }
              })
            }
            this.setState({
              unSaved: false
            })
          },
          e => {
            console.log('setMessage--error：', e.toString());
          }
        );
      }
    });
  };

  // 保存文电登记记录
  onSaveMessage = () => {
    this.queryDutyUser(0);
  };

  // 查询文电列表
  getMessageList = () => {
    const { param, sort, pageNum, pageSize } = this.state;
    getMessageList(
      {
        pageNum,
        pageSize,
        searchValue: param,
        messageType: sort,
      },
      ({ data }) => {
        console.log('getMessageList--data：', data);
        this.setState({
          messageList: data.list,
          total: data.total
        });
      },
      e => {
        console.log('getMessageList--error：', e.toString());
      }
    );
  };

  handleChange = page => {
    const { param, sort, pageSize } = this.state;
    getMessageList(
      {
        pageNum: page,
        pageSize,
        searchValue: param,
        messageType: sort,
      },
      ({ data }) => {
        console.log('getMessageList--data：', data);
        this.setState({
          messageList: data.list,
          total: data.total
        });
      },
      e => {
        console.log('getMessageList--error：', e.toString());
      }
    );
    this.setState({
      pageNum: page,
    })
  };

  onChangeMessage = checked => {
    if (checked === '2') {
      // 点击到文电事件列表
      this.getMessageList();
    }
  };

  onChangeType = e => {
    const sort = e.target.value;
    const { param, pageSize } = this.state;
    getMessageList(
      {
        pageNum: 1,
        pageSize,
        searchValue: param,
        messageType: sort,
      },
      ({ data }) => {
        console.log('getMessageList--data：', data);
        this.setState({
          messageList: data.list,
          total: data.total,
        });
      },
      err => {
        console.log('getMessageList--error：', err.toString());
      }
    );
    this.setState({
      sort,
    });
  };

  onClickSearch = () => {
    const { param, sort, pageSize } = this.state;
    getMessageList(
      {
        pageNum: 1,
        pageSize,
        searchValue: param,
        messageType: sort,
      },
      ({ data }) => {
        console.log('getMessageList--data：', data);
        this.setState({
          messageList: data.list,
          total: data.total
        });
      },
      e => {
        console.log('getMessageList--error：', e.toString());
      }
    );
    this.setState({
      pageNum: 1
    })
  };

  onChangeParam = e => {
    this.setState({
      param: e.target.value,
    });
  };

  // 删除文电列表数据
  onClickDeleteMessage = () => {
    const { idList } = this.state;
    console.log('idList:', idList);
    confirm({
      title: formatMessage('guet.schedule.operation_message'),
      content: formatMessage('guet.schedule.whether_confirm_the_deletion'),
      okText: formatMessage('guet.schedule.confirm'),
      cancelText: formatMessage('guet.schedule.cancel'),
      onOk: () => {
        deleteMessageList(
          idList,
          {},
          data => {
            console.log('deleteMessageList--data：', data);
            if (data.data > 0) {
              message.success(`${formatMessage('guet.schedule.delete_successfully')}`);
              this.onClickSearch();
              this.setState({
                idList: [],
                isDisabled: true,
                isDelDisabled: true,
              });
            }
          },
          e => {
            console.log('deleteMessageList--error：', e.toString());
          }
        );
      },
      onCancel: () => {
        console.log('操作结束');
      }
    })
  };

  onClickExportMessage = () => {
    const { idList } = this.state;
    exportMessage(idList)
  }

  onClickMessage = record => {
    console.log('record:', record);
    this.setState({
      id: record.key,
    });
    this.showDrawer();
  };

  handelClose = () => {
    this.setState({
      visible: false
    })
  };

  // 获取未保存的文电信息
  getNoSaveMessage = () => {
    const userId = localStorage.getItem('userId');
    getNoSaveMessage(
      {
        userId, // todo 从uop上获取的用户
      },
      ({ data }) => {
        console.log('getNoSaveMessage--data：', data);
        if (data !== null) {
          this.setState({
            mailMessage: data,
            unSaved: false
          });
        }
      },
      e => {
        console.log('getNoSaveMessage--error：', e.toString());
      }
    );
  };

  companyScroll = e => {
    e.persist();
    const { target: { scrollTop, scrollHeight, offsetHeight } } = e;
    if (scrollTop + offsetHeight >= scrollHeight) {
      const { queryDutyIncident } = this.state;
      queryDutyIncident.pageNum += 1;
      this.setState({
        queryDutyIncident
      })
      this.queryDutyIncidentList()
    }
  }

  handleOnSearch = value => {
    const { queryDutyIncident } = this.state;
    queryDutyIncident.searchValue = value
    queryDutyIncident.pageNum = 1
    this.setState({
      queryDutyIncident
    }, this.queryDutyIncidentList())
  };

  queryDutyUser = key => {
    queryDutyUser({}, ({ data }) => {
      if (key === 0) {
        this.handleSave(data);
      } else {
        this.handleOnSubmit(data);
      }
    });
  };

  noSpace = (rule, value, callback) => {
    const reg = /\s*\S+\s*/
    if (!reg.test(value) && value !== '') {
      callback(formatMessage('guet.schedule.input_space_invalid'));
    } else {
      callback();
    }
  };

  validateEvent = (rule, value, callback) => {
    // const { optionsData } = this.state;
    // optionsData.map(item => {
    //   if (`${item.eventName} (${moment(item.releaseTime).format('DD/MM/YYYY HH:mm:ss')})` === value || !value) {
    //     return callback();
    //   }
    // });
    // callback('选择存在的事件');
    callback()
  }

  range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    };
    return result;
  }

  handleDisbledTime = date => {
    const currentDate = moment(new Date());
    const selectHour = date.hours();
    const minutes = date.minutes();
    if (date.isSame(currentDate, 'd')) {
      if (selectHour === currentDate.hours() || date.isAfter(currentDate)) {
        if (minutes < currentDate.minutes()) {
          return {
            disabledHours: () => this.range(0, 24).splice(selectHour + 1, 24),
            disabledMinutes: () => this.range(0, 60).splice(currentDate.minutes() + 1, 60),
          }
        } else {
          return {
            disabledHours: () => this.range(0, 24).splice(currentDate.hours() + 1, 24),
            disabledMinutes: () => this.range(0, 60).splice(currentDate.minutes() + 1, 60),
            disabledSeconds: () => this.range(0, 60).splice(currentDate.seconds() + 1, 60),
          }
        }
      }
      if (date.isBefore(currentDate)) {
        return {
          disabledHours: () => this.range(0, 24).splice(currentDate.hours() + 1, 24),
        }
      }
    }
  }

  handleDisabledDate = current => {
    return current && current.isAfter(new Date(), 'd');
  }

  resetForm = () => {
    const { form } = this.props;
    const { mailMessage } = this.state;
    form.resetFields();
    this.setState({
      mailMessage: {
        contentAbstract: '',
        handleSituation: '',
        id: 0,
        messageState: false,
        messageTitle: '',
        messageType: 1,
        operationSeat: '',
        oppositeUnit: '',
        receiveSendTime: new Date(),
        releaseTime: new Date(),
        registrant: '',
        relationEvent: '',
        userId: 0,
      },
      unSaved: false,
    });
    if (mailMessage.id === 0) {
      deleteMessageList([0])
      return;
    }
    deleteMessageList([mailMessage.id])
  };

  render() {
    const { visible, param, messageList, sort, mailMessage, id, unSaved, isUpdate, isDisabled, isDelDisabled, total, pageNum, pageSize, optionsData } = this.state;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const eventName = getFieldValue('event')
    const dataDetail = [];
    messageList.forEach(item => {
      const { messageRegistration, userName } = item;
      dataDetail.push({
        key: messageRegistration.id,
        title: messageRegistration.messageTitle,
        user: userName,
        time: moment(new Date(messageRegistration.receiveSendTime)).format('DD/MM/YYYY HH:mm:ss'),
      });
    });

    let labelWidth = 139;
    if (getLocale() === 'fr-FR') {
      labelWidth = 193;
    }

    return (
      <>
        <Prompt
          message={location => {
            const isLocation = location.pathname.indexOf('/mailCheckin')
            return isLocation === -1 ? formatMessage('guet.schedule.doc_no_save_confirmed_leave') : true
          }}
          when={unSaved && isUpdate}
        />
        <Tabs onChange={this.onChangeMessage}>
          <Tabs.TabPane tab={formatMessage('guet.schedule.registration_of_texts')} key="1">
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} onSubmit={this.handleSubmit} autoComplete='off'>
              <FormItem
                labelWidth={labelWidth}
                labelText={formatMessage('guet.schedule.text_title')}
              >
                {getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage('guet.schedule.please_input_doc_title')
                    },
                    {
                      validator: this.noSpace,
                    }

                  ],
                  initialValue: mailMessage.messageTitle,
                })(<Input />)}
              </FormItem>
              <Row gutter={24}>
                <Col span={12}>
                  <FormItem
                    labelWidth={labelWidth}
                    labelText={formatMessage('guet.schedule.send_receive_time')}
                  >
                    {getFieldDecorator('date', {
                      rules: [{ required: true, message: '' }],
                      initialValue: moment(new Date(mailMessage.receiveSendTime), 'YDD/MM/YYYY HH:mm:ss'),
                    })(
                      <DatePicker
                        disabledDate={current => this.handleDisabledDate(current)}
                        disabledTime={date => this.handleDisbledTime(date)}
                        showTime
                        format="DD/MM/YYYY HH:mm:ss"
                        allowClear={false}
                      />)}
                  </FormItem>
                </Col>

                <Col span={12}>
                  <FormItem
                    labelText={formatMessage('guet.schedule.types')}
                    labelWidth={labelWidth}
                  >
                    {getFieldDecorator('type', {
                      rules: [{ required: true, message: '请选择类型!' }],
                      initialValue: mailMessage.messageType,
                    })(
                      <Select>
                        <Select.Option value={1}>
                          {formatMessage('guet.schedule.send')}
                        </Select.Option>
                        <Select.Option value={2}>
                          {formatMessage('guet.schedule.receive')}
                        </Select.Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <FormItem
                labelText={formatMessage('guet.schedule.counterpart')}
                labelWidth={labelWidth}
              >
                {getFieldDecorator('unit', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage('guet.schedule.please_input_counterpart')
                    },
                    {
                      validator: this.noSpace,
                    }
                  ],
                  initialValue: mailMessage.oppositeUnit,
                })(<Input />)}
              </FormItem>
              <FormItem
                labelText={formatMessage('guet.schedule.abstract')}
                labelWidth={labelWidth}
              >
                {getFieldDecorator('content', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage('guet.schedule.please_input_content_abstract')
                    },
                    {
                      validator: this.noSpace,
                    }
                  ],
                  initialValue: mailMessage.contentAbstract,
                })(<Input.TextArea rows={6} />)}
              </FormItem>
              <FormItem
                labelText={formatMessage('guet.schedule.link_to_an_existing_event')}
                labelWidth={labelWidth}
                required={false}
              >
                {getFieldDecorator('event', {
                  rules: [
                    {
                      required: false,
                      message: ''
                    },
                    {
                      validator: this.validateEvent
                    }
                  ],
                  initialValue: mailMessage.relationEvent,
                })(
                  <Select
                    showSearch
                    onSearch={this.handleOnSearch}
                    onPopupScroll={this.companyScroll}
                  >
                    {
                      optionsData.map(item => {
                        return eventName === `${item.eventName}(${moment(item.happenTime).format('DD/MM/YYYY HH:mm:ss')})` ?
                          null :
                          <Select.Option
                            key={item.id}
                            value={`${item.eventName}(${moment(item.releaseTime).format('DD/MM/YYYY HH:mm:ss')})`}
                          >
                            {`${item.eventName}(${moment(item.happenTime).format('DD/MM/YYYY HH:mm:ss')})`}
                          </Select.Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
              <FormItem
                labelText={formatMessage('guet.schedule.processing_situation')}
                labelWidth={labelWidth}
              >
                {getFieldDecorator('handler', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage('guet.schedule.please_enter_the_processing_situation')
                    },
                    {
                      validator: this.noSpace,
                    }
                  ],
                  initialValue: mailMessage.handleSituation,
                })(<Input.TextArea rows={6} />)}
              </FormItem>
              <Row type="flex" justify="end" style={{ marginBottom: '10px' }}>
                <Button onClick={this.resetForm} type="dashed">
                  {formatMessage('guet.schedule.cancel')}
                </Button>
                <Button onClick={this.onSaveMessage} type="primary" style={{ margin: '0px 10px' }}>
                  {formatMessage('guet.schedule.save')}
                </Button>
                <Button type="primary" htmlType="submit">
                  {formatMessage('guet.schedule.submit')}
                </Button>
              </Row>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab={formatMessage('guet.schedule.registration_list')} key="2">
            <div ref={this.saveContainer} />
            {
              visible ? <MailDetail id={id} handelClose={this.handelClose} />
                :
                (
                  <div>
                    <Row type="flex" justify="end" style={{ marginBottom: '16px' }}>
                      <Radio.Group value={sort} onChange={this.onChangeType}>
                        <Radio.Button value={2}>
                          {formatMessage('guet.schedule.receive_text_list')}
                        </Radio.Button>
                        <Radio.Button value={1}>
                          {formatMessage('guet.schedule.send_a_list_of_texts')}
                        </Radio.Button>
                        <Radio.Button value={3}>
                          {formatMessage('guet.schedule.list_of_all_texts')}
                        </Radio.Button>
                      </Radio.Group>
                      <Button
                        disabled={isDelDisabled}
                        onClick={this.onClickDeleteMessage}
                        style={{ marginLeft: '10px' }}
                        type="danger"
                      >
                        {formatMessage('guet.schedule.delete')}
                      </Button>
                      <Button
                        disabled={isDisabled}
                        onClick={this.onClickExportMessage}
                        style={{ marginLeft: '10px' }}
                        type="primary"
                      >
                        {formatMessage('guet.schedule.export')}
                      </Button>
                      <Input
                        value={param}
                        onChange={this.onChangeParam}
                        style={{ width: '200px', marginLeft: '10px' }}
                        placeholder={formatMessage('guet.schedule.register_name_file_mailCheckinName')}
                      />
                      <Button onClick={this.onClickSearch} style={{ marginLeft: '10px' }}>
                        {formatMessage('guet.schedule.search_for')}
                      </Button>
                    </Row>
                    <div>
                      <Table
                        rowSelection={this.rowSelection}
                        pagination={false}
                        onRow={record => {
                          return { onClick: () => this.onClickMessage(record) };
                        }}
                        columns={columnsDetail}
                        dataSource={dataDetail}
                        bordered
                      />
                    </div>
                    {total > 0 ?
                      <Pagination
                        style={{ float: 'right', marginTop: 10 }}
                        defaultCurrent={1}
                        current={pageNum}
                        pageSize={pageSize}
                        total={total}
                        onChange={page => this.handleChange(page)}
                      />
                      : ''
                    }
                  </div>
                )
            }


          </Tabs.TabPane>
        </Tabs>
      </>
    );
  }
}

export default Form.create()(Mail);
