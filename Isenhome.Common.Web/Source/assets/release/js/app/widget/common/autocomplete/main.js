define("app/widget/common/autocomplete/main", ["jquery", "shared/widget/base/main", "typeahead"], function (a, b) {
	function c(a) {
		var b = this,
		c = d.replace("<type>", b.type);
		b.$element.typeahead({
			name : b.type,
			remote : c
		}),
		a.resolve()
	}
	var d = "/rest/data/autocomplete?type=<type>&name=%QUERY";
	return b.extend(function (a, b, c) {
		this.type = c
	}, {
		"sig/initialize" : function (a, b) {
			c.call(this, b)
		}
	})
})