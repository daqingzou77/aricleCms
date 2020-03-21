/* eslint-disable no-nested-ternary */
import React from 'react';
import { Radio, List, Avatar, Button, Popconfirm, Divider, message } from 'antd';
import SocketIo from 'socket.io-client';
import moment from 'moment';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import CustomizeEmpty from '@/components/CustomizeEmpty';
import Modal from '@/components/Modal';
import Chat from '@/pages/MessageCenter/component/Chat';
import {
  getClassifiedList,
  getCurrentUserDetail,
  soloveBlack,
  deleteFriend,
  checkStatus
} from '@/services/userService';
import {
  deleteMessage
} from '@/services/messageService';
import styles from './style.less';

export default class FriendsList extends React.Component {

  state = {
    chooseKey: 0,
    userList: [],
    dataVisible: false,
    messageVisible: false,
    currentUser: {},
    currentUsername: '',
    content: '',
    chatWith: '',
    dialogTips: [],
    friendAvatar: ''
  }


  componentWillMount() {
    const username = localStorage.getItem('currentUser');
    this.setState({
      currentUsername: username
    })
  }

  componentDidMount() {
    this.initSocket();
    this.getClassifiedList(0);

  }

  handleReceiveMsg = data => {
    const { dialogTips } = this.state;
    dialogTips.push({
      senderContent: data.content,
      toFriendContent: '',
      logtime: moment(new Date())
    })
    this.setState({
      dialogTips
    })
  }

  setDialogTips = data => {
    const { currentUsername } = this.state;
    const dataArray = [];
    data.map(item => {
      const { sender, toFriend, content, time } = item;
      if (sender === currentUsername) {
        dataArray.push({
          senderContent: '',
          toFriendContent: content,
          logtime: moment(time)
        })
      } else if (toFriend === currentUsername) {
        dataArray.push({
          senderContent: content,
          toFriendContent: '',
          logtime: moment(time)
        })
      }
    })
    this.setState({
      dialogTips: dataArray
    })
  }

