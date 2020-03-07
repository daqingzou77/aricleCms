import React from 'react';
import { Card, Spin, List, Icon, Typography } from 'antd';
import {
  getHotRecommandFromScience,
  getHotRecommandFromHistory,
  getHotRecommandFromLitterateur,
  getHotRecommandFromPhysic,
} from '@/services/classifyService'
import styles from './style.less';


const { Text } = Typography;
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} />{text}
  </span>
);
  
export default class Recommend extends React.Component {

    state = {
      hotLoading: false,
      hotArticles: [],
    }
    
    componentDidMount() {
      const { keys } = this.props;
      if (keys === 'science') {
        this.getHotRecommandFromScience();
      } else if (keys === 'history') {
        this.getHotRecommandFromHistory();
      } else if (keys === 'litterateur') {
        this.getHotRecommandFromLitterateur();
      } else {
        this.getHotRecommandFromPhysic();
      }
    }

    getHotRecommandFromScience = () => {
      getHotRecommandFromScience({}, ({ data }) => {
        this.setState({
          hotArticles: data
        })
      },
      e => console.log('getHotRecommandFromScience-error', e.toString())
      )
    }

    getHotRecommandFromHistory = () => {
      getHotRecommandFromHistory({}, ({ data }) => {
        this.setState({
          hotArticles: data
        })
      },
      e => console.log('getHotRecommandFromHistory-error', e.toString())
      )
    }

    getHotRecommandFromLitterateur = () => {
        getHotRecommandFromLitterateur({}, ({ data }) => {
        this.setState({
          hotArticles: data
        })
      },
      e => console.log('getHotRecommandFromLitterateur-error', e.toString())
      )
    }

    getHotRecommandFromPhysic = () => {
      getHotRecommandFromPhysic({}, ({ data }) => {
        this.setState({
          hotArticles: data
        })
      },
      e => console.log('getHotRecommandFromPhysic-error', e.toString())
      )
    }

    handleFreshHot = () => {
      this.setState({
        hotLoading: true
      })
      setTimeout(() => {
        this.getHotRecommandFromScience();
        this.setState({
          hotLoading: false
        })
        }, 1000)
    }

    render() {
      const { hotLoading, hotArticles } = this.state;
      return (
        <Card
          title={<span style={{ fontWeight: 'bold' }}>热门推荐</span>}
          bodyStyle={{ height: 608 }}
          extra={
            <span 
              className={styles.refresh} 
              onClick={this.handleFreshHot}
            >
              <Icon type='reload' /> 换一换
            </span>}
        >
          {
             hotLoading ? (
               <Spin spinning={hotLoading} style={{ marginLeft: '50%', paddingTop: '50%' }} />
             ) : (
               <List
                 itemLayout="vertical"
                 dataSource={hotArticles}
                 renderItem={item => (
                   <List.Item
                     key={item.articlename}
                     actions={[
                       <IconText type="star-o" text={item.favorites} key="list-vertical-star-o" />,
                       <IconText type="like-o" text={item.likes} key="list-vertical-like-o" />,
                       <IconText type="dislike" text={item.dislikes} key="list-vertical-dislike" />,
                       <IconText type="message" text={item.messages} key="list-vertical-message" />,
                    ]}
                   >
                     <List.Item.Meta
                       avatar={<img src={item.articleImgSrc} alt="文章图片" width={120} height={120} />}
                       title={<Text strong><a href={item.href}>{item.articlename}</a></Text>}
                       description={item.description}
                     />
                   </List.Item>
                )}
               />
            )
        }
        </Card>
       ) 
    }
}