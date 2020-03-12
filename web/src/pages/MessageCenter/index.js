import React from 'react';
import { Row, Col, Badge, Avatar, List, Collapse,Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import SocketIo from 'socket.io-client';

import moment from 'moment';
import Modal from '@/common/components/Modal';
import Chat from './component/Chat';
import styles from './style.less';

const { Panel } = Collapse;
class MessageCenter extends React.Component {

  state = {
    commentVisible: false,
    messageVisible: false,
    content: ''
  }

  componentDidMount() {
    this.initSocket()
  }

  initSocket = () => {
    this.socket = SocketIo.connect('http://localhost:80');
    this.socket.on('connect', () => {
      console.log('socket connected');
    });
    this.socket.on('disconnect', () => {
      console.log('socket disconnected');
    });
  }

  setContent = content => {
    this.setState({
      content
    })
  }


  // 评论
  handleCommentClick = () => {
    this.setState({
      commentVisible: true
    })
  }

  handleCommentOk = () => {
    this.setState({
      commentVisible: false
    })
  }

  handleCommentCancel = () => {
    this.setState({
      commentVisible: false
    })
  }

  // 私信、好友
  handlePrivaceClick = () => {
    this.setState({
      messageVisible: true
    })
  }

  handlePrivateOk = () => {
    this.setState({
      messageVisible: false
    })
  }

  handlePrivateCancel = () => {
    this.setState({
      messageVisible: false
    })
  }

  handlePushMessage = () => {
    const { content } = this.state;
      this.socket.emit('sendMessage', {
        sender: '张家辉',
        toFriend: '古天乐' ,
        time: new Date(),
        content
      })
  }

  render() {
    const { commentVisible, messageVisible } = this.state;
    const footer = (
      <Button onClick={this.handlePushMessage} type="primary" size="small" style={{ float: "right", margin: 5}}>发送</Button>
    );
    const dataSource = [
      'user1',
      'user2',
      'user3',
      'user1',
      'user2',
      'user3',
    ];
    return (
      <div className={styles.message}>
        {/* 评论 赞我 私信 */}
        <Collapse onChange={() => { }} expandIconPosition="right">
          <Panel
            header={
              <Row type="flex" justify="space-between">
                <Col>
                  <Avatar shape="circle" icon="message" style={{ background: 'green', marginRight: 5 }} size="small" /> 评论
                </Col>
                <Col>
                  <Badge count={5} />
                </Col>
              </Row>
            }
            key="1"
          >
            <InfiniteScroll className={styles.scroll}>
              <List
                dataSource={dataSource}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      onClick={this.handleCommentClick}
                      avatar={<Avatar shape="circle" icon="message" style={{ background: 'green', marginRight: 5 }} size="small" />}
                      title={<span>{item}评论了我</span>}
                    />
                    <span>{moment(new Date).format('YYYY-MM-DD')}</span>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </Panel>
          <Panel
            header={
              <Row type="flex" justify="space-between">
                <Col>
                  <Avatar shape="circle" icon="like" style={{ background: '#7265e6', marginRight: 5 }} size="small" /> 赞我
                </Col>
                <Col>
                  <Badge count={3} />
                </Col>
              </Row>
            }
            key="2"
          >
            <InfiniteScroll className={styles.scroll}>
              <List
                dataSource={dataSource}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar shape="circle" icon="like" style={{ background: '#7265e6', marginRight: 5 }} size="small" />}
                      title={<span>{item}</span>}
                    />
                    <span>{moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}</span>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </Panel>
          <Panel
            header={
              <Row type="flex" justify="space-between">
                <Col>
                  <Avatar shape="circle" icon="solution" style={{ background: '#ffbf00', marginRight: 5 }} size="small" /> 私信
                </Col>
                <Col>
                  <Badge count={7} />
                </Col>
              </Row>
            }
            key="3"
          >
            <InfiniteScroll className={styles.scroll}>
              <List
                dataSource={dataSource}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar shape="circle" icon="solution" style={{ background: '#ffbf00', marginRight: 5 }} size="small" />}
                      title={item}
                      onClick={this.handlePrivaceClick}
                    />
                    <Badge count={2} />
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </Panel>
        </Collapse>
        {/* 好友 关注 拉黑 */}
        <Collapse style={{ marginTop: 10 }} onChange={() => { }} expandIconPosition="right">
          <Panel
            header={
              <Row type="flex" justify="space-between">
                <Col><Avatar shape="circle" icon="user" style={{ background: '#f56a00', marginRight: 5 }} size="small" /> 好友
                </Col>
                <Col>
                  <Badge count={5} />
                </Col>
              </Row>
            }
            key="1"
          >
            <InfiniteScroll className={styles.scroll}>
              <List
                dataSource={dataSource}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar shape="circle" icon="user" style={{ background: '#f56a00', marginRight: 5 }} size="small" />}
                      title={item}
                      onClick={this.handlePrivaceClick}
                    />
                    <Badge count={2} />
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </Panel>
          <Panel
            header={
              <Row type="flex" justify="space-between">
                <Col><Avatar shape="circle" icon="heart" style={{ background: 'red', marginRight: 5 }} size="small" /> 关注
                </Col>
                <Col>
                  <Badge count={5} />
                </Col>
              </Row>
            }
            key="2"
          >
            <InfiniteScroll className={styles.scroll}>
              <List
                dataSource={dataSource}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar shape="circle" icon="heart" style={{ background: 'red', marginRight: 5 }} size="small" />}
                      title={item}
                    />
                    <Badge count={2} />
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </Panel>
          <Panel
            header={
              <Row type="flex" justify="space-between">
                <Col><Avatar shape="circle" icon="stop" style={{ background: 'black', marginRight: 5 }} size="small" /> 拉黑
                </Col>
                <Col>
                  <Badge count={5} />
                </Col>
              </Row>
            }
            key="3"
          >
            <InfiniteScroll className={styles.scroll}>
              <List
                dataSource={dataSource}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar shape="circle" icon="stop" style={{ background: 'black', marginRight: 5 }} size="small" />}
                      title={item}
                    />
                    <span>{moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}</span>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </Panel>
        </Collapse>
        <Modal
          title="评论详情"
          visible={commentVisible}
          onOk={this.handleCommentOk}
          onCancel={this.handleCommentCancel}
        >
          评论详情
        </Modal>
        <Modal
          title={`User${1}`}
          visible={messageVisible}
          onOk={this.handlePrivateOk}
          onCancel={this.handlePrivateCancel}
          footer={footer}
        >
          <Chat setContent={this.setContent} username="张家辉" socket={this.socket} />
        </Modal>

      </div>
    )
  }
}

export default MessageCenter;