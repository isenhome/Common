define("app/widget/common/fee-structure/main", ["compose", "jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "template!./structure.html"], function (a, b, c, d, e, f) {
	function g(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	return c.extend({
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"dom/action.click" : b.noop,
		"dom/action/add/structure.click" : function (a, c) {
			c.preventDefault();
			var d = b(c.target);
			d.parent().before(f)
		},
		"dom/action/remove/structure.click" : function (a, c) {
			c.preventDefault();
			var d = b(c.target);
			d.closest(".controls").remove()
		}
	})
})