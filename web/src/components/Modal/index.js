import React from 'react';
import { Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './style.less';
import { getSize, randomWord } from './utils';

class Modal extends React.PureComponent {
  static propTypes = {
    top: PropTypes.number,
    visible: PropTypes.bool,
    title: PropTypes.string,
    width: PropTypes.any,
    height: PropTypes.any,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    footer: PropTypes.any,
    showOk: PropTypes.bool,
    showCancel: PropTypes.bool,
    showMask: PropTypes.bool,
  };

  static defaultProps = {
    top: 0,
    visible: false,
    title: 'modal框',
    width: 'fit-content',
    height: 700,
    okText: '确定',
    cancelText: '取消',
    onCancel: undefined,
    onOk: undefined,
    showOk: false,
    showCancel: false,
    footer: undefined,
    showMask: false,
  };

  constructor(props) {
    super(props);
    const { top } = this.props;
    let margin = 'auto';
    if (top !== 0) {
      margin = '0 auto';
    }
    this.state = {
      pageX: 0,
      pageY: top,
      right: 0,
      bottom: 0,
      moving: false,
      modalId: randomWord(true, 3, 32),
      headerId: randomWord(true, 3, 32),
      diffX: 0,
      diffY: 0,
      margin,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillReceiveProps(nextProps) {
    const {
      props,
      props: { top },
    } = this;
    if (nextProps.visible === true && props.visible === false) {
      let margin = 'auto';
      if (top !== 0) {
        margin = '0 auto';
      }
      this.setState({
        pageX: 0,
        pageY: top,
        right: 0,
        bottom: 0,
        margin,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getContainer = () => {
    if (!this.modal) {
      this.modal = document.createElement('div');
    }
    if (!this.modal.parentNode) {
      document.body.appendChild(this.modal);
    }
    return this.modal;
  };

  getLayout() {
    const {
      okText,
      cancelText,
      children,
      footer,
      width,
      height,
      title,
      conPadding,
      showCancel,
      showOk,
      showMask,
      top,
      zIndex = 1010,
    } = this.props;
    const { pageX, pageY, modalId, headerId, right, bottom: dBottom, margin } = this.state;

    let bottom = null;
    if (typeof footer === 'undefined') {
      bottom = (
        <div className={styles.custom_modal_footer}>
          {showCancel && <Button onClick={this.onCancel}>{cancelText || '取消'}</Button>}
          {showOk && (
            <Button type="primary" onClick={this.onOk} style={{ marginLeft: '10px' }}>
              {okText || '确定'}
            </Button>
          )}
        </div>
      );
    } else {
      bottom = footer;
    }
    const MModal = (
      <div
        id={modalId}
        className={styles.custom_modal_win}
        // onClick={this.props.onChangeIndex}
        style={{
          position: 'fixed',
          width,
          left: pageX,
          top: pageY,
          right,
          bottom: dBottom,
          zIndex,
          margin,
        }}
      >
        <div
          id={headerId}
          className={styles.custom_modal_header}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
        >
          {title || null}
          <div
            className={styles.custom_modal_header_close}
            onClick={e => {
              e.stopPropagation();
              this.onCancel();
            }}
          >
            <Icon className={styles.custom_modal_header_icon} type="close" />
          </div>
        </div>
        <div
          className={styles.custom_modal_content}
          style={{ padding: conPadding, maxHeight: height }}
        >
          {children}
        </div>
        {/* footer */}
        {bottom}
      </div>
    );

    if (showMask) {
      return (
        <>
          <div className={styles.mask} style={{ zIndex }} />
          {MModal}
        </>
      );
    }
    return MModal;
  }

  resize = () => {
    const { clientWidth, clientHeight } = document.documentElement;
    const { modalId } = this.state;
    // console.log(`监听到窗口大小变化 宽：${clientWidth} 高：${clientHeight}`)
    const modal = document.getElementById(modalId);
    if (modal) {
      const size = getSize(modal);
      // console.log(`监听到窗口大小变化 宽：${clientWidth} 高：${clientHeight}`);
      const pageY = (clientHeight - size.height) / 2;
      const pageX = (clientWidth - size.width) / 2;
      this.setState({ pageX, pageY, right: undefined, bottom: undefined });
    }
  };

  onCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  };

  onOk = () => {
    const { onOk } = this.props;
    if (onOk) {
      onOk();
    }
  };

  // 获取鼠标点击title时的坐标、title的坐标以及两者的位移
  getPosition = e => {
    // 标题DOM元素titleDom
    const titleDom = e.target;
    // titleDom的坐标
    const X = titleDom.getBoundingClientRect().left;
    const Y = titleDom.getBoundingClientRect().top;
    // 鼠标点击的坐标
    let mouseX = 0;
    let mouseY = 0;
    if (e.pageX || e.pageY) {
      // ff,chrome等浏览器
      mouseX = e.pageX;
      mouseY = e.pageY;
    } else {
      mouseX = e.clientX + document.body.scrollLeft - document.body.clientLeft;
      mouseY = e.clientY + document.body.scrollTop - document.body.clientTop;
    }
    // 鼠标点击位置与modal的位移
    const diffX = mouseX - X;
    const diffY = mouseY - Y;
    return { X, Y, mouseX, mouseY, diffX, diffY };
  };

  /**
   * 鼠标按下，设置modal状态为可移动，并注册鼠标移动事件
   * 计算鼠标按下时，指针所在位置与modal位置以及两者的差值
   * */
  onMouseDown = e => {
    e.stopPropagation();
    const { headerId, right, bottom } = this.state;

    if (e.target && e.target.matches(`div#${headerId}`)) {
      const position = this.getPosition(e);
      window.onmousemove = this.onMouseMove;
      if (right === 0 && bottom === 0) {
        this.resize();
      }
      this.setState({
        moving: true,
        diffX: position.diffX,
        diffY: position.diffY,
        margin: undefined,
      });
      document.addEventListener('mouseup', this.onMouseUp, false);
    } else {
      this.onCancel();
    }
  };

  // 松开鼠标，设置modal状态为不可移动,
  onMouseUp = () => {
    this.setState({ moving: false });
    window.onmousemove = undefined;
    document.removeEventListener('mouseup', this.onMouseUp, false);
  };

  // 鼠标移动重新设置modal的位置
  onMouseMove = e => {
    e.stopPropagation();
    const { moving, diffX, diffY, modalId } = this.state;
    if (moving) {
      // 获取鼠标位置数据
      const position = this.getPosition(e);
      // 计算modal应该随鼠标移动到的坐标
      const x = position.mouseX - diffX;
      const y = position.mouseY - diffY;

      const modal = document.getElementById(modalId);
      if (modal) {
        // 窗口大小
        const { clientWidth, clientHeight } = document.documentElement;
        // 计算modal坐标的最大值
        // 判断得出modal的最终位置
        const maxHeight = clientHeight - 30;
        const maxWidth = clientWidth - diffX;

        const minHeight = 0;
        const minWidth = 0 - diffX;

        // eslint-disable-next-line no-nested-ternary
        const left = x < minWidth ? minWidth : x > maxWidth ? maxWidth : x;
        // eslint-disable-next-line no-nested-ternary
        const top = y < minHeight ? minHeight : y > maxHeight ? maxHeight : y;
        this.setState({ pageX: left, pageY: top });
      }
    }
    return false;
  };

  render() {
    const { visible,children } = this.props;
    if (visible&&children!==undefined&&children!==null) {
      return ReactDOM.createPortal(this.getLayout(), this.getContainer());
    }
    if (this.modal) {
      if (this.modal.parentNode) {
        this.modal.parentNode.removeChild(this.modal);
      }
    }
    return null;
  }
}

export default Modal;
