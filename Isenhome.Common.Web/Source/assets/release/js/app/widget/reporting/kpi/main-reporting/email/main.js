define("app/widget/reporting/kpi/main-reporting/email/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b.publish("ajax", {
			url : f.LIST.replace("<ids>", b._ids)
		}, c().done(function (c) {
				b._json = c.list,
				b.html(d, b._json, a)
			}))
	}
	var f = {
		LIST : "/rest/mail/list?paginate_by=200&id__s=<ids>"
	};
	return b.extend(function (a, b, c) {
		var d = this;
		d._ids = c
	}, {
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		}
	})
})