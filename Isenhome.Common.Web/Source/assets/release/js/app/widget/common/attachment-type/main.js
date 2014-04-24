define("app/widget/common/attachment-type/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b.publish("ajax", {
			url : f.CATEGORY.replace("<type>", g[b._type])
		}, c().done(function (c) {
				b._json = c,
				b.html(d, b._json, a)
			}))
	}
	var f = {
		CATEGORY : "/rest/data/options?type=<type>"
	},
	g = {
		candidate : "candidate_attachment_category",
		company : "client_attachment_category",
		job : "joborder_attachment_category"
	};
	return b.extend(function (b) {
		this._type = a(b).data("type")
	}, {
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		}
	})
})