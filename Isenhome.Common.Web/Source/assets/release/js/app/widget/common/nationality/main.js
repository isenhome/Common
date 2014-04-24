define("app/widget/common/nationality/main", ["jquery", "shared/widget/base/main", "template!./main.html", "troopjs-utils/deferred", "shared/helper/utils", "app/widget/common/select2/main"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b.publish("ajax", {
			url : f.LIST
		}, d().done(function (d) {
				b._json = d,
				b.html(c, b._json, a)
			}).done(function () {
				b.code ? b.$element.val(b.code).select2() : b.$element.select2()
			}))
	}
	var f = {
		LIST : "/rest/data/options?type=nationality"
	};
	return b.extend(function (a, b, c) {
		this.code = c
	}, {
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		},
		"sig/stop" : function (a, b) {
			this.$element.select2("destroy"),
			b.resolve()
		}
	})
})