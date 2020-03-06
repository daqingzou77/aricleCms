/* eslint-disable no-nested-ternary */
import React from 'react';
import { Form, Card, Row, Col, Icon, List, Typography, Avatar  } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import HistorySearch from './components/historySearch';
import Table from '../component/Table';
import styles from './style.less';
import {
  hotArticles,
  dailyUpdate,
  avatarColor,
  scienceTips
} from './mock';
import {
  getArticleByMutiKeys
} from '@/services/classifyService';

const { Text } = Typography;


class History extends React.Component {
  id = 0;

  state = {
    loading: false,
    dataSource: []
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
    const { getFieldDecorator, getFieldValue } = form;
    const { loading, dataSource } = this.state;
    getFieldDecorator('keys', { initialValue: [] });
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
            <Card
              title={<span style={{ fontWeight: 'bold' }}>热门推荐</span>}
              bodyStyle={{ height: 608 }}
              extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='reload' />&nbsp;换一换</div>}
            >
              <List
                itemLayout="vertical"
                dataSource={hotArticles}
                renderItem={item => (
                  <List.Item
                    key={item.articlename}
                    actions={[
                      <IconText type="star-o" text={item.favorites} key="list-vertical-star-o" />,
                      <IconText type="like-o" text={item.likes} key="list-vertical-like-o" />,
                      <IconText type="dislike" text={item.dislikes} key="list-vertical-dislike" />,
                      <IconText type="message" text={item.messages} key="list-vertical-message" />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<img src={item.articleImgSrc} alt="文章图片" width={120} height={120} />}
                      title={<Text strong><a href={item.href}>{item.articlename}</a></Text>}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={8} style={{ paddingRight: 0 }}>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>实时更新</span>}
              extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='reload' />&nbsp;刷新</div>}
            >
              <InfiniteScroll className={styles.infiniteScroll}>
                <List
                  itemLayout="vertical"
                  dataSource={dailyUpdate}
                  renderItem={(item, index) => (
                    <List.Item key={item.author}>
                      <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: avatarColor[index] }} icon="user" />}
                        title={<Text strong>作者-{item.author}</Text>}
                        description={item.updateContent}
                      />
                      <div style={{ float: 'right', marginTop: '-3%' }}>发布时间：{moment(item.updateTime).format('YYYY-MM-DD hh:mm:ss')}</div>
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              bodyStyle={{ height: 608 }}
              title={<span style={{ fontWeight: 'bold' }}>历史小故事</span>}
              extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='reload' />&nbsp;换一换</div>}
            >
              <List 
                dataSource={scienceTips}
                renderItem={item => (
                  <List.Item>
                    <Typography.Text mark>[ITEM]</Typography.Text> {item}
                  </List.Item>
                )}            
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Form.create({ name: 'history' })(History);