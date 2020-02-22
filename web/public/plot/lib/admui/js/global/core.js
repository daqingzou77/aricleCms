/* 2018-9-7 21:22:42 | 版权所有 火星科技 http://marsgis.cn  【联系我们QQ：516584683，微信：marsgis】 */
!(function(t, r, c) {
  'use strict';
  function l(t, e, n, o) {
    if (void 0 === n && 1 === t.nodeType) {
      var i = 'data-' + e.replace(/([A-Z])/g, '-$1').toLowerCase();
      if ('string' == typeof (n = t.getAttribute(i))) {
        try {
          n =
            'true' === n ||
            ('false' !== n &&
              ('null' === n
                ? null
                : +n + '' === n
                ? +n
                : /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/.test(n)
                ? c.parseJSON(n)
                : n));
        } catch (t) {}
        o.data(t, e, n);
      } else n = void 0;
    }
    return n;
  }
  (c.ctx = location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1)),
    (c.colors = function(t, e) {
      return c.configs.colors || void 0 !== c.configs.colors[t]
        ? e && void 0 !== c.configs.colors[t][e]
          ? c.configs.colors[t][e]
          : c.configs.colors[t]
        : null;
    }),
    (c.po = function(t, e) {
      var n = c.components.getDefaults(t);
      return c.extend(!0, {}, n, e);
    }),
    (c.configs = c.configs || {}),
    c.extend(c.configs, {
      _data: {},
      get: function() {
        var t = this._data,
          e = arguments.length;
        if (0 !== e) {
          for (var n = 0; n < e; n++) t = t[arguments[n]];
          return t;
        }
      },
      set: function(t, e) {
        this.get(t) ? console.error('configs:' + t + '对象已经存在了') : (this._data[t] = e);
      },
      extend: function(t, e) {
        return c.extend(!0, this.get(t), e);
      },
    }),
    (c.components = c.components || {}),
    c.extend(c.components, {
      _components: {},
      register: function(t, e) {
        this._components[t] = e;
      },
      init: function(e, n, t, o) {
        var i,
          s = this;
        if (((o = o || !0), void 0 === t))
          c.each(this._components, function(t) {
            s.init(e, n, t, o);
          });
        else {
          if (((e = e || r), !(i = this.get(t)))) return;
          switch (i.mode) {
            case 'default':
              return this._initDefault(t, e, n);
            case 'init':
              return this._initComponent(i, e, n);
            case 'api':
              return this._initApi(i, e, o, n);
            default:
              return this._initApi(i, e, o, n), void this._initComponent(i, e, n);
          }
        }
      },
      _initDefault: function(n, t, e) {
        var o,
          i = e ? e.$ : c;
        i.fn[n] &&
          ((o = this.getDefaults(n)),
          c('[data-plugin=' + n + ']', t).each(function() {
            var t = i(this),
              e = c.extend(!0, {}, o, t.data());
            t[n](e);
          }));
      },
      _initComponent: function(t, e, n) {
        c.isFunction(t.init) && t.init.call(t, e, n);
      },
      _initApi: function(t, e, n, o) {
        n && c.isFunction(t.api) && t.api.call(t, e, o);
      },
      getDefaults: function(t) {
        var e = this.get(t);
        return e && void 0 !== e.defaults ? e.defaults : {};
      },
      get: function(t) {
        return void 0 !== this._components[t]
          ? this._components[t]
          : void console.error('component:' + t + ' 脚本文件没有注册任何信息！');
      },
    }),
    (c.storage = c.storage || {}),
    c.extend(c.storage, {
      set: function(t, e, n) {
        var o;
        if ((localStorage || console.error('该浏览器不支持localStorage对象'), !t || !e))
          return null;
        (o = { val: e, exp: !n || isNaN(n) ? null : new Date() - 1 + 1e3 * n * 60 }),
          'object' == typeof e && (o = JSON.stringify(o)),
          localStorage.setItem(t, o);
      },
      get: function(t) {
        var e, n, o;
        return (
          localStorage || console.error('该浏览器不支持localStorage对象'),
          (e = localStorage.getItem(t))
            ? ('string' == typeof e && (e = JSON.parse(e)),
              (n = new Date() - 1),
              (o = e.exp) && o < n ? (this.remove(t), null) : e.val)
            : null
        );
      },
      remove: function(t) {
        localStorage || console.error('该浏览器不支持localStorage对象'), localStorage.removeItem(t);
      },
    }),
    (c.sessionStorage = c.sessionStorage || {}),
    c.extend(c.sessionStorage, {
      set: function(t, e) {
        if ((sessionStorage || console.error('该浏览器不支持sessionStorage对象'), !t || !e))
          return null;
        'object' == typeof e && (e = JSON.stringify(e)), sessionStorage.setItem(t, e);
      },
      get: function(t) {
        var e;
        return (
          sessionStorage || console.error('该浏览器不支持sessionStorage对象'),
          (e = sessionStorage.getItem(t)) ? ('string' == typeof e && (e = JSON.parse(e)), e) : null
        );
      },
      remove: function(t) {
        sessionStorage || console.error('该浏览器不支持sessionStorage对象'),
          sessionStorage.removeItem(t);
      },
    }),
    (c.site = c.site || {}),
    c.fn.extend({
      data: function(t, e, n) {
        var o,
          i,
          s,
          r = this[0],
          a = r && r.attributes;
        if (void 0 === t || c.isFunction(t)) {
          if (
            ((n = t || c),
            this.length && ((s = n.data(r)), 1 === r.nodeType && !n._data(r, 'parsedAttrs')))
          ) {
            for (o = a.length; o--; )
              a[o] &&
                0 === (i = a[o].name).indexOf('data-') &&
                l(r, (i = n.camelCase(i.slice(5))), s[i], n);
            n._data(r, 'parsedAttrs', !0);
          }
          return s;
        }
        return c.isFunction(e) && e.fn.jquery
          ? r
            ? l(r, t, e.data(r, t), e)
            : void 0
          : 'object' == typeof t
          ? this.each(function() {
              e.data(this, t);
            })
          : ((n = n || c),
            1 < arguments.length
              ? this.each(function() {
                  n.data(this, t, e);
                })
              : r
              ? l(r, t, n.data(r, t), n)
              : void 0);
      },
    });
})(window, document, jQuery);
