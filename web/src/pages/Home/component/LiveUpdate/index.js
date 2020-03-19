import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Card, List, Avatar, Typography, Icon } from 'antd';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import moment from 'moment';
import Modal from '@/common/components/Modal';
import styles from './style.less';
import {
  getAuthorUpdate
} from '@/services/homeService';
import {
  downloadAnnex
} from '@/services/annexService';

const { Text } = Typography;

export default class LiveUpdate extends React.Component {

  state = {
    dailyUpdate: [],
    modalVisible: false,
    editorState: ''
  }

  componentDidMount() {
    this.getAuthorUpdate();
  }

  getAuthorUpdate = () => {
    getAuthorUpdate({}, ({ data }) => {
      this.setState({
        dailyUpdate: data
      })
    }, e => console.log('getAuthorUpdate-error', e.toString()))
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
    const { dailyUpdate, modalVisible, editorState} = this.state;
    const avatarColor = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#f32432', '#2322d1', "#fff146"];
    return (
      <Card
        title={<span style={{ fontWeight: 'bold' }}>作者更新</span>}
        bodyStyle={{ height: 608 }}
        extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='reload' />&nbsp;刷新</div>}
      >
        <InfiniteScroll className={styles.infiniteScroll}>
          <List
            itemLayout="vertical"
            dataSource={dailyUpdate}
            renderItem={(item, index) => (
              <List.Item key={item.author}>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} style={{ backgroundColor: avatarColor[index] }} icon="user" />}
                  title={<Text strong>作者-{item.author}</Text>}
                  description={
                    <span>
                      <a 
                        style={{ color: '#2884D8' }}
                        onClick={() => this.handleClick(item.annexname, item.articleForm, item.articleContent)}
                      >
                        {item.articleForm === 0 ? `发表文章--《${item.articlename}》` : `上传文件--${item.annexname}`}
                      </a>
                    </span>
                  }
                />
                <div style={{ float: 'right', marginTop: '-3%' }}>发布时间：{moment(item.updateTime).format('YYYY-MM-DD hh:mm:ss')}</div>
              </List.Item>
            )}
          />
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