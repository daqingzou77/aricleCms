import React from 'react';
import { Row, Col, Badge, Avatar, List, Collapse } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import styles from './style.less';

const { Panel } = Collapse;
class MessageCenter extends React.Component {

  render() {

    const dataSource = [
      'user1',
      'user2',
      'user3',
      'user1',
      'user2',
      'user3',
    ]
    return (
      <>
        <Collapse onChange={() => { }} expandIconPosition="right">
          <Panel
            header={
              <Row type="flex" justify="space-between">
                <Col><Avatar shape="circle" icon="message" style={{ background: 'green', marginRight: 5 }} size="small" /> 评论
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
                    <Avatar shape="circle" icon="like" style={{ background: 'green', marginRight: 5 }} size="small" />
                    <span>{item}</span>
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
                bordered
                dataSource={dataSource}
                renderItem={item => (
                  <List.Item>
                    <Avatar shape="circle" icon="user" style={{ background: '#ffbf00', marginRight: 5 }} size="small" />
                    <span>{item}</span>
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
                bordered
                dataSource={dataSource}
                renderItem={item => (
                  <List.Item>
                    <Avatar shape="circle" icon="user" style={{ background: 'green', marginRight: 5 }} size="small" />
                    <span>{item}</span>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </Panel>
        </Collapse>
        {/* 好友列表 拉黑名单 */}
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
                    <Avatar shape="user" icon="like" style={{ background: 'green', marginRight: 5 }} size="small" />
                    <span>{item}</span>
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
            key="2"
          >
            <InfiniteScroll className={styles.scroll}>
              <List
                dataSource={dataSource}
                renderItem={item => (
                  <List.Item>
                    <Avatar shape="circle" icon="stop" style={{ background: 'green', marginRight: 5 }} size="small" />
                    <span>{item}</span>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </Panel>
        </Collapse>
      </>
    )
  }
}

export default MessageCenter;