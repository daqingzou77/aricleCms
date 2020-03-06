import React from 'react';
import { Button, Form, Card, Row, Col, Icon, List, Typography, Empty, Avatar, Input } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import styles from './style.less';
import FormElement from '@/components/FormElement';
import FormRow from '@/components/FormRow';
import Table from '../component/Table';
import {
  getArticleByMutiKeys,
  getHotRecommandFromPhysic,
  getLiveUpdateFromPhysic,
  getSportSense
} from '@/services/classifyService'
// import {
//   hotArticles,
//   dailyUpdate,
//   avatarColor,
//   scienceTips,
// } from './mock';

const { Text } = Typography;


class Health extends React.Component {

  defaultArray = [1];

  state = {
    loading: false,
    dataSource: [],
    hotArticles: [],
    sportSense: []
  }
  
  componentDidMount() {
    this.getHotRecommandFromPhysic();
    this.getSportSense()
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

  getSportSense = () => {
    getSportSense({}, ({ data }) => {
      this.setState({
        sportSense: data
      })
    },
    e => console.log('getSportSense-error', e.toString())
    )

  }

  handleOnQuery = () => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        const { keyword1, ...otherKeywords } = values
        const queryKeywords = [keyword1];
        for (let obj in otherKeywords) {
          queryKeywords.push(otherKeywords[obj]);
        }
        setTimeout(() => {
          this.getArticleByMutiKeys(queryKeywords);
        }, 1000)
      } 
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

  handleAdd = () => {
    this.defaultArray.push(1);
    this.reflesh();
  };

  deleteLast = () => {
    this.defaultArray.pop();
    this.reflesh();
  };

  reflesh = () => {
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue();
  };

  handleReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      dataSource: [],
    })
  }

  render() {
    const { form } = this.props;
    const { dataSource, loading, hotArticles, sportSense } = this.state;
    const formElementProps = {
      form,
      width: 300,
      style: { paddingLeft: 16 },
    };
    const dataLayout = this.defaultArray.map((item, index) => {
      return (
        <div className={styles.border}>
          <div className={styles.title}>{`关键词组${index + 1}`}</div>
          <FormRow>
            <FormElement
              label="关键词1"
              {...formElementProps}
              field={`keyword${index*4+1}`}
              required={true}
            />
            <FormElement
              label="关键词2"
              {...formElementProps}
              field={`keyword${index*4+2}`}
            />
            <FormElement
              label="关键词3"
              {...formElementProps}
              field={`keyword${index*4+3}`}
            />
            <FormElement
              label="关键词4"
              {...formElementProps}
              field={`keyword${index*4+4}`}
            />
          </FormRow>
        </div>
      );
    });
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} />{text}
      </span>
    );

    return (
      <div>
        <Row gutter={24}>
          <Col>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>多关键词检索</span>}
              extra={<span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={this.handleReset}><Icon type="delete" /> 重置</span>}
            >
              {dataLayout}
              <div style={{ textAlign: 'center' }}>
                <Button
                  disabled={this.defaultArray.length >= 16}
                  onClick={this.handleAdd}
                  style={{ marginRight: 10 }}
                  type="dashed"
                  icon="plus-circle"
                >
                  添加
                </Button>
                <Button
                  style={{ marginRight: 10 }}
                  disabled={this.defaultArray.length <= 1}
                  onClick={this.deleteLast}
                  type="danger"
                  icon="minus-circle"
                >
                  删除最后一项
                </Button>
                <Button 
                  type='primary'
                  icon="search"
                  onClick={this.handleOnQuery}
                >
                  查询
                </Button>
              </div>

            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: 10 }}>
          <Col>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>搜索结果</span>}
            >
              <Table dataSource={dataSource} loading={loading} />
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
                  // dataSource={dailyUpdate}
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
              title={<span style={{ fontWeight: 'bold' }}>体育小常识</span>}
              extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='reload' />&nbsp;换一换</div>}
            >
              <List
                dataSource={sportSense}
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

export default Form.create({ name: 'Health' })(Health);