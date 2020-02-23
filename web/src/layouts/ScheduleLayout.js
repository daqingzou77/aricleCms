import React from 'react';
import { formatMessage, getLocale, setLocale } from 'umi/locale';
import Cookies from 'universal-cookie';
import { Modal } from 'antd';
import SocketIo from 'socket.io-client';
import moment from 'moment';
import SystemHeader from '../components/SystemHeader';
import SystemMenu from '../components/SystemMenu';
import styles from './Schedule.less';
import SystemFooter from '../components/SystemFooter';
import { getUopUser, getBacklogRemind } from '@/services/scheduleService';


const { error, warning } = Modal;
class ScheduleLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenToolbar: true,
      isRemind: true,
    };
  }

  componentWillMount() {
    this.checkLocale();
  }

  componentDidMount() {
    // document.title = formatMessage({ id: 'guet.schedule.combat_duty_software' });
    document.title = '文章管理系统'
    this.getUopUser();
    this.getBacklogRemind();
  }

  getBacklogRemind = () => {
    getBacklogRemind({
    },
      ({ data }) => {
        console.log('getBacklogRemind-data', data);
        if (data !== undefined) {
          const { isRemind, } = data;
          this.setState({
            isRemind,
          })
        }
      },
      e => console.log('getBacklogRemind-error', e.toString()),
    )

  }

  getUopUser = () => {
    getUopUser(
      undefined,
      ({ data }) => {
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('permission', data.permission);
        this.initSocketIo(data.id);
      },
      () => { }
    );
  };

  initSocketIo = userId => {
    const { isRemind } = this.state;
    const opts = {
      query: 'loginUserNum=' + userId,
    };
    const hostPort = '18310';
    let socketHostName = window.location.hostname;
    // let socketHostName = 'http://192.168.1.3'
    if (process.env.ENV === 'dev') {
      socketHostName = process.env.apiBaseUrl.slice(0, process.env.apiBaseUrl.lastIndexOf(':'));
    }
    console.log('socketHostName', socketHostName);
    this.socket = SocketIo(`${socketHostName}:${hostPort}`, opts);
    this.socket.on('connect', () => {
      console.log('socket connected');
    });
    this.socket.on('disconnect', () => {
      console.log('socket disconnected');
    });
    this.socket.on('clock_out_remind', data => {
      console.log('data', data);
      if (data) {
        warning({
          title: formatMessage({id: 'guet.schedule.expiration_reminder'}),
          content: formatMessage({id: 'guet.schedule.over_in_5minutes'}),
          okText: formatMessage({id: 'guet.schedule.confirm'}),
          onOk: () => console.log('确认')
        })
      }
    });
    this.socket.on('clock_out_remind', data => {
      if (data) {
        const { object } = data;
        if (object) {
          const { dutyInfo, user } = object;
          if (dutyInfo && user) {
            warning({
              title: formatMessage({id : 'guet.schedule.duty_reminder'}),
              content: (
                <div>
                  <p>{formatMessage({id : 'guet.schedule.duty_staff'})}: {user.userName}</p>
                  <p>{formatMessage({id: 'guet.schedule.duty_period'})}：{moment(dutyInfo.startTime).format('HH:mm:ss')} ~ {moment(dutyInfo.endTime).format('HH:mm:ss')}</p>
                </div>
              ),
              okText: formatMessage({ id: 'guet.schedule.confirm'}),
              onOk: () => console.log('确认')
            })
          }
        }
      }
    });
    this.socket.on('backlog_remind', data => {
      if (data && isRemind) {
        const { object } = data;
        error({
          title: formatMessage({id: 'guet.schedule.upcoming_expiry'}),
          content: (
            object.map(item => {
              return (
                <div>
                  <p>{formatMessage({id: 'guet.schedule.title'})}：{item.matterName}</p>
                  <p>{formatMessage({id: 'guet.schedule.request_completion_time'})}：{moment(item.requireTime).format('DD/MM/YYYY HH:mm:ss')}</p>
                </div>
              )
            })
          ),
          okText: formatMessage({ id: 'guet.schedule.confirm'}),
          onOk: () => {
            console.log('确认');
          },
        })
      }
    })
  };

  checkLocale = () => {
    const cookies = new Cookies();
    let language = cookies.get('uop.locale');
    const isSuportLanguage = ['zh_CN', 'fr_FR', 'en_US'].includes(language);
    if (!isSuportLanguage) {
      return;
    }
    language = language === 'fr_FR' ? 'fr-FR' : language === 'zh_CN' ? 'zh-CN' : 'en-US';
    if (getLocale() !== language) {
      console.log(getLocale(), '=>', language);
      setLocale(language);
    }
  };

  changeOpenToolbar = isOpenToolbar => {
    this.setState({
      isOpenToolbar,
    });
  };

  render() {
    const { isOpenToolbar } = this.state;
    const { children } = this.props;
    const layout = (
      <>
        <SystemHeader />
        <SystemMenu changeOpenToolbar={this.changeOpenToolbar} />
        <div style={{ top: isOpenToolbar ? 109 + 45 : 30 + 45 }} className={styles.content}>
          {children}
        </div>
        <SystemFooter />
      </>
    );
    return layout;
  }
}

export default ScheduleLayout;
