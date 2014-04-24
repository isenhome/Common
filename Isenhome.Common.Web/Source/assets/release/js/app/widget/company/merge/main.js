define("app/widget/company/merge/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./main.html", "template!./company.html"], function (a, b, c, d, e, f) {
	function g() {
		var a = this;
		a.uid && a._context && a.publish("ajax", {
			url : j.CLIENT + a.uid
		}, c().done(function (b) {
				a._json = b,
				a._json.context = a._context,
				h.call(a)
			}))
	}
	function h() {
		var a = this;
		c(function (b) {
			a.html(e, a._json, b)
		}).done(function () {
			i.call(a)
		})
	}
	function i() {
		var a = this,
		b = a.$element;
		a.$list = b.find(".company-list"),
		b.find(".search_page:eq(0) .company-item").data("json", a._json).attr("data-weave", "app/widget/company/item/main(json)").weave(c().done(function () {
				a.$element.find(".company-item").removeClass("widget-spin")
			})),
		d.widgetLoaded.call(a)
	}
	var j = {
		CLIENT : "/rest/client/",
		LIST : "/rest/client/list?company_name=",
		MERGE : "/rest/client/merge"
	};
	return b.extend({
		"hub:memory/merge/id/change" : function (a, b) {
			var c = this;
			c.uid = b,
			g.call(c)
		},
		"hub:memory/context" : function (a, b) {
			var d = this;
			c(),
			d._context = b.user,
			g.call(d)
		},
		"dom/action.click" : a.noop,
		"dom/action/search/company.click" : function (b, d) {
			d.preventDefault();
			var e = this,
			g = e.$element.find(".search-input").val().trim(),
			h = a(d.target);
			g.length && (e.$list.removeClass("hide").addClass("widget-spin"), e.publish("ajax", {
					url : j.LIST + window.encodeURIComponent(g)
				}, c().done(function (b) {
						if (b.count) {
							var d = c(),
							g = a(f(b.list, d));
							g.find("[data-weave]").weave(),
							e.$list.find(".search_panel").html(g),
							e.$list.removeClass("widget-spin")
						} else
							e.$list.addClass("hide")
					}), h))
		},
		"dom/action/merge/company.click" : function (b, e) {
			e.preventDefault();
			var f,
			g = this,
			h = a(e.target),
			i = g.$list.find(":radio:checked");
			if (i.length) {
				var k = parseInt(i.val(), 10),
				l = g._json.id;
				if (k === l)
					return d.alert("error", "请选择不同的两家公司进行合并"), void 0;
				f = window.confirm("确定要合并所选择的公司吗？"),
				f && g.publish("ajax", {
					url : j.MERGE,
					data : {
						data : JSON.stringify({
							merge_to : k,
							merge_from : l
						})
					},
					type : "post"
				}, c().done(function (a) {
						a.status ? (d.alert("success", "合并成功！"), window.location.hash = "list") : d.alert("error", a.message)
					}), h)
			}
		}
	})
})