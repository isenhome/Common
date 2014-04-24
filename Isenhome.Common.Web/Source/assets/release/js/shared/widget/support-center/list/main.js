define("shared/widget/support-center/list/main", ["jquery", "shared/widget/list/base", "troopjs-utils/deferred", "template!./main.html"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		c(function (a) {
			b.html(d, a)
		}).done(function () {
			b.$container = b.$element.find(".list-container"),
			a.resolve()
		})
	}
	var f = {
		LIST : "/rest/user/issue_list?"
	};
	return b.extend(function () {
		this._url = f.LIST,
		this._listType = "support-center"
	}, {
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		},
		appendItems : function (b) {
			var c = this;
			b.forEach(function (b) {
				var d = a("<tr></tr>");
				b.client_new && d.addClass("new"),
				c.$container.append(d),
				c.$container.children().last().data("json", b).attr("data-weave", "shared/widget/support-center/item/main(json)").weave()
			})
		}
	})
})