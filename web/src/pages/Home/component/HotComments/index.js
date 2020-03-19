import React from 'react';
import { List, Card, Icon, Typography } from 'antd';
import {
  getHotComments
} from '@/services/homeService';

const { Text, Paragraph} = Typography;

export default class HotComments extends React.Component {
  state = {
    hotComments: []
  }

  componentDidMount() {
    this.getHotComments();
  }

  getHotComments = () => {
    getHotComments({}, ({ data }) => {
      this.setState({
        hotComments: data
      })
    },
    e => console.log('getHotComments-error', e.toString())
    )
  }

  render() {
    const { hotComments } = this.state;
    return (
      <Card
        title={<span style={{ fontWeight: 'bold' }}>每日热评</span>}
        bodyStyle={{ height: 608 }}
        extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='reload' />&nbsp;换一换</div>}
      >
        <List
          dataSource={hotComments}
          renderItem={item => (
            <List.Item>
              <div style={{ width: '100%' }}>
                <Text strong>{item.commenter} 评论 {item.commentObject}</Text>
                <Text style={{ float: 'right'}}>
                  <Icon type="like" />{item.commentStars} &nbsp;<Icon type="dislike" />{item.commentsDislike}
                </Text>
                <Paragraph>
                  {item.commentContent}
                </Paragraph>
              </div>
            </List.Item>
         )}
        />
      </Card>       
    )
  }    
}