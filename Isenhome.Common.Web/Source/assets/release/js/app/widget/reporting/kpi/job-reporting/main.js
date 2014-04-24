define("app/widget/reporting/kpi/job-reporting/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "jquery.datatables"], function (a, b, c, d, e) {
	function f(a, b, c) {
		var d,
		e = "";
		switch (B.type) {
		case "user":
			"Active" !== c.status && (e = "muted"),
			d = '<a class="' + e + '" data-action="user/open" href="/user/preview#' + c.id + '">' + a + "</a>";
			break;
		case "team":
			d = '<a href="#' + c.id + '" data-action="lookup(' + c.id + ')">' + a + "</a>";
			break;
		default:
			d = a
		}
		return d
	}
	function g(b, c, d, e) {
		var f = C[b].mData;
		d > 0 && a(c).attr("data-action", 'details/show("' + f + '", ' + e.id + ")").addClass("info")
	}
	function h(a) {
		var b = {};
		return a.replace(/([^?=&]+)(=([^&]*))?/g, function (a, c, d, e) {
			b[c] = e
		}),
		b
	}
	function i(a) {
		var b = "/rest/report/kpi?type=<type>",
		c = "&filter=<filter>&<filter>_id=<id>",
		d = "&start=<start>&end=<end>";
		return a.filter && (a.filter_id || 0 === a.filter_id) && (b += c.replace(/<filter>/g, a.filter).replace(/<id>/, a.filter_id)),
		a.start && a.end && (b += d.replace(/<start>/, a.start).replace(/<end>/, a.end)),
		b = b.replace(/<type>/, a.type),
		x = b.substring(b.indexOf("?") + 1),
		b
	}
	function j(a) {
		var b = "/rest/report/kpidetail?type=<type>",
		c = "&filter=<filter>&<filter>_id=<id>",
		d = "&start=<start>&end=<end>";
		return a.filter && (a.filter_id || 0 === a.filter_id) && (b += c.replace(/<filter>/g, a.filter).replace(/<id>/, a.filter_id)),
		a.start && a.end && (b += d.replace(/<start>/, a.start).replace(/<end>/, a.end)),
		encodeURI(b.replace(/<type>/, a.type))
	}
	function k(a) {
		return a.replace("kpi?", "kpitop?")
	}
	function l() {
		var a = this;
		a.oTable.dataTable({
			sDom : "if<'table-scrollable't>i",
			bPaginate : !1,
			bAutoWidth : !1,
			aoColumns : C,
			aoColumnDefs : D,
			fnFooterCallback : p,
			fnInfoCallback : function (a, b, c, d, e) {
				return "总共: " + e + "条结果"
			},
			oLanguage : {
				sSearch : "搜索"
			},
			fnInitComplete : function (b) {
				m.call(a),
				b.aoDrawCallback.push({
					fn : function () {
						m.call(a)
					},
					sName : "FixedHeader"
				})
			}
		}).removeClass("invisible")
	}
	function m() {
		var b = this,
		c = b.$element.find(".table-scrollable"),
		d = c.find("table:eq(1)").length;
		b.oTable.find("thead");
		var e,
		f,
		g = b.oTable.offset().top - 40,
		h = b.oTable.outerWidth();
		d ? (e = c.find("table:eq(1)"), f = c.find(".headerWrapper")) : (e = b.oTable.clone(), f = a('<div class="headerWrapper"></div>'), f.append(e)),
		f.css("width", h),
		e.css("width", h),
		e.html("");
		var i = a("thead", b.oTable).clone(!0);
		e.html(i).removeClass("invisible"),
		a("thead>tr th", b.oTable).each(function (b) {
			a("thead>tr th:eq(" + b + ")", e).width(a(this).width())
		}),
		a("thead>tr td", b.oTable).each(function (b) {
			a("thead>tr td:eq(" + b + ")", e).width(a(this).width())
		}),
		d || (f.css({
				position : "absolute",
				top : 0,
				left : 0,
				zIndex : 1e3
			}), c.append(f));
		var j = a(window);
		j.scroll(function () {
			var a = j.scrollTop(),
			b = a - g;
			b > 0 ? f.css({
				top : b
			}) : f.css({
				top : 0
			})
		})
	}
	function n(b, d) {
		var e = this;
		if (e.oTable) {
			var f = i(b),
			g = k(f);
			a.extend(B, b),
			e.oTable.fnClearTable(),
			d && (f += "&detail=1"),
			"user" == b.type ? e.publish("ajax", {
				url : g
			}, c().done(function (a) {
					a && (z = a.teamtop, A = a.companytop)
				}).then(function () {
					o.call(e, f, e.oTable)
				})) : (z = null, A = null, o.call(e, f, e.oTable))
		}
	}
	function o(a, b) {
		var d = this;
		w = a,
		d.publish("ajax", {
			url : a
		}, c().done(function (a) {
				try {
					b.fnAddData(a.aaData),
					b.fnDraw()
				} catch (c) {
					d.publish("error/log", c.message, c.stack)
				}
			}))
	}
	function p(b, c, d, e, f) {
		if (!c.length)
			return a(b).parents("tfoot").hide(), !1;
		f.length ? a(b).parents("tfoot").show() : a(b).parents("tfoot").hide();
		var g,
		h,
		i,
		j,
		k = {};
		for (g = d; e > g; g += 1) {
			i = c[f[g]];
			for (h in i)
				"id" != h && "name" != h && (void 0 === k[h] && (k[h] = 0), k[h] += i[h])
		}
		a(b).find("th").each(function () {
			j = a(this),
			h = j.data("mapping"),
			j.html(k[h])
		}),
		q(a(b).parents("tfoot").find(".team"), z),
		q(a(b).parents("tfoot").find(".company"), A)
	}
	function q(b, c) {
		var d,
		e;
		c ? (b.show(), b.find("th").each(function () {
				e = a(this),
				d = e.data("mapping"),
				c[d] && c[d].name && e.html('<span class="highlight">' + c[d].value + "</span>" + ' (<a data-action="user/open" href="/user/preview#' + c[d].id + '">' + c[d].name + "</a>)")
			})) : b.hide()
	}
	function r(a) {
		var b = this,
		c = b.oTable.fnSettings().aoColumns[a].bVisible;
		b.oTable.fnSetColumnVis(a, c ? !1 : !0)
	}
	function s(b, d, e) {
		var f = this;
		f.publish("ajax", {
			url : b
		}, c().done(function (c) {
				var f,
				g,
				i = h(b);
				if (c && c.data) {
					if (c.data.length > 200)
						g = a('<p class="text-center text-error">系统仅支持显示200条以内的明细!</p>');
					else
						switch (g = a('<table class="table table-striped table-bordered table-candidate table_vam"></table>').data("ids", c.data), f = decodeURI(i.type)) {
						case "floating":
							g.attr("data-weave", "app/widget/reporting/kpi/main-reporting/floating/main(ids)").weave();
							break;
						case "owned candidates":
						case "keyin candidates":
							g.attr("data-weave", "app/widget/reporting/kpi/main-reporting/people/main(ids)").weave();
							break;
						case "candidate email sent":
							g.attr("data-weave", "app/widget/reporting/kpi/main-reporting/email/main(ids)").weave();
							break;
						case "notes":
							g.attr("data-weave", "app/widget/reporting/kpi/main-reporting/action/main(ids, true)").weave();
							break;
						case "shortlist":
						case "cv sent":
						case "offer signed":
						case "cv sent by owner":
						case "offer signed by owner":
							g.attr("data-weave", "app/widget/reporting/kpi/main-reporting/submission/main(ids, " + f + ")").weave();
							break;
						case "job new added":
						case "live jobs":
						case "updated jobs":
							g.attr("data-weave", "app/widget/reporting/kpi/main-reporting/job/main(ids)").weave();
							break;
						case "client interview":
						case "client interview by owner":
							g.attr("data-weave", "app/widget/reporting/kpi/main-reporting/interview/main(ids)").weave();
							break;
						default:
							g.attr("data-weave", "app/widget/reporting/kpi/main-reporting/action/main(ids)").weave()
						}
					d.fnOpen(e, g, "detailCell")
				}
			}))
	}
	function t() {
		var a = this;
		c(function (b) {
			a.html(d, a._json, b)
		}).done(function () {
			u.call(a)
		})
	}
	function u() {
		var a = this;
		a.oTable = a.$element.find("table"),
		a.publish("ajax", {
			url : y.TEAM_LIST
		}, c().done(function (b) {
				v = b,
				l.call(a)
			}))
	}
	var v,
	w,
	x,
	y = {
		TEAM_LIST : "/rest/data/team/list"
	},
	z = null,
	A = null,
	B = {
		type : "user",
		filter : "",
		filter_id : "",
		start : "",
		end : ""
	},
	C = [{
			mData : "id"
		}, {
			mData : "name"
		}, {
			mData : "shortlist"
		}, {
			mData : "job new added"
		}, {
			mData : "live jobs"
		}, {
			mData : "updated jobs"
		}, {
			mData : "cv sent"
		}, {
			mData : "client interview"
		}, {
			mData : "offer signed"
		}
	],
	D = [{
			bVisible : !1,
			aTargets : [0]
		}, {
			mRender : f,
			aTargets : [1]
		}, {
			aTargets : [2],
			fnCreatedCell : function (a, b, c, d, e) {
				return g(e, a, b, c)
			}
		}, {
			aTargets : [3],
			fnCreatedCell : function (a, b, c, d, e) {
				return g(e, a, b, c)
			}
		}, {
			aTargets : [4],
			fnCreatedCell : function (a, b, c, d, e) {
				return g(e, a, b, c)
			}
		}, {
			aTargets : [5],
			fnCreatedCell : function (a, b, c, d, e) {
				return g(e, a, b, c)
			}
		}, {
			aTargets : [6],
			fnCreatedCell : function (a, b, c, d, e) {
				return g(e, a, b, c)
			}
		}, {
			aTargets : [7],
			fnCreatedCell : function (a, b, c, d, e) {
				return g(e, a, b, c)
			}
		}, {
			aTargets : [8],
			fnCreatedCell : function (a, b, c, d, e) {
				return g(e, a, b, c)
			}
		}
	];
	return b.extend({
		"sig/stop" : function (a, b) {
			var c = this;
			c.oTable.fnDestroy(),
			b.resolve()
		},
		"hub:memory/kpi/show" : function (a, b) {
			function c() {
				if ("team" == b.type) {
					if (!v)
						return e.alert("error", "团队列表不存在"), void 0;
					for (var a = !1, c = 0; c < v.length; c += 1)
						v[c].parent_id == b.filter_id && (a = !0);
					a ? n.call(d, b, !0) : n.call(d, b)
				} else
					n.call(d, b)
			}
			var d = this;
			if (d.oTable && !d.oTable.hasClass("invisible"))
				c();
			else
				var f = setInterval(function () {
						d.oTable && !d.oTable.hasClass("invisible") && (c(), clearInterval(f))
					}, 100)
		},
		"hub:memory/context" : function (a, b) {
			this._user = b.user,
			t.call(this)
		},
		"hub/kpi/toggle/column" : function (a, b) {
			var c = this;
			r.call(c, b);
			var d = this.$element.find(".detailCell");
			if (d.length) {
				var e = d.eq(0).closest("tr").prev().children().length;
				d.attr("colspan", e)
			}
		},
		"dom/action.click" : a.noop,
		"dom/action/lookup.click" : function (b, c, d) {
			c.preventDefault();
			var f = this,
			g = a(c.target);
			if (!v)
				return e.alert("error", "团队列表不存在"), void 0;
			for (var h = !1, i = 0; i < v.length; i += 1)
				v[i].parent_id == d && (h = !0);
			B.filter = "team",
			B.filter_id = d,
			h ? this.publish("filter/kpi/update", B, g.html()) : (B.type = "user", this.publish("filter/kpi/update", B, g.html(), !0)),
			n.call(f, B, !0)
		},
		"dom/action/user/open.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			f = d.attr("href");
			e.window({
				url : f,
				name : "User Profile",
				width : "1024"
			})
		},
		"dom/action/details/show.click" : function (b, c, d, e) {
			var f = this,
			g = a(c.target),
			h = g.closest("tr"),
			i = h[0],
			k = {};
			k.type = d,
			k.filter = B.type,
			k.filter_id = e,
			k.start = B.start,
			k.end = B.end;
			var l = j(k);
			f.oTable.fnIsOpen(i) ? (f.oTable.fnClose(i), h.data("detail") !== d ? (s.call(f, l, f.oTable, i), h.data("detail", d), g.closest("td").addClass("selected").siblings().removeClass("selected")) : (h.data("detail", ""), g.closest("td").removeClass("selected"))) : (s.call(f, l, f.oTable, i), h.data("detail", d), g.closest("td").addClass("selected").siblings().removeClass("selected"))
		},
		"dom/action/export/csv.click" : function (a, b) {
			b.preventDefault();
			var c = w + "&output=csv";
			window.open(c)
		}
	})
})