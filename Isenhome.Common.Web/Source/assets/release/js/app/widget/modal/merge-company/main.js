define("app/widget/modal/merge-company/main", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "template!./company.html"], function (a, b, c, d, e, f) {
	function g() {
		var a = this;
		b(function (b) {
			a.html(d, a._json, b)
		}).done(function () {
			h.call(a)
		})
	}
	function h() {
		var a = this,
		b = a.$element;
		a.$list = b.find(".company-list"),
		b.on("hidden", function () {
			a.$list.find(".search_panel").empty(),
			a.$list.addClass("widget-spin hide")
		})
	}
	var i = {
		CLIENT : "/rest/client/",
		LIST : "/rest/client/list?company_name=",
		MERGE : "/rest/client/merge"
	};
	return c.extend({
		"hub:memory/context" : function (a, b) {
			var c = this;
			c.myself = {
				value : b.user.id,
				label : b.user.englishName
			},
			g.call(this)
		},
		"hub/modal/merge-company/show" : function (a, b) {
			var c = this,
			d = c.$element;
			d.find(".modal-footer button"),
			c._ids = b.ids,
			c._onSuccess = b.onSuccess,
			d.modal("show")
		},
		"dom/action.click.change" : a.noop,
		"dom/action/search/company.click" : function (c, d) {
			d.preventDefault();
			var e = this,
			g = e.$element.find(".search-input").val().trim(),
			h = a(d.target);
			g.length && (e.$list.removeClass("hide").addClass("widget-spin"), e.publish("ajax", {
					url : i.LIST + window.encodeURIComponent(g)
				}, b().done(function (c) {
						if (c.count) {
							var d = b(),
							g = a(f(c.list, d));
							g.find("[data-weave]").weave(),
							e.$list.find(".search_panel").html(g),
							e.$list.removeClass("widget-spin")
						} else
							e.$list.addClass("hide")
					}), h))
		},
		"dom/action/merge/company.click" : function (c, d) {
			d.preventDefault();
			var f,
			g = this,
			h = a(d.target),
			j = g.$list.find(":radio:checked");
			if (j.length) {
				var k = parseInt(j.val(), 10);
				f = window.confirm("确定要合并到所选择的公司吗？"),
				f && g.publish("ajax", {
					url : i.MERGE,
					data : {
						data : JSON.stringify({
							merge_to : k,
							merge_from : g._ids
						})
					},
					type : "post"
				}, b().done(function (a) {
						g.$element.modal("hide"),
						a.status ? (e.alert("success", "合并成功！"), g._onSuccess && g._onSuccess(k)) : e.alert("error", a.message)
					}), h)
			}
		}
	})
})