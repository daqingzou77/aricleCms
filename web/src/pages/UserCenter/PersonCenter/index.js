/* eslint-disable no-nested-ternary */
import React from 'react';
import { Row, Col } from 'antd'
import PersonalCard from './component/PersonalCard';
import FindFriends from './component/FindFriends';
import FriendsList from './component/FriendsList';
import BaseView from './component/BaseView';
import {
  getCurrentUserDetail
} from '@/services/userService';
import styles from './style.less';

class Home extends React.Component {

  state = {
    currentUser: {}
  }

  componentDidMount() {
    this.getCurrentUserDetail()
  }

  getCurrentUserDetail = () => {
   const username = '古天乐';
   getCurrentUserDetail({
     username
   }, ({ data }) => {
     this.setState({
       currentUser: data
     })
   },
   e => console.log('getCurrentUserDetail-error', e.toString())
   )
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <Row gutter={24}>
          <Col lg={7} md={24} style={{ paddingRight: -12, height: 818, display: 'flex', flexDirection: 'column' }}>
            {/* 个人名片 */}
            <PersonalCard currentUser={currentUser} />
            {/* 查询好友 */}
            <FindFriends />
            {/* 列表信息 */}
            <FriendsList />
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
                <BaseView getCurrentUserDetail={this.getCurrentUserDetail} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home;