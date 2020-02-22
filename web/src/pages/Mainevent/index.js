import { formatMessage as _formatMessage, getLocale } from 'umi/locale';
import React from 'react';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Table,
  Pagination,
  Tabs,
  message,
  Modal,
} from 'antd';
import moment from 'moment';
import { Prompt } from 'react-router-dom';
import {
  deleteDutyIncident,
  getDutyIncidentList,
  getNotSaveIncident,
  setDutyIncident,
  setSubmitDutyIncident,
  exportDutyIncident,
  queryDutyUser,
} from '../../services/scheduleService';
import MainEventDetail from './MainEventDetail';
import ChosePoint from './ChosePoint';
import NModal from '@/common/components/Modal';
import FormItem from '@/components/FormItem';


const { confirm } = Modal;
const formatMessage = id => {
  return _formatMessage({ id });
};

const columnsDetail = [
  {
    title: formatMessage('guet.schedule.event_name'),
    dataIndex: 'title',
    width: '50%',
  },
  {
    title: formatMessage('guet.schedule.event_type'),
    dataIndex: 'type',
  },
  {
    title: formatMessage('guet.schedule.publisher'),
    dataIndex: 'user',
  },
  {
    title: formatMessage('guet.schedule.release_time'),
    dataIndex: 'time',
  },
];

