import React from 'react';
import { Tag } from 'antd';
import fakeTagList from './mock';
import styles from './style.less';

const { CheckableTag } = Tag;

export default class TagSelect extends React.Component {

  tagsFromServer = fakeTagList;

  state = {
    allChecked: true,
    selectedTags: this.tagsFromServer,
  }

  handleChange = (tag, checked) => {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    console.log('nextSelectedTags', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
    this.props.saveSelect(nextSelectedTags);
  }

  handleSelectAll = () => {
    const { selectedTags, allChecked } = this.state;
    if ( selectedTags.length === this.tagsFromServer.length) {
        this.setState({
          selectedTags: [],
          allChecked: !allChecked
        })
        this.props.saveSelect([]);
    } else {
        this.setState({
          selectedTags: this.tagsFromServer,
          allChecked: !allChecked
        })
        this.props.saveSelect(this.tagsFromServer);
    }
  }

  handleExpand = () => {
    const { expand } = this.state;
      this.setState({
      expand: !expand,
    });
  }

  render() {
    const { selectedTags, allChecked } = this.state;
    return (
      <div className={styles.tagSelect}>
        <CheckableTag checked={allChecked} onChange={this.handleSelectAll}>全选</CheckableTag>
        {this.tagsFromServer.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
    )
  }
}