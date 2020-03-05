import React from 'react';
import { Card, Table, Input, DatePicker, Button, Icon, Select, Badge } from 'antd';
import momment from 'moment';
import Modal from '@/common/components/Modal';
import StepForm from './component/StepForm';
import styles from './style.less';

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
        <Badge status={record.status === 0 ? 'success' : 'error'} text={record.status === 0 ? '审核中' : '未审核'} />
      </span>
    )
  }]

  state = {
    visible: false,
    // loading: true,
    required: true,
    auditArticlename: '',
    anchor: '',
  }

  clickF = value => {
    window.scrollTo(0, 1000);
    // console.log('clientHeight', document.documentElement.clientHeight)
    // console.log('可视距离', document.body.scrollHeight)
    // console.log('纵向滑动距离', document.documentElement.scrollTop)
    // this.setState({
    //   anchor : value,
    // })
  }

  ifHasAnchorJustScorll = () => {
    const { anchor } = this.state;
    console.log("anchor ", anchor);
    // 对应id的话, 滚动到相应位置
    if (anchor) {
      const anchorElement = document.getElementById(anchor);
      console.log('anchorElement', anchorElement)
      if (anchorElement) {
        window.scrollTo(0, anchorElement.offsetTop - window.innerHeight / 2);
      }
    }
    // 没有的话，滚动到头部
    else {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }

  handleOnRow = name => {
    this.setState({
      auditArticlename: name,
      visible: true
    })
  }

  handleOk = () => {
    const el = document.createElement('a');
    el.href = "#auditCard";
    document.body.appendChild(el);
    el.click();
    this.setState({
      visible: false
    })
  }

  handleDateChange = (date, dateString) => {
    console.log(date, dateString)
  }

  handleFresh = () => {
    this.setState({
      loading: true
    })
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 1000)
  }

  render() {
    const { visible, loading, required, auditArticlename } = this.state;
    this.ifHasAnchorJustScorll();
    const dataSource = [];
    for (let i = 0; i < 31; i++) {
      dataSource.push({
        articlename: `文章${i + 1}`,
        author: `作者${i + 1}`,
        articleType: '小说',
        ariticleDescription: '本文简述...',
        createTime: momment(new Date).format('YYYY-MM-DD hh:mm:ss'),
        status: 1,
      })
    }
    return (
      <div>
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
        </Card>
        <Card
          style={{ marginTop: 10 }}
          title={<span style={{ fontWeight: 'bold' }}>待审文章列表</span>}
          extra={
            <div
              onClick={this.handleFresh}
              style={{ color: '#2884D8', cursor: 'pointer' }}
            >
              <Icon type="reload" /> 刷新
            </div>}
        >
          <Table
            rowKey='id'
            loading={loading}
            columns={this.columns}
            dataSource={dataSource}
            onRow={record => {
              return {
                onClick: e => this.handleOnRow(record.articlename)
              }
            }}
          />
        </Card>
        <Card
          style={{ marginTop: 10 }}
          title={<span style={{ fontWeight: 'bold' }}>审核文章{auditArticlename ? `:《${auditArticlename}》` : null }</span>}
          extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type="reload" /> 刷新</div>}
        >
          <div>
            <StepForm />
          </div>
        </Card>
          <a name="auditCard"></a>
        <Modal
          visible={visible}
          title="操作提示"
          okText="确认"
          cancelText='取消'
          showOk={required}
          showCancel={required}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
        >
          <div className={styles.messeageTip}>是否确认审核<span className={styles.auditname}>《{auditArticlename}》</span>？</div>
        </Modal>
      </div>
    )
  }
}


export default Home;