import React from 'react';
import { Card, Spin, List, Typography, Icon } from 'antd'; 
import Modal from '@/common/components/Modal';
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
        title: '科学小知识'
      })
    } else if (keys === 'litterateur') {
      this.getExcerpts();
      this.setState({
        title: '科学小知识'
      })
    } else {
      this.getSportSense();
      this.setState({
        title: '科学小知识'
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
      } else {
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
                  <Text mark>Qu.</Text>
                  <span 
                    style={{ cursor: 'pointer' }} 
                    onClick={() => this.handleShowTips(item.answer)}
                  >
                    {item.question}
                  </span>
                </List.Item>
              )}
            />
           )}
        </Card>
        <Modal
          title="问题解答"
          visible={visible}
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