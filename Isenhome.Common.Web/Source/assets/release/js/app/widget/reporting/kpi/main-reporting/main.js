define("app/widget/reporting/kpi/main-reporting/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "jquery.datatables"], function (a, b, c, d, e) {
	function f(a, b, c) {
		var d,
		e = "";
		switch (C.type) {
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
		var f = D[b].mData;
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
		y = b.substring(b.indexOf("?") + 1),
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
		return a.replace("kpi?type=user&", "kpitop?")
	}
	function l(a) {
		for (var b = 0, c = D.length; c > b; b += 1)
			if (D[b].mData == a)
				return b
	}
	function m() {
		var a = this;
		a.publish("ajax", {
			url : z.USERCONFIG
		}, c().done(function (b) {
				var c,
				d,
				f,
				h;
				if (b && b.kpiFields) {
					c = b.kpiFields;
					for (d in c)
						f = l(d), h = {
							bVisible : c[d],
							aTargets : [f],
							fnCreatedCell : function (a, b, c, d, e) {
								return g(e, a, b, c)
							}
						},
					E.push(h)
				} else
					e.alert("error", "No kpiFields in response.");
				a.oTable.dataTable({
					sDom : "if<'table-scrollable't>i",
					bPaginate : !1,
					bAutoWidth : !1,
					aoColumns : D,
					aoColumnDefs : E,
					fnFooterCallback : q,
					fnInfoCallback : function (a, b, c, d, e) {
						return "总共: " + e + "条结果"
					},
					oLanguage : {
						sSearch : "搜索"
					},
					fnInitComplete : function (b) {
						n.call(a),
						b.aoDrawCallback.push({
							fn : function () {
								n.call(a)
							},
							sName : "FixedHeader"
						})
					}
				}).removeClass("invisible")
			}).then(function () {
				a.subscribe("kpi/show", !0, function (b, c) {
					if ("finalized" !== a.phase)
						if ("team" == c.type) {
							if (!w)
								return e.alert("error", "团队列表不存在"), void 0;
							for (var d = !1, f = 0; f < w.length; f += 1)
								w[f].parent_id == c.filter_id && (d = !0);
							d ? o.call(a, c, !0) : o.call(a, c)
						} else
							o.call(a, c)
				})
			}))
	}
	function n() {
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
	function o(b, d) {
		var e = this;
		if (e.oTable) {
			var f = i(b),
			g = k(f);
			a.extend(C, b),
			e.oTable.fnClearTable(),
			d && (f += "&detail=1"),
			"user" == b.type ? e.publish("ajax", {
				url : g
			}, c().done(function (a) {
					a && (A = a.teamtop, B = a.companytop)
				}).then(function () {
					p.call(e, f, e.oTable)
				})) : (A = null, B = null, p.call(e, f, e.oTable))
		}
	}
	function p(a, b) {
		var d = this;
		x = a,
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
	function q(b, c, d, e, f) {
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
			h = j.attr("data-mapping"),
			j.html(k[h])
		}),
		r(a(b).parents("tfoot").find(".team"), A),
		r(a(b).parents("tfoot").find(".company"), B)
	}
	function r(b, c) {
		var d,
		e;
		c ? (b.show(), b.find("th").each(function () {
				e = a(this),
				d = e.attr("data-mapping"),
				c[d] && c[d].name && e.html('<span class="highlight">' + c[d].value + "</span>" + ' (<a data-action="user/open" href="/user/preview#' + c[d].id + '">' + c[d].name + "</a>)")
			})) : b.hide()
	}
	function s(a) {
		var b = this,
		c = 0,
		d = D.length;
		for (c; d > c && D[c].mData !== a; c++);
		var e = b.oTable.fnSettings().aoColumns[c].bVisible;
		b.oTable.fnSetColumnVis(c, e ? !1 : !0)
	}
	function t(b, d, e) {
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
							"offer signed" === f && (f = "offersign"),
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
						case "attachments":
							g.attr("data-weave", "app/widget/reporting/kpi/attachment-reporting/detail/main(ids)").weave();
							break;
						case "todos":
							g.attr("data-weave", "app/widget/reporting/kpi/task-reporting/detail/main(ids)").weave();
							break;
						case "clients":
							g.attr("data-weave", "app/widget/reporting/kpi/client-reporting/detail/main(ids)").weave();
							break;
						default:
							g.attr("data-weave", "app/widget/reporting/kpi/main-reporting/action/main(ids)").weave()
						}
					d.fnOpen(e, g, "detailCell")
				}
			}))
	}
	function u() {
		var a = this;
		a.publish("ajax", {
			url : z.NOTE_CATEGORY
		}, c().done(function (b) {
				a._json.note = b,
				b.forEach(function (a) {
					D.push({
						mData : a.code
					})
				}),
				c(function (b) {
					a.html(d, a._json, b)
				}).done(function () {
					v.call(a)
				})
			}))
	}
	function v() {
		var a = this;
		a.oTable = a.$element.find("table"),
		a.publish("ajax", {
			url : z.TEAM_LIST
		}, c().done(function (b) {
				w = b,
				m.call(a)
			}))
	}
	var w,
	x,
	y,
	z = {
		TEAM_LIST : "/rest/data/team/list",
		NOTE_CATEGORY : "/rest/data/options?type=candidate_note_category,jobsubmission_note_category",
		USERCONFIG : "/rest/data/userconfig/"
	},
	A = null,
	B = null,
	C = {
		type : "user",
		filter : "",
		filter_id : "",
		start : "",
		end : ""
	},
	D = [{
			mData : "id"
		}, {
			mData : "name"
		}, {
			mData : "keyin candidates"
		}, {
			mData : "owned candidates"
		}, {
			mData : "clients"
		}, {
			mData : "candidate email sent"
		}, {
			mData : "floating"
		}, {
			mData : "notes"
		}, {
			mData : "attachments"
		}, {
			mData : "todos"
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
		}, {
			mData : "cv sent by owner"
		}, {
			mData : "client interview by owner"
		}, {
			mData : "offer signed by owner"
		}
	],
	E = [{
			bVisible : !1,
			aTargets : [0]
		}, {
			mRender : f,
			aTargets : [1]
		}
	];
	return b.extend({
		"sig/stop" : function (a, b) {
			var c = this;
			c.oTable.fnDestroy(),
			b.resolve()
		},
		"hub:memory/context" : function (a, b) {
			this._user = b.user,
			u.call(this)
		},
		"hub/kpi/toggle/column" : function (a, b) {
			var c = this;
			s.call(c, b);
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
			if (!w)
				return e.alert("error", "团队列表不存在"), void 0;
			for (var h = !1, i = 0; i < w.length; i += 1)
				w[i].parent_id == d && (h = !0);
			C.filter = "team",
			C.filter_id = d,
			h ? this.publish("filter/kpi/update", C, g.html()) : (C.type = "user", this.publish("filter/kpi/update", C, g.html(), !0)),
			o.call(f, C, !0)
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
			k.filter = C.type,
			k.filter_id = e,
			k.start = C.start,
			k.end = C.end;
			var l = j(k);
			f.oTable.fnIsOpen(i) ? (f.oTable.fnClose(i), h.data("detail") !== d ? (t.call(f, l, f.oTable, i), h.data("detail", d), g.closest("td").addClass("selected").siblings().removeClass("selected")) : (h.data("detail", ""), g.closest("td").removeClass("selected"))) : (t.call(f, l, f.oTable, i), h.data("detail", d), g.closest("td").addClass("selected").siblings().removeClass("selected"))
		},
		"dom/action/open/column/config.click" : function () {
			var a = this;
			a.publish("modal/kpi-column-config/show")
		},
		"dom/action/view/chart.click" : function (a, b, c) {
			var d = "",
			e = y;
			d = "/kpi/chart#" + e + "&time_slice=week&chart=multiBarChart&kpi_type=" + c,
			window.open(d.replace(/&/g, "/"), "_blank")
		},
		"dom/action/export/csv.click" : function (a, b) {
			b.preventDefault();
			var c = x + "&output=csv";
			window.open(c)
		}
	})
})