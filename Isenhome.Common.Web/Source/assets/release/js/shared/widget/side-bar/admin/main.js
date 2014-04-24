define("shared/widget/side-bar/admin/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./main.html", "config"], function (a, b, c, d, e, f) {
	function g() {
		var a = this;
		c(function (b) {
			a.html(e, a._json, b)
		}).done(function () {
			h.call(a)
		})
	}
	function h() {
		var a = this;
		a._json.type;
		var b = window.location.pathname + window.location.hash;
		a.$element.removeClass("hide").find('[href*="' + b + '"]').closest("li").addClass("hover")
	}
	return b.extend(function (a, b, c) {
		var d = this;
		d._json.type = c
	}, {
		config : f,
		"hub:memory/context" : function (a, b) {
			var c = this;
			c._json.user = b.user,
			g.call(c)
		},
		"hub:memory/route" : function (a, b) {
			var c = this;
			"/setting" === window.location.pathname && (c.$element.find("li").removeClass("hover"), c.$element.find('[href*="' + b.path + '"]').closest("li").addClass("hover"))
		}
	})
})