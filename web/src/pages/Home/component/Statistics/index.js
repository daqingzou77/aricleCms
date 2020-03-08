import React from 'react';
import DataBlock from '@/components/DataBlock';
import styles from './style.less';

export default class Statistics extends React.Component {
  render() {
    return (
      <div className={styles.statistics}>
        <DataBlock
          color="#CC00CC"
          color2='#fda33a'
          count={11}
          tip="文章发布"
          icon="column-height"
        />
        <DataBlock
          color="#660033"
          color2='#FF0066'
          count={12}
          tip="文章点赞"
          icon="area-chart"
        />
        <DataBlock
          color="#330033"
          color2='#fda33a'
          count={11}
          tip="文章评论"
          icon="column-height"
        />
        <DataBlock
          color="#FF00FF"
          color2="#7c69ff"
          count={11}
          tip="文章收藏"
          icon="block"
        />
        <DataBlock
          color="#FF0000"
          color2="#029cf5"
          count={11}
          tip="文章拉黑"
          icon="block"
        />
      </div>
    )
  }
}