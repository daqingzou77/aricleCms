import { formatMessage as _formatMessage } from 'umi/locale';
import React from 'react';
import { Button, Form, Input, Row, Table, Pagination, message, Modal } from 'antd';

import moment from 'moment';
import LogDetail from './LogDetail';
import { deleteLogList, getLogList, exportLog } from '../../services/scheduleService';

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
    title: formatMessage('guet.schedule.planned_person'),
    dataIndex: 'plan',
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

const { confirm } = Modal;

class Historicallog extends React.PureComponent {
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      this.setState({
        idList: selectedRowKeys
      })
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
      total: 0,
      pageSize: 10,
      pageNum: 1,
      visible: false,
      logList: [],
      idList: [],
      param: '',
      id: 0,
      isDisabled: true,
      isDelDisabled: true,
    };
  }

  componentDidMount() {
    this.getLogList();
  }

  componentWillUnmount() {
    this.setState({
      idList: [],
    });
  }

  handleSubmit = () => { };

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

  getLogList = () => {
    const { param, pageNum, pageSize } = this.state;
    getLogList(
      {
        pageNum,
        pageSize,
        searchValue: param,
      },
      ({ data }) => {
        console.log('getLogList--data：', data);
        this.setState({
          logList: data.list,
          total: data.total
        });
      },
      e => {
        console.log('getLogList--error：', e.toString());
      }
    );
  };

  onChangeParam = e => {
    this.setState({
      param: e.target.value,
    });
  };

  onClickSearch = () => {
    // this.getLogList();
    const { pageSize, param } = this.state;
    getLogList(
      {
        pageNum: 1,
        pageSize,
        searchValue: param,
      },
      ({ data }) => {
        console.log('getLogList--data：', data);
        this.setState({
          logList: data.list,
          total: data.total
        });
      },
      e => {
        console.log('getLogList--error：', e.toString());
      }
    );
    this.setState({
      pageNum: 1
    })
  };

  onClickDeleteLog = () => {
    const { idList } = this.state;
    console.log('idList:', idList);
    confirm({
      title: formatMessage('guet.schedule.operation_message'),
      content: formatMessage('guet.schedule.whether_confirm_the_deletion'),
      okText: formatMessage('guet.schedule.confirm'),
      cancelText: formatMessage('guet.schedule.cancel'),
      onOk: () => {
        deleteLogList(
          idList,
          {},
          data => {
            console.log('deleteLogList--data：', data);
            if (data.data > 0) {
              message.success(`${formatMessage('guet.schedule.delete_successfully')}`);
              this.onClickSearch();
              this.setState({
                idList: [],
                isDelDisabled: true,
                isDisabled: true
              });
            }
          },
          e => {
            console.log('deleteLogList--error：', e.toString());
          }
        );
      },
      onCancel: () => {
        console.log('操作结束');
      },
    }) 
  };

  onClickExportLog = () => {
    const { idList } = this.state;
    exportLog(idList);
  }

  onClickLogList = record => {
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

  handleChange = page => {
    const { param, pageSize } = this.state;
    getLogList(
      {
        pageNum: page,
        pageSize,
        searchValue: param,
      },
      ({ data }) => {
        console.log('getLogList--data：', data);
        this.setState({
          logList: data.list,
          total: data.total
        });
      },
      e => {
        console.log('getLogList--error：', e.toString());
      }
    );
    this.setState({
      pageNum: page,
    })
  };

  render() {
    const { visible, param, logList, id, isDisabled, isDelDisabled, total, pageNum, pageSize } = this.state;
    const permission = localStorage.getItem('permission');
    const dataDetail = [];
    logList.forEach(item => {
      const { log, userName } = item;
      dataDetail.push({
        key: log.id,
        title: log.logTitle, // todo 后台传入
        plan: log.dutyOperator, // todo 后台传入
        user: userName,
        time: moment(new Date(log.submitTime)).format('DD/MM/YYYY HH:mm:ss'),
      });
    });
    return (
      <>
        {
          visible ? <LogDetail id={id} handleClose={this.handleClose} />
            : (
              <div>
                <Row type="flex" justify="end" style={{ marginBottom: '16px' }}>
                  <div ref={this.saveContainer} />
                  <Button
                    disabled={isDelDisabled}
                    onClick={this.onClickDeleteLog}
                    style={{ marginLeft: '10px' }}
                    type="danger"
                  >
                    {formatMessage('guet.schedule.delete')}
                  </Button>
                  <Button
                    style={{ marginLeft: '10px' }}
                    type="primary"
                    onClick={this.onClickExportLog}
                    disabled={isDisabled}
                  >
                    {formatMessage('guet.schedule.export')}
                  </Button>
                  <Input
                    value={param}
                    onChange={this.onChangeParam}
                    style={{ width: '250px', marginLeft: '10px' }}
                    placeholder={formatMessage('guet.schedule.publisher_name_or_log_name')}
                  />
                  <Button
                    onClick={this.onClickSearch}
                    style={{ marginLeft: '10px' }}
                  >
                    {formatMessage('guet.schedule.search_for')}
                  </Button>
                </Row>
                <div>
                  <Table
                    rowSelection={this.rowSelection}
                    pagination={false}
                    onRow={record => {
                      return { onClick: () => this.onClickLogList(record) };
                    }}
                    columns={columnsDetail}
                    dataSource={dataDetail}
                    bordered
                  />
                </div>
                {
                  total > 0 ?
                    <Pagination
                      style={{ float: 'right', marginTop: 10 }}
                      defaultCurrent={1}
                      current={pageNum}
                      pageSize={pageSize}
                      total={total}
                      onChange={page => this.handleChange(page)}
                    /> : ''
                }
              </div>
            )
        }
      </>
    );
  }
}

export default Form.create()(Historicallog);
