import React from 'react';
import { Table, Card, Badge, DatePicker, Input, Select, Button, Icon, Divider, Popconfirm, message } from 'antd';
import moment from 'moment';
import Modal from '@/common/components/Modal';
import ManageDetail from './component/ManageDetail';

const { Option } = Select;
const { RangePicker } = DatePicker;
class Manage extends React.Component{

  columns = [{
    title: '文章名',
    dataIndex: 'articlename',
  }, {
    title: '作者',
    dataIndex: 'author',
  }, {
    title: '文章类型',
    dataIndex: 'articleType',
  }, {
    title: '文章描述',
    dataIndex: 'ariticleDescription',
  }, {
    title: '文章状态',
    dataIndex: 'status',
    render: () => (
      <span>
        <Badge status="success" />
        已发布
      </span>
    ),
  }, {
    title: '发布时间',
    dataIndex: 'createTime',
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (_, record) => {
      const that = this;
      return (
        <>
          <a onClick={() => {
              that.handleSolve(record.articlename)
            }}
          >
            处理
          </a>
          <Divider type="vertical" />
          <Popconfirm placement="top" title="是否确认删除嘛?" onConfirm={this.confirm} okText="Yes" cancelText="No">
            <a href="" style={{ color: 'red' }}>删除</a>
          </Popconfirm>
        </>
      )
    }
  }]

  state = {
    visible: false
  }

  confirm = () => {
    message.success('删除成功');
  }


  handleSolve = articlename => {
    this.props.history.push('/publish/Audit')
    // this.setState({
    //   visible: true
    // })
  }

  handleOk = () => {
    this.setState({
      visible: false
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { visible } = this.state;
    const dataSource = [];
    for (let i = 0; i < 23; i++) {
      dataSource.push({
        articlename: `水浒绪论${i + 1}`,
        author: '施耐庵',
        articleType: '小说',
        ariticleDescription: '本章节..',
        createTime: moment(new Date).format('YYYY-MM-DD hh:mm:ss')
      })
    }
    return(
      <>
        <Card>
          <RangePicker
            style={{ marginRight: 10 }}
            format="YYYY-MM-DD HH:mm:ss"
            placeholder={['查询起始时间', '查询结束时间']}
            onChange={(date, dateString) => this.handleDateChange(date, dateString)}
          />
          <Select
            style={{ marginRight: 10, width: 200 }}
            placeholder="请选择查询条件"
          >
            <Option value={0}>未审核</Option>
            <Option value={1}>审核中</Option>
            <Option value={2}>已发布</Option>
            <Option value={3}>已撤销</Option>
          </Select>
          <Input
            placeholder="请输入查询的文章名"
            style={{ width: 250 }}
          />
          <Button type="primary" style={{ marginLeft: 10 }} icon="search">
            查找
          </Button>
        </Card>
        <Card 
          style={{ marginTop: 10 }}
          title={<span style={{ fontWeight: 'bold' }}>文章列表</span>}
          extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type="reload" /> 刷新</div>}
        >
          <Table 
            columns={this.columns}
            dataSource={dataSource}
            rowKey="id"
          />
        </Card>
        <Modal
          title="处理详情"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          showOk={true}
          showCancel={true}
          okText="确认"
          cancelText="取消"
        >
          <ManageDetail />
        </Modal>
      </>
    )
  }
}

export default Manage;