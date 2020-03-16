import React from 'react';
import { Card, Table, Input, DatePicker, Button, Icon, Select, Badge } from 'antd';
import moment from 'moment';
import Modal from '@/common/components/Modal';
import StepForm from './component/StepForm';
import CustomizeEmpty from '@/components/CustomizeEmpty';
import {
  getAuditArticleList,
  getArticlesByOptions,
  getAuditDetail
} from '@/services/auditService';
import styles from './style.less';

const { RangePicker } = DatePicker;
const { Option } = Select;

class Audit extends React.Component {

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
        default: text = "";
      }
      return text
    }
  }, {
    title: '文章简述',
    dataIndex: 'articleDescription'
  }, {
    title: '发布时间',
    dataIndex: 'publishTime',
    render: (_, record) => moment(record.publishTime).format('YYYY-MM-DD hh:mm:ss')
  }, {
    title: '文章状态',
    dataIndex: 'status',
    render: (text, record) => (
      <span>
        <Badge status={record.status === 2 ? 'processing' : 'warning'} text={record.status === 2 ? '审核中' : '未审核'} />
      </span>
    )
  }]

  state = {
    visible: false,
    loading: true,
    required: true,
    auditArticlename: '',
    display: false,
    currentname: '',
    selectOption: 1,
    startTime: '',
    endTime: '',
    param: '',
    auditMessage: {
      articlename: '',
      author: '',
      articleType: '',
      articleDescription: '',
      articleForm: '',
    }
  }

  componentDidMount() {
    this.getAuditArticleList();
  }

  getAuditArticleList = () => {
    getAuditArticleList({}, ({ data }) => {
      this.setState({
        dataSource: data,
        loading: false
      })
    },
      e => console.log('getAuditArticleList-error', e.toString())
    )
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
    getArticlesByOptions({
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

  handleOnRow = name => {
    this.setState({
      currentname: name,
      visible: true
    })
  }

  showCard = () => {
    this.setState({
      display: true
    })
  }

  closeCard = () => {
    this.setState({
      display: false
    })
    this.getAuditArticleList();
  }

  handleOk = () => {
    const { currentname } = this.state;
    this.getAuditDetail(currentname);
    this.showCard();
    this.setState({
      auditArticlename: currentname,
      visible: false
    })
  }

  getAuditDetail = name => {
    getAuditDetail({
      articlename: name
    }, ({ data }) => {
      const { articlename, author, articleType, articleDescription, articleForm, articleContent, annexname } = data;
      this.setState({
        auditMessage: {
          articlename,
          author,
          articleType,
          articleDescription,
          articleForm,
          annexname,
          articleContent,
        }
      })
    },
      e => console.log('getAuditDetail-error', e.toString())
    )
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  
  handleFresh = () => {
    this.setState({
      loading: true
    })
    setTimeout(() => {
      this.getAuditArticleList()
      this.setState({
        loading: false
      })
    }, 1000)
  }

  render() {
    const { visible, loading, required, auditArticlename, currentname, auditMessage, dataSource, display, selectOption } = this.state;
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
            onChange={this.handleOnChange}
            defaultValue={selectOption}
          >
            <Option value={1}>未审核</Option>
            <Option value={2}>审核中</Option>
          </Select>
          <Input
            placeholder="请输入查询的文章名"
            style={{ width: 250 }}
            onChange={this.handleInputChange}
          />
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            icon="search"
            onClick={this.handleClickSeach}
          >
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
          <CustomizeEmpty>
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
          </CustomizeEmpty>
        </Card>
        <Card
          style={{ marginTop: 10, display: display ? '' : 'none' }}
          title={<span style={{ fontWeight: 'bold' }}>审核文章{auditArticlename ? `:《${auditArticlename}》` : null}</span>}
          extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type="reload" /> 刷新</div>}
        >
          <div>
            <StepForm auditMessage={auditMessage} closeCard={this.closeCard} />
          </div>
        </Card>
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
          <div className={styles.messeageTip}>是否确认审核<span className={styles.auditname}>《{currentname}》</span>？</div>
        </Modal>
      </div>
    )
  }
}

export default Audit;