import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import styles from './index.less';

class FlexFormItem extends React.PureComponent {
  static propTypes = {
    labelAlign: PropTypes.string, // 标签对齐方式
    labelText: PropTypes.string, // 标签文字
    style: PropTypes.object,
    labelWidth: PropTypes.number || PropTypes.undefined,
    required: PropTypes.bool,
  };

  static defaultProps = {
    labelAlign: 'right',
    labelText: '输入框',
    style: {},
    labelWidth: undefined,
    required: true,
  };

  render() {
    const { labelAlign, labelText, style, labelWidth, children, required } = this.props;
    return (
      <div style={style} className={styles['flex-form-item']}>
        <div
          className={[styles.label, required ? styles['label-required'] : ''].join(' ')}
          style={{ textAlign: labelAlign, width: labelWidth }}
        >
          {`${labelText}:`}
        </div>
        <div className={styles.item}>
          <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
            {children}
          </Form.Item>
        </div>
      </div>
    );
  }
}

export default FlexFormItem;
