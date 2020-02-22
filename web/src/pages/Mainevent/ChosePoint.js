import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatMessage } from 'umi/locale';
import Cookies from 'universal-cookie';
import { Button } from 'antd';

class ChosePoint extends Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        value: nextProps.value,
      };
    }
    return null;
  }

  static propTypes = {
    pointArr: PropTypes.array,
  };

  static defaultProps = {
    pointArr: [],
  };

  // eslint-disable-next-line react/sort-comp
  map = null;

  drawItems = null;

  drawController = null;

  locale = 'CN'

  markerLayers = [];

  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lng: '',
      pointArr: [],
      graph: 'default',
    };
  }

  componentDidMount() {
    this.initGisMap();
  }

  enableDrawPlugin = () => {
    const { GMap } = window;
    if (this.drawnItems === undefined || this.drawItems === null) {
      // 初始化存放绘制图元的矢量图层
      this.drawnItems = GMap.featureGroup().addTo(this.map);
    }

    // 注册CREATED消息的相应函数，将绘制的图元添加到图层中
    // 监听图元绘制完成的消息，并将新加图元添加到地图上
    this.map.on(GMap.Draw.Event.CREATED, event => {
      const { layer } = event;
      layer.addTo(this.map);
      this.drawnItems.addLayer(layer);

      // 打印调试信息
      if (layer instanceof GMap.Circle) {
        // 圆中心坐标
        console.log(layer.getLatLng());
        // 圆半径
        console.log(layer.getRadius());
        // 矩形包围框范围
        console.log(layer.getBounds());
        // 转换成 GeoJSON 格式
        console.log(layer.toGeoJSON());
      } else if (layer instanceof GMap.Marker) {
        // // 点坐标
        // console.log(layer.getLatLng());
        // // 转换成 GeoJSON 格式
        // console.log(layer.toGeoJSON());
        const { geometry } = layer.toGeoJSON();
        console.log(geometry);
        this.setState({
          pointArr: [{ lat: layer.getLatLng().lat, lon: layer.getLatLng().lng }],
          graph: geometry.type,
        });
      } else {
        /* 包括: GMap.Ployline, GMap.Polygon, GMap.Rectangle */
        // 矩形包围框范围
        // console.log(layer.getBounds());
        // 返回绘制图形的节点数组
        // console.log(layer.getLatLngs());
        // // 转换成 GeoJSON 格式
        // console.log(layer.toGeoJSON());
        const { geometry } = layer.toGeoJSON();
        const pointArr = [];
        const LatLngs = layer.getLatLngs();
        if (geometry.type === 'LineString') {
          LatLngs.forEach(item => {
            pointArr.push({
              lat: item.lat,
              lon: item.lng,
            });
          });
        } else {
          LatLngs[0].forEach(item => {
            pointArr.push({
              lat: item.lat,
              lon: item.lng,
            });
          });
        }
        console.log('pontArr', pointArr);
        this.setState({
          pointArr,
          graph: geometry.type,
        });
      }

    });
  };

  loadDrawPlugin = () => {
    const { GMap } = window;
    const { enableDrawPlugin, drawerMap } = this;
    const cookies = new Cookies();
    const language = cookies.get('uop.locale');
    this.locale = language === 'fr_FR' ? 'FR' : 'CN' ;
    const mThis = this;
    GMap.pluginManager().load('draw', {
      done() {
        enableDrawPlugin.call(mThis);
        drawerMap.call(mThis);
        mThis.chooseLocal(mThis.locale)
      },
      error(f) {
        console.log(`加载插件库${f}失败`);
      },
    });
  };

  drawerMap = () => {
    const { graph, pointArr } = this.props;
    switch (graph) {
      case 'Point':
        this.loadPoint(pointArr);
        break;
      case 'LineString':
        this.loadPolyline(pointArr);
        break;
      case 'Polygon':
        this.addPolygon(pointArr);
        break;
      default:
        break;
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

  // 初始化加载面
  addPolygon = pointArr => {
    const { GMap } = window;
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

  // 初始化地图
  initGisMap = () => {
    const { GMap } = window;
    const { center, zoom } = this.props;
    let map = null;
    // 地图服务器的访问参数
    const host = process.env.MAP_HOST; // uop 服务器地址
    const port = process.env.MAP_PORT; // 服务器端口
    let vector = 'Lao_A'; // 矢量切片地图
    let crs = '';


    if (process.env.ENV === 'dev') {
      vector = 'vector';
      crs = GMap.CRS.Tianditu; // 坐标系
    } else if (process.env.ENV === 'prod') {
      vector = 'Lao_A';
      crs = GMap.CRS.PGIS;
    }

    if (GMap === undefined || GMap === null) {
      return 0;
    }
    map = GMap.map('chosePointMap', {
      center: center || [29.557156, 106.577026],
      zoom: zoom || 5,
      minZoom: 1,
      maxZoom: 8,
      crs,
      maxBounds: [[-90, -180], [90, 180]],
      renderer: GMap.canvas(),
      zoomControl: false,
    });

    map.on('mousemove', this.onMouseMove);

    this.drawItems = GMap.featureGroup().addTo(map);

    map.whenReady(() => {
      this.map = map;
      // 加载背景图层
      GMap.tileLayerQSImg(host, port, vector).addTo(map);
      this.loadDrawPlugin();
    });
    return true;
  };

  onMouseMove = ({ latlng }) => {
    this.setState({
      lat: latlng.lat,
      lng: latlng.lng,
    });
  };

  /**
   * 从文件创建地图图标
   * @param url 图标访问的url
   * @param iconSizeArray
   * @returns {{}|*}
   */
  createImgIcon = (url, iconSizeArray) => {
    const { GMap } = window;
    let iconSize = [40, 40];
    if (typeof iconSizeArray !== 'undefined') {
      iconSize = iconSizeArray;
    }
    if (typeof GMap === 'undefined') {
      return {};
    }
    return GMap.icon({
      iconUrl: url,
      iconSize, // 图标像素大小
      iconAnchor: [20, 20], // 图标锚点位置,20是横坐标中点,100是纵坐标最下端
    });
  };

  disableDrawer = () => {
    if (this.drawer) {
      this.drawer.disable();
    }
  };

  // 画点
  drawPoint = () => {
    this.disableDrawer();
    this.removeAll();
    const { GMap } = window;
    const options = {
      // icon: this.createImgIcon(isDev ? DEV_MARKER_PATH : MARKER_PATH),
    };

    this.drawer = new GMap.Draw.Marker(this.map, options);
    this.drawer.enable();
  };

  // 画线
  drawPolyline = () => {
    this.disableDrawer();
    this.removeAll();

    const { GMap } = window;
    const options = {
      shapeOptions: {
        color: '#ff0000',
        weight: 2,
      },
    };

    this.drawer = new GMap.Draw.Polyline(this.map, options);
    this.drawer.enable();
  };

  // 画面
  drawPolygon = () => {
    this.disableDrawer();
    this.removeAll();

    const { GMap } = window;
    const options = {
      showArea: false,
      shapeOptions: {
        stroke: true,
        color: '#0000ff',
        weight: 1,
        opacity: 0.5,
        fill: true,
        fillColor: '#00ffff', // same as color by default
        fillOpacity: 0.2,
      },
    };

    this.drawer = new GMap.Draw.Polygon(this.map, options);
    this.drawer.enable();
  };

  // 圆
  drawCircle = () => {
    this.disableDrawer();
    this.removeAll();

    const { GMap } = window;
    const options = {
      shapeOptions: {
        stroke: true,
        color: '#444',
        weight: 1,
        opacity: 1,
        fill: true,
        fillColor: '#00ff00',
        fillOpacity: 0.2,
      },
    };

    this.drawer = new GMap.Draw.Circle(this.map, options);
    this.drawer.enable();
  };

  // 矩形
  drawRectangle = () => {
    this.disableDrawer();
    this.removeAll();

    const { GMap } = window;
    const options = {
      showArea: false,
      shapeOptions: {
        stroke: true,
        color: '#0000ff',
        weight: 1,
        opacity: 0.5,
        fill: true,
        fillColor: '#00ffff',
        fillOpacity: 0.2,
      },
    };

    this.drawer = new GMap.Draw.Rectangle(this.map, options);
    this.drawer.enable();
  };

  removeAll = () => {
    const { GMap } = window;
    if (this.map.eachLayer) {
      this.map.eachLayer(layer => {
        if (layer instanceof GMap.Path) {
          this.map.removeLayer(layer);
        }
        if (layer instanceof GMap.Marker) {
          this.map.removeLayer(layer);
        }
      });
    }
    this.setState({
      pointArr: [],
      graph: 'default',
    });
  };

  onSave = () => {
    const { pointArr, graph } = this.state;
    const { onSave } = this.props;
    if (onSave) {
      if (pointArr.length === 0 && this.props.pointArr.length > 0) {
        onSave(this.props.pointArr, this.props.graph);
      } else {
        onSave(pointArr, graph);
      }
    }
  };

  chooseLocal = (local) => {
    const { GMap } = window; 
    this.removeController();
    GMap.Draw.chooseLocal(local);
    this.enableDrawPlugin();
  }

  removeController = () => {
    const { GMap } = window;
    if (this.drawController != null) {
      this.drawController.remove(this.map);
      this.drawController = null;
      this.map.off(GMap.Draw.Event.CREATED);
    }
  }

  render() {
    const { lat, lng } = this.state;
    return (
      <>
        <div id="chosePointMap" style={{ height: '500px' }}>
          <div style={{ position: 'relative', top: '5px', left: '5px', zIndex: '1000' }}>
            <span>
              {formatMessage({ id: 'guet.schedule.longitude' })}: {`${lng}°`}
            </span>
            &nbsp;&nbsp;&nbsp;
            <span>
              {formatMessage({ id: 'guet.schedule.latitude' })}:{`${lat}°`}
            </span>
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <Button onClick={this.drawPoint}>{formatMessage({ id: 'guet.schedule.point' })}</Button>&nbsp;
          <Button onClick={this.drawPolyline}>{formatMessage({ id: 'guet.schedule.line' })}</Button>&nbsp;
          <Button onClick={this.drawPolygon}>{formatMessage({ id: 'guet.schedule.polygone' })}</Button>&nbsp;
          <Button onClick={this.drawRectangle}>{formatMessage({ id: 'guet.schedule.rectangle' })}</Button>&nbsp;
          <Button onClick={this.removeAll} type="danger">
            {formatMessage({ id: 'guet.schedule.delete' })}
          </Button>
          &nbsp;
          <Button onClick={this.onSave} type="primary">
            {formatMessage({ id: 'guet.schedule.save' })}
          </Button>
          &nbsp;
        </div>
      </>
    );
  }
}

export default ChosePoint;
