define("app/widget/user/item/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./detail.html", "template!./list.html", "shared/helper/utils"], function (a, b, c, d, e, f) {
	function g() {
		var a = this;
		a.viewType ? a.html(e, a._json) : a.html(d, a._json)
	}
	return b.extend(function (a, b, c, d) {
		var e = this;
		e._json = c,
		e.viewType = d
	}, {
		"hub:memory/context" : function (a, b) {
			var c = this;
			this.role = b.user.role,
			g.call(c)
		},
		"dom/action.click" : a.noop,
		"dom/action/profile/open.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = d.attr("href");
			f.window({
				url : e,
				name : "User Profile",
				width : "1024"
			})
		}
	})
})