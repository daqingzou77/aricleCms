import React from 'react';
import { formatMessage, getLocale, setLocale } from 'umi/locale';
import { ConfigProvider } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import Cookies from 'universal-cookie';
import SystemHeader from '../components/SystemHeader';
import SystemMenu from '../components/SystemMenu';
import styles from './Schedule.less';
import SystemFooter from '../components/SystemFooter';
import router from 'umi/router';

const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center', }}>
    <FrownOutlined style={{ fontSize: 30 }} />
    <p style={{ fontWeight: 'bold'}}>暂无数据</p>
  </div>
);
class ScheduleLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenToolbar: true,
    };
  }

  componentDidMount() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      router.push('/user/login')
    }
  }


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
          <ConfigProvider renderEmpty={customizeRenderEmpty}>
            {children}
          </ConfigProvider>
        </div>
        <SystemFooter />
      </>
    );
    return layout;
  }
}

export default ScheduleLayout;
