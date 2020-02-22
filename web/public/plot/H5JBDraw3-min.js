var y =
    'function' == typeof Object.defineProperties
      ? Object.defineProperty
      : function(c, a, b) {
          c != Array.prototype && c != Object.prototype && (c[a] = b.value);
        },
  z =
    'undefined' != typeof window && window === this
      ? this
      : 'undefined' != typeof global && null != global
      ? global
      : this;
function A(c) {
  if (c) {
    for (var a = z, b = ['Array', 'prototype', 'fill'], d = 0; d < b.length - 1; d++) {
      var e = b[d];
      e in a || (a[e] = {});
      a = a[e];
    }
    b = b[b.length - 1];
    d = a[b];
    c = c(d);
    c != d && null != c && y(a, b, { configurable: !0, writable: !0, value: c });
  }
}
A(function(c) {
  return c
    ? c
    : function(a, b, d) {
        var c = this.length || 0;
        0 > b && (b = Math.max(0, c + b));
        if (null == d || d > c) d = c;
        d = Number(d);
        0 > d && (d = Math.max(0, c + d));
        for (b = Number(b || 0); b < d; b++) this[b] = a;
        return this;
      };
});
(function() {
  var c = {};
  window.f = c;
  c.a = function(a, b) {
    this.x = a;
    this.y = b;
  };
  c.a.prototype = {
    sub: function(a) {
      return new c.a(this.x - a.x, this.y - a.y);
    },
    add: function(a) {
      return new c.a(this.x + a.x, this.y + a.y);
    },
    length: function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    normalize: function(a) {
      var b = this.length();
      this.x = (this.x * a) / b;
      this.y = (this.y * a) / b;
    },
    toString: function() {
      return '[' + this.x + ',' + this.y + ']';
    },
    fa: function(a) {
      return 1e-6 > Math.abs(a.x - this.x) && 1e-6 > Math.abs(a.y - this.y) ? !0 : !1;
    },
    clone: function() {
      return new c.a(this.x, this.y);
    },
    set: function(a) {
      this.x = a.x;
      this.y = a.y;
    },
  };
  c.a.g = function(a, b, d) {
    return new c.a(a.x * d + b.x * (1 - d), a.y * d + b.y * (1 - d));
  };
  c.a.f = function(a, b) {
    return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
  };
  c.S = function(a, b, d, c, k) {
    this.F = a;
    this.G = b;
    this.h = d;
    this.i = c;
    this.end = k;
  };
  c.T = function() {
    this.v = -1;
    this.I = 2;
    this.ea = this.da = this.H = 0.5;
  };
  c.u = function(a, b) {
    this.w = new c.a(a, b);
    this.j = new c.a(a, b);
    this.l = new c.a(a, b);
  };
  c.A = function(a, b, c, e, k, h) {
    this.aa = a;
    this.ba = b;
    this.ca = c;
    this.d = e;
    this.e = k;
    this.ga = h;
  };
  c.A.prototype = {
    ha: function() {
      this.aa = 1;
      this.ba = this.e = this.ca = 0;
      this.d = 1;
      this.ga = 0;
    },
    rotate: function(a) {
      var b = Math.cos(a);
      a = Math.sin(a);
      return new c.A(b, a, -a, b, 0, 0);
    },
    ia: function(a) {
      return new c.a(
        this.aa * a.x + this.ca * a.y + this.e,
        this.ba * a.x + this.d * a.y + this.ga
      );
    },
  };
  c.b = function() {};
  c.b.g = function(a, b, d, e) {
    b = (b.y - a.y) / (b.x - a.x);
    e = (e.y - d.y) / (e.x - d.x);
    if (b == e) return null;
    if (isFinite(b))
      if (isFinite(e)) {
        var k = a.y - b * a.x;
        d = d.y - e * d.x;
        a = (k - d) / (e - b);
        d = b * a + k;
      } else (k = a.y - b * a.x), (a = d.x), (d = b * a + k);
    else (a = a.x), (d = d.y - e * d.x), (d = e * a + d);
    return new c.a(a, d);
  };
  c.b.f = function(a, b, c) {
    c = c.sub(b);
    a = a.sub(b);
    return 0 < c.x * a.y - c.y * a.x ? !0 : !1;
  };
  c.b.R = function(a, b, d, e, k, h) {
    h = Math.sqrt(Math.max(Math.max(c.a.f(b, d), c.a.f(b, e)), c.a.f(d, k))) * (h || 1);
    30 > h && (h = 30);
    for (var l, m, p = 0; 1 >= p; p += 1 / h)
      (l =
        Math.pow(p, 3) * (d.x + 3 * (e.x - k.x) - b.x) +
        3 * Math.pow(p, 2) * (b.x - 2 * e.x + k.x) +
        3 * p * (e.x - b.x) +
        b.x),
        (m =
          Math.pow(p, 3) * (d.y + 3 * (e.y - k.y) - b.y) +
          3 * Math.pow(p, 2) * (b.y - 2 * e.y + k.y) +
          3 * p * (e.y - b.y) +
          b.y),
        a.push(new c.a(l, m));
  };
  c.b.o = function(a, b, d, e, k) {
    var h = Math.sqrt(Math.max(Math.max(c.a.f(b, d), c.a.f(b, e)), c.a.f(d, e))) * (k || 1);
    10 > h && (h = 40);
    60 < h && (h = 60);
    for (var l = 0; 1 >= l; l += 1 / h) {
      k = (1 - l) * (1 - l) * b.x + 2 * l * (1 - l) * e.x + l * l * d.x;
      var m = (1 - l) * (1 - l) * b.y + 2 * l * (1 - l) * e.y + l * l * d.y;
      a.push(new c.a(k, m));
    }
    a.push(new c.a(d.x, d.y));
  };
  c.b.ra = function(a, b, d) {
    var e = d.sub(b);
    e = a.add(new c.a(-e.y, e.x));
    b = c.a.g(b, d, 0.5).sub(c.b.g(b, d, a, e));
    return a.add(b).add(b);
  };
  c.b.s = function(a, b, d) {
    var e = c.a.f(a, b),
      k = c.a.f(b, d);
    a = d.sub(a);
    a.normalize(1);
    d = new c.u(b.x, b.y);
    d.l.x = b.x - a.x * e * 0.3;
    d.l.y = b.y - a.y * e * 0.3;
    d.j.x = b.x + a.x * k * 0.3;
    d.j.y = b.y + a.y * k * 0.3;
    return d;
  };
  c.b.K = function(a) {
    for (var b = 0, d = a.length, e = 0; e < d - 1; e++) b += c.a.f(a[e], a[e + 1]);
    return b;
  };
  c.b.qa = function(a, b) {
    var d = a.length;
    if (0 > b) return a[0];
    if (1 < b) return a[d - 1];
    b = c.b.K(a) * b;
    for (var e = 0, k, h = 0; h < d - 1; h++) {
      var l = c.a.f(a[h], a[h + 1]);
      e += l;
      if (e >= b) {
        k = c.a.g(a[h], a[h + 1], (e - b) / l);
        break;
      }
    }
    return k;
  };
  c.b.W = function(a, b, d, e, k) {
    var h = h || 'JointStyle.MITER';
    var l = l || Number.NaN;
    var m = a.length;
    if (!(2 > m))
      for (var p = c.b.K(a), n = 0, q, r = 0; r < m; r++)
        0 == r
          ? ((q = c.b.P(a[0], a[1], e)), b.push(q.pop()), d.push(q.pop()))
          : r == a.length - 1
          ? ((q = c.b.P(a[a.length - 1], a[a.length - 2], k)), d.push(q.pop()), b.push(q.pop()))
          : ((n += c.a.f(a[r], a[r - 1])),
            (q = c.b.ka(a[r - 1], a[r], a[r + 1], e - (n / p) * (e - k), h, l)),
            b.push(q.pop()),
            d.push(q.pop()));
  };
  c.b.ka = function(a, b, d, e, k, h) {
    var l = a.sub(b),
      m = d.sub(b);
    l.normalize(1);
    m.normalize(1);
    m = l.add(m);
    m.normalize(1);
    if (0.001 > Math.abs(m.x) && 0.001 > Math.abs(m.y)) return c.b.P(b, d, e);
    'JointStyle.MITER' == k
      ? ((d = l.x * m.x + l.y * m.y),
        (e /= Math.sqrt(1 - d * d)),
        !isNaN(h) && e > h ? m.normalize(h) : m.normalize(e))
      : 'JointStyle.ROUND' == k && m.normalize(e);
    h = b.add(m);
    e = [];
    c.b.f(h, a, b) ? (e.push(h), e.push(b.sub(m))) : (e.push(b.sub(m)), e.push(h));
    return e;
  };
  c.b.P = function(a, b, d) {
    b = b.sub(a);
    b = new c.a(b.y, -b.x);
    b.normalize(d);
    d = a.add(b);
    a = a.sub(b);
    b = [];
    b.push(a);
    b.push(d);
    return b;
  };
  c.b.m = function(a, b) {
    var c = [];
    if (2 > a.length) return c;
    if (2 == a.length) return c.push(a[0]), c.push(a[1]), c;
    a = this.oa(a, b);
    for (b = 0; b < a.length - 1; b++) {
      var e = a[b],
        k = a[b + 1];
      this.R(c, e.w, k.w, e.j, k.l, 1);
    }
    return c;
  };
  c.b.oa = function(a, b) {
    var d = [],
      e = a.length;
    if (b) {
      for (b = 0; b < e; b++)
        0 == b
          ? d.push(c.b.s(a[e - 1], a[b], a[b + 1]))
          : b == e - 1
          ? d.push(c.b.s(a[b - 1], a[b], a[0]))
          : d.push(c.b.s(a[b - 1], a[b], a[b + 1]));
      d.push(c.b.s(a[e - 1], a[0], a[1]));
    } else
      for (b = 0; b < e; b++)
        0 == b || b == e - 1
          ? d.push(new c.u(a[b].x, a[b].y))
          : d.push(c.b.s(a[b - 1], a[b], a[b + 1]));
    return d;
  };
  c.b.U = function(a, b, d) {
    if (0 > (a.x - b.x) * (d.x - b.x) + (a.y - b.y) * (d.y - b.y)) var e = c.a.f(a, b);
    else if (0 > (a.x - d.x) * (b.x - d.x) + (a.y - d.y) * (b.y - d.y)) e = c.a.f(a, d);
    else {
      var k = a.sub(b),
        h = a.sub(d);
      k = Math.abs(k.x * h.y - k.y * h.x);
      d = c.a.f(b, d);
      0 == d ? (e = c.a.f(a, b)) : (e = k / d);
    }
    return e;
  };
  c.b.na = function(a) {
    for (var b = [], d = a.length, e = 0; e < d - 1; e++) {
      var k = a[e],
        h = a[e + 1];
      c.b.R(b, k.w, h.w, k.l, h.j, 3);
    }
    c.b.R(b, a[d - 1].w, a[0].w, a[d - 1].l, a[0].j, 3);
    return b;
  };
  c.c = function() {};
  c.c.m = function(a, b) {
    a = c.b.m(a, b);
    b = [];
    for (var d = 0; d < a.length; d++) {
      var e = a[d];
      b.push([e.x, e.y]);
    }
    return b;
  };
  c.c.Y = function(a, b, d) {
    a = c.c.ja(a, b, d);
    a = c.c.la(a[2], a[0], a[1]);
    a = c.b.na(a);
    b = [];
    for (d = 0; d < a.length; d++) {
      var e = a[d];
      b.push([e.x, e.y]);
    }
    return b;
  };
  c.c.ja = function(a, b, d) {
    var e = c.a.f(a, b),
      k = c.a.f(a, d),
      h = Math.max(e, c.a.f(b, d), k);
    return h == e ? c.c.M(d, a, b) : h == k ? c.c.M(b, a, d) : c.c.M(a, b, d);
  };
  c.c.M = function(a, b, d) {
    var e = d.sub(b);
    e = new c.a(e.y, -e.x);
    var k = c.b.U(a, b, d);
    e.normalize(k);
    k = c.a.g(b, d, 0.5);
    var h = [];
    c.b.f(a, b, d)
      ? (h.push(d), h.push(b), h.push(k.sub(e)))
      : (h.push(b), h.push(d), h.push(k.add(e)));
    h.push(a);
    return h;
  };
  c.c.la = function(a, b, d) {
    var e = [],
      k = c.a.f(b, d),
      h = c.a.g(b, d, 0.5),
      l = d.sub(b),
      m = new c.a(l.y, -l.x),
      p = c.b.U(a, b, d);
    m.normalize(k / 4);
    var n = new c.A();
    n.ha();
    n = n.rotate(-Math.PI / 8);
    var q = n.ia(m);
    n = new c.u(b.x, b.y);
    n.j = new c.a(b.sub(q).x, b.sub(q).y);
    n.l = new c.a(b.add(q).x, b.add(q).y);
    e.push(n);
    l.normalize(k / 4);
    n = new c.u(a.x, a.y);
    n.j = new c.a(a.sub(l).x, a.sub(l).y);
    n.l = new c.a(a.add(l).x, a.add(l).y);
    e.push(n);
    m.normalize(k / 4);
    n = new c.A();
    n.ha();
    n = n.rotate(Math.PI / 8);
    q = n.ia(m);
    n = new c.u(d.x, d.y);
    n.j = new c.a(d.add(q).x, d.add(q).y);
    n.l = new c.a(d.sub(q).x, d.sub(q).y);
    e.push(n);
    m.normalize(Math.sqrt(p));
    a = h.sub(m);
    l.normalize(k / 4);
    n = new c.u(a.x, a.y);
    n.j = new c.a(a.add(l).x, a.add(l).y);
    n.l = new c.a(a.sub(l).x, a.sub(l).y);
    e.push(n);
    return e;
  };
  c.c.B = function(a, b, d, e, k) {
    a = b.sub(a);
    d = a.length() * d;
    d > e && 0 < e ? a.normalize(e) : a.normalize(d);
    e = b.sub(a);
    return c.c.V(e, b, k);
  };
  c.c.J = function(a, b, d) {
    var e = b.sub(a);
    d = d ? new c.a(e.y, -e.x) : new c.a(-e.y, e.x);
    a = c.a.g(a, b, 0.5);
    e.length();
    d.x = d.x / 8;
    d.y = d.y / 8;
    return a.add(d);
  };
  c.c.N = function(a, b, d, e, k) {
    if (!b.fa(d)) {
      k = k || 0.5;
      var h = d.sub(b),
        l = -1 != e.v ? e.v / 2 : h.length() / 2;
      e.I = l / 2;
      h = new c.a(h.y, -h.x);
      h.normalize(e.I * k);
      var m = b.add(h),
        p = b.sub(h),
        n = d.add(h),
        q = d.sub(h);
      h.normalize(l);
      k = b.add(h);
      var r = b.sub(h),
        u = c.a.g(d, b, e.H);
      m = c.b.g(m, n, u, k);
      p = c.b.g(p, q, u, r);
      b = c.a.g(d, b, e.da);
      h = h.clone();
      h.normalize(l * e.ea);
      b.add(h);
      b.sub(h);
      a.push(m);
      a.push(k);
      a.push(d);
      a.push(r);
      a.push(p);
    }
  };
  c.c.C = function(a, b, d, e, k) {
    b = d.sub(b);
    e = b.length() * e;
    b.normalize(e);
    e = d.sub(b);
    c.c.N(a, e, d, k, 0.5);
  };
  c.c.V = function(a, b, d) {
    if (a.fa(b)) return new c.S(a, a, a, a, a);
    var e = b.sub(a),
      k = -1 != d.v ? d.v / 2 : e.length() / 2;
    d.I = k / 2;
    var h = new c.a(e.y, -e.x);
    h.normalize(d.I / 2);
    e = a.add(h);
    var l = a.sub(h),
      m = b.add(h),
      p = b.sub(h);
    h.normalize(k);
    var n = a.add(h),
      q = a.sub(h),
      r = c.a.g(b, a, d.H);
    m = c.b.g(e, m, r, n);
    p = c.b.g(l, p, r, q);
    a = c.a.g(b, a, d.da);
    h = h.clone();
    h.normalize(k * d.ea);
    a.add(h);
    a.sub(h);
    return new c.S(e, l, m, p, b);
  };
  c.c.X = function(a, b, d, e, k) {
    var h = [],
      l = c.c.B(a, d, 0.3, 80, k),
      m = c.c.B(b, e, 0.3, 80, k),
      p = [],
      n = [];
    c.c.C(p, a, d, 0.3, k);
    c.c.C(n, b, e, 0.3, k);
    var q = c.b.f(d, a, b),
      r = c.b.f(e, a, b);
    e = c.b.f(l.h, a, b);
    d = c.b.f(l.i, a, b);
    k = c.b.f(m.h, a, b);
    var u = c.b.f(m.i, a, b);
    if (0 == q) {
      var v = l.i;
      var w = l.G;
      var t = c.c.J(a, l.h, !0);
      c.b.o(h, a, l.h, t, 3);
      h = h.concat(p);
    } else {
      v = l.h;
      w = l.F;
      t = c.c.J(a, l.i, !1);
      var x = [];
      c.b.o(x, a, l.i, t, 3);
      h = h.concat(x);
      h = h.concat(p.reverse());
    }
    t = a.sub(b);
    1 == r
      ? ((l = m.i),
        (p = m.G),
        (a = c.c.Z(a, b, v, l, q == r)),
        (q = a.add(t)),
        c.c.$(h, v, w, a, q, l, p, e == d, k == u),
        (h = h.concat(n.reverse())),
        (t = c.c.J(m.h, b, !1)),
        c.b.o(h, m.h, b, t, 3))
      : ((l = m.h),
        (p = m.F),
        (a = c.c.Z(a, b, v, l, q == r)),
        (q = a.add(t)),
        c.c.$(h, v, w, a, q, l, p, e == d, k == u),
        (h = h.concat(n)),
        (t = c.c.J(m.i, b, !0)),
        c.b.o(h, m.i, b, t, 3));
    b = [];
    for (m = 0; m < h.length; m++) (n = h[m]), b.push([n.x, n.y]);
    return b;
  };
  c.c.$ = function(a, b, d, e, k, h, l, m, p) {
    d = m ? c.b.g(b, d, e, k) : d;
    k = p ? c.b.g(h, l, e, k) : l;
    d && c.b.o(a, b, e, d, 1);
    k && c.b.o(a, e, h, k, 1);
  };
  c.c.Z = function(a, b, d, e, k) {
    var h = c.a.g(a, b, 0.5),
      l = c.a.g(d, e, 0.5),
      m = a.sub(b),
      p = d.add(m);
    m = e.add(m);
    p = c.b.g(p, d, h, l);
    m = c.b.g(m, e, h, l);
    var n = c.a.f(h, p),
      q = c.a.f(h, m);
    c.b.f(d, a, b);
    c.b.f(e, a, b);
    if (k) return n < q ? c.a.g(h, p, 0.7) : c.a.g(h, m, 0.7);
    a = c.a.g(h, l, 0.9);
    return Math.min(n, q) > c.a.f(h, a) ? a : n < q ? c.a.g(p, h, 0.3) : c.a.g(m, h, 0.3);
  };
  c.c.D = function(a, b, d, e, k) {
    var h = [],
      l = b.sub(a);
    l = new c.a(l.y, -l.x);
    l.normalize(c.a.f(a, b) * e);
    e = a.add(l);
    l = a.sub(l);
    h.push(e);
    c.c.N(h, c.a.g(a, b, 0.3), b, d, k);
    h.push(l);
    a = [];
    for (b = 0; b < h.length; b++) (d = h[b]), a.push([d.x, d.y]);
    return a;
  };
  c.c.L = function(a, b, d, e, k) {
    k |= 0;
    var h = [],
      l = c.a.g(a, b, 0.5);
    if (c.b.f(a, l, d)) {
      var m = b;
      var p = a;
    } else (m = a), (p = b);
    var n = c.a.g(l, d, 0.3);
    l = c.c.V(n, d, e);
    var q = [];
    c.c.N(q, n, d, e);
    n = l.F.add(l.F.sub(l.h));
    e = l.G.add(l.G.sub(l.i));
    c.b.o(h, m, l.h, n);
    h = h.concat(q);
    m = [];
    c.b.o(m, l.i, p, e);
    h = h.concat(m);
    1 == k && h.push(c.a.g(c.a.g(a, b, 0.5), d, 0.8));
    a = [];
    for (b = 0; b < h.length; b++) (d = h[b]), a.push([d.x, d.y]);
    return a;
  };
  c.c.O = function(a, b, d) {
    d = d || 0.07;
    var e = a.length;
    var k = a[e - 1],
      h = c.b.s(a[e - 3], a[e - 2], k),
      l = c.c.B(h.j, k, 0.5, 200, b);
    e = [];
    c.c.C(e, h.j, k, 0.5, b);
    k = [];
    b = [];
    c.b.W(a, k, b, c.b.K(a) * d, c.a.f(l.h, l.i) / 2);
    k[k.length - 1] = l.h;
    b[b.length - 1] = l.i;
    a = c.b.m(k);
    d = c.b.m(b);
    e = a.concat(e);
    e = e.concat(d.reverse());
    a = [];
    for (d = 0; d < e.length; d++) (l = e[d]), a.push([l.x, l.y]);
    return a;
  };
  c.c.O = function(a, b, d) {
    d = d || 0.07;
    var e = a.length;
    var k = a[e - 1],
      h = c.b.s(a[e - 3], a[e - 2], k),
      l = c.c.B(h.j, k, 0.5, 200, b);
    e = [];
    c.c.C(e, h.j, k, 0.5, b);
    k = [];
    b = [];
    c.b.W(a, k, b, c.b.K(a) * d, c.a.f(l.h, l.i) / 2);
    k[k.length - 1] = l.h;
    b[b.length - 1] = l.i;
    a = c.b.m(k);
    d = c.b.m(b);
    e = a.concat(e);
    e = e.concat(d.reverse());
    a = [];
    for (d = 0; d < e.length; d++) (l = e[d]), a.push([l.x, l.y]);
    return a;
  };
  c.c.pa = function(a, b, d, e) {
    var k = null,
      h = new c.T();
    if (2001 == a) {
      if (4 > b.length) return;
      k = c.c.X(b[0], b[1], b[2], b[3], h);
    } else
      2003 == a
        ? (k = c.c.D(b[0], b[1], h, 0.125, 0.5))
        : 2004 == a
        ? ((h.v = 0.8 * c.a.f(b[0], b[1])), (h.H = 0), (k = c.c.D(b[0], b[1], h, 0.35, 0.8)))
        : 2005 == a
        ? (k = c.c.L(b[0], b[1], b[2], h))
        : 2006 == a
        ? (k = c.c.L(b[0], b[1], b[2], h))
        : 2007 == a
        ? (k = c.c.O(b, h, 0.07))
        : 2008 == a
        ? (k = c.c.m(b, !0))
        : 2011 == a && (k = c.c.Y(b[0], b[1], b[2]));
    if (null != k) {
      e.beginPath();
      e.moveTo(k[0].x, k[0].y);
      for (a = 1; a < k.length; a++) e.lineTo(k[a].x, k[a].y);
      e.lineTo(k[0].x, k[0].y);
      e.closePath();
      e.fillStyle = d.fillColor;
      e.fill();
    }
    return k;
  };
  c.c.ma = function(a, b) {
    var d = null,
      e = new c.T();
    if (2001 == a) {
      if (4 > b.length) return;
      d = c.c.X(b[0], b[1], b[3], b[2], e);
    } else
      2003 == a
        ? (d = c.c.D(b[0], b[1], e, 0.125, 0.5))
        : 2004 == a
        ? ((e.v = 0.8 * c.a.f(b[0], b[1])), (e.H = 0), (d = c.c.D(b[0], b[1], e, 0.35, 0.8)))
        : 2005 == a
        ? (d = c.c.L(b[0], b[1], b[2], e, !1))
        : 2006 == a
        ? (d = c.c.L(b[0], b[1], b[2], e, !0))
        : 2007 == a
        ? (d = c.c.O(b, e, 0.07))
        : 2008 == a
        ? (d = c.c.m(b, !0))
        : 2011 == a && (d = c.c.Y(b[0], b[1], b[2]));
    return d;
  };
  window.H5JB_getJBArray = function(a, b) {
    for (var d = [], e = 0; e < b.length; e += 2) d.push(new c.a(b[e], b[e + 1]));
    return c.c.ma(a, d);
  };
})();
