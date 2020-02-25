import React from 'react';
import { Tag, Input, Icon } from 'antd';
import FormElement from '@/components/FormElement';
import styles from './style.less';

class LitterateurSearch extends React.Component {

    state = {
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      inputVisible: false,
      inputValue: '',
    };

    handleClose = removedTag => {
      const tags = this.state.tags.filter(tag => tag !== removedTag);
      console.log(tags);
      this.setState({ tags });
    };

    showInput = () => {
      this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
      this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
      const { inputValue } = this.state;
      let { tags } = this.state;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      console.log(tags);
      this.setState({
        tags,
        inputVisible: false,
        inputValue: '',
      });
    };

    saveInputRef = input => (this.input = input);

    forMap = tag => {
      const tagElem = (
          <FormElement>
       <Tag
          color="#108ee9"
          closable
          onClose={e => {
          e.preventDefault();
          this.handleClose(tag);
          }}
        >
          {tag}
        </Tag>
          </FormElement>
 
        );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>);
    };

    render() {
      const { tags, inputVisible, inputValue } = this.state;
      const tagChild = tags.map(this.forMap);
      return (
        <div className={styles.litterateurSearch}>
            {tagChild}
            {!inputVisible && (
              <FormElement>
  <Tag onClick={this.showInput} style={{ color: 'black', borderStyle: 'dashed' }}>
                <Icon type="plus" /> New Tag
              </Tag>
              </FormElement>
            )}
          {inputVisible && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="large"
              style={{ width: 200 }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )}
          
        </div>
    )}

}

export default LitterateurSearch;