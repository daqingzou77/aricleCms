!(function() {
  function f(c) {
    if (null != c && 0 != c.length)
      for (var a = 0, b = c.length; a < b; a++) {
        var d = c[a];
        h.test(d)
          ? document.writeln('<link rel="stylesheet" href="' + d + '?time=20180905">')
          : document.writeln(
              '<script type="text/javascript" src="' + d + '?time=20180905">\x3c/script>'
            );
      }
  }
  for (
    var d,
      k = /(^|(.*?\/))(include-lib2.js)(\?|$)/,
      e = document.getElementsByTagName('script'),
      b = 0;
    b < e.length;
    b++
  ) {
    var g = e[b].getAttribute('src');
    if (g && g.match(k)) {
      d = e[b];
      break;
    }
  }
  var h = /\.css/;
  !(function() {
    var c = (d.getAttribute('include') || '').split(','),
      a = d.getAttribute('libpath') || '';
    a.lastIndexOf('/') != a.length - 1 && (a += '/');
    a = {
      jquery: [a + 'jquery/jquery-2.1.4.min.js'],
      'jquery.scrollTo': [a + 'jquery/scrollTo/jquery.scrollTo.min.js'],
      'jquery.minicolors': [
        a + 'jquery/minicolors/jquery.minicolors.css',
        a + 'jquery/minicolors/jquery.minicolors.min.js',
      ],
      'jquery.range': [a + 'jquery/range/range.css', a + 'jquery/range/range.js'],
      ztree: [
        a + 'jquery/ztree/css/zTreeStyle/zTreeStyle.css',
        a + 'jquery/ztree/css/mars/ztree-mars.css',
        a + 'jquery/ztree/js/jquery.ztree.all.min.js',
      ],
      'jquery.mCustomScrollbar': [
        a + 'jquery/mCustomScrollbar/jquery.mCustomScrollbar.css',
        a + 'jquery/mCustomScrollbar/jquery.mCustomScrollbar.js',
      ],
      jedate: [a + 'jquery/jedate/jedate.css', a + 'jquery/jedate/jquery.jedate.js'],
      lazyload: [a + 'jquery/lazyload/jquery.lazyload.min.js'],
      'font-awesome': [a + 'fonts/font-awesome/css/font-awesome.min.css'],
      'web-icons': [a + 'fonts/web-icons/web-icons.css'],
      animate: [a + 'animate/animate.css'],
      admui: [
        a + 'admui/css/index.css',
        a + 'admui/js/global/core.js',
        a + 'admui/js/global/configs/site-configs.js',
        a + 'admui/js/global/components.js',
      ],
      'admui-frame': [a + 'admui/css/site.css', a + 'admui/js/app.js'],
      bootstrap: [a + 'bootstrap/bootstrap.css', a + 'bootstrap/bootstrap.min.js'],
      'bootstrap-table': [
        a + 'bootstrap/bootstrap-table/bootstrap-table.css',
        a + 'bootstrap/bootstrap-table/bootstrap-table.min.js',
        a + 'bootstrap/bootstrap-table/locale/bootstrap-table-zh-CN.js',
      ],
      'bootstrap-select': [
        a + 'bootstrap/bootstrap-select/bootstrap-select.css',
        a + 'bootstrap/bootstrap-select/bootstrap-select.min.js',
      ],
      'bootstrap-checkbox': [a + 'bootstrap/bootstrap-checkbox/awesome-bootstrap-checkbox.css'],
      nprogress: [a + 'nprogress/nprogress.css', a + 'nprogress/nprogress.min.js'],
      toastr: [a + 'toastr/toastr.css', a + 'toastr/toastr.js'],
      formvalidation: [
        a + 'formvalidation/formValidation.css',
        a + 'formvalidation/formValidation.min.js',
        a + 'formvalidation/framework/bootstrap.min.js',
        a + 'formvalidation/language/zh_CN.min.js',
      ],
      'admin-lte': [
        a + 'fonts/font-awesome/css/font-awesome.min.css',
        a + 'admin-lte/css/AdminLTE.min.css',
        a + 'admin-lte/css/skins/skin-blue.min.css',
        a + 'admin-lte/js/adminlte.min.js',
      ],
      ace: [a + 'ace/ace.js'],
      layer: [
        a + 'layer/theme/default/layer.css',
        a + 'layer/theme/retina/retina.css',
        a + 'layer/theme/mars/layer.css',
        a + 'layer/layer.js',
      ],
      haoutil: [a + 'hao/haoutil.js'],
      echarts: [a + 'echarts/echarts.min.js', a + 'echarts/dark.js'],
      'echarts-gl': [a + 'echarts/echarts.min.js', a + 'echarts/echarts-gl.min.js'],
      mapV: [a + 'mapV/mapv.min.js'],
      highlight: [a + 'highlight/styles/foundation.css', a + 'highlight/highlight.pack.js'],
      turf: [a + 'turf/turf.min.js'],
      terraformer: [
        a + 'terraformer/terraformer-1.0.9.min.js',
        a + 'terraformer/terraformer-wkt-parser-1.2.0.min.js',
      ],
      ammo: [a + 'ammo/ammo.js'],
      'cesium-supermap': [
        a + 'Cesium-supermap/Widgets/widgets.css',
        a + 'Cesium-supermap/Cesium.js',
        a + 'cesium-mars/mars3d.css',
        a + 'cesium-mars/mars3d.js',
      ],
      'cesium-mars': [
        a + 'Cesium/Widgets/widgets.css',
        a + 'Cesium/Cesium.js',
        a + 'CesiumPlugins/navigation/viewerCesiumNavigationMixin.css',
        a + 'CesiumPlugins/navigation/viewerCesiumNavigationMixin.min.js',
        a + 'cesium-mars/mars3d.css',
        a + 'cesium-mars/mars3d.js',
      ],
    };
    f(['/plot/lib/hao/noCopy.js']);
    for (var b in c) f(a[c[b]]);
  })();
})();
