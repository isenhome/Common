define("app/widget/dashboard/widget/main", ["jquery", "shared/widget/base/main", "shared/helper/utils"], function (a, b) {
	return b.extend(function (b) {
		var c = this;
		c._type = a(b).data("widget"),
		c.publish("dashboard/disable/widget/icon", c._type)
	}, {
		"sig/stop" : function () {
			var a = this;
			a.publish("dashboard/enable/widget/icon", a._type)
		},
		"dom/action.click" : a.noop,
		"dom/action/remove/me.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.$element.remove(),
			c.publish("dashboard/widget/update")
		}
	})
})