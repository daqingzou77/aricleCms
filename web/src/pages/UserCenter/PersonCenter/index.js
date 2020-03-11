/* eslint-disable no-nested-ternary */
import React from 'react';
import { Card, Row, Col, Input, List, Radio, Avatar, Button, Popconfirm, message } from 'antd'
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import CustomizeEmpty from '@/components/CustomizeEmpty';
import styles from './style.less';
import BaseView from './component/BaseView';
import { currentUser } from './mock';

const { Search } = Input;

class Home extends React.Component {

  state = {
    chooseKey: 0
  }

  handleOnChange = e => {
    this.setState({
      chooseKey: e.target.value
    })
  }

  confirm = () => {
    message.success('添加成功！');
  }

  render() {
    const userList = [
      'user1',
      'user2',
      'user3',
      'user4'
    ];
    const text = '确认添加好友？';
    const friends = [];
    // for (let i = 0; i < 15; i++) {
    //   friends.push({
    //     username: `用户${i + 1}`,
    //   })
    // }
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

    const { chooseKey } = this.state;
    return (
      <div>
        <Row gutter={24}>
          <Col lg={7} md={24} style={{ paddingRight: -12, height: 818, display: 'flex', flexDirection: 'column' }}>
            <div style={{}}>
              <Card
                title={<span>个人名片</span>}
                bordered={false}
                style={{ marginBottom: 10, marginRight: 0 }}
              >
                <div className={styles.avatarHolder}>
                  <img alt="" src={currentUser.avatar} />
                  <div className={styles.name}>{currentUser.username}</div>
                  <div>{currentUser.decription}</div>
                </div>
                <div className={styles.detail}>
                  <p>
                    <MailOutlined /> <span>{currentUser.account}</span>
                    <PhoneOutlined style={{ marginLeft: 26 }} />  <span>{currentUser.telphoneNumber}</span>
                  </p>
                </div>
              </Card>
            </div>
            <div className={styles.friendlist}>
              <Card>
                <Search
                  placeholder="请输入查询好友用户名/昵称"
                  enterButton="查询"
                  style={{ marginTop: 10, paddingLeft: 10, paddingRight: 10 }}
                />
                <div style={{ width: '100%', marginTop: 10, background: '#fff' }}>
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
            <div style={{ width: '100%', background: '#fff', marginTop: 10, padding: 10, flexGrow: 1, }}>
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
                    // dataSource={userList}
                    renderItem={item => (
                      <List.Item>
                        {chooseKey === 0 ? (
                          <div>
                            <Avatar shape="circle" icon="user" style={{ background: '#f56a00', marginRight: 5 }} />
                            {item}
                          </div>
                        ) : chooseKey === 1 ? (
                          <div>
                            <Avatar shape="circle" icon="heart" style={{ background: 'red', marginRight: 5 }} />
                            {item}
                          </div>
                        ) : (
                          <div>
                            <Avatar shape="circle" icon="stop" style={{ background: 'black', marginRight: 5 }} />
                            {item}
                          </div>
                        )}
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              </CustomizeEmpty>
            </div>
          </Col>
          <Col lg={17} md={24}>
            <div
              className={styles.main}
              ref={ref => {
                if (ref) {
                  this.main = ref;
                }
              }}
            >
              <div className={styles.right}>
                <div className={styles.title}>个人信息详情</div>
                <BaseView />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home;