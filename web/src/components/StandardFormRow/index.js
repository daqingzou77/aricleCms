import React from 'react';
import styles from './style.less';

// interface StandardFormRowProps {
//   title?: string;
//   last?: boolean;
//   block?: boolean;
//   grid?: boolean;
//   style?: React.CSSProperties;
// }

// const StandardFormRow: React.FC<StandardFormRowProps> = ({
//   title,
//   children,
//   last,
//   block,
//   grid,
//   ...rest
// }) => {
//   const cls = classNames(styles.standardFormRow, {
//     [styles.standardFormRowBlock]: block,
//     [styles.standardFormRowLast]: last,
//     [styles.standardFormRowGrid]: grid,
//   });

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