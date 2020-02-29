import React from 'react';
import { Button, Form, Card, Row, Col, Icon, List, Typography, Empty, Avatar, Input } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import styles from './style.less';
import FormElement from '@/components/FormElement';
import FormRow from '@/components/FormRow';
import {
  hotArticles,
  dailyUpdate,
  avatarColor,
  scienceTips,
} from './mock';

const { Text } = Typography;


class Health extends React.Component {

  defaultArray = [1];

  state = {
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

  render() {
    const { form } = this.props;
    const { positionDynamicListState } = this.state;
    const formElementProps = {
      form,
      width: 300,
      style: { paddingLeft: 16 },
    };
    const dataLayout = this.defaultArray.map((item, index) => {
      return (
        <div key={index} className={styles.border}>
          <div className={styles.title}>{`关键词组${index + 1}`}</div>
          <FormRow>
            <FormElement
              label="keyword1"
              {...formElementProps}
              field="keyword1"
            />
            <FormElement
              label="keyword2"
              {...formElementProps}
              field="keyword2"
            />
            <FormElement
              label="keyword3"
              {...formElementProps}
              field="keyword3"
            />
            <FormElement
              label="keyword4"
              {...formElementProps}
              field="keyword4"
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
              extra={<span style={{ fontWeight: 'bold', cursor: 'pointer' }}><Icon type="delete" /> 重置</span>}
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
              <Empty />
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
              title={<span style={{ fontWeight: 'bold' }}>体育小常识</span>}
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

export default Form.create({ name: 'Health' })(Health);