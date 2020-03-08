import React from 'react';
import { Form, Card, Row, Col, Icon, Typography } from 'antd';
import LittearteurSearch from './components/LitterateurSearch';
import Table from '../component/Table';
import Recommend from '../component/Recommend';
import LiveUpdate from '../component/LiveUpdate';
import Supplement from '../component/Supplement';

class Litterateur extends React.Component {
  id = 0;

  state = {
    dataSource: [],
    clearTags: false,
    loading: false,
  }

  handleOnSave = data => {
    this.setState({
      loading: true
    })
    setTimeout(() => {
      this.setState({
        loading: false,
        dataSource: data
      })
    }, 1000)
  }

  handleReset = () => {
    this.setState({
      dataSource: [],
      clearTags: true
    })
  }

  restartTags = () => {
    this.setState({
      clearTags: false
    })
  }

  render() {
    const { dataSource, loading, clearTags } = this.state;
    return (
      <div>
        <Row gutter={24}>
          <Col>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>多关键词检索</span>}
              extra={<span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={this.handleReset}><Icon type="delete" /> 重置</span>}
            >
              <LittearteurSearch 
                clearTags={clearTags} 
                handleOnSave={this.handleOnSave} 
                restartTags={this.restartTags}
              />
            </Card>
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
            <Recommend keys="litterateur" />
          </Col>
          <Col span={8} style={{ paddingRight: 0 }}>
            <LiveUpdate keys="litterateur" />
          </Col>
          <Col span={8}>
            <Supplement keys="litterateur" />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Form.create({ name: 'litterateur' })(Litterateur);