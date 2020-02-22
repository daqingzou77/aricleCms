import moment from 'moment';
import { formatMessage as _formatMessage } from 'umi/locale';

const formatMessage = id => {
  return _formatMessage({ id });
};

export function loadMap(id) {
  // 定义全局变量来存放地图对象
  let _map = null;

  const { GMap } = window;
  // 地图服务器的访问参数
  // todo uop 服务器
  // const host = 'www.jinlutech.cn'; // 服务器地址
  // let host = 'uop.ch722.com'; // uop 服务器地址
  // let host = `${window.location.host}`; // uop 服务器地址
  const host = process.env.MAP_HOST; // uop 服务器地址
  const port = process.env.MAP_PORT; // 服务器端口
  let vector = 'Lao_A'; // 矢量切片地图
  let crs = '';

  if (process.env.ENV === 'dev') {
    vector = 'vector';
    crs = GMap.CRS.Tianditu; // 坐标系
  } else if (process.env.ENV === 'prod') {
    // 服务器端口
    vector = 'Lao_A';
    crs = GMap.CRS.PGIS;
  }

  function loadMap() {
    // 通过指定参数初始化一个GMap对象
    if (typeof GMap === 'undefined') {
      console.log('map is undefined');
      return;
    }
    // if (active === 'dev') {
    // crs = GMap.CRS.Tianditu;
    // }
    _map = GMap.map(id, {
      center: [29.557156, 106.577026],
      zoom: 4, // 初始缩放级别
      minZoom: 2,
      maxZoom: 8,
      crs,
      maxBounds: [[-90, -180], [90, 180]],
      renderer: GMap.canvas(),
      doubleClickZoom: true,
      keyboard: false, // 使用键盘箭头和+/-键键导航地图
      scrollWheelZoom: true, // 使用鼠标滚轮缩放地图
      zoomControl: false, // 缩放控件添加到地图中
    });

    _map.whenReady(function () {
      // 加载背景图层
      GMap.tileLayerQSImg(host, port, vector).addTo(_map);
      // 在启动阶段加载矢量图元绘制模块; 也可以先不加载，在后续使用时再实时加载。
      loadDrawPlugin();
    });
    window._map = _map;
  }

  function loadDrawPlugin() {
    GMap.pluginManager().load('draw', {
      done() {
        enableDrawPlugin();
      },
      error(f) {
        console.log(`加载插件库${f}失败`);
      },
    });
  }


  // 用于存放绘制图元的矢量图层
  let _drawnItems = null;
  // 图元绘制控件对象
  let _drawController = null;

  function enableDrawPlugin() {
    // 如果已经启用了绘制控件，直接返回
    if (_drawController != null) {
      return;
    }

    if (_drawnItems == null) {
      // 初始化存放绘制图元的矢量图层
      _drawnItems = GMap.featureGroup().addTo(_map);
    }

    // 监听图元绘制完成的消息，并将新加图元添加到地图上
    _map.on(GMap.Draw.Event.CREATED, function (event) {
      const { layer } = event;
      _drawnItems.addLayer(layer);
      layer.on('click', _onClick, this);
    });
  }

  let grphs = {};

  function removeById(id) {
    _map.eachLayer(function (layer) {
      if (layer._gmap_id === id) {
        _map.removeLayer(layer);
      }
    });
  }

  function drawMarker(pointArr, event) {
    if (grphs[event.id]) {
      removeById(grphs[event.id]);
      delete grphs[event.id];
      return;
    }

    const node = `<div>${formatMessage('guet.schedule.time_of_occurrence')}: ${moment(
      event.happenTime
    ).format('DD/MM/YYYY HH:mm:ss')}<br/>
    ${formatMessage('guet.schedule.event_name')}: ${event.eventName}<br/>${formatMessage(
      'guet.schedule.happen_place'
    )}: ${event.place}</div>`;
    const marker = GMap.marker(pointArr[0])
      .addTo(_map)
      .bindPopup(node)
      .openPopup();
    grphs[event.id] = marker._gmap_id;
  }

  function drawPolyline(pointArr, event) {
    if (grphs[event.id]) {
      removeById(grphs[event.id]);
      delete grphs[event.id];
      return;
    }
    const node = `<div>${formatMessage('guet.schedule.time_of_occurrence')}: ${moment(
      event.happenTime
    ).format('DD/MM/YYYY HH:mm:ss')}<br/>
    ${formatMessage('guet.schedule.event_name')}: ${event.eventName}<br/>${formatMessage(
      'guet.schedule.happen_place'
    )}: ${event.place}</div>`;
    const polyline = GMap.polyline(pointArr, {
      color: '#ff0000',
      weight: 2,
    })
      .addTo(_map)
      .bindPopup(node)
      .openPopup();
    grphs[event.id] = polyline._gmap_id;
  }

  function drawPolygon(pointArr, event) {
    if (grphs[event.id]) {
      removeById(grphs[event.id]);
      delete grphs[event.id];
      return;
    }
    const node = `<div>${formatMessage('guet.schedule.time_of_occurrence')}: ${moment(
      event.happenTime
    ).format('DD/MM/YYYY HH:mm:ss')}<br/>
    ${formatMessage('guet.schedule.event_name')}: ${event.eventName}<br/>${formatMessage(
      'guet.schedule.happen_place'
    )}: ${event.place}</div>`;
    const polygon = GMap.polygon(pointArr, {
      color: '#0000ff',
      opacity: 0.5,
      fill: true,
      fillColor: '#00ffff',
      fillOpacity: 0.2,
      weight: 1,
    })
      .addTo(_map)
      .bindPopup(node)
      .openPopup();
    grphs[event.id] = polygon._gmap_id;
  }

  function drawCircle() {
    const options = {
      shapeOptions: {
        stroke: true,
        color: '#444',
        weight: 1,
        opacity: 1,
        fill: true,
        fillColor: '#00ff00',
        fillOpacity: 0.2,
        clickable: true,
      },
    };

    const drawer = new GMap.Draw.Circle(_map, options);
    drawer.enable();
  }

  function drawRectangle() {
    const options = {
      showArea: false,
      shapeOptions: {
        stroke: true,
        color: '#444',
        weight: 1,
        opacity: 0.8,
        fill: true,
        fillColor: '#00ffff',
        fillOpacity: 0.2,
        clickable: true,
      },
    };

    const drawer = new GMap.Draw.Rectangle(_map, options);
    drawer.enable();
  }

  // 用户自定义图标
  function createCustomIcon() {
    const myIcon = GMap.icon({
      iconUrl: '/images/soldier.png',
      // Retina 是对高清屏显示时的设置,使用两倍大的图片
      iconRetinaUrl: '/images/soldier.png@2x.png',
      iconSize: [41, 100], // 图标像素大小
      iconAnchor: [20, 100], // 图标锚点位置,20是横坐标中点,100是纵坐标最下端
      popupAnchor: [0, -105], // 弹出窗口位置 (是相对于锚点的位置)
      shadowUrl: '/images/marker-shadow.png',
      shadowRetinaUrl: '/images/marker-shadow.png@2x.png',
      shadowSize: [68, 95], // 图标阴影大小
      shadowAnchor: [29, 94], // 图标阴影的锚点
    });
    return myIcon;
  }

  // --------------------------------------------------------------

  function removeAll() {
    _map.eachLayer(function (layer) {
      if (layer instanceof GMap.Path) {
        _map.removeLayer(layer);
      }
      if (layer instanceof GMap.Marker) {
        _map.removeLayer(layer);
      }
    });
    grphs = {};
  }

  // --------------------------------------------------------------
  // 编辑图元的函数

  let _editing_feature = null;

  function editMarker() {
    const myIcon = createCustomIcon();
    const marker = GMap.marker([30.661057, 104.081757], {
      icon: myIcon, // 使用用户自定义的图标
    });
    marker.addTo(_map);
    marker.editing.enable();
    _editing_feature = marker;
  }

  function editPolygon() {
    const latlngs = [
      [30.661057, 104.081757],
      [29.558176, 106.510338],
      [28.200825, 112.98127],
      [28.675991, 115.899918],
      [26.078591, 119.297813],
      [31.106981, 121.37156],
    ];
    const polygon = GMap.polygon(latlngs, {
      color: 'green',
      fillColor: 'yellow',
      fillOpacity: 0.3,
      weight: 1,
    }).addTo(_map);
    _map.fitBounds(polygon.getBounds());
    polygon.editing.enable();
    _editing_feature = polygon;
  }

  function editPolyline() {
    const latlngs = [
      [30.661057, 104.081757],
      [29.558176, 106.510338],
      [28.200825, 112.98127],
      [30.567514, 114.291939],
      [31.863255, 117.275703],
      [31.106981, 121.37156],
    ];
    const polyline = GMap.polyline(latlngs, {
      color: 'red',
      weight: 4,
      opacity: 0.6,
    }).addTo(_map);
    _map.fitBounds(polyline.getBounds());
    polyline.editing.enable();
    _editing_feature = polyline;
  }

  function editCircle() {
    const circle = GMap.circle([39.923615, 112.380943], {
      radius: 250000,
      fill: true,
      color: '#0000ff',
      weight: 2,
      stroke: true,
      fillOpacity: 0.2,
    }).addTo(_map);
    _map.fitBounds(circle.getBounds());
    circle.editing.enable();
    _editing_feature = circle;
  }

  function editRectangle() {
    const bounds = [[21.501, 119.197], [25.713, 122.457]];
    const rect = GMap.rectangle(bounds, {
      fillColor: '#3366cc',
      color: '#ff0000',
      weight: 1,
    }).addTo(_map);
    _map.flyTo(rect.getBounds().getCenter(), 6);
    rect.editing.enable();
    _editing_feature = rect;
  }

  // 结束编辑时，获取编辑状态和数据
  function saveEditing() {
    console.log(`Is changed : ${_editing_feature.edited == true}`);
    console.log(_editing_feature.toGeoJSON());
    _editing_feature.editing.disable();
  }

  const _canvasIcons = [];

  function addCanvasMarker() {
    const cities = [
      { name: '成都', latlng: [30.661057, 104.081757] },
      { name: '重庆', latlng: [29.558176, 106.510338] },
      { name: '长沙', latlng: [28.200825, 112.98127] },
    ];

    for (const i in cities) {
      const city = cities[i];
      // 必须每次都创建一个新的canvas对象
      const canvasIcon = createCanvasIcon();

      const marker = GMap.marker(city.latlng, {
        riseOnHover: true,
        icon: canvasIcon,
      }).bindPopup(`<h4>${city.name}</h4>`);
      marker.addTo(_drawnItems);

      // 保存canvas对象，便于changeMarkerColor函数对canvas对象做重新绘制。非必要
      _canvasIcons.push(canvasIcon);
    }

    _map.flyTo([28.200825, 112.98127], 5);
  }

  function drawCanvasMarker() {
    const canvasIcon = createCanvasIcon();
    const drawer = new GMap.Draw.Marker(_map, {
      icon: canvasIcon,
      riseOnHover: true,
    });
    drawer.enable();

    // 保存canvas对象，便于changeMarkerColor函数对canvas对象做重新绘制。非必要
    _canvasIcons.push(canvasIcon);
  }

  function createCanvasIcon() {
    // 创建一个Canvas对象，并将其作为 GMap.canvasIcon 的参数
    const cnvs = document.createElement('canvas');
    // 这里一定要指定一个size值，不然默认的canvas大小显示有问题
    cnvs.width = 10;
    cnvs.height = 10;
    const ctx = cnvs.getContext('2d');
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(0, 0, 10, 10);

    const icon = GMap.canvasIcon({
      canvas: cnvs,
      iconSize: [10, 10],
      iconAnchor: [5, 5],
    });

    return icon;
  }

  // 通过重新绘制 Canvas 实现 Marker 的显示样式
  function changeMarkerColor() {
    for (let i = 0; i < _canvasIcons.length; i++) {
      const { canvas } = _canvasIcons[i].options;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#0000FF';
      ctx.fillRect(0, 0, 10, 10);
    }
  }

  function _onClick(evt) {
    const layer = evt.target;
    const { icon } = layer.options;
    const gid = icon.options.keyid;
    const obj = {};
    obj.gid = gid;
    const { style } = icon.options;
    window.showEditPage(1, obj, style);
  }

  /* 地图放大功能 */
  function zoomIn(t, e) {
    _map.zoomIn(t, e);
  }

  /* 地图缩小功能 */
  function zoomOut(t, e) {
    _map.zoomOut(t, e);
  }

 
   // 选择提示的语言
   function chooseLocal(local) {
    removeController();
    GMap.Draw.chooseLocal(local);
    enableDrawPlugin();
  }

  
  // 关闭绘制控件
  function removeController() {
    if (_drawController != null) {
      _drawController.remove(_map);
      _drawController = null;
      _map.off(GMap.Draw.Event.CREATED);
    }
  }

  loadMap();
  return {
    drawMarker,
    drawPolyline,
    drawPolygon,
    drawCircle,
    drawRectangle,
    createCustomIcon,
    removeAll,
    editMarker,
    editPolygon,
    editPolyline,
    editCircle,
    editRectangle,
    saveEditing,
    addCanvasMarker,
    drawCanvasMarker,
    createCanvasIcon,
    changeMarkerColor,
    _onClick,
    zoomIn,
    zoomOut,
    chooseLocal,
    removeController
  };
}

export function openJB() {
  window.showSymbolPanel(50, 50);
}
