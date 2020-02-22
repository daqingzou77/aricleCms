import React, { Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Button, Row, Col, Icon, Steps, Card } from 'antd';
import { loadMap, openJB } from '@/utils/map';

export default class GIS extends React.Component {
  componentDidMount() {
    loadMap('map2');
  }

  render() {
    return (
      <Fragment>
        <div id="map2" style={{ height: 500 }} />
        <div style={{ marginTop: 10 }}>
          <Button onClick={openJB}>打开军标面板</Button>&nbsp;
        </div>
      </Fragment>
    )
  }
}
