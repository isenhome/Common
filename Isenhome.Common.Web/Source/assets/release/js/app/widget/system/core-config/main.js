define("app/widget/system/core-config/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b.html(d, a)
	}
	function f(a) {
		var b = this,
		c = b.$element;
		c.find('a[href="#fn-tab"]').one("show", function () {
			c.find("#fn-tab").attr("data-weave", g + '("function")').weave()
		}),
		c.find('a[href="#industry-tab"]').one("show", function () {
			c.find("#industry-tab").attr("data-weave", g + '("industry")').weave()
		}),
		c.find('a[href="#team-tab"]').one("show", function () {
			c.find("#team-tab").attr("data-weave", g + '("team")').weave()
		}),
		a.resolve()
	}
	var g = "app/widget/system/core-config/base/main";
	return b.extend({
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		},
		"sig/start" : function (a, b) {
			f.call(this, b)
		}
	})
})