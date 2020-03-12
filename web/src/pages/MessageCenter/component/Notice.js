import React from 'react'
import { List, Avatar } from 'antd'
import InfiniteScroller from 'react-infinite-scroller';
import moment from 'moment';
import styles from './style.less';

class Notice extends React.Component {
    
  render() {
    const dataSource = [
        {
          title: <p>用户1 <span>上传文章《三生三世桃花源》3432434</span></p>,
        },
        {
          title: <p>用户2 <span>上传文章《那年春日》</span></p>,
        },
        {
          title: <p>用户3 <span>上传文件《又是一年春好日》.doc</span></p>,
        },
        {
          title: <p>用户4 <span>上传文章《夏》</span></p>,
        },
      ];
    return (
      <div className={styles.notice}>
        <InfiniteScroller className={styles.scroll}>
          <List
            dataSource={dataSource}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}
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