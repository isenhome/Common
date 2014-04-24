define("app/widget/system/email-template-config/main", ["jquery", "app/widget/system/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b.html(d, a)
	}
	return b.extend(function (a, b, c) {
		this._personal = c
	}, {
		"hub:memory/context" : function (a, b) {
			var d = this;
			d._personal && (d._userId = b.user.id),
			e.call(d, c())
		}
	})
})