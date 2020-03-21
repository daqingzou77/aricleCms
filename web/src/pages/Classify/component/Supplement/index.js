import React from 'react';
import { Card, Spin, List, Typography, Icon } from 'antd'; 
import Modal from '@/components/Modal';
import styles from './style.less';
import {
  getScienceTips,
  getHistoricalStorys,
  getExcerpts,
  getSportSense
} from '@/services/classifyService'

const { Text } = Typography;

export default class Supplement extends React.Component {

  state = {
    scienTipsLoading: false,
    scienceTips: [],
    visible: false,
    answer: '',
    title: '',
  }

  componentDidMount(){
    const { keys } = this.props;
    if (keys === 'science') {
      this.getScienceTips();
      this.setState({
        title: '科学小知识'
      })
    } else if (keys === 'history') {
      this.getHistoricalStorys();
      this.setState({
        title: '历史小故事'
      })
    } else if (keys === 'litterateur') {
      this.getExcerpts();
      this.setState({
        title: '优美短句'
      })
    } else if (keys === 'physics'){
      this.getSportSense();
      this.setState({
        title: '体育小常识'
      })
    }
  }

  handleTipFresh = () => {
    this.setState({
        scienTipsLoading: true
    })
    setTimeout(() => {
      const { keys } = this.props;
      if (keys === 'science') {
        this.getScienceTips();
      } else if (keys === 'history') {
        this.getHistoricalStorys();
      } else if (keys === 'litterateur') {
        this.getExcerpts();
      } else if (keys === 'physics'){
        this.getSportSense();
      }
       this.setState({
          scienTipsLoading: false
       })
    }, 1000);
  }

  getScienceTips = () => {
    getScienceTips({}, ({ data }) => {
        this.setState({
          scienceTips: data
        })
      },
      e => console.log('getScienceTips-error', e.toString())
    )
  }

  getHistoricalStorys = () => {
    getHistoricalStorys({}, ({ data }) => {
        this.setState({
          scienceTips: data
        })
      },
      e => console.log('getHistoricalStorys-error', e.toString())
    )
  }

  getExcerpts = () => {
    getExcerpts({}, ({ data }) => {
        this.setState({
          scienceTips: data
        })
      },
      e => console.log('getExcerpts-error', e.toString())
    )
  }

  getSportSense = () => {
    getSportSense({}, ({ data }) => {
        this.setState({
          scienceTips: data
        })
      },
      e => console.log('getSportSense-error', e.toString())
    )
  }

  handleShowTips = content => {
    this.setState({
      visible: true,
      answer: content
    })
  }
  
  render() {
    const { scienTipsLoading, scienceTips, visible, answer, title  } = this.state;
    const { keys } = this.props;
    return(
      <>
        <Card
          bodyStyle={{ height: 608 }}
          title={<span style={{ fontWeight: 'bold' }}>{title}</span>}
          extra={
            <span 
              className={styles.refresh} 
              onClick={this.handleTipFresh}
            >
              <Icon type='reload' /> 换一换
            </span>}
        >
          {scienTipsLoading ? (
            <Spin spinning={scienTipsLoading} style={{ marginLeft: '50%', paddingTop: '50%' }} />
          ) : (
            <List
              dataSource={scienceTips}
              renderItem={item => (
                <List.Item>
                  <Text mark>[ITEM]</Text>
                  <span 
                    style={{ cursor: keys !== 'litterateur' ? 'pointer': null, marginLeft: 5 }} 
                    onClick={() => this.handleShowTips(item.detail)}
                  >
                    {item.description}
                  </span>
                </List.Item>
              )}
            />
           )}
        </Card>
        <Modal
          title="内容详情"
          visible={visible && keys !== 'litterateur'}
          width={300}
          onOk={() => this.setState({ visible: false, answer: '' })}
          onCancel={() => this.setState({ visible: false, answer: '' })}
        >
          <div className={styles.answer}>{answer}</div>
        </Modal>
      </>
    )
  }
}