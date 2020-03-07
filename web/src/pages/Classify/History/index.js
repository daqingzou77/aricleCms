import React from 'react';
import { Form, Card, Row, Col, Icon } from 'antd';
import Recommend from '../component/Recommend';
import LiveUpdate from '../component/LiveUpdate';
import Supplement from '../component/Supplement';
import HistorySearch from './components/historySearch';
import Table from '../component/Table';
import {
  getArticleByMutiKeys,
} from '@/services/classifyService';

class History extends React.Component {

  state = {
    loading: false,
    dataSource: [],
  }

  handleReset = () => {
    const { form } = this.props;
    form.resetFields();
  }

  handleOnQuery = () => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { keywords } = values;
        this.setState({
          loading: true
        });
        setTimeout(()=>{
          this.getArticleByMutiKeys(keywords);
        }, 1000)
      }
    })
  }

  getArticleByMutiKeys = keywords => {
    getArticleByMutiKeys({
      queryKeywords: keywords
    }, ({ data }) => {
      console.log('getArticleByMutiKeys-data', data);
      this.setState({
        dataSource: data,
        loading: false
      })
    },
      e => console.log('getArticleByMutiKeys-error', e.toString())
    )
  }

  render() {
    const { form } = this.props;
    const { loading, dataSource } = this.state;
    return (
      <div>
        <Row gutter={24}>
          <Col>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>多关键词检索</span>}
              extra={<span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={this.handleReset}><Icon type="delete" /> 重置</span>}
            >
              <HistorySearch handleOnQuery={this.handleOnQuery} form={form} />
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: 10 }}>
          <Col>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>搜索结果</span>}
            >
              <Table 
                dataSource={dataSource}
                loading={loading}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: 10 }}>
          <Col span={8} style={{ paddingRight: 0 }}>
            <Recommend keys="history" />
          </Col>
          <Col span={8} style={{ paddingRight: 0 }}>
            {/* <LiveUpdate keys="history" /> */}
          </Col>
          <Col span={8}>
            {/* <Supplement keys="history" /> */}
          </Col>
        </Row>
      </div>
    )
  }
}

export default Form.create({ name: 'history' })(History);