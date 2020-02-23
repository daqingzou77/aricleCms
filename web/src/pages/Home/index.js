import React from 'react';
import { Card, Row, Col, List, Avatar, Icon, Typography } from 'antd';
import moment from 'moment';
import DataBlock from '@/components/DataBlock';
import style from './index.less';
import biancheng from '@/assets/books/biancheng1.jpg';
import pingfandeshijie from '@/assets/books/pingfanshijie.jpg';
import weicheng from '@/assets/books/weicheng.jpg';
import honggaoliang from '@/assets/books/honggaoliang.jpg';


class Home extends React.Component {

  render() {
    const listData = [{
      name: '朱自清',
      href: 'https://baike.baidu.com/item/%E6%9C%B1%E8%87%AA%E6%B8%85/106017?fr=aladdin',
      avatar: 'http://img1.imgtn.bdimg.com/it/u=2182637661,2104375444&fm=26&gp=0.jpg',
      description: '散文家、诗人、学者。代表作：《春》《绿》《背影》《荷塘月色》《匆匆》',
      favorites: '12325',
      likes: '12K',
      dislikes: '253',
      messages: '25K'
    }, {
      name: '莫言',
      herf: 'https://baike.baidu.com/item/%E8%8E%AB%E8%A8%80/941736',
      avatar: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=23b696f50255b3199cf985737b92e51b/55e736d12f2eb9381725a006dd628535e4dd6ffe.jpg',
      description: '作者。代表作：《红高粱家族》《檀香刑》《丰乳肥臀》',
      favorites: '10934',
      likes: '8.7K',
      dislikes: '179',
      messages: '13K'
    }, {
      name: '老舍',
      href: ' https://baike.baidu.com/item/%E8%80%81%E8%88%8D/193756?fr=aladdin',
      avatar: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=988f53a3f0edab64607f4592965fc4a6/3bf33a87e950352afadc08605843fbf2b2118b1c.jpg',
      description: '小说家，作家，语言大师，人民艺术家。代表作：《骆驼祥子》《四世同堂》《茶馆》',
      favorites: '7823',
      likes: '4.8K',
      dislikes: '271',
      messages: '12.4K'
    }]

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const list = [{
      id: `fake-list-1`,
      title: '边城',
      imgSrc: biancheng,
      description: '《边城》是沈从文创作的中篇小说，首次出版于1934年。该小说以20世纪30年代川湘交界的边城小镇茶峒为背景，以兼具抒情诗和小品文的优美笔触，描绘了湘西地区特有的风土人情；借船家少女翠翠的纯爱故事，展现出了人性的善良美好。',
    }, {
      id: `fake-list-2`,
      title: '平凡的世界',
      imgSrc: pingfandeshijie,
      description: '《红高粱》以孙少安和孙少平两兄弟为中心，刻画了当时社会各阶层众多普通人的形象；劳动与爱情、挫折与追求、痛苦与欢乐、日常生活与巨大社会冲突纷繁地交织在一起，深刻地展示了普通人在大时代历史进程中所走过的艰难曲折的道路。'
    }, {
      id: `fake-list-3`,
      title: '围城',
      imgSrc: weicheng,
      description: '《围城》是钱钟书所著的长篇小说，是中国现代文学史上一部风格独特的讽刺小说。被誉为“新儒林外史”。第一版于1947年由上海晨光出版公司出版。故事主要写抗战初期知识分子的群相。'
    }, {
      id: `fake-list-1`,
      title: '红高粱',
      imgSrc: honggaoliang,
      description:'《红高粱》是一部表现高密人民在抗日战争中的顽强生命力和充满血性与民族精神的经典之作，从民间的角度给读者再现了抗日战争的年代，展现的是一种为生存而奋起反抗的暴力欲。'
    }]
    const cardList = (
      <List
        rowKey="id"
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Card
              hoverable
              bodyStyle={{ height: 285}}
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
      <div>
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
        <Row gutter={24} style={{ marginTop: 10 }}>
          <Col span={16} style={{ paddingRight: 0 }}>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>每日推送</span>}
              bordered
              bodyStyle={{ height: 476 }}
              extra={<div><Icon type='reload' style={{ color: '#2884D8' }} />&nbsp;<a>换一换</a></div>}
            >
              {cardList}
            </Card>
          </Col>
          <Col span={8}>
            <Card
              grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
              title={<span style={{ fontWeight: 'bold' }}>热门作者</span>}
              bordered
              bodyStyle={{ height: 476 }}
              extra={<div><Icon type='reload' style={{ color: '#2884D8' }} />&nbsp;<a>换一换</a></div>}
            >
              <List
                itemLayout="vertical"
                dataSource={listData}
                renderItem={item => (
                  <List.Item
                    key={item.name}
                    actions={[
                      <IconText type="favorite-o" text={item.favorites} key="list-vertical-favorite-o" />,
                      <IconText type="like-o" text={item.likes} key="list-vertical-like-o" />,
                      <IconText type="dislike" text={item.dislikes} key="list-vertical-dislike" />,
                      <IconText type="message" text={item.messages} key="list-vertical-message" />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href={item.href}>{item.name}</a>}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: 10 }}>
          <Col span={8} style={{ paddingRight: 0 }}>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>热门文章</span>}
              extra={<div><Icon type='reload' style={{ color: '#2884D8' }} />&nbsp;<a>换一换</a></div>}
            >
            </Card>
          </Col>
          <Col span={8} style={{ paddingRight: 0 }}>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>每日更新</span>}
              extra={<div><Icon type='reload' style={{ color: '#2884D8' }} />&nbsp;<a>换一换</a></div>}
            >

            </Card>
          </Col>
          <Col span={8}>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>每日评论</span>}
              extra={<div><Icon type='reload' style={{ color: '#2884D8' }} />&nbsp;<a>换一换</a></div>}
            >

            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home;