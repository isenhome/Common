define("app/widget/notification-center/list/main", ["jquery", "shared/widget/list/base", "troopjs-utils/deferred", "template!./main.html"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		c(function (a) {
			b.html(d, a)
		}).done(function () {
			b.$container = b.$element.find(".row-fluid"),
			a.resolve()
		})
	}
	var f = {
		LIST : "/rest/user/msglist?paginate_by=20"
	};
	return b.extend(function () {
		this._url = f.LIST,
		this._listType = "notification-center"
	}, {
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		},
		"hub:memory/route" : function (a, b) {
			var c = this;
			c.publish("service/route", b),
			b.source || c.publish("sidebar/set/default")
		},
		appendItems : function (a) {
			var b = this;
			a.forEach(function (a) {
				b.$container.append('<div class="activity-item clearfix"></div>'),
				b.$container.children().last().data("json", a).attr("data-weave", "app/widget/notification-center/item(json)").weave()
			})
		}
	})
})