/* 2018-9-7 21:22:42 | 版权所有 火星科技 http://marsgis.cn  【联系我们QQ：516584683，微信：marsgis】 */
!(function(e, n, o) {
  'use strict';
  o.parentFrame = o(e.parent.document);
  var t = (e.parentFrame = e.parent);
  (o.ctx = t.$.ctx),
    (o.colors = t.$.colors),
    (o.po = t.$.po),
    (o.storage = t.$.storage),
    (o.sessionStorage = t.$.sessionStorage),
    (o.site = t.$.site),
    o.site && o.site.contentTabs && o.site.contentTabs.ifameTabs(n),
    (o.configs = t.$.configs),
    t.$.components && t.$.components.init(n, e),
    (e.Breakpoints = t.Breakpoints),
    (e.toastr = t.toastr),
    (e.layer = t.layer),
    (e.haoutil = t.haoutil),
    (e.notifyFn = t.$.notifyFn);
  var i = i || {};
  o.extend(i, {
    _queue: { prepare: [], run: [], complete: [] },
    run: function() {
      var e = this;
      this._dequeue('prepare', function() {
        e._trigger('before.run', e);
      }),
        this._dequeue('run', function() {
          e._dequeue('complete', function() {
            e._trigger('after.run', e);
          });
        });
    },
    _dequeue: function(e, t) {
      var n = this,
        i = this._getQueue(e).shift();
      i
        ? i.call(this, function() {
            n._dequeue(e, t);
          })
        : o.isFunction(t) && t.call(this);
    },
    _getQueue: function(e) {
      return o.isArray(this._queue[e]) || (this._queue[e] = []), this._queue[e];
    },
    extend: function(n) {
      return (
        o.each(this._queue, function(e, t) {
          o.isFunction(n[e]) && (t.unshift(n[e]), delete n[e]);
        }),
        o.extend(this, n),
        this
      );
    },
    _trigger: function(e, t, n) {
      void 0 !== e && (void 0 === n && (n = o('#admui-pageContent')), n.trigger(e + '.app', t));
    },
  });
  var s = {
    pageAside: function() {
      var e = o('.page-aside'),
        t = e.hasClass('open');
      e.toggleClass('open', !t);
    },
    run: function(e) {
      var t = this;
      o(n).on('click', '.page-aside-switch', function(e) {
        t.pageAside(), e.stopPropagation();
      }),
        e();
    },
  };
  (e.App = o.extend({}, i)), App.extend(s);
})(window, document, jQuery);
