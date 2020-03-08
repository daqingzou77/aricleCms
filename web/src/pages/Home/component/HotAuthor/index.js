import React from 'react';
import { List, Card, Avatar, Icon, Typography } from 'antd';

const { Text } = Typography;

export default class HotAuthor extends React.Component {
  render() {
    // 公共组件
    const Atext = ({ href, text }) => (
      <a href={href} target="_blank">{text}</a>
    );

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    return (
      <Card
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        title={<span style={{ fontWeight: 'bold' }}>热门作者</span>}
        bordered
        bodyStyle={{ height: 476 }}
        extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='reload' />&nbsp;换一换</div>}
      >
        <List
          itemLayout="vertical"
          // dataSource={listData}
          renderItem={item => (
            <List.Item
              key={item.name}
              actions={[
                <IconText type="star-o" text={item.favorites} key="list-vertical-favorite-o" />,
                <IconText type="like-o" text={item.likes} key="list-vertical-like-o" />,
                <IconText type="dislike" text={item.dislikes} key="list-vertical-dislike" />,
                <IconText type="message" text={item.messages} key="list-vertical-message" />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<Text strong><Atext text={item.name} href={item.href} /></Text>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Card>       
    )
  }    
}