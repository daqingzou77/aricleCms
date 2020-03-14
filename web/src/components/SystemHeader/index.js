import React from 'react';
import { Badge } from 'antd';
import styles from './index.less';

export default class SystemHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
    };
  }

  componentDidMount() {
    // this.getUopLoginUserInfo()
  }


  render() {
    const username = localStorage.getItem('currentUser');
    const userType = localStorage.getItem('userType');
    return (
      <div className={styles.header}>
        {/* 头部标题 */}
        <span className={styles.title}>文章信息管理系统</span>
        <span className={styles.adminUser}>
          <Badge status="success" /> 当前登录：
          {username}({userType == 0 ? "普通用户" : userType == 1 ? '作者': userType == 2 ? '管理员' : null })
        </span>
        {/* <SelectLang className={styles.selectLang} /> */}
      </div>
    );
  }
}
