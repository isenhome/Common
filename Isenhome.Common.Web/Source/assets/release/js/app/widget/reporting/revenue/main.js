define("app/widget/reporting/revenue/main", ["compose", "jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "shared/helper/blurb", "jquery.datatables.fixedheader"], function (a, b, c, d, e, f, g, h) {
	function i(a) {
		var b = 100 * a;
		return b.toFixed(2) + "%"
	}
	function j(a, b, c) {
		var d,
		e = "";
		switch (z.type) {
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
	function k(a) {
		var b = "/rest/report/revenue?type=<type>",
		c = "&filter=<filter>&<filter>_id=<id>",
		d = "&start=<start>&end=<end>",
		e = "&dateType=<dateType>";
		return a.filter && (a.filter_id || 0 === a.filter_id) && (b += c.replace(/<filter>/g, a.filter).replace(/<id>/, a.filter_id)),
		a.start && a.end && (b += d.replace(/<start>/, a.start).replace(/<end>/, a.end)),
		a.dateType && (b += e.replace("<dateType>", a.dateType)),
		b.replace(/<type>/, a.type)
	}
	function l(a) {
		var b = "/rest/report/revenuedetail?status=<type>",
		c = "&filter=<filter>&<filter>_id=<id>",
		d = "&start=<start>&end=<end>",
		e = "&dateType=<dateType>";
		return a.filter && (a.filter_id || 0 === a.filter_id) && (b += c.replace(/<filter>/g, a.filter).replace(/<id>/, a.filter_id)),
		a.start && a.end && (b += d.replace(/<start>/, a.start).replace(/<end>/, a.end)),
		a.dateType && (b += e.replace("<dateType>", a.dateType)),
		encodeURI(b.replace(/<type>/, a.type))
	}
	function m(a, c, d, e, f) {
		if (!c.length)
			return b(a).parents("tfoot").hide(), !1;
		f.length ? b(a).parents("tfoot").show() : b(a).parents("tfoot").hide();
		var g,
		h,
		j,
		k,
		l = {},
		m = 0,
		n = 0;
		for (g = d; e > g; g += 1) {
			j = c[f[g]],
			delete j.cn_name,
			delete j.status,
			delete j.team_name;
			for (h in j)
				"id" != h && "name" != h && (void 0 === l[h] && (l[h] = 0), l[h] = l[h] + j[h])
		}
		l.revenue > 0 && (m = l.paymentReceived / l.revenue),
		l.annualTarget > 0 && (n = l.revenue / l.annualTarget),
		b(a).find("th[data-mapping]").each(function () {
			k = b(this),
			h = k.data("mapping"),
			"paymentReceived" === h ? k.html('<span class="currency red">' + x(l[h].toFixed(2)) + "</span>") : "paymentReceivedRate" === h ? k.html("<span>" + i(m.toFixed(4)) + "</span>") : "revenueRate" === h ? k.html("<span>" + i(n.toFixed(4)) + "</span>") : k.html('<span class="currency">' + x(l[h].toFixed(2)) + "</span>")
		})
	}
	function n() {
		var a = this;
		a.oTable = a.$element.find("#dt_e").dataTable({
				sDom : "ifti",
				bPaginate : !1,
				bLengthChange : !1,
				aaSorting : [],
				aoColumns : w,
				aoColumnDefs : y,
				fnFooterCallback : m,
				fnInfoCallback : function (a, b, c, d, e) {
					return "总共: " + e + "条结果"
				},
				oLanguage : {
					sSearch : "搜索"
				}
			}),
		new h(a.oTable, {
			offsetTop : 40
		}),
		a.subscribe("revenue/show", !0, function (b, c) {
			if ("team" == c.type) {
				if (!t)
					return f.alert("error", "团队列表不存在"), void 0;
				for (var d = !1, e = 0; e < t.length; e += 1)
					t[e].parent_id == c.filter_id && (d = !0);
				d ? p.call(a, c, !0) : p.call(a, c)
			} else
				p.call(a, c)
		})
	}
	function o(a, b) {
		var c = this;
		u = a,
		c.publish("ajax", {
			url : a
		}, d().done(function (a) {
				b.fnClearTable(),
				b.fnAddData(a.aaData),
				b.fnDraw()
			}))
	}
	function p(a, c) {
		var d = this,
		e = k(a),
		f = b("#dt_e").dataTable();
		b.extend(z, a),
		c && (e += "&detail=1"),
		o.call(d, e, f)
	}
	function q(a, c) {
		var e = this;
		e.publish("ajax", {
			url : a
		}, d().done(function (a) {
				var f = b('<table class="table table-striped table-bordered table-condensed"></table>');
				f.data("json", a).attr("data-weave", "app/widget/reporting/revenue/detailTable(json)").weave(d().done(function () {
						e.oTable.fnOpen(c, f, "detailCell")
					}))
			}))
	}
	function r(a) {
		var b = this;
		d(function (a) {
			b.html(e, b._json, a)
		}).then(function () {
			a.resolve()
		}),
		b.publish("ajax", {
			url : v
		}, d().done(function (a) {
				t = a
			}))
	}
	function s() {
		var a = this;
		n.call(a)
	}
	var t,
	u,
	v = "/rest/data/team/list",
	w = [{
			mData : "id"
		}, {
			mData : "name"
		}, {
			mData : "invoiceNotSent"
		}, {
			mData : "invoiceSent"
		}, {
			mData : "paymentReceived"
		}, {
			mData : "paymentReceivedRate"
		}, {
			mData : "revenue"
		}, {
			mData : "revenueRate"
		}, {
			mData : "annualTarget"
		}
	];
	b.extend(jQuery.fn.dataTableExt.oSort, {
		"formatted-num-pre" : function (a) {
			return a = "-" === a ? 0 : a.replace(/\,/g, "").replace(/<span[^>]*>([^<]+)<\/span>/, "$1"),
			parseFloat(a)
		},
		"formatted-num-asc" : function (a, b) {
			return a - b
		},
		"formatted-num-desc" : function (a, b) {
			return b - a
		},
		"percent-pre" : function (a) {
			var b = "-" == a ? 0 : a.replace(/%/, "").replace(/<span[^>]*>([\d\.]+)<\/span>/, "$1");
			return parseFloat(b)
		},
		"percent-asc" : function (a, b) {
			return b > a ? -1 : a > b ? 1 : 0
		},
		"percent-desc" : function (a, b) {
			return b > a ? 1 : a > b ? -1 : 0
		}
	});
	var x,
	y = [{
			bVisible : !1,
			aTargets : [0]
		}, {
			mRender : j,
			aTargets : [1]
		}, {
			mRender : function (a) {
				return "<span class='currency'>" + x(+a) + "</span>"
			},
			aTargets : [2],
			sType : "formatted-num",
			fnCreatedCell : function (a, c, d) {
				d.invoiceNotSent > 0 && b(a).attr("data-action", 'details/show("New", ' + d.id + ")").addClass("info")
			}
		}, {
			mRender : function (a) {
				return "<span class='currency'>" + x(+a) + "</span>"
			},
			aTargets : [3],
			sType : "formatted-num",
			fnCreatedCell : function (a, c, d) {
				d.invoiceSent > 0 && b(a).attr("data-action", 'details/show("Sent", ' + d.id + ")").addClass("info")
			}
		}, {
			mRender : function (a) {
				return "<span class='currency red'>" + x(+a) + "</span>"
			},
			aTargets : [4],
			sType : "formatted-num",
			fnCreatedCell : function (a, c, d) {
				d.paymentReceived > 0 && b(a).attr("data-action", 'details/show("Received", ' + d.id + ")").addClass("info")
			}
		}, {
			mRender : function (a, b, c) {
				return i(c.paymentReceivedRate)
			},
			aTargets : [5],
			sType : "percent"
		}, {
			mRender : function (a) {
				return "<span class='currency'>" + x(+a) + "</span>"
			},
			aTargets : [6],
			sType : "formatted-num",
			fnCreatedCell : function (a, c, d) {
				d.revenue > 0 && b(a).attr("data-action", 'details/show("All", ' + d.id + ")").addClass("info")
			}
		}, {
			mRender : function (a, b, c) {
				return i(c.revenueRate)
			},
			aTargets : [7],
			sType : "percent"
		}, {
			mRender : function (a) {
				return '<span class="currency">' + x(+a) + "</span>"
			},
			aTargets : [8],
			sType : "formatted-num"
		}
	],
	z = {
		type : "user",
		filter : "",
		filter_id : "",
		start : "",
		end : "",
		dateType : "dateAdded"
	};
	return c.extend({
		"sig/initialize" : function (a, b) {
			r.call(this, b)
		},
		"hub:memory/context" : function (a, b) {
			this._user = b.user,
			x = this.formatCurrency,
			s.call(this)
		},
		"dom/action.click" : b.noop,
		"dom/action/lookup.click" : function (a, c, d) {
			c.preventDefault();
			var e = this,
			g = b(c.target);
			if (!t)
				return f.alert("error", "团队列表不存在"), void 0;
			for (var h = !1, i = 0; i < t.length; i += 1)
				t[i].parent_id == d && (h = !0);
			z.filter = "team",
			z.filter_id = d,
			h ? this.publish("filter/kpi/update", z, g.html()) : (z.type = "user", this.publish("filter/kpi/update", z, g.html(), !0)),
			p.call(e, z, !0)
		},
		"dom/action/user/open.click" : function (a, c) {
			c.preventDefault();
			var d = b(c.target),
			e = d.attr("href");
			f.window({
				url : e,
				name : "User Profile",
				width : "1024"
			})
		},
		"dom/action/details/show.click" : function (a, c, d, e) {
			var f = this,
			g = b(c.target),
			h = g.closest("tr"),
			i = h[0],
			j = {};
			j.type = d,
			j.filter = z.type,
			j.filter_id = e,
			j.start = z.start,
			j.end = z.end,
			j.dateType = z.dateType;
			var k = l(j);
			f.oTable.fnIsOpen(i) ? (f.oTable.fnClose(i), h.data("detail") !== d ? (q.call(f, k, i), h.data("detail", d), g.closest("td").addClass("selected").siblings().removeClass("selected")) : (h.data("detail", ""), g.closest("td").removeClass("selected"))) : (q.call(f, k, i), h.data("detail", d), g.closest("td").addClass("selected").siblings().removeClass("selected"))
		},
		"dom/action/export/csv.click" : function (a, b) {
			b.preventDefault();
			var c = u + "&output=csv";
			window.open(c)
		}
	})
})