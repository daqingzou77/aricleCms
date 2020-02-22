/* 2018-9-7 21:22:42 | 版权所有 火星科技 http://marsgis.cn  【联系我们QQ：516584683，微信：marsgis】 */
!(function(t, e, s) {
  'use strict';
  s.components.register('ace', {
    mode: 'init',
    defaults: {},
    init: function(e, a) {
      var n,
        o = a && a.ace ? a.ace : t.ace;
      void 0 !== o &&
        ((n = a ? a.$ : s),
        o.config.loadModule('ace/ext/language_tools'),
        s('[data-plugin="ace"]', e).each(function() {
          var e = s(this).attr('id'),
            a = s(this).data('mode', n),
            t = s(this).data('theme', n),
            i = o.edit(e);
          (i.container.style.opacity = ''),
            a && i.session.setMode('ace/mode/' + a),
            t && i.setTheme('ace/theme/' + t),
            i.setOption('maxLines', 40),
            i.setAutoScrollEditorIntoView(!0),
            o.config.loadModule('ace/ext/language_tools', function() {
              i.setOptions({ enableSnippets: !0, enableBasicAutocompletion: !0 });
            });
        }));
    },
  });
})(window, document, jQuery),
  (function(e, a, o) {
    'use strict';
    o.components.register('animate-list', {
      mode: 'init',
      defaults: {
        child: '.panel',
        duration: 250,
        delay: 50,
        animate: 'scale-up',
        fill: 'backwards',
      },
      init: function(e, a) {
        var i = this,
          n = a ? a.$ : o;
        o('[data-plugin="animateList"]', e).each(function() {
          var e = o(this),
            a = o.extend({}, i.defaults, e.data(n), !0),
            t = function(e, a) {
              (this.options = a),
                (this.$children = e.find(a.child)),
                this.$children.addClass('animation-' + a.animate),
                this.$children.css('animation-fill-mode', a.fill),
                this.$children.css('animation-duration', a.duration + 'ms');
              var t = 0,
                i = this;
              this.$children.each(function() {
                o(this).css('animation-delay', t + 'ms'), (t += i.options.delay);
              });
            };
          (t.prototype = {
            run: function(e) {
              var a = this;
              this.$children.removeClass('animation-' + this.options.animate),
                void 0 !== e && (this.options.animate = e),
                setTimeout(function() {
                  a.$children.addClass('animation-' + a.options.animate);
                }, 0);
            },
          }),
            e.data('animateList', new t(e, a), n);
        });
      },
    });
  })(window, document, jQuery),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('colorpicker', { defaults: {}, mode: 'default' });
  })(window, document),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('datepicker', { mode: 'default', defaults: { autoclose: !0 } });
  })(window, document),
  (function(e, a, s) {
    'use strict';
    s.components.register('daterangepicker', {
      defaults: {
        locale: {
          format: 'YYYY-MM-DD',
          separator: ' 至 ',
          applyLabel: '确定',
          cancelLabel: '取消',
          fromLabel: '从',
          toLabel: '到',
          customRangeLabel: '自定义',
          weekLabel: 'W',
          daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
          monthNames: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月',
          ],
          firstDay: 1,
        },
        alwaysShowCalendars: !0,
      },
      init: function(e, a) {
        var t,
          i,
          n = a ? a.$ : s,
          o = a ? a.moment : o;
        n.fn.daterangepicker &&
          ((t = s.components.getDefaults('daterangepicker')),
          (i = {
            ranges: {
              今天: [o(), o()],
              昨天: [o().subtract(1, 'days'), o().subtract(1, 'days')],
              最近7天: [o().subtract(6, 'days'), o()],
              最近30天: [o().subtract(29, 'days'), o()],
              本月: [o().startOf('month'), o().endOf('month')],
              上月: [
                o()
                  .subtract(1, 'month')
                  .startOf('month'),
                o()
                  .subtract(1, 'month')
                  .endOf('month'),
              ],
            },
          }),
          s('[data-plugin="daterangepicker"]', e).each(function() {
            var e = s.extend(!0, {}, t, i, s(this).data(n));
            n(this).daterangepicker(e);
          }));
      },
    });
  })(window, document, jQuery),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('maxlength', { mode: 'default', defaults: {} });
  })(window, document),
  (function(e, a, n) {
    'use strict';
    n.components.register('markdown', {
      mode: 'init',
      defaults: { autofocus: !1, savable: !1, language: 'zh' },
      init: function(e, a) {
        var t,
          i = a ? a.$ : n;
        i.fn.markdown &&
          ((t = this.defaults),
          n('textarea[data-plugin="markdown"]', e).each(function() {
            var e = n.extend(!0, {}, t, n(this).data(i));
            i(this).markdown(e);
          }));
      },
    });
  })(window, document, jQuery),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('selectpicker', {
      mode: 'default',
      defaults: {
        noneSelectedText: '没有选中任何项',
        noneResultsText: '没有找到匹配项',
        countSelectedText: '已选中{1}项中的{0}项',
        maxOptionsText: ['超出限制 (最多选择{n}项)', '组选择超出限制(最多选择{n}组)'],
        selectAllText: '选择全部',
        deselectAllText: '取消全部选择',
        doneButtonText: '关闭',
        style: 'btn-select',
        iconBase: 'icon',
        tickIcon: 'wb-check',
      },
    });
  })(window, document),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('bootstrapSlider', { defaults: {}, mode: 'default' });
  })(window, document),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('tagsinput', {
      defaults: { tagClass: 'label label-default' },
      mode: 'default',
    });
  })(window, document),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('tokenfield', { mode: 'default', defaults: {} });
  })(window, document),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('TouchSpin', {
      mode: 'default',
      defaults: {
        verticalupclass: 'wb-plus',
        verticaldownclass: 'wb-minus',
        buttondown_class: 'btn btn-outline btn-default',
        buttonup_class: 'btn btn-outline btn-default',
      },
    });
  })(window, document),
  (function(e, a, s) {
    'use strict';
    s.components.register('buttons', {
      mode: 'api',
      defaults: {},
      api: function(e, a) {
        var o = a ? a.$ : s;
        s(e).on('click.site.loading', '[data-loading-text]', function() {
          var e = s(this),
            a = e.text(),
            t = 20,
            i = e.data('loadingText', o);
          e.text(i + '(' + t + ')').css('opacity', '.6');
          var n = setInterval(function() {
            e.text(i + '(' + --t + ')'),
              0 === t && (clearInterval(n), e.text(a).css('opacity', '1'));
          }, 1e3);
        }),
          s(e).on('click.site.morebutton', '[data-more]', function() {
            s(s(this).data('more', o)).toggleClass('show');
          });
      },
    });
  })(window, document, jQuery),
  (function(e, a, n) {
    'use strict';
    n.components.register('card', {
      mode: 'init',
      defaults: {},
      init: function(e, a) {
        var t,
          i = a ? a.$ : n;
        i.fn.card &&
          ((t = n.components.getDefaults('card')),
          n('[data-plugin="card"]', e).each(function() {
            var e = n.extend({}, t, n(this).data(i));
            e.target && (e.container = i(e.target)), i(this).card(e);
          }));
      },
    });
  })(window, document, jQuery),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('clockpicker', { mode: 'default' });
  })(window, document),
  (function(e, a, n) {
    'use strict';
    n.components.register('dataTable', {
      defaults: {
        responsive: !0,
        dom:
          "<'row'<'col-xs-6'<'hidden-xs'l>><'col-xs-6'f>><'row'<'col-xs-12'tr>><'row'<'col-sm-5'i><'col-sm-7'p>>",
        language: {
          sSearchPlaceholder: '快速查找',
          lengthMenu: '每页显示 _MENU_ 条',
          search: '_INPUT_',
          info: '第 _START_ 至 _END_ 项，共 _TOTAL_ 项',
          infoEmpty: '共 0 项',
          emptyTable: '无数据',
          zeroRecords: '抱歉，没有找到符合条件的记录',
          sInfoFiltered: '(从 _MAX_ 条记录中查找)',
          loadingRecords: '加载中，请稍后…',
          processing: '正在处理，请稍后…',
          paginate: {
            first: '第一页',
            last: '最后一页',
            previous: '<i class="icon wb-chevron-left-mini"></i>',
            next: '<i class="icon wb-chevron-right-mini"></i>',
          },
          aria: { sortAscending: '升序排列', sortDescending: '降序排列' },
        },
      },
      init: function(e, a) {
        var t,
          i = a ? a.$ : n;
        i.fn.dataTable &&
          ((t = this.defaults),
          n('[data-plugin="dataTable"]', e).each(function() {
            var e = n.extend(!0, {}, t, n(this).data(i));
            i(this).dataTable(e);
          }));
      },
    });
  })(window, document, jQuery),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('datepair', {
      mode: 'default',
      defaults: {
        startClass: 'datepair-start',
        endClass: 'datepair-end',
        timeClass: 'datepair-time',
        dateClass: 'datepair-date',
      },
    });
  })(window, document),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('dropify', {
      mode: 'default',
      defaults: {
        messages: {
          default: '单击或直接拖动需要上传的文件到此处',
          replace: '将文件拖放到此处或单击此处替换',
          remove: '移除',
          error: '出错了…',
        },
        error: {
          fileSize: '文件大小超出限制(文件大小不能超过{{ value }})。',
          minWidth: '图片宽度太小(不能小于{{ value }}}px)。',
          maxWidth: '图片宽度太大(不能大于{{ value }}}px)。',
          minHeight: '图片高度太小(不能小于{{ value }}}px)。',
          maxHeight: '图片高度太大(不能大于{{ value }}px)。',
          imageFormat: '图片格式不支持(允许的格式为：{{ value }})。',
        },
      },
    });
  })(window, document),
  (function(e, a, n) {
    'use strict';
    n.components.register('editableTable', {
      mode: 'init',
      init: function(e, a) {
        var t,
          i = a ? a.$ : n;
        i.fn.editableTableWidget &&
          ((t = n.components.getDefaults('editableTable')),
          n('[data-plugin="editableTable"]', e).each(function() {
            var e = n.extend(!0, {}, t, n(this).data(i));
            i(this).editableTableWidget(e);
          }));
      },
    });
  })(window, document, jQuery),
  (function(n, o, l) {
    'use strict';
    l.components.register('filterable', {
      mode: 'init',
      defaults: { animationOptions: { duration: 750, easing: 'linear', queue: !1 } },
      init: function(s, e) {
        var t,
          a,
          r = e ? e.$ : l,
          i = e || n;
        void 0 !== r.fn.isotope &&
          ((t = l.components.getDefaults('filterable')),
          (a = function() {
            l('[data-filterable]', s).each(function() {
              var e = r(this),
                a = l.extend(!0, {}, t, e.data(), { filter: '*' });
              e.isotope(a);
            }),
              l('[data-filter]', s).click(function(e) {
                var a,
                  t,
                  i = l(this),
                  n = i.data('target', r),
                  o = i.parent('li');
                n || (n = (n = i.attr('href')) && n.replace(/.*(?=#[^\s]*$)/, '')),
                  o.siblings('.active').each(function() {
                    l(this)
                      .find('a')
                      .attr('aria-expanded', !1),
                      l(this).removeClass('active');
                  }),
                  o.addClass('active'),
                  i.attr('aria-expanded', !0),
                  (a = r(n, s)),
                  '*' !== (t = i.attr('data-filter')) && (t = '[data-type="' + t + '"]'),
                  a.isotope({ filter: t }),
                  e.preventDefault();
              });
          }),
          s !== o
            ? a()
            : l(i).on('load', function() {
                a();
              }));
      },
    });
  })(window, document, jQuery),
  (function(e, a, t) {
    'use strict';
    t.components.register('iconpicker', {
      mode: 'default',
      defaults: {
        fullClassFormatter: function(e) {
          return 'icon ' + e;
        },
        templates: {
          popover:
            '<div class="iconpicker-popover popover"><div class="arrow"></div><div class="popover-title"></div><div class="popover-content"></div></div>',
          footer: '<div class="popover-footer"></div>',
          buttons:
            '<button class="iconpicker-btn iconpicker-btn-cancel btn btn-default btn-sm">取消</button> <button class="iconpicker-btn iconpicker-btn-accept btn btn-primary btn-sm">确认</button>',
          search:
            '<input type="search" class="form-control iconpicker-search" placeholder="查找图标">',
          iconpicker: '<div class="iconpicker"><div class="iconpicker-items"></div></div>',
          iconpickerItem: '<a role="button" href="#" class="iconpicker-item"><i></i></a>',
        },
        icons: [
          'fa-adjust',
          'fa-anchor',
          'fa-archive',
          'fa-area-chart',
          'fa-arrows',
          'fa-arrows-h',
          'fa-arrows-v',
          'fa-asterisk',
          'fa-at',
          'fa-automobile',
          'fa-ban',
          'fa-bank',
          'fa-bar-chart',
          'fa-bar-chart-o',
          'fa-barcode',
          'fa-bars',
          'fa-bed',
          'fa-beer',
          'fa-bell',
          'fa-bell-o',
          'fa-bell-slash',
          'fa-bell-slash-o',
          'fa-bicycle',
          'fa-binoculars',
          'fa-birthday-cake',
          'fa-bolt',
          'fa-bomb',
          'fa-book',
          'fa-bookmark',
          'fa-bookmark-o',
          'fa-briefcase',
          'fa-bug',
          'fa-building',
          'fa-building-o',
          'fa-bullhorn',
          'fa-bullseye',
          'fa-bus',
          'fa-cab',
          'fa-calculator',
          'fa-calendar',
          'fa-calendar-o',
          'fa-camera',
          'fa-camera-retro',
          'fa-car',
          'fa-caret-square-o-down',
          'fa-caret-square-o-left',
          'fa-caret-square-o-right',
          'fa-caret-square-o-up',
          'fa-cart-arrow-down',
          'fa-cart-plus',
          'fa-cc',
          'fa-certificate',
          'fa-check',
          'fa-check-circle',
          'fa-check-circle-o',
          'fa-check-square',
          'fa-check-square-o',
          'fa-child',
          'fa-circle',
          'fa-circle-o',
          'fa-circle-o-notch',
          'fa-circle-thin',
          'fa-clock-o',
          'fa-close',
          'fa-cloud',
          'fa-cloud-download',
          'fa-cloud-upload',
          'fa-code',
          'fa-code-fork',
          'fa-coffee',
          'fa-cog',
          'fa-cogs',
          'fa-comment',
          'fa-comment-o',
          'fa-comments',
          'fa-comments-o',
          'fa-compass',
          'fa-copyright',
          'fa-credit-card',
          'fa-crop',
          'fa-crosshairs',
          'fa-cube',
          'fa-cubes',
          'fa-cutlery',
          'fa-dashboard',
          'fa-database',
          'fa-desktop',
          'fa-diamond',
          'fa-dot-circle-o',
          'fa-download',
          'fa-edit',
          'fa-ellipsis-h',
          'fa-ellipsis-v',
          'fa-envelope',
          'fa-envelope-o',
          'fa-envelope-square',
          'fa-eraser',
          'fa-exchange',
          'fa-exclamation',
          'fa-exclamation-circle',
          'fa-exclamation-triangle',
          'fa-external-link',
          'fa-external-link-square',
          'fa-eye',
          'fa-eye-slash',
          'fa-eyedropper',
          'fa-fax',
          'fa-female',
          'fa-fighter-jet',
          'fa-file-archive-o',
          'fa-file-audio-o',
          'fa-file-code-o',
          'fa-file-excel-o',
          'fa-file-image-o',
          'fa-file-movie-o',
          'fa-file-pdf-o',
          'fa-file-photo-o',
          'fa-file-picture-o',
          'fa-file-powerpoint-o',
          'fa-file-sound-o',
          'fa-file-video-o',
          'fa-file-word-o',
          'fa-file-zip-o',
          'fa-film',
          'fa-filter',
          'fa-fire',
          'fa-fire-extinguisher',
          'fa-flag',
          'fa-flag-checkered',
          'fa-flag-o',
          'fa-flash',
          'fa-flask',
          'fa-folder',
          'fa-folder-o',
          'fa-folder-open',
          'fa-folder-open-o',
          'fa-frown-o',
          'fa-futbol-o',
          'fa-gamepad',
          'fa-gavel',
          'fa-gear',
          'fa-gears',
          'fa-genderless',
          'fa-gift',
          'fa-glass',
          'fa-globe',
          'fa-graduation-cap',
          'fa-group',
          'fa-hdd-o',
          'fa-headphones',
          'fa-heart',
          'fa-heart-o',
          'fa-heartbeat',
          'fa-history',
          'fa-home',
          'fa-hotel',
          'fa-image',
          'fa-inbox',
          'fa-info',
          'fa-info-circle',
          'fa-institution',
          'fa-key',
          'fa-keyboard-o',
          'fa-language',
          'fa-laptop',
          'fa-leaf',
          'fa-legal',
          'fa-lemon-o',
          'fa-level-down',
          'fa-level-up',
          'fa-life-bouy',
          'fa-life-buoy',
          'fa-life-ring',
          'fa-life-saver',
          'fa-lightbulb-o',
          'fa-line-chart',
          'fa-location-arrow',
          'fa-lock',
          'fa-magic',
          'fa-magnet',
          'fa-mail-forward',
          'fa-mail-reply',
          'fa-mail-reply-all',
          'fa-male',
          'fa-map-marker',
          'fa-meh-o',
          'fa-microphone',
          'fa-microphone-slash',
          'fa-minus',
          'fa-minus-circle',
          'fa-minus-square',
          'fa-minus-square-o',
          'fa-mobile',
          'fa-mobile-phone',
          'fa-money',
          'fa-moon-o',
          'fa-mortar-board',
          'fa-motorcycle',
          'fa-music',
          'fa-navicon',
          'fa-newspaper-o',
          'fa-paint-brush',
          'fa-paper-plane',
          'fa-paper-plane-o',
          'fa-paw',
          'fa-pencil',
          'fa-pencil-square',
          'fa-pencil-square-o',
          'fa-phone',
          'fa-phone-square',
          'fa-photo',
          'fa-picture-o',
          'fa-pie-chart',
          'fa-plane',
          'fa-plug',
          'fa-plus',
          'fa-plus-circle',
          'fa-plus-square',
          'fa-plus-square-o',
          'fa-power-off',
          'fa-print',
          'fa-puzzle-piece',
          'fa-qrcode',
          'fa-question',
          'fa-question-circle',
          'fa-quote-left',
          'fa-quote-right',
          'fa-random',
          'fa-recycle',
          'fa-refresh',
          'fa-remove',
          'fa-reorder',
          'fa-reply',
          'fa-reply-all',
          'fa-retweet',
          'fa-road',
          'fa-rocket',
          'fa-rss',
          'fa-rss-square',
          'fa-search',
          'fa-search-minus',
          'fa-search-plus',
          'fa-send',
          'fa-send-o',
          'fa-server',
          'fa-share',
          'fa-share-alt',
          'fa-share-alt-square',
          'fa-share-square',
          'fa-share-square-o',
          'fa-shield',
          'fa-ship',
          'fa-shopping-cart',
          'fa-sign-in',
          'fa-sign-out',
          'fa-signal',
          'fa-sitemap',
          'fa-sliders',
          'fa-smile-o',
          'fa-soccer-ball-o',
          'fa-sort',
          'fa-sort-alpha-asc',
          'fa-sort-alpha-desc',
          'fa-sort-amount-asc',
          'fa-sort-amount-desc',
          'fa-sort-asc',
          'fa-sort-desc',
          'fa-sort-down',
          'fa-sort-numeric-asc',
          'fa-sort-numeric-desc',
          'fa-sort-up',
          'fa-space-shuttle',
          'fa-spinner',
          'fa-spoon',
          'fa-square',
          'fa-square-o',
          'fa-star',
          'fa-star-half',
          'fa-star-half-empty',
          'fa-star-half-full',
          'fa-star-half-o',
          'fa-star-o',
          'fa-street-view',
          'fa-suitcase',
          'fa-sun-o',
          'fa-support',
          'fa-tablet',
          'fa-tachometer',
          'fa-tag',
          'fa-tags',
          'fa-tasks',
          'fa-taxi',
          'fa-terminal',
          'fa-thumb-tack',
          'fa-thumbs-down',
          'fa-thumbs-o-down',
          'fa-thumbs-o-up',
          'fa-thumbs-up',
          'fa-ticket',
          'fa-times',
          'fa-times-circle',
          'fa-times-circle-o',
          'fa-tint',
          'fa-toggle-down',
          'fa-toggle-left',
          'fa-toggle-off',
          'fa-toggle-on',
          'fa-toggle-right',
          'fa-toggle-up',
          'fa-trash',
          'fa-trash-o',
          'fa-tree',
          'fa-trophy',
          'fa-truck',
          'fa-tty',
          'fa-umbrella',
          'fa-university',
          'fa-unlock',
          'fa-unlock-alt',
          'fa-unsorted',
          'fa-upload',
          'fa-user',
          'fa-user-plus',
          'fa-user-secret',
          'fa-user-times',
          'fa-users',
          'fa-video-camera',
          'fa-volume-down',
          'fa-volume-off',
          'fa-volume-up',
          'fa-warning',
          'fa-wheelchair',
          'fa-wifi',
          'fa-wrench',
          'fa-ambulance',
          'fa-subway',
          'fa-train',
          'fa-mars',
          'fa-mars-double',
          'fa-mars-stroke',
          'fa-mars-stroke-h',
          'fa-mars-stroke-v',
          'fa-mercury',
          'fa-neuter',
          'fa-transgender',
          'fa-transgender-alt',
          'fa-venus',
          'fa-venus-double',
          'fa-venus-mars',
          'fa-file',
          'fa-file-o',
          'fa-file-text',
          'fa-file-text-o',
          'fa-cc-amex',
          'fa-cc-discover',
          'fa-cc-mastercard',
          'fa-cc-paypal',
          'fa-cc-stripe',
          'fa-cc-visa',
          'fa-google-wallet',
          'fa-paypal',
          'fa-bitcoin',
          'fa-btc',
          'fa-cny',
          'fa-dollar',
          'fa-eur',
          'fa-euro',
          'fa-gbp',
          'fa-ils',
          'fa-inr',
          'fa-jpy',
          'fa-krw',
          'fa-rmb',
          'fa-rouble',
          'fa-rub',
          'fa-ruble',
          'fa-rupee',
          'fa-shekel',
          'fa-sheqel',
          'fa-try',
          'fa-turkish-lira',
          'fa-usd',
          'fa-won',
          'fa-yen',
          'fa-align-center',
          'fa-align-justify',
          'fa-align-left',
          'fa-align-right',
          'fa-bold',
          'fa-chain',
          'fa-chain-broken',
          'fa-clipboard',
          'fa-columns',
          'fa-copy',
          'fa-cut',
          'fa-dedent',
          'fa-files-o',
          'fa-floppy-o',
          'fa-font',
          'fa-header',
          'fa-indent',
          'fa-italic',
          'fa-link',
          'fa-list',
          'fa-list-alt',
          'fa-list-ol',
          'fa-list-ul',
          'fa-outdent',
          'fa-paperclip',
          'fa-paragraph',
          'fa-paste',
          'fa-repeat',
          'fa-rotate-left',
          'fa-rotate-right',
          'fa-save',
          'fa-scissors',
          'fa-strikethrough',
          'fa-subscript',
          'fa-superscript',
          'fa-table',
          'fa-text-height',
          'fa-text-width',
          'fa-th',
          'fa-th-large',
          'fa-th-list',
          'fa-underline',
          'fa-undo',
          'fa-unlink',
          'fa-angle-double-down',
          'fa-angle-double-left',
          'fa-angle-double-right',
          'fa-angle-double-up',
          'fa-angle-down',
          'fa-angle-left',
          'fa-angle-right',
          'fa-angle-up',
          'fa-arrow-circle-down',
          'fa-arrow-circle-left',
          'fa-arrow-circle-o-down',
          'fa-arrow-circle-o-left',
          'fa-arrow-circle-o-right',
          'fa-arrow-circle-o-up',
          'fa-arrow-circle-right',
          'fa-arrow-circle-up',
          'fa-arrow-down',
          'fa-arrow-left',
          'fa-arrow-right',
          'fa-arrow-up',
          'fa-arrows-alt',
          'fa-caret-down',
          'fa-caret-left',
          'fa-caret-right',
          'fa-caret-up',
          'fa-chevron-circle-down',
          'fa-chevron-circle-left',
          'fa-chevron-circle-right',
          'fa-chevron-circle-up',
          'fa-chevron-down',
          'fa-chevron-left',
          'fa-chevron-right',
          'fa-chevron-up',
          'fa-hand-o-down',
          'fa-hand-o-left',
          'fa-hand-o-right',
          'fa-hand-o-up',
          'fa-long-arrow-down',
          'fa-long-arrow-left',
          'fa-long-arrow-right',
          'fa-long-arrow-up',
          'fa-backward',
          'fa-compress',
          'fa-eject',
          'fa-expand',
          'fa-fast-backward',
          'fa-fast-forward',
          'fa-forward',
          'fa-pause',
          'fa-play',
          'fa-play-circle',
          'fa-play-circle-o',
          'fa-step-backward',
          'fa-step-forward',
          'fa-stop',
          'fa-youtube-play',
          'fa-adn',
          'fa-android',
          'fa-angellist',
          'fa-apple',
          'fa-behance',
          'fa-behance-square',
          'fa-bitbucket',
          'fa-bitbucket-square',
          'fa-buysellads',
          'fa-codepen',
          'fa-connectdevelop',
          'fa-css3',
          'fa-dashcube',
          'fa-delicious',
          'fa-deviantart',
          'fa-digg',
          'fa-dribbble',
          'fa-dropbox',
          'fa-drupal',
          'fa-empire',
          'fa-facebook',
          'fa-facebook-f',
          'fa-facebook-official',
          'fa-facebook-square',
          'fa-flickr',
          'fa-forumbee',
          'fa-foursquare',
          'fa-ge',
          'fa-git',
          'fa-git-square',
          'fa-github',
          'fa-github-alt',
          'fa-github-square',
          'fa-gittip',
          'fa-google',
          'fa-google-plus',
          'fa-google-plus-square',
          'fa-gratipay',
          'fa-hacker-news',
          'fa-html5',
          'fa-instagram',
          'fa-ioxhost',
          'fa-joomla',
          'fa-jsfiddle',
          'fa-lastfm',
          'fa-lastfm-square',
          'fa-leanpub',
          'fa-linkedin',
          'fa-linkedin-square',
          'fa-linux',
          'fa-maxcdn',
          'fa-meanpath',
          'fa-medium',
          'fa-openid',
          'fa-pagelines',
          'fa-pied-piper',
          'fa-pied-piper-alt',
          'fa-pinterest',
          'fa-pinterest-p',
          'fa-pinterest-square',
          'fa-qq',
          'fa-ra',
          'fa-rebel',
          'fa-reddit',
          'fa-reddit-square',
          'fa-renren',
          'fa-sellsy',
          'fa-shirtsinbulk',
          'fa-simplybuilt',
          'fa-skyatlas',
          'fa-skype',
          'fa-slack',
          'fa-slideshare',
          'fa-soundcloud',
          'fa-spotify',
          'fa-stack-exchange',
          'fa-stack-overflow',
          'fa-steam',
          'fa-steam-square',
          'fa-stumbleupon',
          'fa-stumbleupon-circle',
          'fa-tencent-weibo',
          'fa-trello',
          'fa-tumblr',
          'fa-tumblr-square',
          'fa-twitch',
          'fa-twitter',
          'fa-twitter-square',
          'fa-viacoin',
          'fa-vimeo-square',
          'fa-vine',
          'fa-vk',
          'fa-wechat',
          'fa-weibo',
          'fa-weixin',
          'fa-whatsapp',
          'fa-windows',
          'fa-wordpress',
          'fa-xing',
          'fa-xing-square',
          'fa-yahoo',
          'fa-yelp',
          'fa-youtube',
          'fa-youtube-square',
          'fa-h-square',
          'fa-hospital-o',
          'fa-medkit',
          'fa-stethoscope',
          'fa-user-md',
        ],
      },
    }),
      t.components.register('iconpickerWb', {
        mode: 'default',
        defaults: {
          fullClassFormatter: function(e) {
            return 'icon ' + e;
          },
          templates: {
            popover:
              '<div class="iconpicker-popover popover"><div class="arrow"></div><div class="popover-title"></div><div class="popover-content"></div></div>',
            footer: '<div class="popover-footer"></div>',
            buttons:
              '<button class="iconpicker-btn iconpicker-btn-cancel btn btn-default btn-sm">取消</button> <button class="iconpicker-btn iconpicker-btn-accept btn btn-primary btn-sm">确认</button>',
            search:
              '<input type="search" class="form-control iconpicker-search" placeholder="查找图标">',
            iconpicker: '<div class="iconpicker"><div class="iconpicker-items"></div></div>',
            iconpickerItem: '<a role="button" href="#" class="iconpicker-item"><i></i></a>',
          },
          icons: [
            'wb-dashboard',
            'wb-inbox',
            'wb-cloud',
            'wb-bell',
            'wb-book',
            'wb-bookmark',
            'wb-tag',
            'wb-library',
            'wb-share',
            'wb-reply',
            'wb-refresh',
            'wb-move',
            'wb-chat',
            'wb-chat-working',
            'wb-chat-text',
            'wb-chat-group',
            'wb-envelope',
            'wb-envelope-open',
            'wb-user',
            'wb-user-circle',
            'wb-users',
            'wb-user-add',
            'wb-grid-9',
            'wb-grid-4',
            'wb-menu',
            'wb-layout',
            'wb-fullscreen',
            'wb-fullscreen-exit',
            'wb-expand',
            'wb-contract',
            'wb-arrow-expand',
            'wb-arrow-shrink',
            'wb-desktop',
            'wb-mobile',
            'wb-signal',
            'wb-power',
            'wb-more-horizontal',
            'wb-more-vertical',
            'wb-globe',
            'wb-map',
            'wb-flag',
            'wb-pie-chart',
            'wb-stats-bars',
            'wb-pluse',
            'wb-home',
            'wb-shopping-cart',
            'wb-payment',
            'wb-briefcase',
            'wb-search',
            'wb-zoom-in',
            'wb-zoom-out',
            'wb-download',
            'wb-upload',
            'wb-sort-asc',
            'wb-sort-des',
            'wb-graph-up',
            'wb-graph-down',
            'wb-replay',
            'wb-edit',
            'wb-pencil',
            'wb-rubber',
            'wb-crop',
            'wb-eye',
            'wb-eye-close',
            'wb-image',
            'wb-gallery',
            'wb-video',
            'wb-camera',
            'wb-folder',
            'wb-clipboard',
            'wb-order',
            'wb-file',
            'wb-copy',
            'wb-add-file',
            'wb-print',
            'wb-calendar',
            'wb-time',
            'wb-trash',
            'wb-plugin',
            'wb-extension',
            'wb-memory',
            'wb-settings',
            'wb-scissor',
            'wb-wrench',
            'wb-hammer',
            'wb-lock',
            'wb-unlock',
            'wb-volume-low',
            'wb-volume-high',
            'wb-volume-off',
            'wb-pause',
            'wb-play',
            'wb-stop',
            'wb-musical',
            'wb-random',
            'wb-reload',
            'wb-loop',
            'wb-text',
            'wb-bold',
            'wb-italic',
            'wb-underline',
            'wb-format-clear',
            'wb-text-type',
            'wb-table',
            'wb-attach-file',
            'wb-paperclip',
            'wb-link-intact',
            'wb-link',
            'wb-link-broken',
            'wb-indent-increase',
            'wb-indent-decrease',
            'wb-align-justify',
            'wb-align-left',
            'wb-align-center',
            'wb-align-right',
            'wb-list-numbered',
            'wb-list-bulleted',
            'wb-list',
            'wb-emoticon',
            'wb-quote-right',
            'wb-code',
            'wb-code-working',
            'wb-code-unfold',
            'wb-chevron-right',
            'wb-chevron-left',
            'wb-chevron-left-mini',
            'wb-chevron-right-mini',
            'wb-chevron-up',
            'wb-chevron-down',
            'wb-chevron-up-mini',
            'wb-chevron-down-mini',
            'wb-arrow-left',
            'wb-arrow-right',
            'wb-arrow-up',
            'wb-arrow-down',
            'wb-dropdown',
            'wb-dropup',
            'wb-dropright',
            'wb-dropleft',
            'wb-sort-vertical',
            'wb-triangle-left',
            'wb-triangle-right',
            'wb-triangle-down',
            'wb-triangle-up',
            'wb-check-circle',
            'wb-check',
            'wb-check-mini',
            'wb-close',
            'wb-close-mini',
            'wb-plus-circle',
            'wb-plus',
            'wb-minus-circle',
            'wb-minus',
            'wb-alert-circle',
            'wb-alert',
            'wb-help-circle',
            'wb-help',
            'wb-info-circle',
            'wb-info',
            'wb-warning',
            'wb-heart',
            'wb-heart-outline',
            'wb-star',
            'wb-star-half',
            'wb-star-outline',
            'wb-thumb-up',
            'wb-thumb-down',
            'wb-small-point',
            'wb-medium-point',
            'wb-large-point',
          ],
        },
      });
  })(window, document, jQuery),
  (function(e, a, s) {
    'use strict';
    s.components.register('formatter', {
      mode: 'init',
      defaults: { persistent: !0 },
      init: function(e, a) {
        var t = a ? a.$ : s;
        if (t.fn.formatter) {
          var i,
            n = s.components.getDefaults('formatter'),
            o = navigator.userAgent.toLowerCase();
          (i = /msie/i.test(o) && !/opera/.test(o) ? { persistent: !1 } : {}),
            s('[data-plugin="formatter"]', e).each(function() {
              var e = s.extend({}, n, i, s(this).data(t));
              e.pattern && (e.pattern = e.pattern.replace(/\[\[/g, '{{').replace(/\]\]/g, '}}')),
                t(this).formatter(e);
            });
        }
      },
    });
  })(window, document, jQuery),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('formValidation', {
      mode: 'default',
      defaults: {
        locale: 'zh_CN',
        framework: 'bootstrap',
        excluded: ':disabled',
        icon: { valid: 'icon wb-check', invalid: 'icon wb-close', validating: 'icon wb-refresh' },
      },
    });
  })(window, document),
  (function(t, e, l) {
    'use strict';
    l.components.register('gauge', {
      mode: 'init',
      defaults: {
        lines: 12,
        angle: 0.12,
        lineWidth: 0.4,
        pointer: { length: 0.68, strokeWidth: 0.03, color: l.colors('blue-grey', 400) },
        limitMax: !0,
        colorStart: l.colors('blue-grey', 200),
        colorStop: l.colors('blue-grey', 200),
        strokeColor: l.colors('purple', 500),
        generateGradient: !0,
      },
      init: function(e, a) {
        var o,
          s = a ? a.$ : l,
          r = a && a.Gauge ? a.Gauge : t.Gauge;
        void 0 !== typeof r &&
          ((o = l.components.getDefaults('gauge')),
          l('[data-plugin="gauge"]', e).each(function() {
            var e = l(this),
              a = e.data(s),
              t = e.find('.gauge-label'),
              i = e.find('canvas');
            if (((a = l.extend(!0, {}, o, a)), 0 !== i.length)) {
              var n = new r(i[0]).setOptions(a);
              e.data('gauge', n, s),
                (n.animationSpeed = 50),
                (n.maxValue = e.data('max-value', s)),
                n.set(e.data('value', s)),
                0 < t.length && n.setTextField(t[0]);
            }
          }));
      },
    }),
      l.components.register('donut', {
        mode: 'init',
        defaults: {
          lines: 12,
          angle: 0.3,
          lineWidth: 0.08,
          pointer: { length: 0.9, strokeWidth: 0.035, color: l.colors('blue-grey', 400) },
          limitMax: !1,
          colorStart: l.colors('blue-grey', 200),
          colorStop: l.colors('blue-grey', 200),
          strokeColor: l.colors('purple', 500),
          generateGradient: !0,
        },
        init: function(e, a) {
          var o,
            s = a ? a.$ : l,
            r = a && a.Donut ? a.Donut : t.Donut;
          void 0 !== typeof r &&
            ((o = l.components.getDefaults('donut')),
            l('[data-plugin="donut"]', e).each(function() {
              var e = l(this),
                a = e.data(s),
                t = e.find('.donut-label'),
                i = e.find('canvas');
              if (((a = l.extend(!0, {}, o, a)), 0 !== i.length)) {
                var n = new r(i[0]).setOptions(a);
                e.data('donut', n, s),
                  (n.animationSpeed = 50),
                  (n.maxValue = e.data('max-value', s)),
                  n.set(e.data('value', s)),
                  0 < t.length && n.setTextField(t[0]);
              }
            }));
        },
      });
  })(window, document, jQuery),
  (function(e, a, n) {
    'use strict';
    n.components.register('gridstack', {
      mode: 'init',
      defaults: { cellHeight: 80, verticalMargin: 20 },
      init: function(e, a) {
        var t = a ? a.$ : n;
        if (t.fn.gridstack) {
          var i = n.components.getDefaults('gridstack');
          n('[data-plugin="gridstack"]', e).each(function() {
            var e = n.extend(!0, {}, i, n(this).data(t));
            t(this).gridstack(e);
          });
        }
      },
    });
  })(window, document, jQuery),
  (function(i, e, n) {
    'use strict';
    n.components.register('highlight', {
      mode: 'init',
      defaults: {},
      init: function(e, a) {
        var t = a && a.hljs ? a.hljs : i.hljs;
        void 0 !== t &&
          n('[data-plugin="highlight"]', e).each(function(e, a) {
            t.highlightBlock(a);
          });
      },
    });
  })(window, document, jQuery),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('sortable', { defaults: {}, mode: 'default' });
  })(window, document),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('iCheck', { mode: 'default', defaults: {} });
  })(window, document),
  (function(e, a, i) {
    'use strict';
    i.components.register('input-group-file', {
      api: function(e) {
        i(e).on('change', '.input-group-file [type=file]', function() {
          var e = i(this),
            a = i(this)
              .parents('.input-group-file')
              .find('.form-control'),
            t = '';
          i.each(e[0].files, function(e, a) {
            t += a.name + ', ';
          }),
            (t = t.substring(0, t.length - 2)),
            a.val(t);
        });
      },
    });
  })(window, document, jQuery),
  (function(s, r, l) {
    'use strict';
    l.components.register('isotope', {
      mode: 'init',
      defaults: {},
      init: function(e, a) {
        var t,
          i = a ? a.$ : l,
          n = a || s;
        if (void 0 !== i.fn.isotope) {
          t = l.components.getDefaults('isotope');
          var o = function() {
            l('[data-plugin="isotope"]', e).each(function() {
              var e = i(this),
                a = l.extend(!0, {}, t, e.data());
              e.isotope(a);
            });
          };
          e !== r
            ? o()
            : l(n).on('load', function() {
                o();
              });
        }
      },
    });
  })(window, document, jQuery),
  (function(e, a, n) {
    'use strict';
    n.components.register('appear', {
      defaults: {},
      api: function(e, a) {
        var t = a ? a.$ : n;
        t.fn.appear &&
          (t(e).on('appear', '[data-plugin="appear"]', function() {
            var e = n(this),
              a = e.data('animate', t);
            e.hasClass('appear-no-repeat') ||
              (e.removeClass('invisible').addClass('animation-' + a),
              !1 === e.data('repeat') && e.addClass('appear-no-repeat'));
          }),
          t(e).on('disappear', '[data-plugin="appear"]', function() {
            var e = n(this),
              a = e.data('animate', t);
            e.hasClass('appear-no-repeat') || e.addClass('invisible').removeClass('animation-' + a);
          }));
      },
      init: function(e, a) {
        var t = a ? a.$ : n;
        if (t.fn.appear) {
          var i = n.components.getDefaults('appear');
          t('[data-plugin="appear"]', e).appear(i),
            t('[data-plugin="appear"]', e)
              .not(':appeared')
              .addClass('invisible');
        }
      },
    });
  })(window, document, jQuery),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('knob', {
      mode: 'default',
      defaults: { min: -50, max: 50, width: 120, height: 120, thickness: '.1' },
    });
  })(window, document),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('labelauty', {
      mode: 'default',
      defaults: { same_width: !0, checked_label: '选中', unchecked_label: '未选中' },
    });
  })(window, document),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('strength', {
      mode: 'default',
      defaults: {
        showMeter: !0,
        showToggle: !1,
        templates: {
          toggle:
            '<div class="checkbox-custom checkbox-primary show-password-wrap"><input type="checkbox" class="{toggleClass}" title="显示/隐藏密码" id="show_password" /><label for="show_password">显示密码</label></div>',
          meter: '<div class="{meterClass}">{score}</div>',
          score: '<div class="{scoreClass}"></div>',
          main: '<div class="{containerClass}">{input}{meter}{toggle}</div>',
        },
        classes: {
          container: 'strength-container',
          status: 'strength-{status}',
          input: 'strength-input',
          toggle: 'strength-toggle',
          meter: 'strength-meter',
          score: 'strength-score',
        },
        scoreLables: { invalid: 'Invalid', weak: 'Weak', good: 'Good', strong: 'Strong' },
        scoreClasses: {
          invalid: 'strength-invalid',
          weak: 'strength-weak',
          good: 'strength-good',
          strong: 'strength-strong',
        },
      },
    });
  })(window, document),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('treegrid', {
      mode: 'default',
      defaults: {
        expanderExpandedClass: 'icon wb-triangle-down',
        expanderCollapsedClass: 'icon wb-triangle-right',
      },
    });
  })(window, document),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('wizard', {
      mode: 'default',
      defaults: {
        step: '.steps .step, .pearls .pearl',
        buttonLabels: { back: '上一步', next: '下一步', finish: '完成' },
        templates: {
          buttons: function() {
            var e = this.options;
            return (
              '<div class="wizard-buttons"><a class="btn btn-default btn-outline" href="#' +
              this.id +
              '" data-wizard="back" role="button">' +
              e.buttonLabels.back +
              '</a><a class="btn btn-primary btn-outline pull-right" href="#' +
              this.id +
              '" data-wizard="next" role="button">' +
              e.buttonLabels.next +
              '</a><a class="btn btn-success btn-outline pull-right" href="#' +
              this.id +
              '" data-wizard="finish" role="button">' +
              e.buttonLabels.finish +
              '</a></div>'
            );
          },
        },
      },
    });
  })(window, document),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('jstree', { mode: 'default', defaults: {} });
  })(window, document),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('timepicker', {
      mode: 'default',
      defaults: {
        lang: {
          am: '上午',
          pm: '下午',
          AM: '上午',
          PM: '下午',
          decimal: '.',
          mins: '分钟',
          hr: '小时',
          hrs: '小时',
        },
        timeFormat: 'ag:i',
      },
    });
  })(window, document),
  (function(o, e, s) {
    'use strict';
    s.components.register('ladda', {
      mode: 'init',
      defaults: { timeout: 2e3 },
      init: function(e, a) {
        var t,
          i = a && a.Ladda ? a.Ladda : o.Ladda;
        void 0 !== i &&
          ((t = s.components.getDefaults('ladda')), i.bind('[data-plugin="ladda"]', t));
      },
    }),
      s.components.register('laddaProgress', {
        mode: 'init',
        defaults: {},
        init: function(e, a) {
          var t,
            i,
            n = a && a.Ladda ? a.Ladda : o.Ladda;
          void 0 !== n &&
            ((t = s.components.getDefaults('laddaProgress')),
            (i = s.extend({}, t, {
              callback: function(e) {
                var a = 0,
                  t = setInterval(function() {
                    (a = Math.min(a + 0.1 * Math.random(), 1)),
                      e.setProgress(a),
                      1 === a && (e.stop(), clearInterval(t));
                  }, 300);
              },
            })),
            n.bind('[data-plugin="laddaProgress"]', i));
        },
      });
  })(window, document, jQuery),
  (function(r, e, l) {
    'use strict';
    l.components.register('layer', {
      mode: 'init',
      defaults: { target: 'parent', confirmBtn: ['确认', '取消'], prompt: 1 },
      init: function(e, a) {
        var i,
          n,
          o = a && a.layer,
          s = o ? a.layer : r.layer;
        void 0 !== s &&
          ((i = a ? a.$ : l),
          (n = this.defaults),
          l(e).on('click.site.layer', '[data-plugin="layer"]', function() {
            var e = i(this),
              t = l.extend(!0, {}, n, e.data());
            if ('self' === t.target) {
              if (!o) return console.error('您在当前页面还没有引入layer插件');
              s = a.layer;
            } else s = o ? r.layer : s;
            switch (t.type) {
              case 'alert':
                s.alert(t.message);
                break;
              case 'msg':
                s.msg(t.message);
                break;
              case 'confirm':
                s.confirm(
                  t.title,
                  { btn: t.confirmBtn },
                  function() {
                    s.msg(t.successMessage);
                  },
                  function() {
                    s.msg(t.cancelMessage);
                  }
                );
                break;
              case 'prompt':
                s.prompt({ title: t.title, formType: t.prompt }, function(e, a) {
                  s.close(a), s.msg(t.message);
                });
                break;
              case 'tips':
                s.tips(t.message, e);
                break;
              case 'load':
                s.load(t.style, { time: t.time });
            }
          }));
      },
    });
  })(window, document, jQuery),
  (function(e, a, n) {
    'use strict';
    n.components.register('masonry', {
      mode: 'init',
      defaults: { itemSelector: '.masonry-item' },
      init: function(e, a) {
        var t,
          i = a ? a.$ : n;
        void 0 !== i.fn.masonry &&
          ((t = n.components.getDefaults('masonry')),
          n('[data-plugin="masonry"]', e).each(function() {
            var e = i(this),
              a = n.extend(!0, {}, t, e.data());
            e.masonry(a);
          }));
      },
    });
  })(window, document, jQuery),
  (function(e, a, o) {
    'use strict';
    o.components.register('matchHeight', {
      mode: 'init',
      defaults: {},
      init: function(e, a) {
        var i,
          n = a ? a.$ : o;
        void 0 !== n.fn.matchHeight &&
          ((i = o.components.getDefaults('matchHeight')),
          o('[data-plugin="matchHeight"]', e).each(function() {
            var e = n(this),
              a = o.extend(!0, {}, i, e.data()),
              t = e.data('matchSelector');
            t ? e.find(t).matchHeight(a) : e.children().matchHeight(a);
          }));
      },
    });
  })(window, document, jQuery),
  (function(e, a, o) {
    'use strict';
    o.components.register('material', {
      init: function(e, n) {
        o('.form-material', e).each(function() {
          var e,
            a = o(this),
            t = n ? n.$ : o;
          if (!0 !== a.data('material', t)) {
            if (
              ((e = a.find('.form-control')).attr('data-hint') &&
                e.after('<div class=hint>' + e.attr('data-hint') + '</div>'),
              a.hasClass('floating'))
            ) {
              if (e.hasClass('floating-label')) {
                var i = e.attr('placeholder');
                e.attr('placeholder', null).removeClass('floating-label'),
                  e.after('<div class=floating-label>' + i + '</div>');
              }
              (null !== e.val() && 'undefined' !== e.val() && '' !== e.val()) ||
                e.addClass('empty');
            }
            e.next().is('[type=file]') && a.addClass('form-material-file'),
              a.data('material', !0, t);
          }
        });
      },
      api: function(e) {
        o(e)
          .on('keydown.site.material paste.site.material', '.form-control', function(e) {
            var a;
            (void 0 === (a = e).which ||
              ('number' == typeof a.which &&
                0 < a.which &&
                !a.ctrlKey &&
                !a.metaKey &&
                !a.altKey &&
                8 !== a.which &&
                9 !== a.which)) &&
              o(this).removeClass('empty');
          })
          .on('keyup.site.material change.site.material', '.form-control', function() {
            var e = o(this);
            '' === e.val() && void 0 !== e[0].checkValidity && e[0].checkValidity()
              ? e.addClass('empty')
              : e.removeClass('empty');
          })
          .on('focus', '.form-material-file', function() {
            o(this)
              .find('input')
              .addClass('focus');
          })
          .on('blur', '.form-material-file', function() {
            o(this)
              .find('input')
              .removeClass('focus');
          })
          .on('change', '.form-material-file [type=file]', function() {
            var e = o(this),
              t = '';
            o.each(e[0].files, function(e, a) {
              t += a.name + ', ';
            }),
              (t = t.substring(0, t.length - 2))
                ? e.prev().removeClass('empty')
                : e.prev().addClass('empty'),
              e.prev().val(t);
          });
      },
    });
  })(window, document, jQuery),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('multiSelect', { mode: 'default', defaults: {} });
  })(window, document),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('nestable', { mode: 'default', defaults: {} });
  })(window, document),
  (function(i, e, a) {
    'use strict';
    jQuery.components.register('nprogress', {
      mode: 'init',
      defaults: {
        minimum: 0.15,
        trickleRate: 0.07,
        trickleSpeed: 360,
        showSpinner: !1,
        template:
          '<div class="bar" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
      },
      init: function(e, a) {
        var t = a && a.NProgress ? a.NProgress : i.NProgress;
        void 0 !== t && t.configure(this.defaults);
      },
    });
  })(window, document),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('owlCarousel', {
      mode: 'default',
      defaults: {
        loop: !0,
        nav: !0,
        dots: !1,
        dotsClass: 'owl-dots owl-dots-fall',
        responsive: { 0: { items: 1 }, 600: { items: 3 } },
      },
    });
  })(window, document),
  (function(i, e, d) {
    'use strict';
    d.components.register('panel', {
      api: function(e, a) {
        var t = d(e),
          n = a ? a.$ : d,
          o = a || i;
        t.off('click.site.panel'),
          t.on('click.site.panel', '[data-toggle="panel-fullscreen"]', function(e) {
            e.preventDefault(),
              d(this)
                .closest('.panel')
                .data('panel-api', n)
                .toggleFullscreen();
          }),
          t.on('click.site.panel', '[data-toggle="panel-collapse"]', function(e) {
            e.preventDefault(),
              d(this)
                .closest('.panel')
                .data('panel-api', n)
                .toggleContent();
          }),
          t.on('click.site.panel', '[data-toggle="panel-close"]', function(e) {
            e.preventDefault(),
              d(this)
                .closest('.panel')
                .data('panel-api', n)
                .close();
          }),
          t.on('click.site.panel', '[data-toggle="panel-refresh"]', function(e) {
            e.preventDefault();
            var a = d(this),
              t = a.closest('.panel').data('panel-api', n),
              i = a.data('loadCallback', n);
            d.isFunction(o[i]) ? t.load(o[i]) : t.load();
          });
      },
      init: function(e, a) {
        var f = a ? a.$ : d;
        d('.panel', e).each(function() {
          var t,
            i = d(this),
            e = !1,
            a = !1,
            n = !1,
            o = !1,
            s = i.find('[data-toggle="panel-fullscreen"]'),
            r = i.find('[data-toggle="panel-collapse"]'),
            l = this;
          i.hasClass('is-collapse') && (n = !0);
          var c = {
            load: function(e) {
              var a = i.data('loader-type', f);
              a || (a = 'default'),
                (t = d(
                  '<div class="panel-loading"><div class="loader loader-' + a + '"></div></div>'
                )).appendTo(i),
                i.addClass('is-loading'),
                i.trigger('loading.uikit.panel'),
                (o = !0),
                d.isFunction(e) && e.call(l, this.done);
            },
            done: function() {
              !0 === o &&
                (t.remove(), i.removeClass('is-loading'), i.trigger('loading.done.uikit.panel'));
            },
            toggleContent: function() {
              n ? this.showContent() : this.hideContent();
            },
            showContent: function() {
              !1 !== n &&
                (i.removeClass('is-collapse'),
                r.hasClass('wb-plus') && r.removeClass('wb-plus').addClass('wb-minus'),
                i.trigger('shown.uikit.panel'),
                (n = !1));
            },
            hideContent: function() {
              !0 !== n &&
                (i.addClass('is-collapse'),
                r.hasClass('wb-minus') && r.removeClass('wb-minus').addClass('wb-plus'),
                i.trigger('hidden.uikit.panel'),
                (n = !0));
            },
            toggleFullscreen: function() {
              e ? this.leaveFullscreen() : this.enterFullscreen();
            },
            enterFullscreen: function() {
              !0 !== e &&
                (i.addClass('is-fullscreen'),
                s.hasClass('wb-expand') && s.removeClass('wb-expand').addClass('wb-contract'),
                i.trigger('enter.fullscreen.uikit.panel'),
                (e = !0));
            },
            leaveFullscreen: function() {
              !1 !== e &&
                (i.removeClass('is-fullscreen'),
                s.hasClass('wb-contract') && s.removeClass('wb-contract').addClass('wb-expand'),
                i.trigger('leave.fullscreen.uikit.panel'),
                (e = !1));
            },
            toggle: function() {
              a ? this.open() : this.close();
            },
            open: function() {
              i.on('open.uikit.panel', function() {
                var e = d(this);
                e.siblings().length ? e.show() : e.parent().show();
              }),
                !1 !== a && (i.removeClass('is-close'), i.trigger('open.uikit.panel'), (a = !1));
            },
            close: function() {
              i.on('close.uikit.panel', function() {
                var e = d(this);
                e.siblings().length ? e.hide() : e.parent().hide();
              }),
                !0 !== a && (i.addClass('is-close'), i.trigger('close.uikit.panel'), (a = !0));
            },
          };
          i.data('panel-api', c, f);
        });
      },
    });
  })(window, document, jQuery),
  (function(e, a, o) {
    'use strict';
    o.components.register('peityBar', {
      mode: 'init',
      defaults: {
        delimiter: ',',
        fill: [o.colors('purple', 400)],
        height: 18,
        max: null,
        min: 0,
        padding: 0.1,
        width: 44,
      },
      init: function(e, a) {
        var i,
          n = a ? a.$ : o;
        n.fn.peity &&
          ((i = o.components.getDefaults('peityBar')),
          o('[data-plugin="peityBar"]', e).each(function() {
            var e = n(this),
              a = e.data();
            if (a.skin && o.colors(a.skin)) {
              var t = o.colors(a.skin);
              i.fill = [t[400]];
            }
            (a = o.extend(!0, {}, i, a)), e.peity('bar', a);
          }));
      },
    }),
      o.components.register('peityDonut', {
        mode: 'init',
        defaults: {
          delimiter: null,
          fill: [o.colors('purple', 700), o.colors('purple', 400), o.colors('purple', 200)],
          height: null,
          innerRadius: null,
          radius: 11,
          width: null,
        },
        init: function(e, a) {
          var i,
            n = a ? a.$ : o;
          n.fn.peity &&
            ((i = o.components.getDefaults('peityDonut')),
            o('[data-plugin="peityDonut"]', e).each(function() {
              var e = n(this),
                a = e.data();
              if (a.skin && o.colors(a.skin)) {
                var t = o.colors(a.skin);
                i.fill = [t[700], t[400], t[200]];
              }
              (a = o.extend(!0, {}, i, a)), e.peity('donut', a);
            }));
        },
      }),
      o.components.register('peityLine', {
        mode: 'init',
        defaults: {
          delimiter: ',',
          fill: [o.colors('purple', 200)],
          height: 18,
          max: null,
          min: 0,
          stroke: o.colors('purple', 600),
          strokeWidth: 1,
          width: 44,
        },
        init: function(e, a) {
          var i,
            n = a ? a.$ : o;
          n.fn.peity &&
            ((i = o.components.getDefaults('peityLine')),
            o('[data-plugin="peityLine"]', e).each(function() {
              var e = n(this),
                a = e.data();
              if (a.skin && o.colors(a.skin)) {
                var t = o.colors(a.skin);
                (i.fill = [t[200]]), (i.stroke = t[600]);
              }
              (a = o.extend(!0, {}, i, a)), e.peity('line', a);
            }));
        },
      }),
      o.components.register('peityPie', {
        mode: 'init',
        defaults: {
          delimiter: null,
          fill: [o.colors('purple', 700), o.colors('purple', 400), o.colors('purple', 200)],
          height: null,
          radius: 11,
          width: null,
        },
        init: function(e, a) {
          var i,
            n = a ? a.$ : o;
          n.fn.peity &&
            ((i = o.components.getDefaults('peityPie')),
            o('[data-plugin="peityPie"]', e).each(function() {
              var e = n(this),
                a = e.data();
              if (a.skin && o.colors(a.skin)) {
                var t = o.colors(a.skin);
                i.fill = [t[700], t[400], t[200]];
              }
              (a = o.extend(!0, {}, i, a)), e.peity('pie', a);
            }));
        },
      });
  })(window, document, jQuery),
  (function(s, e, a) {
    'use strict';
    jQuery.components.register('plyr', {
      mode: 'init',
      default: {
        i18n: {
          restart: '重新开始',
          rewind: '向后 {seektime} 秒',
          play: '播放',
          pause: '暂停',
          forward: '向前 {seektime} 秒',
          buffered: '缓冲',
          currentTime: '当前时间',
          duration: '持续时间',
          volume: '声音',
          toggleMute: '切换静音',
          toggleCaptions: '切换字幕',
          toggleFullscreen: '切换全屏',
        },
      },
      init: function(e, a) {
        var t,
          i,
          n,
          o = a && a.plyr ? a.plyr : s.plyr;
        void 0 !== o &&
          ((t = e),
          (i = new XMLHttpRequest()),
          (n = t.body),
          'withCredentials' in i &&
            (i.open('GET', 'https://cdn.plyr.io/1.1.5/sprite.svg', !0),
            i.send(),
            (i.onload = function() {
              var e = t.createElement('div');
              (e.style.display = 'none'),
                (e.innerHTML = i.responseText),
                n.insertBefore(e, n.childNodes[0]);
            })),
          o.setup());
      },
    });
  })(window, document),
  (function(e, a, n) {
    'use strict';
    n.components.register('rating', {
      mode: 'init',
      defaults: {
        targetKeep: !0,
        icon: 'font',
        starType: 'i',
        starOff: 'icon wb-star',
        starOn: 'icon wb-star orange-600',
        cancelOff: 'icon wb-minus-circle',
        cancelOn: 'icon wb-minus-circle orange-600',
        starHalf: 'icon wb-star-half orange-500',
        cancelHint: '取消评分',
        hints: ['很差', '差', '一般', '好', '非常好'],
      },
      init: function(e, a) {
        var t = a ? a.$ : n;
        if (t.fn.raty) {
          var i = this.defaults;
          n('[data-plugin="rating"]', e).each(function() {
            var e = t(this),
              a = n.extend(!0, {}, i, e.data());
            a.hints && 'string' == typeof a.hints && (a.hints = a.hints.split(',')), e.raty(a);
          });
        }
      },
    });
  })(window, document, jQuery),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('select2', {
      mode: 'default',
      defaults: { width: 'style', language: 'zh-CN' },
    });
  })(window, document),
  (function(e, a, n) {
    'use strict';
    n.components.register('selectable', {
      mode: 'init',
      defaults: {
        allSelector: '.selectable-all',
        itemSelector: '.selectable-item',
        rowSelector: 'tr',
        rowSelectable: !1,
        rowActiveClass: 'active',
        onChange: null,
      },
      init: function(e, a) {
        var t,
          i = a ? a.$ : n;
        i.fn.asSelectable &&
          ((t = n.components.getDefaults('selectable')),
          n('[data-plugin="selectable"], [data-selectable="selectable"]', e).each(function() {
            var e = n.extend({}, t, n(this).data(i));
            i(this).asSelectable(e);
          }));
      },
    });
  })(window, document, jQuery),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('slidePanel', {
      mode: 'manual',
      defaults: {
        closeSelector: '.slidePanel-close',
        mouseDragHandler: '.slidePanel-handler',
        loading: {
          template: function(e) {
            return (
              '<div class="' +
              e.classes.loading +
              '"><div class="loader loader-default"></div></div>'
            );
          },
          showCallback: function(e) {
            this.$el.addClass(e.classes.loading + '-show');
          },
          hideCallback: function(e) {
            this.$el.removeClass(e.classes.loading + '-show');
          },
        },
      },
    });
  })(window, document),
  (function(e, a, t) {
    'use strict';
    t.components.register('slimScroll', {
      mode: 'default',
      defaults: {
        height: '100%',
        size: '4px',
        color: t.configs.colors['blue-grey'][500],
        position: 'right',
        distance: '1px',
        railVisible: !0,
        railColor: t.configs.colors['blue-grey'][300],
        railOpacity: 0.1,
        railDraggable: !0,
        wheelStep: 15,
        borderRadius: '4px',
        railBorderRadius: '4px',
      },
    });
  })(window, document, jQuery),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('summernote', { mode: 'default', defaults: { height: 300 } });
  })(window, document),
  (function(o, e, s) {
    'use strict';
    s.components.register('switchery', {
      mode: 'init',
      defaults: { color: s.colors('purple', 600) },
      init: function(e, a) {
        var t,
          i = a && a.Switchery ? a.Switchery : o.Switchery,
          n = a ? a.$ : s;
        void 0 !== i &&
          ((t = s.components.getDefaults('switchery')),
          s('[data-plugin="switchery"]', e).each(function() {
            var e = s.extend({}, t, s(this).data(n));
            new i(this, e);
          }));
      },
    });
  })(window, document, jQuery),
  (function(e, a, t) {
    'use strict';
    t.components.register('table', {
      mode: 'api',
      api: function(e) {
        var a = 'click';
        void 0 !== e.ontouchstart && (a = 'touchstart'),
          t(e).on(a, '.table-section', function(e) {
            'checkbox' === e.target.type ||
              'button' === e.target.type ||
              'a' === e.target.tagName.toLowerCase() ||
              t(e.target).parent('div.checkbox-custom').length ||
              (t(this).hasClass('active')
                ? t(this).removeClass('active')
                : (t(this)
                    .siblings('.table-section')
                    .removeClass('active'),
                  t(this).addClass('active')));
          });
      },
    });
  })(window, document, jQuery),
  (function(e, a, i) {
    'use strict';
    i.components.register('verticalTab', {
      mode: 'init',
      init: function(e, a) {
        var t = a ? a.$ : i;
        t.fn.matchHeight &&
          i('.nav-tabs-vertical', e).each(function() {
            t(this)
              .children()
              .matchHeight();
          });
      },
    }),
      i.components.register('horizontalTab', {
        mode: 'init',
        init: function(e, a) {
          var t = a ? a.$ : i;
          t.fn.responsiveHorizontalTabs &&
            i('[data-approve="nav-tabs"]', e).each(function() {
              var e = t(this),
                a = i.extend(!0, {}, e.data());
              e.responsiveHorizontalTabs(a);
            });
        },
      });
  })(window, document, jQuery),
  (function(e, a, t) {
    'use strict';
    t.components.register('taskList', {
      mode: 'api',
      api: function(e) {
        t(e).on('change.site.task', '[data-role="task"]', function() {
          var e = t(this);
          e.find('[type="checkbox"]').is(':checked')
            ? e.addClass('task-done')
            : e.removeClass('task-done');
        }),
          t('[data-role="task"]').trigger('change.site.task');
      },
    });
  })(window, document, jQuery),
  (function(t, e, c) {
    'use strict';
    c.components.register('toastr', {
      mode: 'api',
      defaults: {},
      api: function(e, a) {
        var s,
          r = a && a.toastr ? a.toastr : t.toastr,
          l = a ? a.$ : c;
        void 0 !== r &&
          ((s = c.components.getDefaults('toastr')),
          c(e).on('click.site.toastr', '[data-plugin="toastr"]', function(e) {
            e.preventDefault();
            var a = c(this),
              t = c.extend(!0, {}, s, a.data(l)),
              i = t.message || '',
              n = t.type || 'info',
              o = t.title || void 0;
            switch (n) {
              case 'success':
                r.success(i, o, t);
                break;
              case 'warning':
                r.warning(i, o, t);
                break;
              case 'error':
                r.error(i, o, t);
                break;
              case 'info':
                r.info(i, o, t);
                break;
              default:
                r.info(i, o, t);
            }
          }));
      },
    });
  })(window, document, jQuery),
  (function(e, a, o) {
    'use strict';
    o.components.register('toolbar', {
      mode: 'init',
      defaults: { adjustment: 15, zIndex: 1900 },
      init: function(e, a) {
        var i,
          n = a ? a.$ : o;
        n.fn.toolbar &&
          ((i = o.components.getDefaults('toolbar')),
          o('[data-plugin="toolbar"]', e).each(function() {
            var e = n(this),
              a = e.data('toolbar'),
              t = o.extend(!0, {}, i);
            a && (t.content = a), e.toolbar(t);
          }));
      },
    });
  })(window, document, jQuery),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('twbsPagination', {
      mode: 'default',
      defaults: {
        first: '<span class="icon fa-angle-double-left" title="第一页"></span>',
        prev: '<span class="icon fa-angle-left" title="上一页"></span>',
        next: '<span class="icon fa-angle-right" title="下一页"></span>',
        last: '<span class="icon fa-angle-double-right" title="最后一页"></span>',
      },
    });
  })(window, document),
  (function(e, a, t) {
    'use strict';
    jQuery.components.register('webuiPopover', {
      mode: 'default',
      defaults: {
        trigger: 'click',
        width: 320,
        multi: !0,
        cloaseable: !1,
        style: '',
        delay: 300,
        padding: !0,
      },
    });
  })(window, document);
