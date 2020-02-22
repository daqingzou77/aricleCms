import React from 'react';
import { Card } from 'antd';
import DataBlock from '@/components/DataBlock';
import style from './index.less';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className={style.statistics}>
          <DataBlock
            color="#ff8a85"
            color2='#ff6086'
            count={12}
            tip="节点数"
            icon="area-chart"
          />
          <DataBlock
            color="#fbae52"
            color2='#fda33a'
            count={11}
            tip="区块高度"
            icon="column-height"
          />
          <DataBlock
            color="#b7a0f9"
            color2="#7c69ff"
            count={11}
            tip="交易数"
            icon="block"
          />
          <DataBlock
            color="#00dffe"
            color2='#029cf5'
            count={12}
            tip="用户数"
            icon="user"
          />
          <DataBlock
            color="#ff8a85"
            color2='#ff6086'
            count={12}
            tip="节点数"
            icon="area-chart"
          />
          <DataBlock
            color="#fbae52"
            color2='#fda33a'
            count={11}
            tip="区块高度"
            icon="column-height"
          />
          <DataBlock
            color="#b7a0f9"
            color2="#7c69ff"
            count={11}
            tip="交易数"
            icon="block"
          />
        </div>
        <Card style={{ marginTop: 10 }}>

        </Card>
      </div>
    )
  }
}

export default Home;