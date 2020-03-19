/* eslint-disable default-case */
import React from 'react';
import { Table, Card, Badge, DatePicker, Input, Select, Button, Icon, Divider, Popconfirm, message, Form } from 'antd';
import moment from 'moment';
import CustomizeEmpty from '@/components/CustomizeEmpty';
import Modal from '@/common/components/Modal';
import ManageDetail from './component/ManageDetail';
import {
  getArticleList,
  getArticleByOptions,
  deleteArticleItem,
  findArticleStatus,
  solveArticleItem
} from '@/services/articleSevice'


const { Option } = Select;
const { RangePicker } = DatePicker;

class Manage extends React.Component {

  columns = [{
    title: '文章名',
    dataIndex: 'articlename',
  }, {
    title: '作者',
    dataIndex: 'author',
  }, {
    title: '文章类型',
    dataIndex: 'articleType',
    render: (_, record) => {
      let text;
      switch (record.articleType) {
        case 0: text = "科学"; break;
        case 1: text = "历史"; break;
        case 2: text = "文学"; break;
        case 3: text = "体育"; break;
      }
      return text
    }
  }, {
    title: '文章描述',
    dataIndex: 'articleDescription',
  }, {
    title: '文章状态',
    dataIndex: 'status',
    render: (_, record) => {
      let publishSta;
      switch (record.status) {
        case 0: publishSta = { st: 'error', text: '未发布' }; break;
        case 1: publishSta = { st: 'warning', text: '已发布' }; break;
        case 2: publishSta = { st: 'processing', text: '审核中' }; break;
        case 3: publishSta = { st: 'success', text: '通过' }; break;
        case 4: publishSta = { st: 'default', text: '撤销' }
      }
      return (
        <span>
          <Badge status={publishSta.st} text={publishSta.text} />
        </span>
      )
    }
  }, {
    title: '文章创建时间',
    dataIndex: 'createTime',
    render: (_, record) => (moment(record.createTime).format('YYYY-MM-DD hh:mm:ss'))
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (_, record) => {
      const that = this;
      const { articlename, status } = record;
      return (
        <>
          <a onClick={() => {
            that.handleSolve(articlename, status)
          }}
          >
            处理
          </a>
          <Divider type="vertical" />
          <Popconfirm placement="top" title="是否确认删除嘛?" onConfirm={() => this.handleConfirm(articlename)} okText="确认" cancelText="取消">
            <a href="" style={{ color: 'red' }}>删除</a>
          </Popconfirm>
        </>
      )
    }
  }]

  state = {
    visible: false,
    loading: true,
    modal: '',
    dataSource: [],
    modalValue: {},
    startTime: '',
    endTime: '',
    selectOption: 1,
    param: ''
  }

  componentDidMount() {
    this.getArticleList();
  }

  handleDateChange = (date, string) => {
    const { selectOption, param } = this.state;
    const [startTime, endTime] = date;
    this.setState({
      startTime,
      endTime
    })
    this.getArticleByOptions(param, startTime, endTime, selectOption);
  }

  handleOnChange = value => {
    console.log('value', value);
    const { param, startTime, endTime } = this.state;
    this.setState({
      selectOption: value
    });
    this.getArticleByOptions(param, startTime, endTime, value);
  }

  handleInputChange = e => {
    const { startTime, endTime, selectOption } = this.state;
    this.setState({
      param: e.target.value
    });
    this.getArticleByOptions(e.target.value, startTime, endTime, selectOption);
  }

  // 条件查询
  handleClickSeach = () => {
    const { selectOption, startTime, endTime, param } = this.state;
    this.getArticleByOptions(param, startTime, endTime, selectOption)
  }

  getArticleByOptions = (articlename, startTime, endTime, status) => {
    getArticleByOptions({
      articlename,
      startTime,
      endTime,
      status,
    }, ({ data }) => {
      console.log('getArticleByOptions-data', data);
      this.setState({
        dataSource: data
      })
    },
      e => console.log('getArticleByOptions-error', e.toString())
    )
  }

  // 查询所有文章信息
  getArticleList = () => {
    getArticleList({}, ({ data }) => {
      data.map(item => {
        item.createTime = `${moment(item.createTime).format('YYYY-MM-DD hh:mm:ss')}`
      })
      this.setState({
        dataSource: data,
        loading: false
      })
    },
      e => console.log('getArticleList-error', e.toString())
    )
  }

  // 删除
  handleConfirm = articlename => {
    deleteArticleItem({
      articlename
    }, ({ data }) => {
      if (data.deletedCount > 0) {
        message.success('删除成功');
        this.getArticleList();
      } else {
        message.success('删除失败');
      }
    })
  }

  // 0 未发布 1 已发布 2 审核中 3 通过 4 已撤销
  handleSolve = (articlename, status) => {
    findArticleStatus({
      articlename,
    }, ({ data }) => {
      console.log('findAriticleStatus-data', data)
      switch (status) {
        case 0: this.setState({ modal: 'publish' }); break;
        case 1: this.setState({ modal: 'audit' }); break;
        case 2: this.setState({ modal: 'pass' }); break;
        case 3: this.setState({ modal: 'revoke' }); break;
        case 4: this.setState({ modal: 'none' }); break;
        default: break;
      }
      this.setState({
        visible: true,
        modalValue: data
      })
    },
      e => console.log('findAriticleStatus-error', e.toString())
    )
  }

  // 处理文章
  handleOk = () => {
    const { form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        const { articlename, status } = values;
        let state;
        switch (status) {
          case '未发布': state = 0; break;
          case '发布中': state = 1; break;
          case '审核中': state = 2; break
          case '通过': state = 3; break
          case '撤销': state = 4;
        }
        solveArticleItem({
          articlename,
          status: state
        },
          ({ data }) => {
            console.log('solveArticleItem-data', data);
            if (data.nModified > 0) {
              this.getArticleList();
              message.success('处理成功');
            }
          },
          e => console.log('solveArticleItem-error', e.toString())
        )
      }
    })
    this.setState({
      visible: false
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  refresh = () => {
    this.setState({
      loading: true
    })
    setTimeout(() => {
      this.getArticleList();
    }, 1000);
  }

  render() {
    const { visible, modal, dataSource, modalValue, selectOption, loading } = this.state;
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
            onChange={this.handleOnChange}
            defaultValue={selectOption}
          >
            <Option value={1}>已发布</Option>
            <Option value={2}>审核中</Option>
            <Option value={3}>通过</Option>
            <Option value={4}>已撤销</Option>
          </Select>
          <Input
            placeholder="请输入查询的文章名"
            style={{ width: 250 }}
            onChange={this.handleInputChange}
          />
          <Button type="primary" style={{ marginLeft: 10 }} icon="search" onClick={this.handleClickSeach}>
            查找
          </Button>
        </Card>
        <Card
          style={{ marginTop: 10 }}
          title={<span style={{ fontWeight: 'bold' }}>文章列表</span>}
          extra={
            <span 
              onClick={this.refresh}
              style={{ color: '#2884D8', cursor: 'pointer' }}
            >
              <Icon type="reload" /> 刷新
            </span>}
        >
          <CustomizeEmpty>
            <Table
              loading={loading}
              columns={this.columns}
              dataSource={dataSource}
              rowKey="id"
            />
          </CustomizeEmpty>
        </Card>
        <Modal
          title="文章处理"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          showOk={true}
          showCancel={true}
          okText="确认"
          cancelText="取消"
        >
          <ManageDetail modalType={modal} modalValue={modalValue} form={this.props.form} />
        </Modal>
      </>
    )
  }
}

export default Form.create({ name: 'Manage' })(Manage);