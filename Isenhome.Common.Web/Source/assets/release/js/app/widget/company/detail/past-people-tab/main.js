define("app/widget/company/detail/past-people-tab/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "shared/helper/utils", "template!./main.html"], function (a, b, c, d, e, f) {
	function g(a) {
		var b = this;
		b.publish("ajax", {
			url : i.CONFIG
		}, c().done(function (c) {
				b._hideContact = "1" === c[0].value,
				b.html(f, a)
			}))
	}
	function h(b) {
		var f = this,
		g = f.$element.find(".search_panel"),
		h = f._live ? "&current=latest" : "&current=past";
		f.$noItem = f.$element.find(".no-item"),
		f.publish("ajax", {
			url : i.PEOPLE.replace("<id>", f._id) + h
		}, c().done(function (h) {
				for (var i = h.list, j = [], k = 0, l = i.length; l > k; k++) {
					var m = c();
					m.promise(),
					g.append('<div class="search_item clearfix"></div>'),
					g.children().last().data("json", i[k]).attr("data-weave", "app/widget/candidate/item/main(json, false, " + f._hideContact + ")").weave(m)
				}
				d.apply(a, j).done(function () {
					0 === i.length && g.addClass("hide"),
					b.resolve(),
					e.widgetLoaded.call(f)
				})
			}))
	}
	var i = {
		PEOPLE : "rest/candidate/list?paginate_by=10000&company_id=<id>",
		CONFIG : "/rest/data/configvalue?keys=hide_contactinfo"
	};
	return b.extend(function (a, b, c, d) {
		this._id = c,
		this._live = "undefined" == typeof d ? !0 : d
	}, {
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		"dom/action.keyup" : a.noop,
		"dom/action/search/people.keyup" : function (b, c) {
			var d = this,
			e = new RegExp(a(c.target).val().trim(), "im");
			d.$list || (d.$list = d.$element.find(".search_item")),
			d.$list.each(function () {
				var b = a(this),
				c = b.text();
				e.test(c) ? b.removeClass("hide") : b.addClass("hide")
			}),
			0 === d.$list.filter(":visible").length ? d.$noItem.removeClass("hide") : d.$noItem.addClass("hide")
		}
	})
})