class Mainevent extends React.PureComponent {
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      this.setState({
        idList: selectedRowKeys,
      });
      const permission = localStorage.getItem('permission');
      if (selectedRows.length > 0) {
        this.setState({
          isDisabled: false,
        });
        if (permission === '1') {
          this.setState({
            isDelDisbled: false,
          })
        }
      } else {
        this.setState({
          isDisabled: true,
          isDelDisbled: true,
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
      event: {
        basicSituation: '',
        disposalProcess: '',
        dutyIncidentState: false,
        eventName: '',
        eventType: 1,
        happenTime: new Date(),
        id: 0,
        lon: '',
        lat: '',
        operationSeat: 0,
        place: '',
        undertaker: '',
        userId: 0,
        chosePointVisible: false,
      },
      param: '',
      dutyList: [],
      idList: [],
      sort: 2,
      id: 0,
      unSaved: true,
      pageNum: 1,
      pageSize: 10,
      searchValue: '',
      total: 0,
      isUpdate: false,
      isDisabled: true,
      isDelDisbled: true,
      pointArr: [],
      graph: 'default',
    };
  }

  componentDidMount() {
    this.getNotSaveIncident();
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

  componentWillUnmount() {
    this.setState({
      idList: [],
    });
  }

  // 获取值班事件列表
  getDutyIncidentList = () => {
    const { param, sort, pageNum, pageSize } = this.state;
    getDutyIncidentList(
      {
        searchValue: param,
        pageNum,
        pageSize,
        sort,
      },
      ({ data }) => {
        console.log('getDutyIncidentList--data：', data);
        this.setState({
          dutyList: data.list,
          total: data.total
        });
      },
      e => {
        console.log('getDutyIncidentList--error：', e.toString());
      }
    );
  };

  handChange = value => {
    const { pageNum, pageSize } = this.state;
    getDutyIncidentList(
      {
        searchValue: '',
        pageNum,
        pageSize,
        sort: value,
      },
      ({ data }) => {
        console.log('getDutyIncidentList--data：', data);
        this.setState({
          dutyList: data.list,
          total: data.total
        });
      },
      e => {
        console.log('getDutyIncidentList--error：', e.toString());
      }
    );
    this.setState({
      sort: value,
    });
  };

  // 判断当前是否存在值班
  queryDutyUser = key => {
    queryDutyUser({}, ({ data }) => {
      console.log('queryDutyUser-data', data);
      if (key === 0) {
        this.handleSave(data);
      } else {
        this.handleOnSubmit(data);
      }
    });
  };

  // 获取用户未保存的值班事件
  getNotSaveIncident = () => {
    const userId = localStorage.getItem('userId');
    getNotSaveIncident(
      {
        userId,
      },
      ({ data }) => {
        console.log('getNotSaveIncident--data：', data);
        if (data !== null) {
          this.setState({
            event: data,
            pointArr: data.lonAndLatList,
            graph: data.graph,
            unSaved: false,
          });
        }
      },
      e => {
        console.log('getNotSaveIncident--error：', e.toString());
      }
    );
  };

  onChangeDuty = checked => {
    if (checked === '2') {
      // 点击到值班事件列表
      this.getDutyIncidentList();
    }
  };

  handleSave = datas => {
    const userId = localStorage.getItem('userId');
    const { form } = this.props;
    const { event } = this.state;
    let dutyInfoId = '';
    if (datas) {
      dutyInfoId = datas.dutyInfo.id;
    }
    form.validateFields((err, values) => {
      if (!err) {
        console.log('handleSubmit Received values of form: ', values);
        const { name, type, date, address, origin, situation, process, handler } = values;
        const { pointArr, graph } = this.state;
        console.log('moment().toDate(); --- : ', date.toDate());
        setDutyIncident(
          {
            id: event.id,
            eventName: name,
            dutyInfoId: dutyInfoId === '' ? 0 : dutyInfoId,
            eventOrigin: origin,
            eventType: type,
            graph: graph === 'default' ? null : graph,
            place: address,
            lonAndLatList: pointArr,
            basicSituation: situation,
            disposalProcess: process,
            undertaker: handler,
            happenTime: date.toDate(),
            userId,
            operationSeat: 0,
            dutyIncidentState: false,
          },
          ({ data }) => {
            if (data > 0) {
              message.success(formatMessage('guet.schedule.save_success'));
              event.id = data;
              this.setState({
                unSaved: false,
                event: {
                  ...event,
                },
              });
            }
          },
          e => {
            console.log('saveDutyIncident--error：', e.toString());
          }
        );
      }
    });
  };

  saveDutyIncident = () => {
    this.queryDutyUser(0);
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  handleClose = () => {
    this.setState({
      visible: false,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      chosePointVisible: false,
    });
  };

  getContainer = () => {
    return this.container;
  };

  saveContainer = container => {
    this.container = container;
  };

  handleOnSubmit = datas => {
    let dutyInfoId = '';
    if (datas) {
      dutyInfoId = datas.dutyInfo.id;
    }
    const { event } = this.state;
    const { form } = this.props;
    const userId = localStorage.getItem('userId');
    form.validateFields((err, values) => {
      if (!err) {
        console.log('handleSubmit Received values of form: ', values);
        const { name, type, origin, date, address, situation, process, handler } = values;
        const { graph, pointArr } = this.state;
        setSubmitDutyIncident(
          {
            id: event.id,
            eventName: name,
            eventOrigin: origin,
            dutyInfoId: dutyInfoId === '' ? 0 : dutyInfoId,
            eventType: type,
            graph: graph === 'default' ? null : graph,
            place: address,
            lonAndLatList: pointArr,
            basicSituation: situation,
            disposalProcess: process,
            undertaker: handler,
            happenTime: date.toDate(),
            userId,
            operationSeat: 0,
            dutyIncidentState: true,
          },
          ({ data }) => {
            if (data > 0) {
              message.success(formatMessage('guet.schedule.submit_success'));
            }
            form.resetFields();
            this.setState({
              unSaved: false,
              event: { ...event },
              graph: 'default',
              pointArr: [],
            });
          },
          error => {
            console.log('setSubmitDutyIncident--error：', error.toString());
          }
        );
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.queryDutyUser(1)
  };

  onClickSearch = () => {
    const { param, pageSize, sort } = this.state;
    getDutyIncidentList(
      {
        searchValue: param,
        pageNum: 1,
        pageSize,
        sort,
      },
      ({ data }) => {
        console.log('getDutyIncidentList--data：', data);
        this.setState({
          dutyList: data.list,
          total: data.total
        });
      },
      e => {
        console.log('getDutyIncidentList--error：', e.toString());
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

  
  onClickDeleteIncident = () => {
    const { idList } = this.state;
    console.log('idList:', idList);
    confirm({
      title: formatMessage('guet.schedule.operation_message'),
      content: formatMessage('guet.schedule.whether_confirm_the_deletion'),
      okText: formatMessage('guet.schedule.confirm'),
      cancelText: formatMessage('guet.schedule.cancel'),
      onOk: () => {
        deleteDutyIncident(
          idList,
          {},
          data => {
            console.log('deleteDutyIncident--data：', data);
            if (data.data > 0) {
              message.success(`${formatMessage('guet.schedule.delete_successfully')}`);
              this.onClickSearch();
              this.setState({
                idList: [],
                isDisabled: true,
                isDelDisbled: true
              });
            }
          },
          e => {
            console.log('deleteDutyIncident--error：', e.toString());
          }
        );
      },
      onCancel: () => {
        console.log('操作结束')
      }
    });
  };

  onClickExportDutyIncident = () => {
    const { idList } = this.state;
    console.log('exportDutyIncident--idList', idList);
    exportDutyIncident(idList);
  };

  onClickDutyIncident = record => {
    this.setState({
      id: record.key,
    });
    this.showDrawer();
  };

  handleCilckChosePoint = () => {
    this.setState({
      chosePointVisible: true,
    });
  };

  onSavePoint = (pointArr, graph) => {
    this.setState({
      pointArr,
      graph,
      chosePointVisible: false,
    });
  };

  resetForm = () => {
    const { form } = this.props;
    const { event } = this.state;
    form.resetFields();
    this.setState({
      unSaved: false,
      // event: { ...defaultData },
    });
    if (event.id === 0) {
      deleteDutyIncident([0]);
      return;
    }
    deleteDutyIncident([event.id]);
    event.id = 0;
    this.setState({
      unSaved: false,
      event: {
        ...event,
      }
    });
  };

  noSpace = (rule, value, callback) => {
    const reg = /\s*\S+\s*/
    if (!reg.test(value) && value !== '') {
      callback(formatMessage('guet.schedule.input_space_invalid'))
    } else {
      callback();
    }
  };

  handleChange = page => {
    const { searchValue, sort, pageSize } = this.state;
    getDutyIncidentList(
      {
        searchValue,
        pageNum: page,
        pageSize,
        sort,
      },
      ({ data }) => {
        console.log('getDutyIncidentList--data：', data);
        this.setState({
          dutyList: data.list,
          total: data.total
        });
      },
      e => {
        console.log('getDutyIncidentList--error：', e.toString());
      }
    )
    this.setState({
      pageNum: page,
    })
  }

  handleDisable = current => {
    return current && current.isAfter(new Date(), 'd')
  }

  range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  handleDisabledTime = date => {
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

  render() {
    const {
      visible,
      param,
      event,
      dutyList,
      isDisabled,
      isDelDisbled,
      sort,
      id,
      unSaved,
      isUpdate,
      chosePointVisible,
      pointArr,
      graph,
      pageSize,
      pageNum,
      total,
    } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const dataDetail = [];
    dutyList.forEach(item => {
      const data = item.dutyIncidentAddVO;
      const { userName } = item;
      let type = '一般';
      if (data.eventType === 1) {
        type = formatMessage('guet.schedule.general');
      } else if (data.eventType === 2) {
        type = formatMessage('guet.schedule.urgent');
      }
      dataDetail.push({
        key: data.id,
        title: data.eventName,
        user: userName,
        time: moment(new Date(data.releaseTime)).format('DD/MM/YYYY HH:mm:ss'),
        type,
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
            const islocation = location.pathname.indexOf('/mainevent');
            return islocation === -1 ? formatMessage('guet.schedule.duty_no_save_confirmed_leave') : true;
          }}
          when={unSaved && isUpdate}
        />
        <Tabs onChange={this.onChangeDuty}>
          <Tabs.TabPane tab={formatMessage('guet.schedule.registration_of_duty_events')} key="1">
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onSubmit={this.handleSubmit} autoComplete='off'>
              <FormItem
                labelWidth={labelWidth}
                labelText={formatMessage('guet.schedule.event_name')}
              >
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true, message: formatMessage('guet.schedule.please_enter_the_event_name')
                    },
                    {
                      validator: this.noSpace,
                    }
                  ],
                  initialValue: event.eventName,
                })(<Input />)}
              </FormItem>
              <Row gutter={24}>
                <Col span={8}>
                  <FormItem
                    labelWidth={labelWidth}
                    labelText={formatMessage('guet.schedule.time_of_occurrence')}
                  >
                    {getFieldDecorator('date', {
                      rules: [{ required: true, message: '请选择发生日期时间!' }],
                      initialValue: moment(new Date(event.happenTime), 'DD/MM/YYYY HH:mm:ss'),
                    })(
                      <DatePicker
                        showTime
                        format="DD/MM/YYYY HH:mm:ss"
                        allowClear={false}
                        disabledDate={current => this.handleDisable(current)}
                        disabledTime={date => this.handleDisabledTime(date)}
                      />
                    )
                    }
                  </FormItem>
                </Col>

                <Col span={8}>
                  <FormItem
                    labelWidth={labelWidth}
                    labelText={formatMessage('guet.schedule.event_type')}
                  >
                    {getFieldDecorator('type', {
                      rules: [{ required: true, message: '请选择事件类型!' }],
                      initialValue: event.eventType,
                    })(
                      <Select>
                        <Select.Option value={1}>
                          {formatMessage('guet.schedule.general')}
                        </Select.Option>
                        <Select.Option value={2}>
                          {formatMessage('guet.schedule.urgent')}
                        </Select.Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>

                <Col span={8}>
                  <FormItem
                    labelWidth={labelWidth}
                    labelText={formatMessage('guet.schedule.event_origin')}
                  >
                    {getFieldDecorator('origin', {
                      rules: [
                        {
                          required: true,
                          message: formatMessage('guet.schedule.please_input_eventOrign')
                        },
                        {
                          validator: this.noSpace,
                        }
                      ],
                      initialValue: event.eventOrigin,
                    })(<Input />)}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={8}>
                  <FormItem
                    labelWidth={labelWidth}
                    labelText={formatMessage('guet.schedule.location')}
                  >
                    {getFieldDecorator('address', {
                      rules: [
                        {
                          required: true,
                          message: formatMessage('guet.schedule.please_enter_event_location'),
                        }
                      ],
                      initialValue: event.place,
                    })(<Input />)}
                  </FormItem>
                </Col>
                <Col span={2}>
                  <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
                    <div style={{ textAlign: 'left' }}>
                      <Button onClick={this.handleCilckChosePoint} type="ghost">
                        {formatMessage('guet.schedule.label')}
                      </Button>
                    </div>
                  </Form.Item>
                </Col>
              </Row>

              <FormItem
                labelText={formatMessage('guet.schedule.basic_situation')}
                labelWidth={labelWidth}
              >
                {getFieldDecorator('situation', {
                  rules: [
                    {
                      required: true, message: formatMessage('guet.schedule.please_enter_the_basics')
                    },
                    {
                      validator: this.noSpace,
                    }
                  ],
                  initialValue: event.basicSituation,
                })(<Input.TextArea rows={8} />)}
              </FormItem>
              <FormItem
                labelText={formatMessage('guet.schedule.disposal_process')}
                labelWidth={labelWidth}
              >
                {getFieldDecorator('process', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage('guet.schedule.please_enter_the_disposal_process')
                    },
                    {
                      validator: this.noSpace,
                    }
                  ],
                  initialValue: event.disposalProcess,
                })(<Input.TextArea rows={7} />)}
              </FormItem>
              <FormItem
                labelText={formatMessage('guet.schedule.undertaker')}
                labelWidth={labelWidth}
              >
                {getFieldDecorator('handler', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage('guet.schedule.please_enter_the_undertaker')
                    },
                    {
                      validator: this.noSpace,
                    }
                  ],
                  initialValue: event.undertaker,
                })(<Input />)}
              </FormItem>
              <Row type="flex" justify="end" style={{ marginBottom: '10px' }}>
                <Button onClick={this.resetForm} type="dashed">
                  {formatMessage('guet.schedule.cancel')}
                </Button>
                <Button
                  type="primary"
                  onClick={this.saveDutyIncident}
                  style={{ margin: '0px 10px' }}
                >
                  {formatMessage('guet.schedule.save')}
                </Button>
                <Button type="primary" htmlType="submit">
                  {formatMessage('guet.schedule.submit')}
                </Button>
              </Row>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab={formatMessage('guet.schedule.list_of_duty_events')} key="2">
            <div ref={this.saveContainer} />
            {visible ? (
              <MainEventDetail id={id} handleClose={this.handleClose} />
            ) : (
                <div>
                  <Row type="flex" justify="end" style={{ marginBottom: '16px' }}>
                    <Select
                      onChange={this.handChange}
                      value={sort}
                      style={{ width: '350px' }}
                    >
                      <Select.Option value={2}>
                        {formatMessage('guet.schedule.sort_by_release_time_in_descending_order')}
                      </Select.Option>
                      <Select.Option value={1}>
                        {formatMessage('guet.schedule.sort_by_ascending_order')}
                      </Select.Option>
                      <Select.Option value={3}>
                        {formatMessage('guet.schedule.sort_by_event_type')}
                      </Select.Option>
                    </Select>
                    <Button
                      style={{ marginLeft: '10px' }}
                      disabled={isDelDisbled}
                      onClick={this.onClickDeleteIncident}
                      type="danger"
                    >
                      {formatMessage('guet.schedule.delete')}
                    </Button>
                    <Button
                      style={{ marginLeft: '10px' }}
                      type="primary"
                      disabled={isDisabled}
                      onClick={this.onClickExportDutyIncident}
                    >
                      {formatMessage('guet.schedule.export')}
                    </Button>
                    <Input
                      value={param}
                      onChange={this.onChangeParam}
                      style={{ width: '200px', marginLeft: '10px' }}
                      placeholder={formatMessage('guet.schedule.publisher_name_or_eventName')}
                    />
                    <Button onClick={this.onClickSearch} style={{ marginLeft: '10px' }}>
                      {formatMessage('guet.schedule.search_for')}
                    </Button>
                  </Row>
                  <div>
                    <Table
                      rowSelection={this.rowSelection}
                      onRow={record => {
                        return { onClick: () => this.onClickDutyIncident(record) };
                      }}
                      pagination={false}
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
              )}
          </Tabs.TabPane>
        </Tabs>
        <NModal
          title={formatMessage('guet.schedule.label')}
          width={800}
          hight={592}
          onCancel={this.onClose}
          visible={chosePointVisible}
          footer={null}
        >
          <ChosePoint graph={graph} pointArr={pointArr} onSave={this.onSavePoint} />
        </NModal>
      </>
    );
  }
}

export default Form.create()(Mainevent);
