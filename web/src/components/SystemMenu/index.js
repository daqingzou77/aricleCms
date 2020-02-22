import { formatMessage as _formatMessage } from 'umi/locale';
import React from 'react';
import { Icon, Modal, message } from 'antd';

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
import icTodolist from '@/assets/menuIcon/ic_todolist.svg';

import styles from './index.less';
import Card from '../../pages/Change/Card';
import ChangeShift from '../../pages/Change/ChangeShift';
import {
  clockIn,
  clockOut,
  clockCheck,
  clockOutCheck,
  getUserDutyToday,
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
        title: '健康',
        icon: icNewLog,
        path: '/classify/health',
      },
      {
        key: 205,
        title: '体育',
        icon: icMatter,
        path: '/classify/physical',
      },
      {
        key: 206,
        title: '明星',
        icon: icTodolist,
        path: '/classify/celebrity',
      }
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
        title: '附件上传',
        icon: icSituation,
        path: '/publish/AnnexUpload',
      },
      {
        key: 303,
        title: '文件审核',
        icon: icScheduling,
        path: '/publish/Audit',
      },
    ],
  },
  {
    key: 4,
    title: '文章管理',
    child: [
      {
        key: 401,
        title: '文章管理',
        icon: icMailCheckin,
        path: '/manage',
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
      }
    ],
  },
  {
    key: 6,
    title: '帮助',
    child: [
      {
        key: 601,
        title: '系统帮助',
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
      visibleShift: false,
      handoverEvent: {},
      dutyTodayList: [],
      dutyInfo: {
        classNumber: 0,
        dutyEndTime: new Date(),
        dutyId: 0,
        dutyStartTime: new Date(),
        id: 0,
      },
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

  onShowChange = key => {
    if (key === 401) {
      // 上班打卡检查
      this.clockCheck();
    } else if (key === 402) {
      // 下班打卡检查
      this.setShiftCheck();
    }
  };

  queryDutyUser = () => {
    getUserDutyToday(
      {},
      ({ data }) => {
        console.log('getUserDutyToday--data：', data);
        if (data) {
          this.setState({
            dutyTodayList: data,
          })
        }
        this.setState({
          visibleCard: true
        })
      },
      e => {
        console.log('getUserDutyToday--error：', e.toString());
      }
    )
  };

  /**
   * 下班打卡检查(1:还有其他班次没有值班不能下班打卡2:值班未结束不能下班打卡,3：有连班请确认下一班值班人员已到，
   * 4：上班未打卡不能下班打卡 5:下班已打卡无需重复打卡 0：可以下班打卡)
   */
  setShiftCheck = () => {
    clockOutCheck(
      {},
      ({ data }) => {
        console.log('setShiftCheck-data', data);
        if (data === 1) {
          Modal.error({
            title: formatMessage('guet.schedule.tips_punching_out_of_work'),
            content: formatMessage('guet.schedule.not_get_off_duty_without_duty'),
            okText: formatMessage('guet.schedule.confirm'),
          });
        } else if (data === 2) {
          Modal.error({
            title: formatMessage('guet.schedule.tips_punching_out_of_work'),
            content: formatMessage('guet.schedule.not_get_off_when_duty_is_not_over'),
            okText: formatMessage('guet.schedule.confirm'),
          });
        } else if (data === 3) {
          Modal.error({
            title: formatMessage('guet.schedule.tips_punching_out_of_work'),
            content: formatMessage('guet.schedule.please_confirm_next_shift_person_has_arrived'),
            okText: formatMessage('guet.schedule.confirm'),
          });
        } else if (data === 4) {
          Modal.error({
            title: formatMessage('guet.schedule.tips_punching_out_of_work'),
            content: formatMessage('guet.schedule.unchecked_atwork_cannot_check_in_at_work'),
            okText: formatMessage('guet.schedule.confirm'),
          });
        } else if (data === 5) {
          Modal.error({
            title: formatMessage('guet.schedule.tips_punching_out_of_work'),
            content: formatMessage('guet.schedule.checkin_afterwork_no_need_to_checkin_repeatedly'),
            okText: formatMessage('guet.schedule.confirm'),
          });
        } else if (data === 0) {
          this.handoverEvent();  // 获取下班打卡打卡提示
        }
      },
      e => console.log('setShiftCheck-error', e.toString()),
    )
  };

  // 交班提交 （-3：已经打卡 -2：今天没有值班 -1:没有登录 1:打卡成功 0：打卡失败）
  submitDutyCondition = () => {
    clockOut(
      {},
      ({ data }) => {
        console.log('clockOut-data', data);
        if (data === -3) {
          message.error(formatMessage('guet.schedule.has_handed_can_not_repeat_again'));
        } else if (data === -2) {
          message.error(formatMessage('guet.schedule.current_user_not_arrangement'));
        } else if (data === -1) {
          message.error(formatMessage('guet.schedule.no_login'));
        } else if (data === 1) {
          message.success(formatMessage('guet.schedule.successful_punch_in_from_work'));
          if (window.location.pathname === '/situation') {
            window.location.reload()
          };
        } else if (data === 0) {
          message.error(formatMessage('guet.schedule.punching_failed'));
        }
      },
      e => console.log('clockOut-error', e.toString()),
    )
  };

  handleCardOk = () => {
    // 上班打卡
    this.setClockIn();
    this.setState({
      visibleCard: false,
    });
  };

  handleCardCancel = e => {
    this.setState({
      visibleCard: false,
    });
  };

  handleShiftOk = () => {
    this.submitDutyCondition();
    this.setState({
      visibleShift: false,
    });
  };

  handleShiftCancel = e => {
    console.log(e);
    this.setState({
      visibleShift: false,
    });
  };

  MenuCom = props => {
    return menuList.map(item => {
      return (
        <div key={item.key} className={styles.toolContainer}>
          <div className={styles.toolList}>
            {item.child.map(children =>
              children.key === 401 || children.key === 402 ? (
                <div
                  onClick={() => this.onShowChange(children.key)}
                  key={children.key}
                  className={[
                    styles.toolItem,
                    props.history.location.pathname === children.path ? styles.toolItemActive : '',
                  ].join(' ')}
                >
                  <img src={children.icon} className={styles.toolIcon} alt={children.title} />
                  {formatMessage(children.title)}
                  {/* {children.title} */}
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

  handoverEvent = () => {
    handoverPrompts(
      {},
      ({ data }) => {
        console.log('getHandoverEvent-data：', data);
        this.setState({
          handoverEvent: data,
          visibleShift: true,
        });
      },
      e => {
        console.log('getHandoverEvent--error：', e.toString());
      }
    );
  };

  // 上班打卡检查 （-3已经打卡 -2：今天没有值班 -1:没有登录 1:可以打卡）
  clockCheck = () => {
    clockCheck({},
      ({ data }) => {
        console.log('clockCheck-data', data);
        if (data === -3) {
          Modal.error({
            title: formatMessage('guet.schedule.punch_reminder'),
            content: formatMessage('guet.schedule.already_punched_no_need_repeat_punch'),
            okText: formatMessage('guet.schedule.confirm'),
          })
        } else if (data === -2) {
          Modal.error({
            title: formatMessage('guet.schedule.punch_reminder'),
            content: formatMessage('guet.schedule.current_user_not_arrangement'),
            okText: formatMessage('guet.schedule.confirm'),
          });
        } else if (data === -1) {
          Modal.error({
            title: formatMessage('guet.schedule.punch_reminder'),
            content: formatMessage('guet.schedule.no_login'),
            okText: formatMessage('guet.schedule.confirm'),
          })
        } else if (data === 1) {
          this.queryDutyUser();
        }
      },
      e => console.log('clockCheck-error', e.toString()),
    )
  }

  // 上班打卡（-3已经打卡 -2：今天没有值班 -1:没有登录 1:打卡成功 0：打卡失败）
  setClockIn = () => {
    clockIn(
      {},
      ({ data }) => {
        console.log('clockIn-data', data);
        if (data === -3) {
          Modal.error({
            title: formatMessage('guet.schedule.punch_reminder'),
            content: formatMessage('guet.schedule.already_punched_no_need_repeat_punch'),
            okText: formatMessage('guet.schedule.confirm'),
          })
        } else if (data === -2) {
          Modal.error({
            title: formatMessage('guet.schedule.punch_reminder'),
            content: formatMessage('guet.schedule.current_user_not_arrangement'),
            okText: formatMessage('guet.schedule.confirm'),
          });
        } else if (data === -1) {
          Modal.error({
            title: formatMessage('guet.schedule.punch_reminder'),
            content: formatMessage('guet.schedule.no_login'),
            okText: formatMessage('guet.schedule.confirm'),
          })
        } else if (data === 0) {
          Modal.error({
            title: formatMessage('guet.schedule.punch_reminder'),
            content: formatMessage('guet.schedule.punching_failed'),
            okText: formatMessage('guet.schedule.confirm'),
          })
        } else if (data === 1) {
          Modal.success({
            title: formatMessage('guet.schedule.punch_reminder'),
            content: formatMessage('guet.schedule.punch_card_success'),
            okText: formatMessage('guet.schedule.confirm'),
          })
        }
      },
      e => console.log('clockIn-error', e.toString())
    )
    this.setState({
      visibleCard: false,
    });
  };



  render() {
    const { isOpenToolbar, visibleCard, visibleShift, handoverEvent, dutyTodayList } = this.state;
    const { MenuCom } = this;
    const MMenuCom = withRouter(({ history }) => {
      return <MenuCom history={history} />;
    });
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
          title={formatMessage('guet.schedule.punch_card')}
          visible={visibleCard}
          onOk={this.handleCardOk}
          onCancel={this.handleCardCancel}
          padding="10px 30px"
          width="fit-content"
          cancelText={formatMessage('guet.schedule.cancel')}
          okText={formatMessage('guet.schedule.punch')}
        >
          <Card dutyTodayList={dutyTodayList} />
        </Modal>
        <Modal
          title={formatMessage('schedule.punching_out_of_work')}
          visible={visibleShift}
          onOk={this.handleShiftOk}
          onCancel={this.handleShiftCancel}
          cancelText={formatMessage('guet.schedule.cancel')}
          okText={formatMessage('guet.schedule.confirm')}
          width="500px"
        >
          <ChangeShift
            handoverEvent={handoverEvent}
          />
        </Modal>
      </div>
    );
    return layout;
  }
}

export default SystemMenu;
