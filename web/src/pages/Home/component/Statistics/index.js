import React from 'react';
import DataBlock from '@/components/DataBlock';
import styles from './style.less';
import {
  getStatics
} from '@/services/homeService';

export default class Statistics extends React.Component {
  state = {
    statistic: {
      release: 0,
      likes: 0,
      dislikes: 0,
      favorites: 0,
      comments: 0,
    }
  }

  componentDidMount() {
    this.getStatics();
  }

  getStatics = () => {
    getStatics({}, ({ data }) => {
      this.setState({
        statistic: data
      })
    },
      e => console.log('getStatics-error', e.toString())
    )
  }

  render() {
    const { statistic } = this.state;
    const { release, likes, dislikes, favorites, comments } = statistic;
    return (
      <div className={styles.statistics}>
        <DataBlock
          color="#CC00CC"
          color2='#fda33a'
          count={release}
          tip="文章发布"
          icon="bell"
        />
        <DataBlock
          color="#660033"
          color2='#FF0066'
          count={likes}
          tip="文章点赞"
          icon="like"
        />
        <DataBlock
          color="#FF0000"
          color2="#029cf5"
          count={comments}
          tip="文章评论"
          icon="message"
        />
        <DataBlock
          color="#FF00FF"
          color2="#7c69ff"
          count={favorites}
          tip="文章收藏"
          icon="star"
        />
        <DataBlock
          color="#330033"
          color2='#fda33a'
          count={dislikes}
          tip="文章拉黑"
          icon="dislike"
        />
      </div>
    )
  }
}