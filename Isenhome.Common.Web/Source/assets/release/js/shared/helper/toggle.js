define("shared/helper/toggle", ["troopjs-core/component/widget"], function (a) {
	var b = '[data-toggle="view"]',
	c = '[data-action="helper/toggle/show"]',
	d = "hide",
	e = "helper/toggle";
	return a.extend({
		"sig/initialize" : function (a, b) {
			b.resolve()
		},
		"dom/action.click" : $.noop,
		"dom/action/helper/toggle/show.click" : function (a, c) {
			c.preventDefault();
			var f = this,
			g = $(c.target);
			f.publish(e),
			g.addClass(d),
			f.$element.find(b).removeClass(d)
		},
		"hub/helper/toggle" : function () {
			var a = this;
			a.$element.find(b).addClass(d),
			a.$element.find(c).removeClass(d)
		}
	})
})