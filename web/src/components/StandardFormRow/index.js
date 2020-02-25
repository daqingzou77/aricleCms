import React from 'react';
import styles from './style.less';

  class StandardFormRow extends React.Component {
    render() {
        const { rest, title, children } = this.props;
        return (
          <div className={styles.standardFormRow} {...rest}>
            {title && (
            <div className={styles.label}>
              <span>{title}</span>
            </div>
            )}
            <div className={styles.content}>{children}</div>
          </div>
        );
    }
  }
 
export default StandardFormRow;
