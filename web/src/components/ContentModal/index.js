import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import style from './styles.less';

export default class ContentModal extends React.Component {
  render() {
    const { editorState } = this.props;
    return (
      <div className={style.contentModal}>
        <Editor
          editorState={editorState}
        />
      </div>
    )
  }
}