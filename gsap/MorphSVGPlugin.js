/*!
 * VERSION: 0.9.1
 * DATE: 2019-02-21
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * MorphSVGPlugin is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */

//for(var t=false, r=[],n=r.length; -1 < --n;)

var _gsScope =
	"undefined" != typeof module && module.exports && "undefined" != typeof global
		? global
		: this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
	"use strict";

	var A,
		c = Math.PI,
		H = c / 180,
		S = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
		R = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
		a = /(^[#\.][a-z]|[a-y][a-z])/gi,
		O = /[achlmqstvz]/gi,
		w = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
		C = Math.atan2,
		U = Math.cos,
		q = Math.sin,
		Q = Math.sqrt,
		E = 2 * c,
		u = 0.3 * c,
		d = 0.7 * c,
		p = _gsScope._gsDefine.globals.TweenLite,
		L = "MorphSVGPlugin",
		G = String.fromCharCode(
			103,
			114,
			101,
			101,
			110,
			115,
			111,
			99,
			107,
			46,
			99,
			111,
			109
		),
		I = String.fromCharCode(
			47,
			114,
			101,
			113,
			117,
			105,
			114,
			101,
			115,
			45,
			109,
			101,
			109,
			98,
			101,
			114,
			115,
			104,
			105,
			112,
			47
		),
		F = true,
		Y = function (e) {
			_gsScope.console && console.log(e);
		},
		b = function (e, t, r, n, o, i, a, h, s) {
			if (e !== h || t !== s) {
				(r = Math.abs(r)), (n = Math.abs(n));
				var l = (o % 360) * H,
					f = U(l),
					g = q(l),
					p = (e - h) / 2,
					c = (t - s) / 2,
					u = f * p + g * c,
					d = -g * p + f * c,
					m = u * u,
					_ = d * d,
					y = m / (r * r) + _ / (n * n);
				1 < y && ((r = Q(y) * r), (n = Q(y) * n));
				var C = r * r,
					v = n * n,
					x = (C * v - C * _ - v * m) / (C * _ + v * m);
				x < 0 && (x = 0);
				var S = (i === a ? -1 : 1) * Q(x),
					w = S * ((r * d) / n),
					b = S * ((-n * u) / r),
					M = (e + h) / 2 + (f * w - g * b),
					T = (t + s) / 2 + (g * w + f * b),
					N = (u - w) / r,
					P = (d - b) / n,
					z = (-u - w) / r,
					A = (-d - b) / n,
					R = N * N + P * P,
					O = (P < 0 ? -1 : 1) * Math.acos(N / Q(R)),
					L =
						(N * A - P * z < 0 ? -1 : 1) *
						Math.acos((N * z + P * A) / Q(R * (z * z + A * A)));
				!a && 0 < L ? (L -= E) : a && L < 0 && (L += E), (O %= E), (L %= E);
				var G,
					I = Math.ceil(Math.abs(L) / (E / 4)),
					F = [],
					Y = L / I,
					j = ((4 / 3) * q(Y / 2)) / (1 + U(Y / 2)),
					B = f * r,
					V = g * r,
					X = g * -n,
					D = f * n;
				for (G = 0; G < I; G++)
					(u = U((o = O + G * Y))),
						(d = q(o)),
						(N = U((o += Y))),
						(P = q(o)),
						F.push(u - j * d, d + j * u, N + j * P, P - j * N, N, P);
				for (G = 0; G < F.length; G += 2)
					(u = F[G]),
						(d = F[G + 1]),
						(F[G] = u * B + d * X + M),
						(F[G + 1] = u * V + d * D + T);
				return (F[G - 2] = h), (F[G - 1] = s), F;
			}
		},
		j = function (e) {
			var t,
				r,
				n,
				o,
				i,
				a,
				h,
				s,
				l,
				f,
				g,
				p,
				c,
				u =
					(e + "")
						.replace(w, function (e) {
							var t = +e;
							return t < 1e-4 && -1e-4 < t ? 0 : t;
						})
						.match(S) || [],
				d = [],
				m = 0,
				_ = 0,
				y = u.length,
				C = 0,
				v = "ERROR: malformed path: " + e,
				x = function (e, t, r, n) {
					(f = (r - e) / 3),
						(g = (n - t) / 3),
						h.push(e + f, t + g, r - f, n - g, r, n);
				};
			if (!e || !isNaN(u[0]) || isNaN(u[1])) return Y(v), d;
			for (t = 0; t < y; t++)
				if (
					((c = i),
					isNaN(u[t]) ? (a = (i = u[t].toUpperCase()) !== u[t]) : t--,
					(n = +u[t + 1]),
					(o = +u[t + 2]),
					a && ((n += m), (o += _)),
					t || ((s = n), (l = o)),
					"M" === i)
				)
					h && (h.length < 8 ? (d.length -= 1) : (C += h.length)),
						(m = s = n),
						(_ = l = o),
						(h = [n, o]),
						d.push(h),
						(t += 2),
						(i = "L");
				else if ("C" === i)
					h || (h = [0, 0]),
						a || (m = _ = 0),
						h.push(
							n,
							o,
							m + 1 * u[t + 3],
							_ + 1 * u[t + 4],
							(m += 1 * u[t + 5]),
							(_ += 1 * u[t + 6])
						),
						(t += 6);
				else if ("S" === i)
					(f = m),
						(g = _),
						("C" !== c && "S" !== c) ||
							((f += m - h[h.length - 4]), (g += _ - h[h.length - 3])),
						a || (m = _ = 0),
						h.push(f, g, n, o, (m += 1 * u[t + 3]), (_ += 1 * u[t + 4])),
						(t += 4);
				else if ("Q" === i)
					(f = m + (2 / 3) * (n - m)),
						(g = _ + (2 / 3) * (o - _)),
						a || (m = _ = 0),
						(m += 1 * u[t + 3]),
						(_ += 1 * u[t + 4]),
						h.push(f, g, m + (2 / 3) * (n - m), _ + (2 / 3) * (o - _), m, _),
						(t += 4);
				else if ("T" === i)
					(f = m - h[h.length - 4]),
						(g = _ - h[h.length - 3]),
						h.push(
							m + f,
							_ + g,
							n + (2 / 3) * (m + 1.5 * f - n),
							o + (2 / 3) * (_ + 1.5 * g - o),
							(m = n),
							(_ = o)
						),
						(t += 2);
				else if ("H" === i) x(m, _, (m = n), _), (t += 1);
				else if ("V" === i) x(m, _, m, (_ = n + (a ? _ - m : 0))), (t += 1);
				else if ("L" === i || "Z" === i)
					"Z" === i && ((n = s), (o = l), (h.closed = !0)),
						("L" === i || 0.5 < Math.abs(m - n) || 0.5 < Math.abs(_ - o)) &&
							(x(m, _, n, o), "L" === i && (t += 2)),
						(m = n),
						(_ = o);
				else if ("A" === i) {
					if (
						(p = b(
							m,
							_,
							+u[t + 1],
							+u[t + 2],
							+u[t + 3],
							+u[t + 4],
							+u[t + 5],
							(a ? m : 0) + 1 * u[t + 6],
							(a ? _ : 0) + 1 * u[t + 7]
						))
					)
						for (r = 0; r < p.length; r++) h.push(p[r]);
					(m = h[h.length - 2]), (_ = h[h.length - 1]), (t += 7);
				} else Y(v);
			return (
				(t = h.length),
				h[0] === h[t - 2] && h[1] === h[t - 1] && (h.closed = !0),
				(d.totalPoints = C + t),
				d
			);
		},
		M = function (e, t) {
			var r,
				n,
				o,
				i,
				a,
				h,
				s,
				l,
				f,
				g,
				p,
				c,
				u,
				d,
				m = 0,
				_ = e.length,
				y = t / ((_ - 2) / 6);
			for (u = 2; u < _; u += 6)
				for (m += y; 0.999999 < m; )
					(r = e[u - 2]),
						(n = e[u - 1]),
						(o = e[u]),
						(i = e[u + 1]),
						(a = e[u + 2]),
						(h = e[u + 3]),
						(s = e[u + 4]),
						(l = e[u + 5]),
						(f = r + (o - r) * (d = 1 / ((Math.floor(m) || 1) + 1))),
						(f += ((p = o + (a - o) * d) - f) * d),
						(p += (a + (s - a) * d - p) * d),
						(g = n + (i - n) * d),
						(g += ((c = i + (h - i) * d) - g) * d),
						(c += (h + (l - h) * d - c) * d),
						e.splice(
							u,
							4,
							r + (o - r) * d,
							n + (i - n) * d,
							f,
							g,
							f + (p - f) * d,
							g + (c - g) * d,
							p,
							c,
							a + (s - a) * d,
							h + (l - h) * d
						),
						(u += 6),
						(_ += 6),
						m--;
			return e;
		},
		B = function (e, t) {
			var r,
				n,
				o,
				i = "",
				a = e.length,
				h = Math.pow(10, t || 2);
			for (n = 0; n < e.length; n++) {
				for (
					a = (o = e[n]).length,
						i += "M" + ((o[0] * h) | 0) / h + " " + ((o[1] * h) | 0) / h + " C",
						r = 2;
					r < a;
					r++
				)
					i += ((o[r] * h) | 0) / h + " ";
				o.closed && (i += "z");
			}
			return i;
		},
		T = function (e) {
			for (var t = [], r = e.length - 1, n = 0; -1 < --r; )
				(t[n++] = e[r]), (t[n++] = e[r + 1]), r--;
			for (r = 0; r < n; r++) e[r] = t[r];
			e.reversed = !e.reversed;
		},
		m = function (e) {
			var t,
				r = e.length,
				n = 0,
				o = 0;
			for (t = 0; t < r; t++) (n += e[t++]), (o += e[t]);
			return [n / (r / 2), o / (r / 2)];
		},
		N = function (e) {
			var t,
				r,
				n,
				o = e.length,
				i = e[0],
				a = i,
				h = e[1],
				s = h;
			for (n = 6; n < o; n += 6)
				i < (t = e[n]) ? (i = t) : t < a && (a = t),
					h < (r = e[n + 1]) ? (h = r) : r < s && (s = r);
			return (
				(e.centerX = (i + a) / 2),
				(e.centerY = (h + s) / 2),
				(e.size = (i - a) * (h - s))
			);
		},
		V = function (e, t) {
			t = t || 3;
			for (
				var r,
					n,
					o,
					i,
					a,
					h,
					s,
					l,
					f,
					g,
					p,
					c,
					u,
					d,
					m,
					_,
					y = e.length,
					C = e[0][0],
					v = C,
					x = e[0][1],
					S = x,
					w = 1 / t;
				-1 < --y;

			)
				for (r = (a = e[y]).length, i = 6; i < r; i += 6)
					for (
						f = a[i],
							g = a[i + 1],
							p = a[i + 2] - f,
							d = a[i + 3] - g,
							c = a[i + 4] - f,
							m = a[i + 5] - g,
							u = a[i + 6] - f,
							_ = a[i + 7] - g,
							h = t;
						-1 < --h;

					)
						C <
						(n =
							((s = w * h) * s * u + 3 * (l = 1 - s) * (s * c + l * p)) * s + f)
							? (C = n)
							: n < v && (v = n),
							x < (o = (s * s * _ + 3 * l * (s * m + l * d)) * s + g)
								? (x = o)
								: o < S && (S = o);
			return (
				(e.centerX = (C + v) / 2),
				(e.centerY = (x + S) / 2),
				(e.left = v),
				(e.width = C - v),
				(e.top = S),
				(e.height = x - S),
				(e.size = (C - v) * (x - S))
			);
		},
		P = function (e, t) {
			return t.length - e.length;
		},
		z = function (e, t) {
			var r = e.size || N(e),
				n = t.size || N(t);
			return Math.abs(n - r) < (r + n) / 20
				? t.centerX - e.centerX || t.centerY - e.centerY
				: n - r;
		},
		X = function (e, t) {
			var r,
				n,
				o = e.slice(0),
				i = e.length,
				a = i - 2;
			for (t |= 0, r = 0; r < i; r++)
				(n = (r + t) % a), (e[r++] = o[n]), (e[r] = o[n + 1]);
		},
		_ = function (e, t, r, n, o) {
			var i,
				a,
				h,
				s,
				l = e.length,
				f = 0,
				g = l - 2;
			for (r *= 6, a = 0; a < l; a += 6)
				(s = e[(i = (a + r) % g)] - (t[a] - n)),
					(h = e[i + 1] - (t[a + 1] - o)),
					(f += Q(h * h + s * s));
			return f;
		},
		D = function (e, t, r) {
			var n,
				o,
				i,
				a = e.length,
				h = m(e),
				s = m(t),
				l = s[0] - h[0],
				f = s[1] - h[1],
				g = _(e, t, 0, l, f),
				p = 0;
			for (i = 6; i < a; i += 6)
				(o = _(e, t, i / 6, l, f)) < g && ((g = o), (p = i));
			if (r)
				for (n = e.slice(0), T(n), i = 6; i < a; i += 6)
					(o = _(n, t, i / 6, l, f)) < g && ((g = o), (p = -i));
			return p / 6;
		},
		W = function (e, t, r) {
			for (
				var n, o, i, a, h, s, l = e.length, f = 99999999999, g = 0, p = 0;
				-1 < --l;

			)
				for (s = (n = e[l]).length, h = 0; h < s; h += 6)
					(o = n[h] - t),
						(i = n[h + 1] - r),
						(a = Q(o * o + i * i)) < f && ((f = a), (g = n[h]), (p = n[h + 1]));
			return [g, p];
		},
		Z = function (e, t, r, n, o, i) {
			var a,
				h,
				s,
				l,
				f = t.length,
				g = 0,
				p = Math.min(e.size || N(e), t[r].size || N(t[r])) * n,
				c = 999999999999,
				u = e.centerX + o,
				d = e.centerY + i;
			for (a = r; a < f && !((t[a].size || N(t[a])) < p); a++)
				(h = t[a].centerX - u),
					(s = t[a].centerY - d),
					(l = Q(h * h + s * s)) < c && ((g = a), (c = l));
			return (l = t[g]), t.splice(g, 1), l;
		},
		k = function (e, t, r, n, o) {
			var i,
				a,
				h,
				s,
				l,
				f,
				g,
				p = t.length - e.length,
				c = 0 < p ? t : e,
				u = 0 < p ? e : t,
				d = 0,
				m = "complexity" === n ? P : z,
				_ = "position" === n ? 0 : "number" == typeof n ? n : 0.8,
				y = u.length,
				C = "object" == typeof r && r.push ? r.slice(0) : [r],
				v = "reverse" === C[0] || C[0] < 0,
				x = "log" === r;
			if (u[0]) {
				if (
					1 < c.length &&
					(e.sort(m),
					t.sort(m),
					c.size || V(c),
					u.size || V(u),
					(f = c.centerX - u.centerX),
					(g = c.centerY - u.centerY),
					m === z)
				)
					for (y = 0; y < u.length; y++) c.splice(y, 0, Z(u[y], c, y, _, f, g));
				if (p)
					for (
						p < 0 && (p = -p),
							c[0].length > u[0].length &&
								M(u[0], ((c[0].length - u[0].length) / 6) | 0),
							y = u.length;
						d < p;

					)
						c[y].size || N(c[y]),
							(s = (h = W(u, c[y].centerX, c[y].centerY))[0]),
							(l = h[1]),
							(u[y++] = [s, l, s, l, s, l, s, l]),
							(u.totalPoints += 8),
							d++;
				for (y = 0; y < e.length; y++)
					(i = t[y]),
						(a = e[y]),
						(p = i.length - a.length) < 0
							? M(i, (-p / 6) | 0)
							: 0 < p && M(a, (p / 6) | 0),
						v && !1 !== o && !a.reversed && T(a),
						(r = C[y] || 0 === C[y] ? C[y] : "auto") &&
							(a.closed ||
							(Math.abs(a[0] - a[a.length - 2]) < 0.5 &&
								Math.abs(a[1] - a[a.length - 1]) < 0.5)
								? "auto" === r || "log" === r
									? ((C[y] = r = D(a, i, !y || !1 === o)),
									  r < 0 && ((v = !0), T(a), (r = -r)),
									  X(a, 6 * r))
									: "reverse" !== r &&
									  (y && r < 0 && T(a), X(a, 6 * (r < 0 ? -r : r)))
								: !v &&
								  (("auto" === r &&
										Math.abs(i[0] - a[0]) +
											Math.abs(i[1] - a[1]) +
											Math.abs(i[i.length - 2] - a[a.length - 2]) +
											Math.abs(i[i.length - 1] - a[a.length - 1]) >
											Math.abs(i[0] - a[a.length - 2]) +
												Math.abs(i[1] - a[a.length - 1]) +
												Math.abs(i[i.length - 2] - a[0]) +
												Math.abs(i[i.length - 1] - a[1])) ||
										r % 2)
								? (T(a), (C[y] = -1), (v = !0))
								: "auto" === r
								? (C[y] = 0)
								: "reverse" === r && (C[y] = -1),
							a.closed !== i.closed && (a.closed = i.closed = !1));
				return x && Y("shapeIndex:[" + C.join(",") + "]"), (e.shapeIndex = C);
			}
		},
		o = function (e, t) {
			var r,
				n,
				o,
				i,
				a,
				h,
				s,
				l = 0,
				f = parseFloat(e[0]),
				g = parseFloat(e[1]),
				p = f + "," + g + " ";
			for (
				r = (0.5 * t) / (0.5 * (o = e.length) - 1), n = 0;
				n < o - 2;
				n += 2
			) {
				if (
					((l += r),
					(h = parseFloat(e[n + 2])),
					(s = parseFloat(e[n + 3])),
					0.999999 < l)
				)
					for (a = 1 / (Math.floor(l) + 1), i = 1; 0.999999 < l; )
						(p +=
							(f + (h - f) * a * i).toFixed(2) +
							"," +
							(g + (s - g) * a * i).toFixed(2) +
							" "),
							l--,
							i++;
				(p += h + "," + s + " "), (f = h), (g = s);
			}
			return p;
		},
		r = function (e) {
			var t = e[0].match(R) || [],
				r = e[1].match(R) || [],
				n = r.length - t.length;
			0 < n ? (e[0] = o(t, n)) : (e[1] = o(r, -n));
		},
		J = function (t) {
			return isNaN(t)
				? r
				: function (e) {
						r(e),
							(e[1] = (function (e, t) {
								if (!t) return e;
								var r,
									n,
									o,
									i = e.match(R) || [],
									a = i.length,
									h = "";
								for (
									r =
										"reverse" === t
											? ((n = a - 1), -2)
											: ((n = (2 * (parseInt(t, 10) || 0) + 1 + 100 * a) % a),
											  2),
										o = 0;
									o < a;
									o += 2
								)
									(h += i[n - 1] + "," + i[n] + " "), (n = (n + r) % a);
								return h;
							})(e[1], parseInt(t, 10)));
				  };
		},
		K = {
			rect: "rx,ry,x,y,width,height",
			circle: "r,cx,cy",
			ellipse: "rx,ry,cx,cy",
			line: "x1,x2,y1,y2",
		},
		h = function (e, t) {
			var r,
				n,
				o,
				i,
				a,
				h,
				s,
				l,
				f,
				g,
				p,
				c,
				u,
				d,
				m,
				_,
				y,
				C,
				v,
				x,
				S,
				w,
				b = e.tagName.toLowerCase(),
				M = 0.552284749831;
			return "path" !== b && e.getBBox
				? ((h = (function (e, t) {
						var r,
							n = _gsScope.document.createElementNS(
								"http://www.w3.org/2000/svg",
								"path"
							),
							o = Array.prototype.slice.call(e.attributes),
							i = o.length;
						for (t = "," + t + ","; -1 < --i; )
							(r = o[i].nodeName.toLowerCase()),
								-1 === t.indexOf("," + r + ",") &&
									n.setAttributeNS(null, r, o[i].nodeValue);
						return n;
				  })(e, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points")),
				  (w = (function (e, t) {
						for (
							var r = t ? t.split(",") : [], n = {}, o = r.length;
							-1 < --o;

						)
							n[r[o]] = +e.getAttribute(r[o]) || 0;
						return n;
				  })(e, K[b])),
				  "rect" === b
						? ((i = w.rx),
						  (a = w.ry),
						  (n = w.x),
						  (o = w.y),
						  (g = w.width - 2 * i),
						  (p = w.height - 2 * a),
						  (r =
								i || a
									? "M" +
									  (_ = (d = (u = n + i) + g) + i) +
									  "," +
									  (C = o + a) +
									  " V" +
									  (v = C + p) +
									  " C" +
									  [
											_,
											(x = v + a * M),
											(m = d + i * M),
											(S = v + a),
											d,
											S,
											d - (d - u) / 3,
											S,
											u + (d - u) / 3,
											S,
											u,
											S,
											(c = n + i * (1 - M)),
											S,
											n,
											x,
											n,
											v,
											n,
											v - (v - C) / 3,
											n,
											C + (v - C) / 3,
											n,
											C,
											n,
											(y = o + a * (1 - M)),
											c,
											o,
											u,
											o,
											u + (d - u) / 3,
											o,
											d - (d - u) / 3,
											o,
											d,
											o,
											m,
											o,
											_,
											y,
											_,
											C,
									  ].join(",") +
									  "z"
									: "M" +
									  (n + g) +
									  "," +
									  o +
									  " v" +
									  p +
									  " h" +
									  -g +
									  " v" +
									  -p +
									  " h" +
									  g +
									  "z"))
						: "circle" === b || "ellipse" === b
						? ((l =
								"circle" === b
									? (i = a = w.r) * M
									: ((i = w.rx), (a = w.ry) * M)),
						  (r =
								"M" +
								((n = w.cx) + i) +
								"," +
								(o = w.cy) +
								" C" +
								[
									n + i,
									o + l,
									n + (s = i * M),
									o + a,
									n,
									o + a,
									n - s,
									o + a,
									n - i,
									o + l,
									n - i,
									o,
									n - i,
									o - l,
									n - s,
									o - a,
									n,
									o - a,
									n + s,
									o - a,
									n + i,
									o - l,
									n + i,
									o,
								].join(",") +
								"z"))
						: "line" === b
						? (r = "M" + w.x1 + "," + w.y1 + " L" + w.x2 + "," + w.y2)
						: ("polyline" !== b && "polygon" !== b) ||
						  ((r =
								"M" +
								(n = (f =
									(e.getAttribute("points") + "").match(R) || []).shift()) +
								"," +
								(o = f.shift()) +
								" L" +
								f.join(",")),
						  "polygon" === b && (r += "," + n + "," + o + "z")),
				  h.setAttribute("d", B((h._gsRawPath = j(r)))),
				  t &&
						e.parentNode &&
						(e.parentNode.insertBefore(h, e), e.parentNode.removeChild(e)),
				  h)
				: e;
		},
		$ = function (e, t, r) {
			var n,
				o,
				i = "string" == typeof e;
			return (
				(!i || a.test(e) || (e.match(R) || []).length < 3) &&
					((n = i ? p.selector(e) : e && e[0] ? e : [e]) && n[0]
						? ((o = ((n = n[0]).nodeName + "").toUpperCase()),
						  t && "PATH" !== o && ((n = h(n, !1)), (o = "PATH")),
						  (e = n.getAttribute("PATH" === o ? "d" : "points") || ""),
						  n === r && (e = n.getAttributeNS(null, "data-original") || e))
						: (Y("WARNING: invalid morph to: " + e), (e = !1))),
				e
			);
		},
		ee = function (e, t) {
			for (
				var r,
					n,
					o,
					i,
					a,
					h,
					s,
					l,
					f,
					g,
					p,
					c,
					u = e.length,
					d = 0.2 * (t || 1);
				-1 < --u;

			) {
				for (
					p = (n = e[u]).isSmooth = n.isSmooth || [0, 0, 0, 0],
						c = n.smoothData = n.smoothData || [0, 0, 0, 0],
						p.length = 4,
						l = n.length - 2,
						s = 6;
					s < l;
					s += 6
				)
					(o = n[s] - n[s - 2]),
						(i = n[s + 1] - n[s - 1]),
						(a = n[s + 2] - n[s]),
						(h = n[s + 3] - n[s + 1]),
						(f = C(i, o)),
						(g = C(h, a)),
						(r = Math.abs(f - g) < d) &&
							((c[s - 2] = f),
							(c[s + 2] = g),
							(c[s - 1] = Q(o * o + i * i)),
							(c[s + 3] = Q(a * a + h * h))),
						p.push(r, r, 0, 0, r, r);
				n[l] === n[0] &&
					n[l + 1] === n[1] &&
					((o = n[0] - n[l - 2]),
					(i = n[1] - n[l - 1]),
					(a = n[2] - n[0]),
					(h = n[3] - n[1]),
					(f = C(i, o)),
					(g = C(h, a)),
					Math.abs(f - g) < d &&
						((c[l - 2] = f),
						(c[2] = g),
						(c[l - 1] = Q(o * o + i * i)),
						(c[3] = Q(a * a + h * h)),
						(p[l - 2] = p[l - 1] = !0)));
			}
			return e;
		},
		te = function (e) {
			var t = e.trim().split(" ");
			return {
				x:
					(0 <= e.indexOf("left")
						? 0
						: 0 <= e.indexOf("right")
						? 100
						: isNaN(parseFloat(t[0]))
						? 50
						: parseFloat(t[0])) / 100,
				y:
					(0 <= e.indexOf("top")
						? 0
						: 0 <= e.indexOf("bottom")
						? 100
						: isNaN(parseFloat(t[1]))
						? 50
						: parseFloat(t[1])) / 100,
			};
		},
		re =
			"Use MorphSVGPlugin.convertToPath(elementOrSelectorText) to convert to a path before morphing.",
		ne = _gsScope._gsDefine.plugin({
			propName: "morphSVG",
			API: 2,
			global: !0,
			version: "0.9.1",
			overwriteProps: ["morphSVG"],
			init: function (e, t, r, n) {
				var o,
					i,
					a,
					h,
					s,
					l,
					f,
					g,
					p,
					c,
					u,
					d,
					m,
					_,
					y,
					C,
					v,
					x,
					S,
					w,
					b,
					M,
					T = e.nodeType ? window.getComputedStyle(e) : {},
					N = T.fill + "",
					P = !(
						"none" === N ||
						"0" === (N.match(R) || [])[3] ||
						"evenodd" === T.fillRule
					),
					z = (t.origin || "50 50").split(",");
				if (("function" == typeof t && (t = t(n, e)), !F))
					return (
						(window.location.href =
							"http://" + G + I + "?plugin=" + L + "&source=codepen"),
						!1
					);
				if (
					((s =
						"POLYLINE" === (o = (e.nodeName + "").toUpperCase()) ||
						"POLYGON" === o),
					"PATH" !== o && !s && !t.prop)
				)
					return Y("WARNING: cannot morph a <" + o + "> element. " + re), !1;
				if (
					((i = "PATH" === o ? "d" : "points"),
					("string" == typeof t || t.getBBox || t[0]) &&
						(t = {
							shape: t,
						}),
					!t.prop && "function" != typeof e.setAttribute)
				)
					return !1;
				if (
					((h = $(t.shape || t.d || t.points || "", "d" === i, e)),
					s && O.test(h))
				)
					return Y("WARNING: a <" + o + "> cannot accept path data. " + re), !1;
				if (
					((l = t.shapeIndex || 0 === t.shapeIndex ? t.shapeIndex : "auto"),
					(f = t.map || ne.defaultMap),
					(this._prop = t.prop),
					(this._render = t.render || ne.defaultRender),
					(this._apply =
						"updateTarget" in t ? t.updateTarget : ne.defaultUpdateTarget),
					(this._rnd = Math.pow(10, isNaN(t.precision) ? 2 : +t.precision)),
					(this._tween = r),
					h)
				) {
					if (
						((this._target = e),
						(v = "object" == typeof t.precompile),
						(c = this._prop ? e[this._prop] : e.getAttribute(i)),
						this._prop ||
							e.getAttributeNS(null, "data-original") ||
							e.setAttributeNS(null, "data-original", c),
						"d" === i || this._prop)
					) {
						if (
							((c = j(v ? t.precompile[0] : c)),
							(u = j(v ? t.precompile[1] : h)),
							!v && !k(c, u, l, f, P))
						)
							return !1;
						for (
							("log" !== t.precompile && !0 !== t.precompile) ||
								Y('precompile:["' + B(c) + '","' + B(u) + '"]'),
								(b = "linear" !== (t.type || ne.defaultType)) &&
									((c = ee(c, t.smoothTolerance)),
									(u = ee(u, t.smoothTolerance)),
									c.size || V(c),
									u.size || V(u),
									(w = te(z[0])),
									(this._origin = c.origin =
										{
											x: c.left + w.x * c.width,
											y: c.top + w.y * c.height,
										}),
									z[1] && (w = te(z[1])),
									(this._eOrigin = {
										x: u.left + w.x * u.width,
										y: u.top + w.y * u.height,
									})),
								this._rawPath = e._gsRawPath = c,
								m = c.length;
							-1 < --m;

						)
							for (
								y = c[m],
									C = u[m],
									g = y.isSmooth || [],
									p = C.isSmooth || [],
									_ = y.length,
									d = A = 0;
								d < _;
								d += 2
							)
								(C[d] === y[d] && C[d + 1] === y[d + 1]) ||
									(b
										? g[d] && p[d]
											? ((x = y.smoothData),
											  (S = C.smoothData),
											  (M = d + (d === _ - 4 ? 7 - _ : 5)),
											  (this._controlPT = {
													_next: this._controlPT,
													i: d,
													j: m,
													l1s: x[d + 1],
													l1c: S[d + 1] - x[d + 1],
													l2s: x[M],
													l2c: S[M] - x[M],
											  }),
											  (a = this._tweenRotation(y, C, d + 2)),
											  this._tweenRotation(y, C, d, a),
											  this._tweenRotation(y, C, M - 1, a),
											  (d += 4))
											: this._tweenRotation(y, C, d)
										: (this._addTween(y, d, y[d], C[d]),
										  (a = this._addTween(y, d + 1, y[d + 1], C[d + 1]))));
					} else
						a = this._addTween(
							e,
							"setAttribute",
							e.getAttribute(i) + "",
							h + "",
							"morphSVG",
							!1,
							i,
							J(l)
						);
					b &&
						(this._addTween(this._origin, "x", this._origin.x, this._eOrigin.x),
						(a = this._addTween(
							this._origin,
							"y",
							this._origin.y,
							this._eOrigin.y
						))),
						a &&
							(this._overwriteProps.push("morphSVG"),
							(a.end = h),
							(a.endProp = i));
				}
				return !0;
			},
			set: function (e) {
				var t,
					r,
					n,
					o,
					i,
					a,
					h,
					s,
					l,
					f,
					g,
					p,
					c,
					u = this._rawPath,
					d = this._controlPT,
					m = this._anchorPT,
					_ = this._rnd,
					y = this._target;
				if ((this._super.setRatio.call(this, e), 1 === e && this._apply))
					for (n = this._firstPT; n; )
						n.end &&
							(this._prop
								? (y[this._prop] = n.end)
								: y.setAttribute(n.endProp, n.end)),
							(n = n._next);
				else if (u) {
					for (; m; )
						(a = m.sa + e * m.ca),
							(i = m.sl + e * m.cl),
							(m.t[m.i] = this._origin.x + U(a) * i),
							(m.t[m.i + 1] = this._origin.y + q(a) * i),
							(m = m._next);
					for (r = e < 0.5 ? 2 * e * e : (4 - 2 * e) * e - 1; d; )
						(c =
							(h = d.i) + (h === (o = u[d.j]).length - 4 ? 7 - o.length : 5)),
							(a = C(o[c] - o[h + 1], o[c - 1] - o[h])),
							(g = q(a)),
							(p = U(a)),
							(l = o[h + 2]),
							(f = o[h + 3]),
							(i = d.l1s + r * d.l1c),
							(o[h] = l - p * i),
							(o[h + 1] = f - g * i),
							(i = d.l2s + r * d.l2c),
							(o[c - 1] = l + p * i),
							(o[c] = f + g * i),
							(d = d._next);
					if (((y._gsRawPath = u), this._apply)) {
						for (t = "", " ", s = 0; s < u.length; s++)
							for (
								i = (o = u[s]).length,
									t +=
										"M" +
										((o[0] * _) | 0) / _ +
										" " +
										((o[1] * _) | 0) / _ +
										" C",
									h = 2;
								h < i;
								h++
							)
								t += ((o[h] * _) | 0) / _ + " ";
						this._prop ? (y[this._prop] = t) : y.setAttribute("d", t);
					}
				}
				this._render && u && this._render.call(this._tween, u, y);
			},
		});
	(ne.prototype._tweenRotation = function (e, t, r, n) {
		var o,
			i,
			a,
			h = this._origin,
			s = this._eOrigin,
			l = e[r] - h.x,
			f = e[r + 1] - h.y,
			g = Q(l * l + f * f),
			p = C(f, l);
		return (
			(l = t[r] - s.x),
			(f = t[r + 1] - s.y),
			(o = C(f, l) - p),
			(i = (a = o) !== a % c ? a + (a < 0 ? E : -E) : a),
			!n && A && Math.abs(i + A.ca) < u && (n = A),
			(this._anchorPT = A =
				{
					_next: this._anchorPT,
					t: e,
					sa: p,
					ca: n && i * n.ca < 0 && Math.abs(i) > d ? o : i,
					sl: g,
					cl: Q(l * l + f * f) - g,
					i: r,
				})
		);
	}),
		(ne.pathFilter = function (e, t, r, n, o) {
			var i = j(e[0]),
				a = j(e[1]);
			k(i, a, t || 0 === t ? t : "auto", r, o) &&
				((e[0] = B(i)),
				(e[1] = B(a)),
				("log" !== n && !0 !== n) ||
					Y('precompile:["' + e[0] + '","' + e[1] + '"]'));
		}),
		(ne.pointsFilter = r),
		(ne.getTotalSize = V),
		(ne.subdivideRawBezier = ne.subdivideSegment = M),
		(ne.rawPathToString = B),
		(ne.defaultType = "linear"),
		(ne.defaultUpdateTarget = !0),
		(ne.defaultMap = "size"),
		(ne.stringToRawPath = ne.pathDataToRawBezier =
			function (e) {
				return j($(e, !0));
			}),
		(ne.equalizeSegmentQuantity = k),
		(ne.convertToPath = function (e, t) {
			"string" == typeof e && (e = p.selector(e));
			for (
				var r =
						e && 0 !== e.length
							? e.length && e[0] && e[0].nodeType
								? Array.prototype.slice.call(e, 0)
								: [e]
							: [],
					n = r.length;
				-1 < --n;

			)
				r[n] = h(r[n], !1 !== t);
			return r;
		}),
		(ne.pathDataToBezier = function (e, t) {
			var r,
				n,
				o,
				i,
				a,
				h,
				s,
				l,
				f = j($(e, !0))[0] || [],
				g = 0;
			if (
				((l = (t = t || {}).align || t.relative),
				(i = t.matrix || [1, 0, 0, 1, 0, 0]),
				(a = t.offsetX || 0),
				(h = t.offsetY || 0),
				"relative" === l || !0 === l
					? ((a -= f[0] * i[0] + f[1] * i[2]),
					  (h -= f[0] * i[1] + f[1] * i[3]),
					  (g = "+="))
					: ((a += i[4]),
					  (h += i[5]),
					  l &&
							(l =
								"string" == typeof l ? p.selector(l) : l && l[0] ? l : [l]) &&
							l[0] &&
							((a -= (s = l[0].getBBox() || {
								x: 0,
								y: 0,
							}).x),
							(h -= s.y))),
				(r = []),
				(o = f.length),
				i && "1,0,0,1,0,0" !== i.join(","))
			)
				for (n = 0; n < o; n += 2)
					r.push({
						x: g + (f[n] * i[0] + f[n + 1] * i[2] + a),
						y: g + (f[n] * i[1] + f[n + 1] * i[3] + h),
					});
			else
				for (n = 0; n < o; n += 2)
					r.push({
						x: g + (f[n] + a),
						y: g + (f[n + 1] + h),
					});
			return r;
		});
}),
	_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
	(function (e) {
		"use strict";
		var t = function () {
			return (_gsScope.GreenSockGlobals || _gsScope).MorphSVGPlugin;
		};
		"undefined" != typeof module && module.exports
			? (require("../TweenLite.js"), (module.exports = t()))
			: "function" == typeof define && define.amd && define(["TweenLite"], t);
	})();
