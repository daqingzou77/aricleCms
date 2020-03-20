import React from 'react';
import { Form, Card, Row, Col } from 'antd';
import PhysicalSearch from './components/PhysicalSearch';
import Table from '../component/Table';
import Recommend from '../component/Recommend';
import LiveUpdate from '../component/LiveUpdate';
import Supplement from '../component/Supplement';
import {
  getArticleByMutiKeys,
} from '@/services/classifyService';



class Physical extends React.Component {


  state = {
    loading: false,
    dataSource: [],
  }
  
  handleOnQuery = () => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        const { keyword1, ...otherKeywords } = values
        const queryKeywords = [keyword1];
        for (let obj in otherKeywords) {
          queryKeywords.push(otherKeywords[obj]);
        }
        setTimeout(()=> {
          this.getArticleByMutiKeys(queryKeywords);
        }, 1000)
      } 
    })
  }

  getArticleByMutiKeys = queryKeywords => {
    getArticleByMutiKeys({
      queryKeywords,
      articleType: 3
    }, ({ data }) => {
      this.setState({
        loading: false,
        dataSource: data
      })
    },
      e => console.log('getArticleByMutiKeys-error', e.toString())
    )
  }

  handleReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      dataSource: [],
    })
  }

  render() {
    const { form } = this.props;
    const { dataSource, loading } = this.state;
    
    return (
      <div>
        <Row gutter={24}>
          <Col>
            <PhysicalSearch handleReset={this.handleReset} form={form} handleOnQuery={this.handleOnQuery} />
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: 10 }}>
          <Col>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>搜索结果</span>}
            >
              <Table dataSource={dataSource} loading={loading} />
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: 10 }}>
          <Col span={8} style={{ paddingRight: 0 }}>
            <Recommend keys="physics" />
          </Col>
          <Col span={8} style={{ paddingRight: 0 }}>
            <LiveUpdate keys="physics" />
          </Col>
          <Col span={8}>
            <Supplement keys="physics" />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Form.create({ name: 'physical' })(Physical);