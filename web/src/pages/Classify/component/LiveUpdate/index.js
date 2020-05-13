/* eslint-disable default-case */
import React from 'react';
import { Card, Spin, List, Avatar, Typography, Icon } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';
import moment from 'moment';
import Modal from '@/components/Modal';
import ContentModal from '@/components/ContentModal';
import {
  downloadAnnex
} from '@/services/annexService';
import {
  getLiveUpdates
} from '@/services/classifyService';
import styles from './style.less';


const { Text } = Typography;
const avatarColor = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#f32432', '#2322d1', "#fff146"];

export default class LiveUpdate extends React.Component {
  
  state = {
    liveCardLoading: false,
    liveUpdates: [],
    modalVisible: false,
    editorState: ''
  }  

  componentDidMount() {
    const { keys } = this.props;
    this.getLiveUpdates(keys);
  }

  handleLiveFresh = () => {
    this.setState({
      liveCardLoading: true
    })
    setTimeout(() => {
      const { keys } = this.props;
      this.getLiveUpdates(keys)
      this.setState({
        liveCardLoading: false
      })
    }, 1000)
  }

  getLiveUpdates = key => {
    let articleType;
    switch (key) {
      case 'science': articleType = 0;break;
      case 'history': articleType = 1;break;
      case 'litterateur': articleType = 2;break;
      case 'physics': articleType = 3;break;
    }
    getLiveUpdates({
      articleType
    }, ({ data }) => {
      this.setState({
        liveUpdates: data
      })
    },
    e => console.log('getLiveUpdates-error', e.toString())
    )
  }

  handleClick = (name, articleForm, articleContent) => {
    if (articleForm === 0) {
      const contentBlock = htmlToDraft(articleContent);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        modalVisible: true,
        editorState
      })
    } else {
      downloadAnnex(name)
    }
  }


  render() {
    const { liveCardLoading, liveUpdates, modalVisible, editorState  } = this.state;
    return (
      <Card
        title={<span style={{ fontWeight: 'bold' }}>实时更新</span>}
        extra={
          <span
            className={styles.refresh}
            onClick={this.handleLiveFresh}
          >
            <Icon type='reload' /> 刷新
          </span>}
      >
        <InfiniteScroll 
          className={styles.infiniteScroll}
          hasMore={false}
          loadMore={()=>{}}  
        >
          {liveCardLoading ? (
            <Spin spinning={liveCardLoading} style={{ marginLeft: '50%', paddingTop: '50%' }} />
            ) : (
              <List
                itemLayout="vertical"
                dataSource={liveUpdates}
                renderItem={(item, index) => (
                  <List.Item key={item.author}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} style={{ backgroundColor: avatarColor[index % 7] }} icon="user" />}
                      title={<Text strong>作者-{item.author}</Text>}

                      description={
                        <span>
                          <a 
                            onClick={() => this.handleClick(item.annexname, item.articleForm, item.articleContent)}
                          >
                            {item.articleForm === 0 ? `发表文章--《${item.articlename}》` : `上传文件--${item.annexname}`}
                          </a>
                        </span>
                      }
                    />
                    <div style={{ float: 'right', marginTop: '-3%' }}>
                      发布时间：{moment(item.passTime).format('YYYY-MM-DD hh:mm:ss')}
                    </div>
                  </List.Item>
                )}
              />
            )
          } 
        </InfiniteScroll>
        <Modal
          width={400}
          visible={modalVisible}
          title="内容详情"
          onCancel={() => this.setState({ modalVisible: false, editorState: '' })}
          onOk={() => this.setState({ modalVisible: false, editorState: '' })}
        >
          <ContentModal editorState={editorState} />
        </Modal>
      </Card>   
    )  
  }
}