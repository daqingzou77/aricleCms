import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Card, List, Avatar, Typography, Icon } from 'antd';
import moment from 'moment';
import styles from './style.less';

const { Text } = Typography;

export default class LiveUpdate extends React.Component {
  render() {
    const avatarColor = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#f32432', '#2322d1', "#fff146"];
    return (
      <Card
        title={<span style={{ fontWeight: 'bold' }}>作者更新</span>}
        bodyStyle={{ height: 608 }}
        extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='reload' />&nbsp;刷新</div>}
      >
        <InfiniteScroll className={styles.infiniteScroll}>
          <List
            itemLayout="vertical"
            // dataSource={dailyUpdate}
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
    )
  }    
}