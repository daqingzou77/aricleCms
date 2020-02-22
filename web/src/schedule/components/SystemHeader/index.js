import { PureComponent } from "react";

import styles from './index.less';

export default class SystemHeader extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <>
        <div className={styles.header}>
          {/* 头部标题 */}
          <div className={styles.title}>
            脉间分析模块软件
          </div>
        </div>
      </>
    )
  }
}
