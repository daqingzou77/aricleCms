var g_symbolFrame = {};
var defaultSymbolStyles = {
  fill: '#00ff00',
  stroke: '#ff0000',
  strokeWidth: 1.5,
  textx: 500,
  texty: 800,
  symbolSize: 100,
  text: '',
  textcolor: '#ff0000',
  font_size: 30,
};
function clone(from, to) {
  if (from == null || typeof from != 'object') return from;
  if (from.constructor != Object && from.constructor != Array) return from;
  if (
    from.constructor == Date ||
    from.constructor == RegExp ||
    from.constructor == Function ||
    from.constructor == String ||
    from.constructor == Number ||
    from.constructor == Boolean
  )
    return new from.constructor(from);

  to = to || new from.constructor();

  for (var name in from) {
    to[name] = typeof to[name] == 'undefined' ? clone(from[name], null) : to[name];
  }

  return to;
}
function copyOptions(options, defaultOptions) {
  var newOptions = clone(options),
    option;
  for (option in defaultOptions) {
    if (newOptions[option] === undefined) {
      newOptions[option] = clone(defaultOptions[option]);
    }
  }
  return newOptions;
}
//var g_helpob=null;
function showSymbolPanel(px, py) {
  layer.open({
    type: 2,
    shade: 0,
    skin: 'layer-mars-dialog animation-scale-up',
    id: 'LAY_layuipro',
    name: 'MySymbolFrame',
    title: '符号库组件',
    maxmin: false,
    shadeClose: true,
    offset: [px, py],
    area: ['388px', '620px'],
    moveType: 1,
    content: '/view.html',
    success: function(r) {
      g_symbolFrame._dom = r;
    },
  });
}
function openJB() {
  showSymbolPanel(50, 50);
}

