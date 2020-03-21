import React from 'react';
import { Table, Card, Input, Select, Button, Icon, Divider, Form, Popconfirm, message } from 'antd';
import moment from 'moment';
import Modal from '@/components/Modal';
import MangeDetail from './component/ManageDetail';
import {
  getUserList,
  getUserByOptions,
  addUserParam,
  deleteUserItem,
  deleteBatchUsers,
  queryUserItem,
  editUserItem
} from '@/services/userService';


const { Option } = Select;
class UserManage extends React.Component {

  columns = [{
    title: '用户名',
    dataIndex: 'username',
  }, {
    title: '昵称',
    dataIndex: 'nickname',
  }, {
    title: '用户类型',
    dataIndex: 'userType',
    render: (_, record) => {
      const { userType } = record;
      return (
        <span>{userType === 2 ? "管理员" : userType === 1 ? "作者" : "用户"}</span>
      )
    }
  }, {
    title: '手机号',
    dataIndex: 'telephoneNumber',
  }, {
    title: '邮箱',
    dataIndex: 'email',
  }, {
    title: '描述',
    dataIndex: 'decription'
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    render: (_, record) => <span>{moment(record.createTime).format('YYYY-MM-DD hh:mm:ss')}</span>
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (_, record) => {
      const that = this;
      return (
        <>
          <a onClick={() => that.handleEdit(record.username)}>
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm placement="top" title="是否确认删除嘛?" onConfirm={() => that.confirm(record.username)} okText="确认" cancelText="取消">
            <a href="" style={{ color: 'red' }}>删除</a>
          </Popconfirm>
        </>
      )
    }
  }]

  state = {
    deleteArrays: [],
    selectedRowKeys: [],
    required: true,
    visible: false,
    loading: false,
    dataSource: [],
    username: '',
    userType: 3,
    currentUser: {}
  }

  componentDidMount() {
    this.getUserList()
  }

  getUserList = () => {
    getUserList({}, ({ data }) => {
      this.setState({
        dataSource: data
      })
    },
      e => console.log('getUserList-error', e.toString())
    )
  }

  addUserParam = () => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { username, nickname, userType, telephoneNumber, email, decription } = values;
        addUserParam({
          username,
          nickname,
          userType,
          telephoneNumber,
          email,
          decription
        },
          ({ data }) => {
            if (data.status) {
              message.success('添加成功');
            } else {
              message.error('添加失败，用户已存在');
            }
            this.getUserList();
          },
          e => console.log('addUserParam-error', e.toString())
        )
      }
    })
  }

  updateOne = () => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        editUserItem(values,
          ({ data }) => {
            if (data.status) {
              message.success('修改成功！');
            } else {
              message.error('修改失败！');
            }
            this.getUserList();
          },
          e => console.log('edit-error', e.toString())
        )
      }
    })
  }

  getUserByOptions = (name, userType) => {
    getUserByOptions({
      name,
      userType
    },
      ({ data }) => {
        this.setState({
          dataSource: data
        })
      },
      e => console.log('getUserByOptions-error', e.toString())
    )
  }

  confirm = username => {
    deleteUserItem({
      username
    }, ({ data }) => {
      if (data.status) {
        message.success('删除成功');
      }
      this.getUserList();
    },
      e => console.log('deleteUserItem', e.toString())
    )
  }

  handleChange = value => {
    const { username } = this.state;
    this.setState({
      userType: value
    })
    this.getUserByOptions(username, value)
  }

  handleInputChange = e => {
    const { userType } = this.state;
    const name = e.target.value;
    this.setState({
      username: name
    })
    this.getUserByOptions(name, userType)
  }

  handleOnChange = (selectedRowKeys, selectedRows) => {
    const { deleteArrays } = this.state;
    selectedRows.map(item => {
      deleteArrays.push(item.username)
    })
    this.setState({
      deleteArrays,
      selectedRowKeys
    });
  }

  handleEdit = username => {
    queryUserItem({
      username
    }, ({ data }) => {
      this.setState({
        currentUser: data
      })
    },
      e => console.log('queryUseItem-error', e.toString())
    )
    this.setState({
      visible: true
    })
  }

  handleSearch = () => {
    const { username, userType } = this.state;
    this.getUserByOptions(username, userType);
  }

  handleBatchDelete = () => {
    const { deleteArrays } = this.state;
    deleteBatchUsers({
      deleteArrays
    }, ({ data }) => {
      if (data.status) {
        message.success("删除成功");
        this.getUserList();
      } else {
        message.success("删除失败");
      }
    },
      e => console.log('deleteBatchUsers-error', e.toString())
    );
  }

  handleClick = () => {
    this.setState({
      visible: true,
      currentUser: {}
    })
  }

  handleOk = () => {
    const { currentUser } = this.state;
    if (Object.keys(currentUser).length === 0) {
      this.addUserParam();
    } else {
      this.updateOne();
    }
    this.setState({
      visible: false
    })
  }

  handleOnCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleFresh = () => {
    this.setState({
      loading: true
    });
    setTimeout(() => {
      this.getUserList();
      this.setState({
        loading: false,
        userType: 3,
      });

    }, 1000)
  }

  render() {
    const { selectedRowKeys, visible, dataSource, loading, userType, currentUser, required } = this.state;
    const { form } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleOnChange,
    };
    return (
      <>
        <Card>
          <Select
            style={{ marginRight: 10, width: 200 }}
            placeholder="请选择查询条件"
            onChange={this.handleChange}
            value={userType}
          >
            <Option value={0}>用户</Option>
            <Option value={1}>作者</Option>
            <Option value={2}>管理员</Option>
            <Option value={3}>全部用户</Option>
          </Select>
          <Input
            placeholder="请输入查询的用户名/昵称"
            style={{ width: 250 }}
            onChange={this.handleInputChange}
          />
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            icon="search"
            onClick={this.handleSearch}
          >
            查询
          </Button>
          <Button
            type="danger"
            style={{ marginLeft: 10 }}
            icon="minus-circle"
            onClick={this.handleBatchDelete}
          >
            批量删除
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            icon="plus-circle"
            onClick={this.handleClick}
          >
            添加用户
          </Button>
        </Card>
        <Card
          style={{ marginTop: 10 }}
          title={<span style={{ fontWeight: 'bold' }}>用户列表</span>}
          extra={
            <span
              onClick={this.handleFresh}
              style={{ color: '#2884D8', cursor: 'pointer' }}
            >
              <Icon type="reload" /> 刷新
            </span>
          }
        >
          <Table
            columns={this.columns}
            loading={loading}
            dataSource={dataSource}
            rowKey="id"
            rowSelection={rowSelection}
          />
        </Card>
        <Modal
          title={Object.keys(currentUser).length !== 0 ? `编辑用户-${currentUser.username}` : '添加新用户'}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleOnCancel}
          showOk={required}
          showCancel={required}
          okText="确认"
          cancelText="取消"
        >
          <MangeDetail form={form} currentUser={currentUser} />
        </Modal>
      </>
    )
  }
}

export default Form.create({ name: 'UserManage' })(UserManage);