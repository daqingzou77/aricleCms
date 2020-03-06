import React, { Fragment } from 'react';
import { Button, Form, Card, Row, Col, Icon, List, Typography, Empty, Avatar, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import QueryBar from '@/components/QueryBar';
import FormElement from '@/components/FormElement';
import FormRow from '@/components/FormRow';
import Table from '../component/Table';
import styles from './style.less';
import {
  getArticleByMutiKeys,
  getHotRecommandFromScience,
  getLiveUpdateFromScience,
  getScienceTips
} from '@/services/classifyService'
// import {
//   hotArticles,
//   dailyUpdate,
//   avatarColor,
//   scienceTips
// } from './mock';

const { Text } = Typography;


class Science extends React.Component {

  id = 0;

  state = {
    collapsed: true,
    dataSource: [],
    loading: false,
    hotArticles: [],
    // dailyUpdate: [],
    // avatarColor: [],
    scienceTips: []

  }

  componentDidMount() {
    this.getHotRecommandFromScience();
    // this.getLiveUpdateFromScience();
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
    const { collapsed, dataSource, loading, hotArticles, dailyUpdate, scienceTips } = this.state;
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
              extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='reload' />&nbsp;换一换</div>}
            >
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
            </Card>
          </Col>
          <Col span={8} style={{ paddingRight: 0 }}>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>实时更新</span>}
              extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='reload' />&nbsp;刷新</div>}
            >
              <InfiniteScroll className={styles.infiniteScroll}>
                <List
                  itemLayout="vertical"
                  dataSource={dailyUpdate}
                  renderItem={(item, index) => (
                    <List.Item key={item.author}>
                      <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: avatarColor[index] }} icon="user" />}
                        title={<Text strong>作者-{item.author}</Text>}
                        description={item.updateContent}
                      />
                      <div style={{ float: 'right', marginTop: '-3%' }}>发布时间：{moment(item.updateTime).format('YYYY-MM-DD hh:mm:ss')}</div>
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              bodyStyle={{ height: 608 }}
              title={<span style={{ fontWeight: 'bold' }}>科学小知识</span>}
              extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='reload' />&nbsp;换一换</div>}
            >
              <List
                dataSource={scienceTips}
                renderItem={item => (
                  <List.Item>
                    <Typography.Text mark>[ITEM]</Typography.Text> {item}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Form.create({ name: 'science' })(Science);