define("app/widget/system/company-info/main", ["jquery", "app/widget/system/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b.html(d, a)
	}
	return b.extend({
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		}
	})
})