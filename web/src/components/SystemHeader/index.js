import { formatMessage as _formatMessage } from 'umi/locale';
import React from 'react';
import styles from './index.less';
import { 
  getUopLoginUserInfo
} from '@/services/scheduleService';
// import SelectLang from '../SelectLang';

const formatMessage = (id)=>{return _formatMessage({id})}

export default class SystemHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
    };
  }

  componentDidMount() {
    this.getUopLoginUserInfo()
  }

  getUopLoginUserInfo = () => {
    getUopLoginUserInfo({},({ data }) => {
      if (data) {
        this.setState({
          userInfo: data.name
        })
      }
    },
    e => console.log('getUopLoginUserInfo-error', e.toString())
    ) 
  }

  render() {
    const { userInfo } = this.state;
    return (
      <div className={styles.header}>
        {/* 头部标题 */}
        <span className={styles.title}>文章信息管理系统</span>
        <span className={styles.adminUser}>{userInfo}</span>
        {/* <SelectLang className={styles.selectLang} /> */}
      </div>
    );
  }
}
