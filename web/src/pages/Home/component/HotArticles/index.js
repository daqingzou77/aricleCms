import React from 'react';
import { Card, List, Icon, Typography } from 'antd';

const { Text } = Typography; 

export default class HotArticles extends React.Component {
  render() {
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    return (
      <Card
        title={<span style={{ fontWeight: 'bold' }}>热门文章</span>}
        bodyStyle={{ height: 608 }}
        extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='reload' />&nbsp;换一换</div>}
      >
        <List
          itemLayout="vertical"
          // dataSource={hotArticles}
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
    )
  }    
}