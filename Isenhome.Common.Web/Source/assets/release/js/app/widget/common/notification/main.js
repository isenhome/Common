define("app/widget/common/notification/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./main.html"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	return b.extend(function (a, b, c) {
		this._json = c
	}, {
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"dom/action.click" : a.noop,
		"dom/action/profile/open.click" : function (b, c) {
			c.preventDefault();
			var e = a(c.target),
			f = e.attr("href");
			d.window({
				url : f,
				name : "User Profile",
				width : "1024"
			})
		}
	})
})