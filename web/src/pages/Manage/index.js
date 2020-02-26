import React from 'react';
import { Table, Card, Badge, DatePicker, Input, Select, Button, Icon, Divider } from 'antd';
import moment from 'moment';

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
    title: '创建时间',
    dataIndex: 'createTime',
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (_, record) => (
      <>
        <a
          onClick={() => {
          }}
        >
          处理
        </a>
        <Divider type="vertical" />
        <a href="" style={{ color: 'red' }}>删除</a>
      </>
    ),
  }]

  state = {

  }

  render() {
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
          title={<span style={{ fontWeight: 'bold' }}>文章列表</span>}
          extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type="reload" /> 刷新</div>}
        >
          <Table 
            columns={this.columns}
            dataSource={dataSource}
            rowKey="id"
            expandedRowRender={record => (
              <div style={{ margin: 0, textAlign: 'left' }}>
                <p>
                  <span>
                    章节： section1
                  </span>
                  &nbsp; &nbsp;
                  <span>
                    状态：  <Badge status="success" /> 已发布
                  </span>
                  &nbsp; &nbsp;
                  <span>
                    章节时间： {moment(new Date()).format('YYYY/MM/DD hh:mm:ss')}
                  </span>
                  &nbsp; &nbsp;
                  <span>
                    章节内容： daqing
                  </span>
                </p>
              </div>
            )}
          />
        </Card>
      </>
    )
  }
}

export default Manage;