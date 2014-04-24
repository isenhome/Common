define("app/widget/dashboard/tutorial/main", ["jquery", "app/widget/dashboard/widget/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d) {
	function e() {
		var a = this;
		a.html(d, a._json, c().done(function () {
				f.call(a)
			}))
	}
	function f() {
		var a = this;
		a.$element
	}
	return b.extend({
		"hub:memory/context" : function (a, b) {
			var c = this;
			c._userId = b.user.id,
			e.call(c)
		},
		"dom/action/play/video.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target).data("source");
			d.publish("modal/video/show", e)
		}
	})
})