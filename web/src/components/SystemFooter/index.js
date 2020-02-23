import React from 'react';

import styles from './index.less';

export default class SystemFooter extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={styles.footer}>
        ©版权所有：桂林电子科技大学&nbsp;&nbsp;&nbsp;地址：中国广西桂林金鸡路1号
      </div>
    );
  }
}
