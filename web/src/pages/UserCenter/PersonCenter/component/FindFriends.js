import React from 'react';
import { Card, Input, Row, Col, Avatar, Popconfirm, Button, List } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import CustomizeEmpty from '@/components/CustomizeEmpty';
import styles from './style.less'
import {
  getFriendsDetail
} from '@/services/userService';

const { Search } = Input;

export default class FindFriends extends React.Component {

  state = {
    friends: []
  }

  handleSearch = value => {
    getFriendsDetail({
      field: value
    }, ({ data }) => {
      this.setState({
        friends: data
      })
    },
    e => console.log('getFriendsDetail-error', e.toString())
    )
  }

  render() {
    const text = '确认添加好友？';
    const { friends } = this.state;
    const friendsList = (
      <Row type="flex" justify="start">
        {friends.map((item, index) =>
          (
            <Col key={index}>
              <div className={styles.friendArrayStyle}>
                <Avatar icon="user" className={styles.avatarStyle} size={40} />
                <div className={styles.rightList}>
                  {item.username}
                  <Popconfirm placement="top" title={text} onConfirm={this.confirm} okText="确认" cancelText="取消">
                    <Button type="primary" size="small">加好友</Button>
                  </Popconfirm>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    )
    return (
      <div className={styles.findFriend}>
        <Card>
          <Search
            placeholder="请输入查询好友用户名/昵称"
            enterButton="查询"
            className={styles.search}
            onSearch={this.handleSearch}
          />
          <div className={styles.listStyle}>
            <InfiniteScroll className={styles.friendsScroll}>
              {friends.length > 0 ? (
                friendsList
              ) : (
                <CustomizeEmpty>
                  <List />
                </CustomizeEmpty>
                )}
            </InfiniteScroll>
          </div>
        </Card>
      </div>
    )
   }
}