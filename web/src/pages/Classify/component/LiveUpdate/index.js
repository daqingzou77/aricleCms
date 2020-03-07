import React from 'react';
import { Card, Spin, List, Avatar, Typography, Icon } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import htmlToDraft from 'html-to-draftjs';
import moment from 'moment';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Modal from '@/common/components/Modal';
import styles from './style.less';
import {
  downloadAnnex
} from '@/services/annexService';
import {
  getLiveUpdateFromScience,
  getLiveUpdateFromHistory,
  getLiveUpdateFromLitterateur,
  getLiveUpdateFromPhysic
} from '@/services/classifyService';


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
    if (keys === 'science') {
      this.getLiveUpdateFromScience();
    } else if (keys === 'history') {
      this.getLiveUpdateFromHistory();
    } else if (keys === 'litterateur') {
      this.getLiveUpdateFromLitterateur();
    } else if (keys === 'physics') {
      this.getLiveUpdateFromPhysic();
    }
  }

  handleLiveFresh = () => {
    this.setState({
      liveCardLoading: true
    })
    setTimeout(() => {
      const { keys } = this.props;
      if (keys === 'science') {
        this.getLiveUpdateFromScience();
      } else if (keys === 'history') {
        this.getLiveUpdateFromHistory();
      } else if (keys === 'litterateur') {
        this.getLiveUpdateFromLitterateur();
      } else if (keys === 'physics') {
        this.getLiveUpdateFromPhysic();
      }
      this.setState({
        liveCardLoading: false
      })
    }, 1000)
  }

  getLiveUpdateFromScience = () => {
    getLiveUpdateFromScience({}, ({ data }) => {
        this.setState({
          liveUpdates: data
        })
      },
      e => console.log('getLiveUpdateFromScience-error', e.toString())
      )
  }

  getLiveUpdateFromHistory = () => {
    getLiveUpdateFromHistory({}, ({ data }) => {
        this.setState({
          liveUpdates: data
        })
      },
      e => console.log('getLiveUpdateFromHistory-error', e.toString())
      )
  }

  getLiveUpdateFromLitterateur = () => {
    getLiveUpdateFromLitterateur({}, ({ data }) => {
        this.setState({
          liveUpdates: data
        })
      },
      e => console.log('getLiveUpdateFromLitterateur-error', e.toString())
      )
  }

  getLiveUpdateFromPhysic = () => {
    getLiveUpdateFromPhysic({}, ({ data }) => {
        this.setState({
          liveUpdates: data
        })
      },
      e => console.log('getLiveUpdateFromPhysic-error', e.toString())
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
        <InfiniteScroll className={styles.infiniteScroll}>
          {liveCardLoading ? (
            <Spin spinning={liveCardLoading} style={{ marginLeft: '50%', paddingTop: '50%' }} />
            ) : (
              <List
                itemLayout="vertical"
                dataSource={liveUpdates}
                renderItem={(item, index) => (
                  <List.Item key={item.author}>
                    <List.Item.Meta
                      avatar={<Avatar style={{ backgroundColor: avatarColor[index % 7] }} icon="user" />}
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
                    <div>
                      发布时间：{moment(item.passTime).format('YYYY-MM-DD hh:mm:ss')}
                    </div>
                  </List.Item>
                )}
              />
            )
          } 
        </InfiniteScroll>
        <Modal
          visible={modalVisible}
          title="内容详情"
          onCancel={() => this.setState({ modalVisible: false, editorState: '' })}
          onOk={() => this.setState({ modalVisible: false, editorState: '' })}
        >
          <Editor
            editorState={editorState}
          />
        </Modal>
      </Card>   
    )  
  }
}