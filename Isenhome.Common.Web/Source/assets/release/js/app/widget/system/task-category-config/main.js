define("app/widget/system/task-category-config/main", ["jquery", "app/widget/system/base/options-config", "troopjs-utils/deferred", "template!./main.html"], function (a, b, c, d) {
	var e = "todo_category",
	f = "app/widget/system/task-category-config/item";
	return b.extend(function () {
		this._type = e,
		this._itemWidget = f,
		this._template = d
	})
})