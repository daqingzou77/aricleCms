import React from 'react';
import { List, Card, Icon, Typography } from 'antd';

const { Text, Paragraph} = Typography;

export default class HotComments extends React.Component {
  render() {
    return (
      <Card
        title={<span style={{ fontWeight: 'bold' }}>每日热评</span>}
        bodyStyle={{ height: 608 }}
        extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='reload' />&nbsp;换一换</div>}
      >
        <List
          // dataSource={dailyComments}
          renderItem={item => (
            <List.Item>
              <div style={{ width: '100%' }}>
                <Text strong>{item.commenter} <a>评论</a> {item.commentObject}</Text>
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