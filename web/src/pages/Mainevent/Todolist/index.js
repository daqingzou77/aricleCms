import { formatMessage as _formatMessage, getLocale } from 'umi/locale';
import React from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Table,
  Radio,
  Tabs,
  Icon,
  message,
  Switch,
  Modal,
  Pagination,
} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';

import { Prompt } from 'react-router-dom';
import TodoDetail from './TodoDetail';
import {
  deleteTodoList,
  getNotSaveBacklog,
  getTodoList,
  setSubmitTodoList,
  setTodoList,
  exportBacklog,
  queryDutyUser,
  getBacklogRemind,
  setBacklogRemind,
} from '../../../services/scheduleService';

import FormItem from '@/components/FormItem';

const { confirm } = Modal;
const formatMessage = id => {
  return _formatMessage({ id });
};

const columnsDetail = [
  {
    title: formatMessage('guet.schedule.title'),
    dataIndex: 'title',
    width: '45%',
  },
  {
    title: formatMessage('guet.schedule.emergency_level'),
    dataIndex: 'type',
  },
  {
    title: formatMessage('guet.schedule.request_completion_time'),
    dataIndex: 'finishTime',
  },
  {
    title: formatMessage('guet.schedule.publisher'),
    dataIndex: 'user',
  },
  {
    title: formatMessage('guet.schedule.release_time'),
    dataIndex: 'publishTime',
  },
];

