import React from 'react';
import { Card, Table, Input, DatePicker, Button, Icon, Select, Badge } from 'antd';
import momment from 'moment';
import Modal from '@/common/components/Modal';
import StepForm from './component/StepForm';

const { RangePicker } = DatePicker;
const { Option } = Select;

class Home extends React.Component {

  columns = [{
    title: '文章名',
    dataIndex: 'articlename',
  }, {
    title: '作者',
    dataIndex: 'author',
  }, {
    title: '文章类型',
    dataIndex: 'articleType'
  }, {
    title: '文章简述',
    dataIndex: 'ariticleDescription'
  }, {
    title: '发布时间',
    dataIndex: 'createTime'
  }, {
    title: '文章状态',
    dataIndex: 'status',
    render: (text, record) => (
      <span>
        <Badge status={record.status === 0 ? 'success': 'error'} text={record.status === 0 ? '审核中': '未审核' } />
      </span>
    )
  }]

  state = {
    visible: false
  }

  handleOnRow = record => {
    this.setState({
      visible: true
    })
  }

  handleDateChange = (date, dateString) => {
    console.log(date, dateString)
  }

  render() {
    const { visible } = this.state;
    const dataSource = [];
    for(let i = 0; i < 31; i++) {
      dataSource.push({
        articlename: `文章${i+1}`,
        author: `作者${i+1}`,
        articleType: '小说',
        ariticleDescription: '本文简述...',
        createTime: momment(new Date).format('YYYY-MM-DD hh:mm:ss'),
        status: 1, 
      })
    } 
    return (
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
          </Select>
          <Input
            placeholder="请输入查询的文章名"
            style={{ width: 250 }}
          />
          <Button type="primary" style={{ marginLeft: 10 }} icon="search">
            查找
          </Button>
          <Button type="danger" style={{ marginLeft: 10 }} icon="minus-circle">
            重置
          </Button>
        </Card>
        <Card
          style={{ marginTop: 10 }}
          title={<span style={{ fontWeight: 'bold' }}>发布待审文章列表</span>}
          extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type="reload" /> 刷新</div>}
        >
          <Table
            columns={this.columns}
            dataSource={dataSource}
            onRow={record => {
              return {
                onClick: e => this.handleOnRow(record)
              }
            }}
          />
        </Card>
        <Card
          style={{ marginTop: 10 }}
          title={<span style={{ fontWeight: 'bold' }}>审核文章</span>}
          extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type="reload" /> 刷新</div>}
        >
          <StepForm />
        </Card>
        <Modal
          visible={visible}
          title="操作提示"
          okText="确认"
          cancelText='取消'
          showOk={true}
          showCancel={true}
          onCancel={()=> { this.setState({ visible: false })}}
          onOk={()=> { this.setState({ visible: false })}}
        >
          <div style={{ fontWeight: 'bold', marginTop: 20 }}>是否确认审核本篇文章？</div>
        </Modal>
      </>
    )
  }
}

export default Home;