import React from 'react';
import { Avatar, Typography } from 'antd';
import moment from 'moment';
import InfiniteSrcoll from 'react-infinite-scroller';
import styles from './style.less'

class Message extends React.Component {


  render() {
    const dialog = [{
      content1: '你好哈',
      content2: '',
      logtime: moment(new Date())
    }, {
      content1: '',
      content2: '你好',
      logtime: moment(new Date()).add(2, 's')
    }, {
      content1: '',
      content2: '你是做什么工作得哈？',
      logtime: moment(new Date()).add(1, 's')
    }, {
      content1: '我是程序员',
      content2: '',
      logtime: moment(new Date()).add(7, 's')
    }, {
      content1: '你咧？',
      content2: '',
      logtime: moment(new Date()).add(2, 's')
    }, {
      content1: '',
      content2: '我是产品工程师，负责软件设计这一块的',
      logtime: moment(new Date()).add(9, 's')
    }, {
      content1: '',
      content2: '那我们是同行哈！！哈哈',
      logtime: moment(new Date()).add(7, 's')
    }, {
      content1: '嘿嘿~是的呦',
      content2: '',
      logtime: moment(new Date()).add(2, 's')
    }, {
      content1: '',
      content2: '我是产品工程师，负责软件设计这一块的',
      logtime: moment(new Date()).add(9, 's')
    }, {
      content1: '',
      content2: '那我们是同行哈！！哈哈',
      logtime: moment(new Date()).add(7, 's')
    }, {
      content1: '嘿嘿~是的呦',
      content2: '',
      logtime: moment(new Date()).add(2, 's')
    }];
  
    const messageTips = dialog.map((item, index, arr) => (
        <div className={styles.mainDiv}>
          <div style={{ textAlign: 'center'}}>{ index === 0 ? item.logtime.format('hh:mm:ss') : item.logtime.second() - arr[index-1].logtime.second() > 5 ? item.logtime.format('hh:mm:ss') : null}</div>
          <div style={{ display: item.content1 === '' ? 'none': 'flex', flexDirection: 'row' }}>
            <Avatar icon="user" style={{ color: 'red', marginLeft: 5 }} />
            <div className={styles.content1Div}>
              {item.content1}
            </div>
          </div>
          <div style={{  display: item.content2 === '' ? 'none': 'flex', flexDirection: 'row-reverse',  }}>
            <Avatar icon="user" style={{ color: 'green', marginRight: 5 }} />
            <div className={styles.content2Div}>
              {item.content2}
            </div>
          </div>
        </div>
      ))

    return (
      <div className={styles.main}>
        <InfiniteSrcoll className={styles.scrolls}>
          {messageTips}
        </InfiniteSrcoll>
      </div>
    )
  }
}

export default Message;