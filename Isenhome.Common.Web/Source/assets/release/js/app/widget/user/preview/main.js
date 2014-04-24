define("app/widget/user/preview/main", ["jquery", "shared/widget/base/main", "template!./main.html"], function (a, b, c) {
	function d(a) {
		var b = this;
		b.html(c, a)
	}
	return b.extend({
		"sig/initialize" : function (a, b) {
			d.call(this, b)
		},
		"hub:memory/route" : function (a, b) {
			var c = this;
			c.publish("detail/id/change", b.path[0])
		}
	})
});
