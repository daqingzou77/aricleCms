import React from 'react';
import { Card } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from './style.less';

export default class PersonalCard extends React.Component {
  
  render() {
    const { currentUser } = this.props;
    return (
      <div>
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
              <PhoneOutlined style={{ marginLeft: 26 }} /> <span>{currentUser.telephoneNumber}</span>
            </p>
          </div>
        </Card>
      </div>
    )
   }
}