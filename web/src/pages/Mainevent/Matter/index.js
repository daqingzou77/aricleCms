import { formatMessage as _formatMessage, getLocale } from 'umi/locale';
import React from 'react';
import { Button, Col, Form, Input, Modal, Row, Select, Table, Tabs, message, Pagination } from 'antd';

import moment from 'moment';
import { Prompt } from 'react-router-dom';
import MatterDetail from './MatterDetail';
import {
  deleteExplainList,
  getExplainList,
  getUserNotSaveExplain,
  setExplain,
  setSubmitExplain,
  exportExplain,
  queryDutyUser
} from '../../../services/scheduleService';
import FormItem from '@/components/FormItem';

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
    title: formatMessage('guet.schedule.importance'),
    dataIndex: 'type',
  },
  {
    title: formatMessage('guet.schedule.confess'),
    dataIndex: 'user',
  },
  {
    title: formatMessage('guet.schedule.account_time'),
    dataIndex: 'time',
  },
];

class Matter extends React.PureComponent {
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      const permission = localStorage.getItem('permission');
      this.setState({
        idList: selectedRowKeys
      });
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
      explain: {
        createReason: '',
        detail: '',
        explainState: true,
        explainTime: '',
        id: 0,
        importantLevel: 1,
        matterName: '',
        matterRange: '',
        userId: 0,
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      param: '',
      explainList: [],
      idList: [],
      sort: 2,
      id: 0,
      unSaved: true,
      isUpdate: false,
      isDisabled: true,
      isDelDisabled: true,
    };
  }

  componentDidMount() {
    this.getUserNotSaveExplain();
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

  getContainer = () => {
    return this.container;
  };

  saveContainer = container => {
    this.container = container;
  };

  handleOnSubmit = datas => {
    const { form } = this.props;
    const { explain } = this.state;
    let dutyInfoId = ''
    if (datas) {
      dutyInfoId = datas.dutyInfo.id;
    }
    const userId = localStorage.getItem('userId');
    form.validateFields((err, values) => {
      console.log('handleSubmit Received values of form: ', values);
      if (!err) {
        const { name, reason, level, detail } = values;
        setSubmitExplain(
          {
            id: explain.id,
            matterName: name,
            createReason: reason,
            dutyInfoId: dutyInfoId === '' ? 0 : dutyInfoId,
            userId, // todo 获取系统登记人
            explainTime: new Date(),
            importantLevel: level,
            matterRange: '', // todo 原型中没有范围字段
            detail,
            explainState: true,
          },
          ({ data }) => {
            message.success(formatMessage('guet.schedule.submit_success'));
            form.resetFields();
            this.setState({
              unSaved: false,
              explain: {
                createReason: '',
                detail: '',
                explainState: true,
                explainTime: '',
                id: 0,
                importantLevel: 1,
                matterName: '',
                matterRange: '',
                userId: 0,
              },
            });
          },
          error => {
            console.log('setSubmitExplain--error：', error.toString());
          }
        );
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.queryDutyUser(1);
  };

  handleSave = datas => {
    const { form } = this.props;
    const { explain } = this.state;
    let dutyInfoId = ''
    if (datas) {
      dutyInfoId = datas.dutyInfo.id;
    }
    const userId = localStorage.getItem('userId');
    form.validateFields((err, values) => {
      if (!err) {
        console.log('handleSubmit Received values of form: ', values);
        const { name, reason, level, detail } = values;
        setExplain(
          {
            id: explain.id,
            matterName: name,
            createReason: reason,
            dutyInfoId: dutyInfoId === '' ? 0 : dutyInfoId ,
            userId, // todo 获取系统登记人
            explainTime: new Date(),
            importantLevel: level,
            matterRange: '', // todo 原型中没有范围字段
            detail,
            explainState: false,
          },
          ({ data }) => {
            message.success(formatMessage('guet.schedule.save_success'));
            this.setState({
              explain: { ...explain, id: data },
              unSaved: false,
            });
          },
          e => {
            console.log('setExplain--error：', e.toString());
          }
        );
      }
    });
  };

  handleChange = page => {
    const { pageSize, param, sort } = this.state;
    getExplainList(
      {
        pageNum: page,
        pageSize,
        searchValue: param,
        sort,
      },
      ({ data }) => {
        console.log('getExplainList--data：', data);
        this.setState({
          explainList: data.list,
        });
      },
      e => {
        console.log('getExplainList--error：', e.toString());
      }
    );
    this.setState({
      pageNum: page,
    });
  }

  onSaveExplain = () => {
    this.queryDutyUser(0);
  };

  getUserNotSaveExplain = () => {
    const userId = localStorage.getItem('userId');
    getUserNotSaveExplain(
      {
        userId, // todo 从其他地方获取
      },
      ({ data }) => {
        console.log('getUserNotSaveExplain--data：', data);
        if (data !== null) {
          this.setState({
            explain: data,
            unSaved: false,
          });
        }
      },
      e => {
        console.log('getUserNotSaveExplain--error：', e.toString());
      }
    );
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

  onChangeExplain = checked => {
    if (checked === '2') {
      // 点击到交代事项列表
      this.getExplainList();
    }
  };

  onChangeSort = value => {
    const { param, pageNum, pageSize } = this.state;
    getExplainList(
      {
        pageNum,
        pageSize,
        searchValue: param,
        sort: value,
      },
      ({ data }) => {
        console.log('getExplainList--data：', data);
        this.setState({
          explainList: data.list,
          total: data.total
        });
      },
      e => {
        console.log('getExplainList--error：', e.toString());
      }
    );
    this.setState({
      sort: value,
    });
  };

  onChangeParam = e => {
    this.setState({
      param: e.target.value,
    });
  };

  getExplainList = () => {
    const { param, sort, pageNum, pageSize } = this.state;
    getExplainList(
      {
        pageNum,
        pageSize,
        searchValue: param,
        sort,
      },
      ({ data }) => {
        console.log('getExplainList--data：', data);
        this.setState({
          explainList: data.list,
          total: data.total,
        });
      },
      e => {
        console.log('getExplainList--error：', e.toString());
      }
    );
  };

  onClickSearch = () => {
    const { pageSize, param, sort } = this.state;
    getExplainList(
      {
        pageNum: 1,
        pageSize,
        searchValue: param,
        sort,
      },
      ({ data }) => {
        console.log('getExplainList--data：', data);
        this.setState({
          explainList: data.list,
        });
      },
      e => {
        console.log('getExplainList--error：', e.toString());
      }
    );
    this.setState({
      pageNum: 1,
    })
  };

  onClickDeleteExplain = () => {
    const { idList } = this.state;
    console.log('idList:', idList);
    confirm({
      title: formatMessage('guet.schedule.operation_message'),
      content: formatMessage('guet.schedule.whether_confirm_the_deletion'),
      okText: formatMessage('guet.schedule.confirm'),
      cancelText: formatMessage('guet.schedule.cancel'),
      onOk: () => {
        deleteExplainList(
          idList,
          {},
          data => {
            console.log('deleteExplainList--data：', data);
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
            console.log('deleteExplainList--error：', e.toString());
          }
        );
      },
      onCancel: () => {
        console.log('操作结束');
      }
    })
  };

  onClickExportExplain = () => {
    const { idList } = this.state;
    exportExplain(idList);
  };

  onClickExplain = record => {
    console.log('record:', record);
    this.setState({
      id: record.key,
    });
    this.showDrawer();
  };

  handleClose = () => {
    this.setState({
      visible: false
    })
  };

  resetForm = () => {
    const { form } = this.props;
    const { explain } = this.state;
    form.resetFields();
    this.setState({
      explain: {
        createReason: '',
        detail: '',
        explainState: true,
        explainTime: '',
        id: 0,
        importantLevel: 1,
        matterName: '',
        matterRange: '',
        userId: 0,
      },
      unSaved: false,
    });
    if (explain.id === 0) {
      deleteExplainList([0])
      return;
    }
    deleteExplainList([explain.id]);
  };

  noSpace = (rule, value, callback) => {
    const reg = /\s*\S+\s*/
    if (!reg.test(value) && value !== '') {
      callback(formatMessage('guet.schedule.input_space_invalid'));
    } else {
      callback();
    }
  };

  render() {
    const {
      visible,
      explain,
      param,
      explainList,
      sort,
      id,
      unSaved,
      isUpdate,
      isDisabled,
      isDelDisabled,
      pageNum,
      pageSize,
      total,
    } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const dataDetail = [];
    explainList.forEach(item => {
      const { userName } = item;
      const data = item.explain;
      let type = '正常';
      if (data.importantLevel === 1) {
        type = formatMessage('guet.schedule.normal');
      } else if (data.importantLevel === 2) {
        type = formatMessage('guet.schedule.important');
      } else if (data.importantLevel === 3) {
        type = formatMessage('guet.schedule.very_important');
      }
      dataDetail.push({
        key: data.id,
        title: data.matterName,
        user: userName,
        time: moment(new Date(data.explainTime)).format('DD/MM/YYYY HH:mm:ss'),
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
            const isLocation = location.pathname.indexOf('/matter');
            return isLocation === -1 ? formatMessage('guet.schedule.matter_no_save_confirmed_leave') : true;
          }}
          when={unSaved && isUpdate}
        />
        <Tabs onChange={this.onChangeExplain}>
          <Tabs.TabPane tab={formatMessage('guet.schedule.registration_of_matters')} key="1">
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onSubmit={this.handleSubmit} autoComplete='off'>
              <FormItem
                labelWidth={labelWidth}
                labelText={formatMessage('guet.schedule.talk_about_the_name_of_the_matter')}
              >
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage('guet.schedule.please_input_matter_name')
                    },
                    {
                      validator: this.noSpace,
                    }
                  ],
                  initialValue: explain.matterName,
                })(<Input />)}
              </FormItem>
              <FormItem
                labelWidth={labelWidth}
                labelText={formatMessage('guet.schedule.explain_the_cause_of_the_matter')}
              >
                {getFieldDecorator('reason', {
                  rules: [{
                    required: true,
                    message: formatMessage('guet.schedule.please_enter_the_reason_for_the_explanation')
                  },
                  {
                    validator: this.noSpace,
                  }
                  ],
                  initialValue: explain.createReason,
                })(<Input />)}
              </FormItem>
              <Row gutter={24}>
                <Col span={8}>
                  <FormItem
                    labelWidth={labelWidth}
                    labelText={formatMessage('guet.schedule.importance')}
                  >
                    {getFieldDecorator('level', {
                      rules: [{ required: true, message: '' }],
                      initialValue: explain.importantLevel,
                    })(
                      <Select>
                        <Select.Option value={1}>
                          {formatMessage('guet.schedule.normal')}
                        </Select.Option>
                        <Select.Option value={2}>
                          {formatMessage('guet.schedule.important')}
                        </Select.Option>
                        <Select.Option value={3}>
                          {formatMessage('guet.schedule.very_important')}
                        </Select.Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>

              <FormItem
                labelText={formatMessage('guet.schedule.explaining_details')}
                labelWidth={labelWidth}
              >
                {getFieldDecorator('detail', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage('guet.schedule.please_enter_the_details_of_the_account')
                    },
                    {
                      validator: this.noSpace,
                    }
                  ],
                  initialValue: explain.detail,
                })(<Input.TextArea rows={20} />)}
              </FormItem>
              <Row type="flex" justify="end" style={{ marginBottom: '10px' }}>
                <Button onClick={this.resetForm} type="dashed">
                  {formatMessage('guet.schedule.cancel')}
                </Button>
                <Button type="primary" style={{ margin: '0px 10px' }} onClick={this.onSaveExplain}>
                  {formatMessage('guet.schedule.save')}
                </Button>
                <Button type="primary" htmlType="submit">
                  {formatMessage('guet.schedule.submit')}
                </Button>
              </Row>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab={formatMessage('guet.schedule.talk_list')} key="2">
            <div ref={this.saveContainer} />
            {visible ?
              <MatterDetail id={id} handleClose={this.handleClose} /> : (
                <div>
                  <Row type="flex" justify="end" style={{ marginBottom: '16px' }}>
                    <Select
                      style={{ width: '300px' }}
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
                        {formatMessage('guet.schedule.sort_by_importance')}
                      </Select.Option>
                    </Select>
                    <Button
                      disabled={isDelDisabled}
                      onClick={this.onClickDeleteExplain}
                      style={{ marginLeft: '10px' }}
                      type="danger"
                    >
                      {formatMessage('guet.schedule.delete')}
                    </Button>
                    <Button
                      style={{ marginLeft: '10px' }}
                      type="primary"
                      disabled={isDisabled}
                      onClick={this.onClickExportExplain}
                    >
                      {formatMessage('guet.schedule.export')}
                    </Button>
                    <Input
                      value={param}
                      onChange={this.onChangeParam}
                      style={{ width: '200px', marginLeft: '10px' }}
                      placeholder={formatMessage('guet.schedule.confess_name_or_eventsName')}
                    />
                    <Button onClick={this.onClickSearch} style={{ marginLeft: '10px' }}>
                      {formatMessage('guet.schedule.search_for')}
                    </Button>
                  </Row>
                  <div>
                    <Table
                      rowSelection={this.rowSelection}
                      onRow={record => {
                        return { onClick: () => this.onClickExplain(record) };
                      }}
                      columns={columnsDetail}
                      pagination={false}
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

export default Form.create()(Matter);