class Todolist extends React.PureComponent {

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
    this.columns = [
      {
        title: 'id',
        width: '30%',
        dataIndex: 'emphasisNumber',
        align: 'center',
      },
      {
        title: '重点详情',
        dataIndex: 'emphasisContent',
        editable: true,
        align: 'center',
      },
    ];
    this.state = {
      dutyInfoId: 0,
      isRemind: true,
      visible: false,
      isDisabled: true,
      isDelDisabled: true,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      param: '',
      todoList: [],
      todo: {
        backlogState: true,
        createReason: '',
        emphasis: '',
        id: 0,
        matterName: '',
        requireTime: new Date(),
        releaseTime: null,
        urgentLevel: 1,
        userId: 0,
        curDuty: {}
      },
      dataSource: [
        {
          emphasisNumber: 1,
          emphasisContent: '',
        },
      ],
      idList: [],
      sort: 2,
      status: 2,
      id: 0,
      unSaved: true,
      isUpdate: false,
    };
  }

  componentDidMount() {
    this.getNotSaveBacklog();
    this.queryDutyUsers();
    this.getBacklogRemind();
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

  getBacklogRemind = () => {
    getBacklogRemind({
    },
      ({ data }) => {
        console.log('getBacklogRemind-data', data);
        if (data !== undefined) {
          const { isRemind, id } = data;
          this.setState({
            id,
            isRemind,
          })
        }
      },
      e => console.log('getBacklogRemind-error', e.toString()),
    )
  }

  setBacklogRemind = isRemind => {
    const userId = localStorage.getItem('userId');
    const { id, dutyInfoId } = this.state;
    setBacklogRemind({
      userId,
      isRemind,
      id,
      dutyInfoId
    },
      ({ data }) => {
        console.log('setBacklogRemind-data', data);
      },
      e => console.log('setBacklogRemind', e.toString()),
    )
  };

  handleOnSubmit = datas => {
    const { todo } = this.state;
    const { form } = this.props;
    const userId = localStorage.getItem('userId');
    let dutyInfoId = '';
    if (datas) {
      dutyInfoId = datas.dutyInfo.id;
    }
    form.validateFields((err, values) => {
      if (!err) {
        console.log('handleSubmit Received values of form: ', values);
        const { name, reason, date, level, emphasisList } = values;
        setSubmitTodoList(
          {
            backlog: {
              id: todo.id,
              userId, // todo 获取用户id
              matterName: name,
              dutyInfoId: dutyInfoId === '' ? 0 : dutyInfoId,
              createReason: reason,
              urgentLevel: level,
              requireTime: date.toDate(),
              releaseTime: null,
              backlogState: true, //  保存获取提交的标志
              achieveState: false,
            },
            emphasisList: emphasisList.map((item, index) => {
              return {
                emphasisContent: item,
                emphasisNumber: index + 1,
              };
            }),
          },
          ({ data }) => {
            if (data > 0) {
              message.success(formatMessage('guet.schedule.submit_success'));
            }
            form.resetFields();
            this.setState({
              unSaved: false,
              todo: {
                createReason: '',
                emphasis: '',
                id: 0,
                matterName: '',
                requireTime: new Date(),
                releaseTime: null,
                backlogState: true, //  保存获取提交的标志
                achieveState: false,
                urgentLevel: 1,
              },
              dataSource: [
                {
                  emphasisNumber: 1,
                  emphasisContent: '',
                },
              ],
            });
          },
          error => {
            console.log('setSubmitTodoList--error：', error.toString());
          }
        );
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.queryDutyUser(2);
  };

  getContainer = () => {
    return this.container;
  };

  saveContainer = container => {
    this.container = container;
  };

  getTodoList = () => {
    const { status, param, sort, pageNum, pageSize } = this.state;
    getTodoList(
      {
        pageNum,
        pageSize,
        backlogType: status,
        searchValue: param,
        sort,
      },
      ({ data }) => {
        console.log('getTodoList--data：', data);
        this.setState({
          todoList: data.list,
          total: data.total,
        });
      },
      e => {
        console.log('getTodoList--error：', e.toString());
      }
    );
    this.setState({
      visible: false,
    });
  };

  handleShow = e => {
    console.log('visible', e.target.value);
    this.setState({
      visible: e.target.value,
    });
  };

  onChangeTodo = checked => {
    if (checked === '2') {
      // 点击到值班事件列表
      this.getTodoList();
    };
  };

  handleSave = datas => {
    const { todo } = this.state;
    const { form } = this.props;
    let dutyInfoId = '';
    if (datas) {
      dutyInfoId = datas.dutyInfo.id;
    }
    const userId = localStorage.getItem('userId');
    form.validateFields((err, values) => {
      console.log('handleSave Received values of form: ', values);
      if (!err) {
        const { name, reason, date, level, emphasisList } = values;
        setTodoList(
          {
            backlog: {
              id: todo.id,
              userId, // todo 获取用户id
              matterName: name,
              createReason: reason,
              dutyInfoId: dutyInfoId === '' ? 0 : dutyInfoId ,
              urgentLevel: level,
              requireTime: date.toDate(),
              releaseTime: null,
              backlogState: false, //  保存获取提交的标志
              achieveState: false,
            },
            emphasisList: emphasisList.map((item, index) => {
              return {
                emphasisNumber: index + 1,
                emphasisContent: item,
              };
            }),
          },
          ({ data }) => {
            this.setState({
              todo: { ...todo, id: data },
            });
            message.success(formatMessage('guet.schedule.save_success'));
            this.setState({
              unSaved: false,
            });
          },
          e => {
            console.log('setTodoList--error：', e.toString());
          }
        );
      }
    })
  };

  onSaveTodo = () => {
    this.queryDutyUser(0);
  };

  onClickSearch = () => {
    const { pageSize, status, param, sort } = this.state;
    getTodoList(
      {
        pageNum: 1,
        pageSize,
        backlogType: status,
        searchValue: param,
        sort,
      },
      ({ data }) => {
        console.log('getTodoList--data：', data);
        this.setState({
          todoList: data.list,
          total: data.total
        });
      },
      e => {
        console.log('getTodoList--error：', e.toString());
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

  onChangeSort = value => {
    const { status, param, pageNum, pageSize } = this.state;
    console.log('pageNum', pageNum);
    getTodoList(
      {
        pageNum,
        pageSize,
        backlogType: status,
        searchValue: param,
        sort: value,
      },
      ({ data }) => {
        console.log('getTodoList--data：', data);
        this.setState({
          todoList: data.list,
          total: data.total
        });
      },
      e => {
        console.log('getTodoList--error：', e.toString());
      }
    );
    this.setState({
      sort: value,
    });
  };

  onChangeWarn = () => {
    const { isRemind } = this.state;
    this.setBacklogRemind(!isRemind);
    this.setState({
      isRemind: !isRemind,
    });
  };

  onChangeStatus = e => {
    const typeData = e.target.value;
    const { param, sort, pageSize } = this.state;
    getTodoList(
      {
        pageNum: 1,
        pageSize,
        backlogType: typeData,
        searchValue: param,
        sort,
      },
      ({ data }) => {
        console.log('getTodoList--data：', data);
        this.setState({
          todoList: data.list,
          total: data.total,
        });
      },
      err => {
        console.log('getTodoList--error：', err.toString());
      }
    );
    this.setState({
      status: typeData,
      pageNum: 1,
    });
  };

  onClickDeleteTodoList = () => {
    const { idList } = this.state;
    console.log('idList:', idList);
    confirm({
      title: formatMessage('guet.schedule.operation_message'),
      content: formatMessage('guet.schedule.whether_confirm_the_deletion'),
      okText: formatMessage('guet.schedule.confirm'),
      cancelText: formatMessage('guet.schedule.cancel'),
      onOk: () => {
        deleteTodoList(
          idList,
          {},
          data => {
            console.log('deleteTodoList--data：', data);
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
            console.log('deleteTodoList--error：', e.toString());
          }
        );
      },
      onCancel: () => {
        console.log('操作结束')
      }
    })
  };

  onClickExportBacklog = () => {
    const { idList } = this.state;
    console.log('exportBacklog--idList', idList);
    exportBacklog(idList);
  };

  getNotSaveBacklog = () => {
    const userId = localStorage.getItem('userId');
    getNotSaveBacklog(
      {
        userId,
      },
      ({ data }) => {
        console.log('getNotSaveBacklog--data：', data);
        if (data.backlog !== null) {
          this.setState({
            todo: data.backlog,
            dataSource: data.emphasisList,
            unSaved: false,
          });
        }
      },
      e => {
        console.log('getNotSaveIncident--error：', e.toString());
      }
    );
  };

  queryDutyUsers = () => {
    queryDutyUser({}, ({ data }) => {
      if (data !== null) {
        const curDuty = data;
        if (curDuty.dutyInfo.id !== undefined) {
          this.setState({
            dutyInfoId: curDuty.dutyInfo.id,
          })
        }
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
  }

  onClickTodoList = record => {
    this.setState({
      id: record.key,
    });
    this.showDrawer();
  };

  handleClose = () => {
    this.setState({
      visible: false,
    });
  };

  resetForm = () => {
    const { form } = this.props;
    const { todo } = this.state;
    form.resetFields();
    this.setState({
      unSaved: false,
      todo: {
        backlogState: true,
        createReason: '',
        emphasis: '',
        id: 0,
        matterName: '',
        requireTime: new Date(),
        releaseTime: null,
        urgentLevel: 1,
        userId: 0,
      },
    });
    if (todo.id === 0) {
      deleteTodoList([0]);
      return;
    }
    deleteTodoList([todo.id]);
  };

  handleAddImp = () => {
    const { dataSource } = this.state;
    dataSource.push({});
    this.setState({
      dataSource,
    });
    // 刷新数据
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue();
  };


  handleDeleteImp = () => {
    const { dataSource } = this.state;
    dataSource.pop();
    this.setState({
      dataSource,
    });
    // 刷新数据
    const {
      form: { setFieldsValue, getFieldsValue },
    } = this.props;
    const value = getFieldsValue(['emphasisList']);
    value.emphasisList.pop();
    setFieldsValue(value);
  };

  noSpace = (rule, value, callback) => {
    const reg = /\s*\S+\s*/
    if (!reg.test(value) && value !== '') {
      callback(formatMessage('guet.schedule.input_space_invalid'));
    } else {
      callback();
    }
  };

  handleDisable = current => {
    return current && current.isBefore(new Date(), 'd')
  };

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
    if (date.isSame(currentDate, 'd')) {
      if (selectHour === currentDate.hours() || date.isBefore(currentDate)) {
        const minutes = date.minutes();
        if (minutes > currentDate.minutes()) {
          return {
            disabledHours: () => this.range(0, 24).splice(0, selectHour),
            disabledMinutes: () => this.range(0, 60).splice(0, currentDate.minutes()),
          }
        } else {
          return {
            disabledHours: () => this.range(0, 24).splice(0, currentDate.hours()),
            disabledMinutes: () => this.range(0, 60).splice(0, currentDate.minutes()),
            disabledSeconds: () => this.range(0, 60).splice(0, currentDate.seconds()),
          }
        }
      }
      if (date.isAfter(currentDate)) {
        return {
          disabledHours: () => this.range(0, 24).splice(0, currentDate.hours()),
        }
      }
    }
  };

  handleChange = page => {
    const { sort, pageSize, status, param, } = this.state;
    getTodoList(
      {
        pageNum: page,
        pageSize,
        backlogType: status,
        searchValue: param,
        sort,
      },
      ({ data }) => {
        console.log('getTodoList--data：', data);
        this.setState({
          todoList: data.list,
          total: data.total,
        });
      },
      err => {
        console.log('getTodoList--error：', err.toString());
      }
    );
    this.setState({
      pageNum: page,
    })
  }

  render() {
    const {
      visible,
      todoList,
      todo,
      param,
      sort,
      status,
      isRemind,
      id,
      unSaved,
      isUpdate,
      isDelDisabled,
      isDisabled,
      dataSource,
      total,
      pageSize,
      pageNum,
    } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const dataDetail = [];
    todoList.forEach(item => {
      const { backlog, userName } = item;
      let type = '紧急';
      if (backlog.urgentLevel === 1) {
        type = formatMessage('guet.schedule.urgent');
      } else if (backlog.urgentLevel === 2) {
        type = formatMessage('guet.schedule.normal');
      }
      dataDetail.push({
        key: backlog.id,
        title: backlog.matterName,
        type,
        finishTime: moment(new Date(backlog.requireTime)).format('DD/MM/YYYY HH:mm:ss'),
        user: userName,
        publishTime: moment(new Date(backlog.releaseTime)).format('DD/MM/YYYY HH:mm:ss'),
      });
    });
    let labelWidth = 139;
    if (getLocale() === 'fr-FR') {
      labelWidth = 193;
    }
    const importantLayout = dataSource.map((item, index) => {
      return (
        <>
          <FormItem
            labelWidth={labelWidth}
            labelText={`${formatMessage('guet.schedule.focus')}${index + 1}`}
            key={`${index + 1}`}
          >
            {getFieldDecorator(`emphasisList[${index}]`, {
              // rules: [{ required: true, message: formatMessage('guet.schedule.please_enter__todo_list') }],
              rules: [
                {
                  required: true,
                  message: formatMessage('guet.schedule.please_enter__todo_list'),
                },
                {
                  validator: this.noSpace,
                },
              ],
              initialValue: item.emphasisContent,
            })(<Input />)}
          </FormItem>
        </>
      );
    });
    return (
      <>
        <Prompt
          message={location => {
            const isLocation = location.pathname.indexOf('/todolist');
            return isLocation === -1 ? formatMessage('guet.schedule.todo_list_no_save_confirmed_leave') : true;
          }}
          when={unSaved && isUpdate}
        />
        <Tabs onChange={this.onChangeTodo}>
          <Tabs.TabPane tab={formatMessage('guet.schedule.to_do_registration')} key="1">
            <Form onSubmit={this.handleSubmit} autoComplete='off'>
              <FormItem
                labelWidth={labelWidth}
                labelText={formatMessage('guet.schedule.to_do_name')}
              >
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage('guet.schedule.please_enter__todo_list'),
                    },
                    {
                      validator: this.noSpace,
                    },
                  ],
                  initialValue: todo.matterName,
                })(<Input />)}
              </FormItem>

              <FormItem
                labelWidth={labelWidth}
                labelText={formatMessage('guet.schedule.to_do_list_generation_reason')}
              >
                {getFieldDecorator('reason', {
                  // rules: [{ required: true, message: formatMessage('guet.schedule.please_enter_the_reason_for_the_to_do_list') }],
                  rules: [
                    {
                      required: true,
                      message: formatMessage('guet.schedule.please_enter_the_reason_for_the_to_do_list'),
                    },
                    {
                      validator: this.noSpace,
                    },
                  ],
                  initialValue: todo.createReason,
                })(<Input />)}
              </FormItem>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <FormItem
                  labelWidth={labelWidth}
                  labelText={formatMessage('guet.schedule.request_completion_time')}
                >
                  {getFieldDecorator('date', {
                    rules: [{ required: true, message: '请选择发生日期!' }],
                    initialValue: moment(new Date(todo.requireTime), 'DD/MM/YYYY HH:mm:ss'),
                  })(
                    <DatePicker
                      disabledDate={current => this.handleDisable(current)}
                      disabledTime={date => this.handleDisabledTime(date)}
                      showTime
                      format="DD/MM/YYYY HH:mm:ss"
                      allowClear={false}
                    />
                  )}
                </FormItem>
                <FormItem
                  style={{ marginLeft: '10px' }}
                  labelText={formatMessage('guet.schedule.emergency_level')}
                >
                  {getFieldDecorator('level', {
                    // rules: [{ required: true, message: '请选择紧急程度!' }],
                    rules: [
                      {
                        required: true,
                        message: '请选择紧急程度!',
                      },
                      {
                        validator: this.noSpace,
                      },
                    ],
                    initialValue: todo.urgentLevel,
                  })(
                    <Select>
                      <Select.Option value={1}>
                        {formatMessage('guet.schedule.urgent')}
                      </Select.Option>
                      <Select.Option value={2}>
                        {formatMessage('guet.schedule.normal')}
                      </Select.Option>
                    </Select>
                  )}
                </FormItem>
              </div>

              {dataSource.length > 6 ?
                <div style={{ height: 370, overflow: 'auto', marginBottom: 30 }}>
                  <InfiniteScroll
                    pageStart={0}
                    useWindow={false}
                  >
                    {importantLayout}
                  </InfiniteScroll>
                  <div style={{ marginLeft: labelWidth }}>
                    <Icon type="plus-circle" style={{ fontSize: '20px' }} onClick={this.handleAddImp} />
                    &nbsp;&nbsp;
                    <Icon
                      type="minus-circle"
                      style={{
                        fontSize: '20px',
                        display: dataSource.length === 1 ? 'none' : undefined,
                      }}
                      onClick={this.handleDeleteImp}
                    />
                  </div>
                </div>
                :
                <div>
                  {importantLayout}
                  <div style={{ marginLeft: labelWidth }}>
                    <Icon type="plus-circle" style={{ fontSize: '20px' }} onClick={this.handleAddImp} />
                    &nbsp;&nbsp;
                    <Icon
                      type="minus-circle"
                      style={{
                        fontSize: '20px',
                        display: dataSource.length === 1 ? 'none' : undefined,
                      }}
                      onClick={this.handleDeleteImp}
                    />
                  </div>
                </div>
              }

              <Row type="flex" justify="end" style={{ marginBottom: '10px' }}>
                <Button onClick={this.resetForm} type="dashed">
                  {formatMessage('guet.schedule.cancel')}
                </Button>
                <Button type="primary" style={{ margin: '0px 10px' }} onClick={this.onSaveTodo}>
                  {formatMessage('guet.schedule.save')}
                </Button>
                <Button type="primary" htmlType="submit">
                  {formatMessage('guet.schedule.submit')}
                </Button>
              </Row>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab={formatMessage('guet.schedule.to_do_list')} key="2">
            <div ref={this.saveContainer} />
            {visible ? (
              <TodoDetail id={id} getTodoList={this.getTodoList} handleClose={this.handleClose} />
            ) : (
                <div>
                  <Row
                    type="flex"
                    justify="end"
                    style={{ marginBottom: '16px', alignItems: 'center' }}
                  >
                    <span>{formatMessage('guet.schedule.expiration_reminder')}：</span>
                    <Switch
                      style={{ marginRight: '10px' }}
                      checkedChildren={formatMessage('guet.schedule.expiration_reminder')}
                      unCheckedChildren=" "
                      defaultChecked={isRemind}
                      onChange={this.onChangeWarn}
                    />
                    <Select
                      style={{ width: '300px', marginRight: '10px' }}
                      onChange={this.onChangeSort}
                      value={sort}
                      placeholder="按条件排序"
                    >
                      <Select.Option value={2}>
                        {formatMessage('guet.schedule.sort_by_release_time_in_descending_order')}
                      </Select.Option>
                      <Select.Option value={1}>
                        {formatMessage('guet.schedule.sort_by_ascending_order')}
                      </Select.Option>
                      <Select.Option value={3}>
                        {formatMessage('guet.schedule.sort_by_urgency')}
                      </Select.Option>
                    </Select>
                    <Radio.Group onChange={this.onChangeStatus} value={status}>
                      <Radio.Button value={2}>
                        {formatMessage('guet.schedule.unfinished_business')}
                      </Radio.Button>
                      <Radio.Button value={1}>
                        {formatMessage('guet.schedule.completed_item')}
                      </Radio.Button>
                      <Radio.Button value={0}>
                        {formatMessage('guet.schedule.all_matters')}
                      </Radio.Button>
                    </Radio.Group>
                    <Button
                      style={{ marginLeft: '10px' }}
                      disabled={isDelDisabled}
                      type="danger"
                      onClick={this.onClickDeleteTodoList}
                    >
                      {formatMessage('guet.schedule.delete')}
                    </Button>
                    <Button
                      style={{ marginLeft: '10px' }}
                      type="primary"
                      onClick={this.onClickExportBacklog}
                      disabled={isDisabled}
                    >
                      {formatMessage('guet.schedule.export')}
                    </Button>
                    <Input
                      value={param}
                      onChange={this.onChangeParam}
                      style={{ width: '220px', marginLeft: '10px' }}
                      placeholder={formatMessage('guet.schedule.publisher_name_or_eventsName')}
                    />
                    <Button style={{ marginLeft: '10px' }} onClick={this.onClickSearch}>
                      {formatMessage('guet.schedule.search_for')}
                    </Button>
                  </Row>
                  <div>
                    <Table
                      rowSelection={this.rowSelection}
                      onRow={record => {
                        return { onClick: () => this.onClickTodoList(record) };
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
      </>
    );
  }
}

export default Form.create()(Todolist);
