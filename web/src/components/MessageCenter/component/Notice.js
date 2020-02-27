import React from 'react'
import { List, Avatar } from 'antd'
import InfiniteScroller from 'react-infinite-scroller';

class Notice extends React.Component {
    
  render() {
    const dataSource = [
        {
          title: 'Ant Design Title 1',
        },
        {
          title: 'Ant Design Title 2',
        },
        {
          title: 'Ant Design Title 3',
        },
        {
          title: 'Ant Design Title 4',
        },
      ];
    return (
      <div>
        <InfiniteScroller>
          <List
            dataSource={dataSource}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </InfiniteScroller>
      </div>
    )
  }
}

export default Notice;