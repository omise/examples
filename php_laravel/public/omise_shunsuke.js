/*!
 * OmiseJs v2.9.1
 * Copyright: Opn Payments
 *
 * Date: 2023-08-07T07:14:13.614Z
 */
(() => {
	var e = {
			193: e => {
				e.exports = {
					vaultUrl: "https://vault.omise.co",
					cardHost: "https://cdn.omise.co",
					interfaceUrl: "https://api.omise.co"
				}
			},
			314: () => {
				function e(t) {
					return e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
						return typeof e
					} : function(e) {
						return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
					}, e(t)
				}! function(t, n, r, o, i, a) {
					var s, c, u, l, f, p = this,
						d = Math.floor(1e4 * Math.random()),
						h = Function.prototype,
						m = /^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/,
						y = /[\-\w]+\/\.\.\//,
						g = /([^:])\/\//g,
						b = "",
						v = {},
						w = t.easyXDM,
						k = "easyXDM_",
						O = !1;

					function _(t, n) {
						var r = e(t[n]);
						return "function" == r || !("object" != r || !t[n]) || "unknown" == r
					}

					function T() {
						var t, n = "Shockwave Flash",
							r = "application/x-shockwave-flash";
						if (!R(navigator.plugins) && "object" == e(navigator.plugins[n])) {
							var o = navigator.plugins[n].description;
							o && !R(navigator.mimeTypes) && navigator.mimeTypes[r] && navigator.mimeTypes[r].enabledPlugin && (c = o.match(/\d+/g))
						}
						if (!c) try {
							t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), c = Array.prototype.slice.call(t.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/), 1), t = null
						} catch (e) {}
						if (!c) return !1;
						var i = parseInt(c[0], 10),
							a = parseInt(c[1], 10);
						return u = i > 9 && a > 0, !0
					}
					if (_(t, "addEventListener")) l = function(e, t, n) {
						e.addEventListener(t, n, !1)
					}, f = function(e, t, n) {
						e.removeEventListener(t, n, !1)
					};
					else {
						if (!_(t, "attachEvent")) throw new Error("Browser not supported");
						l = function(e, t, n) {
							e.attachEvent("on" + t, n)
						}, f = function(e, t, n) {
							e.detachEvent("on" + t, n)
						}
					}
					var x, E = !1,
						S = [];

					function C() {
						if (!E) {
							E = !0;
							for (var e = 0; e < S.length; e++) S[e]();
							S.length = 0
						}
					}
					if ("readyState" in n ? (x = n.readyState, E = "complete" == x || ~navigator.userAgent.indexOf("AppleWebKit/") && ("loaded" == x || "interactive" == x)) : E = !!n.body, !E) {
						if (_(t, "addEventListener")) l(n, "DOMContentLoaded", C);
						else if (l(n, "readystatechange", (function() {
								"complete" == n.readyState && C()
							})), n.documentElement.doScroll && t === top) {
							! function e() {
								if (!E) {
									try {
										n.documentElement.doScroll("left")
									} catch (t) {
										return void o(e, 1)
									}
									C()
								}
							}()
						}
						l(t, "load", C)
					}

					function A(e, t) {
						E ? e.call(t) : S.push((function() {
							e.call(t)
						}))
					}

					function P(e) {
						return e.match(m)[3]
					}

					function B(e) {
						var t = e.toLowerCase().match(m);
						if (!t) return "";
						var n = t[2],
							r = t[3],
							o = t[4] || "";
						return ("http:" == n && ":80" == o || "https:" == n && ":443" == o) && (o = ""), n + "//" + r + o
					}

					function F(e) {
						if (!(e = e.replace(g, "$1/")).match(/^(http||https):\/\//)) {
							var t = "/" === e.substring(0, 1) ? "" : r.pathname;
							"/" !== t.substring(t.length - 1) && (t = t.substring(0, t.lastIndexOf("/") + 1)), e = r.protocol + "//" + r.host + t + e
						}
						for (; y.test(e);) e = e.replace(y, "");
						return e
					}

					function j(e, t) {
						var n = "",
							r = e.indexOf("#"); - 1 !== r && (n = e.substring(r), e = e.substring(0, r));
						var o = [];
						for (var i in t) t.hasOwnProperty(i) && o.push(i + "=" + a(t[i]));
						return e + (O ? "#" : -1 == e.indexOf("?") ? "?" : "&") + o.join("&") + n
					}
					var M = function(e) {
						for (var t, n = {}, r = (e = e.substring(1).split("&")).length; r--;) n[(t = e[r].split("="))[0]] = i(t[1]);
						return n
					}(/xdm_e=/.test(r.search) ? r.search : r.hash);

					function R(e) {
						return void 0 === e
					}
					var I, L = function() {
						var e = {},
							t = {
								a: [1, 2, 3]
							},
							n = '{"a":[1,2,3]}';
						return "undefined" != typeof JSON && "function" == typeof JSON.stringify && JSON.stringify(t).replace(/\s/g, "") === n ? JSON : (Object.toJSON && Object.toJSON(t).replace(/\s/g, "") === n && (e.stringify = Object.toJSON), "function" == typeof String.prototype.evalJSON && (t = n.evalJSON()).a && 3 === t.a.length && 3 === t.a[2] && (e.parse = function(e) {
							return e.evalJSON()
						}), e.stringify && e.parse ? (L = function() {
							return e
						}, e) : null)
					};

					function D(t, n, r) {
						var o;
						for (var i in n) n.hasOwnProperty(i) && (i in t ? "object" === e(o = n[i]) ? D(t[i], o, r) : r || (t[i] = n[i]) : t[i] = n[i]);
						return t
					}

					function H(t) {
						var r;
						R(s) && function() {
							var e = n.body.appendChild(n.createElement("form")),
								t = e.appendChild(n.createElement("input"));
							t.name = k + "TEST" + d, s = t !== e.elements[t.name], n.body.removeChild(e)
						}(), s ? r = n.createElement('<iframe name="' + t.props.name + '"/>') : (r = n.createElement("IFRAME")).name = t.props.name, r.id = r.name = t.props.name, delete t.props.name, "string" == typeof t.container && (t.container = n.getElementById(t.container)), t.container || (D(r.style, {
							position: "absolute",
							top: "-2000px",
							left: "0px"
						}), t.container = n.body);
						var o = t.props.src;
						if (t.props.src = "javascript:false", D(r, t.props), r.border = r.frameBorder = 0, r.allowTransparency = !0, t.container.appendChild(r), t.onLoad && l(r, "load", t.onLoad), t.usePost) {
							var i, a = t.container.appendChild(n.createElement("form"));
							if (a.target = r.name, a.action = o, a.method = "POST", "object" === e(t.usePost))
								for (var c in t.usePost) t.usePost.hasOwnProperty(c) && (s ? i = n.createElement('<input name="' + c + '"/>') : (i = n.createElement("INPUT")).name = c, i.value = t.usePost[c], a.appendChild(i));
							a.submit(), a.parentNode.removeChild(a)
						} else r.src = o;
						return t.props.src = o, r
					}

					function N(e) {
						var o, i = e.protocol;
						if (e.isHost = e.isHost || R(M.xdm_p), O = e.hash || !1, e.props || (e.props = {}), e.isHost) e.remote = F(e.remote), e.channel = e.channel || "default" + d++, e.secret = Math.random().toString(16).substring(2), R(i) && (i = B(r.href) == B(e.remote) ? "4" : _(t, "postMessage") || _(n, "postMessage") ? "1" : e.swf && _(t, "ActiveXObject") && T() ? "6" : "Gecko" === navigator.product && "frameElement" in t && -1 == navigator.userAgent.indexOf("WebKit") ? "5" : e.remoteHelper ? "2" : "0");
						else if (e.channel = M.xdm_c.replace(/["'<>\\]/g, ""), e.secret = M.xdm_s, e.remote = M.xdm_e.replace(/["'<>\\]/g, ""), i = M.xdm_p, e.acl && ! function(e, t) {
								"string" == typeof e && (e = [e]);
								for (var n, r = e.length; r--;)
									if (n = "^" === e[r].substr(0, 1) && "$" === e[r].substr(e[r].length - 1, 1) ? e[r] : "^" + e[r].replace(/[-[\]/{}()+.\^$|]/g, "\\$&").replace(/(\*)/g, ".$1").replace(/\?/g, ".") + "$", (n = new RegExp(n)).test(t)) return !0;
								return !1
							}(e.acl, e.remote)) throw new Error("Access denied for " + e.remote);
						switch (e.protocol = i, i) {
							case "0":
								if (D(e, {
										interval: 100,
										delay: 2e3,
										useResize: !0,
										useParent: !1,
										usePolling: !1
									}, !0), e.isHost) {
									if (!e.local) {
										for (var a, s = r.protocol + "//" + r.host, u = n.body.getElementsByTagName("img"), l = u.length; l--;)
											if ((a = u[l]).src.substring(0, s.length) === s) {
												e.local = a.src;
												break
											}
										e.local || (e.local = t)
									}
									var f = {
										xdm_c: e.channel,
										xdm_p: 0
									};
									e.local === t ? (e.usePolling = !0, e.useParent = !0, e.local = r.protocol + "//" + r.host + r.pathname + r.search, f.xdm_e = e.local, f.xdm_pa = 1) : f.xdm_e = F(e.local), e.container && (e.useResize = !1, f.xdm_po = 1), e.remote = j(e.remote, f)
								} else D(e, {
									useParent: !R(M.xdm_pa),
									usePolling: !R(M.xdm_po),
									useResize: !e.useParent && e.useResize
								});
								o = [new v.stack.HashTransport(e), new v.stack.ReliableBehavior({}), new v.stack.QueueBehavior({
									encode: !0,
									maxLength: 4e3 - e.remote.length
								}), new v.stack.VerifyBehavior({
									initiate: e.isHost
								})];
								break;
							case "1":
								o = [new v.stack.PostMessageTransport(e)];
								break;
							case "2":
								e.isHost && (e.remoteHelper = F(e.remoteHelper)), o = [new v.stack.NameTransport(e), new v.stack.QueueBehavior, new v.stack.VerifyBehavior({
									initiate: e.isHost
								})];
								break;
							case "3":
								o = [new v.stack.NixTransport(e)];
								break;
							case "4":
								o = [new v.stack.SameOriginTransport(e)];
								break;
							case "5":
								o = [new v.stack.FrameElementTransport(e)];
								break;
							case "6":
								c || T(), o = [new v.stack.FlashTransport(e)]
						}
						return o.push(new v.stack.QueueBehavior({
							lazy: e.lazy,
							remove: !0
						})), o
					}

					function U(e) {
						for (var t, n = {
								incoming: function(e, t) {
									this.up.incoming(e, t)
								},
								outgoing: function(e, t) {
									this.down.outgoing(e, t)
								},
								callback: function(e) {
									this.up.callback(e)
								},
								init: function() {
									this.down.init()
								},
								destroy: function() {
									this.down.destroy()
								}
							}, r = 0, o = e.length; r < o; r++) D(t = e[r], n, !0), 0 !== r && (t.down = e[r - 1]), r !== o - 1 && (t.up = e[r + 1]);
						return t
					}
					D(v, {
						version: "2.5.00.0",
						query: M,
						stack: {},
						apply: D,
						getJSONObject: L,
						whenReady: A,
						noConflict: function(e) {
							return t.easyXDM = w, (b = e) && (k = "easyXDM_" + b.replace(".", "_") + "_"), v
						}
					}), v.DomHelper = {
						on: l,
						un: f,
						requiresJSON: function(r) {
							var o, i;
							"object" == e((o = t)[i = "JSON"]) && o[i] || n.write('<script type="text/javascript" src="' + r + '"><\/script>')
						}
					}, I = {}, v.Fn = {
						set: function(e, t) {
							I[e] = t
						},
						get: function(e, t) {
							if (I.hasOwnProperty(e)) {
								var n = I[e];
								return t && delete I[e], n
							}
						}
					}, v.Socket = function(e) {
						var t = U(N(e).concat([{
								incoming: function(t, n) {
									e.onMessage(t, n)
								},
								callback: function(t) {
									e.onReady && e.onReady(t)
								}
							}])),
							n = B(e.remote);
						this.origin = B(e.remote), this.destroy = function() {
							t.destroy()
						}, this.postMessage = function(e) {
							t.outgoing(e, n)
						}, t.init()
					}, v.Rpc = function(e, t) {
						if (t.local)
							for (var n in t.local)
								if (t.local.hasOwnProperty(n)) {
									var r = t.local[n];
									"function" == typeof r && (t.local[n] = {
										method: r
									})
								}
						var o = U(N(e).concat([new v.stack.RpcBehavior(this, t), {
							callback: function(t) {
								e.onReady && e.onReady(t)
							}
						}]));
						this.origin = B(e.remote), this.context = e.context || null, this.destroy = function() {
							o.destroy()
						}, o.init()
					}, v.stack.SameOriginTransport = function(e) {
						var t, n, i, a;
						return t = {
							outgoing: function(e, t, n) {
								i(e), n && n()
							},
							destroy: function() {
								n && (n.parentNode.removeChild(n), n = null)
							},
							onDOMReady: function() {
								a = B(e.remote), e.isHost ? (D(e.props, {
									src: j(e.remote, {
										xdm_e: r.protocol + "//" + r.host + r.pathname,
										xdm_c: e.channel,
										xdm_p: 4
									}),
									name: k + e.channel + "_provider"
								}), n = H(e), v.Fn.set(e.channel, (function(e) {
									return i = e, o((function() {
											t.up.callback(!0)
										}), 0),
										function(e) {
											t.up.incoming(e, a)
										}
								}))) : (i = function() {
									var e = parent;
									if ("" !== b)
										for (var t = 0, n = b.split("."); t < n.length; t++) e = e[n[t]];
									return e.easyXDM
								}().Fn.get(e.channel, !0)((function(e) {
									t.up.incoming(e, a)
								})), o((function() {
									t.up.callback(!0)
								}), 0))
							},
							init: function() {
								A(t.onDOMReady, t)
							}
						}
					}, v.stack.FlashTransport = function(e) {
						var t, i, s, c, l;

						function f(e, n) {
							o((function() {
								t.up.incoming(e, s)
							}), 0)
						}

						function d(t) {
							var r = e.swf + "?host=" + e.isHost,
								o = "easyXDM_swf_" + Math.floor(1e4 * Math.random());
							v.Fn.set("flash_loaded" + t.replace(/[\-.]/g, "_"), (function() {
								v.stack.FlashTransport[t].swf = c = l.firstChild;
								for (var e = v.stack.FlashTransport[t].queue, n = 0; n < e.length; n++) e[n]();
								e.length = 0
							})), e.swfContainer ? l = "string" == typeof e.swfContainer ? n.getElementById(e.swfContainer) : e.swfContainer : (D((l = n.createElement("div")).style, u && e.swfNoThrottle ? {
								height: "20px",
								width: "20px",
								position: "fixed",
								right: 0,
								top: 0
							} : {
								height: "1px",
								width: "1px",
								position: "absolute",
								overflow: "hidden",
								right: 0,
								top: 0
							}), n.body.appendChild(l));
							var i = "callback=flash_loaded" + a(t.replace(/[\-.]/g, "_")) + "&proto=" + p.location.protocol + "&domain=" + a(P(p.location.href)) + "&port=" + a(function(e) {
								return e.match(m)[4] || ""
							}(p.location.href)) + "&ns=" + a(b);
							l.innerHTML = "<object height='20' width='20' type='application/x-shockwave-flash' id='" + o + "' data='" + r + "'><param name='allowScriptAccess' value='always'></param><param name='wmode' value='transparent'><param name='movie' value='" + r + "'></param><param name='flashvars' value='" + i + "'></param><embed type='application/x-shockwave-flash' FlashVars='" + i + "' allowScriptAccess='always' wmode='transparent' src='" + r + "' height='1' width='1'></embed></object>"
						}
						return t = {
							outgoing: function(t, n, r) {
								c.postMessage(e.channel, t.toString()), r && r()
							},
							destroy: function() {
								try {
									c.destroyChannel(e.channel)
								} catch (e) {}
								c = null, i && (i.parentNode.removeChild(i), i = null)
							},
							onDOMReady: function() {
								s = e.remote, v.Fn.set("flash_" + e.channel + "_init", (function() {
									o((function() {
										t.up.callback(!0)
									}))
								})), v.Fn.set("flash_" + e.channel + "_onMessage", f), e.swf = F(e.swf);
								var n = P(e.swf),
									a = function() {
										v.stack.FlashTransport[n].init = !0, (c = v.stack.FlashTransport[n].swf).createChannel(e.channel, e.secret, B(e.remote), e.isHost), e.isHost && (u && e.swfNoThrottle && D(e.props, {
											position: "fixed",
											right: 0,
											top: 0,
											height: "20px",
											width: "20px"
										}), D(e.props, {
											src: j(e.remote, {
												xdm_e: B(r.href),
												xdm_c: e.channel,
												xdm_p: 6,
												xdm_s: e.secret
											}),
											name: k + e.channel + "_provider"
										}), i = H(e))
									};
								v.stack.FlashTransport[n] && v.stack.FlashTransport[n].init ? a() : v.stack.FlashTransport[n] ? v.stack.FlashTransport[n].queue.push(a) : (v.stack.FlashTransport[n] = {
									queue: [a]
								}, d(n))
							},
							init: function() {
								A(t.onDOMReady, t)
							}
						}
					}, v.stack.PostMessageTransport = function(e) {
						var n, i, a, s;

						function c(t) {
							if ("string" == typeof t.data) {
								var o = function(e) {
									if (e.origin) return B(e.origin);
									if (e.uri) return B(e.uri);
									if (e.domain) return r.protocol + "//" + e.domain;
									throw "Unable to retrieve the origin of the event"
								}(t);
								o == s && "string" == typeof t.data && t.data.substring(0, e.channel.length + 1) == e.channel + " " && n.up.incoming(t.data.substring(e.channel.length + 1), o)
							}
						}

						function u(r) {
							r.data == e.channel + "-ready" && (a = "postMessage" in i.contentWindow ? i.contentWindow : i.contentWindow.document, f(t, "message", u), l(t, "message", c), o((function() {
								n.up.callback(!0)
							}), 0))
						}
						return n = {
							outgoing: function(t, n, r) {
								a.postMessage(e.channel + " " + t, n || s), r && r()
							},
							destroy: function() {
								f(t, "message", u), f(t, "message", c), i && (a = null, i.parentNode.removeChild(i), i = null)
							},
							onDOMReady: function() {
								s = B(e.remote), e.isHost ? (l(t, "message", u), D(e.props, {
									src: j(e.remote, {
										xdm_e: B(r.href),
										xdm_c: e.channel,
										xdm_p: 1
									}),
									name: k + e.channel + "_provider"
								}), i = H(e)) : (l(t, "message", c), (a = "postMessage" in t.parent ? t.parent : t.parent.document).postMessage(e.channel + "-ready", s), o((function() {
									n.up.callback(!0)
								}), 0))
							},
							init: function() {
								A(n.onDOMReady, n)
							}
						}
					}, v.stack.FrameElementTransport = function(e) {
						var i, a, s, c;
						return i = {
							outgoing: function(e, t, n) {
								s.call(this, e), n && n()
							},
							destroy: function() {
								a && (a.parentNode.removeChild(a), a = null)
							},
							onDOMReady: function() {
								c = B(e.remote), e.isHost ? (D(e.props, {
									src: j(e.remote, {
										xdm_e: B(r.href),
										xdm_c: e.channel,
										xdm_p: 5
									}),
									name: k + e.channel + "_provider"
								}), (a = H(e)).fn = function(e) {
									return delete a.fn, s = e, o((function() {
											i.up.callback(!0)
										}), 0),
										function(e) {
											i.up.incoming(e, c)
										}
								}) : (n.referrer && B(n.referrer) != M.xdm_e && (t.top.location = M.xdm_e), s = t.frameElement.fn((function(e) {
									i.up.incoming(e, c)
								})), i.up.callback(!0))
							},
							init: function() {
								A(i.onDOMReady, i)
							}
						}
					}, v.stack.NameTransport = function(e) {
						var t, n, r, i, a, s, c, u;

						function l(t) {
							var o = e.remoteHelper + (n ? "#_3" : "#_2") + e.channel;
							r.contentWindow.sendMessage(t, o)
						}

						function p() {
							n ? 2 != ++a && n || t.up.callback(!0) : (l("ready"), t.up.callback(!0))
						}

						function d(e) {
							t.up.incoming(e, c)
						}

						function h() {
							s && o((function() {
								s(!0)
							}), 0)
						}
						return t = {
							outgoing: function(e, t, n) {
								s = n, l(e)
							},
							destroy: function() {
								r.parentNode.removeChild(r), r = null, n && (i.parentNode.removeChild(i), i = null)
							},
							onDOMReady: function() {
								n = e.isHost, a = 0, c = B(e.remote), e.local = F(e.local), n ? (v.Fn.set(e.channel, (function(t) {
									n && "ready" === t && (v.Fn.set(e.channel, d), p())
								})), u = j(e.remote, {
									xdm_e: e.local,
									xdm_c: e.channel,
									xdm_p: 2
								}), D(e.props, {
									src: u + "#" + e.channel,
									name: k + e.channel + "_provider"
								}), i = H(e)) : (e.remoteHelper = e.remote, v.Fn.set(e.channel, d));
								r = H({
									props: {
										src: e.local + "#_4" + e.channel
									},
									onLoad: function t() {
										var n = r || this;
										f(n, "load", t), v.Fn.set(e.channel + "_load", h),
											function e() {
												"function" == typeof n.contentWindow.sendMessage ? p() : o(e, 50)
											}()
									}
								})
							},
							init: function() {
								A(t.onDOMReady, t)
							}
						}
					}, v.stack.HashTransport = function(e) {
						var n, r, i, a, s, c, u, l, f, p;

						function d() {
							if (u) {
								var e = u.location.href,
									t = "",
									r = e.indexOf("#"); - 1 != r && (t = e.substring(r)), t && t != s && function(e) {
									s = e, n.up.incoming(s.substring(s.indexOf("_") + 1), p)
								}(t)
							}
						}

						function h() {
							i = setInterval(d, a)
						}
						return n = {
							outgoing: function(t, n) {
								! function(t) {
									if (l) {
										var n = e.remote + "#" + c++ + "_" + t;
										(r || !f ? l.contentWindow : l).location = n
									}
								}(t)
							},
							destroy: function() {
								t.clearInterval(i), !r && f || l.parentNode.removeChild(l), l = null
							},
							onDOMReady: function() {
								if (r = e.isHost, a = e.interval, s = "#" + e.channel, c = 0, f = e.useParent, p = B(e.remote), r) {
									if (D(e.props, {
											src: e.remote,
											name: k + e.channel + "_provider"
										}), f) e.onLoad = function() {
										u = t, h(), n.up.callback(!0)
									};
									else {
										var i = 0,
											d = e.delay / 50;
										! function t() {
											if (++i > d) throw new Error("Unable to reference listenerwindow");
											try {
												u = l.contentWindow.frames[k + e.channel + "_consumer"]
											} catch (e) {}
											u ? (h(), n.up.callback(!0)) : o(t, 50)
										}()
									}
									l = H(e)
								} else u = t, h(), f ? (l = parent, n.up.callback(!0)) : (D(e, {
									props: {
										src: e.remote + "#" + e.channel + new Date,
										name: k + e.channel + "_consumer"
									},
									onLoad: function() {
										n.up.callback(!0)
									}
								}), l = H(e))
							},
							init: function() {
								A(n.onDOMReady, n)
							}
						}
					}, v.stack.ReliableBehavior = function(e) {
						var t, n, r = 0,
							o = 0,
							i = "";
						return t = {
							incoming: function(e, a) {
								var s = e.indexOf("_"),
									c = e.substring(0, s).split(",");
								e = e.substring(s + 1), c[0] == r && (i = "", n && n(!0)), e.length > 0 && (t.down.outgoing(c[1] + "," + r + "_" + i, a), o != c[1] && (o = c[1], t.up.incoming(e, a)))
							},
							outgoing: function(e, a, s) {
								i = e, n = s, t.down.outgoing(o + "," + ++r + "_" + e, a)
							}
						}
					}, v.stack.QueueBehavior = function(e) {
						var t, n, r = [],
							s = !0,
							c = "",
							u = 0,
							l = !1,
							f = !1;

						function p() {
							if (e.remove && 0 === r.length) return (i = t).up.down = i.down, i.down.up = i.up, void(i.up = i.down = null);
							var i;
							if (!s && 0 !== r.length && !n) {
								s = !0;
								var a = r.shift();
								t.down.outgoing(a.data, a.origin, (function(e) {
									s = !1, a.callback && o((function() {
										a.callback(e)
									}), 0), p()
								}))
							}
						}
						return t = {
							init: function() {
								R(e) && (e = {}), e.maxLength && (u = e.maxLength, f = !0), e.lazy ? l = !0 : t.down.init()
							},
							callback: function(e) {
								s = !1;
								var n = t.up;
								p(), n.callback(e)
							},
							incoming: function(n, r) {
								if (f) {
									var o = n.indexOf("_"),
										a = parseInt(n.substring(0, o), 10);
									c += n.substring(o + 1), 0 === a && (e.encode && (c = i(c)), t.up.incoming(c, r), c = "")
								} else t.up.incoming(n, r)
							},
							outgoing: function(n, o, i) {
								e.encode && (n = a(n));
								var s, c = [];
								if (f) {
									for (; 0 !== n.length;) s = n.substring(0, u), n = n.substring(s.length), c.push(s);
									for (; s = c.shift();) r.push({
										data: c.length + "_" + s,
										origin: o,
										callback: 0 === c.length ? i : null
									})
								} else r.push({
									data: n,
									origin: o,
									callback: i
								});
								l ? t.down.init() : p()
							},
							destroy: function() {
								n = !0, t.down.destroy()
							}
						}
					}, v.stack.VerifyBehavior = function(e) {
						var t, n, r;

						function o() {
							n = Math.random().toString(16).substring(2), t.down.outgoing(n)
						}
						return t = {
							incoming: function(i, a) {
								var s = i.indexOf("_"); - 1 === s ? i === n ? t.up.callback(!0) : r || (r = i, e.initiate || o(), t.down.outgoing(i)) : i.substring(0, s) === r && t.up.incoming(i.substring(s + 1), a)
							},
							outgoing: function(e, r, o) {
								t.down.outgoing(n + "_" + e, r, o)
							},
							callback: function(t) {
								e.initiate && o()
							}
						}
					}, v.stack.RpcBehavior = function(e, t) {
						var n, r = t.serializer || L(),
							o = 0,
							i = {};

						function a(e) {
							e.jsonrpc = "2.0", n.down.outgoing(r.stringify(e))
						}

						function s(e, t) {
							var n = Array.prototype.slice;
							return function() {
								var r, s = arguments.length,
									c = {
										method: t
									};
								s > 0 && "function" == typeof arguments[s - 1] ? (s > 1 && "function" == typeof arguments[s - 2] ? (r = {
									success: arguments[s - 2],
									error: arguments[s - 1]
								}, c.params = n.call(arguments, 0, s - 2)) : (r = {
									success: arguments[s - 1]
								}, c.params = n.call(arguments, 0, s - 1)), i["" + ++o] = r, c.id = o) : c.params = n.call(arguments, 0), e.namedParams && 1 === c.params.length && (c.params = c.params[0]), a(c)
							}
						}

						function c(t, n, r, o) {
							if (r) {
								var i, s, c;
								n ? (i = function(e) {
									i = h, a({
										id: n,
										result: e
									})
								}, s = function(e, t) {
									s = h;
									var r = {
										id: n,
										error: {
											code: -32099,
											message: e
										}
									};
									t && (r.error.data = t), a(r)
								}) : i = s = h, c = o, "[object Array]" !== Object.prototype.toString.call(c) && (o = [o]);
								try {
									var u = e.context || r.scope,
										l = r.method.apply(u, o.concat([i, s]));
									R(l) || i(l)
								} catch (e) {
									s(e.message)
								}
							} else n && a({
								id: n,
								error: {
									code: -32601,
									message: "Procedure not found."
								}
							})
						}
						return n = {
							incoming: function(e, n) {
								var o = r.parse(e);
								if (o.method) t.handle ? t.handle(o, a) : c(o.method, o.id, t.local[o.method], o.params);
								else {
									var s = i[o.id];
									o.error ? s.error && s.error(o.error) : s.success && s.success(o.result), delete i[o.id]
								}
							},
							init: function() {
								if (t.remote)
									for (var r in t.remote) t.remote.hasOwnProperty(r) && (e[r] = s(t.remote[r], r));
								n.down.init()
							},
							destroy: function() {
								for (var r in t.remote) t.remote.hasOwnProperty(r) && e.hasOwnProperty(r) && delete e[r];
								n.down.destroy()
							}
						}
					}, p.easyXDM = v
				}(window, document, location, window.setTimeout, decodeURIComponent, encodeURIComponent)
			},
			481: (e, t, n) => {
				! function(e) {
					"use strict";
					e.exports.is_uri = n, e.exports.is_http_uri = r, e.exports.is_https_uri = o, e.exports.is_web_uri = i, e.exports.isUri = n, e.exports.isHttpUri = r, e.exports.isHttpsUri = o, e.exports.isWebUri = i;
					var t = function(e) {
						return e.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/)
					};

					function n(e) {
						if (e && !/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i.test(e) && !/%[^0-9a-f]/i.test(e) && !/%[0-9a-f](:?[^0-9a-f]|$)/i.test(e)) {
							var n, r, o, i, a, s = "",
								c = "";
							if (s = (n = t(e))[1], r = n[2], o = n[3], i = n[4], a = n[5], s && s.length && o.length >= 0) {
								if (r && r.length) {
									if (0 !== o.length && !/^\//.test(o)) return
								} else if (/^\/\//.test(o)) return;
								if (/^[a-z][a-z0-9\+\-\.]*$/.test(s.toLowerCase())) return c += s + ":", r && r.length && (c += "//" + r), c += o, i && i.length && (c += "?" + i), a && a.length && (c += "#" + a), c
							}
						}
					}

					function r(e, r) {
						if (n(e)) {
							var o, i, a, s, c = "",
								u = "",
								l = "",
								f = "";
							if (c = (o = t(e))[1], u = o[2], i = o[3], a = o[4], s = o[5], c) {
								if (r) {
									if ("https" != c.toLowerCase()) return
								} else if ("http" != c.toLowerCase()) return;
								if (u) return /:(\d+)$/.test(u) && (l = u.match(/:(\d+)$/)[0], u = u.replace(/:\d+$/, "")), f += c + ":", f += "//" + u, l && (f += l), f += i, a && a.length && (f += "?" + a), s && s.length && (f += "#" + s), f
							}
						}
					}

					function o(e) {
						return r(e, !0)
					}

					function i(e) {
						return r(e) || o(e)
					}
				}(e = n.nmd(e))
			}
		},
		t = {};

	function n(r) {
		var o = t[r];
		if (void 0 !== o) return o.exports;
		var i = t[r] = {
			id: r,
			loaded: !1,
			exports: {}
		};
		return e[r](i, i.exports, n), i.loaded = !0, i.exports
	}
	n.n = e => {
		var t = e && e.__esModule ? () => e.default : () => e;
		return n.d(t, {
			a: t
		}), t
	}, n.d = (e, t) => {
		for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
			enumerable: !0,
			get: t[r]
		})
	}, n.g = function() {
		if ("object" == typeof globalThis) return globalThis;
		try {
			return this || new Function("return this")()
		} catch (e) {
			if ("object" == typeof window) return window
		}
	}(), n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), n.nmd = e => (e.paths = [], e.children || (e.children = []), e), (() => {
		"use strict";
		n(314);
		var e = n(193),
			t = n.n(e),
			r = n(481),
			o = "undefined" != typeof globalThis && globalThis || "undefined" != typeof self && self || void 0 !== o && o,
			i = "URLSearchParams" in o,
			a = "Symbol" in o && "iterator" in Symbol,
			s = "FileReader" in o && "Blob" in o && function() {
				try {
					return new Blob, !0
				} catch (e) {
					return !1
				}
			}(),
			c = "FormData" in o,
			u = "ArrayBuffer" in o;
		if (u) var l = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
			f = ArrayBuffer.isView || function(e) {
				return e && l.indexOf(Object.prototype.toString.call(e)) > -1
			};

		function p(e) {
			if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e) || "" === e) throw new TypeError('Invalid character in header field name: "' + e + '"');
			return e.toLowerCase()
		}

		function d(e) {
			return "string" != typeof e && (e = String(e)), e
		}

		function h(e) {
			var t = {
				next: function() {
					var t = e.shift();
					return {
						done: void 0 === t,
						value: t
					}
				}
			};
			return a && (t[Symbol.iterator] = function() {
				return t
			}), t
		}

		function m(e) {
			this.map = {}, e instanceof m ? e.forEach((function(e, t) {
				this.append(t, e)
			}), this) : Array.isArray(e) ? e.forEach((function(e) {
				this.append(e[0], e[1])
			}), this) : e && Object.getOwnPropertyNames(e).forEach((function(t) {
				this.append(t, e[t])
			}), this)
		}

		function y(e) {
			if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
			e.bodyUsed = !0
		}

		function g(e) {
			return new Promise((function(t, n) {
				e.onload = function() {
					t(e.result)
				}, e.onerror = function() {
					n(e.error)
				}
			}))
		}

		function b(e) {
			var t = new FileReader,
				n = g(t);
			return t.readAsArrayBuffer(e), n
		}

		function v(e) {
			if (e.slice) return e.slice(0);
			var t = new Uint8Array(e.byteLength);
			return t.set(new Uint8Array(e)), t.buffer
		}

		function w() {
			return this.bodyUsed = !1, this._initBody = function(e) {
				var t;
				this.bodyUsed = this.bodyUsed, this._bodyInit = e, e ? "string" == typeof e ? this._bodyText = e : s && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : c && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : i && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : u && s && ((t = e) && DataView.prototype.isPrototypeOf(t)) ? (this._bodyArrayBuffer = v(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : u && (ArrayBuffer.prototype.isPrototypeOf(e) || f(e)) ? this._bodyArrayBuffer = v(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : i && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
			}, s && (this.blob = function() {
				var e = y(this);
				if (e) return e;
				if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
				if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
				if (this._bodyFormData) throw new Error("could not read FormData body as blob");
				return Promise.resolve(new Blob([this._bodyText]))
			}, this.arrayBuffer = function() {
				if (this._bodyArrayBuffer) {
					var e = y(this);
					return e || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset, this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength)) : Promise.resolve(this._bodyArrayBuffer))
				}
				return this.blob().then(b)
			}), this.text = function() {
				var e, t, n, r = y(this);
				if (r) return r;
				if (this._bodyBlob) return e = this._bodyBlob, t = new FileReader, n = g(t), t.readAsText(e), n;
				if (this._bodyArrayBuffer) return Promise.resolve(function(e) {
					for (var t = new Uint8Array(e), n = new Array(t.length), r = 0; r < t.length; r++) n[r] = String.fromCharCode(t[r]);
					return n.join("")
				}(this._bodyArrayBuffer));
				if (this._bodyFormData) throw new Error("could not read FormData body as text");
				return Promise.resolve(this._bodyText)
			}, c && (this.formData = function() {
				return this.text().then(_)
			}), this.json = function() {
				return this.text().then(JSON.parse)
			}, this
		}
		m.prototype.append = function(e, t) {
			e = p(e), t = d(t);
			var n = this.map[e];
			this.map[e] = n ? n + ", " + t : t
		}, m.prototype.delete = function(e) {
			delete this.map[p(e)]
		}, m.prototype.get = function(e) {
			return e = p(e), this.has(e) ? this.map[e] : null
		}, m.prototype.has = function(e) {
			return this.map.hasOwnProperty(p(e))
		}, m.prototype.set = function(e, t) {
			this.map[p(e)] = d(t)
		}, m.prototype.forEach = function(e, t) {
			for (var n in this.map) this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this)
		}, m.prototype.keys = function() {
			var e = [];
			return this.forEach((function(t, n) {
				e.push(n)
			})), h(e)
		}, m.prototype.values = function() {
			var e = [];
			return this.forEach((function(t) {
				e.push(t)
			})), h(e)
		}, m.prototype.entries = function() {
			var e = [];
			return this.forEach((function(t, n) {
				e.push([n, t])
			})), h(e)
		}, a && (m.prototype[Symbol.iterator] = m.prototype.entries);
		var k = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];

		function O(e, t) {
			if (!(this instanceof O)) throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
			var n, r, o = (t = t || {}).body;
			if (e instanceof O) {
				if (e.bodyUsed) throw new TypeError("Already read");
				this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new m(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, o || null == e._bodyInit || (o = e._bodyInit, e.bodyUsed = !0)
			} else this.url = String(e);
			if (this.credentials = t.credentials || this.credentials || "same-origin", !t.headers && this.headers || (this.headers = new m(t.headers)), this.method = (n = t.method || this.method || "GET", r = n.toUpperCase(), k.indexOf(r) > -1 ? r : n), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && o) throw new TypeError("Body not allowed for GET or HEAD requests");
			if (this._initBody(o), !("GET" !== this.method && "HEAD" !== this.method || "no-store" !== t.cache && "no-cache" !== t.cache)) {
				var i = /([?&])_=[^&]*/;
				if (i.test(this.url)) this.url = this.url.replace(i, "$1_=" + (new Date).getTime());
				else {
					this.url += (/\?/.test(this.url) ? "&" : "?") + "_=" + (new Date).getTime()
				}
			}
		}

		function _(e) {
			var t = new FormData;
			return e.trim().split("&").forEach((function(e) {
				if (e) {
					var n = e.split("="),
						r = n.shift().replace(/\+/g, " "),
						o = n.join("=").replace(/\+/g, " ");
					t.append(decodeURIComponent(r), decodeURIComponent(o))
				}
			})), t
		}

		function T(e, t) {
			if (!(this instanceof T)) throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
			t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = void 0 === t.statusText ? "" : "" + t.statusText, this.headers = new m(t.headers), this.url = t.url || "", this._initBody(e)
		}
		O.prototype.clone = function() {
			return new O(this, {
				body: this._bodyInit
			})
		}, w.call(O.prototype), w.call(T.prototype), T.prototype.clone = function() {
			return new T(this._bodyInit, {
				status: this.status,
				statusText: this.statusText,
				headers: new m(this.headers),
				url: this.url
			})
		}, T.error = function() {
			var e = new T(null, {
				status: 0,
				statusText: ""
			});
			return e.type = "error", e
		};
		var x = [301, 302, 303, 307, 308];
		T.redirect = function(e, t) {
			if (-1 === x.indexOf(t)) throw new RangeError("Invalid status code");
			return new T(null, {
				status: t,
				headers: {
					location: e
				}
			})
		};
		var E = o.DOMException;
		try {
			new E
		} catch (e) {
			(E = function(e, t) {
				this.message = e, this.name = t;
				var n = Error(e);
				this.stack = n.stack
			}).prototype = Object.create(Error.prototype), E.prototype.constructor = E
		}

		function S(e, t) {
			return new Promise((function(n, r) {
				var i = new O(e, t);
				if (i.signal && i.signal.aborted) return r(new E("Aborted", "AbortError"));
				var a = new XMLHttpRequest;

				function c() {
					a.abort()
				}
				a.onload = function() {
					var e, t, r = {
						status: a.status,
						statusText: a.statusText,
						headers: (e = a.getAllResponseHeaders() || "", t = new m, e.replace(/\r?\n[\t ]+/g, " ").split("\r").map((function(e) {
							return 0 === e.indexOf("\n") ? e.substr(1, e.length) : e
						})).forEach((function(e) {
							var n = e.split(":"),
								r = n.shift().trim();
							if (r) {
								var o = n.join(":").trim();
								t.append(r, o)
							}
						})), t)
					};
					r.url = "responseURL" in a ? a.responseURL : r.headers.get("X-Request-URL");
					var o = "response" in a ? a.response : a.responseText;
					setTimeout((function() {
						n(new T(o, r))
					}), 0)
				}, a.onerror = function() {
					setTimeout((function() {
						r(new TypeError("Network request failed"))
					}), 0)
				}, a.ontimeout = function() {
					setTimeout((function() {
						r(new TypeError("Network request failed"))
					}), 0)
				}, a.onabort = function() {
					setTimeout((function() {
						r(new E("Aborted", "AbortError"))
					}), 0)
				}, a.open(i.method, function(e) {
					try {
						return "" === e && o.location.href ? o.location.href : e
					} catch (t) {
						return e
					}
				}(i.url), !0), "include" === i.credentials ? a.withCredentials = !0 : "omit" === i.credentials && (a.withCredentials = !1), "responseType" in a && (s ? a.responseType = "blob" : u && i.headers.get("Content-Type") && -1 !== i.headers.get("Content-Type").indexOf("application/octet-stream") && (a.responseType = "arraybuffer")), !t || "object" != typeof t.headers || t.headers instanceof m ? i.headers.forEach((function(e, t) {
					a.setRequestHeader(t, e)
				})) : Object.getOwnPropertyNames(t.headers).forEach((function(e) {
					a.setRequestHeader(e, d(t.headers[e]))
				})), i.signal && (i.signal.addEventListener("abort", c), a.onreadystatechange = function() {
					4 === a.readyState && i.signal.removeEventListener("abort", c)
				}), a.send(void 0 === i._bodyInit ? null : i._bodyInit)
			}))
		}

		function C(e) {
			return C = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			}, C(e)
		}

		function A(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, (o = r.key, i = void 0, i = function(e, t) {
					if ("object" !== C(e) || null === e) return e;
					var n = e[Symbol.toPrimitive];
					if (void 0 !== n) {
						var r = n.call(e, t || "default");
						if ("object" !== C(r)) return r;
						throw new TypeError("@@toPrimitive must return a primitive value.")
					}
					return ("string" === t ? String : Number)(e)
				}(o, "string"), "symbol" === C(i) ? i : String(i)), r)
			}
			var o, i
		}
		S.polyfill = !0, o.fetch || (o.fetch = S, o.Headers = m, o.Request = O, o.Response = T);
		var P = function() {
			function e(t) {
				! function(e, t) {
					if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
				}(this, e);
				var n = function(e) {
					var t = {
						error: !1,
						message: ""
					};
					e.vaultUrl && (0, r.isUri)(e.vaultUrl) ? e.cardHost && (0, r.isUri)(e.cardHost) ? e.interfaceUrl && (0, r.isUri)(e.interfaceUrl) || (t.message = "Missing interfaceUrl") : t.message = "Missing cardHost" : t.message = "Missing vaultUrl";
					return t.error = "" !== t.message, t
				}(t);
				if (n.error) throw new Error(n.message);
				this.config = t, this.publicKey = null, this._rpc = null
			}
			var t, n, o;
			return t = e, (n = [{
				key: "_createRpc",
				value: function(e) {
					var t = this;
					if (this._rpc) return this._rpc;
					var n = this.config.vaultUrl,
						r = setTimeout((function() {
							t._rpc.destroy(), t._rpc = null, e && e()
						}), 3e4);
					return this._rpc = new easyXDM.Rpc({
						remote: "".concat(n, "/provider"),
						onReady: function() {
							clearTimeout(r)
						}
					}, {
						remote: {
							createToken: {}
						}
					}), this._rpc
				}
			}, {
				key: "setPublicKey",
				value: function(e) {
					return this.publicKey = e, this.publicKey
				}
			}, {
				key: "createSource",
				value: function(e, t, n) {
					var r = btoa(this.publicKey);
					t.type = e;
					var o = "".concat(this.config.interfaceUrl, "/sources/");
					fetch(o, {
						method: "post",
						headers: {
							Authorization: "Basic ".concat(r),
							"Content-Type": "application/json"
						},
						body: JSON.stringify(t)
					}).then((function(e) {
						return e.json().then((function(t) {
							return n(e.status, t)
						}))
					})).catch((function(e) {
						n(0, {
							code: "create_source_error",
							error: e.message
						})
					}))
				}
			}, {
				key: "createToken",
				value: function(e, t, n) {
					var r = {};
					r[e] = t, this._createRpc((function() {
						n(0, {
							code: "rpc_error",
							message: "unable to connect to provider after timeout"
						})
					})).createToken(this.publicKey, r, (function(e) {
						n(e.status, e.data)
					}), (function(e) {
						n(e.data.status, e.data.data)
					}))
				}
			}]) && A(t.prototype, n), o && A(t, o), Object.defineProperty(t, "prototype", {
				writable: !1
			}), e
		}();

		function B(e, t) {
			return Object.assign({}, e, t)
		}

		function F(e) {
			try {
				return JSON.parse(e)
			} catch (t) {
				return e
			}
		}

		function j(e) {
			for (var t = {}, n = e.attributes.length, r = 0; r < n; r++) {
				var o = e.attributes[r];
				if (/^data/.test(o.name)) t[o.name.replace("data-", "").replace(/-([a-z])/g, (function(e) {
					return e[1].toUpperCase()
				}))] = o.value
			}
			return t
		}

		function M(e) {
			return M = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			}, M(e)
		}
		var R = "CLOSE_IFRAME",
			I = "SHOW_IFRAME_APP_FORM",
			L = "CLOSE_AND_SEND_TOKEN",
			D = "SEND_ERROR",
			H = "REQUEST_CARD_TOKEN",
			N = "SEND_TOKEN";

		function U(e) {
			n.g.addEventListener("message", (function(t) {
				var n = F(t.data),
					r = n.type,
					o = n.data;
				! function(e, t, n) {
					switch (t) {
						case R:
							e.close();
							break;
						case D:
							e.sendError(n);
							break;
						case L:
							e.close(), e.setTokenAtOmiseTokenField(n);
							break;
						case N:
							e.setTokenAtOmiseTokenField(n, !1)
					}
				}(e, r, o)
			}), !1)
		}

		function q(e, n) {
			z(e, I, n, t().cardHost)
		}

		function J(e, t) {
			z(e, H, t, "*")
		}

		function z(e, t, n, r) {
			var o = [];
			var i = JSON.stringify({
				type: t,
				data: n
			}, (function(e, t) {
				if ("object" === M(t) && null !== t) {
					if (-1 !== o.indexOf(t)) return;
					o.push(t)
				}
				return t
			}));
			e.postMessage(i, r)
		}

		function $(e) {
			return $ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			}, $(e)
		}

		function W(e, t) {
			var n = Object.keys(e);
			if (Object.getOwnPropertySymbols) {
				var r = Object.getOwnPropertySymbols(e);
				t && (r = r.filter((function(t) {
					return Object.getOwnPropertyDescriptor(e, t).enumerable
				}))), n.push.apply(n, r)
			}
			return n
		}

		function K(e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = null != arguments[t] ? arguments[t] : {};
				t % 2 ? W(Object(n), !0).forEach((function(t) {
					X(e, t, n[t])
				})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : W(Object(n)).forEach((function(t) {
					Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
				}))
			}
			return e
		}

		function X(e, t, n) {
			return (t = Q(t)) in e ? Object.defineProperty(e, t, {
				value: n,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : e[t] = n, e
		}

		function G(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}

		function V(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, Q(r.key), r)
			}
		}

		function Q(e) {
			var t = function(e, t) {
				if ("object" !== $(e) || null === e) return e;
				var n = e[Symbol.toPrimitive];
				if (void 0 !== n) {
					var r = n.call(e, t || "default");
					if ("object" !== $(r)) return r;
					throw new TypeError("@@toPrimitive must return a primitive value.")
				}
				return ("string" === t ? String : Number)(e)
			}(e, "string");
			return "symbol" === $(t) ? t : String(t)
		}
		var Y = {
				key: "",
				amount: 0,
				currency: "THB",
				image: "https://cdn.omise.co/assets/frontend-images/store-logo.svg",
				frameLabel: "Omise",
				defaultPaymentMethod: "credit_card",
				otherPaymentMethods: [],
				frameDescription: "Secured by Opn Payments",
				submitLabel: "Pay",
				buttonLabel: "Pay with Opn Payments",
				location: "no",
				submitAuto: "yes",
				submitFormTarget: "",
				cardBrands: "visa mastercard",
				locale: "en",
				autoCardNumberFormat: "yes",
				expiryDateStyle: "",
				hideAmount: "false",
				style: {
					body: {
						width: "400px"
					},
					merchantSection: {
						visible: !0
					},
					methodsListSection: {
						maxHeight: "unset",
						scrollY: !1
					},
					closeButton: {
						visible: !0
					},
					submitButton: {
						backgroundColor: "#1A56F0",
						textColor: "#FFF"
					},
					link: {
						textColor: "#1A56F0"
					}
				}
			},
			Z = ["width: 100%", "height: 100%", "border: none"],
			ee = ["display: none", "visibility: visible", "position: fixed", "left: 0px", "top: 0px", "width: 100%", "height: 100%", "z-index: 2147483647", "padding: 0", "margin: 0", "border: 0 none transparent", "background-color: rgba(0, 0, 0, 0)", "overflow-x: hidden", "overflow-y: auto", "-webkit-tap-highlight-color: transparent", "transition: background-color .2s"],
			te = function() {},
			ne = function() {
				function e(t) {
					var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
					G(this, e), this.settings = t, this.setup(t), n && this.init()
				}
				var t, n, r;
				return t = e, n = [{
					key: "setup",
					value: function(e) {
						return this.app = {
							settings: K({}, e),
							iframe: null,
							iframeLoaded: !1,
							omiseScriptTag: null,
							omiseGenerateCheckoutButton: null,
							iframeAppId: "omise-checkout-iframe-app",
							defaultConfig: K({}, Y),
							configForIframeOnLoad: K({}, Y),
							currentOpenConfig: {},
							formElement: null,
							allConfigureButtons: []
						}, this.app
					}
				}, {
					key: "init",
					value: function() {
						for (var e = null != this.app.iframe, t = document.getElementsByTagName("script"), n = t.length, r = 0; r < n; r++) {
							var o = t[r];
							if (o.hasAttribute("data-key") && o.hasAttribute("data-amount")) {
								this.app.omiseScriptTag = o;
								break
							}
						}
						e || this.isInsideIframeApp() || !this.app.omiseScriptTag || (this.createIframe(), this.app.omiseGenerateCheckoutButton = this.createOmiseCheckoutButton(), U(this))
					}
				}, {
					key: "getDefaultConfig",
					value: function() {
						return this.app.defaultConfig
					}
				}, {
					key: "getAllConfigureButtons",
					value: function() {
						return this.app.allConfigureButtons
					}
				}, {
					key: "sendError",
					value: function(e) {
						(K(K({}, this.app.defaultConfig), this.app.currentOpenConfig).onError || te)(e)
					}
				}, {
					key: "setTokenAtOmiseTokenField",
					value: function(e) {
						var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
							n = K(K({}, this.app.defaultConfig), this.app.currentOpenConfig),
							r = n.submitAuto,
							o = n.onCreateTokenSuccess;
						this.app.formElement && (this.isOmiseSource(e) ? this.app.formElement.omiseSource.value = e : this.app.formElement.omiseToken.value = e), "yes" === r && this.app.formElement && this.app.formElement.submit();
						var i = o || te;
						i(e), t && (this.app.currentOpenConfig = {})
					}
				}, {
					key: "isOmiseSource",
					value: function(e) {
						return /^src_/.test(e)
					}
				}, {
					key: "getFormByTarget",
					value: function(e) {
						for (var t = e; t && "FORM" !== t.tagName;) t = t.parentNode;
						return t
					}
				}, {
					key: "createIframe",
					value: function() {
						var e, t = this,
							n = document.createElement("iframe");
						n.id = this.app.iframeAppId, n.src = "".concat(this.app.settings.cardHost, "/pay.html");
						var r = this.app.defaultConfig.customCardForm ? Z : ee;
						return n.setAttribute("style", r.join("; ")), n.setAttribute("sandbox", "allow-forms allow-scripts allow-same-origin"), (null !== (e = this.app.defaultConfig.element) && void 0 !== e ? e : document.body).appendChild(n), n.onload = function() {
							"block" === t.app.iframe.style.display && q(n.contentWindow, {
								config: t.app.configForIframeOnLoad
							}), t.app.iframeLoaded = !0;
							var e = new CustomEvent("iframeLoaded");
							window.dispatchEvent(e)
						}, this.app.iframe = n, this.app.iframe
					}
				}, {
					key: "createHiddenInputForOmiseToken",
					value: function(e) {
						var t = null;
						if (e && "FORM" === e.tagName && (t = e), !t) throw new Error(["Missing form element. Generate button or custom button must contain in form element.", "https://github.com/omise/examples/blob/master/omise.js/example-4-custom-integration-multiple-buttons.html", "Or setting submit form target", "https://github.com/omise/examples/blob/master/omise.js/example-5-custom-integration-specify-checkout-form.html"].join("\n"));
						var n = t.querySelector('input[name="omiseToken"]');
						null == n && ((n = document.createElement("input")).setAttribute("type", "hidden"), n.setAttribute("name", "omiseToken"), t.appendChild(n));
						var r = t.querySelector('input[name="omiseSource"]');
						return null == r && ((r = document.createElement("input")).setAttribute("type", "hidden"), r.setAttribute("name", "omiseSource"), t.appendChild(r)), n
					}
				}, {
					key: "createOmiseCheckoutButton",
					value: function() {
						var e = this,
							t = this.prepareConfig(j(this.app.omiseScriptTag)),
							n = document.createElement("button");
						n.className = "omise-checkout-button", n.innerHTML = t.buttonLabel;
						var r = this.app.omiseScriptTag;
						if (r) {
							var o = this.getFormByTarget(r);
							this.app.formElement = o, this.createHiddenInputForOmiseToken(o)
						} else console.warn("Missing Omise script tag");
						return n.addEventListener("click", (function(t) {
							if (t.preventDefault(), r) {
								var n = j(r),
									o = e.prepareConfig(n);
								e.app.configForIframeOnLoad = K({}, o), e.open(o)
							} else console.warn("Missing Omise script tag")
						}), !1), r.parentNode.insertBefore(n, r.nextSibling), n
					}
				}, {
					key: "isInsideIframeApp",
					value: function() {
						return null != document.getElementById(this.app.iframeAppId)
					}
				}, {
					key: "prepareConfig",
					value: function() {
						var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
							t = e.otherPaymentMethods;
						return t && "string" == typeof t && (e.otherPaymentMethods = this.stringToArray(t)), B(this.app.defaultConfig, re(e))
					}
				}, {
					key: "stringToArray",
					value: function(e) {
						return e.match(/[\w_]+(\([^)]+\))?/g) || []
					}
				}, {
					key: "configure",
					value: function(e) {
						var t;
						return !(null !== (t = e.element) && void 0 !== t ? t : document.body).innerHTML && this.app.iframe && this.destroy(), this.app.defaultConfig = this.prepareConfig(e), this.isInsideIframeApp() || this.app.iframe || (this.createIframe(), U(this)), this.app.defaultConfig
					}
				}, {
					key: "open",
					value: function() {
						var e = this,
							t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
							n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : te;
						if (!this.app.iframe) return !1;
						var r = !1,
							o = function() {
								var o = e.prepareConfig(t);
								e.app.currentOpenConfig = K({}, o), e.app.iframe.style.backgroundColor = e.app.defaultConfig.customCardForm ? "transparent" : "rgba(0, 0, 0, .4)", e.app.iframe.style.display = "block", setTimeout((function() {
									q(e.app.iframe.contentWindow, {
										config: o
									}), n(e.app.iframe), r = !0
								}))
							};
						return this.app.iframeLoaded ? o() : window.addEventListener("iframeLoaded", (function() {
							r || o()
						})), !0
					}
				}, {
					key: "requestCardToken",
					value: function() {
						var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
						J(this.app.iframe.contentWindow, {
							billingAddress: e
						})
					}
				}, {
					key: "close",
					value: function() {
						var e = this,
							t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : te;
						return !!this.app.iframe && (this.app.iframe.style.backgroundColor = "rgba(0, 0, 0, 0)", setTimeout((function() {
							e.app.iframe.style.display = "none", t(e.app.iframe), (e.app.currentOpenConfig.onFormClosed || te)(e.app.iframe)
						}), 250), !0)
					}
				}, {
					key: "destroy",
					value: function() {
						var e = document.getElementById(this.app.iframeAppId);
						if (this.app.iframe && e) {
							var t, n = document.getElementById(this.app.iframeAppId);
							(null !== (t = this.app.defaultConfig.element) && void 0 !== t ? t : document.body).removeChild(n)
						}
						this.setup(this.settings)
					}
				}, {
					key: "createParentFrameHandler",
					value: function() {
						return {
							closeIframe: function() {
								z(parent.window, R, null, "*")
							},
							closeAndSendToken: function(e) {
								! function(e) {
									z(parent.window, L, e, "*")
								}(e)
							},
							sendError: function(e) {
								! function(e) {
									z(parent.window, D, e, "*")
								}(e)
							},
							sendToken: function(e) {
								! function(e) {
									z(parent.window, N, e, "*")
								}(e)
							}
						}
					}
				}, {
					key: "configureButton",
					value: function(e, t) {
						var n = {
							buttonId: e,
							configuration: this.prepareConfig(t)
						};
						return this.app.allConfigureButtons.push(n), n
					}
				}, {
					key: "attach",
					value: function() {
						var e = this,
							t = [];
						return this.app.allConfigureButtons.forEach((function(n) {
							var r = n.configuration,
								o = document.querySelector(n.buttonId),
								i = e.app.defaultConfig.buttonLabel;
							r.buttonLabel && i !== r.buttonLabel ? i = r.buttonLabel : o.innerHTML && (i = o.innerHTML), o.innerHTML = i;
							var a = e.app.defaultConfig.submitFormTarget,
								s = a ? document.querySelector(a) : e.getFormByTarget(o);
							e.createHiddenInputForOmiseToken(s), o.addEventListener("click", (function(t) {
								t.preventDefault(), t.target, e.app.configForIframeOnLoad = r, e.app.formElement = s, e.open(r)
							}), !1), t.push(o)
						})), this.isInsideIframeApp() || this.app.iframe || (this.createIframe(), U(this)), t
					}
				}], n && V(t.prototype, n), r && V(t, r), Object.defineProperty(t, "prototype", {
					writable: !1
				}), e
			}();

		function re(e) {
			var t = {},
				n = {
					publicKey: "key",
					logo: "image",
					locationField: "location"
				};
			for (var r in e) {
				var o = n[r];
				o ? t[o] = e[r] : t[r] = e[r]
			}
			return t
		}
		n.g.Omise = new P(t()), n.g.OmiseCard = new ne(t())
	})()
})();