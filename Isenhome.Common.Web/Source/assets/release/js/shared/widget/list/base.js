define("shared/widget/list/base", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils"], function (a, b, c, d) {
	function e(a) {
		return a.replace(/#/g, "%23")
	}
	function f() {
		var a,
		b,
		f,
		g,
		n = this,
		q = "",
		r = 0;
		if (n.viewType !== h && n.options !== h) {
			n.$element.find(".loading-area").addClass("widget-spin");
			var s = n.options,
			t = s.length;
			if ("[object Array]" === Object.prototype.toString.call(s))
				for (r; t > r; r++) {
					var u = s[r];
					i.test(u) ? a = RegExp.$1 : j.test(u) ? b = RegExp.$1 : k.test(u) ? (f = RegExp.$1, n.publish("ordering/set", f)) : l.test(u) && (g = RegExp.$1, n.publish("paginate/set", g))
				}
			a && (n.publish("filter/set", b), q = n._url + (a ? "&page=" + a : "") + (b ? "&" + b : "") + (f ? "&ordering=" + f : "") + (g ? "&paginate_by=" + g : ""), n.lang && (q += "&lang=" + n.lang), c(function (a) {
					n.publish("ajax", {
						url : e(q)
					}, c().done(function (a) {
							if ("finalize" !== n.phase) {
								if (a.status !== h && !a.status)
									return d.alert("error", "Filter list error: " + a.message), void 0;
								n._json = a,
								n.publish(n._listType + p, a),
								n.publish(o, a),
								n.publish(m, a.count)
							}
						}).always(function () {
							a.resolve()
						}))
				}).done(function () {
					"finalize" !== n.phase && c(function (a) {
						n.renderList(a)
					}).done(function () {
						try {
							n.$element.find(".loading-area").removeClass("widget-spin")
						} catch (a) {
							n.publish("error/log", a.message, a.stack, {
								phase : n.phase,
								context : n
							})
						}
					})
				}))
		}
	}
	function g(a) {
		var b = this,
		c = b._json.list;
		return b.$container ? (b.$container.children().remove(), c && c.length ? (b.$container.removeClass("hide"), b.appendItems(c)) : b.$container.addClass("hide"), a.resolve(), void 0) : (a.resolve(), void 0)
	}
	var h,
	i = /^page!(\d*)/,
	j = /^filter!(.*)/,
	k = /^ordering!(.*)/,
	l = /^paginate!(\d*)/,
	m = "filter/get/count",
	n = "make/route",
	o = "sidebar/update/list",
	p = "/paging/set",
	q = {
		LISTVIEW : "/rest/user/listview"
	};
	return b.extend({
		"hub:memory/context" : function (b, d) {
			var e,
			g,
			i,
			j = this,
			k = {};
			j.context = d,
			j._listType && d.user.listview[j._listType] ? (j.viewType = d.user.listview[j._listType].list !== h ? d.user.listview[j._listType].list : !1, e = d.user.listview[j._listType].ordering, e && (k.ordering = e), g = d.user.listview[j._listType].paginate, g && (k.paginate = g), j.columns = d.user.listview[j._listType].columns, j.colOrder = d.user.listview[j._listType].colOrder, i = d.user.listview[j._listType].lang, j.lang = i, a.isEmptyObject(k) || j.publish(n, k)) : j.viewType = !1,
			c(function (a) {
				j.render ? j.render(a) : a.resolve()
			}).done(function () {
				j.contextLoaded = !0,
				f.call(j)
			})
		},
		"hub:memory/list/set/filter" : function (a, b) {
			var c = this;
			c.options = b,
			c.contextLoaded && f.call(c)
		},
		"hub/list/reload" : function () {
			f.call(this)
		},
		"hub/toggle/mass/action" : function () {
			var a = this,
			b = a.$element.find('[data-action="list/check"]').length,
			c = a.$element.find('[data-action="list/check"]').filter(":checked").length;
			c ? a.$massActions.removeClass("disabled") : a.$massActions.addClass("disabled"),
			b === c ? (a.$toggleAll.prop("indeterminate", !1), a.$toggleAll.prop("checked", !0)) : 0 === c ? (a.$toggleAll.prop("indeterminate", !1), a.$toggleAll.prop("checked", !1)) : c > 0 && b !== c && (a.$toggleAll.prop("checked", !1), a.$toggleAll.prop("indeterminate", !0))
		},
		renderList : function (a) {
			g.call(this, a)
		},
		"dom/action.click.change" : a.noop,
		"dom/action/listview.click" : function (b, d) {
			d.preventDefault();
			var e = this,
			g = a(d.target),
			h = g.hasClass("detail-view");
			h ? g.removeClass("detail-view").addClass("table-view") : g.removeClass("table-view").addClass("detail-view"),
			e.publish("ajax", {
				url : q.LISTVIEW,
				data : {
					data : JSON.stringify({
						list : e._listType,
						key : "list",
						value : h
					})
				},
				type : "post"
			}, c().done(function (a) {
					if (a.status && e.render) {
						e.viewType = h;
						var b = c();
						b.done(function () {
							f.call(e)
						}),
						e.render(b)
					}
				}))
		},
		"dom/action/list/toggle/all.click" : function (b, c) {
			var d = this,
			e = a(c.target);
			e.is(":checked") ? (d.publish("list/check/all"), d.publish("toggle/mass/action")) : (d.publish("list/uncheck/all"), d.publish("toggle/mass/action"))
		}
	})
})