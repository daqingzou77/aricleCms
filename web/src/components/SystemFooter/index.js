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
        ©daqingzou77
      </div>
    );
  }
}
