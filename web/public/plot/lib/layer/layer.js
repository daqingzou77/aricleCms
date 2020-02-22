/* 2018-9-7 21:22:43 | 版权所有 火星科技 http://marsgis.cn  【联系我们QQ：516584683，微信：marsgis】 */
!(function(r, e) {
  'use strict';
  var c,
    d,
    t,
    n = r.layui && layui.define,
    u = {
      getPath: (function() {
        var e = document.scripts,
          t = e[e.length - 1],
          i = t.src;
        if (!t.getAttribute('merge')) return i.substring(0, i.lastIndexOf('/') + 1);
      })(),
      config: {},
      end: {},
      minIndex: 0,
      minLeft: [],
      btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;'],
      type: ['dialog', 'page', 'iframe', 'loading', 'tips'],
      getStyle: function(e, t) {
        var i = e.currentStyle ? e.currentStyle : r.getComputedStyle(e, null);
        return i[i.getPropertyValue ? 'getPropertyValue' : 'getAttribute'](t);
      },
      link: function(e, t, i) {},
    },
    f = null,
    y = {
      v: '3.1.0',
      ie: ((t = navigator.userAgent.toLowerCase()),
      !!(r.ActiveXObject || 'ActiveXObject' in r) && ((t.match(/msie\s(\d+)/) || [])[1] || '11')),
      index: r.layer && r.layer.v ? 1e5 : 0,
      path: u.getPath,
      config: function(e, t) {
        return (
          (e = e || {}),
          (y.cache = u.config = c.extend({}, u.config, e)),
          (y.path = u.config.path || y.path),
          'string' == typeof e.extend && (e.extend = [e.extend]),
          u.config.path && y.ready(),
          e.extend && (n ? layui.addcss('modules/layer/' + e.extend) : u.link('theme/' + e.extend)),
          this
        );
      },
      ready: function(e) {
        var t = 'layer',
          i = (n ? 'modules/layer/' : 'theme/') + 'default/layer.css?v=' + y.v;
        return n ? layui.addcss(i, e, t) : u.link(i, e, t), this;
      },
      alert: function(e, t, i) {
        var n = 'function' == typeof t;
        return n && (i = t), y.open(c.extend({ content: e, yes: i }, n ? {} : t));
      },
      confirm: function(e, t, i, n) {
        var a = 'function' == typeof t;
        return (
          a && ((n = i), (i = t)),
          y.open(c.extend({ content: e, btn: u.btn, yes: i, btn2: n }, a ? {} : t))
        );
      },
      msg: function(e, t, i) {
        var n = 'function' == typeof t,
          a = u.config.skin,
          o = (a ? a + ' ' + a + '-msg' : '') || 'layui-layer-msg',
          s = p.anim.length - 1;
        return (
          n && (i = t),
          y.open(
            c.extend(
              {
                content: e,
                time: 3e3,
                shade: !1,
                skin: o,
                title: !1,
                closeBtn: !1,
                btn: !1,
                resize: !1,
                end: i,
              },
              n && !u.config.skin
                ? { skin: o + ' layui-layer-hui', anim: s }
                : ((-1 === (t = t || {}).icon || (void 0 === t.icon && !u.config.skin)) &&
                    (t.skin = o + ' ' + (t.skin || 'layui-layer-hui')),
                  t)
            )
          )
        );
      },
      load: function(e, t) {
        return y.open(c.extend({ type: 3, icon: e || 0, resize: !1, shade: 0.01 }, t));
      },
      tips: function(e, t, i) {
        return y.open(
          c.extend(
            {
              type: 4,
              content: [e, t],
              closeBtn: !1,
              time: 3e3,
              shade: !1,
              resize: !1,
              fixed: !1,
              maxWidth: 210,
            },
            i
          )
        );
      },
    },
    i = function(e) {
      var t = this;
      (t.index = ++y.index),
        (t.config = c.extend({}, t.config, u.config, e)),
        document.body
          ? t.creat()
          : setTimeout(function() {
              t.creat();
            }, 30);
    };
  i.pt = i.prototype;
  var p = [
    'layui-layer',
    '.layui-layer-title',
    '.layui-layer-main',
    '.layui-layer-dialog',
    'layui-layer-iframe',
    'layui-layer-content',
    'layui-layer-btn',
    'layui-layer-close',
  ];
  (p.anim = [
    'layer-anim-00',
    'layer-anim-01',
    'layer-anim-02',
    'layer-anim-03',
    'layer-anim-04',
    'layer-anim-05',
    'layer-anim-06',
  ]),
    (i.pt.config = {
      type: 0,
      shade: 0.3,
      fixed: !0,
      move: p[1],
      title: '&#x4FE1;&#x606F;',
      offset: 'auto',
      area: 'auto',
      closeBtn: 1,
      time: 0,
      zIndex: 19891014,
      maxWidth: 360,
      anim: 0,
      isOutAnim: !0,
      icon: -1,
      moveType: 1,
      resize: !0,
      scrollbar: !0,
      tips: 2,
    }),
    (i.pt.vessel = function(e, t) {
      var i,
        n = this.index,
        a = this.config,
        o = a.zIndex + n,
        s = 'object' == typeof a.title,
        l = a.maxmin && (1 === a.type || 2 === a.type),
        r = a.title
          ? '<div class="layui-layer-title" style="' +
            (s ? a.title[1] : '') +
            '">' +
            (s ? a.title[0] : a.title) +
            '</div>'
          : '';
      return (
        (a.zIndex = o),
        t(
          [
            a.shade
              ? '<div class="layui-layer-shade" id="layui-layer-shade' +
                n +
                '" times="' +
                n +
                '" style="z-index:' +
                (o - 1) +
                '; "></div>'
              : '',
            '<div class="' +
              p[0] +
              ' layui-layer-' +
              u.type[a.type] +
              ((0 != a.type && 2 != a.type) || a.shade ? '' : ' layui-layer-border') +
              ' ' +
              (a.skin || '') +
              '" id="' +
              p[0] +
              n +
              '" type="' +
              u.type[a.type] +
              '" times="' +
              n +
              '" showtime="' +
              a.time +
              '" conType="' +
              (e ? 'object' : 'string') +
              '" style="z-index: ' +
              o +
              '; width:' +
              a.area[0] +
              ';height:' +
              a.area[1] +
              (a.fixed ? '' : ';position:absolute;') +
              '">' +
              (e && 2 != a.type ? '' : r) +
              '<div id="' +
              (a.id || '') +
              '" class="layui-layer-content' +
              (0 == a.type && -1 !== a.icon ? ' layui-layer-padding' : '') +
              (3 == a.type ? ' layui-layer-loading' + a.icon : '') +
              '">' +
              (0 == a.type && -1 !== a.icon
                ? '<i class="layui-layer-ico layui-layer-ico' + a.icon + '"></i>'
                : '') +
              (1 == a.type && e ? '' : a.content || '') +
              '</div><span class="layui-layer-setwin">' +
              ((i = l
                ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>'
                : ''),
              a.closeBtn &&
                (i +=
                  '<a class="layui-layer-ico ' +
                  p[7] +
                  ' ' +
                  p[7] +
                  (a.title ? a.closeBtn : 4 == a.type ? '1' : '2') +
                  '" href="javascript:;"></a>'),
              i) +
              '</span>' +
              (a.btn
                ? (function() {
                    var e = '';
                    'string' == typeof a.btn && (a.btn = [a.btn]);
                    for (var t = 0, i = a.btn.length; t < i; t++)
                      e += '<a class="' + p[6] + t + '">' + a.btn[t] + '</a>';
                    return (
                      '<div class="' +
                      p[6] +
                      ' layui-layer-btn-' +
                      (a.btnAlign || '') +
                      '">' +
                      e +
                      '</div>'
                    );
                  })()
                : '') +
              (a.resize ? '<span class="layui-layer-resize"></span>' : '') +
              '</div>',
          ],
          r,
          c('<div class="layui-layer-move"></div>')
        ),
        this
      );
    }),
    (i.pt.creat = function() {
      var n = this,
        a = n.config,
        o = n.index,
        s = 'object' == typeof (r = a.content),
        l = c('body');
      if (!a.id || !c('#' + a.id)[0]) {
        switch (
          ('string' == typeof a.area && (a.area = 'auto' === a.area ? ['', ''] : [a.area, '']),
          a.shift && (a.anim = a.shift),
          6 == y.ie && (a.fixed = !1),
          a.type)
        ) {
          case 0:
            (a.btn = 'btn' in a ? a.btn : u.btn[0]), y.closeAll('dialog');
            break;
          case 2:
            var r = (a.content = s ? a.content : [a.content || 'http://layer.layui.com', 'auto']);
            a.content =
              '<iframe scrolling="' +
              (a.content[1] || 'auto') +
              '" allowtransparency="true" id="' +
              p[4] +
              o +
              '" name="' +
              p[4] +
              o +
              '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' +
              a.content[0] +
              '"></iframe>';
            break;
          case 3:
            delete a.title, delete a.closeBtn, -1 === a.icon && a.icon, y.closeAll('loading');
            break;
          case 4:
            s || (a.content = [a.content, 'body']),
              (a.follow = a.content[1]),
              (a.content = a.content[0] + '<i class="layui-layer-TipsG"></i>'),
              delete a.title,
              (a.tips = 'object' == typeof a.tips ? a.tips : [a.tips, !0]),
              a.tipsMore || y.closeAll('tips');
        }
        if (
          (n
            .vessel(s, function(e, t, i) {
              l.append(e[0]),
                s
                  ? 2 == a.type || 4 == a.type
                    ? c('body').append(e[1])
                    : r.parents('.' + p[0])[0] ||
                      ('object' == typeof r &&
                        ((f = r.context), r.after('<div id="admui-' + p[0] + n.index + '"></div>')),
                      c('body').append(
                        r
                          .data('display', r.css('display'))
                          .show()
                          .addClass('layui-layer-wrap')
                          .wrap(e[1])
                          .parents('#' + p[0] + n.index)
                      ),
                      c('#' + p[0] + o)
                        .find('.' + p[5])
                        .before(t))
                  : l.append(e[1]),
                c('.layui-layer-move')[0] || l.append((u.moveElem = i)),
                (n.layero = c('#' + p[0] + o)),
                a.scrollbar || p.html.css('overflow', 'hidden').attr('layer-full', o);
            })
            .auto(o),
          c('#layui-layer-shade' + n.index).css({
            'background-color': a.shade[1] || '#000',
            opacity: a.shade[0] || a.shade,
          }),
          2 == a.type && 6 == y.ie && n.layero.find('iframe').attr('src', r[0]),
          4 == a.type ? n.tips() : n.offset(),
          a.fixed &&
            d.on('resize', function() {
              n.offset(),
                (/^\d+%$/.test(a.area[0]) || /^\d+%$/.test(a.area[1])) && n.auto(o),
                4 == a.type && n.tips();
            }),
          a.time <= 0 ||
            setTimeout(function() {
              y.close(n.index);
            }, a.time),
          n.move().callback(),
          p.anim[a.anim])
        ) {
          var e = 'layer-anim ' + p.anim[a.anim];
          n.layero
            .addClass(e)
            .one(
              'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
              function() {
                c(this).removeClass(e);
              }
            );
        }
        a.isOutAnim && n.layero.data('isOutAnim', !0);
      }
    }),
    (i.pt.auto = function(e) {
      var t = this.config,
        i = c('#' + p[0] + e);
      '' === t.area[0] &&
        0 < t.maxWidth &&
        (y.ie && y.ie < 8 && t.btn && i.width(i.innerWidth()),
        i.outerWidth() > t.maxWidth && i.width(t.maxWidth));
      var n = [i.innerWidth(), i.innerHeight()],
        a = i.find(p[1]).outerHeight() || 0,
        o = i.find('.' + p[6]).outerHeight() || 0,
        s = function(e) {
          (e = i.find(e)).height(n[1] - a - o - 2 * (0 | parseFloat(e.css('padding-top'))));
        };
      switch (t.type) {
        case 2:
          s('iframe');
          break;
        default:
          '' === t.area[1]
            ? 0 < t.maxHeight && i.outerHeight() > t.maxHeight
              ? ((n[1] = t.maxHeight), s('.' + p[5]))
              : t.fixed && n[1] >= d.height() && ((n[1] = d.height()), s('.' + p[5]))
            : s('.' + p[5]);
      }
      return this;
    }),
    (i.pt.offset = function() {
      var e = this,
        t = e.config,
        i = e.layero,
        n = [i.outerWidth(), i.outerHeight()],
        a = 'object' == typeof t.offset;
      (e.offsetTop = (d.height() - n[1]) / 2),
        (e.offsetLeft = (d.width() - n[0]) / 2),
        a
          ? ((e.offsetTop = t.offset[0]), (e.offsetLeft = t.offset[1] || e.offsetLeft))
          : 'auto' !== t.offset &&
            ('t' === t.offset
              ? (e.offsetTop = 0)
              : 'r' === t.offset
              ? (e.offsetLeft = d.width() - n[0])
              : 'b' === t.offset
              ? (e.offsetTop = d.height() - n[1])
              : 'l' === t.offset
              ? (e.offsetLeft = 0)
              : 'lt' === t.offset
              ? ((e.offsetTop = 0), (e.offsetLeft = 0))
              : 'lb' === t.offset
              ? ((e.offsetTop = d.height() - n[1]), (e.offsetLeft = 0))
              : 'rt' === t.offset
              ? ((e.offsetTop = 0), (e.offsetLeft = d.width() - n[0]))
              : 'rb' === t.offset
              ? ((e.offsetTop = d.height() - n[1]), (e.offsetLeft = d.width() - n[0]))
              : (e.offsetTop = t.offset)),
        t.fixed ||
          ((e.offsetTop = /%$/.test(e.offsetTop)
            ? (d.height() * parseFloat(e.offsetTop)) / 100
            : parseFloat(e.offsetTop)),
          (e.offsetLeft = /%$/.test(e.offsetLeft)
            ? (d.width() * parseFloat(e.offsetLeft)) / 100
            : parseFloat(e.offsetLeft)),
          (e.offsetTop += d.scrollTop()),
          (e.offsetLeft += d.scrollLeft())),
        i.attr('minLeft') &&
          ((e.offsetTop = d.height() - (i.find(p[1]).outerHeight() || 0)),
          (e.offsetLeft = i.css('left'))),
        i.attr('myTopLeft') && ((e.offsetTop = i.css('top')), (e.offsetLeft = i.css('left'))),
        i.css({ top: e.offsetTop, left: e.offsetLeft });
    }),
    (i.pt.tips = function() {
      var e = this.config,
        t = this.layero,
        i = [t.outerWidth(), t.outerHeight()],
        n = c(e.follow);
      n[0] || (n = c('body'));
      var a = {
          width: n.outerWidth(),
          height: n.outerHeight(),
          top: n.offset().top,
          left: n.offset().left,
        },
        o = t.find('.layui-layer-TipsG'),
        s = e.tips[0];
      e.tips[1] || o.remove(),
        (a.autoLeft = function() {
          0 < a.left + i[0] - d.width()
            ? ((a.tipLeft = a.left + a.width - i[0]), o.css({ right: 12, left: 'auto' }))
            : (a.tipLeft = a.left);
        }),
        (a.where = [
          function() {
            a.autoLeft(),
              (a.tipTop = a.top - i[1] - 10),
              o
                .removeClass('layui-layer-TipsB')
                .addClass('layui-layer-TipsT')
                .css('border-right-color', e.tips[1]);
          },
          function() {
            (a.tipLeft = a.left + a.width + 10),
              (a.tipTop = a.top),
              o
                .removeClass('layui-layer-TipsL')
                .addClass('layui-layer-TipsR')
                .css('border-bottom-color', e.tips[1]);
          },
          function() {
            a.autoLeft(),
              (a.tipTop = a.top + a.height + 10),
              o
                .removeClass('layui-layer-TipsT')
                .addClass('layui-layer-TipsB')
                .css('border-right-color', e.tips[1]);
          },
          function() {
            (a.tipLeft = a.left - i[0] - 10),
              (a.tipTop = a.top),
              o
                .removeClass('layui-layer-TipsR')
                .addClass('layui-layer-TipsL')
                .css('border-bottom-color', e.tips[1]);
          },
        ]),
        a.where[s - 1](),
        1 === s
          ? a.top - (d.scrollTop() + i[1] + 16) < 0 && a.where[2]()
          : 2 === s
          ? 0 < d.width() - (a.left + a.width + i[0] + 16) || a.where[3]()
          : 3 === s
          ? 0 < a.top - d.scrollTop() + a.height + i[1] + 16 - d.height() && a.where[0]()
          : 4 === s && 0 < i[0] + 16 - a.left && a.where[1](),
        t
          .find('.' + p[5])
          .css({ 'background-color': e.tips[1], 'padding-right': e.closeBtn ? '30px' : '' }),
        t.css({
          left: a.tipLeft - (e.fixed ? d.scrollLeft() : 0),
          top: a.tipTop - (e.fixed ? d.scrollTop() : 0),
        });
    }),
    (i.pt.move = function() {
      var s = this,
        l = s.config,
        e = c(document),
        r = s.layero,
        t = r.find(l.move),
        i = r.find('.layui-layer-resize'),
        f = {};
      return (
        l.move && t.css('cursor', 'move'),
        t.on('mousedown', function(e) {
          e.preventDefault(),
            l.move &&
              ((f.moveStart = !0),
              (f.offset = [
                e.clientX - parseFloat(r.css('left')),
                e.clientY - parseFloat(r.css('top')),
              ]),
              u.moveElem.css('cursor', 'move').show());
        }),
        i.on('mousedown', function(e) {
          e.preventDefault(),
            (f.resizeStart = !0),
            (f.offset = [e.clientX, e.clientY]),
            (f.area = [r.outerWidth(), r.outerHeight()]),
            u.moveElem.css('cursor', 'se-resize').show();
        }),
        e
          .on('mousemove', function(e) {
            if (f.moveStart) {
              var t = e.clientX - f.offset[0],
                i = e.clientY - f.offset[1],
                n = 'fixed' === r.css('position');
              if (
                (e.preventDefault(),
                (f.stX = n ? 0 : d.scrollLeft()),
                (f.stY = n ? 0 : d.scrollTop()),
                !l.moveOut)
              ) {
                var a = d.width() - r.outerWidth() + f.stX,
                  o = d.height() - r.outerHeight() + f.stY;
                t < f.stX && (t = f.stX),
                  a < t && (t = a),
                  i < f.stY && (i = f.stY),
                  o < i && (i = o);
              }
              r.css({ left: t, top: i });
            }
            if (l.resize && f.resizeStart) {
              (t = e.clientX - f.offset[0]), (i = e.clientY - f.offset[1]);
              e.preventDefault(),
                y.style(s.index, { width: f.area[0] + t, height: f.area[1] + i }),
                (f.isResize = !0),
                l.resizing && l.resizing(r);
            }
          })
          .on('mouseup', function(e) {
            f.moveStart && (delete f.moveStart, u.moveElem.hide(), l.moveEnd && l.moveEnd(r)),
              f.resizeStart && (delete f.resizeStart, u.moveElem.hide());
          }),
        s
      );
    }),
    (i.pt.callback = function() {
      var t = this,
        i = t.layero,
        n = t.config;
      t.openLayer(),
        n.success &&
          (2 == n.type
            ? i.find('iframe').on('load', function() {
                n.success(i, t.index);
              })
            : n.success(i, t.index)),
        6 == y.ie && t.IE6(i),
        i
          .find('.' + p[6])
          .children('a')
          .on('click', function() {
            var e = c(this).index();
            0 === e
              ? n.yes
                ? n.yes(t.index, i)
                : n.btn1
                ? n.btn1(t.index, i)
                : y.close(t.index)
              : !1 === (n['btn' + (e + 1)] && n['btn' + (e + 1)](t.index, i)) || y.close(t.index);
          }),
        i.find('.' + p[7]).on('click', function() {
          !1 === (n.cancel && n.cancel(t.index, i)) || y.close(t.index);
        }),
        n.shadeClose &&
          c('#layui-layer-shade' + t.index).on('click', function() {
            y.close(t.index);
          }),
        i.find('.layui-layer-min').on('click', function() {
          !1 === (n.min && n.min(i)) || y.min(t.index, n);
        }),
        i.find('.layui-layer-max').on('click', function() {
          c(this).hasClass('layui-layer-maxmin')
            ? (y.restore(t.index), n.restore && n.restore(i))
            : (y.full(t.index, n),
              setTimeout(function() {
                n.full && n.full(i);
              }, 100));
        }),
        n.end && (u.end[t.index] = n.end);
    }),
    (u.reselect = function() {
      c.each(c('select'), function(e, t) {
        var i = c(this);
        i.parents('.' + p[0])[0] ||
          (1 == i.attr('layer') && c('.' + p[0]).length < 1 && i.removeAttr('layer').show()),
          (i = null);
      });
    }),
    (i.pt.IE6 = function(e) {
      c('select').each(function(e, t) {
        var i = c(this);
        i.parents('.' + p[0])[0] || 'none' === i.css('display') || i.attr({ layer: '1' }).hide(),
          (i = null);
      });
    }),
    (i.pt.openLayer = function() {
      (y.zIndex = this.config.zIndex),
        (y.setTop = function(e) {
          return (
            (y.zIndex = parseInt(e[0].style.zIndex)),
            e.on('mousedown', function() {
              y.zIndex++, e.css('z-index', y.zIndex + 1);
            }),
            y.zIndex
          );
        });
    }),
    (u.record = function(e) {
      var t = [
        e.width(),
        e.height(),
        e.position().top,
        e.position().left + parseFloat(e.css('margin-left')),
      ];
      e.find('.layui-layer-max').addClass('layui-layer-maxmin'), e.attr({ area: t });
    }),
    (u.rescollbar = function(e) {
      p.html.attr('layer-full') == e &&
        (p.html[0].style.removeProperty
          ? p.html[0].style.removeProperty('overflow')
          : p.html[0].style.removeAttribute('overflow'),
        p.html.removeAttr('layer-full'));
    }),
    ((r.layer = y).getChildFrame = function(e, t) {
      return (
        (t = t || c('.' + p[4]).attr('times')),
        c('#' + p[0] + t)
          .find('iframe')
          .contents()
          .find(e)
      );
    }),
    (y.getFrameIndex = function(e) {
      return c('#' + e)
        .parents('.' + p[4])
        .attr('times');
    }),
    (y.iframeAuto = function(e) {
      if (e) {
        var t = y.getChildFrame('html', e).outerHeight(),
          i = c('#' + p[0] + e),
          n = i.find(p[1]).outerHeight() || 0,
          a = i.find('.' + p[6]).outerHeight() || 0;
        i.css({ height: t + n + a }), i.find('iframe').css({ height: t });
      }
    }),
    (y.iframeSrc = function(e, t) {
      c('#' + p[0] + e)
        .find('iframe')
        .attr('src', t);
    }),
    (y.style = function(e, t, i) {
      var n = c('#' + p[0] + e),
        a = n.find('.layui-layer-content'),
        o = n.attr('type'),
        s = n.find(p[1]).outerHeight() || 0,
        l = n.find('.' + p[6]).outerHeight() || 0;
      n.attr('minLeft');
      o !== u.type[3] &&
        o !== u.type[4] &&
        (i ||
          (parseFloat(t.width) <= 260 && (t.width = 260),
          parseFloat(t.height) - s - l <= 64 && (t.height = 64 + s + l)),
        n.css(t),
        (l = n.find('.' + p[6]).outerHeight()),
        o === u.type[2]
          ? n.find('iframe').css({ height: parseFloat(t.height) - s - l })
          : a.css({
              height:
                parseFloat(t.height) -
                s -
                l -
                parseFloat(a.css('padding-top')) -
                parseFloat(a.css('padding-bottom')),
            }));
    }),
    (y.min = function(e, t) {
      var i = c('#' + p[0] + e),
        n = i.find(p[1]).outerHeight() || 0,
        a = i.attr('minLeft') || 181 * u.minIndex + 'px',
        o = i.css('position');
      u.record(i),
        u.minLeft[0] && ((a = u.minLeft[0]), u.minLeft.shift()),
        i.attr('position', o),
        y.style(
          e,
          {
            width: 180,
            height: n,
            left: a,
            top: d.height() - n,
            position: 'fixed',
            overflow: 'hidden',
          },
          !0
        ),
        i.find('.layui-layer-min').hide(),
        'page' === i.attr('type') && i.find(p[4]).hide(),
        u.rescollbar(e),
        i.attr('minLeft') || u.minIndex++,
        i.attr('minLeft', a);
    }),
    (y.restore = function(e) {
      var t = c('#' + p[0] + e),
        i = t.attr('area').split(',');
      t.attr('type');
      y.style(
        e,
        {
          width: parseFloat(i[0]),
          height: parseFloat(i[1]),
          top: parseFloat(i[2]),
          left: parseFloat(i[3]),
          position: t.attr('position'),
          overflow: 'visible',
        },
        !0
      ),
        t.find('.layui-layer-max').removeClass('layui-layer-maxmin'),
        t.find('.layui-layer-min').show(),
        'page' === t.attr('type') && t.find(p[4]).show(),
        u.rescollbar(e);
    }),
    (y.full = function(t) {
      var e,
        i = c('#' + p[0] + t);
      u.record(i),
        p.html.attr('layer-full') || p.html.css('overflow', 'hidden').attr('layer-full', t),
        clearTimeout(e),
        (e = setTimeout(function() {
          var e = 'fixed' === i.css('position');
          y.style(
            t,
            {
              top: e ? 0 : d.scrollTop(),
              left: e ? 0 : d.scrollLeft(),
              width: d.width(),
              height: d.height(),
            },
            !0
          ),
            i.find('.layui-layer-min').hide();
        }, 100));
    }),
    (y.title = function(e, t) {
      c('#' + p[0] + (t || y.index))
        .find(p[1])
        .html(e);
    }),
    (y.close = function(n) {
      var a = c('#' + p[0] + n),
        o = a.attr('type');
      if (a[0]) {
        var s = 'layui-layer-wrap',
          e = function() {
            if (o === u.type[1] && 'object' === a.attr('conType')) {
              a.children(':not(.' + p[5] + ')').remove();
              for (var e = a.find('.' + s), t = 0; t < 2; t++) e.unwrap();
              f
                ? c(f)
                    .find('#admui-' + p[0] + n)
                    .before(e.css('display', e.data('display')).removeClass(s))
                : e.css('display', e.data('display')).removeClass(s),
                c('#admui-' + p[0] + n).remove();
            } else {
              if (o === u.type[2])
                try {
                  var i = c('#' + p[4] + n)[0];
                  i.contentWindow.document.write(''),
                    i.contentWindow.close(),
                    a.find('.' + p[5])[0].removeChild(i);
                } catch (e) {}
              (a[0].innerHTML = ''), a.remove();
            }
            'function' == typeof u.end[n] && u.end[n](), delete u.end[n];
          };
        a.data('isOutAnim') && a.addClass('layer-anim layer-anim-close'),
          c('#layui-layer-moves, #layui-layer-shade' + n).remove(),
          6 == y.ie && u.reselect(),
          u.rescollbar(n),
          a.attr('minLeft') && (u.minIndex--, u.minLeft.push(a.attr('minLeft'))),
          (y.ie && y.ie < 10) || !a.data('isOutAnim')
            ? e()
            : setTimeout(function() {
                e();
              }, 200);
      }
    }),
    (y.closeAll = function(i) {
      c.each(c('.' + p[0]), function() {
        var e = c(this),
          t = i ? e.attr('type') === i : 1;
        t && y.close(e.attr('times')), (t = null);
      });
    });
  var a = y.cache || {},
    h = function(e) {
      return a.skin ? ' ' + a.skin + ' ' + a.skin + '-' + e : '';
    };
  (y.prompt = function(i, n) {
    var e = '';
    if (('function' == typeof (i = i || {}) && (n = i), i.area)) {
      var t = i.area;
      (e = 'style="width: ' + t[0] + '; height: ' + t[1] + ';"'), delete i.area;
    }
    var a,
      o =
        2 == i.formType
          ? '<textarea class="layui-layer-input"' + e + '>' + (i.value || '') + '</textarea>'
          : '<input type="' +
            (1 == i.formType ? 'password' : 'text') +
            '" class="layui-layer-input" value="' +
            (i.value || '') +
            '">',
      s = i.success;
    return (
      delete i.success,
      y.open(
        c.extend(
          {
            type: 1,
            btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;'],
            content: o,
            skin: 'layui-layer-prompt' + h('prompt'),
            maxWidth: d.width(),
            success: function(e) {
              (a = e.find('.layui-layer-input')).focus(), 'function' == typeof s && s(e);
            },
            resize: !1,
            yes: function(e) {
              var t = a.val();
              '' === t
                ? a.focus()
                : t.length > (i.maxlength || 500)
                ? y.tips(
                    '&#x6700;&#x591A;&#x8F93;&#x5165;' +
                      (i.maxlength || 500) +
                      '&#x4E2A;&#x5B57;&#x6570;',
                    a,
                    { tips: 1 }
                  )
                : n && n(t, e, a);
            },
          },
          i
        )
      )
    );
  }),
    (y.tab = function(a) {
      var n = (a = a || {}).tab || {},
        o = 'layui-this',
        i = a.success;
      return (
        delete a.success,
        y.open(
          c.extend(
            {
              type: 1,
              skin: 'layui-layer-tab' + h('tab'),
              resize: !1,
              title: (function() {
                var e = n.length,
                  t = 1,
                  i = '';
                if (0 < e)
                  for (i = '<span class="' + o + '">' + n[0].title + '</span>'; t < e; t++)
                    i += '<span>' + n[t].title + '</span>';
                return i;
              })(),
              content:
                '<ul class="layui-layer-tabmain">' +
                (function() {
                  var e = n.length,
                    t = 1,
                    i = '';
                  if (0 < e)
                    for (
                      i =
                        '<li class="layui-layer-tabli ' +
                        o +
                        '">' +
                        (n[0].content || 'no content') +
                        '</li>';
                      t < e;
                      t++
                    )
                      i +=
                        '<li class="layui-layer-tabli">' +
                        (n[t].content || 'no  content') +
                        '</li>';
                  return i;
                })() +
                '</ul>',
              success: function(e) {
                var t = e.find('.layui-layer-title').children(),
                  n = e.find('.layui-layer-tabmain').children();
                t.on('mousedown', function(e) {
                  e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0);
                  var t = c(this),
                    i = t.index();
                  t
                    .addClass(o)
                    .siblings()
                    .removeClass(o),
                    n
                      .eq(i)
                      .show()
                      .siblings()
                      .hide(),
                    'function' == typeof a.change && a.change(i);
                }),
                  'function' == typeof i && i(e);
              },
            },
            a
          )
        )
      );
    }),
    (y.photos = function(a, e, t) {
      var i = {};
      if ((a = a || {}).photos) {
        var n = a.photos,
          o = n.data || [],
          s = n.start || 0;
        (i.imgIndex = 1 + (0 | s)), (a.img = a.img || 'img');
        var l = a.success;
        if ((delete a.success, 0 === o.length)) return y.msg('&#x6CA1;&#x6709;&#x56FE;&#x7247;');
        (i.imgprev = function(e) {
          i.imgIndex--, i.imgIndex < 1 && (i.imgIndex = o.length), i.tabimg(e);
        }),
          (i.imgnext = function(e, t) {
            i.imgIndex++, (i.imgIndex > o.length && ((i.imgIndex = 1), t)) || i.tabimg(e);
          }),
          (i.keyup = function(e) {
            if (!i.end) {
              var t = e.keyCode;
              e.preventDefault(),
                37 === t ? i.imgprev(!0) : 39 === t ? i.imgnext(!0) : 27 === t && y.close(i.index);
            }
          }),
          (i.tabimg = function(e) {
            if (!(o.length <= 1))
              return (n.start = i.imgIndex - 1), y.close(i.index), y.photos(a, !0, e);
          }),
          (i.event = function() {
            i.bigimg.hover(
              function() {
                i.imgsee.show();
              },
              function() {
                i.imgsee.hide();
              }
            ),
              i.bigimg.find('.layui-layer-imgprev').on('click', function(e) {
                e.preventDefault(), i.imgprev();
              }),
              i.bigimg.find('.layui-layer-imgnext').on('click', function(e) {
                e.preventDefault(), i.imgnext();
              }),
              c(document).on('keyup', i.keyup);
          }),
          (i.loadi = y.load(1, { shade: !('shade' in a) && 0.9, scrollbar: !1 })),
          (function(e, t, i) {
            var n = new Image();
            if (((n.src = e), n.complete)) return t(n);
            (n.onload = function() {
              (n.onload = null), t(n);
            }),
              (n.onerror = function(e) {
                (n.onerror = null), i(e);
              });
          })(
            o[s].src,
            function(n) {
              y.close(i.loadi),
                (i.index = y.open(
                  c.extend(
                    {
                      type: 1,
                      id: 'layui-layer-photos',
                      area: (function() {
                        var e = [n.width, n.height],
                          t = [c(r).width() - 100, c(r).height() - 100];
                        if (!a.full && (e[0] > t[0] || e[1] > t[1])) {
                          var i = [e[0] / t[0], e[1] / t[1]];
                          i[1] < i[0]
                            ? ((e[0] = e[0] / i[0]), (e[1] = e[1] / i[0]))
                            : i[0] < i[1] && ((e[0] = e[0] / i[1]), (e[1] = e[1] / i[1]));
                        }
                        return [e[0] + 'px', e[1] + 'px'];
                      })(),
                      title: !1,
                      shade: 0.9,
                      shadeClose: !0,
                      closeBtn: !1,
                      move: '.layui-layer-phimg img',
                      moveType: 1,
                      scrollbar: !1,
                      moveOut: !0,
                      isOutAnim: !1,
                      skin: 'layui-layer-photos' + h('photos'),
                      content:
                        '<div class="layui-layer-phimg"><img src="' +
                        o[s].src +
                        '" alt="' +
                        (o[s].alt || '') +
                        '" layer-pid="' +
                        o[s].pid +
                        '"><div class="layui-layer-imgsee">' +
                        (1 < o.length
                          ? '<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>'
                          : '') +
                        '<div class="layui-layer-imgbar" style="display:' +
                        (t ? 'block' : '') +
                        '"><span class="layui-layer-imgtit"><a href="javascript:;">' +
                        (o[s].alt || '') +
                        '</a><em>' +
                        i.imgIndex +
                        '/' +
                        o.length +
                        '</em></span></div></div></div>',
                      success: function(e, t) {
                        (i.bigimg = e.find('.layui-layer-phimg')),
                          (i.imgsee = e.find('.layui-layer-imguide,.layui-layer-imgbar')),
                          i.event(e),
                          a.tab && a.tab(o[s], e),
                          'function' == typeof l && l(e);
                      },
                      end: function() {
                        (i.end = !0), c(document).off('keyup', i.keyup);
                      },
                    },
                    a
                  )
                ));
            },
            function() {
              y.close(i.loadi),
                y.msg(
                  '&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;',
                  {
                    time: 3e4,
                    btn: ['&#x4E0B;&#x4E00;&#x5F20;', '&#x4E0D;&#x770B;&#x4E86;'],
                    yes: function() {
                      1 < o.length && i.imgnext(!0, !0);
                    },
                  }
                );
            }
          );
      }
    }),
    (u.run = function(e) {
      (d = (c = e)(r)),
        (p.html = c('html')),
        (y.open = function(e) {
          return new i(e).index;
        });
    }),
    r.layui && layui.define
      ? (y.ready(),
        layui.define('jquery', function(e) {
          (y.path = layui.cache.dir), u.run(layui.$), e('layer', (r.layer = y));
        }))
      : 'function' == typeof define && define.amd
      ? define(['jquery'], function() {
          return u.run(r.jQuery), y;
        })
      : (u.run(r.jQuery), y.ready());
})(window);
