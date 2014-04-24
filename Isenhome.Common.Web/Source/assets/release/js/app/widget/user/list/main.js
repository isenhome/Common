define("app/widget/user/list/main", ["jquery", "shared/widget/list/base", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		c(function (a) {
			b.html(d, a)
		}).done(function () {
			b.$container = b.$element.find(".list-container"),
			b.$massActions = b.$element.find(".mass-action .btn"),
			b.$toggleAll = b.$element.find('[data-action="list/toggle/all"]'),
			b.$listview = b.$element.find('[data-action="listview"]'),
			b.viewType ? b.$listview.addClass("table-view").attr("title", "切换为详细视图").find("span").attr("class", "icon-sqaures") : b.$listview.addClass("detail-view").attr("title", "切换为列表视图").find("span").attr("class", "icon-list"),
			b.$element.tooltip({
				selector : '[data-toggle="tooltip"]',
				trigger : "hover"
			}),
			a.resolve()
		})
	}
	var f = "/rest/user/fulllist?",
	g = "app/widget/user/item/main";
	return b.extend(function () {
		this._url = f,
		this._listType = "user"
	}, {
		render : function (a) {
			e.call(this, a)
		},
		appendItems : function (a) {
			var b = this;
			b.$toggleAll.prop("checked", !1),
			b.$toggleAll.prop("indeterminate", !1),
			b.viewType ? a.forEach(function (a) {
				b.$container.append("<tr></tr>"),
				b.$container.children().last().data("json", a).attr("data-weave", g + "(json, " + b.viewType + ")").weave()
			}) : a.forEach(function (a) {
				b.$container.append('<div class="search_item clearfix"></div>'),
				b.$container.children().last().data("json", a).attr("data-weave", g + "(json, " + b.viewType + ")").weave()
			})
		}
	})
})