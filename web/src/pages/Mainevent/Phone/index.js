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
  Spin,
} from 'antd';
import moment from 'moment';
import { Prompt } from 'react-router-dom';
import PhoneDetail from './PhoneDetail';
import {
  deletePhoneList,
  getPhoneList,
  getUserNotSaveTelephone,
  setPhone,
  setSubmitPhone,
  exportTelephone,
  queryDutyUser,
  queryDutyIncidentByTitle
} from '../../../services/scheduleService';
import FormItem from '@/components/FormItem';
import { debounce } from "@/utils/utils"

const { confirm } = Modal;

const formatMessage = id => {
  return _formatMessage({ id });
};

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

class Phone extends React.PureComponent {
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      this.setState({
        idList: selectedRowKeys
      });
      const permission = localStorage.getItem('permission');
      if (selectedRows.length > 0) {
        this.setState({
          isDisabled: false,
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
        });
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
      visible: false,
      phone: {
        callTime: new Date(),
        contact: '',
        contentAbstract: '',
        handleSituation: '',
        id: 0,
        oppositeUnit: '',
        relationEvent: '',
        releaseTime: new Date(),
        telephoneNumber: '',
        telephoneType: 1,
        telephontState: false,
        title: '',
        userId: 0,
      },
      pageNum: 1,
      pageSize: 10,
      optionsData: [],
      total: 0,
      param: '',
      phoneList: [],
      idList: [],
      registration: 0,
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
    this.getUserNotSaveTelephone();
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

  handleOnSubmit = datas => {
    const { form } = this.props;
    const { phone } = this.state;
    let dutyInfoId = '';
    if (datas) {
      dutyInfoId = datas.dutyInfo.id;
    }
    const userId = localStorage.getItem('userId')
    form.validateFields((err, values) => {
      console.log('handleSubmit Received values of form: ', values);
      if (!err) {
        const {
          title,
          date,
          type,
          unit,
          contact,
          telephoneNumber,
          content,
          event,
          handler,
        } = values;
        setSubmitPhone(
          {
            id: phone.id,
            title,
            userId, // todo 从其他地方获取
            callTime: date.toDate(),
            dutyInfoId: dutyInfoId === '' ? 0 : dutyInfoId,
            releaseTime: new Date(),
            oppositeUnit: unit,
            contact,
            contentAbstract: content,
            telephoneNumber,
            telephoneType: type,
            relationEvent: event,
            handleSituation: handler,
            telephontState: true,
          },
          ({ data }) => {
            console.log('setSubmitPhone--data：', data);
            if (data > 0) {
              message.success(formatMessage('guet.schedule.submit_success'));
              form.resetFields();
              this.setState({
                phone: {
                  callTime: new Date(),
                  contact: '',
                  contentAbstract: '',
                  handleSituation: '',
                  id: 0,
                  oppositeUnit: '',
                  relationEvent: '',
                  releaseTime: new Date(),
                  telephoneNumber: '',
                  telephoneType: 1,
                  telephontState: false,
                  title: '',
                  userId: 0,
                },
              })
            } else {
              message.error(formatMessage('guet.schedule.submit_fail'))
            }
            this.setState({
              unSaved: false
            })
          },
          error => {
            console.log('setSubmitPhone--error：', error.toString());
          }
        );
      }
    });
  };

  // 提交电话登记
  handleSubmit = e => {
    e.preventDefault();
    this.queryDutyUser(1);
  };

  onChangeRegistration = e => {
    const typeData = e.target.value;
    const { param, pageSize } = this.state;
    getPhoneList(
      {
        searchValue: param,
        pageNum: 1,
        pageSize,
        telephoneType: typeData,
      },
      ({ data }) => {
        console.log('getPhoneList--data：', data);
        this.setState({
          phoneList: data.list,
          total: data.total,
        });
      },
      err => {
        console.log('getPhoneList--error：', err.toString());
      }
    );
    this.setState({
      pageNum: 1,
      registration: typeData
    });
  };

  handleSave = datas => {
    const { form } = this.props;
    const { phone } = this.state;
    const userId = localStorage.getItem('userId');
    let dutyInfoId = '';
    if (datas) {
      dutyInfoId = datas.dutyInfo.id;
    }
    form.validateFields((err, values) => {
      console.log('handleSave Received values of form: ', values);
      if (!err) {
        const {
          title,
          date,
          type,
          unit,
          contact,
          telephoneNumber,
          content,
          event,
          handler,
        } = values;
        setPhone(
          {
            id: phone.id,
            title,
            userId, // todo 从其他地方获取
            callTime: date.toDate(),
            dutyInfoId: dutyInfoId === '' ? 0 : dutyInfoId,
            releaseTime: new Date(),
            oppositeUnit: unit,
            contact,
            contentAbstract: content,
            telephoneNumber,
            telephoneType: type,
            relationEvent: event,
            handleSituation: handler,
            telephontState: false,

          },
          ({ data }) => {
            console.log('saveDutyIncident--data：', data);
            if (data > 0) {
              message.success(formatMessage('guet.schedule.save_success'));
              this.setState({
                phone: { ...phone, id: data }
              })
            }
            this.setState({
              unSaved: false
            });
          },
          e => {
            console.log('saveDutyIncident--error：', e.toString());
          }
        );
      }
    });
  };

  resetForm = () => {
    const { form } = this.props;
    const { phone } = this.state;
    form.resetFields();
    this.setState({
      unSaved: false,
      phone: {
        callTime: new Date(),
        contact: '',
        contentAbstract: '',
        handleSituation: '',
        id: 0,
        oppositeUnit: '',
        relationEvent: '',
        releaseTime: new Date(),
        telephoneNumber: '',
        telephoneType: 1,
        telephontState: false,
        title: '',
        userId: 0,
      },
    })
    if (phone.id === 0) {
      deletePhoneList([0]);
      return;
    }
    deletePhoneList([phone.id])
  }

  // 保存电话登记
  onSavePhone = () => {
    this.queryDutyUser(0);
  };

  // 获取未提交的电话登记
  getUserNotSaveTelephone = () => {
    const userId = localStorage.getItem('userId');
    getUserNotSaveTelephone(
      {
        userId,
      },
      ({ data }) => {
        console.log('getUserNotSaveTelephone--data：', data);
        if (data !== null) {
          this.setState({
            phone: data,
            unSaved: false
          });
        }
      },
      e => {
        console.log('getUserNotSaveTelephone--error：', e.toString());
      }
    );
  };

  // 获取值班事件列表
  queryDutyIncidentList = () => {
    const { queryDutyIncident } = this.state;
    this.setState({
      loading: true
    })

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
  }

  queryDutyUser = key => {
    queryDutyUser({}, ({ data }) => {
      if (key === 0) {
  
        this.handleSave(data);
      } else {
        this.handleOnSubmit(data);
      }
    });
  };

  onChangePhone = checked => {
    if (checked === '2') {
      // 点击到值班事件列表
      this.getPhoneList();
    }
  };

  getPhoneList = () => {
    const { param, registration, pageNum, pageSize } = this.state;
    getPhoneList(
      {
        searchValue: param,
        telephoneType: registration,
        pageNum,
        pageSize
      },
      ({ data }) => {
        console.log('getPhoneList--data：', data);
        this.setState({
          phoneList: data.list,
          total: data.total,
        });
      },
      e => {
        console.log('getPhoneList--error：', e.toString());
      }
    );
  };

  onClickSearch = () => {
    const { param, registration, pageSize } = this.state;
    getPhoneList(
      {
        searchValue: param,
        telephoneType: registration,
        pageNum: 1,
        pageSize
      },
      ({ data }) => {
        console.log('getPhoneList--data：', data);
        this.setState({
          phoneList: data.list,
          total: data.total,
        });
      },
      e => {
        console.log('getPhoneList--error：', e.toString());
      }
    );
    this.setState({
      pageNum: 1,
    })
  };

  companyScroll = e => {
    // const { eventPageSize, param, eventPageNum, eventOptionPageNum, eventPages, eventOptPages } = this.state;
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

  onClickDeletePhone = () => {
    const { idList } = this.state;
    console.log('idList:', idList);
    confirm({
      title: formatMessage('guet.schedule.operation_message'),
      content: formatMessage('guet.schedule.whether_confirm_the_deletion'),
      okText: formatMessage('guet.schedule.confirm'),
      cancelText: formatMessage('guet.schedule.cancel'),
      onOk: () => {
        deletePhoneList(
          idList,
          {},
          data => {
            console.log('deletePhoneList--data：', data);
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
            console.log('deletePhoneList--error：', e.toString());
          }
        );
      },
      onCancel: () => {
        console.log('操作结束')
      }
    })
  };

  onClickExportTelephone = () => {
    const { idList } = this.state;
    exportTelephone(idList);
  }

  onClickPhone = record => {
    console.log('record:', record);
    this.setState({
      id: record.key,
    });
    this.showDrawer();
  };

  onChangeParam = e => {
    this.setState({
      param: e.target.value,
    });
  };

  handleClose = () => {
    this.setState({
      visible: false
    })
  };

  noSpace = (rule, value, callback) => {
    const reg = /\s*\S+\s*/
    if (!reg.test(value) && value !== '') {
      callback(formatMessage('guet.schedule.input_space_invalid'));
    } else {
      callback();
    }
  };

  // 事件校验
  // validateEvent = (rule, value, callback) => {
  //   const { optionsData } = this.state;
  //   console.log('selectValue', value);
  //   for (let item = 0; item < optionsData.length; item++) {
  //     if (value === `${item.eventName} (${moment(item.releaseTime).format('DD/MM/YYYY HH:mm:ss')})`) {
  //       return callback();
  //     } else {
  //       return callback('选择存在的事件')
  //     }
  //   }
  //   callback();
  // }

  noSpaceAndPhone = (rule, value, callback) => {
    const reg = /\s*\S+\s*/;
    // const reg1 = /^1[3456789]\d{9}$/; 验证11为电话号码
    const reg1 = /^[0-9]*$/;
    if (!reg.test(value) && value !== '') {
      callback(formatMessage('guet.schedule.input_space_invalid'));
    } if (!reg1.test(value) && value !== '') {
      callback(formatMessage('guet.schedule.please_enter_correct_phone_number'));
    } else {
      callback();
    }
  };

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


  handleChange = page => {
    const { param, registration, pageSize } = this.state;
    getPhoneList(
      {
        searchValue: param,
        telephoneType: registration,
        pageNum: page,
        pageSize
      },
      ({ data }) => {
        console.log('getPhoneList--data：', data);
        this.setState({
          phoneList: data.list,
          total: data.total,
        });
      },
      e => {
        console.log('getPhoneList--error：', e.toString());
      }
    );
    this.setState({
      pageNum: page
    })
  };

  render() {
    const { visible, phone, phoneList, registration, param, id, unSaved, isUpdate, isDisabled, isDelDisabled, total, pageNum, pageSize, optionsData, loading } = this.state;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const eventName = getFieldValue('event')
    console.log("eventNames", eventName)
    const dataDetail = [];
    phoneList.forEach(item => {
      const { telephone, userName } = item;
      dataDetail.push({
        key: telephone.id,
        title: telephone.title,
        user: userName,
        time: moment(new Date(telephone.callTime)).format('DD/MM/YYYY HH:mm:ss'),
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
            const isLocation = location.pathname.indexOf('/phoneCheckin')
            return isLocation === -1 ? formatMessage('guet.schedule.phone_no_save_confirmed_leave') : true
          }}
          when={unSaved && isUpdate}
        />
        <Tabs onChange={this.onChangePhone}>
          <Tabs.TabPane tab={formatMessage('guet.schedule.telephone_registration')} key="1">
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} onSubmit={this.handleSubmit} autoComplete='off'>
              <FormItem
                labelWidth={labelWidth}
                labelText={formatMessage('guet.schedule.title')}
              >
                {getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage('guet.schedule.please_enter_a_title_name')
                    },
                    {
                      validator: this.noSpace,
                    }
                  ],
                  initialValue: phone.title,
                })(<Input />)}
              </FormItem>
              <Row gutter={24}>
                <Col span={8}>
                  <FormItem
                    labelText={formatMessage('guet.schedule.call_or_answer_time')}
                    labelWidth={labelWidth}
                  >
                    {getFieldDecorator('date', {
                      rules: [{ required: true, message: '请选择日期!' }],
                      initialValue: moment(new Date(phone.callTime), 'DD/MM/YYYY HH:mm:ss'),
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
                <Col span={16}>
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
                      initialValue: phone.oppositeUnit,
                    })(<Input />)}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={8}>
                  <FormItem
                    labelText={formatMessage('guet.schedule.contact')}
                    labelWidth={labelWidth}
                  >
                    {getFieldDecorator('contact', {
                      rules: [
                        {
                          required: true,
                          message: formatMessage('guet.schedule.please_enter_a_contact')
                        },
                        {
                          validator: this.noSpace,
                        }
                      ],
                      initialValue: phone.contact,
                    })(
                      <Input
                        style={{ width: "200px" }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    labelText={formatMessage('guet.schedule.phone_type')}
                    labelWidth={labelWidth}
                  >
                    {getFieldDecorator('type', {
                      rules: [{ required: true, message: '' }],
                      initialValue: phone.telephoneType,
                    })(
                      <Select>
                        <Select.Option value={1}>
                          {formatMessage('guet.schedule.incoming_call')}
                        </Select.Option>
                        <Select.Option value={2}>
                          {formatMessage('guet.schedule.outgoing')}
                        </Select.Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    labelText={formatMessage('guet.schedule.telephone_number')}
                    labelWidth={labelWidth}
                  >
                    {getFieldDecorator('telephoneNumber', {
                      rules: [
                        {
                          required: true,
                          message: formatMessage('guet.schedule.please_enter_your_phone_number')
                        },
                        {
                          validator: this.noSpaceAndPhone,
                        }
                      ],
                      initialValue: phone.telephoneNumber,
                    })(<Input />)}
                  </FormItem>
                </Col>
              </Row>

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
                  initialValue: phone.contentAbstract,
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
                  initialValue: phone.relationEvent,
                })(
                  <Select
                    showSearch
                    filterOption={false}
                    onSearch={this.handleOnSearch}
                    onPopupScroll={this.companyScroll}
                  >
                    {
                      optionsData.map(item => {
                        return eventName === `${item.eventName} (${moment(item.happenTime).format('DD/MM/YYYY HH:mm:ss')})` ?
                          null :
                          <Select.Option
                            key={item.id}
                            value={`${item.eventName} (${moment(item.releaseTime).format('DD/MM/YYYY HH:mm:ss')})`}
                          >
                            {`${item.eventName} (${moment(item.releaseTime).format('DD/MM/YYYY HH:mm:ss')})`}
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
                  initialValue: phone.handleSituation,
                })(<Input.TextArea rows={6} />)}
              </FormItem>

              <Row type="flex" justify="end" style={{ marginBottom: '10px' }}>

                <Button onClick={this.resetForm} type="dashed">
                  {formatMessage('guet.schedule.cancel')}
                </Button>
                <Button onClick={this.onSavePhone} type="primary" style={{ margin: '0px 10px' }}>
                  {formatMessage('guet.schedule.save')}
                </Button>
                <Button type="primary" htmlType="submit">
                  {formatMessage('guet.schedule.submit')}
                </Button>
              </Row>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab={formatMessage('guet.schedule.telephone_registration_list')} key="2">
            <div ref={this.saveContainer} />
            {visible ?
              <PhoneDetail id={id} handleClose={this.handleClose} />
              :
              (
                <div>
                  <Row type="flex" justify="end" style={{ marginBottom: '16px' }}>
                    <Radio.Group value={registration} onChange={this.onChangeRegistration}>
                      <Radio.Button value={0}>
                        {formatMessage('guet.schedule.all_registration')}
                      </Radio.Button>
                      <Radio.Button value={1}>
                        {formatMessage('guet.schedule.call_registration')}
                      </Radio.Button>
                      <Radio.Button value={2}>
                        {formatMessage('guet.schedule.outgoing_registration')}
                      </Radio.Button>
                    </Radio.Group>
                    <Button
                      disabled={isDelDisabled}
                      onClick={this.onClickDeletePhone}
                      style={{ marginLeft: '10px' }}
                      type="danger"
                    >
                      {formatMessage('guet.schedule.delete')}
                    </Button>
                    <Button
                      style={{ marginLeft: '10px' }}
                      type="primary"
                      disabled={isDisabled}
                      onClick={this.onClickExportTelephone}
                    >
                      {formatMessage('guet.schedule.export')}
                    </Button>
                    <Input
                      value={param}
                      onChange={this.onChangeParam}
                      style={{ width: '200px', marginLeft: '10px' }}
                      placeholder={formatMessage('guet.schedule.recorder_name_or_phoneCheckin')}
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
                        return { onClick: () => this.onClickPhone(record) };
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
                      total={total}
                      pageSize={pageSize}
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

export default Form.create()(Phone);
