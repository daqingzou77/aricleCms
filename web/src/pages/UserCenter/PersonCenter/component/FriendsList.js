/* eslint-disable no-nested-ternary */
import React from 'react';
import { Radio, List, Avatar, Button, message } from 'antd';
import SocketIo from 'socket.io-client';
import moment from 'moment';
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
    currentUser: {},
    content: '',
    chatWith: '',
    dialogTips: []
  }

  
  componentWillMount () {
    this.initSocket();
    const currentUser = localStorage.getItem('currentUser');
    this.setState({
      currentUser
    })
   }

  componentDidMount() {
    this.getClassifiedList(0);
  }

  initSocket = () => {
    const { dialogTips } = this.state;
    this.socket = SocketIo.connect('http://localhost:80');
    this.socket.on('connect', () => {
      console.log('socket connected');
    });
    this.socket.on('receiveMsg', data => {
      dialogTips.push({
        senderContent: data.content,
        toFriendContent: '',
        logtime: moment(new Date())
      })
      this.setState({
        dialogTips
      })
    })
    this.socket.on('disconnect', () => {
      console.log('socket disconnected');
    });
    
  }

  handleOnChange = e => {
    const chooseKey = e.target.value;
    this.setState({
      chooseKey
    })
    this.getClassifiedList(chooseKey);
  }

  getClassifiedList = key => {
    const { currentUser } = this.state;
    getClassifiedList({
      username: currentUser,
      key
    }, ({ data }) => {
      if (key === 0) {
        this.setState({
          userList: data
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
      messageVisible: true,
      chatWith: name
    })
  }

  setContent = content => {
    this.setState({
      content,
    })
  }

  handlePushMessage = () => {
    const { content, dialogTips, currentUser, chatWith } = this.state;
    if (!content) {
      message.warning('请输入内容');
      return;
    }
    dialogTips.push({
      senderContent: '',
      toFriendContent: content,
      logtime: moment(new Date())
    })
    this.socket.emit('sendMessage', {
      sender: currentUser,
      toFriend: chatWith,
      time: new Date(),
      content
    })
    this.setState({
      dialogTips,
      content: ''
    });
  }

  handleClosetPrivate = () => {
    const { currentUser } = this.state;
    this.socket.emit('logout', {
      username: currentUser
    })
    this.setState({
      messageVisible: false,
      dialogTips: []
    })
  }

  render() {
    const { chooseKey, userList, dataVisible, messageVisible, currentUser, dialogTips, content, chatWith } = this.state;
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
                    <a key="list-watch" onClick={() => this.watchData(item.friend)}>查看名片</a>, 
                    <a key="list-message" onClick={() => this.handleMessage(item.friend)}>私信</a>
                  ]}
                >
                  {chooseKey === 0 ? (
                    <div>
                      <Avatar src={item.avatar} shape="circle" icon="user" style={{ background: '#f56a00', marginRight: 5 }} />
                      {item.friend}
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
          title={chatWith}
          visible={messageVisible}
          onOk={this.handlePrivateOk}
          onCancel={this.handleClosetPrivate}
          footer={footer}
        >
          <Chat 
            setContent={this.setContent} 
            socket={this.socket} 
            username={currentUser} 
            dialogTips={dialogTips}
            content={content}
          />
        </Modal>
      </div>
    )
   }
}