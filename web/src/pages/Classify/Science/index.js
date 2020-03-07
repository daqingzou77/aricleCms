import React, { Fragment } from 'react';
import { Button, Form, Card, Row, Col, Icon, List, Typography, Avatar, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import QueryBar from '@/components/QueryBar';
import FormElement from '@/components/FormElement';
import FormRow from '@/components/FormRow';
import Table from '../component/Table';
import Modal from '@/common/components/Modal';
import styles from './style.less';
import {
  getArticleByMutiKeys,
  getHotRecommandFromScience,
  getLiveUpdateFromScience,
  getScienceTips
} from '@/services/classifyService';
import {
  downloadAnnex
} from '@/services/annexService';
// import {
//   hotArticles,
//   dailyUpdate,
//   avatarColor,
//   scienceTips
// } from './mock';

const { Text } = Typography;
const avatarColor = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#f32432', '#2322d1', "#fff146"];


class Science extends React.Component {

  id = 0;

  state = {
    collapsed: true,
    dataSource: [],
    loading: false,
    hotArticles: [],
    dailyScience: [],
    scienceTips: [],
    visible: false,
    answer: '',
    modalVisible: false,
    editorState: '',
    hotLoading: false,
    liveCardLoading: false,
    scienTipsLoading: false
  }

  componentDidMount() {
    this.getHotRecommandFromScience();
    this.getLiveUpdateFromScience();
    this.getScienceTips();
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

  getLiveUpdateFromScience = () => {
    getLiveUpdateFromScience({}, ({ data }) => {
      this.setState({
        dailyScience: data
      })
    },
      e => console.log('getHotRecommandFromScience-error', e.toString())
    )
  }

  getScienceTips = () => {
    getScienceTips({}, ({ data }) => {
      this.setState({
        scienceTips: data
      })
    },
      e => console.log('getScienceTips-error', e.toString())
    )
  }


  handleOnRemove = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 0) {
      return;
    };
    form.setFieldsValue({
      keys: keys.slice(1),
    });
  };

  handleOnAdd = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(this.id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleOnQuery = () => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        const { keyword1, keys, ...otherKeywords } = values
        const queryKeywords = [keyword1];
        for (let obj in otherKeywords) {
          queryKeywords.push(otherKeywords[obj]);
        }
        setTimeout(() => {
          this.getArticleByMutiKeys(queryKeywords);
        }, 1000)
      }
    });
  }

  handleOnCollapseChange = collapsed => {
    const { form } = this.props;
    this.id = 0;
    this.setState({
      collapsed
    });
    form.setFieldsValue({
      keys: [],
    });
  }

  handleReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      dataSource: [],
      collapsed: true,
    })
  }

  handleShowTips = content => {
    this.setState({
      visible: true,
      answer: content
    })
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

  handleLiveFresh = () => {
    this.setState({
      liveCardLoading: true
    })
    setTimeout(() => {
      this.getLiveUpdateFromScience();
      this.setState({
        liveCardLoading: false
      })
    }, 1000)
  }

  handleTipFresh = () => {
    this.setState({
      scienTipsLoading: true
    })
    setTimeout(() => {
      this.getScienceTips();
      this.setState({
        scienTipsLoading: false
      })
    }, 1000)
  }


  getArticleByMutiKeys = queryKeywords => {
    getArticleByMutiKeys({
      queryKeywords
    }, ({ data }) => {
      console.log('getArticleByMutiKeys-data', data);
      this.setState({
        dataSource: data,
        loading: false
      })
    },
      e => console.log('getArticleByMutiKeys-error', e.toString())
    )
  }

  render() {
    const { collapsed, dataSource, loading, hotArticles,
      dailyScience, scienceTips, visible, answer,
      modalVisible, editorState, hotLoading, liveCardLoading, scienTipsLoading } = this.state;
    const { form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formElementProps = {
      form,
      width: 300,
      style: { paddingLeft: 16 },
    };
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} />{text}
      </span>
    );

    const formItems = keys.map((value, index) => (
      <div>
        <FormElement
          key={`keywords${7 + index}`}
          {...formElementProps}
          label={`关键词${7 + index}`}
          field={`keyword${7 + index}`}
        />
      </div>
    ))
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Row gutter={24}>
          <Col>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>多关键词检索</span>}
              extra={<span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={this.handleReset}><Icon type="delete" /> 重置</span>}
            >
              <QueryBar
                collapsed={collapsed}
                onCollapsedChange={collapsed => this.handleOnCollapseChange(collapsed)}
              >
                <Form onSubmit={this.handleSearch} autoComplete="off">
                  <FormRow>
                    <FormElement
                      {...formElementProps}
                      label="关键词1"
                      field="keyword1"
                      ref={node => this.nameDom = node}
                      required={true}
                    />
                    <FormElement
                      {...formElementProps}
                      label="关键词2"
                      field="keyword2"
                    />
                    <FormElement
                      {...formElementProps}
                      label="关键词3"
                      field="keyword3"
                    />
                    {collapsed ? null : (
                      <Fragment>
                        <FormElement
                          {...formElementProps}
                          label="关键词4"
                          field="keyword4"
                        />
                        <FormElement
                          {...formElementProps}
                          label="关键词5"
                          field="keyword5"
                        />
                        <FormElement
                          {...formElementProps}
                          label="关键词6"
                          field="keyword6"
                        />
                      </Fragment>
                    )}
                    {formItems}
                    {collapsed ? null : (
                      <div>
                        <FormElement>
                          <Button
                            type="dashed"
                            icon="plus-circle"
                            style={{ marginLeft: 15 }}
                            onClick={this.handleOnAdd}
                          >
                            添加
                          </Button>
                          <Button
                            type="danger"
                            icon="minus-circle"
                            style={{ marginLeft: 20, display: keys.length > 0 ? 'inline' : 'none' }}
                            onClick={() => this.handleOnRemove()}
                          >
                            删除
                          </Button>
                        </FormElement>
                      </div>)}
                    <FormElement>
                      <Button
                        type="primary"
                        icon="search"
                        style={{ marginLeft: 20 }}
                        onClick={this.handleOnQuery}
                      >
                        查询
                      </Button>
                    </FormElement>
                  </FormRow>
                </Form>
              </QueryBar>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: 10 }}>
          <Col>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>查询结果</span>}
            >
              <Table
                loading={loading}
                dataSource={dataSource}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: 10 }}>
          <Col span={8} style={{ paddingRight: 0 }}>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>热门推荐</span>}
              bodyStyle={{ height: 608 }}
              extra={<div style={{ color: '#2884D8', cursor: 'pointer' }} onClick={this.handleFreshHot}><Icon type='reload' />&nbsp;换一换</div>}
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
          </Col>
          <Col span={8} style={{ paddingRight: 0 }}>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>实时更新</span>}
              extra={<div style={{ color: '#2884D8', cursor: 'pointer' }} onClick={this.handleLiveFresh}><Icon type='reload' />&nbsp;刷新</div>}
            >
              <InfiniteScroll className={styles.infiniteScroll}>
                {liveCardLoading ? (
                  <Spin spinning={liveCardLoading} style={{ marginLeft: '50%', paddingTop: '50%' }} />
                ) : (
                  <List
                    itemLayout="vertical"
                    dataSource={dailyScience}
                    renderItem={(item, index) => (
                      <List.Item key={item.author}>
                        <List.Item.Meta
                          avatar={<Avatar style={{ backgroundColor: avatarColor[index % 7] }} icon="user" />}
                          title={<Text strong>作者-{item.author}</Text>}
                          description={
                            <span><a onClick={() => this.handleClick(item.annexname, item.articleForm, item.articleContent)}>{item.articleForm === 0 ? `发表文章--《${item.articlename}》` : `上传文件--${item.annexname}`}</a></span>
                          }
                        />
                        <div style={{ float: 'right', marginTop: '-3%' }}>发布时间：{moment(item.passTime).format('YYYY-MM-DD hh:mm:ss')}</div>
                      </List.Item>
                      )}
                  />
                  )
                }
              </InfiniteScroll>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              bodyStyle={{ height: 608 }}
              title={<span style={{ fontWeight: 'bold' }}>科学小知识</span>}
              extra={<div style={{ color: '#2884D8', cursor: 'pointer' }} onClick={this.handleTipFresh}><Icon type='reload' />&nbsp;换一换</div>}
            >
              {scienTipsLoading ? (
                <Spin spinning={scienTipsLoading} style={{ marginLeft: '50%', paddingTop: '50%' }} />
              ) : (
                <List
                  dataSource={scienceTips}
                  renderItem={item => (
                    <List.Item>
                      <Typography.Text mark>Qu.</Typography.Text>
                      <span style={{ cursor: 'pointer' }} onClick={() => this.handleShowTips(item.answer)}>{item.question}</span>
                    </List.Item>
                  )}
                />
              )
              }
            </Card>
          </Col>
          <Modal
            title="问题解答"
            visible={visible}
            width={300}
            onOk={() => this.setState({ visible: false, answer: '' })}
            onCancel={() => this.setState({ visible: false, answer: '' })}
          >
            <div style={{ padding: 5, textIndent: '2em' }}>{answer}</div>
          </Modal>
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
        </Row>
      </div>
    )
  }
}

export default Form.create({ name: 'science' })(Science);