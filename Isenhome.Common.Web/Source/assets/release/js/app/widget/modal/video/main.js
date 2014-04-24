define("app/widget/modal/video/main", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "videojs"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b.html(d, b._json, a)
	}
	function f(a) {
		var b = this,
		c = b.$element;
		b.player = videojs("modal-video"),
		c.on("hide", function () {
			b.player.pause()
		}),
		a.resolve()
	}
	return c.extend({
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		},
		"sig/start" : function (a, b) {
			f.call(this, b)
		},
		"hub/modal/video/show" : function (a, b) {
			var c = this,
			d = c.$element;
			c.player.src(b),
			d.modal({
				show : !0,
				backdrop : "static"
			})
		}
	})
})