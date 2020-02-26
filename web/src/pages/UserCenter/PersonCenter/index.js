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
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }}>
              <div>
                <div className={styles.avatarHolder}>
                  <img alt="" src={currentUser.avatar} />
                  <div className={styles.name}>{currentUser.name}</div>
                  <div>{currentUser.signature}</div>
                </div>
                <div className={styles.detail}>
                  <p>
                    <Icon type="cloud-upload"  />
                    <div>已上传<span style={{ fontWeight: 'bold', fontSize: 14 }}>{currentUser.uploadedItems}</span>条农事记录</div>
                  </p>
                  <p>
                    <Icon type="phone" />
                    {currentUser.phone}
                  </p>
                  <p>
                    <Icon type="mail" />
                    {currentUser.email}
                  </p>
                  <p>
                    <Icon type="bank" />
                    {currentUser.address}
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
                {this.renderChildren()}
              </div>
            </div>
          </Col>
        </Row>     
      </>
    )
  }
}

export default Home;