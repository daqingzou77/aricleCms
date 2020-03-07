import React from 'react';
import { Form, Card, Row, Col, Icon, List, Typography, Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import LittearteurSearch from './components/LitterateurSearch';
import Table from '../component/Table';
import styles from './style.less';
import Recommend from '../component/Recommend';
import LiveUpdate from '../component/LiveUpdate';
import Supplement from '../component/Supplement';
import {
  getHotRecommandFromLitterateur,
  getLiveUpdateFromLitterateur,
  getExcerpts
} from '@/services/classifyService';

const { Text } = Typography;


class Science extends React.Component {
  id = 0;

  state = {
    dataSource: [],
    clearTags: false,
    loading: false,
    hotArticles: [],
    excerpts: []
  }
  
  componentDidMount() {
    this.getHotRecommandFromLitterateur();
    this.getExcerpts();
  }

  getHotRecommandFromLitterateur = () => {
    getHotRecommandFromLitterateur({}, ({ data }) => {
      this.setState({
        hotArticles: data
      })
    },
    e => console.log('getHotRecommandFromLitterateur-error', e.toString())
    )
  }

  getExcerpts = () => {
    getExcerpts({}, ({ data }) => {
      this.setState({
        excerpts: data
      })
    },
    e => console.log('getExcerpts-error', e.toString())
    )
  }

  handleOnRemove = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 0) {
      return;
    };
    form.setFieldsValue({
      keys: keys.slice(1),
    });
  };

  handleOnAdd = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(this.id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };


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
    const { dataSource, loading, clearTags, excerpts, hotArticles } = this.state;
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} />{text}
      </span>
    );
    
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
          {/* <Col span={8} style={{ paddingRight: 0 }}>
            <LiveUpdate />
          </Col>
          <Col span={8}>
            <Supplement />
          </Col> */}
        </Row>
      </div>
    )
  }
}

export default Form.create({ name: 'science' })(Science);