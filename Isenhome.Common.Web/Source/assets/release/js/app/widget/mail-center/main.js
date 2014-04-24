define("app/widget/mail-center/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b.html(d, a)
	}
	return b.extend({
		"sig/start" : function (a, b) {
			e.call(this, b)
		},
		"hub:memory/route" : function (a, b) {
			var c = b.path;
			c || (window.location.hash = "list")
		}
	})
})