import React from 'react';
import ContentEditable from 'react-contenteditable';
import styles from './style.less';
import { message } from 'antd';

class Send extends React.Component {

  constructor() {
    super()
    this.contentEditable = React.createRef();
  };

  handleChange = evt => {
    const { setContent } = this.props;
    setContent(evt.target.value);
  };


  render() {
    const { content } = this.props;
    return (
      <div className={styles.send}>
        <ContentEditable
          className={styles.edit}
          innerRef={this.contentEditable}
          html={content}
          disabled={false}
          onChange={this.handleChange}
          tagName='article'
        />
      </div>
    )
  }
}

export default Send;