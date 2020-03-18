import React from 'react';
import { Collapse, Row, Col, Avatar, Badge, List, message, Popconfirm } from 'antd';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import Modal from '@/common/components/Modal';
import styles from '../style.less';
import {
  deltetMessage
} from '@/services/messageService';

const { Panel } = Collapse;

export default class Message extends React.Component {
  state = {
    dataSource: []
  }

  deltetMessage = name => {
    const { getNewMessageCounts } = this.props;
    const currentUser = localStorage.getItem('currentUser');
    deltetMessage({
      username: currentUser,
      targetUser: name
    }, ({ data }) => {
      if (data.status) {
        message.success('消息清理成功');
        getNewMessageCounts();
      } else {
        message.error('消息清理失败');
      }
    },
    e => console.log('deltetMessage-error', e.toString())
    )
  }


  render() {
    const { dataSource } = this.state;
    const { messageArray } = this.props;
    const text = "是否确认清空？"
    let count = 0;
    messageArray.map(item => {
      count += item.count;
    })
    return (
      <Collapse expandIconPosition="right">
        <Panel
          header={
            <Row type="flex" justify="space-between">
              <Col>
                <Avatar shape="circle" icon="solution" style={{ background: '#ffbf00', marginRight: 5 }} size="small" /> 聊天
              </Col>
              <Col>
                <Badge count={count} />
              </Col>
            </Row>
          }
          key="2"
        >
          <InfiniteScroll className={styles.scroll}>
            <List
              dataSource={messageArray}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a>聊天</a>,
                    <Popconfirm placement="top" title={text} onConfirm={() => this.deltetMessage(item.friend)} okText="确认" cancelText="取消">
                      <a>清空</a>
                    </Popconfirm>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar shape="circle" icon="solution" style={{ background: '#ffbf00', marginRight: 5 }} size="small" />}
                    title={item.friend}
                  // onClick={this.handlePrivaceClick}
                  />
                  <Badge count={item.count} />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </Panel>
      </Collapse>
    )
  }
}