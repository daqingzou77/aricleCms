import React from 'react';
import { Card, Input, Row, Col, Avatar, Popconfirm, Button, List, message, Tag } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { ReloadOutlined, DownloadOutlined } from '@ant-design/icons';
import CustomizeEmpty from '@/components/CustomizeEmpty';
import styles from './style.less'
import {
  getFriendsDetail,
  addUserRequest,
} from '@/services/userService';

const { Search } = Input;

export default class FindFriends extends React.Component {

  state = {
    friends: [],
    defaultValue: '',
  }

  handleFresh = () => {
    this.setState({
      friends: [],
      defaultValue: ''
    })
  }

  handleSearch = value => {
    if (!value) {
      message.warning('请输入查询条件');
      return;
    }
    getFriendsDetail({
      field: value
    }, ({ data }) => {
      this.setState({
        friends: data,
        defaultValue: value
      })
    },
      e => console.log('getFriendsDetail-error', e.toString())
    )
  }

  handleAddFriend = username => {
    const requester = localStorage.getItem('currentUser');
    addUserRequest({
      requester,
      targetUser: username
    }, ({ data }) => {
      const { status } = data;
      if (status === 0) {
        message.warning('好友已存在')
      } else if (status === 1) {
        message.warning('请求已发送，等待结果');
      } else if (status === 2) {
        message.success('好友请求发送成功');
      } else if (status === 3) {
        message.error('请求发送失败');
      }
      this.handleFresh();
    },
      e => console.log('handleAddFriend-error', e.toString())
    )
  }

  render() {
    const text = '确认添加好友？';
    const { friends, defaultValue } = this.state;
    const currentUser = localStorage.getItem('currentUser'); // 模拟获取当前用户
    const friendsList = (
      <Row type="flex" justify="start">
        {friends.map((item, index) =>
          (
            <Col key={index}>
              <div className={styles.friendArrayStyle}>
                <Avatar src={item.avatar} style={{ backgroundColor: '#87d068' }} icon="user" size={40} />
                <div className={styles.rightList}>
                  {item.username}
                  {item.username === currentUser ? <Tag color="#f50">本用户</Tag> : (
                    <Popconfirm placement="top" title={text} onConfirm={() => this.handleAddFriend(item.username)} okText="确认" cancelText="取消">
                      <Button type="primary" size="small">加好友</Button>
                    </Popconfirm>
                  )}
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
            onSearch={this.handleSearch}
            className={styles.search}
            onChange={e => {this.setState({ defaultValue: e.target.value})}}
            value={defaultValue}
          />
          <Button 
            type="primary" 
            icon='reload' 
            style={{ marginTop: 10 }} 
            onClick={this.handleFresh}
          />
          <div className={styles.listStyle}>
            <InfiniteScroll 
              className={styles.friendsScroll}
              hasMore={false}
              loadMore={()=>{}}
            >
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