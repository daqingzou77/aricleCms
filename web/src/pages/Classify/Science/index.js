import React from 'react';
import { Form, Card, Row, Col } from 'antd';
import ScienceSearch from './component/ScienceSearch';
import Table from '../component/Table';
import Recommend from '../component/Recommend';
import LiveUpdate from '../component/LiveUpdate';
import Supplement from '../component/Supplement';
import {
  getArticleByMutiKeys,
} from '@/services/classifyService';

class Science extends React.Component {

  state = {
    dataSource: [],
    loading: false,
    hotArticles: []
  }

  handleOnQuery = () => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        const { keyword1, keys, ...otherKeywords } = values
        const queryKeywords = [keyword1];
        for (let obj in otherKeywords) {
          queryKeywords.push(otherKeywords[obj]);
        }
        setTimeout(() => {
          this.getArticleByMutiKeys(queryKeywords);
        }, 1000)
      }
    });
  }

  handleReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      dataSource: [],
    })
  }

  getArticleByMutiKeys = queryKeywords => {
    getArticleByMutiKeys({
      queryKeywords,
      articleType: 0
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
    const { dataSource, loading, hotArticles } = this.state;
    const { form } = this.props;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Row gutter={24}>
          <Col>
            <ScienceSearch form={form} handleOnQuery={this.handleOnQuery} handleReset={this.handleReset} />
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: 10 }}>
          <Col>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>查询结果</span>}
            >
              <Table
                loading={loading}
                dataSource={dataSource}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: 10 }}>
          <Col span={8} style={{ paddingRight: 0 }}>
            <Recommend keys="science" />
          </Col>
          <Col span={8} style={{ paddingRight: 0 }}>
            <LiveUpdate keys="science" />
          </Col>
          <Col span={8}>
            <Supplement keys="science" />
          </Col> 
        </Row>
      </div>
    )
  }
}

export default Form.create({ name: 'science' })(Science);