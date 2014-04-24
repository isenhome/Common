define("app/widget/extension/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./main.html"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	return b.extend({
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		}
	})
})