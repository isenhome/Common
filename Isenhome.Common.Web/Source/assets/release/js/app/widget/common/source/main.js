define("app/widget/common/source/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b.publish("ajax", {
			url : f.SOURCE
		}, c().done(function (c) {
				b._json = c,
				b.html(d, b._json, a)
			}))
	}
	var f = {
		SOURCE : "/rest/data/candidatesource/list"
	};
	return b.extend({
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		}
	})
})