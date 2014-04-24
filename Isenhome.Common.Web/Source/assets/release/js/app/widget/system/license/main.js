define("app/widget/system/license/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b.publish("ajax", {
			url : f.INFO
		}, c().done(function (c) {
				b._json = c,
				b.html(d, b._json, a)
			}))
	}
	var f = {
		INFO : "/rest/data/clientinfo"
	};
	return b.extend({
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		}
	})
})