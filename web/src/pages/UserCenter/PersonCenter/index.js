import React from 'react';
import { Card, Row, Col, Icon } from 'antd'
import styles from './style.less';
import BaseView from './component/BaseView';
import { currentUser } from './mock';

class Home extends React.Component{
  render() {
    return(
      <>
        <Row gutter={24}>
          <Col lg={7} md={24} style={{ paddingRight: -12 }}>
            <Card bordered={false} style={{ marginBottom: 24, marginRight: 0 }}>
              <div>
                <div className={styles.avatarHolder}>
                  <img alt="" src={currentUser.avatar} />
                  <div className={styles.name}>{currentUser.username}</div>
                  <div>{currentUser.decription}</div>
                </div>
                <div className={styles.detail}>
                  <p>
                    <Icon type="phone" style={{ position: 'absolute', right: '20%' }} /> <span>wqewqe42321321</span>
                    <Icon type="mail" style={{ position: 'absolute', left: '48%' }} /><span style={{position:'absolute', left: '55%'}}> {currentUser.email}</span>
                  </p>
                  <p>
                    <Icon type="bank" style={{ position: 'absolute', right: '20%' }} />  <span>32321323fdfd</span>
                    <Icon type="mail" style={{ position: 'absolute', left: '48%' }} /><span style={{ position: 'absolute', left: '55%' }}>123213213223</span>
                  </p>
                </div>
              </div>
            </Card>
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
      </>
    )
  }
}

export default Home;