define("app/widget/company/existing/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e) {
	return b.extend({
		"hub/company/existing/update" : function (a, b) {
			var e = this;
			b && b.length ? e.html(d, b, c().done(function () {
					e.$element.find(".industry").tooltip(),
					e.$element.removeClass("hide")
				})) : e.$element.addClass("hide")
		},
		"dom/action.click" : a.noop,
		"dom/action/profile/open.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			f = d.attr("href");
			e.window({
				url : f,
				name : "User Profile",
				width : "1024"
			})
		}
	})
})