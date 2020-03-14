import React from 'react';
import { Card, Spin } from 'antd';
import { MailOutlined, PhoneOutlined, ReloadOutlined } from '@ant-design/icons';
import styles from './style.less';

export default class PersonalCard extends React.Component {

  state = {
   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
  }

  refresh = () => {
    const { fresh } = this.props;
    fresh();
  }

  render() {
    const { currentUser, loading } = this.props;
    const { avatar } = this.state;
    return (
      <div>
        <Card
          title={<span>个人名片</span>}
          bordered={false}
          style={{ marginBottom: 10, marginRight: 0 }}
          extra={
            <span 
              onClick={this.refresh}
              style={{ color: '#2884D8', cursor: 'pointer' }}
            >
              <ReloadOutlined /> 刷新
            </span>}
        >
          {loading ? (
            <Spin spinning={loading} style={{ marginLeft: '50%' }} />
          ) : (
            <>
              <div className={styles.avatarHolder}>
                <img alt="用户头像" src={currentUser.avatar ? currentUser.avatar : avatar} height={140} style={{ borderRadius: '50%' }} />
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
            )}
        </Card>
      </div>
    )
  }
}