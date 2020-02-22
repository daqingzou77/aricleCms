import { formatMessage as _formatMessage, getLocale } from 'umi/locale';
import React, { Fragment } from 'react';
import { Button, Popover, Typography, message  } from 'antd';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import { loadMap } from '@/utils/map';
import styles from './index.less';
import { queryDutyEvent } from '@/services/scheduleService';

const { Paragraph } = Typography;

const formatMessage = id => {
  return _formatMessage({ id });
};

export default class GIS extends React.Component {
  content = [];

  state = {
    showIndexArray: [],
    dataArray: [],
  }

  componentDidMount() {
    console.log('beigin load map');
    this.map = loadMap('map');
    this.forceUpdate();
    this.queryDutyEvent();
  }

  queryDutyEvent = () => {
    queryDutyEvent(({ data }) => {
      this.setState({
        dataArray: data,
      });
    });
  };

  drawGraph = (key, event) => {
    const { showIndexArray } = this.state;
    const { dutyIncidentAddVO } = event;
    if (dutyIncidentAddVO.lonAndLatList.length === 0) {
      message.warning(formatMessage('guet.schedule.this_event_is_not_tagged'));
      return;
    };
    const { graph } = dutyIncidentAddVO;
    const { map } = this;
    switch (graph) {
      case 'Point':
        map.drawMarker(dutyIncidentAddVO.lonAndLatList, dutyIncidentAddVO);
        break;
      case 'LineString':
        map.drawPolyline(dutyIncidentAddVO.lonAndLatList, dutyIncidentAddVO);
        break;
      case 'Polygon':
        map.drawPolygon(dutyIncidentAddVO.lonAndLatList, dutyIncidentAddVO);
        break;
      default:
        break;
    }
    if (showIndexArray.includes(key)) {
      showIndexArray.splice(showIndexArray.indexOf(key), 1);
      this.setState({
        showIndexArray
      })
    } else {
      showIndexArray.push(key)
      this.setState({
        showIndexArray,
      })
    }
  };

  // 初始化加载点
  loadPoint = pointArr => {
    const { GMap } = window;
    GMap.marker(pointArr[0]).addTo(this.map);
  };

  // 初始化加载线
  loadPolyline = pointArr => {
    const { GMap } = window;
    const polyline = GMap.polyline(pointArr, {
      color: '#ff0000',
      weight: 2,
    }).addTo(this.map);
    this.map.fitBounds(polyline.getBounds());
  };

  handleOnRemove = () => {
    this.map.removeAll();
    this.setState({
      showIndexArray: [],
    })
  }

  // 初始化加载面
  addPolygon = pointArr => {
    const { GMap } = window;
    console.log(GMap);
    const polygon = GMap.polygon(pointArr, {
      color: '#0000ff',
      opacity: 0.5,
      fill: true,
      fillColor: '#00ffff',
      fillOpacity: 0.2,
      weight: 1,
    }).addTo(this.map);
    this.map.fitBounds(polygon.getBounds());
  };

  render() {

    const { dataArray, showIndexArray } = this.state;
    console.log('showIndex', showIndexArray)
    if (dataArray !== null) {
      this.content.splice(0);
      dataArray.forEach((item, index) => {
        this.content.push(
          <Paragraph
            onClick={() => this.drawGraph(index, item)}
            key={`${index + 1}`}
            // eslint-disable-next-line no-nested-ternary
            type={showIndexArray.length > 0 ? showIndexArray.includes(index) ? 'danger': null : null}
            className={styles.event}
          >
            {`${index + 1}、${moment(item.dutyIncidentAddVO.happenTime).format('DD/MM/YYY')} ${
              item.dutyIncidentAddVO.eventName
            }`}
          </Paragraph>
        );
      });
    }
    const content = 
      <div style={{ height: 300, overflow: 'auto' }}>
        <InfiniteScroll>
          {this.content}
        </InfiniteScroll>
      </div>;
    return (
      <Fragment>
        <div id="map" style={{ height: "100%" }}>
          <div style={{ position: 'absolute', top: '5px', right: '10px', zIndex: '1000' }}>
            <Popover
              placement="bottomRight"
              title={formatMessage('guet.schedule.list_of_duty_events')}
              content={content}
              trigger="hover"
            >
              <Button style={{ width: getLocale() === 'fr-FR' ? 162 : '' }} type="primary">{formatMessage('guet.schedule.duty_event')}</Button>
            </Popover>
            <br />
            <Button style={{ marginTop: '10px' }} type="default" onClick={this.handleOnRemove}>
              {formatMessage('guet.schedule.clear_label')}
            </Button>
          </div>
        </div>
        {/* <div style={{ marginTop: 10, display: 'none' }}>
          <Button onClick={map.drawMarker}>添加点</Button>&nbsp;
          <Button onClick={map.drawPolyline}>添加线</Button>&nbsp;
          <Button onClick={map.drawPolygon}>添加面</Button>&nbsp;
          <Button onClick={map.drawCircle}>添加圆</Button>&nbsp;
          <Button onClick={map.drawRectangle}>添加矩形</Button>&nbsp;
          <br />
          <br />
          <Button onClick={map.removeAll}>删除所有图元</Button>&nbsp;
          <br />
          <br />
          <Button onClick={map.editMarker}>编辑点</Button>&nbsp;
          <Button onClick={map.editPolyline}>编辑线</Button>&nbsp;
          <Button onClick={map.editPolygon}>编辑面</Button>&nbsp;
          <Button onClick={map.editCircle}>编辑圆</Button>&nbsp;
          <Button onClick={map.editRectangle}>编辑矩形</Button>&nbsp;
          <br />
          <br />
          <Button onClick={map.saveEditing}>结束编辑</Button>&nbsp;
          <br />
          <br />
          <Button onClick={map.addCanvasMarker}>绘制CanvasMarker</Button>&nbsp;
          <Button onClick={map.drawCanvasMarker}>交互式添加CanvasMarker</Button>&nbsp;
          <Button onClick={map.changeMarkerColor}>重新绘制CanvasMarker</Button>&nbsp;
        </div> */}
      </Fragment>
    );
  }
}
