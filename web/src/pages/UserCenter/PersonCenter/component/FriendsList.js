/* eslint-disable no-nested-ternary */
import React from 'react';
import { Radio, List, Avatar, Button } from 'antd'; 
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import CustomizeEmpty from '@/components/CustomizeEmpty';
import Modal from '@/common/components/Modal';
import Chat from '@/pages/MessageCenter/component/Chat';
import {
  getClassifiedList,
  getCurrentUserDetail
} from '@/services/userService';
import styles from './style.less';

export default class FriendsList extends React.Component {
    
  state = {
    chooseKey: 0,
    userList: [],
    dataVisible: false,
    messageVisible: false,
    currentUser: {}
  }

  componentDidMount() {
    this.getClassifiedList(0);
  }

  handleOnChange = e => {
    const chooseKey = e.target.value;
    this.setState({
      chooseKey
    })
    this.getClassifiedList(chooseKey);
  }

  getClassifiedList = key => {
    const username = '古天乐';
    getClassifiedList({
      username,
      key
    }, ({ data }) => {
      // const { friendsList } = data;
      if (key === 0) {
        this.setState({
          userList: data.friendsList
        })
      } else if (key === 1) {
        this.setState({
          userList: data.attentionList
        })
      } else if (key === 2) {
        this.setState({
          userList: data.blacklist
        })
      }
    },
    e => console.log('getClassifiedList-error', e.toString())
    )
  }

  getCurrentUserDetail = username => {
    console.log('usename', username);
    getCurrentUserDetail({
      username
    }, ({ data }) => {
      this.setState({
        currentUser: data,
      })
    },
    e => console.log('getCurrentUserDetail-error', e.toString())
    )
   }

  watchData = name => {
    this.getCurrentUserDetail(name);
    this.setState({
      dataVisible: true
    })
  }

  handleMessage = name => {
    this.setState({
      messageVisible: true
    })
  }

  handlePushMessage = (socket, content) => {
    if (socket) {
      socket.emit('sendMessage', {
        sender: '古天乐',
        toFriend: '张家辉' ,
        content
      })
    }
  }

  render() {
    const { chooseKey, userList, dataVisible, messageVisible, currentUser } = this.state;
    const footer = (
      <Button onClick={this.handlePushMessage} type="primary" size="small" style={{ float: "right", margin: 5}}>发送</Button>
    );
    return (
      <div className={styles.friendlist}>
        <Radio.Group
          defaultValue={chooseKey}
          buttonStyle="solid"
          size="small"
          onChange={this.handleOnChange}
        >
          <Radio.Button value={0}>好友列表</Radio.Button>
          <Radio.Button value={1}>关注列表</Radio.Button>
          <Radio.Button value={2}>拉黑名单</Radio.Button>
        </Radio.Group>
        <CustomizeEmpty>
          <InfiniteScroll className={styles.listScrolls}>
            <List
              itemLayout="horizontal"
              dataSource={userList}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a key="list-watch" onClick={() => this.watchData(item.requester)}>查看名片</a>, 
                    <a key="list-message" onClick={() => this.handleMessage(item.requester)}>私信</a>
                  ]}
                >
                  {chooseKey === 0 ? (
                    <div>
                      <Avatar shape="circle" icon="user" style={{ background: '#f56a00', marginRight: 5 }} />
                      {item.requester}
                    </div>
                  ) : chooseKey === 1 ? (
                    <div>
                      <Avatar shape="circle" icon="heart" style={{ background: 'red', marginRight: 5 }} />
                      {item.requester}
                    </div>
                  ) : (
                    <div>
                      <Avatar shape="circle" icon="stop" style={{ background: 'black', marginRight: 5 }} />
                      {item.requester}
                    </div>
                  )}
                </List.Item>
                )}
            />
          </InfiniteScroll>
        </CustomizeEmpty>
        <Modal
          title="个人名片"
          width={300}
          visible={dataVisible}
          onOk={() => this.setState({ dataVisible: false })}
          onCancel={() => this.setState({ dataVisible: false })}
        >
          <>
            <div className={styles.avatarHolder}>
              <Avatar src={currentUser.avatar} className={styles.friendDetail} icon="user" size={60} />
              <div className={styles.name}>{currentUser.username}</div>
              <div>{currentUser.decription}</div>
            </div>
            <div className={styles.detail}>
              <p>
                <MailOutlined /> <span>{currentUser.account}</span>
                <PhoneOutlined style={{ marginLeft: 26 }} /> <span>{currentUser.telephoneNumber}</span>
              </p>
            </div>
          </>
        </Modal> 
        <Modal
          title='私信'
          visible={messageVisible}
          onOk={this.handlePrivateOk}
          onCancel={() => this.setState({ messageVisible: false })}
          footer={footer}
        >
          <Chat handlePushMessage={this.handlePushMessage} />
        </Modal>
      </div>
    )
   }
}