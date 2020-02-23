import React from 'react';
import { Card, Row, Col, List, Avatar, Icon, Typography } from 'antd';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import DataBlock from '@/components/DataBlock';
import style from './index.less';
import biancheng from '@/assets/books/biancheng1.jpg';
import pingfandeshijie from '@/assets/books/pingfanshijie.jpg';
import weicheng from '@/assets/books/weicheng.jpg';
import honggaoliang from '@/assets/books/honggaoliang.jpg';



class Home extends React.Component {

  render() {
   
    // 公共组件
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    // 头像颜色 
    const avatarColor = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#f32432', '#2322d1', "#fff146"];

    // 每日更新  
    const list = [{
      id: `fake-list-1`,
      title: '边城',
      imgSrc: biancheng,
      description: '《边城》是沈从文创作的中篇小说，首次出版于1934年。该小说以20世纪30年代川湘交界的边城小镇茶峒为背景，以兼具抒情诗和小品文的优美笔触，描绘了湘西地区特有的风土人情；借船家少女翠翠的纯爱故事，展现出了人性的善良美好。',
    }, {
      id: `fake-list-2`,
      title: '平凡的世界',
      imgSrc: pingfandeshijie,
      description: '《平凡的世界》以孙少安和孙少平两兄弟为中心，刻画了当时社会各阶层众多普通人的形象；劳动与爱情、挫折与追求、痛苦与欢乐、日常生活与巨大社会冲突纷繁地交织在一起，深刻地展示了普通人在大时代历史进程中所走过的艰难曲折的道路。'
    }, {
      id: `fake-list-3`,
      title: '围城',
      imgSrc: weicheng,
      description: '《围城》是钱钟书所著的长篇小说，是中国现代文学史上一部风格独特的讽刺小说。被誉为“新儒林外史”。第一版于1947年由上海晨光出版公司出版。故事主要写抗战初期知识分子的群相。'
    }, {
      id: `fake-list-1`,
      title: '红高粱',
      imgSrc: honggaoliang,
      description: '《红高粱》是一部表现高密人民在抗日战争中的顽强生命力和充满血性与民族精神的经典之作，从民间的角度给读者再现了抗日战争的年代，展现的是一种为生存而奋起反抗的暴力欲。'
    }]

    // 热门作者
    const listData = [{
      name: '朱自清',
      href: 'https://baike.baidu.com/item/%E6%9C%B1%E8%87%AA%E6%B8%85/106017?fr=aladdin',
      avatar: 'http://img1.imgtn.bdimg.com/it/u=2182637661,2104375444&fm=26&gp=0.jpg',
      description: '散文家、诗人、学者。代表作：《春》《绿》《背影》《荷塘月色》《匆匆》',
      favorites: '1.1K',
      likes: '12K',
      dislikes: '253',
      messages: '25K'
    }, {
      name: '莫言',
      herf: 'https://baike.baidu.com/item/%E8%8E%AB%E8%A8%80/941736',
      avatar: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=23b696f50255b3199cf985737b92e51b/55e736d12f2eb9381725a006dd628535e4dd6ffe.jpg',
      description: '作者。代表作：《红高粱家族》《檀香刑》《丰乳肥臀》',
      favorites: '0.53K',
      likes: '8.7K',
      dislikes: '179',
      messages: '13K'
    }, {
      name: '老舍',
      href: ' https://baike.baidu.com/item/%E8%80%81%E8%88%8D/193756?fr=aladdin',
      avatar: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=988f53a3f0edab64607f4592965fc4a6/3bf33a87e950352afadc08605843fbf2b2118b1c.jpg',
      description: '小说家，作家，语言大师，人民艺术家。代表作：《骆驼祥子》《四世同堂》《茶馆》',
      favorites: '0.22K',
      likes: '4.8K',
      dislikes: '271',
      messages: '12.4K'
    }];

    // 热门文章
    const hotArticles = [{
      articlename: '《匆匆》-朱自清',
      description: '燕子去了，有再来的时候；杨柳枯了，有再青的时候；桃花谢了，有再开的时候。但是，聪明的，你告诉我，我们的日子为什么一去不复返呢？',
      articleImgSrc: 'https://bkimg.cdn.bcebos.com/pic/42166d224f4a20a45c34157c94529822720ed066?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg',
      href: 'https://zhidao.baidu.com/question/21816886.html?qbl=relate_question_0&word=%B4%D2%B4%D2',
      favorites: '2K',
      likes: '134K',
      dislikes: '561',
      messages: '12k'
    }, {
      articlename: '骆驼祥子',
      description: '今天买上了新车，就算是生日吧，人的也是车的，好记，而且车既是自己的心血，简直没什么不可以把人与车算在一块的地方。',
      articleImgSrc: 'http://img5.imgtn.bdimg.com/it/u=2279722130,3687285283&fm=26&gp=0.jpg',
      href: 'https://www.ppzuowen.com/book/luotuoxiangzi/',
      favorites: '1.5K',
      likes: '83K',
      dislikes: '420',
      messages: '6.3K'
    }, {
      articlename: '荷塘月色',
      description: '层层的叶子中间，零星地点缀着些白花，有袅娜地开着的，有羞涩地打着朵儿的；正如一粒粒的明珠，又如碧天里的星星，又如刚出浴的美人。',
      articleImgSrc: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3956095388,4232370697&fm=26&gp=0.jpg',
      href: 'http://www.ccview.net/htm/xiandai/zzq/zzqsw002.htm',
      favorites: '923',
      likes: '53K',
      dislikes: '634',
      messages: '6.4K'
    }];

    // 每日更新
    const dailyUpdate = [{
      author: '小橘',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      updateContent: '更新小说《犯罪现场》第三节',
      updateTime: new Date(),
    }, {
      author: '小黑',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      updateContent: '上传附件-落日下的余晖.doc',
      updateTime: new Date(),
    }, {
      author: 'yellow336',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      updateContent: '发布散文《秋意》',
      updateTime: new Date(),
    }, {
      author: 'daqing',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      updateContent: '发布短文《两心相悦》',
      updateTime: new Date(),
    }, {
      author: '婷婷701',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      updateContent: '上传附件-这不是真的爱情.doc',
      updateTime: new Date(),
    }, {
      author: '小猪有点皮',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      updateContent: '发布短文《山下农民》',
      updateTime: new Date(),
    }, {
      author: '早更晚更的都更',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      updateContent: '更新小说《校园奇幻漂流》',
      updateTime: new Date(),
    }];

    // 每日热评
    const dailyComments = [{

    }];

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
      <div>
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
              extra={<div><Icon type='reload' style={{ color: '#2884D8' }} />&nbsp;<a>换一换</a></div>}
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
              extra={<div><Icon type='reload' style={{ color: '#2884D8' }} />&nbsp;<a>换一换</a></div>}
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
          {/* 热门文章 */}
          <Col span={8} style={{ paddingRight: 0 }}>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>热门文章</span>}
              bodyStyle={{ height: 608 }}
              extra={<div><Icon type='reload' style={{ color: '#2884D8' }} />&nbsp;<a>换一换</a></div>}
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
                      title={<a href={item.href}>{item.articlename}</a>}
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
              extra={<div><Icon type='reload' style={{ color: '#2884D8' }} />&nbsp;<a>刷新</a></div>}
            >
              <InfiniteScroll className={style.infiniteScroll}>
                <List
                  itemLayout="vertical"
                  dataSource={dailyUpdate}
                  renderItem={(item, index) => (
                    <List.Item key={item.author}>
                      <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: avatarColor[index] }} icon="user" />}
                        title={<span>作者-{item.author}</span>}
                        description={item.updateContent}
                      />
                      <div style={{ float: 'right', marginTop: -8 }}>发布时间：{moment(item.updateTime).format('YYYY-MM-DD hh:mm:ss')}</div>
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
      </div>
    )
  }
}

export default Home;