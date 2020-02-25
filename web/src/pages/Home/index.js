import React from 'react';
import { Card, Row, Col, List, Avatar, Icon, Typography } from 'antd';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import DataBlock from '@/components/DataBlock';
import style from './index.less';
import {
  avatarColor,
  list,
  listData,
  hotArticles,
  dailyUpdate,
  dailyComments
 } from './mock';

const { Paragraph, Text } = Typography;

class Home extends React.Component {

  render() {

    // 公共组件
    const Atext = ({ href, text }) => (
      <a href={href}  target="_blank">{text}</a>
    );

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const cardList = (
      <List
        rowKey="id"
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Card
              hoverable
              bodyStyle={{ height: 285 }}
              cover={<img alt={item.title} src={item.imgSrc} height={124} width={207} />}
            >
              <Card.Meta
                description={
                  <Typography.Paragraph>{item.description}</Typography.Paragraph>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    )
    return (
      <div className={style.home}>
        {/* 统计模块 */}
        <div className={style.statistics}>
          <DataBlock
            color="#9999CC"
            color2='#ff6086'
            count={12}
            tip="系统访客"
            icon="area-chart"
          />
          <DataBlock
            color="#CC00CC"
            color2='#fda33a'
            count={11}
            tip="文章发布"
            icon="column-height"
          />
          <DataBlock
            color="#999933"
            color2="#7c69ff"
            count={11}
            tip="注册用户"
            icon="block"
          />
          <DataBlock
            color="#993366"
            color2='#029cf5'
            count={12}
            tip="系统作者"
            icon="user"
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
            tip="拉黑数"
            icon="block"
          />
        </div>
        {/* 每日推送  */}
        <Row gutter={24} style={{ marginTop: 10 }}>
          <Col span={16} style={{ paddingRight: 0 }}>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>每日推送</span>}
              bordered
              bodyStyle={{ height: 476 }}
              extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='reload' />&nbsp;换一换</div>}
            >
              {cardList}
            </Card>
          </Col>
          {/* 热门作者 */}
          <Col span={8}>
            <Card
              grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
              title={<span style={{ fontWeight: 'bold' }}>热门作者</span>}
              bordered
              bodyStyle={{ height: 476 }}
              extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='reload' />&nbsp;换一换</div>}
            >
              <List
                itemLayout="vertical"
                dataSource={listData}
                renderItem={item => (
                  <List.Item
                    key={item.name}
                    actions={[
                      <IconText type="star-o" text={item.favorites} key="list-vertical-favorite-o" />,
                      <IconText type="like-o" text={item.likes} key="list-vertical-like-o" />,
                      <IconText type="dislike" text={item.dislikes} key="list-vertical-dislike" />,
                      <IconText type="message" text={item.messages} key="list-vertical-message" />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<Text strong><Atext text={item.name} href={item.href} /></Text>}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: 10 }}>
          {/* 热门文章 */}
          <Col span={8} style={{ paddingRight: 0 }}>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>热门文章</span>}
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
          {/* 作者更新 */}
          <Col span={8} style={{ paddingRight: 0 }}>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>作者更新</span>}
              bodyStyle={{ height: 608 }}
              extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='reload' />&nbsp;刷新</div>}
            >
              <InfiniteScroll className={style.infiniteScroll}>
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
          {/* 每日热评 */}
          <Col span={8}>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>每日热评</span>}
              bodyStyle={{ height: 608 }}
              extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='reload' />&nbsp;换一换</div>}
            >
              <List
                dataSource={dailyComments}
                renderItem={item => (
                  <List.Item>
                    <div style={{ width: '100%' }}>
                      <Text strong>{item.commenter} <a>评论</a> {item.commentObject}</Text>
                      <Text className={style.actions}>
                        <Icon type="like" />{item.commentStars} &nbsp;<Icon type="dislike" />{item.commentsDislike}
                      </Text>
                      <Paragraph>
                        {item.commentContent}
                      </Paragraph>
                    </div>
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

export default Home;