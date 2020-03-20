import React from 'react';
import { Tag, Input, Icon } from 'antd';
import FormElement from '@/components/FormElement';
import {
  getArticleByMutiKeys
} from '@/services/classifyService';
import styles from './style.less';

class LitterateurSearch extends React.Component {

  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
  };

  handleOnQuery = () => {
    const { tags } = this.state;
    getArticleByMutiKeys({
      queryKeywords: tags,
      articleType: 2
    }, ({ data }) => {
      this.props.handleOnSave(data)
    },
      e => console.log('getArticleByMutiKeys-error', e.toString())
    )
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleClose = removedTag => {
    const { tags } = this.state;
    const tagList = tags.filter(tag => tag !== removedTag);
    this.setState({ tags: tagList });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

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
      </FormElement>);

    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>);
  };



  render() {
    const { inputVisible, inputValue, tags } = this.state;
    const { clearTags, restartTags } = this.props;
    if (clearTags) {
      tags.splice(0, tags.length);
      restartTags()
    }
    const tagChild = tags.map(this.forMap);
    return (
      <div className={styles.litterateurSearch}>
        {tagChild}
        {!inputVisible && (
          <span style={{ display: 'inline-block' }}>
            <FormElement>
              <Tag onClick={this.showInput} style={{ color: 'black', borderStyle: 'dashed' }}>
                <Icon type="plus" /> 输入关键词
              </Tag>
            </FormElement>
          </span>
        )}
        {!inputVisible && (
          <span style={{ display: 'inline-block' }} onClick={this.handleOnQuery}>
            <FormElement>
              <Tag style={{ color: 'black' }}>
                <Icon type="search" /> 查询
              </Tag>
            </FormElement>
          </span>
        )}
        {inputVisible && (
          <Input
            ref={input => this.input = input}
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
    )
  }

}

export default LitterateurSearch;