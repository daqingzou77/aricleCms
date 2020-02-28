import React from 'react';
import { Avatar, Typography } from 'antd';
import moment from 'moment';
import InfiniteSrcoll from 'react-infinite-scroller';
import styles from './style.less'
import Item from 'antd/lib/list/Item';

const { Paragraph } = Typography;

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
    }];

    const checkTime = (nowTime, preTime) => {
      console.log('now', nowTime.seconds());
      console.log('last', preTime.seconds());
      return nowTime.seconds() - preTime.seconds() > 5 ? false : true;
    }
  
    const messageTips = dialog.map((item, index, arr) => (
      index > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ textAlign: 'center'}}>{item.logtime.second() - arr[index-1].logtime.second() > 5 ? item.logtime.format('hh:mm:ss') : null}</div>
          <div style={{ display: item.content1 === '' ? 'none': 'flex', flexDirection: 'row' }}>
            <Avatar icon="user" style={{ color: 'red', marginLeft: 5 }} />
            <div style={{width: '50%', height: '100%', wordWrap: 'break-word', overflow:'hidden', background: '#fff', padding: 5, marginLeft: 5, marginBottom: 5  }}>
              {item.content1}
            </div>
          </div>
          <div style={{  display: item.content2 === '' ? 'none': 'flex', flexDirection: 'row-reverse',  }}>
            <Avatar icon="user" style={{ color: 'green', marginRight: 5 }} />
            <div style={{width: '50%', height: '100%', wordWrap: 'break-word', overflow:'hidden', background: '#fff', padding: 5, marginRight: 5, marginBottom: 5 }}>
              {item.content2}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ textAlign: 'center'}}>{item.logtime.format('hh:mm:ss')}</div>
          <div style={{  display: item.content1 === '' ? 'none': 'flex', flexDirection: 'row' }}>
            <Avatar icon="user" style={{ color: 'red', marginLeft: 5 }} />
            <div style={{width: '50%', height: '100%', wordWrap: 'break-word', overflow:'hidden', background: '#fff', padding: 5, marginLeft: 5, marginBottom: 5  }}>
              {item.content1}
            </div>
          </div>
          <div style={{ display: item.content2 === '' ? 'none': 'flex', flexDirection: 'row-reverse' }}>
            <Avatar icon="user" style={{ color: 'green', marginRight: 5 }} />
            <div style={{width: '50%', height: '100%', wordWrap: 'break-word', overflow:'hidden', background: '#fff', padding: 5, marginRight: 5, marginBottom: 5 }}>
              {item.content2}
            </div>
          </div>
        </div>
      )))

    return (
      <div style={{ background: '#eff3f6', height: 300, width: 280 }}>
        <InfiniteSrcoll style={{ height: 300, overflow: 'auto' }}>
          {messageTips}
        </InfiniteSrcoll>
      </div>
    )
  }
}

export default Message;