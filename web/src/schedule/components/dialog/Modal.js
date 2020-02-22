import React from 'react';
import {Button, Icon} from 'antd';
import PropTypes from 'prop-types';
import styles from './styles.less';

class Modal extends React.Component {

  constructor(props) {
    super(props);
    const {width, visible, top} = this.props;
    const {clientWidth, clientHeight} = document.documentElement;
    this.state = {
      visible: (visible !== '' && visible !== null) ? visible : false,
      clientWidth,
      clientHeight,
      pageX: width ? (clientWidth - width) / 2 : clientWidth / 3,
      pageY: typeof top === 'undefined' ? '10vh' : top,
      moving: false,
    };
  }

  UNSAFE_componentWillReceiveProps({visible}) {
    if (visible !== '' && visible !== null) {
      this.setState({visible});
    }
  }

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  resize = () => {
    const {clientWidth, clientHeight} = document.documentElement;
    // console.log(`监听到窗口大小变化 宽：${clientWidth} 高：${clientHeight}`)
    const modal = document.getElementById('modal');
    if (modal) {
      const pageY = (clientHeight - modal.offsetHeight) / 2;
      const pageX = (clientWidth - modal.offsetWidth) / 2;
      this.setState({clientWidth, clientHeight, pageX, pageY});
    }
  };

  onCancel = (e) => {
    const {onCancel} = this.props;
    if (onCancel) {
      onCancel();
    } else {
      this.setState({visible: false});
    }
  };

  open = () => {
    this.setState({visible: true});
  };

  // 获取鼠标点击title时的坐标、title的坐标以及两者的位移
  getPosition = (e) => {
    // 标题DOM元素titleDom
    const titleDom = e.target;
    // titleDom的坐标
    const X = titleDom.getBoundingClientRect().left;
    const Y = titleDom.getBoundingClientRect().top;
    // 鼠标点击的坐标
    let mouseX = 0;
    let mouseY = 0;
    if (e.pageX || e.pageY) {  // ff,chrome等浏览器
      mouseX = e.pageX;
      mouseY = e.pageY;
    } else {
      mouseX = e.clientX + document.body.scrollLeft - document.body.clientLeft;
      mouseY = e.clientY + document.body.scrollTop - document.body.clientTop;
    }
    // 鼠标点击位置与modal的位移
    const diffX = mouseX - X;
    const diffY = mouseY - Y;
    return {X, Y, mouseX, mouseY, diffX, diffY};
  };

  /**
   * 鼠标按下，设置modal状态为可移动，并注册鼠标移动事件
   * 计算鼠标按下时，指针所在位置与modal位置以及两者的差值
   * */
  onMouseDown = (e) => {
    const position = this.getPosition(e);
    window.onmousemove = this.onMouseMove;
    this.setState({moving: true, diffX: position.diffX, diffY: position.diffY});
  };

  // 松开鼠标，设置modal状态为不可移动,
  onMouseUp = () => {
    this.setState({moving: false});
  };

  // 鼠标移动重新设置modal的位置
  onMouseMove = (e) => {
    const {moving, diffX, diffY} = this.state;
    if (moving) {
      // 获取鼠标位置数据
      const position = this.getPosition(e);
      // 计算modal应该随鼠标移动到的坐标
      const x = position.mouseX - diffX;
      const y = position.mouseY - diffY;
      // 窗口大小
      const {clientWidth, clientHeight} = document.documentElement;
      if (position.mouseX > clientWidth || position.mouseX < 0) {
        // console.log('超过横向边界');
        this.setState({moving: false});
        return
      }
      if (position.mouseY > clientHeight || position.mouseY < 0) {
        // console.log('超过纵向边界');
        this.setState({moving: false});
        return
      }
      const modal = document.getElementById('modal');
      if (modal) {
        // 计算modal坐标的最大值
        // const maxHeight = clientHeight - modal.offsetHeight;
        // const maxWidth = clientWidth - modal.offsetWidth;
        // 判断得出modal的最终位置，不得超出浏览器可见窗口
        // const left = x > 0 ? (x < maxWidth ? x : maxWidth) : 0;
        // const top = y > 0 ? (y < maxHeight ? y : maxHeight) : 0;
        this.setState({pageX: x, pageY: y});
      }
    }
  };

  render() {
    const {okText, onOk, cancelText, children, footer, width, height, title, headerClose} = this.props;
    const {visible, clientWidth, pageX, pageY} = this.state;
    let bottom = null;
    let headerButton = null;
    if (typeof footer === 'undefined') {
      bottom = <div className={styles.custom_modal_footer}>
        <div className={styles.custom_modal_footer_inner}>
          <Button onClick={this.onCancel}>
            {cancelText || '取消'}
          </Button>
          <Button type="primary" onClick={onOk} style={{marginLeft: '10px'}}>
            {okText || '确定'}
          </Button>
        </div>
      </div>;
    } else if (typeof footer !== 'undefined' && footer === null) {
      bottom = null;
    }

    if (typeof headerClose === 'undefined') {
      headerButton = <div id="dialog-close" className={styles.custom_modal_header_close} onClick={this.onCancel}>
        <Icon type="close"/>
      </div>;
    } else if (typeof headerClose !== 'undefined' && headerClose === null) {
      headerButton = null;
    }
    const modal = (
      <div
        id="modal"
        className={styles.custom_modal_win}
        style={{
          width: width || clientWidth / 3,
          height: height || 'unset',
          left: pageX,
          top: pageY,
          position: 'fixed',
          zIndex: 1000
        }}
      >
        <div
          className={styles.custom_modal_header}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
        >
          {title || null}
          {headerButton}
        </div>
        <div className={styles.custom_modal_content}>
          {children}
        </div>
        {/* 是否去掉footer */}
        {bottom}
      </div>
    );
    return !visible ? null : modal;
  }
}

Modal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  width: PropTypes.any,
  height: PropTypes.any,
  closable: PropTypes.bool,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  onOkLoading: PropTypes.bool,

};

export default Modal;
