import React from 'react';
import { Icon, message } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import SocketIo from 'socket.io-client';
import Modal from '@/components/Modal';
import MessageCenter from '@/pages/MessageCenter/index';
import {
  recordModalTime
} from '@/services/messageService';
import router from 'umi/router';
import menu from './menus';
import styles from './index.less';


class SystemMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenToolbar: true,
      visibleCard: false,
      messageVisible: false,
    };
  }
  
  componentWillMount() {
    const userType = localStorage.getItem('userType');
    if (userType === '-1') {
      this.menuList = menu.visitMenu;
    } else if (userType === '0') {
      this.menuList = menu.userMenu;
    } else if (userType === '1') {
      this.menuList = menu.writeMenu;
    } else if (userType === '2') {
      this.menuList = menu.adminMenu;
    } else {
      this.menuList = menu.visitMenu;
    }
  }

  componentDidMount() {
    this.initSocket();
  }

  initSocket = () => {
    this.socket = SocketIo.connect('http://localhost:80');
  }

  // 记录弹窗关闭时间
  recordModalTime = () => {
    const username = localStorage.getItem('currentUser');
    recordModalTime({
      username
    }, ({ data }) => {
       if (data.status) {
         console.log('弹窗时刻记录成功');
       } else {
         message.error('弹窗时刻记录失败');
       }
    },
    e => console.log('recordModalTime-error', e.toString())
    )
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
    const username = localStorage.getItem('currentUser');
    this.setState({
      visibleCard: false
    });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userType');
    router.push('/user/login')
    this.socket.emit('logout', {
      username
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
    this.recordModalTime();
    this.setState({
      messageVisible: false
    })
  }

  MenuCom = props => {
    return this.menuList.map(item => {
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
                  {children.title}
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
                  {children.title}
                </Link>
                )
            )}
          </div>
          <div className={styles.toolTitle}>
            <span>{item.title}</span>
          </div>
        </div>
      );
    });
  };


  render() {
    const { isOpenToolbar, visibleCard, messageVisible } = this.state;
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
          <span>工具栏</span>
        </div>

        <div style={{ display: isOpenToolbar ? '' : 'none' }} className={styles.toolbarTool}>
          <MMenuCom />
        </div>
        <Modal
          title="操作提示"
          visible={visibleCard}
          onOk={this.handleCardOk}
          onCancel={this.handleCardCancel}
          showCancel
          showOk
          cancelText="取消"
          okText="确认"
        >
          <p className={styles.logPstyle}>是否确认退出本系统？</p>
        </Modal>
        <Modal
          width={500}
          // width='fit-content'
          title="消息中心"
          visible={messageVisible}
          onOk={this.handleMessageVisible}
          onCancel={this.handleMessageCancel}
          footer={null}
        >
          <MessageCenter />
        </Modal>
      </div>
    );
    return layout;
  }
}

export default SystemMenu;