function getControlNum(keyid) {
  if (keyid == 2001) return 4;
  if (keyid == 2003) return 2;
  if (keyid == 2004) return 2;
  if (keyid == 2005) return 3;
  if (keyid == 2006) return 3;
  if (keyid == 2011) return 3;
  return -1;
}
function startDrawingSymbol(type, glyphIndex) {
  var _self = this;
  var keyid = glyphIndex;
  if (type == 1) {
    /*this.startDrawingPtSymbol({
         callback: function(position)
         {
         _self.addPtSymAtPos(position, glyphIndex);
         _self.executeListeners({name: 'symbolCreated', position: position,keyid:glyphIndex});
         }
         },"font",glyphIndex);*/
    var n = window[g_symbolFrame._dom.find('iframe')[0].name];
    var style = {};
    style.symbolSize = 100;
    style.symbolSize = 100;
    style = copyOptions(style, defaultSymbolStyles);
    var canv_ = n.drawSymbol(keyid, style);

    var icon = GMap.canvasIcon({
      canvas: canv_,
      iconSize: [100, 100],
      iconAnchor: [20, 70],
      keyid: keyid,
      style: style,
    });
    var options = {
      icon: icon,
    };
    var drawer = new GMap.Draw.Marker(_map, options);
    drawer.enable();
    return;
  } else if (keyid == 937) {
    //线段
    var options = {
      maxPoints: 2,
      shapeOptions: {
        color: '#ff0000',
        weight: 2,
      },
    };
    var drawer = new GMap.Draw.Polyline(_map, options);
    drawer.enable();
  } else if (keyid == 1184) {
    //折线
    var options = {
      shapeOptions: {
        color: '#ff0000',
        weight: 2,
      },
    };
    var drawer = new GMap.Draw.Polyline(_map, options);
    drawer.enable();
  } else if (keyid == 804) {
    //
    var options = {
      shapeOptions: {
        color: '#ff0000',
        weight: 2,
      },
    };
    var drawer = new GMap.Draw.Polyline(_map, options);
    drawer.enable();
  } else if (keyid == 834) {
    //矩形
    var options = {
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

    var drawer = new GMap.Draw.Rectangle(_map, options);
    drawer.enable();
  } else if (keyid == 831) {
    //多边形
    var options = {
      showArea: false,
      maxPoints: 5,
      shapeOptions: {
        stroke: true,
        color: '#0000ff',
        weight: 1,
        opacity: 0.5,
        fill: true,
        fillColor: null, //same as color by default
        fillOpacity: 0.2,
        clickable: true,
        keyid: 2001,
      },
    };

    var drawer = new GMap.Draw.Polygon(_map, options);
    drawer.enable();
  } else if (keyid == 742) {
    //园
    var options = {
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

    var drawer = new GMap.Draw.Circle(_map, options);
    drawer.enable();
  } else if (keyid > 2000) {
    var options = {
      maxPoints: getControlNum(keyid),
      shapeOptions: {
        color: '#ff00ff',
        weight: 2,
        keyid: keyid,
      },
    };

    var drawer = new GMap.Draw.H5JBLineSymbol(_map, options);
    drawer.enable();
  }
}
function showEditPage(type, obj, style) {
  var subframe = window.frames['LAY_layuipro'];
  if (subframe == null) {
    alert('符号面板未开启');
  } else {
    var n = window[g_symbolFrame._dom.find('iframe')[0].name];
    n.showEditProperty(type, obj, style);
  }
}
function _onClick(evt) {
  alert('onclick' + evt);
  var layer = evt.target;
  var icon = layer.options.icon;
  //alert("icon="+icon.options.style);
  alert('icon=' + icon.options.keyid);

  var gid = icon.options.keyid;
  var obj = {};
  obj.gid = gid;
  var style = icon.options.style;
  showEditPage(1, obj, style);
}

var DrawH5Helper = (function() {
  var g_drawJBS = [];
  var g_pointCollection = null;
  // constructor
  function _() {
    this._surfaces = [];
    this.initialiseHandlers();
    this.enhancePrimitives();
    //2018-10-26---zhangjianbing update
    enhanceWithListeners(this);
    // g_pointCollection = new Cesium.BillboardCollection();
    // scene.primitives.add(g_pointCollection);
  }

  _.prototype.initialiseHandlers = function() {
    var _self = this;
  };

  _.prototype.setListener = function(primitive, type, callback) {
    primitive[type] = callback;
  };

  _.prototype.muteHandlers = function(muted) {
    this._handlersMuted = muted;
  };

  // register event handling for an editable shape
  // shape should implement setEditMode and setHighlighted
  _.prototype.registerEditableShape = function(surface) {
    var _self = this;

    // handlers for interactions
    // highlight polygon when mouse is entering
    setListener(surface, 'mouseMove', function(position) {
      surface.setHighlighted(true);
      if (!surface._editMode) {
        _self._tooltip.showAt(position, 'Click to edit this shape');
      }
    });
    // hide the highlighting when mouse is leaving the polygon
    setListener(surface, 'mouseOut', function(position) {
      surface.setHighlighted(false);
      _self._tooltip.setVisible(false);
    });
    setListener(surface, 'leftClick', function(position) {
      //  alert("symbol Clicked!");
      g_pickObj.obj = surface;
      g_pickObj.type = 3;

      surface.setEditMode(true);

      var obj = {};
      obj.fill = true;
      if (surface.material.uniforms.color != null) {
        var strColor = surface.material.uniforms.color.toCssColorString();
        obj.color = strColor;
      }

      obj.gid = surface.keyid;
      showEditPage(3, obj, defaultSymbolStyles);
    });
  };

  _.prototype.startDrawing = function(cleanUp) {
    // undo any current edit of shapes
    this.disableAllEditMode();
    // check for cleanUp first
    if (this.editCleanUp) {
      this.editCleanUp();
    }
    this.editCleanUp = cleanUp;
    this.muteHandlers(true);
  };

  _.prototype.stopDrawing = function() {
    // check for cleanUp first
    if (this.editCleanUp) {
      this.editCleanUp();
      this.editCleanUp = null;
    }
    this.muteHandlers(false);
  };

  // make sure only one shape is highlighted at a time
  _.prototype.disableAllHighlights = function() {
    this.setHighlighted(undefined);
  };

  _.prototype.setHighlighted = function(surface) {
    if (
      this._highlightedSurface &&
      !this._highlightedSurface.isDestroyed() &&
      this._highlightedSurface != surface
    ) {
      this._highlightedSurface.setHighlighted(false);
    }
    this._highlightedSurface = surface;
  };

  _.prototype.disableAllEditMode = function() {
    this.setEdited(undefined);
  };

  _.prototype.setEdited = function(surface) {
    if (this._editedSurface && !this._editedSurface.isDestroyed()) {
      this._editedSurface.setEditMode(false);
    }
    this._editedSurface = surface;
  };

  var defaultSymbolStyles = {
    fill: '#00ff00',
    stroke: '#ff0000',
    strokeWidth: 1.5,
    textx: 500,
    texty: 800,
    symbolSize: 100,
    text: '',
    textcolor: '#ff0000',
    font_size: 30,
  };

  var ChangeablePrimitive = (function() {
    function _() {}

    _.prototype.initialiseOptions = function(options) {
      fillOptions(this, options);
      this._id = undefined;

      // set the flags to initiate a first drawing
      this._createPrimitive = true;
      this._primitive = undefined;
      this._outlinePolygon = undefined;
    };

    _.prototype.setAttribute = function(name, value) {
      this[name] = value;
      this._createPrimitive = true;
    };

    _.prototype.getAttribute = function(name) {
      return this[name];
    };

    _.prototype.update = function(context, frameState, commandList) {};

    _.prototype.isDestroyed = function() {
      return false;
    };

    _.prototype.destroy = function() {};
    return _;
  })();

  _.ExtentPrimitive = (function() {
    function _(options) {
      if (!Cesium.defined(options.extent)) {
        throw new Cesium.DeveloperError('Extent is required');
      }

      options = copyOptions(options, defaultSurfaceOptions);
      this.keyid = 4001;
      this.initialiseOptions(options);

      this.setExtent(options.extent);
    }

    _.prototype = new ChangeablePrimitive();

    _.prototype.setExtent = function(extent) {
      this.setAttribute('extent', extent);
    };

    _.prototype.getExtent = function() {
      return this.getAttribute('extent');
    };

    _.prototype.getGeometry = function() {
      if (!Cesium.defined(this.extent)) {
        return;
      }

      return new Cesium.RectangleGeometry({
        rectangle: this.extent,
        height: this.height,
        vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
        stRotation: this.textureRotationAngle,
        ellipsoid: this.ellipsoid,
        granularity: this.granularity,
      });
    };

    _.prototype.getOutlineGeometry = function() {
      return new Cesium.RectangleOutlineGeometry({
        rectangle: this.extent,
      });
    };

    return _;
  })();

  _.PolygonPrimitive = (function() {
    function _(options) {
      options = copyOptions(options, defaultSurfaceOptions);
      this.keyid = 4002;
      this.initialiseOptions(options);
      this.isPolygon = true;
    }
    _.prototype = new ChangeablePrimitive();
    _.prototype.setPositions = function(positions) {
      this.setAttribute('positions', positions);
    };

    _.prototype.getPositions = function() {
      return this.getAttribute('positions');
    };

    _.prototype.getGeometry = function() {};

    _.prototype.getOutlineGeometry = function() {
      return Cesium.PolygonOutlineGeometry.fromPositions({
        positions: this.getPositions(),
      });
    };

    return _;
  })();

  _.ArrowPrimitive = (function() {
    function _(options) {
      this.isPolygon = true;
      this.keyid = options.keyid;
    }
    _.prototype = new ChangeablePrimitive();
    _.prototype.setPositions = function(positions) {
      this.setAttribute('positions', positions);
    };
    _.prototype.getPositions = function() {
      return this.getAttribute('positions');
    };
    _.prototype.getGeometry = function() {
      if (!Cesium.defined(this.positions) || this.positions.length < 2) {
        return;
      }
      var flag = false;
      var pts = [];
      if (this.keyid == 2001) {
        if (this.positions.length >= 4) {
          for (var p = 0; p < 4; p++) {
            var cartographic = Cesium.Cartographic.fromCartesian(this.positions[p]);
            var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
            var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
            pts.push(parseFloat(longitudeString));
            pts.push(parseFloat(latitudeString));
          }
          flag = true;
        }
      } else if (this.keyid == 2003 || this.keyid == 2004) {
        for (var p = 0; p < 2; p++) {
          var cartographic = Cesium.Cartographic.fromCartesian(this.positions[p]);
          var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
          var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
          pts.push(parseFloat(longitudeString));
          pts.push(parseFloat(latitudeString));
        }
        flag = true;
      } else if (this.keyid == 2005 || this.keyid == 2006) {
        if (this.positions.length >= 3) {
          for (var p = 0; p < 3; p++) {
            var cartographic = Cesium.Cartographic.fromCartesian(this.positions[p]);
            var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
            var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
            pts.push(parseFloat(longitudeString));
            pts.push(parseFloat(latitudeString));
          }
          flag = true;
        }
      } else if (this.keyid == 2011) {
        if (this.positions.length >= 3) {
          for (var p = 0; p < 3; p++) {
            var cartographic = Cesium.Cartographic.fromCartesian(this.positions[p]);
            var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
            var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
            pts.push(parseFloat(longitudeString));
            pts.push(parseFloat(latitudeString));
          }
          flag = true;
        }
      } else if (this.keyid == 2008) {
        if (this.positions.length >= 3) {
          for (var p = 0; p < this.positions.length; p++) {
            var cartographic = Cesium.Cartographic.fromCartesian(this.positions[p]);
            var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
            var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
            pts.push(parseFloat(longitudeString));
            pts.push(parseFloat(latitudeString));
          }
          flag = true;
        }
      }
      if (flag == true) {
        // var pnts2=H5JB.JBUtil.getJBArray(this.keyid,pts);
        var pnts2 = H5JB_getJBArray(this.keyid, pts);
        var pArray = [];
        for (var i = 0; i < pnts2.length; i++) {
          pArray.push(pnts2[i][0]);
          pArray.push(pnts2[i][1]);
        }
        var newpts = Cesium.Cartesian3.fromDegreesArray(pArray);
        return Cesium.PolygonGeometry.fromPositions({
          positions: newpts,
          height: this.height,
          vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
          stRotation: this.textureRotationAngle,
          ellipsoid: this.ellipsoid,
          granularity: this.granularity,
        });
      }

      return Cesium.PolygonGeometry.fromPositions({
        positions: this.positions,
        height: this.height,
        vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
        stRotation: this.textureRotationAngle,
        ellipsoid: this.ellipsoid,
        granularity: this.granularity,
      });
    };

    _.prototype.getOutlineGeometry = function() {
      return Cesium.PolygonOutlineGeometry.fromPositions({
        positions: this.getPositions(),
      });
    };

    return _;
  })();

  _.CirclePrimitive = (function() {
    function _(options) {}

    _.prototype = new ChangeablePrimitive();

    _.prototype.setCenter = function(center) {
      this.setAttribute('center', center);
    };

    _.prototype.setRadius = function(radius) {
      this.setAttribute('radius', Math.max(0.1, radius));
    };

    _.prototype.getCenter = function() {
      return this.getAttribute('center');
    };

    _.prototype.getRadius = function() {
      return this.getAttribute('radius');
    };

    _.prototype.getGeometry = function() {
      if (!(Cesium.defined(this.center) && Cesium.defined(this.radius))) {
        return;
      }

      return new Cesium.CircleGeometry({
        center: this.center,
        radius: this.radius,
        height: this.height,
        vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
        stRotation: this.textureRotationAngle,
        ellipsoid: this.ellipsoid,
        granularity: this.granularity,
      });
    };

    _.prototype.getOutlineGeometry = function() {
      return new Cesium.CircleOutlineGeometry({
        center: this.getCenter(),
        radius: this.getRadius(),
      });
    };

    return _;
  })();

  _.EllipsePrimitive = (function() {
    function _(options) {}
    _.prototype = new ChangeablePrimitive();

    _.prototype.setCenter = function(center) {
      this.setAttribute('center', center);
    };

    _.prototype.getCenter = function() {
      return this.getAttribute('center');
    };

    _.prototype.getRotation = function() {
      return this.getAttribute('rotation');
    };

    _.prototype.getGeometry = function() {
      if (
        !(
          Cesium.defined(this.center) &&
          Cesium.defined(this.semiMajorAxis) &&
          Cesium.defined(this.semiMinorAxis)
        )
      ) {
        return;
      }

      return new Cesium.EllipseGeometry({
        ellipsoid: this.ellipsoid,
        center: this.center,
        semiMajorAxis: this.semiMajorAxis,
        semiMinorAxis: this.semiMinorAxis,
        rotation: this.rotation,
        height: this.height,
        vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
        stRotation: this.textureRotationAngle,
        granularity: this.granularity,
      });
    };

    _.prototype.getOutlineGeometry = function() {
      return new Cesium.EllipseOutlineGeometry({
        center: this.getCenter(),
        semiMajorAxis: this.getSemiMajorAxis(),
        semiMinorAxis: this.getSemiMinorAxis(),
        rotation: this.getRotation(),
      });
    };

    return _;
  })();

  _.PolylinePrimitive = (function() {
    function _(options) {}

    _.prototype = new ChangeablePrimitive();

    _.prototype.setPositions = function(positions) {
      this.setAttribute('positions', positions);
    };

    _.prototype.setWidth = function(width) {
      this.setAttribute('width', width);
    };

    _.prototype.getPositions = function() {
      return this.getAttribute('positions');
    };

    _.prototype.getWidth = function() {
      return this.getAttribute('width');
    };
    _.prototype.getGeometry = function() {};

    return _;
  })();

  _.prototype.startDrawingPtSymbol = function(options, fontfile, key) {};

  _.prototype.startDrawingPolygon = function(options) {};

  _.prototype.startDrawingArrow = function(options) {};

  _.prototype.startDrawingPolyline = function(options) {};

  _.prototype.startDrawingPolyshape = function(isPolygon, options) {};

  _.prototype.startDrawingArrowShape = function(isPolygon, options) {};

  _.prototype.startDrawingExtent = function(options) {};

  _.prototype.startDrawingCircle = function(options) {};
  _.prototype.addPtSymAtPos = function(position, keyid) {};
  _.prototype.startDrawingSymbol = function(type, glyphIndex) {};

  _.prototype.startDrawingImgSymbol = function(strimg) {
    var _self = this;
  };
  _.prototype.removeAll = function() {
    g_drawJBS = [];
  };

  _.prototype.isArray = function(e) {
    return 'object' == typeof e && e.constructor == Array;
  };

  _.prototype.getPositionsFromJson = function(e) {
    if (!e) return null;
    switch (e.type) {
      case 'Point':
        var t = e.coordinates;
        return 1 == t.length && this.isArray(t[0]) && (t = t[0]), this.lonLatToCartesian(t);
      case 'MultiPoint':
      case 'LineString':
        return this.lonLatsToCartesians(e.coordinates);
      case 'MultiLineString':
      case 'Polygon':
        return this.lonLatsToCartesians(e.coordinates[0]);
      case 'MultiPolygon':
        return this.lonLatsToCartesians(e.coordinates[0][0]);
      case 'Arrow':
        return this.lonLatsToCartesians(e.coordinates);
      default:
        throw new Error('Invalid GeoJSON object.');
    }
  };

  _.prototype.addPtSymbolStyle = function(position, keyid, style, sid) {
    var n = window[g_symbolFrame._dom.find('iframe')[0].name];
  };

  _.prototype.readPtSymbol = function(e) {
    var r = JSON.parse(e);
    for (var n = [], a = r.features, o = 0; o < a.length; o++) {
      var s = a[o];
      switch (s.geometry.type) {
        case 'MultiPolygon':
        case 'Polygon':
          s.properties.type = 'polygon';
          break;
        case 'MultiLineString':
        case 'LineString':
          s.properties.type = 'polyline';
          break;
        case 'MultiPoint':
        case 'Point':
          s.properties.type = 'point';
          break;
        case 'Arrow':
          s.properties.type = 'Arrow';
          break;
      }
      var l = s.properties.type;
      if (s.properties.type == 'point') {
        var c = this.getPositionsFromJson(s.geometry);
        this.addPtSymbolStyle(c, s.key, s.properties, s.id);
      } else if (s.properties.type == 'Arrow') {
        this.addLineSymbolStyle(s.geometry.coordinates, s.key, s.properties);
      }
    }
    var _self = this;
    var objArray = [];
    for (var i = 0; i < g_pointCollection.length; i++) {
      var bill = g_pointCollection.get(i);
      var t = this.getCoordinates([bill.position]);
      var s = bill._imageId;
      var gid = s.split('_')[1];
      var obj = {
        type: 'Feature',
        id: bill.id,
        key: gid,
        properties: bill.style,
        geometry: {
          type: 'Point',
          coordinates: t[0],
        },
      };
      objArray.push(obj);
    }
    return { features: objArray };
  };
  _.prototype.savePtSymbol = function() {
    var _self = this;
    var objArray = [];
    for (var i = 0; i < g_pointCollection.length; i++) {
      var bill = g_pointCollection.get(i);
      var t = this.getCoordinates([bill.position]);
      var s = bill._imageId;
      var gid = s.split('_')[1];
      var obj = {
        type: 'Feature',
        id: bill.id,
        key: gid,
        properties: bill.style,
        geometry: {
          type: 'Point',
          coordinates: t[0],
        },
      };
      objArray.push(obj);
    }
    return { features: objArray };
  };
  _.prototype.saveLineSymbols = function() {
    var _self = this;
    var objArray = [];
    for (var i = 0; i < g_drawJBS.length; i++) {
      var bill = g_drawJBS[i];
      var t = this.getCoordinates(bill.positions);

      var obj = {
        type: 'Feature',
        id: bill.id,
        key: bill.keyid,
        properties: bill.style,
        geometry: {
          type: 'Arrow',
          coordinates: t,
        },
      };
      objArray.push(obj);
    }
    return { features: objArray };
  };
  _.prototype.saveSymbols = function() {
    var _self = this;
    var objArray = [];
    for (var i = 0; i < g_pointCollection.length; i++) {
      var bill = g_pointCollection.get(i);
      var t = this.getCoordinates([bill.position]);
      var s = bill._imageId;
      var gid = s.split('_')[1];
      var obj = {
        type: 'Feature',
        id: bill.id,
        key: gid,
        properties: bill.style,
        geometry: {
          type: 'Point',
          coordinates: t[0],
        },
      };
      objArray.push(obj);
    }
    for (var i = 0; i < g_drawJBS.length; i++) {
      var bill = g_drawJBS[i];
      var t = this.getCoordinates(bill.positions);
      var obj = {
        type: 'Feature',
        id: bill.id,
        key: bill.keyid,
        properties: bill.style,
        geometry: {
          type: 'Arrow',
          coordinates: t,
        },
      };
      objArray.push(obj);
    }
    return { features: objArray };
  };

  var g_symbolFrame = {};
  _.prototype.showSymbolPanel = function(px, py) {
    var self = this;
    layer.open({
      type: 2,
      shade: 0,
      skin: 'layer-mars-dialog animation-scale-up',
      id: 'LAY_layuipro',
      name: 'MySymbolFrame',
      title: '符号库组件',
      maxmin: false,
      shadeClose: true,
      offset: [px, py],
      area: ['400px', '620px'],
      moveType: 1,
      content: '/view.html',
      success: function(r) {
        g_symbolFrame._dom = r;
      },
    });
  };

  _.prototype.updateAttribute = function(e, t) {
    (e = e || {}),
      (e.style = e.style || {}),
      null == t &&
        (t = {
          scale: 1,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        });
    for (var i in e.style) {
      var r = e.style[i];
      switch (i) {
        default:
          t[i] = r;
          break;
        case 'font_style':
        case 'font_weight':

        case 'font_family':
        case 'text':
        case 'scaleByDistance_near':
        case 'scaleByDistance_nearValue':
        case 'scaleByDistance_far':
        case 'scaleByDistance_farValue':
        case 'distanceDisplayCondition_far':
        case 'distanceDisplayCondition_near':
        case 'background_opacity':
          break;
        case 'font_size':
          t.font_size = r;
          break;
        case 'color':
          t.fillColor = new Cesium.Color.fromCssColorString(r || '#ffffff').withAlpha(
            Number(e.style.opacity || 1)
          );
          break;
        case 'border':
          t.style = r ? Cesium.LabelStyle.FILL_AND_OUTLINE : Cesium.LabelStyle.FILL;
          break;
        case 'border_color':
          t.outlineColor = new Cesium.Color.fromCssColorString(r || '#000000').withAlpha(
            Number(e.style.opacity || 1)
          );
          break;
        case 'border_width':
          t.outlineWidth = r;
          break;
        case 'background':
          t.showBackground = r;
          break;
        case 'background_color':
          t.backgroundColor = new Cesium.Color.fromCssColorString(r || '#000000').withAlpha(
            Number(e.style.background_opacity || e.style.opacity || 0.5)
          );
          break;
        case 'pixelOffset':
          t.pixelOffset = new Cesium.Cartesian2(e.style.pixelOffset[0], e.style.pixelOffset[1]);
          break;
        case 'scaleByDistance':
          t.scaleByDistance = r
            ? new Cesium.NearFarScalar(
                Number(e.style.scaleByDistance_near || 1e3),
                Number(e.style.scaleByDistance_nearValue || 1),
                Number(e.style.scaleByDistance_far || 1e6),
                Number(e.style.scaleByDistance_farValue || 0.1)
              )
            : null;
          break;
        case 'distanceDisplayCondition':
          t.distanceDisplayCondition = r
            ? new Cesium.DistanceDisplayCondition(
                Number(e.style.distanceDisplayCondition_near || 0),
                Number(e.style.distanceDisplayCondition_far || 1e5)
              )
            : null;
          break;
        case 'symbolSize':
          t.symbolSize = 40 + r * 300;
          break;
        case 'textx':
          t.textx = r * 1600;
          break;
        case 'texty':
          t.texty = r * 1600;
          break;
      }
    }
    //t.text = (e.style.text || "文字").replace(new RegExp("<br />", "gm"), "\n");
    t.text = e.style.text;
    var n =
      (e.style.font_style || 'normal') +
      ' small-caps ' +
      (e.style.font_weight || 'normal') +
      ' ' +
      (e.style.font_size || '25') +
      'px ' +
      (e.style.font_family || '楷体');
    t.font = n;

    if (g_pickObj.type == 1) {
      //点符号处理,调整大小颜色
      var n = window[g_symbolFrame._dom.find('iframe')[0].name];
      var style = t;
      //style.symbolSize=t.symbolSize;
      //style.symbolSize=t.symbolSize;
      style = copyOptions(style, defaultSymbolStyles);
      //2018-10-30
      //if(!g_pickObj.obj.style)
      //{
      //    g_pickObj.obj.style={};
      //}
      //g_pickObj.obj.style=
      mergeOptions(style, g_pickObj.obj.style);

      g_pickObj.obj.setImage(
        'gg_' + g_pickObj.gid + '_' + Math.random(),
        n.drawSymbol(g_pickObj.gid, style)
      );
      g_pickObj.obj.setEditable();
    } else if (g_pickObj.type != null) {
      var material1 = Cesium.Material.fromType('Color');
      material1.uniforms.color = t.fillColor;
      g_pickObj.obj.material = material1;
      g_pickObj.obj.style.fillColor = t.fillColor;
    }
    return t;
  };

  function createTooltip(frameDiv) {
    var tooltip = function(frameDiv) {
      var div = document.createElement('DIV');
      div.className = 'twipsy right';

      var arrow = document.createElement('DIV');
      arrow.className = 'twipsy-arrow';
      div.appendChild(arrow);

      var title = document.createElement('DIV');
      title.className = 'twipsy-inner';
      div.appendChild(title);

      this._div = div;
      this._title = title;

      // add to frame div and display coordinates
      frameDiv.appendChild(div);
    };

    tooltip.prototype.setVisible = function(visible) {
      this._div.style.display = visible ? 'block' : 'none';
    };

    tooltip.prototype.showAt = function(position, message) {
      if (position && message) {
        this.setVisible(true);
        this._title.innerHTML = message;
        this._div.style.left = position.x + 10 + 'px';
        this._div.style.top = position.y - this._div.clientHeight / 2 + 'px';
      }
    };

    return new tooltip(frameDiv);
  }

  function clone(from, to) {
    if (from == null || typeof from != 'object') return from;
    if (from.constructor != Object && from.constructor != Array) return from;
    if (
      from.constructor == Date ||
      from.constructor == RegExp ||
      from.constructor == Function ||
      from.constructor == String ||
      from.constructor == Number ||
      from.constructor == Boolean
    )
      return new from.constructor(from);

    to = to || new from.constructor();

    for (var name in from) {
      to[name] = typeof to[name] == 'undefined' ? clone(from[name], null) : to[name];
    }

    return to;
  }

  function mergeOptions(from, to) {
    for (var name in from) {
      to[name] = from[name];
    }

    return to;
  }

  function fillOptions(options, defaultOptions) {
    options = options || {};
    var option;
    for (option in defaultOptions) {
      if (options[option] === undefined) {
        options[option] = clone(defaultOptions[option]);
      }
    }
  }

  // shallow copy
  function copyOptions(options, defaultOptions) {
    var newOptions = clone(options),
      option;
    for (option in defaultOptions) {
      if (newOptions[option] === undefined) {
        newOptions[option] = clone(defaultOptions[option]);
      }
    }
    return newOptions;
  }

  function setListener(primitive, type, callback) {
    primitive[type] = callback;
  }

  function enhanceWithListeners(element) {
    element._listeners = {};

    element.addListener = function(name, callback) {
      this._listeners[name] = this._listeners[name] || [];
      this._listeners[name].push(callback);
      return this._listeners[name].length;
    };

    element.executeListeners = function(event, defaultCallback) {
      if (this._listeners[event.name] && this._listeners[event.name].length > 0) {
        var index = 0;
        for (; index < this._listeners[event.name].length; index++) {
          this._listeners[event.name][index](event);
        }
      } else {
        if (defaultCallback) {
          defaultCallback(event);
        }
      }
    };
  }

  function showEditPage(type, obj, style) {
    var subframe = window.frames['LAY_layuipro'];
    if (subframe == null) {
      alert('符号面板未开启');
    } else {
      var n = window[g_symbolFrame._dom.find('iframe')[0].name];
      n.showEditProperty(type, obj, style);
    }
  }

  return _;
})();

var g_pickObj = {};
g_pickObj.type = null;
g_pickObj.obj = null;
