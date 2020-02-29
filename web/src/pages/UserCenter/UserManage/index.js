import React from 'react';
import { Table, Card, Input, Select, Button, Icon, Divider, Form, Popconfirm, message } from 'antd';
import moment from 'moment';
import Modal from '@/common/components/Modal';
import MangeDetail from './component/ManageDetail';


const { Option } = Select;
class UserManage extends React.Component{

  columns = [{
    title: '用户名',
    dataIndex: 'username',
  }, {
    title: '昵称',
    dataIndex: 'nickname',
  }, {
    title: '用户类型',
    dataIndex: 'userType',
  }, {
    title: '手机号',
    dataIndex: 'telphoneNumber',
  }, {
    title: '邮箱',
    dataIndex: 'email',
  }, {
    title: '描述',
    dataIndex: 'decription'
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (_, record) => {
      const that = this;
      return (
        <>
          <a onClick={() => that.handleEdit(record.usernam)}>
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm placement="top" title="是否确认删除嘛?" onConfirm={this.confirm} okText="Yes" cancelText="No">
            <a href="" style={{ color: 'red' }}>删除</a>
          </Popconfirm>
        </>
      )
    }}]

  state = {
    selectedRowKeys: [],
    visible: false
  }

  confirm = () => {
    message.success('删除成功');
  }

  handleOnChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  handleEdit = username => {
    this.setState({
      visible: true
    })
  }

  handleClick = () => {
    this.setState({
      visible: true
    })
  }

  handleOk = () => {
    this.setState({
      visible: false
    })
  }

  handleOnCancel = () => {
    this.setState({
      visible: false
    })
  }
  
  render() {
    const { selectedRowKeys, visible } = this.state;
    const dataSource = [];
    for (let i = 0; i < 23; i++) {
      dataSource.push({
        username: 'daqing',
        nickname: 'zzz',
        userType: '管理员',
        telphoneNumber: '13977327178',
        email: '2295957879',
        decription: '开朗',
        createTime: moment(new Date).format('YYYY-MM-DD hh:mm:ss')
      })
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleOnChange,
    };
    return(
      <>
        <Card>
          <Select
            style={{ marginRight: 10, width: 200 }}
            placeholder="请选择查询条件"
          >
            <Option value={0}>管理员</Option>
            <Option value={1}>作者</Option>
            <Option value={2}>用户</Option>
          </Select>
          <Input
            placeholder="请输入查询的用户名/昵称"
            style={{ width: 250 }}
          />
          <Button type="primary" style={{ marginLeft: 10 }} icon="search">
            查询
          </Button>
          <Button type="danger" style={{ marginLeft: 10 }} icon="minus-circle">
            批量删除
          </Button>
          <Button type="primary" style={{ marginLeft: 10 }} icon="plus-circle" onClick={this.handleClick}>
            添加用户
          </Button>
        </Card>
        <Card 
          style={{ marginTop: 10 }}
          title={<span style={{ fontWeight: 'bold' }}>用户列表</span>}
          extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type="reload" /> 刷新</div>}
        >
          <Table 
            columns={this.columns}
            dataSource={dataSource}
            rowKey="id"
            rowSelection={rowSelection}
          />
        </Card>
        <Modal
          title="添加用户"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleOnCancel}
          showOk={true}
          showCancel={true}
          okText="确认"
          cancelText="取消"
        >
          <MangeDetail />
        </Modal>
      </>
    )
  }
}

export default Form.create({name: 'UserManage'})(UserManage);