import React from 'react';
import ContentEditable from 'react-contenteditable';
import styles from './style.less';

class Send extends React.Component {

  constructor() {
    super()
    this.contentEditable = React.createRef();
    this.state = {
      html: ""
    };
  };

  handleChange = evt => {
    this.setState({
      html: evt.target.value
    });
  };

  render() {
    const { html } = this.state;
    return (
      <div className={styles.send}>
        <ContentEditable
          className={styles.edit}
          innerRef={this.contentEditable}
          html={html}
          disabled={false}
          onChange={this.handleChange}
          tagName='article'
        />
      </div>
    )
  }
}

export default Send;