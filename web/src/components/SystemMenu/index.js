import { formatMessage as _formatMessage } from 'umi/locale';
import React from 'react';
import { Icon, Col, Row, Tag, Badge, } from 'antd';
import { Link, withRouter } from 'react-router-dom';
// import Modal from '@/common/components/dialog/Modal';

import icArrangment from '@/assets/menuIcon/ic_arrangement.svg';
import icChangeShift from '@/assets/menuIcon/ic_changeshift.svg';
import icDutyevent from '@/assets/menuIcon/ic_dutyevent.svg';
import icHelp from '@/assets/menuIcon/ic_help.svg';
import icHistoricalLog from '@/assets/menuIcon/ic_historical_log.svg';
import icMailCheckin from '@/assets/menuIcon/ic_mail_checkin.svg';
import icMap from '@/assets/menuIcon/ic_map.svg';
import icMatter from '@/assets/menuIcon/ic_matter.svg';
import icNewLog from '@/assets/menuIcon/ic_new_daily_record.svg';
import icPhoneCheckin from '@/assets/menuIcon/ic_phone_checkin.svg';
import icPunchCard from '@/assets/menuIcon/ic_punch_card.svg';
import icScheduling from '@/assets/menuIcon/ic_scheduling.svg';
import icSituation from '@/assets/menuIcon/ic_situation.svg';

import Modal from '@/common/components/Modal';
import styles from './index.less';
import MessageCenter from '@/pages/MessageCenter/index';
import Notice from '@/pages/MessageCenter/component/Notice';
import {
  handoverPrompts,
} from '../../services/scheduleService';

const formatMessage = id => {
  return _formatMessage({ id });
};

const menuList = [
  {
    key: 1,
    title: '首页',
    child: [
      {
        key: 101,
        title: '首页',
        icon: icMap,
        path: '/home',
      },
    ],
  },
  {
    key: 2,
    title: '文章分类',
    child: [
      {
        key: 201,
        title: '科学',
        icon: icChangeShift,
        path: '/classify/science',
      },
      {
        key: 202,
        title: '历史',
        icon: icDutyevent,
        path: '/classify/history',
      },
      {
        key: 203,
        title: '文学',
        icon: icHistoricalLog,
        path: '/classify/Litterateur',
      },
      {
        key: 204,
        title: '体育',
        icon: icMatter,
        path: '/classify/physical',
      },
    ],
  },
  {
    key: 3,
    title: '文章发布',
    child: [
      {
        key: 301,
        title: '在线发布',
        icon: icPunchCard,
        path: '/publish/publishOnline',
      },
      {
        key: 302,
        title: '文章上传',
        icon: icSituation,
        path: '/publish/AnnexUpload',
      }
    ]
  },
  {
    key: 4,
    title: '文章管理',
    child: [
      {
        key: 401,
        title: '文章审核',
        icon: icScheduling,
        path: '/maintain/audit'
      },
      {
        key: 401,
        title: '文章管理',
        icon: icMailCheckin,
        path: '/maintain/manage',
      },
    ],
  },
  {
    key: 5,
    title: '用户中心',
    child: [
      {
        key: 501,
        title: '个人中心',
        icon: icArrangment,
        path: '/userCenter/personCenter',
      },
      {
        key: 502,
        title: '消息中心',
        icon: icPhoneCheckin,
        path: '/userCenter/messageCenter',
      },
      {
        key: 503,
        title: '用户管理',
        icon: icNewLog,
        path: '/userCenter/userManage'
      }
    ],
  },
  {
    key: 6,
    title: '退出',
    child: [
      {
        key: 601,
        title: '退出系统',
        icon: icHelp,
        path: '/help',
      },
    ],
  },
]

class SystemMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenToolbar: true,
      visibleCard: false,
      messageVisible: false,
      messageKey: 1,
    };
  }

  handleClickUpOrDown = () => {
    const { isOpenToolbar } = this.state;
    const { changeOpenToolbar } = this.props;
    this.setState({
      isOpenToolbar: !isOpenToolbar,
    });
    if (typeof changeOpenToolbar === 'function') {
      changeOpenToolbar(!isOpenToolbar);
    }
  };

  handleChange = (key) => {
    if (key === 502) {
      this.setState({
        messageVisible: true
      })
    } else {
      this.setState({
        visibleCard: true
      })
    }
  }

  handleCardOk = () => {
    this.setState({
      visibleCard: false
    })
  }

  handleCardCancel = () => {
    this.setState({
      visibleCard: false
    })
  }

  handleMessageVisible = () => {
    this.setState({
      messageVisible: false
    })
  }

  handleMessageCancel = () => {
    this.setState({
      messageVisible: false
    })
  }

  handleGetMessage = () => {
    this.setState({
      messageKey: 1
    })
  }

  handleGetNotice = () => {
    this.setState({
      messageKey: 2
    })
  }

  MenuCom = props => {
    return menuList.map(item => {
      return (
        <div key={item.key} className={styles.toolContainer}>
          <div className={styles.toolList}>
            {item.child.map(children =>
              children.key === 502 || children.key === 601 ? (
                <div
                  onClick={() => this.handleChange(children.key)}
                  key={children.key}
                  className={[
                    styles.toolItem,
                    props.history.location.pathname === children.path ? styles.toolItemActive : '',
                  ].join(' ')}
                >
                  <img src={children.icon} className={styles.toolIcon} alt={children.title} />
                  {formatMessage(children.title)}
                </div>
              ) : (
                <Link
                  key={children.key}
                  to={children.path}
                  className={[
                  styles.toolItem,
                      props.history.location.pathname === children.path ? styles.toolItemActive : '',
                    ].join(' ')}
                >
                  <img src={children.icon} className={styles.toolIcon} alt={children.title} />
                  {formatMessage(children.title)}
                </Link>
                )
            )}
          </div>
          <div className={styles.toolTitle}>
            <span>{formatMessage(item.title)}</span>
          </div>
        </div>
      );
    });
  };


  render() {
    const { isOpenToolbar, visibleCard, messageVisible, messageKey } = this.state;
    const { MenuCom } = this;
    const MMenuCom = withRouter(({ history }) => {
      return <MenuCom history={history} />;
    });
    const footer = (
      <Row style={{ marginBottom: 10 }} type="flex" justify="space-around">
        <Col>
          <Tag color="#2db7f5" onClick={this.handleGetMessage}><Badge dot>消息</Badge></Tag>
        </Col>
        <Col>
          <Tag color="#87d068" style={{ color: '#2884d8', fontSize: 14 }} onClick={this.handleGetNotice}><Badge dot>通知</Badge></Tag>
        </Col>
        <Col>
          <Tag color="red" style={{ fontSize: 14 }}>清空</Tag>
        </Col>
      </Row>
    );
    const layout = (
      <div className={styles.toolbar}>
        <Icon
          className={styles.icon}
          onClick={this.handleClickUpOrDown}
          type={isOpenToolbar ? 'shrink' : 'arrows-alt'}
        />
        <div style={{ display: isOpenToolbar ? 'none' : '' }} className={styles.toolbarTitle}>
          <span>{formatMessage('guet.schedule.toolbar')}</span>
        </div>

        <div style={{ display: isOpenToolbar ? '' : 'none' }} className={styles.toolbarTool}>
          <MMenuCom />
        </div>
        <Modal
          title="操作提示"
          visible={visibleCard}
          onOk={this.handleCardOk}
          onCancel={this.handleCardCancel}
          showCancel={true}
          showOk={true}
          cancelText="取消"
          okText="确认"
        >
          <p className={styles.logPstyle}>是否确认退出本系统？</p>
        </Modal>
        <Modal
          width={400}
          title={`消息中心-${messageKey === 1 ? '消息': '通知'}`}
          visible={messageVisible}
          onOk={this.handleMessageVisible}
          onCancel={this.handleMessageCancel}
          footer={footer}
        >
          {
            messageKey === 1 ?  (
              <MessageCenter />
           ) : (
             <Notice />
             )
         } 
        </Modal>
      </div>
    );
    return layout;
  }
}

export default SystemMenu;
