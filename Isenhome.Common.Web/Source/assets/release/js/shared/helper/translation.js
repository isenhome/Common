define("shared/helper/translation", ["troopjs-core/component/widget", "shared/helper/blurb", "troopjs-utils/deferred"], function (a, b, c) {
	var d = "data-i18n";
	return a.extend(function (a, b, c) {
		this.attr = c
	}, {
		"sig/initialize" : function (a, e) {
			var f = this,
			g = f.$element.attr(d);
			e = e || c(),
			c(function (a) {
				f.attr ? f.$element.attr(f.attr, b.t(g)) : f.$element.text(b.t(g)),
				a.resolve()
			}).then(e.resolve, e.reject, e.notify)
		}
	})
})