import React from 'react';

export default TagSelect extends React.Component {
  render() {
    return (
        <div className={cls} style={style}>
        {hideCheckAll ? null : (
          <CheckableTag checked={checkedAll} key="tag-select-__all__" onChange={this.onSelectAll}>
            {selectAllText}
          </CheckableTag>
        )}
        {value &&
          children &&
          React.Children.map(children, (child: React.ReactElement<TagSelectOption>) => {
            if (this.isTagSelectOption(child)) {
              return React.cloneElement(child, {
                key: `tag-select-${child.props.value}`,
                value: child.props.value,
                checked: value.indexOf(child.props.value) > -1,
                onChange: this.handleTagChange,
              });
            }
            return child;
          })}
        {expandable && (
          <a className={styles.trigger} onClick={this.handleExpand}>
            {expand ? (
              <>
                {collapseText} <UpOutlined />
              </>
            ) : (
              <>
                {expandText}
                <DownOutlined />
              </>
            )}
          </a>
        )}
      </div>
    )
  }
}