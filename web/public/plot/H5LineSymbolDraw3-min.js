(function() {
  var d = {};
  window.f = d;
  d.j = function(a, b, c) {
    this.g = a;
    this.i = b;
    this.alt = c;
  };
  d.a = function(a, b) {
    this.x = a;
    this.y = b;
  };
  d.a.prototype = {
    sub: function(a) {
      return new d.a(this.x - a.x, this.y - a.y);
    },
    add: function(a) {
      return new d.a(this.x + a.x, this.y + a.y);
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
      return new d.a(this.x, this.y);
    },
    set: function(a) {
      this.x = a.x;
      this.y = a.y;
    },
  };
  d.a.h = function(a, b, c) {
    return new d.a(a.x * c + b.x * (1 - c), a.y * c + b.y * (1 - c));
  };
  d.a.f = function(a, b) {
    return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
  };
  d.S = function(a, b, c, d, k) {
    this.I = a;
    this.J = b;
    this.l = c;
    this.m = d;
    this.end = k;
  };
  d.ja = function() {
    this.C = -1;
    this.K = 2;
    this.ea = this.da = this.O = 0.5;
  };
  d.A = function(a, b) {
    this.B = new d.a(a, b);
    this.o = new d.a(a, b);
    this.s = new d.a(a, b);
  };
  d.D = function(a, b, c, d, k, g) {
    this.aa = a;
    this.ba = b;
    this.ca = c;
    this.d = d;
    this.e = k;
    this.ga = g;
  };
  d.D.prototype = {
    ha: function() {
      this.aa = 1;
      this.ba = this.e = this.ca = 0;
      this.d = 1;
      this.ga = 0;
    },
    rotate: function(a) {
      var b = Math.cos(a);
      a = Math.sin(a);
      return new d.D(b, a, -a, b, 0, 0);
    },
    ia: function(a) {
      return new d.a(
        this.aa * a.x + this.ca * a.y + this.e,
        this.ba * a.x + this.d * a.y + this.ga
      );
    },
  };
  d.b = function() {};
  d.b.h = function(a, b, c, e) {
    b = (b.y - a.y) / (b.x - a.x);
    e = (e.y - c.y) / (e.x - c.x);
    if (b == e) return null;
    if (isFinite(b))
      if (isFinite(e)) {
        var k = a.y - b * a.x;
        c = c.y - e * c.x;
        a = (k - c) / (e - b);
        c = b * a + k;
      } else (k = a.y - b * a.x), (a = c.x), (c = b * a + k);
    else (a = a.x), (c = c.y - e * c.x), (c = e * a + c);
    return new d.a(a, c);
  };
  d.b.f = function(a, b, c) {
    c = c.sub(b);
    a = a.sub(b);
    return 0 < c.x * a.y - c.y * a.x ? !0 : !1;
  };
  d.b.N = function(a, b, c, e, k, g) {
    g = Math.sqrt(Math.max(Math.max(d.a.f(b, c), d.a.f(b, e)), d.a.f(c, k))) * (g || 1);
    30 > g && (g = 30);
    for (var l, m, p = 0; 1 >= p; p += 1 / g)
      (l =
        Math.pow(p, 3) * (c.x + 3 * (e.x - k.x) - b.x) +
        3 * Math.pow(p, 2) * (b.x - 2 * e.x + k.x) +
        3 * p * (e.x - b.x) +
        b.x),
        (m =
          Math.pow(p, 3) * (c.y + 3 * (e.y - k.y) - b.y) +
          3 * Math.pow(p, 2) * (b.y - 2 * e.y + k.y) +
          3 * p * (e.y - b.y) +
          b.y),
        a.push(new d.a(l, m));
  };
  d.b.v = function(a, b, c, e, k) {
    var g = Math.sqrt(Math.max(Math.max(d.a.f(b, c), d.a.f(b, e)), d.a.f(c, e))) * (k || 1);
    10 > g && (g = 40);
    60 < g && (g = 60);
    for (var l = 0; 1 >= l; l += 1 / g) {
      k = (1 - l) * (1 - l) * b.x + 2 * l * (1 - l) * e.x + l * l * c.x;
      var m = (1 - l) * (1 - l) * b.y + 2 * l * (1 - l) * e.y + l * l * c.y;
      a.push(new d.a(k, m));
    }
    a.push(new d.a(c.x, c.y));
  };
  d.b.xa = function(a, b, c) {
    var e = c.sub(b);
    e = a.add(new d.a(-e.y, e.x));
    b = d.a.h(b, c, 0.5).sub(d.b.h(b, c, a, e));
    return a.add(b).add(b);
  };
  d.b.w = function(a, b, c) {
    var e = d.a.f(a, b),
      k = d.a.f(b, c);
    a = c.sub(a);
    a.normalize(1);
    c = new d.A(b.x, b.y);
    c.s.x = b.x - a.x * e * 0.3;
    c.s.y = b.y - a.y * e * 0.3;
    c.o.x = b.x + a.x * k * 0.3;
    c.o.y = b.y + a.y * k * 0.3;
    return c;
  };
  d.b.L = function(a) {
    for (var b = 0, c = a.length, e = 0; e < c - 1; e++) b += d.a.f(a[e], a[e + 1]);
    return b;
  };
  d.b.wa = function(a, b) {
    var c = a.length;
    if (0 > b) return a[0];
    if (1 < b) return a[c - 1];
    b = d.b.L(a) * b;
    for (var e = 0, k, g = 0; g < c - 1; g++) {
      var l = d.a.f(a[g], a[g + 1]);
      e += l;
      if (e >= b) {
        k = d.a.h(a[g], a[g + 1], (e - b) / l);
        break;
      }
    }
    return k;
  };
  d.b.V = function(a, b, c, e, k) {
    var g = g || 'JointStyle.MITER';
    var l = l || Number.NaN;
    var m = a.length;
    if (!(2 > m))
      for (var p = d.b.L(a), n = 0, q, r = 0; r < m; r++)
        0 == r
          ? ((q = d.b.M(a[0], a[1], e)), b.push(q.pop()), c.push(q.pop()))
          : r == a.length - 1
          ? ((q = d.b.M(a[a.length - 1], a[a.length - 2], k)), c.push(q.pop()), b.push(q.pop()))
          : ((n += d.a.f(a[r], a[r - 1])),
            (q = d.b.na(a[r - 1], a[r], a[r + 1], e - (n / p) * (e - k), g, l)),
            b.push(q.pop()),
            c.push(q.pop()));
  };
  d.b.na = function(a, b, c, e, k, g) {
    var l = a.sub(b),
      m = c.sub(b);
    l.normalize(1);
    m.normalize(1);
    m = l.add(m);
    m.normalize(1);
    if (0.001 > Math.abs(m.x) && 0.001 > Math.abs(m.y)) return d.b.M(b, c, e);
    'JointStyle.MITER' == k
      ? ((c = l.x * m.x + l.y * m.y),
        (e /= Math.sqrt(1 - c * c)),
        !isNaN(g) && e > g ? m.normalize(g) : m.normalize(e))
      : 'JointStyle.ROUND' == k && m.normalize(e);
    g = b.add(m);
    e = [];
    d.b.f(g, a, b) ? (e.push(g), e.push(b.sub(m))) : (e.push(b.sub(m)), e.push(g));
    return e;
  };
  d.b.M = function(a, b, c) {
    b = b.sub(a);
    b = new d.a(b.y, -b.x);
    b.normalize(c);
    c = a.add(b);
    a = a.sub(b);
    b = [];
    b.push(a);
    b.push(c);
    return b;
  };
  d.b.u = function(a, b) {
    var c = [];
    if (2 > a.length) return c;
    if (2 == a.length) return c.push(a[0]), c.push(a[1]), c;
    a = this.ta(a, b);
    for (b = 0; b < a.length - 1; b++) {
      var d = a[b],
        k = a[b + 1];
      this.N(c, d.B, k.B, d.o, k.s, 1);
    }
    return c;
  };
  d.b.ta = function(a, b) {
    var c = [],
      e = a.length;
    if (b) {
      for (b = 0; b < e; b++)
        0 == b
          ? c.push(d.b.w(a[e - 1], a[b], a[b + 1]))
          : b == e - 1
          ? c.push(d.b.w(a[b - 1], a[b], a[0]))
          : c.push(d.b.w(a[b - 1], a[b], a[b + 1]));
      c.push(d.b.w(a[e - 1], a[0], a[1]));
    } else
      for (b = 0; b < e; b++)
        0 == b || b == e - 1
          ? c.push(new d.A(a[b].x, a[b].y))
          : c.push(d.b.w(a[b - 1], a[b], a[b + 1]));
    return c;
  };
  d.b.T = function(a, b, c) {
    if (0 > (a.x - b.x) * (c.x - b.x) + (a.y - b.y) * (c.y - b.y)) var e = d.a.f(a, b);
    else if (0 > (a.x - c.x) * (b.x - c.x) + (a.y - c.y) * (b.y - c.y)) e = d.a.f(a, c);
    else {
      var k = a.sub(b),
        g = a.sub(c);
      k = Math.abs(k.x * g.y - k.y * g.x);
      c = d.a.f(b, c);
      0 == c ? (e = d.a.f(a, b)) : (e = k / c);
    }
    return e;
  };
  d.b.ra = function(a) {
    for (var b = [], c = a.length, e = 0; e < c - 1; e++) {
      var k = a[e],
        g = a[e + 1];
      d.b.N(b, k.B, g.B, k.s, g.o, 3);
    }
    d.b.N(b, a[c - 1].B, a[0].B, a[c - 1].s, a[0].o, 3);
    return b;
  };
  d.c = function() {};
  d.c.u = function(a, b) {
    a = d.b.u(a, b);
    b = [];
    for (var c = 0; c < a.length; c++) {
      var e = a[c];
      b.push([e.x, e.y]);
    }
    return b;
  };
  d.c.ma = function(a) {
    var b = [];
    b.push(a[0]);
    b.push(a[0]);
    for (var c = 1; c < a.length - 1; c++) {
      var e = new d.j(0, 0, 0),
        k = new d.j(0, 0, 0),
        g = new d.j(0, 0, 0),
        l = new d.j(a[c].g, a[c].i, 0);
      e.g = (a[c - 1].g + l.g) / 2;
      e.i = (a[c - 1].i + l.i) / 2;
      k.g = (a[c + 1].g + l.g) / 2;
      k.i = (a[c + 1].i + l.i) / 2;
      g.g = (e.g + k.g) / 2;
      g.i = (e.i + k.i) / 2;
      b.push(new d.j(e.g - g.g + l.g, e.i - g.i + l.i, l.alt));
      b.push(new d.j(l.g, l.i, l.alt));
      b.push(new d.j(k.g - g.g + l.g, k.i - g.i + l.i, l.alt));
    }
    b.push(a[a.length - 1]);
    b.push(a[a.length - 1]);
    a = [];
    e = [1, 3, 3, 1];
    g = b.length;
    l = [];
    if (2 <= g)
      for (c = 1, k = 0; c <= g - 1; c++, k++)
        l.push(b[c].g - b[c - 1].g),
          180 < Math.abs(l[k]) && (l[k] = 0 < l[k] ? l[k] - 360 : l[k] + 360),
          (b[c].g = b[c - 1].g + l[k]);
    for (g = 0; g <= b.length - 4; g += 3)
      for (c = 0; 20 > c; c++) {
        l = c / 20;
        var m = 0,
          p = 0;
        for (k = 0; 4 > k; k++)
          (m += e[k] * Math.pow(1 - l, 3 - k) * Math.pow(l, k) * b[g + k].g),
            (p += e[k] * Math.pow(1 - l, 3 - k) * Math.pow(l, k) * b[g + k].i);
        a.push(new d.j(m, p, 0));
      }
    a.push(b[b.length - 1]);
    return a;
  };
  d.c.oa = function(a, b, c) {
    a = d.c.la(a, b, c);
    a = d.c.pa(a[2], a[0], a[1]);
    a = d.b.ra(a);
    b = [];
    for (c = 0; c < a.length; c++) {
      var e = a[c];
      b.push([e.x, e.y]);
    }
    return b;
  };
  d.c.la = function(a, b, c) {
    var e = d.a.f(a, b),
      k = d.a.f(a, c),
      g = Math.max(e, d.a.f(b, c), k);
    return g == e ? d.c.P(c, a, b) : g == k ? d.c.P(b, a, c) : d.c.P(a, b, c);
  };
  d.c.P = function(a, b, c) {
    var e = c.sub(b);
    e = new d.a(e.y, -e.x);
    var k = d.b.T(a, b, c);
    e.normalize(k);
    k = d.a.h(b, c, 0.5);
    var g = [];
    d.b.f(a, b, c)
      ? (g.push(c), g.push(b), g.push(k.sub(e)))
      : (g.push(b), g.push(c), g.push(k.add(e)));
    g.push(a);
    return g;
  };
  d.c.pa = function(a, b, c) {
    var e = [],
      k = d.a.f(b, c),
      g = d.a.h(b, c, 0.5),
      l = c.sub(b),
      m = new d.a(l.y, -l.x),
      p = d.b.T(a, b, c);
    m.normalize(k / 4);
    var n = new d.D();
    n.ha();
    n = n.rotate(-Math.PI / 8);
    var q = n.ia(m);
    n = new d.A(b.x, b.y);
    n.o = new d.a(b.sub(q).x, b.sub(q).y);
    n.s = new d.a(b.add(q).x, b.add(q).y);
    e.push(n);
    l.normalize(k / 4);
    n = new d.A(a.x, a.y);
    n.o = new d.a(a.sub(l).x, a.sub(l).y);
    n.s = new d.a(a.add(l).x, a.add(l).y);
    e.push(n);
    m.normalize(k / 4);
    n = new d.D();
    n.ha();
    n = n.rotate(Math.PI / 8);
    q = n.ia(m);
    n = new d.A(c.x, c.y);
    n.o = new d.a(c.add(q).x, c.add(q).y);
    n.s = new d.a(c.sub(q).x, c.sub(q).y);
    e.push(n);
    m.normalize(Math.sqrt(p));
    a = g.sub(m);
    l.normalize(k / 4);
    n = new d.A(a.x, a.y);
    n.o = new d.a(a.add(l).x, a.add(l).y);
    n.s = new d.a(a.sub(l).x, a.sub(l).y);
    e.push(n);
    return e;
  };
  d.c.F = function(a, b, c, e, k) {
    a = b.sub(a);
    c = a.length() * c;
    c > e && 0 < e ? a.normalize(e) : a.normalize(c);
    e = b.sub(a);
    return d.c.U(e, b, k);
  };
  d.c.H = function(a, b, c) {
    var e = b.sub(a);
    c = c ? new d.a(e.y, -e.x) : new d.a(-e.y, e.x);
    a = d.a.h(a, b, 0.5);
    e.length();
    c.x = c.x / 8;
    c.y = c.y / 8;
    return a.add(c);
  };
  d.c.R = function(a, b, c, e, k) {
    if (!b.fa(c)) {
      k = k || 0.5;
      var g = c.sub(b),
        l = -1 != e.C ? e.C / 2 : g.length() / 2;
      e.K = l / 2;
      g = new d.a(g.y, -g.x);
      g.normalize(e.K * k);
      var m = b.add(g),
        p = b.sub(g),
        n = c.add(g),
        q = c.sub(g);
      g.normalize(l);
      k = b.add(g);
      var r = b.sub(g),
        u = d.a.h(c, b, e.O);
      m = d.b.h(m, n, u, k);
      p = d.b.h(p, q, u, r);
      b = d.a.h(c, b, e.da);
      g = g.clone();
      g.normalize(l * e.ea);
      b.add(g);
      b.sub(g);
      a.push(m);
      a.push(k);
      a.push(c);
      a.push(r);
      a.push(p);
    }
  };
  d.c.G = function(a, b, c, e, k) {
    b = c.sub(b);
    e = b.length() * e;
    b.normalize(e);
    e = c.sub(b);
    d.c.R(a, e, c, k, 0.5);
  };
  d.c.U = function(a, b, c) {
    if (a.fa(b)) return new d.S(a, a, a, a, a);
    var e = b.sub(a),
      k = -1 != c.C ? c.C / 2 : e.length() / 2;
    c.K = k / 2;
    var g = new d.a(e.y, -e.x);
    g.normalize(c.K / 2);
    e = a.add(g);
    var l = a.sub(g),
      m = b.add(g),
      p = b.sub(g);
    g.normalize(k);
    var n = a.add(g),
      q = a.sub(g),
      r = d.a.h(b, a, c.O);
    m = d.b.h(e, m, r, n);
    p = d.b.h(l, p, r, q);
    a = d.a.h(b, a, c.da);
    g = g.clone();
    g.normalize(k * c.ea);
    a.add(g);
    a.sub(g);
    return new d.S(e, l, m, p, b);
  };
  d.c.ua = function(a, b, c, e, k) {
    var g = [],
      l = d.c.F(a, c, 0.3, 80, k),
      m = d.c.F(b, e, 0.3, 80, k),
      p = [],
      n = [];
    d.c.G(p, a, c, 0.3, k);
    d.c.G(n, b, e, 0.3, k);
    var q = d.b.f(c, a, b),
      r = d.b.f(e, a, b);
    e = d.b.f(l.l, a, b);
    c = d.b.f(l.m, a, b);
    k = d.b.f(m.l, a, b);
    var u = d.b.f(m.m, a, b);
    if (0 == q) {
      var v = l.m;
      var w = l.J;
      var t = d.c.H(a, l.l, !0);
      d.b.v(g, a, l.l, t, 3);
      g = g.concat(p);
    } else {
      v = l.l;
      w = l.I;
      t = d.c.H(a, l.m, !1);
      var x = [];
      d.b.v(x, a, l.m, t, 3);
      g = g.concat(x);
      g = g.concat(p.reverse());
    }
    t = a.sub(b);
    1 == r
      ? ((l = m.m),
        (p = m.J),
        (a = d.c.Y(a, b, v, l, q == r)),
        (q = a.add(t)),
        d.c.Z(g, v, w, a, q, l, p, e == c, k == u),
        (g = g.concat(n.reverse())),
        (t = d.c.H(m.l, b, !1)),
        d.b.v(g, m.l, b, t, 3))
      : ((l = m.l),
        (p = m.I),
        (a = d.c.Y(a, b, v, l, q == r)),
        (q = a.add(t)),
        d.c.Z(g, v, w, a, q, l, p, e == c, k == u),
        (g = g.concat(n)),
        (t = d.c.H(m.m, b, !0)),
        d.b.v(g, m.m, b, t, 3));
    b = [];
    for (m = 0; m < g.length; m++) (n = g[m]), b.push([n.x, n.y]);
    return b;
  };
  d.c.Z = function(a, b, c, e, k, g, l, m, p) {
    c = m ? d.b.h(b, c, e, k) : c;
    k = p ? d.b.h(g, l, e, k) : l;
    c && d.b.v(a, b, e, c, 1);
    k && d.b.v(a, e, g, k, 1);
  };
  d.c.Y = function(a, b, c, e, k) {
    var g = d.a.h(a, b, 0.5),
      l = d.a.h(c, e, 0.5),
      m = a.sub(b),
      p = c.add(m);
    m = e.add(m);
    p = d.b.h(p, c, g, l);
    m = d.b.h(m, e, g, l);
    var n = d.a.f(g, p),
      q = d.a.f(g, m);
    d.b.f(c, a, b);
    d.b.f(e, a, b);
    if (k) return n < q ? d.a.h(g, p, 0.7) : d.a.h(g, m, 0.7);
    a = d.a.h(g, l, 0.9);
    return Math.min(n, q) > d.a.f(g, a) ? a : n < q ? d.a.h(p, g, 0.3) : d.a.h(m, g, 0.3);
  };
  d.c.X = function(a, b, c, e, k) {
    var g = [],
      l = b.sub(a);
    l = new d.a(l.y, -l.x);
    l.normalize(d.a.f(a, b) * e);
    e = a.add(l);
    l = a.sub(l);
    g.push(e);
    d.c.R(g, d.a.h(a, b, 0.3), b, c, k);
    g.push(l);
    a = [];
    for (b = 0; b < g.length; b++) (c = g[b]), a.push([c.x, c.y]);
    return a;
  };
  d.c.$ = function(a, b, c, e, k) {
    k |= 0;
    var g = [],
      l = d.a.h(a, b, 0.5);
    if (d.b.f(a, l, c)) {
      var m = b;
      var p = a;
    } else (m = a), (p = b);
    var n = d.a.h(l, c, 0.3);
    l = d.c.U(n, c, e);
    var q = [];
    d.c.R(q, n, c, e);
    n = l.I.add(l.I.sub(l.l));
    e = l.J.add(l.J.sub(l.m));
    d.b.v(g, m, l.l, n);
    g = g.concat(q);
    m = [];
    d.b.v(m, l.m, p, e);
    g = g.concat(m);
    1 == k && g.push(d.a.h(d.a.h(a, b, 0.5), c, 0.8));
    a = [];
    for (b = 0; b < g.length; b++) (c = g[b]), a.push([c.x, c.y]);
    return a;
  };
  d.c.W = function(a, b, c) {
    c = c || 0.07;
    var e = a.length;
    var k = a[e - 1],
      g = d.b.w(a[e - 3], a[e - 2], k),
      l = d.c.F(g.o, k, 0.5, 200, b);
    e = [];
    d.c.G(e, g.o, k, 0.5, b);
    k = [];
    b = [];
    d.b.V(a, k, b, d.b.L(a) * c, d.a.f(l.l, l.m) / 2);
    k[k.length - 1] = l.l;
    b[b.length - 1] = l.m;
    a = d.b.u(k);
    c = d.b.u(b);
    e = a.concat(e);
    e = e.concat(c.reverse());
    a = [];
    for (c = 0; c < e.length; c++) (l = e[c]), a.push([l.x, l.y]);
    return a;
  };
  d.c.W = function(a, b, c) {
    c = c || 0.07;
    var e = a.length;
    var k = a[e - 1],
      g = d.b.w(a[e - 3], a[e - 2], k),
      l = d.c.F(g.o, k, 0.5, 200, b);
    e = [];
    d.c.G(e, g.o, k, 0.5, b);
    k = [];
    b = [];
    d.b.V(a, k, b, d.b.L(a) * c, d.a.f(l.l, l.m) / 2);
    k[k.length - 1] = l.l;
    b[b.length - 1] = l.m;
    a = d.b.u(k);
    c = d.b.u(b);
    e = a.concat(e);
    e = e.concat(c.reverse());
    a = [];
    for (c = 0; c < e.length; c++) (l = e[c]), a.push([l.x, l.y]);
    return a;
  };
  d.c.va = function(a, b) {
    var c = null,
      e = new d.ja();
    937 == a
      ? (c = d.c.u(b, !0))
      : 2003 == a
      ? (c = d.c.X(b[0], b[1], e, 0.125, 0.5))
      : 2004 == a
      ? ((e.C = 0.8 * d.a.f(b[0], b[1])), (e.O = 0), (c = d.c.X(b[0], b[1], e, 0.35, 0.8)))
      : 2005 == a
      ? (c = d.c.$(b[0], b[1], b[2], e, !1))
      : 2006 == a
      ? (c = d.c.$(b[0], b[1], b[2], e, !0))
      : 2007 == a
      ? (c = d.c.W(b, e, 0.07))
      : 2008 == a
      ? (c = d.c.u(b, !0))
      : 2011 == a && (c = d.c.oa(b[0], b[1], b[2]));
    return c;
  };
  d.c.qa = function(a, b) {
    return Math.sqrt(Math.pow(b.g - a.g, 2) + Math.pow(b.i - a.i, 2));
  };
  d.c.ka = function(a, b) {
    var c = Math.PI,
      d = b.g - a.g;
    a = b.i - a.i;
    1e-5 >= Math.abs(d) ? ((b = c / 2), 0 > a && (b = -b + 2 * c)) : (b = Math.atan(a / d));
    0 > d ? (b += c) : 0 > a && (b += 2 * c);
    return b;
  };
  d.c.sa = function(a, b) {
    var c = [],
      e = [],
      k = [];
    if (937 == a) return e.push(b[0]), e.push(b[1]), k.push(2), c.push(e), c.push(k), c;
    if (804 == a) {
      b = [];
      b.push(new d.j(-71.2763, 42.54425, 0));
      b.push(new d.j(-71.0563, 42.32425, 0));
      b.push(new d.j(-71.0463, 42.36425, 0));
      b.push(new d.j(-71.0863, 42.37425, 0));
      if (3 > b.length) return e.push(b[0]), e.push(b[1]), k.push(2), c.push(e), c.push(k), c;
      a = [];
      for (var g = 0; g < b.length - 1; g++) a.push(b[g]);
      a = d.c.ma(a);
      var l = 0;
      for (g = 0; g < a.length - 1; g++)
        l += Math.sqrt(
          (a[g].g - a[g + 1].g) * (a[g].g - a[g + 1].g) +
            (a[g].i - a[g + 1].i) * (a[g].i - a[g + 1].i)
        );
      var m = l / 50;
      l = a.length - 1;
      for (g = 0; g <= l; g++) e.push(a[g]);
      k.push(a.length);
      var p = a.length;
      for (g = a.length - 1; 0 < g; g--)
        if (d.c.qa(a[g], a[a.length - 1]) > m) {
          p = g;
          break;
        }
      var n = d.c.ka(a[p], b[b.length - 2]);
      g = new d.j(0, 0, 0);
      var q = new d.j(0, 0, 0);
      g.g = a[p].g + 0.2 * m * Math.cos(n + Math.PI / 2);
      g.i = a[p].i + 0.2 * m * Math.sin(n + Math.PI / 2);
      q.g = a[p].g + 0.2 * m * Math.cos(n - Math.PI / 2);
      q.i = a[p].i + 0.2 * m * Math.sin(n - Math.PI / 2);
      b = b[b.length - 2];
      e.push(g);
      e.push(b);
      e.push(q);
      k.push(3);
      for (g = l; g <= p; g++) e.push(a[g]);
      k.push(p - l + 1);
    }
    c.push(e);
    c.push(k);
    return c;
  };
  window.H5LineSymbol_getJBArray = function(a, b) {
    for (var c = [], e = 0; e < b.length; e += 2) c.push(new d.j(b[e], b[e + 1], 0));
    return d.c.sa(a, c);
  };
})();
