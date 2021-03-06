import React from 'react';
import { List, Card, Typography, Icon } from 'antd';
import {
  getDailyPush
} from '@/services/homeService';

const { Paragraph } = Typography;


export default class DailyPush extends React.Component {

  state = {
   list: []
  }

  componentDidMount() {
    this.getDailyPush()
  }

  getDailyPush = () => {
    getDailyPush({}, ({ data }) => {
      this.setState({
        list: data
      })
    })
  }

  render() {
    const { list } = this.state;
    const cardList = (
      <List
        rowKey="id"
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Card
              hoverable
              bodyStyle={{ height: 285 }}
              cover={<img alt={item.title} src={item.imgSrc} height={124} width={207} />}
            >
              <Card.Meta
                description={
                  <Paragraph>{item.description}</Paragraph>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    )
    return (
      <Card
        title={<span style={{ fontWeight: 'bold' }}>每日推送</span>}
        bordered
        bodyStyle={{ height: 476 }}
        extra={
          <span 
            style={{ color: '#2884D8', cursor: 'pointer' }}
          >
            <Icon type='reload' /> 换一换
          </span>}
      >
        {cardList}
      </Card>
    )
  }
}