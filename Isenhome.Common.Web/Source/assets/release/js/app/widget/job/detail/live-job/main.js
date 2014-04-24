define("app/widget/job/detail/live-job/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "shared/helper/utils", "template!./main.html"], function (a, b, c, d, e, f) {
	function g() {
		var a = this,
		b = JSON.parse(JSON.stringify(a._originjson));
		a._status && (b = b.filter(function (b) {
					return a._status.indexOf(b.currentStatus) <= -1 ? !1 : !0
				})),
		a._type && (b = b.filter(function (b) {
					return b.candidate.type !== a._type ? !1 : !0
				})),
		a._noteStatus && (b = b.filter(function (b) {
					for (var c = !1, d = b.detail.length; d--; )
						if ("Note" === b.detail[d].type) {
							if (b.detail[d].status.code !== a._noteStatus)
								break;
							c = !0
						}
					return c
				})),
		a._json = b,
		k.call(a)
	}
	function h(a, b) {
		for (var c = 0, d = b.split("."), e = d.length; e > c; c++)
			try {
				a = a[d[c]]
			} catch (f) {
				a = ""
			}
		return a
	}
	function i(a) {
		var b = this,
		c = 0;
		b.$element.find('[class*="-count"]').text(0);
		for (var d in a)
			"Invoice" === d || "OfferSign" === d || "Onboard" === d ? (c += a[d], b.$element.find(".offersign-count").text(c)) : b.$element.find("." + d.toLowerCase().replace(" ", "-") + "-count").text(a[d]);
		b.$element.find(".live-count").text(b._json.length)
	}
	function j() {
		var a = this;
		a.publish("ajax", {
			url : n.STATUS
		}, c().done(function (b) {
				var d = b || [];
				c(function (b) {
					a.html(f, d, b)
				}).done(function () {
					k.call(a)
				}).done(function () {
					i.call(a, a._counts)
				})
			}))
	}
	function k() {
		var b,
		c = this,
		d = {};
		c._counts = d,
		c.$massActions = c.$element.find(".mass-action .btn"),
		c.$toggleAll = c.$element.find('[data-action="shortlist/toggle/all"]'),
		c.$noteStatus = c.$element.find(".note-status"),
		c.$listview = c.$element.find('[data-action="listview"]'),
		c.$element.find(".shortlist-steps").remove(),
		a.each(c._json, function (e, f) {
			d[f.currentStatus] = d[f.currentStatus] ? d[f.currentStatus] + 1 : 1,
			f.joborder = c._jobJson,
			c.viewType ? (b = a('<tr class="shortlist-steps"></tr>').data("json", f).data("islimited", c._islimited).attr("data-weave", "app/widget/shortlist/main(json, islimited, true)"), c.$listview.addClass("table-view").find("span").attr("class", "icon-sqaures"), c.$element.find("tbody").append(b)) : (b = a('<div class="shortlist-steps clearfix"></div>').data("json", f).data("islimited", c._islimited).attr("data-weave", "app/widget/shortlist/main(json, islimited, false)"), c.$listview.addClass("detail-view").find("span").attr("class", "icon-list"), c.$element.append(b)),
			c.$element.tooltip({
				selector : '[data-toggle="tooltip"]',
				trigger : "hover"
			})
		}),
		c.$element.find(".shortlist-steps").weave()
	}
	var l,
	m = "shortlist",
	n = {
		LISTVIEW : "/rest/user/listview",
		STATUS : "/rest/data/options?type=jobsubmission_status"
	};
	return b.extend(function (a, b, c, d, e) {
		this._jobJson = c,
		this._originjson = d,
		this._json = JSON.parse(JSON.stringify(d)),
		this._islimited = e
	}, {
		"hub:memory/context" : function (a, b) {
			var c = this;
			c.userId = b.user.id,
			c.viewType = b.user.listview[m] && b.user.listview[m].list ? b.user.listview[m].list !== l ? b.user.listview[m].list : !1 : !1,
			j.call(c)
		},
		"hub/job/shortlist/count/update" : function (a, b, c) {
			var d = this,
			e = d.$element.find("." + b.toLowerCase().replace(" ", "-") + "-count"),
			f = d.$element.find("." + c.toLowerCase().replace(" ", "-") + "-count");
			e.text(parseInt(e.text(), 10) - 1),
			f.text(parseInt(f.text(), 10) + 1)
		},
		"hub/live-job/show/living" : function (a, b) {
			var c = this;
			c.$element.find(".btn-group-filter .btn").eq(0).trigger("click"),
			c.publish("show/living", b)
		},
		"hub/job/live-job/update/count" : function (a, b, c) {
			var d,
			e,
			f = this;
			b !== c && (d = f.$element.find("." + b.toLowerCase().replace(" ", "-") + "-count"), d.text(parseInt(d.text(), 10) - 1), e = "OfferSign" === c || "Invoice" === c || "Onboard" === c ? f.$element.find(".offersign-count") : f.$element.find("." + c.toLowerCase().replace(" ", "-") + "-count"), e.text(parseInt(e.text(), 10) + 1))
		},
		"hub/shortlist/toggle/mass/action" : function () {
			var a = this;
			if (!a.$element.is(":hidden")) {
				var b = a.$element.find('[data-action="shortlist/check"]').length,
				c = a.$element.find('[data-action="shortlist/check"]').filter(":checked").length;
				c ? a.$massActions.removeClass("disabled") : a.$massActions.addClass("disabled"),
				b === c ? (a.$toggleAll.prop("indeterminate", !1), a.$toggleAll.prop("checked", !0)) : 0 === c ? (a.$toggleAll.prop("indeterminate", !1), a.$toggleAll.prop("checked", !1)) : c > 0 && b !== c && (a.$toggleAll.prop("checked", !1), a.$toggleAll.prop("indeterminate", !0))
			}
		},
		"dom/action.click.change" : a.noop,
		"dom/action/listview.click" : function (b, d) {
			d.preventDefault();
			var e = this,
			f = a(d.target),
			g = f.hasClass("detail-view");
			g ? f.removeClass("detail-view").addClass("table-view") : f.removeClass("table-view").addClass("detail-view"),
			e.publish("ajax", {
				url : n.LISTVIEW,
				data : {
					data : JSON.stringify({
						list : m,
						key : "list",
						value : g
					})
				},
				type : "post"
			}, c().done(function (a) {
					a.status && window.location.reload()
				}))
		},
		"dom/action/shortlist/toggle/all.click" : function (b, c) {
			var d = this,
			e = a(c.target);
			e.is(":checked") ? (d.publish("list/check/all"), d.publish("shortlist/toggle/mass/action")) : (d.publish("list/uncheck/all"), d.publish("shortlist/toggle/mass/action"))
		},
		"dom/action/sort.change" : function (b, c) {
			var d,
			e,
			f = this,
			g = a(c.target),
			i = g.val().split("&"),
			j = i[0],
			l = i[1];
			f.$element.find(".btn-group-filter .btn").eq(0).trigger("click"),
			f._json.sort(function (a, b) {
				return d = h(a, j),
				e = h(b, j),
				isNaN(Date.parse(d)) ? l ? e > d ? 1 : -1 : d > e ? 1 : -1 : (d = Date.parse(d), e = Date.parse(e), l ? d > e ? 1 : -1 : e > d ? 1 : -1)
			}),
			k.call(f)
		},
		"dom/action/buttons-toggle.click" : function (b, c, d) {
			c.preventDefault();
			var e = this,
			f = a(c.target);
			e._status = d,
			f.siblings().removeClass("active"),
			f.addClass("active"),
			g.call(e)
		},
		"dom/action/people/type.change" : function (b, c) {
			var d = this,
			e = a(c.target);
			d._type = e.val(),
			g.call(d)
		},
		"dom/action/note/status.change" : function (b, c) {
			var d = this,
			e = a(c.target);
			d._noteStatus = e.val(),
			g.call(d)
		},
		checkUserPermission : function () {
			for (var a = !1, b = this, c = b._jobJson.users, d = 0, e = c.length; e > d; d++)
				if (c[d].user.id === b.userId) {
					a = !0;
					break
				}
			return a
		}
	})
})