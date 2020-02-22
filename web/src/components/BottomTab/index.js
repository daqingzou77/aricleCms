import React, {Component} from 'react';
import {Tabs as ATabs} from 'antd';
import styles from './index.less';

class Tabs extends Component {
  render() {
    const {children, ...rest} = this.props;
    return (
      <div className={styles.container}>
        <ATabs tabPosition="bottom" {...rest} type="card">{children}</ATabs>
      </div>
    )
  }
}

Tabs.TabPane = ATabs.TabPane;
export default Tabs;
