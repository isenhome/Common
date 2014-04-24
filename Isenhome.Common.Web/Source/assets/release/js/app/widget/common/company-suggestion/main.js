define("app/widget/common/company-suggestion/main", ["jquery", "shared/widget/base/main", "template!./main.html", "shared/helper/blurb", "typeahead"], function (a, b, c, d) {
	function e(a) {
		var b = this,
		d = b.$element,
		e = d.attr("class");
		d.typeahead({
			name : "company",
			remote : f,
			valueKey : "name",
			template : function (a) {
				return a.ctype = g[a.type],
				c(a)
			},
			limit : 200
		}).on("typeahead:initialized", function () {
			d.prev().addClass(e)
		}).on("typeahead:selected", function () {
			d.trigger("change")
		}).on("typeahead:opened", function () {}),
		a.resolve()
	}
	var f = "/rest/data/autocomplete?type=company&name=%QUERY",
	g = {
		client : d.t("client company"),
		bding : d.t("bding company"),
		normal : "",
		generated : ""
	};
	return b.extend({
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		},
		"dom/action.click" : a.noop,
		"dom/action/new/company.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.$element.typeahead("close")
		}
	})
})