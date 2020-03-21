import React from 'react';
import { List, Avatar, message, Collapse, Row, Col, Badge, Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';
import ContentModal from '@/components/ContentModal';
import Modal from '@/components/Modal';
import styles from '../style.less';
import {
  getFriendUpdates
} from '@/services/messageService';
import {
  downloadAnnex
} from '@/services/annexService';

const { Text } = Typography
const { Panel } = Collapse;

export default class Attention extends React.Component {

  state = {
    currentUser: '',
    dataSource: [],
    editorState: '',
    modalVisible: false,
  }

  componentWillMount() {
    const currentUser = localStorage.getItem('currentUser');
    this.setState({
      currentUser
    })
  }

  componentDidMount() {
    const { currentUser } = this.state;
    this.getFriendUpdates(currentUser);
  }

  getFriendUpdates = name => {
    getFriendUpdates({
      username: name
    }, ({ data }) => {
      console.log('data', data);
      this.setState({
        dataSource: data
      })
    },
      e => console.log('getFriendUpdates-error', e.toString())
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
    const { dataSource, editorState, modalVisible } = this.state;
    const { count } = this.props;
    return (
      <Collapse expandIconPosition="right">
        <Panel
          header={
            <Row type="flex" justify="space-between">
              <Col>
                <Avatar shape="circle" icon="heart" style={{ background: 'red', marginRight: 5 }} size="small" /> 好友动态
              </Col>
              <Col>
                <Badge count={count} />
              </Col>
            </Row>
          }
          key="4"
        >
          <InfiniteScroll 
            className={styles.scroll}
            hasMore={false}
            loadMore={()=>{}}
          >
            <List
              itemLayout="horizontal"
              dataSource={dataSource}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} style={{ backgroundColor: 'red' }} icon="user" />}
                    title={<Text style={{ marginLeft: 10 }}>{item.friend}</Text>}
                    description={
                      <span>
                        <a
                          onClick={() => this.handleClick(item.annexname, item.form, item.content)}
                        >
                          {item.form === 0 ? `发表文章--《${item.articlename}》` : `上传文件--${item.annexname}`}
                        </a>
                      </span>
                    }
                  />
                  <span>
                    {moment(item.time).fromNow()}
                  </span>
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
            <ContentModal editorState={editorState} />
          </Modal>
        </Panel>
      </Collapse>
    )
  }
}