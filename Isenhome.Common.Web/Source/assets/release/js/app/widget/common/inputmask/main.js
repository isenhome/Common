define("app/widget/common/inputmask/main", ["compose", "jquery", "troopjs-utils/deferred", "troopjs-core/component/widget", "jquery.inputmask"], function (a, b, c, d) {
	return d.extend(function (a, b, c, d) {
		var e = this;
		e.mask = c,
		e.placeholder = d
	}, {
		"sig/initialize" : function (a, b) {
			var c = this;
			c.$element.inputmask(c.mask, c.placeholder ? {
				placeholder : c.placeholder
			}
				 : {}),
			b.resolve()
		}
	})
})