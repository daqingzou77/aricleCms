import React from 'react';
import { Row, Col } from 'antd';
import style from './style.less';
import {  
  Statistics,
  DialyPush,
  HotAuthor,
  HotArticle,
  LiveUpdate,
  HotComment
} from './component'

class Home extends React.Component {

  render() {
    return (
      <div className={style.home}>
        {/* 统计模块 */}
        <Statistics />
        {/* 每日推送  */}
        <Row gutter={24} style={{ marginTop: 10 }}>
          <Col span={16} style={{ paddingRight: 0 }}>
            <DialyPush />
          </Col>
          {/* 热门作者 */}
          <Col span={8}>
            <HotAuthor />
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: 10 }}>
          {/* 热门文章 */}
          <Col span={8} style={{ paddingRight: 0 }}>
            <HotArticle />
          </Col>
          {/* 作者更新 */}
          <Col span={8} style={{ paddingRight: 0 }}>
            <LiveUpdate />
          </Col>
          {/* 每日热评 */}
          <Col span={8}>
            <HotComment />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home;