  initSocket = () => {
    const { dialogTips, currentUsername } = this.state;
    this.socket = SocketIo.connect('http://localhost:80');
    console.log('dialogTips', dialogTips);
    // socket连接
    this.socket.on('connect', () => {
      console.log('socket conneted')
    });
    // 用户登入
    this.socket.emit('login', { username: currentUsername });

    // 用户登入
    this.socket.on('logined', data => {
      console.log('logined', data.msg);
    })

    // 发送消息
    this.socket.on('pushHistoryMessage', data => {
      if (data.length === 0) {
        this.setState({
          dialogTips: []
        })
        return;
      }
      if (dialogTips.length === data.length) {
        this.setState({
          dialogTips
        })
        return
      }
      this.setDialogTips(data);
    });

    // 离线提醒
    this.socket.on('offlineRemind', data => {
      message.warning(`${data.toFriend}处于离线状态`)
    })

    // 接收消息
    this.socket.on('receiveMsg', data => {
      this.handleReceiveMsg(data);
    })

    // socket断开
    this.socket.on('disconnect', () => {
      // 用户退出
      this.socket.emit('logout', {
        username: currentUsername
      })
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
    const { currentUsername } = this.state;
    getClassifiedList({
      username: currentUsername,
      key
    }, ({ data }) => {
      if (key === 0) {
        this.setState({
          userList: data
        })
      } else if (key === 1) {
        this.setState({
          userList: data
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

  deleteMessage = name => {
    const currentUser = localStorage.getItem('currentUser');
    deleteMessage({
      username: currentUser,
      targetUser: name
    }, ({ data }) => {
      console.log(`后台消息清理状况${data.status}`);
    },
    e => console.log('deleteMessage-error', e.toString())
    )
  }

  // 判断是否拉黑和删除
  checkStatus = (username, targetUser) => {
    checkStatus({
      username,
      targetUser
    }, ({ data }) => {
      if (data.status === 0 ) {
        message.warning('您已被好友删除');
        return false;
      } 
      if (data.status === 1) {
        message.warning('您已被好友拉黑');
        return false;
      }
      return true;
    },
    e => console.log('checkStatus-error', e.toString())
    )
  }

  // 处理聊天
  handleMessage = ( name, avatar) => {
    const { currentUsername, dialogTips, messageVisible } = this.state;
    this.deleteMessage(name);
    checkStatus({
      username: currentUsername,
      targetUser: name
    }, ({ data }) => {
      if (data.status === 0 ) {
        message.warning('您已被好友删除');
        return;
      } 
      if (data.status === 1) {
        message.warning('您已被好友拉黑');
        return;
      }
      if (messageVisible) {
        message.warning('请关闭与其他人聊天的弹窗');
        return;
      }
      if (dialogTips.length === 0) {
        // 获取历史记录
        this.socket.emit('getHistoryMessage', { sender: currentUsername, toFriend: name });
      }
      this.setState({
        messageVisible: true,
        friendAvatar: avatar,
        chatWith: name
      })
    },
    e => console.log('checkStatus-error', e.toString())
    )
  }

  setContent = content => {
    this.setState({
      content,
    })
  }

  handlePushMessage = () => {
    const { content, dialogTips, currentUsername, chatWith } = this.state;
    if (!content) {
      message.warning('请输入内容');
      return;
    }
    dialogTips.push({
      senderContent: '',
      toFriendContent: content,
      logtime: moment(new Date())
    })
    // 发送消息
    this.socket.emit('sendMessage', {
      sender: currentUsername,
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
    this.setState({
      messageVisible: false,
      dialogTips: []
    })
  }


  handleBlack = (name, key) => {
    const { currentUsername } = this.state;
    soloveBlack({
      username: currentUsername,
      targetUser: name,
      key
    }, ({ data }) => {
      if (data.status && key === 1) {
        message.success('好友拉黑成功');
        this.getClassifiedList(0)
      } else if (data.status && key === 2) {
        message.success('拉黑撤销成功');
        this.getClassifiedList(1)
      }
    }, e => console.log('solveBlack-error', e.toString()))
  }

  deleteFriend = name => {
    const { currentUsername } = this.state;
    deleteFriend({
      username: currentUsername,
      targetUser: name
    }, ({ data }) => {
      if (data.status) {
        message.success('好友删除成功');
        this.getClassifiedList(0)
      } else {
        message.error('好友删除失败')
      }
    },
      e => console.log('deleteFriend-error', e.toString()))
  }

  render() {
    const { chooseKey, userList, dataVisible, messageVisible, currentUser, dialogTips, content, chatWith, friendAvatar } = this.state;
    const { myAvatar } = this.props;
    const footer = (
      <Button onClick={this.handlePushMessage} type="primary" size="small" style={{ float: "right", margin: 5 }}>发送</Button>
    );
    const text = "是否确认拉黑？";
    const text1 = "是否确认删除？";
    const text2 = "是否撤销拉黑";
    let Actions;
    if (chooseKey === 0) {
      Actions = ({ name, avatar }) => (
        <>
          <a key="list-message" onClick={() => this.handleMessage(name, avatar)}>聊天</a>
          <Divider type="vertical" />
          <Popconfirm placement="top" title={text} onConfirm={() => this.handleBlack(name, 1)} okText="确认" cancelText="取消">
            <a>拉黑</a>
          </Popconfirm>
          <Divider type="vertical" />
          <Popconfirm placement="top" title={text1} onConfirm={() => this.deleteFriend(name)} okText="确认" cancelText="取消">
            <a>删除</a>
          </Popconfirm>
        </>
      )
    } else {
      Actions = ({ name }) => (
        <Popconfirm placement="top" title={text2} onConfirm={() => this.handleBlack(name, 2)} okText="确认" cancelText="取消">
          <a>撤销拉黑</a>
        </Popconfirm>
      )
    }
    return (
      <div className={styles.friendlist}>
        <Radio.Group
          defaultValue={chooseKey}
          buttonStyle="solid"
          size="small"
          onChange={this.handleOnChange}
        >
          <Radio.Button value={0}>好友列表</Radio.Button>
          <Radio.Button value={1}>拉黑名单</Radio.Button>
        </Radio.Group>
        <CustomizeEmpty>
          <InfiniteScroll 
            className={styles.listScrolls}
            hasMore={false}
            loadMore={()=>{}}
          >
            <List
              itemLayout="horizontal"
              dataSource={userList}
              renderItem={item => (
                <List.Item>
                  {chooseKey === 0 ? (
                    <div>
                      <Avatar src={item.avatar} shape="circle" icon="user" style={{ background: '#f56a00', marginRight: 5 }} />
                      {item.name}
                    </div>
                  ) : (
                    <div>
                      <Avatar src={item.avatar} shape="circle" icon="stop" style={{ background: 'black', marginRight: 5 }} />
                      {item.name}
                    </div>
                  )}
                  <div style={{ marginLeft: '20%' }}>
                    <a key="list-watch" onClick={() => this.watchData(item.name)}>名片</a>
                    <Divider type="vertical" />
                    <Actions name={item.name} avatar={item.avatar} />
                  </div>
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
                <MailOutlined /> <span>{currentUser.email}</span>
                <PhoneOutlined style={{ marginLeft: 26 }} /> <span>{currentUser.telephoneNumber}</span>
              </p>
            </div>
          </>
        </Modal>
        <Modal
          title={chatWith}
          visible={messageVisible}
          onCancel={this.handleClosetPrivate}
          footer={footer}
        >
          <Chat
            setContent={this.setContent}
            dialogTips={dialogTips}
            content={content}
            myAvatar={myAvatar}
            friendAvatar={friendAvatar}
          />
        </Modal>
      </div>
    )
  }
}